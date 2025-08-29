import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { discordId, token } = await request.json();

    if (!discordId || !token) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Your Discord server ID - you'll need to get this from your Discord server
    const GUILD_ID = process.env.DISCORD_GUILD_ID;
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

    if (!GUILD_ID || !BOT_TOKEN) {
      console.error('Missing Discord configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Check if user is in the guild using Discord Bot API
    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`, {
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // User is in the server
      const memberData = await response.json();
      return NextResponse.json({ 
        isMember: true, 
        roles: memberData.roles || [],
        joinedAt: memberData.joined_at 
      });
    } else if (response.status === 404) {
      // User is not in the server
      return NextResponse.json({ isMember: false });
    } else {
      // Error checking membership
      console.error('Discord API error:', response.status, await response.text());
      return NextResponse.json({ error: 'Failed to verify membership' }, { status: 500 });
    }
  } catch (error) {
    console.error('Membership verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
