import Link from "next/link";
import { DEMO_USER_USERNAME } from "@/lib/config";

interface ProfileAvatarProps {
  active?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  linked?: boolean;
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

function AvatarCircle({
  active,
  size,
}: {
  active: boolean;
  size: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
        active ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-surface" : ""
      }`}
      style={{
        background:
          "linear-gradient(135deg, #0033A0 0%, #6366f1 50%, #FF8200 100%)",
      }}
    >
      DK
    </div>
  );
}

export function ProfileAvatar({
  active = false,
  size = "md",
  showLabel = false,
  linked = true,
}: ProfileAvatarProps) {
  const content = (
    <>
      <AvatarCircle active={active} size={size} />
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
