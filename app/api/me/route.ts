import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.provider_token) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    // Get Discord user info using the provider token
    const discordUserResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${session.provider_token}`,
      },
    });

    if (!discordUserResponse.ok) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const discordUser = await discordUserResponse.json();
    
    return NextResponse.json({ 
      id: discordUser.id,
      username: discordUser.username,
      discriminator: discordUser.discriminator,
      avatar: discordUser.avatar 
    });
  } catch (error) {
    console.error('Error fetching Discord user:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
