import Link from "next/link";
import { getCommunityById, getUserById } from "@/lib/mock";
import { formatRecord } from "@/lib/utils";
import { getTeamColor } from "@/lib/utils";

interface UserChipProps {
  userId: string;
  showRecord?: boolean;
  size?: "sm" | "md";
}

export function UserChip({ userId, showRecord = true, size = "sm" }: UserChipProps) {
  const user = getUserById(userId);
  if (!user) return null;

  const community = getCommunityById(user.primaryCommunityId);
  const teamColor = community ? getTeamColor(community.slug) : "#6366f1";

  return (
    <Link
      href={`/u/${user.username}`}
      className="inline-flex items-center gap-2 min-h-[44px] group"
    >
      <img
        src={user.avatar}
        alt={user.displayName}
        className={`rounded-full ${size === "sm" ? "w-8 h-8" : "w-10 h-10"}`}
        style={{ boxShadow: `0 0 0 2px ${teamColor}` }}
      />
      <div className="flex flex-col">
        <span className={`font-medium text-text-primary group-hover:text-accent ${size === "sm" ? "text-sm" : "text-base"}`}>
          {user.displayName}
        </span>
        <span className="text-xs text-text-secondary flex items-center gap-1.5">
          {community && (
            <span style={{ color: teamColor }}>{community.name}</span>
          )}
          {showRecord && (
            <span className="tabular-nums text-text-muted">
              {formatRecord(user.overallRecord.wins, user.overallRecord.losses)}
            </span>
          )}
        </span>
      </div>
    </Link>
  );
}
