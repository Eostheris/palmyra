'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

interface FiveMAuthButtonProps {
  onSuccess?: (userData: any) => void;
}

export default function FiveMAuthButton({ onSuccess }: FiveMAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleFiveMAuth = async () => {
    try {
      setIsLoading(true);

      // First, check if user is authenticated with Discord
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast.error('Please sign in with Discord first');
        return;
      }

      // Get Discord user data
      const discordId = user.user_metadata?.provider_id || user.user_metadata?.sub;
      
      if (!discordId) {
        toast.error('Unable to find your Discord ID. Please sign in again.');
        return;
      }

      // Verify FiveM connection
      const response = await fetch('/api/fivem/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discordId }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Unable to verify FiveM connection');
        return;
      }

      toast.success(`Welcome back, ${data.user.username}!`);

      if (onSuccess) {
        onSuccess(data.user);
      }

    } catch (error) {
      console.error('FiveM auth error:', error);
      toast.error('Failed to connect to FiveM server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFiveMAuth}
      disabled={isLoading}
      className="bg-gradient-to-r from-[#EA9449] to-[#29C1B0] hover:from-[#EA9449]/90 hover:to-[#29C1B0]/90 text-white font-semibold"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
          Connecting...
        </div>
      ) : (
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          </svg>
          Connect to FiveM
        </div>
      )}
    </Button>
  );
}
