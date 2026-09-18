import Link from "next/link";
import { getCommunityById, getUserById } from "@/lib/mock";
import { formatRecord, getTeamColor } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/types";
import { UserAvatar } from "./UserAvatar";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
      <div className="grid grid-cols-[48px_1fr_80px_60px] gap-2 px-4 py-3 border-b border-border text-xs font-semibold text-text-muted uppercase">
        <span>#</span>
        <span>Debater</span>
        <span className="text-right">W–L</span>
        <span className="text-right">Streak</span>
      </div>
      <div className="divide-y divide-border">
        {entries.map((entry) => {
          const user = getUserById(entry.userId);
          if (!user) return null;
          const community = getCommunityById(entry.communityId);
          const color = community ? getTeamColor(community.slug) : "#6366f1";

          return (
            <Link
              key={`${entry.rank}-${entry.userId}`}
              href={`/u/${user.username}`}
              className="grid grid-cols-[48px_1fr_80px_60px] gap-2 px-4 py-3 items-center hover:bg-bg-muted transition-colors min-h-[44px]"
            >
              <span
                className={`font-bold tabular-nums ${
                  entry.rank <= 3 ? "text-accent" : "text-text-muted"
                }`}
              >
                {entry.rank}
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <UserAvatar
                  userId={user.id}
                  displayName={user.displayName}
                  src={user.avatar}
                  size="sm"
                  ringColor={color}
                />
                <div className="min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {user.displayName}
                  </p>
                  <p className="text-xs truncate" style={{ color }}>
                    {community?.name}
                  </p>
                </div>
              </div>
              <span className="text-right tabular-nums text-text-primary font-medium">
                {formatRecord(entry.record.wins, entry.record.losses)}
              </span>
              <span className="text-right tabular-nums text-text-secondary">
                {entry.streak > 0 ? `${entry.streak}W` : "—"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
