import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/ProfileHeader";
import { DebateCard } from "@/components/DebateCard";
import { PostCard } from "@/components/PostCard";
import {
  getUserByUsername,
  getRecentDebatesForUser,
  posts,
} from "@/lib/mock";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const user = getUserByUsername(username);
  if (!user) notFound();

  const recentDebates = getRecentDebatesForUser(user.id);
  const userPosts = posts
    .filter((p) => p.authorId === user.id)
    .slice(0, 5);

  return (
    <div>
      <div className="px-4 py-4 border-b border-border">
        <ProfileHeader user={user} />
      </div>

      <section className="px-4 py-4 border-b border-border">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
          Recent Debates
        </h2>
        {recentDebates.length > 0 ? (
          <div className="space-y-3">
            {recentDebates.map((debate) => (
              <DebateCard key={debate.id} debate={debate} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm py-4 text-center">
            No debates yet.
          </p>
        )}
      </section>

      {userPosts.length > 0 && (
        <section className="px-4">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wide py-3">
            Recent Posts
          </h2>
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </div>
  );
}
