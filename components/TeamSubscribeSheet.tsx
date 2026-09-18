"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";
import {
  CommunityBasketballIcon,
  getCommunityColor,
} from "@/components/CommunityBasketballIcon";
import { getTeamCommunities } from "@/lib/subscribed-teams";

interface TeamSubscribeSheetProps {
  open: boolean;
  onClose: () => void;
  subscribedSlugs: string[];
  onChange: (slugs: string[]) => void;
}

export function TeamSubscribeSheet({
  open,
  onClose,
  subscribedSlugs,
  onChange,
}: TeamSubscribeSheetProps) {
  const allTeams = getTeamCommunities();

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

  if (!open) return null;

  const toggle = (slug: string) => {
    if (subscribedSlugs.includes(slug)) {
      if (subscribedSlugs.length === 1) return;
      onChange(subscribedSlugs.filter((s) => s !== slug));
      return;
    }
    onChange([...subscribedSlugs, slug]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-teams-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col bg-bg-elevated border border-border rounded-t-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id="subscribe-teams-title" className="text-lg font-bold text-text-primary">
            Subscribe to teams
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:bg-bg-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="px-4 pt-3 text-sm text-text-secondary">
          Pick SEC teams for your home slider. Tap a team to follow or unfollow.
        </p>
        <ul className="overflow-y-auto p-4 space-y-2">
          {allTeams.map((team) => {
            const subscribed = subscribedSlugs.includes(team.slug);
            const color = getCommunityColor(team);
            return (
              <li key={team.id}>
                <button
                  type="button"
                  onClick={() => toggle(team.slug)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border min-h-[56px] text-left transition-colors ${
                    subscribed
                      ? "border-accent/40 bg-accent/10"
                      : "border-border bg-bg-surface hover:bg-bg-muted"
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-border/60"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${color} 28%, var(--bg-muted))`,
                    }}
                  >
                    <CommunityBasketballIcon slug={team.slug} color={color} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary">{team.name}</p>
                    <p className="text-xs text-text-muted">
                      {team.memberCount.toLocaleString()} members
                    </p>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                      subscribed
                        ? "bg-accent border-accent text-white"
                        : "border-border text-transparent"
                    }`}
                    aria-hidden
                  >
                    <Check className="w-4 h-4" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="p-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
