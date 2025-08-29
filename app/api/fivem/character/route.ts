import { NextRequest, NextResponse } from 'next/server'
import { getUserByDiscordId } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const discordId = searchParams.get('discordId')

    if (!discordId) {
      return NextResponse.json({ error: 'Discord ID is required' }, { status: 400 })
    }

    // Get user by Discord ID using the typed function
    const user = await getUserByDiscordId(discordId)

    if (!user) {
      return NextResponse.json({ character: null }, { status: 200 })
    }
    
    return NextResponse.json({ 
      character: {
        userId: user.userId,
        username: user.username,
        license: user.license,
        fivem: user.fivem,
        discord: user.discord
      }
    })

  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
