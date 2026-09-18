export type DebateStatus =
  | "LIVE"
  | "VOTING"
  | "UPCOMING"
  | "COMPLETED"
  | "CHALLENGED";

export type ChallengeStatus =
  | "sent"
  | "negotiating"
  | "accepted"
  | "declined"
  | "expired";

export type RoundType = "OPENING" | "REBUTTAL" | "CLOSING";

export type CommunityType = "sport" | "conference" | "team";

export interface Record {
  wins: number;
  losses: number;
}

export interface CommunityRecord {
  communityId: string;
  record: Record;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  primaryCommunityId: string;
  overallRecord: Record;
  communityRecords: CommunityRecord[];
  badges: string[];
  streak: number;
  joinedAt: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  type: CommunityType;
  parentId: string | null;
  sport: string;
  memberCount: number;
  accentColor?: string;
}

export interface Post {
  id: string;
  authorId: string;
  communityIds: string[];
  body: string;
  reactionCount: number;
  replyCount: number;
  debateId?: string;
  createdAt: string;
  isHot?: boolean;
}

export interface Reply {
  id: string;
  postId: string;
  parentReplyId?: string;
  authorId: string;
  body: string;
  reactionCount: number;
  createdAt: string;
  challengeId?: string;
}

export interface ChallengeTerms {
  topic: string;
  duration: string;
  rounds: RoundType[];
}

export interface Challenge {
  id: string;
  status: ChallengeStatus;
  challengerId: string;
  opponentId: string;
  topic: string;
  sourcePostId?: string;
  sourceReplyId?: string;
  terms: ChallengeTerms;
  createdAt: string;
  linkedDebateId?: string;
}

export interface DebateArgument {
  participantId: string;
  body: string;
  submittedAt: string;
}

export interface DebateRound {
  roundType: RoundType;
  arguments: DebateArgument[];
}

export interface BleacherComment {
  id: string;
  authorId: string;
  body: string;
  reactionCount: number;
  createdAt: string;
}

export interface VoteTotals {
  [participantId: string]: number;
}

export interface Debate {
  id: string;
  status: DebateStatus;
  participantIds: [string, string];
  topic: string;
  communityIds: string[];
  sourceChallengeId?: string;
  rounds: DebateRound[];
  bleacherComments: BleacherComment[];
  voteTotals?: VoteTotals;
  winnerId?: string;
  spectatorCount: number;
  scheduledAt?: string;
  completedAt?: string;
  votingEndsAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  communityId: string;
  record: Record;
  streak: number;
}
