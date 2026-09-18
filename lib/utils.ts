import { TEAM_COLORS } from "./config";
import type { Community, Reply } from "./types";

export function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatRecord(wins: number, losses: number): string {
  return `${wins}–${losses}`;
}

export function getCommunityPath(slug: string): string {
  return `/c/${slug}`;
}

export function getTeamColor(slug: string): string {
  return TEAM_COLORS[slug] ?? "#6366f1";
}

export function getVotePercent(
  totalA: number,
  totalB: number,
  side: "a" | "b"
): number {
  const total = totalA + totalB;
  if (total === 0) return 50;
  return side === "a" ? Math.round((totalA / total) * 100) : Math.round((totalB / total) * 100);
}

export function buildReplyTree(replies: Reply[]): (Reply & { children: Reply[] })[] {
  const map = new Map<string, Reply & { children: Reply[] }>();
  const roots: (Reply & { children: Reply[] })[] = [];

  for (const reply of replies) {
    map.set(reply.id, { ...reply, children: [] });
  }

  for (const reply of replies) {
    const node = map.get(reply.id)!;
    if (reply.parentReplyId && map.has(reply.parentReplyId)) {
      map.get(reply.parentReplyId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export function getCommunityBreadcrumb(community: Community, all: Community[]): Community[] {
  const chain: Community[] = [community];
  let current = community;
  while (current.parentId) {
    const parent = all.find((c) => c.id === current.parentId);
    if (!parent) break;
    chain.unshift(parent);
    current = parent;
  }
  return chain;
}

export function avatarUrl(seed: string, bgColor: string): string {
  const color = bgColor.replace("#", "");
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${color}&textColor=ffffff`;
}
