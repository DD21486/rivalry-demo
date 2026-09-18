"use client";

import Link from "next/link";
import { DEMO_USER_USERNAME } from "@/lib/config";
import { getUserByUsername } from "@/lib/mock";
import { UserAvatar } from "./UserAvatar";

interface ProfileAvatarProps {
  active?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  linked?: boolean;
}

const demoUser = getUserByUsername(DEMO_USER_USERNAME);

const avatarSize = {
  sm: "sm" as const,
  md: "md" as const,
  lg: "md" as const,
};

export function ProfileAvatar({
  active = false,
  size = "md",
  showLabel = false,
  linked = true,
}: ProfileAvatarProps) {
  const ringClass = active
    ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-surface rounded-full"
    : "";

  const avatar = demoUser ? (
    <UserAvatar
      userId={demoUser.id}
      displayName={demoUser.displayName}
      src={demoUser.avatar}
      size={avatarSize[size]}
      className={ringClass}
    />
  ) : (
    <div
      className={`${size === "sm" ? "w-8 h-8" : "w-10 h-10"} rounded-full bg-bg-muted ${ringClass}`}
    />
  );

  const content = (
    <>
      {avatar}
      {showLabel && (
        <span
          className={`text-[10px] font-medium ${active ? "text-accent" : "text-text-muted"}`}
        >
          Profile
        </span>
      )}
    </>
  );

  if (!linked) {
    return (
      <span className="inline-flex flex-col items-center gap-1">{content}</span>
    );
  }

  return (
    <Link
      href={`/u/${DEMO_USER_USERNAME}`}
      className={`inline-flex flex-col items-center gap-1 min-h-[44px] justify-center ${
        active ? "opacity-100" : "opacity-90 hover:opacity-100"
      }`}
      aria-label="Your profile"
    >
      {content}
    </Link>
  );
}
