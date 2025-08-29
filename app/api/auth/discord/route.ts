import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/discord/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', errorData)
      return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 })
    }

    const tokens = await tokenResponse.json()

    // Get user information
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch user information' }, { status: 400 })
    }

    const user = await userResponse.json()

    // Check if user exists in FiveM database
    const characterData = await checkFiveMUser(user.id)

    return NextResponse.json({ 
      user: {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
      },
      characterData 
    })
  } catch (error) {
    console.error('Discord auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function checkFiveMUser(discordId: string) {
  try {
    // This would connect to your MySQL database
    // For now, return null - you'll need to implement this with your database
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/fivem/user?discordId=${discordId}`)
    
    if (response.ok) {
      return await response.json()
    }
    
    return null
  } catch (error) {
    console.error('FiveM user check failed:', error)
    return null
  }
}
