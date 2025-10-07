RunningNad – Farcaster Miniapp (Frame)

A tiny Farcaster miniapp you can open directly in Warpcast as a Frame, and on the web as a classic page.
🎮 Live demo: https://runningnad.vercel.app/game

✨ Features

Farcaster Frame: playable inside Warpcast (in-feed) with CTA buttons.

Web version: same game at /game for desktop & mobile browsers.

Stateless by default: no wallet or contract required; zero onboarding friction.

Score share: players can post their run back to the cast (share link/OG).

Lightweight & fast: static assets, instant start.

Deploy-ready: Vercel one-click deploy; environment-based config.

No smart-contract yet. If you later add on-chain scores or badges, this README already has placeholders (see “On-chain (optional)”).

🧱 Tech Stack

Framework: Next.js (React)

Hosting: Vercel

Farcaster: Frames-compatible endpoint (e.g. frames.js / frog)

Styling/UX: Tailwind / Framer Motion (optional)

State/Logic: Lightweight game loop in React

If you use a specific Frames library (e.g. frog, frames.js) or the Neynar API, list it here explicitly.

📦 Repo Structure (suggested)

/app
  /game              # Web game route (Next.js page or app route)
  /frames            # Frame handler(s) for Warpcast
/public              # Static sprites, icons, OG images
/components          # UI components (Buttons, HUD, etc.)
/lib                 # Game helpers, types, utils

🔧 Local Setup

