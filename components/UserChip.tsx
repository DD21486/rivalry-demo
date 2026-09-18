import Link from "next/link";
import { getCommunityById, getUserById } from "@/lib/mock";
import { formatRecord } from "@/lib/utils";
import { getTeamColor } from "@/lib/utils";
import { CommunityBasketballIcon } from "./CommunityBasketballIcon";
import { UserAvatar } from "./UserAvatar";

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
      <UserAvatar
        userId={user.id}
        displayName={user.displayName}
        src={user.avatar}
        size={size === "sm" ? "sm" : "md"}
        ringColor={teamColor}
      />
      <div className="flex flex-col">
        <span className={`font-medium text-text-primary group-hover:text-accent ${size === "sm" ? "text-sm" : "text-base"}`}>
          {user.displayName}
        </span>
        <span className="text-xs text-text-secondary flex items-center gap-1.5">
          {community && (
            <span
              className="inline-flex items-center gap-1"
              style={{ color: teamColor }}
            >
              <CommunityBasketballIcon
                slug={community.slug}
                color={teamColor}
                size="sm"
              />
              {community.name}
            </span>
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
