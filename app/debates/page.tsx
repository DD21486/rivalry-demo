"use client";

import { useState } from "react";
import { DebateCard } from "@/components/DebateCard";
import { getDebatesByStatus, debates } from "@/lib/mock";
import type { DebateStatus } from "@/lib/types";

const tabs: { label: string; status: DebateStatus }[] = [
  { label: "Live", status: "LIVE" },
  { label: "Voting", status: "VOTING" },
  { label: "Upcoming", status: "UPCOMING" },
  { label: "Completed", status: "COMPLETED" },
];

export default function DebatesPage() {
  const [activeTab, setActiveTab] = useState<DebateStatus>("LIVE");

  const filtered =
    activeTab === "COMPLETED"
      ? getDebatesByStatus("COMPLETED")
      : getDebatesByStatus(activeTab);

  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Debates</h1>
        <p className="text-text-secondary text-sm">
          {debates.length} debates across the SEC
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(({ label, status }) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium min-h-[44px] transition-colors ${
              activeTab === status
                ? "bg-accent text-white"
                : "bg-bg-muted text-text-secondary hover:text-text-primary"
            }`}
          >
            {label}
            <span className="ml-1.5 text-xs opacity-70">
              ({getDebatesByStatus(status).length})
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))
        ) : (
          <p className="text-text-muted text-sm py-8 text-center">
            No {activeTab.toLowerCase()} debates right now.
          </p>
        )}
      </div>
    </div>
  );
}
