import Link from "next/link";
import { Eye } from "lucide-react";
import { getUserById, getCommunityById } from "@/lib/mock";
import { getTeamColor } from "@/lib/utils";
import { DebateStatusBadge } from "./DebateStatusBadge";
import { DebateTags } from "./DebateTags";
import { UserAvatar } from "./UserAvatar";
import type { Debate } from "@/lib/types";

interface DebateCardProps {
  debate: Debate;
}

export function DebateCard({ debate }: DebateCardProps) {
  const [p1, p2] = debate.participantIds.map((id) => getUserById(id)!);
  const c1 = getCommunityById(p1.primaryCommunityId);
  const c2 = getCommunityById(p2.primaryCommunityId);
  const color1 = c1 ? getTeamColor(c1.slug) : "#6366f1";
  const color2 = c2 ? getTeamColor(c2.slug) : "#6366f1";

  const isLive = debate.status === "LIVE";

  return (
    <Link
      href={`/debate/${debate.id}`}
      style={{
        background: `linear-gradient(145deg, color-mix(in srgb, ${color1} 16%, var(--bg-surface)) 0%, var(--bg-surface) 48%, color-mix(in srgb, ${color2} 14%, var(--bg-elevated)) 100%)`,
      }}
      className={`block p-4 rounded-2xl surface-card transition-all hover:brightness-[1.03] hover:border-white/10 ${
        isLive ? "border-status-live/35 glow-live" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <DebateStatusBadge status={debate.status} />
          <DebateTags communityIds={debate.communityIds} link={false} />
        </div>
        <span className="flex shrink-0 items-center gap-1 text-xs text-text-muted">
          <Eye className="w-3.5 h-3.5" />
          {debate.spectatorCount.toLocaleString()}
        </span>
      </div>

      <p className="font-medium text-text-primary mb-4 leading-snug">
        {debate.topic}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <UserAvatar
              userId={p1.id}
              displayName={p1.displayName}
              src={p1.avatar}
              size="sm"
              ringColor={color1}
            />
            <span className="text-sm font-medium text-text-primary">
              {p1.displayName}
            </span>
          </div>
          <span className="text-text-muted text-sm">vs</span>
          <div className="flex items-center gap-2">
            <UserAvatar
              userId={p2.id}
              displayName={p2.displayName}
              src={p2.avatar}
              size="sm"
              ringColor={color2}
            />
            <span className="text-sm font-medium text-text-primary">
              {p2.displayName}
            </span>
          </div>
        </div>
        {debate.status === "COMPLETED" && debate.voteTotals && (
          <span className="text-xs text-accent">Result →</span>
        )}
      </div>
    </Link>
  );
}
