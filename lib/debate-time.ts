import type { Debate } from "./types";

/** ISO timestamp used for the scoreboard countdown on the debate page. */
export function getDebateCountdownEnd(debate: Debate): string | null {
  if (debate.status === "VOTING" && debate.votingEndsAt) {
    return debate.votingEndsAt;
  }
  if (debate.status === "LIVE" && debate.debateEndsAt) {
    return debate.debateEndsAt;
  }
  if (debate.status === "UPCOMING" && debate.scheduledAt) {
    return debate.scheduledAt;
  }
  return null;
}

export function getDebateCountdownLabel(debate: Debate): string {
  if (debate.status === "VOTING") return "Voting closes";
  if (debate.status === "UPCOMING") return "Debate starts";
  if (debate.status === "COMPLETED") return "Final";
  return "Debate ends";
}
