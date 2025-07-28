// app/api/frame/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const gameUrl = process.env.NEXT_PUBLIC_GAME_URL!

  const metadata = {
    name: 'RunningNad',
    url: `${gameUrl}/game`,
    manifest: `${gameUrl}/miniapp.json`,
    icon: `${gameUrl}/favicon.ico`,
    title: '🏃‍♂️ RunningNad Game',
    description: 'Mini Monad T-Rex Runner for Farcaster !',
  }

  return NextResponse.json(metadata)
}
