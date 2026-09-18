import type { ChallengeStatus, DebateStatus } from "@/lib/types";

const debateLabels: Record<DebateStatus, string> = {
  LIVE: "LIVE",
  VOTING: "VOTING",
  UPCOMING: "UPCOMING",
  COMPLETED: "COMPLETED",
  CHALLENGED: "CHALLENGED",
};

const challengeLabels: Record<ChallengeStatus, string> = {
  sent: "PENDING",
  negotiating: "NEGOTIATING",
  accepted: "ACCEPTED",
  declined: "DECLINED",
  expired: "EXPIRED",
};

const debateStyles: Record<DebateStatus, string> = {
  LIVE: "bg-status-live/20 text-status-live border-status-live/40 glow-live",
  VOTING: "bg-status-voting/20 text-status-voting border-status-voting/40",
  UPCOMING: "bg-status-upcoming/20 text-status-upcoming border-status-upcoming/40",
  COMPLETED: "bg-status-completed/20 text-status-completed border-status-completed/40",
  CHALLENGED: "bg-status-challenged/20 text-status-challenged border-status-challenged/40",
};

interface DebateStatusBadgeProps {
  status: DebateStatus | ChallengeStatus;
  type?: "debate" | "challenge";
}

export function DebateStatusBadge({ status, type = "debate" }: DebateStatusBadgeProps) {
  const label =
    type === "challenge"
      ? challengeLabels[status as ChallengeStatus]
      : debateLabels[status as DebateStatus];

  const style =
    type === "debate"
      ? debateStyles[status as DebateStatus]
      : status === "sent" || status === "negotiating"
        ? "bg-status-challenged/20 text-status-challenged border-status-challenged/40"
        : status === "accepted"
          ? "bg-status-completed/20 text-status-completed border-status-completed/40"
          : "bg-bg-muted text-text-muted border-border";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style}`}
    >
      {status === "LIVE" && (
        <span className="w-1.5 h-1.5 rounded-full bg-status-live animate-pulse-live" />
      )}
      {label}
    </span>
  );
}
