import Link from "next/link";
import { Swords } from "lucide-react";

interface ChallengeButtonProps {
  challengeId: string;
}

export function ChallengeButton({ challengeId }: ChallengeButtonProps) {
  return (
    <Link
      href={`/challenge/${challengeId}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[36px] rounded-lg border border-accent text-accent text-xs font-semibold hover:bg-accent/10 transition-colors"
    >
      <Swords className="w-4 h-4" />
      Challenge
    </Link>
  );
}
