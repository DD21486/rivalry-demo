import Link from "next/link";
import { getCommunityById } from "@/lib/mock";
import type { Community } from "@/lib/types";
import {
  CommunityBasketballIcon,
  getCommunityColor,
} from "./CommunityBasketballIcon";

function getTagCommunities(communityIds: string[]): Community[] {
  const resolved = communityIds
    .map((id) => getCommunityById(id))
    .filter((c): c is Community => !!c);

  const teams = resolved.filter((c) => c.type === "team");
  const conferences = resolved.filter((c) => c.type === "conference");

  if (conferences.length === 0 && teams.length > 0) {
    const parentIds = [...new Set(teams.map((t) => t.parentId).filter(Boolean))];
    const inferred = parentIds
      .map((id) => getCommunityById(id!))
      .filter((c): c is Community => !!c && c.type === "conference");
    if (inferred.length === 1) {
      conferences.push(inferred[0]);
    }
  }

  return [...teams, ...conferences];
}

const tagClassName =
  "px-2 py-0.5 rounded-full text-xs bg-bg-muted text-text-secondary border border-border/60";

interface DebateTagsProps {
  communityIds: string[];
  /** Set false when rendered inside another link (e.g. DebateCard). */
  link?: boolean;
}

export function DebateTags({ communityIds, link = true }: DebateTagsProps) {
  const tags = getTagCommunities(communityIds);
  if (tags.length === 0) return null;

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {tags.map((c) =>
        link ? (
          <Link
            key={c.id}
            href={`/c/${c.slug}`}
            className={`${tagClassName} inline-flex items-center gap-1 hover:text-accent`}
          >
            <CommunityBasketballIcon
              slug={c.slug}
              color={getCommunityColor(c)}
              size="sm"
            />
            {c.name}
          </Link>
        ) : (
          <span
            key={c.id}
            className={`${tagClassName} inline-flex items-center gap-1 text-text-muted`}
          >
            <CommunityBasketballIcon
              slug={c.slug}
              color={getCommunityColor(c)}
              size="sm"
            />
            {c.name}
          </span>
        )
      )}
    </span>
  );
}
