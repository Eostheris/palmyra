import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('Discord OAuth error:', error)
    return NextResponse.redirect(new URL('/?error=discord_auth_failed', request.url))
  }

  if (!code) {
    console.error('No authorization code received')
    return NextResponse.redirect(new URL('/?error=no_auth_code', request.url))
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${new URL(request.url).origin}/auth/discord/callback`,
        scope: 'identify guilds',
      }),
    })

    if (!tokenResponse.ok) {
      console.error('Failed to exchange code for token:', await tokenResponse.text())
      return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url))
    }

    const tokens = await tokenResponse.json()

    // Get user information from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userResponse.ok) {
      console.error('Failed to get user info:', await userResponse.text())
      return NextResponse.redirect(new URL('/?error=user_info_failed', request.url))
    }

    const discordUser = await userResponse.json()

    // Store user info in a way that can be accessed by the client
    // For now, we'll redirect with user data as URL params (not ideal for production)
    const userParam = encodeURIComponent(JSON.stringify({
      id: discordUser.id,
      username: discordUser.username,
      discriminator: discordUser.discriminator,
      avatar: discordUser.avatar
    }))

    return NextResponse.redirect(new URL(`/profile?discord_user=${userParam}`, request.url))

  } catch (error) {
    console.error('Discord auth callback error:', error)
    return NextResponse.redirect(new URL('/?error=auth_callback_failed', request.url))
  }
}
