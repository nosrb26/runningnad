# RunningNad – Farcaster Miniapp (Frame)

# A tiny Farcaster miniapp you can open directly in Warpcast as a Frame, and on the web as a classic page.

🎮👉 **Live Demo** : [runningnad.vercel.app/game](https://runningnad.vercel.app/game/)

# ✨ Features

Farcaster Frame: playable inside Warpcast (in-feed) with CTA buttons.

Web version: same game at /game for desktop & mobile browsers.

Stateless by default: no wallet or contract required; zero onboarding friction.

Score share: players can post their run back to the cast (share link/OG).

Lightweight & fast: static assets, instant start.

Deploy-ready: Vercel one-click deploy; environment-based config.

No smart-contract yet. If you later add on-chain scores or badges, this README already has placeholders (see “On-chain (optional)”).

# 🧱 Tech Stack

Framework: Next.js (React)

Hosting: Vercel

Farcaster: frames.js

State/Logic: Lightweight game loop in React

# 📦 Repo Structure

```bash
/app
  /game              # Web game route (Next.js page or app route)
  /frames            # Frame handler(s) for Warpcast
/public              # Static sprites, icons, OG images
/components          # UI components (Buttons, HUD, etc.)
/lib                 # Game helpers, types, utils
```

# 🔧 Local Setup

Clone the repository:

```bash
git clone https://github.com/nosrb26/runningnad.git
cd runningnad
```

Install dependencies:

```bash
npm i
# or pnpm i / yarn
```

Environment (create .env.local (only what you actually use)) :

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
FRAME_BASE_URL=http://localhost:3000        # where the frame endpoints live
# If you use Neynar or another API, add its keys here, e.g.:
# NEYNAR_API_KEY=...
```

Run:

```bash
npm run dev
```

App: http://localhost:3000/game
Frame endpoint (example): http://localhost:3000/frames

# 🚀 Deploy

Vercel: connect the repo -> set the same env vars in the Vercel dashboard -> Deploy
Make sure your Frame URL is publicly reachable over HTTPS.

# 🕹️ How to Play

Open the web app at /game or open the cast in Warpcast to load the Frame.
Use on-screen or keyboard controls to dodge obstacles and survive as long as possible.
At the end, click Share/Replay to post your score link back to Farcaster (or simply restart on web).

---

## 🔗 Smart Contract (soon !)

The project uses the **RunningNadLeaderboard** smart contract to save scores for each player, and to track best and total scores in a scoreboard.

### Contract Functions

- `saveScore(uint256 score, uint256 time)` – Save player score and time
- `getBestScores()` – Get leaderboard best scores (returns addresses, best scores, times)
- `getTotalScores()` – Get leaderboard total scores (returns addresses, total scores, games played)




