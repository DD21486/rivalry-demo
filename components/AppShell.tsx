"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Swords, Compass, Trophy } from "lucide-react";
import { APP_NAME, DEMO_USER_USERNAME } from "@/lib/config";
import { ProfileAvatar } from "./ProfileAvatar";

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/debates", label: "Debates", icon: Swords },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

const profileHref = `/u/${DEMO_USER_USERNAME}`;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const profileActive = pathname.startsWith(profileHref);

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border bg-bg-surface fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-border">
          <Link href="/" className="block">
            <h1 className="text-xl font-bold text-text-primary">{APP_NAME}</h1>
            <p className="text-xs text-text-muted mt-0.5">
              Where fans prove who knows more
            </p>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {mainNavItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg min-h-[44px] transition-colors ${
                isActive(href)
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:bg-bg-muted hover:text-text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href={profileHref}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg min-h-[44px] transition-colors ${
              profileActive
                ? "bg-accent/10"
                : "hover:bg-bg-muted"
            }`}
          >
            <ProfileAvatar active={profileActive} size="sm" linked={false} />
            <div className="min-w-0">
              <p className={`text-sm font-medium truncate ${profileActive ? "text-accent" : "text-text-primary"}`}>
                Derek
              </p>
              <p className="text-xs text-text-muted truncate">@derek_ky</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        <header className="md:hidden sticky top-0 z-30 bg-bg-surface/95 backdrop-blur border-b border-border px-4 py-3">
          <Link href="/">
            <h1 className="text-lg font-bold text-text-primary">{APP_NAME}</h1>
          </Link>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto md:max-w-3xl pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile bottom nav — profile pinned to the right */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-surface/95 backdrop-blur border-t border-border safe-bottom">
          <div className="flex items-center h-16 max-w-lg mx-auto px-2">
            <div className="flex flex-1 justify-around">
              {mainNavItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] ${
                    isActive(href) ? "text-accent" : "text-text-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              ))}
            </div>
            <div className="pl-3 ml-1 border-l border-border">
              <ProfileAvatar active={profileActive} size="sm" showLabel />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
