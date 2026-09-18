import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ReplyThread } from "@/components/ReplyThread";
import { PostActionBar } from "@/components/PostActionBar";
import {
  getPostById,
  getRepliesForPost,
  getCommunityById,
  getUserById,
} from "@/lib/mock";
import { formatRelativeTime, getTeamColor } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  const replies = getRepliesForPost(post.id);
  const author = getUserById(post.authorId);
  const primaryCommunity = getCommunityById(post.communityIds[0] ?? "");
  const teamColor = primaryCommunity
    ? getTeamColor(primaryCommunity.slug)
    : "#6366f1";

  return (
    <div>
      <div className="px-4 py-3 border-b border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent min-h-[44px] text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to feed
        </Link>
      </div>

      <article className="px-4 py-4 border-b border-border">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs mb-3">
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
          <span className="text-text-muted">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>

        <p className="text-text-primary text-lg leading-relaxed mb-4">
          {post.body}
        </p>

        <PostActionBar
          postId={post.id}
          replyCount={post.replyCount}
          shareText={post.body}
        />
      </article>

      <section className="px-4 py-3">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wide mb-2">
          {replies.length} Comments
        </h2>
        <ReplyThread replies={replies} postId={post.id} />
      </section>
    </div>
  );
}
