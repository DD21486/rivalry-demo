"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import {
  getCommunityById,
  getDebateById,
  getUserById,
} from "@/lib/mock";
import { formatRelativeTime, getTeamColor } from "@/lib/utils";
import { CommunityBasketballIcon } from "./CommunityBasketballIcon";
import { DebateStatusBadge } from "./DebateStatusBadge";
import { DebateTags } from "./DebateTags";
import { PostActionBar } from "./PostActionBar";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author = getUserById(post.authorId);
  const debate = post.debateId ? getDebateById(post.debateId) : null;
  const primaryCommunity = getCommunityById(post.communityIds[0] ?? "");
  const teamColor = primaryCommunity
    ? getTeamColor(primaryCommunity.slug)
    : "#6366f1";

  const postHref = `/post/${post.id}`;

  return (
    <article
      className="conversation-card relative px-3 py-4 -mx-1 cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(120deg, color-mix(in srgb, ${teamColor} 6%, transparent), transparent 55%)`,
      }}
    >
      <Link
        href={postHref}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label="View conversation"
      />
      <div className="relative z-0 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs mb-2">
        {primaryCommunity && (
          <>
            <Link
              href={`/c/${primaryCommunity.slug}`}
              className="relative z-20 inline-flex items-center gap-1 font-bold hover:underline"
              style={{ color: teamColor }}
            >
              <CommunityBasketballIcon
                slug={primaryCommunity.slug}
                color={teamColor}
                size="sm"
              />
              {primaryCommunity.name}
            </Link>
            <span className="text-text-muted">•</span>
          </>
        )}
        {author && (
          <>
            <Link
              href={`/u/${author.username}`}
              className="relative z-20 font-medium text-text-secondary hover:underline"
            >
              {author.displayName}
            </Link>
            <span className="text-text-muted">•</span>
          </>
        )}
        <span className="text-text-muted">{formatRelativeTime(post.createdAt)}</span>
        {post.isHot && (
          <>
            <span className="text-text-muted">•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-status-voting">
              <Flame className="w-3 h-3" />
              Hot
            </span>
          </>
        )}
      </div>

      <p className="text-text-primary leading-relaxed relative z-0 pointer-events-none">
        {post.body}
      </p>

      {(debate || post.communityIds.length > 1) && (
        <div className="flex flex-wrap items-center gap-2 mt-2 relative z-20 pointer-events-auto">
          {debate && (
            <>
              <DebateStatusBadge status={debate.status} />
              <DebateTags communityIds={debate.communityIds} />
            </>
          )}
          {post.communityIds.slice(1).map((id) => {
            const c = getCommunityById(id);
            return c ? (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className="relative z-20 pointer-events-auto text-xs text-text-muted hover:text-accent hover:underline"
              >
                {c.name}
              </Link>
            ) : null;
          })}
        </div>
      )}

      <div className="relative z-20 mt-2">
        <PostActionBar
          postId={post.id}
          replyCount={post.replyCount}
          shareText={post.body.slice(0, 100)}
        />
      </div>
    </article>
  );
}
