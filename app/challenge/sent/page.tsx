"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Swords } from "lucide-react";
import type { DebateInvitePayload } from "@/components/DebateInviteDialog";
import { DebateStatusBadge } from "@/components/DebateStatusBadge";
import { UserChip } from "@/components/UserChip";
import { getPostById, getUserById } from "@/lib/mock";
import { formatRelativeTime } from "@/lib/utils";

export default function ChallengeSentPage() {
  const [invite, setInvite] = useState<DebateInvitePayload | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("rivalry_last_invite");
    if (!raw) return;
    try {
      setInvite(JSON.parse(raw) as DebateInvitePayload);
    } catch {
      setInvite(null);
    }
  }, []);

  if (!invite) {
    return (
      <div className="px-4 py-12 text-center space-y-4">
        <p className="text-text-muted">No invite found. Start one from a post.</p>
        <Link href="/" className="text-accent font-medium inline-block min-h-[44px]">
          Back to feed
        </Link>
      </div>
    );
  }

  const challenger = getUserById(invite.challengerId);
  const opponent = getUserById(invite.opponentId);
  const sourcePost = getPostById(invite.sourcePostId);

  if (!challenger || !opponent) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-text-muted">Could not load invite details.</p>
      </div>
    );
  }

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
            <h1 className="text-xl font-bold text-text-primary">Invite sent</h1>
          </div>
          <DebateStatusBadge status="sent" type="challenge" />
        </div>

        <p className="text-lg text-text-primary font-medium mb-6">{invite.topic}</p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <UserChip userId={invite.challengerId} size="md" />
          <span className="text-text-muted font-bold">VS</span>
          <UserChip userId={invite.opponentId} size="md" />
        </div>

        <div className="bg-bg-muted rounded-lg p-4 mb-6 space-y-2">
          <h3 className="text-sm font-semibold text-text-secondary">Terms</h3>
          <p className="text-sm text-text-primary">
            <span className="text-text-muted">Duration:</span> {invite.terms.duration}
          </p>
          <p className="text-sm text-text-primary">
            <span className="text-text-muted">Rounds:</span>{" "}
            {invite.terms.rounds.join(" → ")}
          </p>
          <p className="text-xs text-text-muted mt-2">
            Sent {formatRelativeTime(invite.createdAt)}
          </p>
        </div>

        <p className="text-sm text-text-secondary text-center">
          Waiting for {opponent.displayName} to respond…
        </p>
      </div>
    </div>
  );
}
