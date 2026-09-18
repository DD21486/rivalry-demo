export const APP_NAME = "Rivalry";
export const APP_TAGLINE = "Where fans prove who knows more.";
export const DEMO_USER_USERNAME = "derek_ky";

/** Demo user's followed teams (shown in home "Your Teams" slider). */
export const DEFAULT_SUBSCRIBED_TEAM_SLUGS = [
  "kentucky",
  "alabama",
  "tennessee",
  "auburn",
  "florida",
] as const;

export const SUBSCRIBED_TEAMS_STORAGE_KEY = "rivalry_subscribed_teams";

export const TEAM_COLORS: Record<string, string> = {
  ncaabb: "#6366f1",
  kentucky: "#0033A0",
  alabama: "#9E1B32",
  tennessee: "#FF8200",
  florida: "#0021A5",
  auburn: "#E87722",
  arkansas: "#9D2235",
  louisville: "#AD0000",
  sec: "#6366f1",
  acc: "#0085CA",
  "big-ten": "#007BB6",
  mizzou: "#F1B82D",
  vanderbilt: "#866D4B",
  georgia: "#BA0C2F",
  mississippi: "#660000",
  duke: "#003087",
  "north-carolina": "#7BAFD4",
  virginia: "#232D4B",
  michigan: "#00274C",
  "ohio-state": "#BB0000",
  purdue: "#CEB888",
  indiana: "#990000",
};

export const STATUS_COLORS: Record<string, string> = {
  LIVE: "#ef4444",
  VOTING: "#f59e0b",
  COMPLETED: "#22c55e",
  CHALLENGED: "#a855f7",
  UPCOMING: "#3b82f6",
};
