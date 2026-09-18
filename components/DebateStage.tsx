import { getUserById, getCommunityById } from "@/lib/mock";
import { formatRelativeTime, getTeamColor } from "@/lib/utils";
import type { Debate, RoundType } from "@/lib/types";
import { UserAvatar } from "./UserAvatar";

const ROUND_ORDER: RoundType[] = ["OPENING", "REBUTTAL", "CLOSING"];

const ROUND_LABELS: Record<RoundType, string> = {
  OPENING: "Opening",
  REBUTTAL: "Rebuttal",
  CLOSING: "Closing",
};

interface DebateStageProps {
  debate: Debate;
}

export function DebateStage({ debate }: DebateStageProps) {
  const participants = debate.participantIds.map((id) => {
    const user = getUserById(id)!;
    const community = getCommunityById(user.primaryCommunityId);
    const color = community ? getTeamColor(community.slug) : "#6366f1";
    return { user, color };
  });

  const orderedRounds = ROUND_ORDER.map((roundType) =>
    debate.rounds.find((r) => r.roundType === roundType)
  ).filter((r): r is NonNullable<typeof r> => !!r);

  if (orderedRounds.length === 0) {
    return (
      <div className="surface-card rounded-2xl p-6 text-center">
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
    <div className="surface-card rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          Debate timeline
        </h2>
      </div>

      <div className="p-4 md:p-6">
        <ol className="relative">
          {orderedRounds.map((round, index) => {
            const isLast = index === orderedRounds.length - 1;

            return (
              <li
                key={round.roundType}
                className={`relative pl-8 ${isLast ? "pb-0" : "pb-10"}`}
              >
                {!isLast && (
                  <span
                    className="absolute left-[11px] top-7 bottom-0 w-px bg-gradient-to-b from-white/20 to-white/5"
                    aria-hidden
                  />
                )}

                <span
                  className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-bg-elevated"
                  aria-hidden
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                </span>

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">
                    {ROUND_LABELS[round.roundType]}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Round {index + 1} of {orderedRounds.length}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {participants.map(({ user, color }) => {
                    const argument = round.arguments.find(
                      (a) => a.participantId === user.id
                    );

                    return (
                      <div
                        key={`${round.roundType}-${user.id}`}
                        className="rounded-xl border border-white/[0.07] p-4 min-h-[120px]"
                        style={{
                          background: `linear-gradient(160deg, color-mix(in srgb, ${color} 14%, var(--bg-surface)) 0%, var(--bg-surface) 70%)`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <UserAvatar
                            userId={user.id}
                            displayName={user.displayName}
                            src={user.avatar}
                            size="sm"
                            ringColor={color}
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-text-primary text-sm truncate">
                              {user.displayName}
                            </p>
                            {argument && (
                              <p className="text-[11px] text-text-muted">
                                {formatRelativeTime(argument.submittedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                        {argument ? (
                          <p className="text-[15px] leading-relaxed text-text-primary">
                            {argument.body}
                          </p>
                        ) : (
                          <p className="text-sm text-text-muted italic">
                            Waiting for this side…
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
