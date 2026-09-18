import { challenges } from "./challenges";
import { communities } from "./communities";
import { debates } from "./debates";
import { leaderboardEntries } from "./leaderboard";
import { posts } from "./posts";
import { replies } from "./replies";
import { users } from "./users";
import type { Community, Debate, Post, Reply, User } from "../types";

export { users, communities, posts, replies, challenges, debates, leaderboardEntries };

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

export function getCommunityById(id: string): Community | undefined {
  return communities.find((c) => c.id === id);
}

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function getRepliesForPost(postId: string): Reply[] {
  return replies.filter((r) => r.postId === postId);
}

export function getDebateById(id: string): Debate | undefined {
  return debates.find((d) => d.id === id);
}

export function getChallengeById(id: string) {
  return challenges.find((c) => c.id === id);
}

export function getPostsForCommunity(communityId: string): Post[] {
  return posts
    .filter((p) => p.communityIds.includes(communityId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getDebatesForCommunity(communityId: string): Debate[] {
  return debates.filter((d) => d.communityIds.includes(communityId));
}

export function getDebatesByStatus(status: Debate["status"]): Debate[] {
  return debates.filter((d) => d.status === status);
}

export function getLeaderboardForCommunity(communityId: string) {
  return leaderboardEntries
    .filter((e) => e.communityId === communityId || communityId === "sec")
    .sort((a, b) => a.rank - b.rank);
}

export function getRecentDebatesForUser(userId: string, limit = 5): Debate[] {
  return debates
    .filter((d) => d.participantIds.includes(userId))
    .sort((a, b) => {
      const dateA = a.completedAt ?? a.scheduledAt ?? "";
      const dateB = b.completedAt ?? b.scheduledAt ?? "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .slice(0, limit);
}

export function getChildCommunities(parentId: string): Community[] {
  return communities.filter((c) => c.parentId === parentId);
}

export function getSortedPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
