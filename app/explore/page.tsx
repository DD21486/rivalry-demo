import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { communities, getChildCommunities } from "@/lib/mock";
import { getTeamColor } from "@/lib/utils";

function CommunityNode({
  community,
  depth = 0,
}: {
  community: (typeof communities)[0];
  depth?: number;
}) {
  const children = getChildCommunities(community.id);
  const color = getTeamColor(community.slug);

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <Link
        href={`/c/${community.slug}`}
        className="flex items-center justify-between p-4 bg-bg-surface border border-border rounded-xl hover:bg-bg-muted transition-colors min-h-[44px] mb-2"
      >
        <div className="flex items-center gap-3">
          {community.type === "team" && (
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
          <div>
            <p className="font-medium text-text-primary">{community.name}</p>
            <p className="text-xs text-text-muted flex items-center gap-1">
              <Users className="w-3 h-3" />
              {community.memberCount.toLocaleString()} members
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-text-muted" />
      </Link>
      {children.map((child) => (
        <CommunityNode key={child.id} community={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function ExplorePage() {
  const root = communities.find((c) => c.parentId === null)!;

  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Explore</h1>
        <p className="text-text-secondary text-sm">
          Browse NCAA Basketball communities
        </p>
      </div>
      <CommunityNode community={root} />
    </div>
  );
}
