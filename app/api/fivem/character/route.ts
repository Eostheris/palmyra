import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const discordId = searchParams.get('discordId')

    if (!discordId) {
      return NextResponse.json({ error: 'Discord ID is required' }, { status: 400 })
    }

    // Query the users table for the Discord ID
    const results = await query(
      'SELECT userId, username, license, license2, fivem, discord FROM users WHERE discord = ?',
      [discordId]
    )

    if (results.length === 0) {
      return NextResponse.json({ character: null }, { status: 200 })
    }

    const character = results[0]
    
    return NextResponse.json({ 
      character: {
        userId: character.userId,
        username: character.username,
        license: character.license,
        fivem: character.fivem,
        discord: character.discord
      }
    })

  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
