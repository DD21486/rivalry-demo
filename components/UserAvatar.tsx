"use client";

import { useState } from "react";
import { resolveUserAvatar } from "@/lib/avatars";
import { avatarUrl } from "@/lib/utils";

const FALLBACK_PHOTO = "/avatars/avatar1.jpg";

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  card: "w-16 h-16",
  lg: "w-20 h-20",
  xl: "w-24 h-24",
} as const;

interface UserAvatarProps {
  userId: string;
  displayName: string;
  src?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
  ringColor?: string;
}

export function UserAvatar({
  userId,
  displayName,
  src,
  size = "sm",
  className = "",
  ringColor,
}: UserAvatarProps) {
  const [imgSrc, setImgSrc] = useState(src ?? resolveUserAvatar(userId));

  const handleError = () => {
    if (imgSrc === FALLBACK_PHOTO) {
      setImgSrc(avatarUrl(displayName, "6366f1"));
      return;
    }
    setImgSrc(FALLBACK_PHOTO);
  };

  return (
    <img
      src={imgSrc}
      alt={displayName}
      onError={handleError}
      className={`${sizeClasses[size]} rounded-full object-cover bg-bg-muted shrink-0 ${className}`}
      style={ringColor ? { boxShadow: `0 0 0 2px ${ringColor}` } : undefined}
    />
  );
}
