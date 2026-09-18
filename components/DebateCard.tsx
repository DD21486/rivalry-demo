import Link from "next/link";
import { Eye } from "lucide-react";
import { getUserById, getCommunityById } from "@/lib/mock";
import { getTeamColor } from "@/lib/utils";
import { DebateStatusBadge } from "./DebateStatusBadge";
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
      className={`block p-4 bg-bg-surface border rounded-xl transition-colors hover:bg-bg-muted ${
        isLive ? "border-status-live/40 glow-live" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <DebateStatusBadge status={debate.status} />
        <span className="flex items-center gap-1 text-xs text-text-muted">
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
            <img
              src={p1.avatar}
              alt={p1.displayName}
              className="w-8 h-8 rounded-full"
              style={{ boxShadow: `0 0 0 2px ${color1}` }}
            />
            <span className="text-sm font-medium text-text-primary">
              {p1.displayName}
            </span>
          </div>
          <span className="text-text-muted text-sm">vs</span>
          <div className="flex items-center gap-2">
            <img
              src={p2.avatar}
              alt={p2.displayName}
              className="w-8 h-8 rounded-full"
              style={{ boxShadow: `0 0 0 2px ${color2}` }}
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
