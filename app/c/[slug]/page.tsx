import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { DebateCard } from "@/components/DebateCard";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import {
  getCommunityBySlug,
  getPostsForCommunity,
  getDebatesForCommunity,
  getLeaderboardForCommunity,
} from "@/lib/mock";
import { getCommunityBreadcrumb } from "@/lib/utils";
import {
  CommunityBasketballIcon,
  getCommunityColor,
} from "@/components/CommunityBasketballIcon";
import { communities } from "@/lib/mock";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  const posts = getPostsForCommunity(community.id);
  const debates = getDebatesForCommunity(community.id).filter(
    (d) => d.status === "LIVE" || d.status === "VOTING"
  );
  const leaderboard = getLeaderboardForCommunity(community.id).slice(0, 5);
  const breadcrumb = getCommunityBreadcrumb(community, communities);
  const color = getCommunityColor(community);

  return (
    <div>
      <div className="px-4 py-4 border-b border-border">
        <nav className="flex items-center gap-1 text-xs text-text-muted mb-2 flex-wrap">
          {breadcrumb.map((c, i) => (
            <span key={c.id} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              <Link href={`/c/${c.slug}`} className="hover:text-accent">
                {c.name}
              </Link>
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <CommunityBasketballIcon
            slug={community.slug}
            color={color}
            size="lg"
            title={community.name}
          />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              {community.name}
            </h1>
            <p className="text-text-secondary text-sm">
              {community.memberCount.toLocaleString()} members
            </p>
          </div>
        </div>
      </div>

      {debates.length > 0 && (
        <section className="px-4 py-4 border-b border-border">
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
            Active Debates
          </h2>
          <div className="space-y-3">
            {debates.map((d) => (
              <DebateCard key={d.id} debate={d} />
            ))}
          </div>
        </section>
      )}

      {leaderboard.length > 0 && (
        <section className="px-4 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wide">
              Top Debaters
            </h2>
            <Link href="/leaderboard" className="text-xs text-accent">
              View all
            </Link>
          </div>
          <LeaderboardTable entries={leaderboard} />
        </section>
      )}

      <section className="px-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-text-muted text-sm py-8 text-center">
            No posts in this community yet.
          </p>
        )}
      </section>
    </div>
  );
}
