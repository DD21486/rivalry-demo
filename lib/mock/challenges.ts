import type { Challenge } from "../types";

const daysAgo = (d: number, h = 12) => {
  const date = new Date();
  date.setDate(date.getDate() - d);
  date.setHours(h, 0, 0, 0);
  return date.toISOString();
};

const minsAgo = (m: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - m);
  return date.toISOString();
};

export const challenges: Challenge[] = [
  {
    id: "ch_derek_mike",
    status: "accepted",
    challengerId: "u_derek",
    opponentId: "u_mike",
    topic: "Kentucky's backcourt is better than Alabama's",
    sourcePostId: "ky-guards-take",
    sourceReplyId: "r_ky_1",
    terms: {
      topic: "Kentucky's backcourt is better than Alabama's",
      duration: "24 hours",
      rounds: ["OPENING", "REBUTTAL", "CLOSING"],
    },
    createdAt: minsAgo(35),
    linkedDebateId: "ky-vs-bama-guards",
  },
  {
    id: "ch_sarah_mike",
    status: "sent",
    challengerId: "u_sarah",
    opponentId: "u_mike",
    topic: "Zeigler is SEC Player of the Year over Sears",
    sourcePostId: "sec-poy",
    sourceReplyId: "r_poy_2",
    terms: {
      topic: "Zeigler is SEC Player of the Year over Sears",
      duration: "24 hours",
      rounds: ["OPENING", "REBUTTAL", "CLOSING"],
    },
    createdAt: daysAgo(0, 12),
  },
  {
    id: "ch_coach_derek",
    status: "negotiating",
    challengerId: "u_coach",
    opponentId: "u_derek",
    topic: "Auburn is a better basketball program than Kentucky right now",
    sourcePostId: "auburn-comeback",
    sourceReplyId: "r_aub_3",
    terms: {
      topic: "Auburn is a better basketball program than Kentucky right now",
      duration: "48 hours",
      rounds: ["OPENING", "REBUTTAL", "CLOSING"],
    },
    createdAt: minsAgo(90),
  },
  {
    id: "ch_fresh_analyst",
    status: "declined",
    challengerId: "u_fresh",
    opponentId: "u_analyst",
    topic: "Dillon Mitchell is a top-5 national player",
    terms: {
      topic: "Dillon Mitchell is a top-5 national player",
      duration: "24 hours",
      rounds: ["OPENING", "REBUTTAL", "CLOSING"],
    },
    createdAt: daysAgo(2, 10),
  },
  {
    id: "ch_gator_jake",
    status: "expired",
    challengerId: "u_gator",
    opponentId: "u_jake",
    topic: "Florida's backcourt will be SEC's best next season",
    terms: {
      topic: "Florida's backcourt will be SEC's best next season",
      duration: "24 hours",
      rounds: ["OPENING", "REBUTTAL", "CLOSING"],
    },
    createdAt: daysAgo(5, 8),
  },
  {
    id: "ch_hog_coach",
    status: "accepted",
    challengerId: "u_hog",
    opponentId: "u_coach",
    topic: "Auburn makes the Final Four this year",
    terms: {
      topic: "Auburn makes the Final Four this year",
      duration: "24 hours",
      rounds: ["OPENING", "REBUTTAL", "CLOSING"],
    },
    createdAt: daysAgo(1, 14),
    linkedDebateId: "auburn-vs-arkansas",
  },
];
