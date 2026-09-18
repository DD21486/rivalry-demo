import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { DebateStage } from "@/components/DebateStage";
import { BleachersFeed } from "@/components/BleachersFeed";
import { VotePanel } from "@/components/VotePanel";
import { DebateStatusBadge } from "@/components/DebateStatusBadge";
import { UserChip } from "@/components/UserChip";
import { getDebateById, getCommunityById } from "@/lib/mock";
import { formatRelativeTime } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DebatePage({ params }: Props) {
  const { id } = await params;
  const debate = getDebateById(id);
  if (!debate) notFound();

  const communities = debate.communityIds
    .map((cid) => getCommunityById(cid))
    .filter(Boolean);

  return (
    <div className="px-4 py-4 space-y-6">
      <Link
        href="/debates"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        All debates
      </Link>

      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <DebateStatusBadge status={debate.status} />
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Eye className="w-3.5 h-3.5" />
            {debate.spectatorCount.toLocaleString()} watching
          </span>
          {debate.votingEndsAt && debate.status === "VOTING" && (
            <span className="text-xs text-status-voting">
              Voting ends {formatRelativeTime(debate.votingEndsAt).replace(" ago", "")}
            </span>
          )}
        </div>
        <h1 className="text-xl font-bold text-text-primary leading-snug mb-3">
          {debate.topic}
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <UserChip userId={debate.participantIds[0]} size="md" />
          <span className="text-text-muted font-bold text-sm">VS</span>
          <UserChip userId={debate.participantIds[1]} size="md" />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {communities.map((c) =>
            c ? (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className="px-2 py-0.5 rounded-full text-xs bg-bg-muted text-text-secondary hover:text-accent"
              >
                {c.name}
              </Link>
            ) : null
          )}
        </div>
      </div>

      <DebateStage debate={debate} />

      {debate.status === "VOTING" && debate.voteTotals && (
        <VotePanel
          debateId={debate.id}
          participantIds={debate.participantIds}
          initialTotals={debate.voteTotals}
        />
      )}

      {debate.status === "COMPLETED" && (
        <Link
          href={`/debate/${debate.id}/result`}
          className="flex items-center justify-center min-h-[44px] rounded-lg bg-status-completed/20 text-status-completed font-medium border border-status-completed/40 hover:bg-status-completed/30"
        >
          View Result Card →
        </Link>
      )}

      <BleachersFeed comments={debate.bleacherComments} />
    </div>
  );
}
