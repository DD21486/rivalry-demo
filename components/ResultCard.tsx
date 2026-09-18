"use client";

import Link from "next/link";
import { Share2, Trophy } from "lucide-react";
import { getUserById } from "@/lib/mock";
import { getCommunityById } from "@/lib/mock";
import { getTeamColor, getVotePercent, formatRecord } from "@/lib/utils";
import type { Debate } from "@/lib/types";

interface ResultCardProps {
  debate: Debate;
}

export function ResultCard({ debate }: ResultCardProps) {
  if (!debate.voteTotals || !debate.winnerId) return null;

  const winner = getUserById(debate.winnerId)!;
  const loserId = debate.participantIds.find((id) => id !== debate.winnerId)!;
  const loser = getUserById(loserId)!;

  const winnerTotal = debate.voteTotals[debate.winnerId] ?? 0;
  const loserTotal = debate.voteTotals[loserId] ?? 0;
  const winnerPct = getVotePercent(winnerTotal, loserTotal, "a");
  const loserPct = getVotePercent(winnerTotal, loserTotal, "b");

  const winnerCommunity = getCommunityById(winner.primaryCommunityId);
  const winnerColor = winnerCommunity
    ? getTeamColor(winnerCommunity.slug)
    : "#6366f1";

  return (
    <div
      className="rounded-2xl p-[2px]"
      style={{
        background: `linear-gradient(135deg, ${winnerColor}, var(--accent))`,
      }}
    >
      <div className="bg-bg-elevated rounded-2xl p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-status-completed" />
          <h2 className="text-xl font-bold text-text-primary">Verdict</h2>
        </div>

        <p className="text-center text-text-secondary mb-6">{debate.topic}</p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <img
              src={winner.avatar}
              alt={winner.displayName}
              className="w-16 h-16 rounded-full mx-auto mb-2"
              style={{ boxShadow: `0 0 0 3px ${winnerColor}` }}
            />
            <p className="font-bold text-text-primary">{winner.displayName}</p>
            <p className="text-2xl font-bold tabular-nums text-status-completed">
              {winnerPct}%
            </p>
            <p className="text-xs text-text-muted mt-1">WINNER</p>
          </div>
          <span className="text-2xl text-text-muted font-light">vs</span>
          <div className="text-center opacity-70">
            <img
              src={loser.avatar}
              alt={loser.displayName}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-medium text-text-secondary">{loser.displayName}</p>
            <p className="text-2xl font-bold tabular-nums text-text-muted">
              {loserPct}%
            </p>
          </div>
        </div>

        <div className="bg-bg-muted rounded-lg p-3 mb-4 text-center">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{winner.displayName}</span>
            {" "}record updated to{" "}
            <span className="tabular-nums font-semibold text-status-completed">
              {formatRecord(
                winner.overallRecord.wins + 1,
                winner.overallRecord.losses
              )}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/debate/${debate.id}`}
            className="flex-1 min-h-[44px] flex items-center justify-center rounded-lg border border-border text-text-secondary text-sm hover:bg-bg-muted"
          >
            View Debate
          </Link>
          <button
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Rivalry Debate Result",
                  text: `${winner.displayName} won: ${debate.topic}`,
                  url: window.location.href,
                });
              }
            }}
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
