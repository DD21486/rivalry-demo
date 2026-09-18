import { getTeamColor } from "@/lib/utils";
import type { Community } from "@/lib/types";

const SIZE_PX = {
  sm: 18,
  md: 40,
  lg: 48,
} as const;

export function getCommunityColor(community: Pick<Community, "slug" | "accentColor">): string {
  return community.accentColor ?? getTeamColor(community.slug);
}

interface CommunityBasketballIconProps {
  slug: string;
  color?: string;
  size?: keyof typeof SIZE_PX;
  className?: string;
  title?: string;
}

export function CommunityBasketballIcon({
  slug,
  color,
  size = "md",
  className = "",
  title,
}: CommunityBasketballIconProps) {
  const px = SIZE_PX[size];
  const fill = color ?? getTeamColor(slug);

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 32 32"
      className={`shrink-0 ${className}`}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="16" cy="16" r="15" fill={fill} />
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.75"
      />
      <path
        d="M16 1c0 0 8 6.5 8 15s-8 15-8 15"
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M16 1c0 0-8 6.5-8 15s8 15 8 15"
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M1.5 16h29"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="6"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.1"
      />
    </svg>
  );
}
