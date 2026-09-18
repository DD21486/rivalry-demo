"use client";

import { useState } from "react";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { getLeaderboardForCommunity } from "@/lib/mock";

const filterOptions = [
  { id: "sec", label: "SEC" },
  { id: "kentucky", label: "Kentucky" },
  { id: "alabama", label: "Alabama" },
  { id: "tennessee", label: "Tennessee" },
  { id: "florida", label: "Florida" },
  { id: "auburn", label: "Auburn" },
];

export default function LeaderboardPage() {
  const [communityId, setCommunityId] = useState("sec");
  const entries = getLeaderboardForCommunity(communityId);

  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Leaderboard
        </h1>
        <p className="text-text-secondary text-sm">
          Top debaters by community
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {filterOptions.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setCommunityId(id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium min-h-[44px] transition-colors ${
              communityId === id
                ? "bg-accent text-white"
                : "bg-bg-muted text-text-secondary hover:text-text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <LeaderboardTable entries={entries} />
    </div>
  );
}
