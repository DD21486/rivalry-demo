"use client";

import { useState } from "react";
import { Swords } from "lucide-react";
import { DebateInviteDialog } from "./DebateInviteDialog";

interface InviteToDebateButtonProps {
  postId: string;
  defaultTopic: string;
  defaultOpponentId?: string;
  size?: "sm" | "md";
}

export function InviteToDebateButton({
  postId,
  defaultTopic,
  defaultOpponentId,
  size = "md",
}: InviteToDebateButtonProps) {
  const [inviteOpen, setInviteOpen] = useState(false);

  const sm = size === "sm";

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setInviteOpen(true);
        }}
        className={`inline-flex items-center gap-1.5 rounded-lg font-semibold text-text-secondary hover:bg-bg-muted hover:text-accent transition-colors ${
          sm
            ? "px-2.5 py-2 min-h-[36px] text-xs text-text-muted hover:text-accent"
            : "px-3 py-2.5 min-h-[44px] text-sm"
        }`}
      >
        <Swords className={sm ? "w-4 h-4" : "w-[18px] h-[18px]"} />
        Invite to debate
      </button>
      <DebateInviteDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        postId={postId}
        defaultTopic={defaultTopic}
        defaultOpponentId={defaultOpponentId}
      />
    </>
  );
}
