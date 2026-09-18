import { getUserById } from "@/lib/mock";
import { formatRelativeTime } from "@/lib/utils";
import type { BleacherComment } from "@/lib/types";
import { UserAvatar } from "./UserAvatar";

interface BleachersFeedProps {
  comments: BleacherComment[];
}

export function BleachersFeed({ comments }: BleachersFeedProps) {
  if (comments.length === 0) {
    return (
      <div className="bg-bg-surface border border-border rounded-xl p-6 text-center">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">
          The Bleachers
        </h2>
        <p className="text-text-muted text-sm">No spectator comments yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          The Bleachers
        </h2>
        <p className="text-xs text-text-muted mt-0.5">
          {comments.length} spectator comments
        </p>
      </div>
      <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
        {comments.map((comment) => {
          const author = getUserById(comment.authorId);
          return (
            <div key={comment.id} className="px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                {author && (
                  <UserAvatar
                    userId={author.id}
                    displayName={author.displayName}
                    src={author.avatar}
                    size="xs"
                  />
                )}
                <span className="text-sm font-medium text-text-primary">
                  {author?.displayName ?? "Fan"}
                </span>
                <span className="text-xs text-text-muted">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {comment.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
