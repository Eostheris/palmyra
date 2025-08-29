'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FiveMUser {
  userId: number;
  username: string;
  license: string;
  license2: string;
  fivem: string;
  discord: string;
}

interface FiveMAuthButtonProps {
  onSuccess?: (userData: FiveMUser) => void;
}

export default function FiveMAuthButton({}: FiveMAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFiveMConnect = async () => {
    try {
      setIsLoading(true);
      
      // Since this is just a "Connect to FiveM" button that opens the game,
      // we'll just provide a link or instruction to connect
      
      toast.success('Opening FiveM connection instructions...');
      
      // You can replace this with actual FiveM connection logic
      // For now, we'll just show a message
      setTimeout(() => {
        toast.info('To connect to FiveM: Press F8 in game and type "connect 69.197.129.90:30120"');
      }, 1000);
      
    } catch (error) {
      console.error('FiveM connection error:', error);
      toast.error('Failed to connect to FiveM server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleFiveMConnect}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#EA9449] to-[#29C1B0] hover:from-[#EA9449]/90 hover:to-[#29C1B0]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Connecting...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            🎮 Connect to FiveM Server
          </div>
        )}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Server IP: 69.197.129.90:30120
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Make sure you have FiveM installed and running
        </p>
      </div>
    </div>
  );
}
