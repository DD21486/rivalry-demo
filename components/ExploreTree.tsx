"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import { communities, getChildCommunities } from "@/lib/mock";
import {
  CommunityBasketballIcon,
  getCommunityColor,
} from "@/components/CommunityBasketballIcon";
import type { Community } from "@/lib/types";

const DEFAULT_OPEN = new Set(["ncaabb", "sec"]);

function memberLabel(count: number): string {
  return `${count.toLocaleString()} members`;
}

function ExploreBranch({
  community,
  depth,
  openIds,
  onToggle,
}: {
  community: Community;
  depth: number;
  openIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const children = getChildCommunities(community.id);
  const hasChildren = children.length > 0;
  const isOpen = openIds.has(community.id);
  const color = getCommunityColor(community);
  const isTeam = community.type === "team";

  if (isTeam) {
    return (
      <Link
        href={`/c/${community.slug}`}
        className="flex items-center gap-3 min-h-[48px] py-2 pr-3 text-sm hover:bg-bg-muted/60 transition-colors"
        style={{ paddingLeft: 12 + depth * 16 }}
      >
        <CommunityBasketballIcon slug={community.slug} color={color} size="sm" />
        <span className="flex-1 font-medium text-text-primary">{community.name}</span>
        <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
      </Link>
    );
  }

  return (
    <div>
      <div
        className="flex items-stretch border-b border-border/60 last:border-b-0"
        style={{ paddingLeft: depth * 16 }}
      >
        <button
          type="button"
          onClick={() => hasChildren && onToggle(community.id)}
          className="flex flex-1 items-center gap-3 min-h-[52px] py-2 pr-2 text-left hover:bg-bg-muted/50 transition-colors disabled:cursor-default"
          aria-expanded={hasChildren ? isOpen : undefined}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            <ChevronDown
              className={`w-4 h-4 shrink-0 text-text-muted transition-transform ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          ) : (
            <span className="w-4 shrink-0" />
          )}
          <CommunityBasketballIcon slug={community.slug} color={color} size="sm" />
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-text-primary">{community.name}</span>
            <span className="block text-xs text-text-muted flex items-center gap-1 mt-0.5">
              <Users className="w-3 h-3" />
              {memberLabel(community.memberCount)}
              {hasChildren && (
                <>
                  <span className="text-text-muted/60">·</span>
                  {children.length} {community.type === "sport" ? "conferences" : "teams"}
                </>
              )}
            </span>
          </span>
        </button>
        <Link
          href={`/c/${community.slug}`}
          className="flex items-center px-3 text-xs font-semibold text-accent hover:bg-bg-muted/50 shrink-0"
        >
          Hub
        </Link>
      </div>
      {hasChildren && isOpen && (
        <div className="border-b border-border/60 bg-bg-surface/40">
          {children.map((child) => (
            <ExploreBranch
              key={child.id}
              community={child}
              depth={depth + 1}
              openIds={openIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ExploreTree() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(DEFAULT_OPEN));

  const root = communities.find((c) => c.parentId === null);
  if (!root) return null;

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden surface-card">
      <ExploreBranch
        community={root}
        depth={0}
        openIds={openIds}
        onToggle={toggle}
      />
    </div>
  );
}
