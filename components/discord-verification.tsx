"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface DiscordProfile {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
}

interface DiscordVerificationProps {
  user: User;
}

export function DiscordVerification({ user }: DiscordVerificationProps) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [discordProfile, setDiscordProfile] = useState<DiscordProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDiscordVerification();
  }, [user]);

  const checkDiscordVerification = async () => {
    try {
      const supabase = createClient();
      
      // Get the current session to access provider tokens
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.provider_token) {
        setIsVerified(false);
        setLoading(false);
        return;
      }

      // Get Discord user info
      const discordUserResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
        },
      });

      if (discordUserResponse.ok) {
        const discordUser = await discordUserResponse.json();
        setDiscordProfile(discordUser);

        // Check if user is in your Discord server
        const guildCheckResponse = await fetch('/api/discord/verify-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            discordId: discordUser.id,
            token: session.provider_token,
          }),
        });

        if (guildCheckResponse.ok) {
          const { isMember } = await guildCheckResponse.json();
          setIsVerified(isMember);
        } else {
          setIsVerified(false);
        }
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.error('Discord verification error:', error);
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
          <span className="text-yellow-800">Verifying Discord membership...</span>
        </div>
      </div>
    );
  }

  if (isVerified === false) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">
          <h3 className="font-semibold mb-2">Discord Verification Required</h3>
          <p className="text-sm mb-3">
            You must be a member of the Palmyra RP Discord server to access this content.
          </p>
          <a 
            href="https://discord.gg/hRjnkveDdP" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-4 rounded text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Discord Server
          </a>
        </div>
      </div>
    );
  }

  if (isVerified === true && discordProfile) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            {discordProfile.avatar ? (
              <Image 
                src={`https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png`}
                alt={discordProfile.username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                {discordProfile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-green-800 font-semibold">Discord Verified ✓</h3>
            <p className="text-green-700 text-sm">
              Welcome, {discordProfile.username}#{discordProfile.discriminator}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
