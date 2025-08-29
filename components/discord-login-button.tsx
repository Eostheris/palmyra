'use client'

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export default function DiscordLoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<DiscordUser | null>(null)
  
  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('discord_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleDiscordLogin = () => {
    setIsLoading(true)
    
    // Check if Discord client ID is configured
    if (!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID) {
      toast.error('Discord authentication not configured')
      setIsLoading(false)
      return
    }
    
    // Discord OAuth URL - dynamically use current origin
    const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/auth/discord/callback` : 'http://localhost:3001/auth/discord/callback'
    const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`
    
    window.location.href = discordOAuthUrl
  }

  const handleLogout = () => {
    localStorage.removeItem('discord_user')
    setUser(null)
    toast.success('Logged out successfully')
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Welcome, {user.username}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleLogout}
          className="text-xs"
        >
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleDiscordLogin}
      disabled={isLoading}
      className="bg-[#5865F2] hover:bg-[#4752C4] text-white inline-flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
      {isLoading ? 'Connecting...' : 'Login with Discord'}
    </Button>
  )
}
