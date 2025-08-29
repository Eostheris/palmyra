import { NextRequest, NextResponse } from 'next/server'
import { getUserByDiscordId } from '@/lib/database'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const discordId = searchParams.get('discordId')

  if (!discordId) {
    return NextResponse.json({ error: 'Discord ID is required' }, { status: 400 })
  }

  try {
    const user = await getUserByDiscordId(discordId)
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
