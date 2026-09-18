"use client";

import { useState } from "react";
import { getUserById } from "@/lib/mock";
import { getTeamColor, getVotePercent } from "@/lib/utils";
import { getCommunityById } from "@/lib/mock";

interface VotePanelProps {
  debateId: string;
  participantIds: [string, string];
  initialTotals: { [key: string]: number };
}

function getStoredVote(debateId: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(`rivalry-vote-${debateId}`);
}

export function VotePanel({
  debateId,
  participantIds,
  initialTotals,
}: VotePanelProps) {
  const [totals, setTotals] = useState(initialTotals);
  const [votedFor, setVotedFor] = useState<string | null>(() =>
    getStoredVote(debateId)
  );

  const handleVote = (participantId: string) => {
    if (votedFor) return;
    setTotals((prev) => ({
      ...prev,
      [participantId]: (prev[participantId] ?? 0) + 1,
    }));
    setVotedFor(participantId);
    sessionStorage.setItem(`rivalry-vote-${debateId}`, participantId);
  };

  const totalA = totals[participantIds[0]] ?? 0;
  const totalB = totals[participantIds[1]] ?? 0;
  const percentA = getVotePercent(totalA, totalB, "a");
  const percentB = getVotePercent(totalA, totalB, "b");

  const participants = participantIds.map((id) => {
    const user = getUserById(id)!;
    const community = getCommunityById(user.primaryCommunityId);
    return {
      id,
      user,
      color: community ? getTeamColor(community.slug) : "#6366f1",
    };
  });

  return (
    <div className="bg-bg-elevated border border-status-voting/40 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-status-voting mb-3">
        Cast Your Vote
      </h3>

      <div className="h-3 rounded-full overflow-hidden flex mb-4 bg-bg-muted">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${percentA}%`, backgroundColor: participants[0].color }}
        />
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${percentB}%`, backgroundColor: participants[1].color }}
        />
      </div>

      <div className="flex justify-between text-sm tabular-nums text-text-secondary mb-4">
        <span>{percentA}%</span>
        <span>{totalA + totalB} votes</span>
        <span>{percentB}%</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {participants.map((p) => (
          <button
            key={p.id}
            onClick={() => handleVote(p.id)}
            disabled={!!votedFor}
            className={`min-h-[44px] py-3 px-4 rounded-lg font-medium text-sm transition-all border-2 ${
              votedFor === p.id
                ? "border-status-completed bg-status-completed/10 text-status-completed"
                : votedFor
                  ? "border-border bg-bg-muted text-text-muted cursor-not-allowed"
                  : "border-border hover:border-accent text-text-primary hover:bg-accent/5"
            }`}
            style={
              !votedFor
                ? { borderColor: `${p.color}66` }
                : undefined
            }
          >
            Vote {p.user.displayName}
          </button>
        ))}
      </div>

      {votedFor && (
        <p className="text-xs text-text-muted text-center mt-3">
          Vote recorded. Refresh to reset (demo only).
        </p>
      )}
    </div>
  );
}
