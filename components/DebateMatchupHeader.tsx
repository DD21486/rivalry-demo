"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCommunityById, getUserById } from "@/lib/mock";
import { formatRecord, getTeamColor } from "@/lib/utils";
import type { DebateStatus } from "@/lib/types";
import { UserAvatar } from "./UserAvatar";

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function useCountdown(endsAt: string | null, status: DebateStatus) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!endsAt || status === "COMPLETED") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt, status]);

  if (!endsAt || status === "COMPLETED") {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const diff = Math.max(0, new Date(endsAt).getTime() - now);
  return {
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    expired: diff === 0,
  };
}

function ScoreboardDigit({ value }: { value: string }) {
  return (
    <span className="inline-flex min-w-[2.75rem] items-center justify-center rounded-md border border-black/40 bg-[#0a0f0a] px-2 py-1.5 text-[1.75rem] font-bold leading-none tabular-nums text-[#ff3b30] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.08)]">
      {value}
    </span>
  );
}

interface DebateMatchupHeaderProps {
  participantIds: [string, string];
  endsAt: string | null;
  status: DebateStatus;
  clockLabel: string;
}

function ParticipantSlot({ userId }: { userId: string }) {
  const user = getUserById(userId);
  if (!user) return null;

  const community = getCommunityById(user.primaryCommunityId);
  const color = community ? getTeamColor(community.slug) : "#6366f1";

  return (
    <Link
      href={`/u/${user.username}`}
      className="flex flex-1 max-w-[140px] flex-col items-center gap-2 text-center group"
    >
      <UserAvatar
        userId={user.id}
        displayName={user.displayName}
        src={user.avatar}
        size="lg"
        ringColor={color}
        className="!w-16 !h-16 md:!w-20 md:!h-20 transition-transform group-hover:scale-[1.02]"
      />
      <div>
        <p className="font-bold text-text-primary text-base md:text-lg leading-tight">
          {user.displayName}
        </p>
        {community && (
          <p className="text-xs font-semibold mt-0.5" style={{ color }}>
            {community.name}
          </p>
        )}
        <p className="text-xs text-text-muted tabular-nums mt-1">
          {formatRecord(user.overallRecord.wins, user.overallRecord.losses)}
        </p>
      </div>
    </Link>
  );
}

export function DebateMatchupHeader({
  participantIds,
  endsAt,
  status,
  clockLabel,
}: DebateMatchupHeaderProps) {
  const { hours, minutes, seconds, expired } = useCountdown(endsAt, status);
  const showClock = status !== "COMPLETED" && endsAt;

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      {showClock && (
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-xl border-2 border-[#2a3a2a] bg-gradient-to-b from-[#1a241a] to-[#0d120d] px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400/90 uppercase">
                Rivalry Clock
              </span>
              <span className="text-[10px] font-semibold tracking-wide text-emerald-400/80 uppercase">
                {clockLabel}
              </span>
            </div>
            <div
              className="flex items-center justify-center gap-1.5 sm:gap-2"
              role="timer"
              aria-live="polite"
              aria-label={`${clockLabel}: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
            >
              <ScoreboardDigit value={pad2(hours)} />
              <span className="scoreboard-colon text-2xl font-bold text-[#ff3b30]/90 pb-1">
                :
              </span>
              <ScoreboardDigit value={pad2(minutes)} />
              <span className="scoreboard-colon text-2xl font-bold text-[#ff3b30]/90 pb-1">
                :
              </span>
              <ScoreboardDigit value={pad2(seconds)} />
            </div>
            {expired && (
              <p className="text-center text-[10px] font-bold tracking-widest text-amber-400 mt-2 uppercase">
                Time expired
              </p>
            )}
          </div>
        </div>
      )}

      {status === "COMPLETED" && (
        <div className="rounded-lg border border-white/10 bg-bg-muted px-6 py-2">
          <span className="text-sm font-black tracking-[0.25em] text-text-muted uppercase">
            Final
          </span>
        </div>
      )}

      <div className="flex w-full max-w-lg items-center justify-center gap-4 md:gap-8 px-2">
        <ParticipantSlot userId={participantIds[0]} />
        <div className="shrink-0 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-3xl font-black italic text-text-muted/90 tracking-tight">
            VS
          </span>
        </div>
        <ParticipantSlot userId={participantIds[1]} />
      </div>
    </div>
  );
}
