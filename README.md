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

Farcaster: Frames-compatible endpoint (e.g. frames.js / frog)

Styling/UX: Tailwind / Framer Motion (optional)

State/Logic: Lightweight game loop in React

If you use a specific Frames library (e.g. frog, frames.js) or the Neynar API, list it here explicitly.

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

Environment:

Create .env.local (only what you actually use):

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

# 🔗 Frame Endpoints (example)

Adjust to your actual routes; these are conventional names.

GET /frames – root of the frame (OG image + primary CTA).
POST /frames/next – handles button presses and game steps.
GET /frames/og – dynamic OG image for sharing scores.

# 🧪 Development Notes

Keep the frame response time low (<1s) to stay snappy in Warpcast.
Provide fallback images and alt text; frames must render even if JS is disabled.
Test both mobile and desktop inside Warpcast & web.
