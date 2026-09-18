import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { DebateCard } from "@/components/DebateCard";
import { HomeFeedTabs } from "@/components/HomeFeedTabs";
import { YourTeamsStrip } from "@/components/YourTeamsStrip";
import { getSortedPosts, getDebatesByStatus } from "@/lib/mock";

export default function HomePage() {
  const posts = getSortedPosts();
  const liveDebates = getDebatesByStatus("LIVE");
  const votingDebates = getDebatesByStatus("VOTING");
  const activeDebates = [...liveDebates, ...votingDebates];

  return (
    <div>
      <YourTeamsStrip />

      <HomeFeedTabs
        debateCount={activeDebates.length}
        debates={
          activeDebates.length > 0 ? (
            <div className="space-y-3">
              {activeDebates.map((debate) => (
                <DebateCard key={debate.id} debate={debate} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-8">
              No live or voting debates right now. Check back soon or browse{" "}
              <Link href="/debates" className="text-accent font-medium">
                all debates
              </Link>
              .
            </p>
          )
        }
        conversations={
          <div className="flex flex-col gap-1">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        }
      />
    </div>
  );
}
