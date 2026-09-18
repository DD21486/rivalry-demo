import Link from "next/link";
import { Flame } from "lucide-react";
import {
  getCommunityById,
  getDebateById,
  getUserById,
} from "@/lib/mock";
import { formatRelativeTime, getTeamColor } from "@/lib/utils";
import { DebateStatusBadge } from "./DebateStatusBadge";
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

  return (
    <article className="py-4 border-b border-border last:border-b-0">
      {/* Reddit-style meta line */}
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs mb-2">
        {primaryCommunity && (
          <>
            <Link
              href={`/c/${primaryCommunity.slug}`}
              className="font-bold hover:underline"
              style={{ color: teamColor }}
            >
              {primaryCommunity.name}
            </Link>
            <span className="text-text-muted">•</span>
          </>
        )}
        {author && (
          <>
            <Link
              href={`/u/${author.username}`}
              className="font-medium text-text-secondary hover:underline"
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

      <Link href={`/post/${post.id}`} className="block group">
        <p className="text-text-primary leading-relaxed group-hover:text-text-primary/90">
          {post.body}
        </p>
      </Link>

      {(debate || post.communityIds.length > 1) && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {debate && <DebateStatusBadge status={debate.status} />}
          {post.communityIds.slice(1).map((id) => {
            const c = getCommunityById(id);
            return c ? (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className="text-xs text-text-muted hover:text-accent hover:underline"
              >
                {c.name}
              </Link>
            ) : null;
          })}
        </div>
      )}

      <div className="mt-2">
        <PostActionBar
          postId={post.id}
          replyCount={post.replyCount}
          shareText={post.body.slice(0, 100)}
        />
      </div>
    </article>
  );
}
