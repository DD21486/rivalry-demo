import {
  DEFAULT_SUBSCRIBED_TEAM_SLUGS,
  SUBSCRIBED_TEAMS_STORAGE_KEY,
} from "./config";
import { communities } from "./mock/communities";
import type { Community } from "./types";

export function getTeamCommunities(): Community[] {
  return communities.filter((c) => c.type === "team");
}

export function getDefaultSubscribedSlugs(): string[] {
  return [...DEFAULT_SUBSCRIBED_TEAM_SLUGS];
}

export function readStoredSubscribedSlugs(): string[] | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SUBSCRIBED_TEAMS_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((s): s is string => typeof s === "string");
  } catch {
    return null;
  }
}

export function storeSubscribedSlugs(slugs: string[]): void {
  sessionStorage.setItem(SUBSCRIBED_TEAMS_STORAGE_KEY, JSON.stringify(slugs));
}

export function resolveSubscribedTeams(slugs: string[]): Community[] {
  const bySlug = new Map(getTeamCommunities().map((c) => [c.slug, c]));
  return slugs.map((slug) => bySlug.get(slug)).filter((c): c is Community => !!c);
}
