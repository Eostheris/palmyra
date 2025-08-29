import { NextRequest, NextResponse } from 'next/server';
import { getUserByDiscordId, updateUserLastSeen } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { discordId } = await request.json();

    if (!discordId) {
      return NextResponse.json(
        { error: 'Discord ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists in FiveM database
    const user = await getUserByDiscordId(discordId);

    if (!user) {
      return NextResponse.json(
        { 
          error: 'User not found in FiveM database',
          message: 'You need to connect your Discord to the FiveM server first'
        },
        { status: 404 }
      );
    }

    // Update last seen (optional)
    await updateUserLastSeen(discordId);

    return NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        username: user.username,
        fivem: user.fivem,
        discord: user.discord
      }
    });

  } catch (error) {
    console.error('FiveM verification error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        message: 'Unable to verify FiveM connection'
      },
      { status: 500 }
    );
  }
}
