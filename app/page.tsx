import { PostCard } from "@/components/PostCard";
import { DebateCard } from "@/components/DebateCard";
import { getSortedPosts, getDebatesByStatus } from "@/lib/mock";

export default function HomePage() {
  const posts = getSortedPosts();
  const liveDebates = getDebatesByStatus("LIVE");
  const votingDebates = getDebatesByStatus("VOTING");

  return (
    <div>
      {(liveDebates.length > 0 || votingDebates.length > 0) && (
        <section className="px-4 py-4 border-b border-border">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
            Active Debates
          </h2>
          <div className="space-y-3">
            {[...liveDebates, ...votingDebates].map((debate) => (
              <DebateCard key={debate.id} debate={debate} />
            ))}
          </div>
        </section>
      )}

      <section className="px-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
