const PHOTO_AVATARS = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.avif",
  "/avatars/avatar3.avif",
  "/avatars/avatar4.avif",
  "/avatars/avatar5.avif",
  "/avatars/avatar6.webp",
  "/avatars/avatar7.webp",
  "/avatars/avatar8.png",
] as const;

/** Stable faces for demo protagonists; everyone else gets a hashed photo. */
const USER_AVATAR_OVERRIDES: Record<string, (typeof PHOTO_AVATARS)[number]> = {
  u_derek: "/avatars/avatar1.jpg",
  u_mike: "/avatars/avatar2.avif",
  u_sarah: "/avatars/avatar3.avif",
  u_jake: "/avatars/avatar4.avif",
  u_coach: "/avatars/avatar5.avif",
  u_analyst: "/avatars/avatar6.webp",
  u_bbn: "/avatars/avatar7.webp",
  u_tide: "/avatars/avatar8.png",
};

export function resolveUserAvatar(userId: string): string {
  const override = USER_AVATAR_OVERRIDES[userId];
  if (override) return override;

  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash + userId.charCodeAt(i) * (i + 1)) >>> 0;
  }
  return PHOTO_AVATARS[hash % PHOTO_AVATARS.length];
}
