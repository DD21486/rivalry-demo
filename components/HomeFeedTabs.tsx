"use client";

import { useState } from "react";

type HomeTab = "debates" | "conversations";

interface HomeFeedTabsProps {
  debates: React.ReactNode;
  conversations: React.ReactNode;
  debateCount: number;
}

export function HomeFeedTabs({
  debates,
  conversations,
  debateCount,
}: HomeFeedTabsProps) {
  const [tab, setTab] = useState<HomeTab>("debates");

  return (
    <section>
      <div
        className="sticky top-[53px] md:top-0 z-20 bg-bg-base/75 backdrop-blur-xl border-b border-white/[0.06] px-4"
        role="tablist"
        aria-label="Home feed"
      >
        <div className="flex gap-1 py-2">
          <TabButton
            active={tab === "debates"}
            onClick={() => setTab("debates")}
            label="Active debates"
            badge={debateCount > 0 ? debateCount : undefined}
          />
          <TabButton
            active={tab === "conversations"}
            onClick={() => setTab("conversations")}
            label="Conversations"
          />
        </div>
      </div>

      <div role="tabpanel" className="px-4 py-4">
        {tab === "debates" ? debates : conversations}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex-1 min-h-[44px] rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 ${
        active
          ? "bg-bg-muted text-text-primary"
          : "text-text-muted hover:text-text-secondary hover:bg-bg-muted/50"
      }`}
    >
      {label}
      {badge !== undefined && (
        <span
          className={`text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full ${
            active ? "bg-accent/25 text-accent" : "bg-bg-elevated text-text-muted"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
