# Rivalry — Web Demo

A mobile-first web prototype for **Rivalry**, a competitive social network for sports fans.

**Tagline:** *Where fans prove who knows more.*

This is a **demo only** — no auth, database, or backend. All data is static fake content focused on SEC NCAA Basketball.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo walkthrough (~3 min)

1. **Home** (`/`) — Scroll a busy SEC basketball feed with 25 posts and active debates
2. **Hero thread** (`/post/ky-guards-take`) — Read nested replies, tap **Challenge** on Mike's reply
3. **Challenge** (`/challenge/ch_derek_mike`) — Accept → land on the live debate
4. **Live debate** (`/debate/ky-vs-bama-guards`) — Stage arguments (Opening/Rebuttal/Closing tabs) + Bleachers trash talk
5. **Voting debate** (`/debate/tn-vs-fl-depth`) — Cast a vote (stored in sessionStorage for demo)
6. **Result card** (`/debate/bama-vs-tn-rivalry/result`) — Shareable verdict with W/L update
7. **Profile** (`/u/derek_ky`) — Records, badges, debate history
8. **Leaderboard** (`/leaderboard`) — SEC rankings filterable by community

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home feed |
| `/explore` | Community browser (NCAABB → SEC → teams) |
| `/c/[slug]` | Community hub |
| `/post/[id]` | Thread with nested replies |
| `/challenge/[id]` | Challenge flow |
| `/debates` | Debates hub (Live, Voting, Upcoming, Completed) |
| `/debate/[id]` | Debate viewer (Stage + Bleachers) |
| `/debate/[id]/result` | Shareable result card |
| `/u/[username]` | User profile |
| `/leaderboard` | Rankings |

## Demo data

- 20 users with records, bios, and badges
- 25 posts, 80+ nested replies
- 8 debates (live, voting, upcoming, completed)
- 6 challenges (sent, negotiating, accepted, declined, expired)
- 60+ bleacher comments

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com) for a shareable URL.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (dark mode only)
- lucide-react icons
- Static mock data in `lib/mock/`
