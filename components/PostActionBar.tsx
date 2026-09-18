"use client";

import Link from "next/link";
import { MessageSquare, Share2 } from "lucide-react";

interface PostActionBarProps {
  postId: string;
  replyCount: number;
  shareText?: string;
}

export function PostActionBar({
  postId,
  replyCount,
  shareText,
}: PostActionBarProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      navigator.share({
        title: "Rivalry",
        text: shareText ?? "Check out this take on Rivalry",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex items-center gap-1 -ml-2">
      <Link
        href={`/post/${postId}`}
        className="inline-flex items-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold text-text-secondary hover:bg-bg-muted hover:text-text-primary transition-colors"
      >
        <MessageSquare className="w-[18px] h-[18px]" />
        {replyCount} {replyCount === 1 ? "Comment" : "Comments"}
      </Link>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold text-text-secondary hover:bg-bg-muted hover:text-text-primary transition-colors"
      >
        <Share2 className="w-[18px] h-[18px]" />
        Share
      </button>
    </div>
  );
}
