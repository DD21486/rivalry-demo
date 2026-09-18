"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  CommunityBasketballIcon,
  getCommunityColor,
} from "@/components/CommunityBasketballIcon";
import { TeamSubscribeSheet } from "@/components/TeamSubscribeSheet";
import {
  getDefaultSubscribedSlugs,
  readStoredSubscribedSlugs,
  resolveSubscribedTeams,
  storeSubscribedSlugs,
} from "@/lib/subscribed-teams";
import type { Community } from "@/lib/types";

export function YourTeamsStrip() {
  const [subscribedSlugs, setSubscribedSlugs] = useState<string[]>([]);
  const [teams, setTeams] = useState<Community[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredSubscribedSlugs();
    const slugs = stored ?? getDefaultSubscribedSlugs();
    setSubscribedSlugs(slugs);
    setTeams(resolveSubscribedTeams(slugs));
    setReady(true);
  }, []);

  const persist = useCallback((slugs: string[]) => {
    setSubscribedSlugs(slugs);
    setTeams(resolveSubscribedTeams(slugs));
    storeSubscribedSlugs(slugs);
  }, []);

  if (!ready) {
    return (
      <section className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <h2 className="text-sm font-bold text-text-primary mb-3">Your Teams</h2>
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="shrink-0 w-[72px]">
              <div className="w-[72px] h-[72px] rounded-2xl bg-bg-muted animate-pulse" />
              <div className="h-3 w-12 mx-auto mt-2 rounded bg-bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-text-primary">Your Teams</h2>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="text-xs font-semibold text-accent min-h-[44px] px-2 -mr-2"
          >
            Manage
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {teams.map((team) => {
            const color = getCommunityColor(team);
            return (
              <Link
                key={team.id}
                href={`/c/${team.slug}`}
                className="shrink-0 w-[72px] group"
              >
                <div
                  className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center border border-border/80 shadow-sm transition-transform group-active:scale-95"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 28%, var(--bg-muted))`,
                  }}
                >
                  <CommunityBasketballIcon slug={team.slug} color={color} size="md" />
                </div>
                <p className="mt-2 text-[11px] font-medium text-text-secondary text-center leading-tight line-clamp-2 group-hover:text-text-primary">
                  {team.name}
                </p>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="shrink-0 w-[72px]"
          >
            <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center border border-dashed border-border bg-bg-muted text-text-muted hover:border-accent hover:text-accent transition-colors">
              <Plus className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <p className="mt-2 text-[11px] font-medium text-text-muted text-center">
              Add team
            </p>
          </button>
        </div>
      </section>

      <TeamSubscribeSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        subscribedSlugs={subscribedSlugs}
        onChange={persist}
      />
    </>
  );
}
