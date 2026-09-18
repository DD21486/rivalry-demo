"use client";

import Link from "next/link";
import { MessageSquare, Share2 } from "lucide-react";
import { getUserById, getCommunityById } from "@/lib/mock";
import { ChallengeButton } from "./ChallengeButton";
import { formatRelativeTime, buildReplyTree, getTeamColor } from "@/lib/utils";
import type { Reply } from "@/lib/types";

interface ReplyThreadProps {
  replies: Reply[];
  postId: string;
}

function ReplyNode({
  reply,
  postId,
  depth = 0,
}: {
  reply: Reply & { children: Reply[] };
  postId: string;
  depth?: number;
}) {
  const author = getUserById(reply.authorId);
  const community = author
    ? getCommunityById(author.primaryCommunityId)
    : undefined;
  const teamColor = community ? getTeamColor(community.slug) : "#6366f1";

  const handleShare = () => {
    const url = `${window.location.origin}/post/${postId}#${reply.id}`;
    if (navigator.share) {
      navigator.share({ title: "Rivalry", url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className={depth > 0 ? "ml-3 pl-3 border-l-2 border-border/80" : ""}>
      <div className="py-3 border-b border-border/50 last:border-b-0">
        <div className="flex flex-wrap items-center gap-x-1.5 text-xs mb-1.5">
          {author && (
            <>
              <Link
                href={`/u/${author.username}`}
                className="font-semibold text-text-primary hover:underline"
              >
                {author.displayName}
              </Link>
              {community && (
                <>
                  <span className="text-text-muted">•</span>
                  <span style={{ color: teamColor }}>{community.name}</span>
                </>
              )}
              <span className="text-text-muted">•</span>
            </>
          )}
          <span className="text-text-muted">
            {formatRelativeTime(reply.createdAt)}
          </span>
        </div>

        <p className="text-text-primary text-sm leading-relaxed mb-2">
          {reply.body}
        </p>

        <div className="flex flex-wrap items-center gap-1 -ml-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[36px] rounded-lg text-xs font-semibold text-text-muted hover:bg-bg-muted hover:text-text-secondary transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Reply
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[36px] rounded-lg text-xs font-semibold text-text-muted hover:bg-bg-muted hover:text-text-secondary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          {reply.challengeId && (
            <ChallengeButton challengeId={reply.challengeId} />
          )}
        </div>
      </div>
      {reply.children.map((child) => (
        <ReplyNode
          key={child.id}
          reply={child as Reply & { children: Reply[] }}
          postId={postId}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export function ReplyThread({ replies, postId }: ReplyThreadProps) {
  const tree = buildReplyTree(replies);

  if (tree.length === 0) {
    return (
      <p className="text-text-muted text-sm py-8 text-center">
        No comments yet. Start the conversation.
      </p>
    );
  }

  return (
    <div>
      {tree.map((reply) => (
        <ReplyNode key={reply.id} reply={reply} postId={postId} />
      ))}
    </div>
  );
}
