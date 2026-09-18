import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { DebateStage } from "@/components/DebateStage";
import { BleachersFeed } from "@/components/BleachersFeed";
import { VotePanel } from "@/components/VotePanel";
import { DebateStatusBadge } from "@/components/DebateStatusBadge";
import { DebateTags } from "@/components/DebateTags";
import { DebateMatchupHeader } from "@/components/DebateMatchupHeader";
import { getDebateById } from "@/lib/mock";
import { getDebateCountdownEnd, getDebateCountdownLabel } from "@/lib/debate-time";
interface Props {
  params: Promise<{ id: string }>;
}

export default async function DebatePage({ params }: Props) {
  const { id } = await params;
  const debate = getDebateById(id);
  if (!debate) notFound();

  const countdownEnd = getDebateCountdownEnd(debate);
  const countdownLabel = getDebateCountdownLabel(debate);

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
          <DebateTags communityIds={debate.communityIds} />
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Eye className="w-3.5 h-3.5" />
            {debate.spectatorCount.toLocaleString()} watching
          </span>
        </div>
        <h1 className="text-xl font-bold text-text-primary leading-snug mb-4 text-center md:text-left">
          {debate.topic}
        </h1>
        <DebateMatchupHeader
          participantIds={debate.participantIds}
          endsAt={countdownEnd}
          status={debate.status}
          clockLabel={countdownLabel}
        />
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
