import { getCommunityById } from "@/lib/mock";
import { formatRecord, getTeamColor } from "@/lib/utils";
import { UserAvatar } from "./UserAvatar";
import type { User } from "@/lib/types";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const community = getCommunityById(user.primaryCommunityId);
  const teamColor = community ? getTeamColor(community.slug) : "#6366f1";

  return (
    <div className="surface-card rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <UserAvatar
          userId={user.id}
          displayName={user.displayName}
          src={user.avatar}
          size="lg"
          ringColor={teamColor}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-text-primary">
            {user.displayName}
          </h1>
          <p className="text-text-secondary">@{user.username}</p>
          {community && (
            <span
              className="inline-block mt-1 text-sm font-medium"
              style={{ color: teamColor }}
            >
              {community.name}
            </span>
          )}
        </div>
      </div>

      <p className="text-text-secondary mt-4">{user.bio}</p>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="bg-bg-muted rounded-lg px-4 py-2">
          <p className="text-xs text-text-muted uppercase">Overall</p>
          <p className="text-xl font-bold tabular-nums text-text-primary">
            {formatRecord(user.overallRecord.wins, user.overallRecord.losses)}
          </p>
        </div>
        {user.communityRecords.map((cr) => {
          const comm = getCommunityById(cr.communityId);
          return (
            <div key={cr.communityId} className="bg-bg-muted rounded-lg px-4 py-2">
              <p className="text-xs text-text-muted uppercase">
                {comm?.name ?? "Team"}
              </p>
              <p className="text-xl font-bold tabular-nums text-text-primary">
                {formatRecord(cr.record.wins, cr.record.losses)}
              </p>
            </div>
          );
        })}
        {user.streak > 0 && (
          <div className="bg-status-live/10 border border-status-live/30 rounded-lg px-4 py-2">
            <p className="text-xs text-status-live uppercase">Streak</p>
            <p className="text-xl font-bold tabular-nums text-status-live">
              {user.streak}W
            </p>
          </div>
        )}
      </div>

      {user.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {user.badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
