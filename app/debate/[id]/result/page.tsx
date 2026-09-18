import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import { getDebateById } from "@/lib/mock";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DebateResultPage({ params }: Props) {
  const { id } = await params;
  const debate = getDebateById(id);
  if (!debate || debate.status !== "COMPLETED") notFound();

  return (
    <div className="space-y-6">
      <Link
        href={`/debate/${id}`}
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to debate
      </Link>

      <ResultCard debate={debate} />
    </div>
  );
}
