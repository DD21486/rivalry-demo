"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Swords } from "lucide-react";
import { users } from "@/lib/mock";
import { DEMO_USER_USERNAME } from "@/lib/config";
import type { RoundType } from "@/lib/types";

const DURATIONS = ["24 hours", "48 hours", "72 hours"] as const;

const ROUND_OPTIONS: { value: RoundType; label: string }[] = [
  { value: "OPENING", label: "Opening" },
  { value: "REBUTTAL", label: "Rebuttal" },
  { value: "CLOSING", label: "Closing" },
];

export interface DebateInvitePayload {
  challengerId: string;
  opponentId: string;
  topic: string;
  sourcePostId: string;
  terms: {
    topic: string;
    duration: string;
    rounds: RoundType[];
  };
  createdAt: string;
}

interface DebateInviteDialogProps {
  open: boolean;
  onClose: () => void;
  postId: string;
  defaultTopic: string;
  defaultOpponentId?: string;
}

export function DebateInviteDialog({
  open,
  onClose,
  postId,
  defaultTopic,
  defaultOpponentId,
}: DebateInviteDialogProps) {
  const router = useRouter();
  const demoUser = useMemo(
    () => users.find((u) => u.username === DEMO_USER_USERNAME),
    []
  );

  const inviteTargets = useMemo(
    () => users.filter((u) => u.id !== demoUser?.id),
    [demoUser]
  );

  const [opponentId, setOpponentId] = useState(defaultOpponentId ?? "");
  const [topic, setTopic] = useState(defaultTopic);
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("24 hours");
  const [rounds, setRounds] = useState<RoundType[]>([
    "OPENING",
    "REBUTTAL",
    "CLOSING",
  ]);

  useEffect(() => {
    if (!open) return;
    setTopic(defaultTopic);
    setOpponentId((current) => {
      if (defaultOpponentId && inviteTargets.some((u) => u.id === defaultOpponentId)) {
        return defaultOpponentId;
      }
      return current || inviteTargets[0]?.id || "";
    });
    setDuration("24 hours");
    setRounds(["OPENING", "REBUTTAL", "CLOSING"]);
  }, [open, defaultTopic, defaultOpponentId, inviteTargets]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !demoUser) return null;

  const toggleRound = (round: RoundType) => {
    setRounds((prev) => {
      if (prev.includes(round)) {
        if (prev.length === 1) return prev;
        return prev.filter((r) => r !== round);
      }
      return [...prev, round];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = topic.trim();
    if (!opponentId || !trimmed) return;

    const payload: DebateInvitePayload = {
      challengerId: demoUser.id,
      opponentId,
      topic: trimmed,
      sourcePostId: postId,
      terms: {
        topic: trimmed,
        duration,
        rounds: ROUND_OPTIONS.map((r) => r.value).filter((r) => rounds.includes(r)),
      },
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("rivalry_last_invite", JSON.stringify(payload));
    onClose();
    router.push("/challenge/sent");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="debate-invite-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close invite form"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-bg-elevated border border-border rounded-t-2xl sm:rounded-2xl shadow-xl">
        <div className="sticky top-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-bg-elevated">
          <div className="flex items-center gap-2 min-w-0">
            <Swords className="w-5 h-5 shrink-0 text-accent" />
            <h2
              id="debate-invite-title"
              className="text-lg font-bold text-text-primary truncate"
            >
              Invite to debate
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:bg-bg-muted hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-5">
          <p className="text-sm text-text-secondary">
            Send a structured debate invite from your account ({demoUser.displayName}).
            They can accept, counter terms, or decline.
          </p>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-text-secondary">
              Debate opponent
            </span>
            <select
              value={opponentId}
              onChange={(e) => setOpponentId(e.target.value)}
              required
              className="w-full min-h-[44px] px-3 rounded-lg bg-bg-muted border border-border text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="" disabled>
                Choose a fan to invite
              </option>
              {inviteTargets.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.displayName} (@{u.username})
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-text-secondary">
              Debate topic
            </span>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              rows={3}
              maxLength={280}
              placeholder="What are you debating?"
              className="w-full px-3 py-2.5 rounded-lg bg-bg-muted border border-border text-text-primary text-sm leading-relaxed resize-y min-h-[88px] focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-text-secondary">
              Duration
            </span>
            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value as (typeof DURATIONS)[number])
              }
              className="w-full min-h-[44px] px-3 rounded-lg bg-bg-muted border border-border text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-text-secondary">
              Rounds
            </legend>
            <div className="flex flex-wrap gap-2">
              {ROUND_OPTIONS.map(({ value, label }) => {
                const active = rounds.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleRound(value)}
                    className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-medium border transition-colors ${
                      active
                        ? "bg-accent/20 text-accent border-accent/40"
                        : "bg-bg-muted text-text-muted border-border"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[44px] rounded-lg border border-border text-text-secondary font-medium hover:bg-bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!opponentId || !topic.trim()}
              className="flex-1 min-h-[44px] rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none"
            >
              Send invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
