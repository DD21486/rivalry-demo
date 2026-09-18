"use client";

import { useState } from "react";
import { getUserById } from "@/lib/mock";
import { getTeamColor } from "@/lib/utils";
import { getCommunityById } from "@/lib/mock";
import type { Debate, RoundType } from "@/lib/types";

const ROUND_LABELS: Record<RoundType, string> = {
  OPENING: "Opening",
  REBUTTAL: "Rebuttal",
  CLOSING: "Closing",
};

interface DebateStageProps {
  debate: Debate;
}

export function DebateStage({ debate }: DebateStageProps) {
  const availableRounds = debate.rounds.map((r) => r.roundType);
  const [activeRound, setActiveRound] = useState<RoundType>(
    availableRounds[availableRounds.length - 1] ?? "OPENING"
  );

  const round = debate.rounds.find((r) => r.roundType === activeRound);

  const participants = debate.participantIds.map((id) => {
    const user = getUserById(id)!;
    const community = getCommunityById(user.primaryCommunityId);
    return { user, color: community ? getTeamColor(community.slug) : "#6366f1" };
  });

  if (debate.rounds.length === 0) {
    return (
      <div className="bg-bg-elevated border border-border rounded-xl p-6 text-center">
        <p className="text-text-secondary">Debate hasn&apos;t started yet.</p>
        {debate.scheduledAt && (
          <p className="text-sm text-text-muted mt-2">
            Scheduled to begin soon
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-bg-elevated border border-border rounded-xl shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          The Stage
        </h2>
      </div>

      <div className="flex border-b border-border">
        {(["OPENING", "REBUTTAL", "CLOSING"] as RoundType[]).map((rt) => {
          const hasContent = availableRounds.includes(rt);
          return (
            <button
              key={rt}
              onClick={() => hasContent && setActiveRound(rt)}
              disabled={!hasContent}
              className={`flex-1 py-3 text-sm font-medium transition-colors min-h-[44px] ${
                activeRound === rt
                  ? "text-accent border-b-2 border-accent bg-accent/5"
                  : hasContent
                    ? "text-text-secondary hover:text-text-primary"
                    : "text-text-muted cursor-not-allowed"
              }`}
            >
              {ROUND_LABELS[rt]}
            </button>
          );
        })}
      </div>

      <div className="p-4 space-y-6">
        {round?.arguments.map((arg) => {
          const participant = participants.find(
            (p) => p.user.id === arg.participantId
          );
          if (!participant) return null;

          return (
            <div
              key={arg.participantId}
              className="pl-4 border-l-4"
              style={{ borderColor: participant.color }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={participant.user.avatar}
                  alt={participant.user.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-text-primary">
                  {participant.user.displayName}
                </span>
              </div>
              <p className="text-[16px] leading-relaxed text-text-primary">
                {arg.body}
              </p>
            </div>
          );
        })}
        {!round?.arguments.length && (
          <p className="text-text-muted text-sm text-center py-4">
            No arguments submitted for this round yet.
          </p>
        )}
      </div>
    </div>
  );
}
