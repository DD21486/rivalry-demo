"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Swords, Check, X } from "lucide-react";
import { getChallengeById, getUserById, getPostById } from "@/lib/mock";
import { DebateStatusBadge } from "@/components/DebateStatusBadge";
import { UserChip } from "@/components/UserChip";
import { formatRelativeTime } from "@/lib/utils";

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challenge = getChallengeById(params.id as string);

  if (!challenge) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Challenge not found.</p>
        <Link href="/" className="text-accent mt-4 inline-block">
          Back to home
        </Link>
      </div>
    );
  }

  const challenger = getUserById(challenge.challengerId)!;
  const opponent = getUserById(challenge.opponentId)!;
  const sourcePost = challenge.sourcePostId
    ? getPostById(challenge.sourcePostId)
    : null;

  const handleAccept = () => {
    if (challenge.linkedDebateId) {
      router.push(`/debate/${challenge.linkedDebateId}`);
    }
  };

  const handleDecline = () => {
    router.push("/");
  };

  return (
    <div className="px-4 py-4 space-y-6">
      <Link
        href={sourcePost ? `/post/${sourcePost.id}` : "/"}
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to thread
      </Link>

      <div className="bg-bg-elevated border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-accent" />
            <h1 className="text-xl font-bold text-text-primary">Challenge</h1>
          </div>
          <DebateStatusBadge status={challenge.status} type="challenge" />
        </div>

        <p className="text-lg text-text-primary font-medium mb-6">
          {challenge.topic}
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <UserChip userId={challenge.challengerId} size="md" />
          <span className="text-text-muted font-bold">VS</span>
          <UserChip userId={challenge.opponentId} size="md" />
        </div>

        <div className="bg-bg-muted rounded-lg p-4 mb-6 space-y-2">
          <h3 className="text-sm font-semibold text-text-secondary">Terms</h3>
          <p className="text-sm text-text-primary">
            <span className="text-text-muted">Duration:</span>{" "}
            {challenge.terms.duration}
          </p>
          <p className="text-sm text-text-primary">
            <span className="text-text-muted">Rounds:</span>{" "}
            {challenge.terms.rounds.join(" → ")}
          </p>
          <p className="text-xs text-text-muted mt-2">
            Sent {formatRelativeTime(challenge.createdAt)}
          </p>
        </div>

        {challenge.status === "sent" && (
          <div className="space-y-3">
            <p className="text-sm text-text-secondary text-center">
              Waiting for {opponent.displayName} to respond...
            </p>
          </div>
        )}

        {challenge.status === "negotiating" && (
          <div className="bg-status-challenged/10 border border-status-challenged/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-text-primary">
              <span className="font-semibold">{opponent.displayName}</span>{" "}
              countered with 48-hour duration. Accept modified terms?
            </p>
          </div>
        )}

        {(challenge.status === "sent" ||
          challenge.status === "negotiating" ||
          challenge.status === "accepted") &&
          challenge.linkedDebateId && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAccept}
                className="flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-accent text-white font-medium hover:bg-accent/90"
              >
                <Check className="w-4 h-4" />
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="flex items-center justify-center gap-2 min-h-[44px] rounded-lg border border-border text-text-secondary hover:bg-bg-muted"
              >
                <X className="w-4 h-4" />
                Decline
              </button>
            </div>
          )}

        {challenge.status === "accepted" && challenge.linkedDebateId && (
          <Link
            href={`/debate/${challenge.linkedDebateId}`}
            className="mt-4 flex items-center justify-center min-h-[44px] rounded-lg bg-status-completed/20 text-status-completed font-medium border border-status-completed/40"
          >
            View Live Debate →
          </Link>
        )}

        {challenge.status === "declined" && (
          <p className="text-center text-text-muted text-sm">
            This challenge was declined.
          </p>
        )}

        {challenge.status === "expired" && (
          <p className="text-center text-text-muted text-sm">
            This challenge expired without a response.
          </p>
        )}
      </div>

      {sourcePost && (
        <div className="text-sm text-text-muted">
          <span>Originated from thread by </span>
          <span className="text-text-secondary">{challenger.displayName}</span>
        </div>
      )}
    </div>
  );
}
