'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import CharacterInfoCard from '@/components/character-info-card'
import DiscordLoginButton from '@/components/discord-login-button'
import ErrorBoundary from '@/components/error-boundary'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check URL params for Discord user data
    const urlParams = new URLSearchParams(window.location.search)
    const discordUserParam = urlParams.get('discord_user')
    
    if (discordUserParam) {
      try {
        const discordUser = JSON.parse(decodeURIComponent(discordUserParam))
        setUser(discordUser)
        // Store in localStorage for persistence
        localStorage.setItem('discord_user', JSON.stringify(discordUser))
      } catch (error) {
        console.error('Error parsing Discord user data:', error)
      }
    } else {
      // Check localStorage for existing user
      const savedUser = localStorage.getItem('discord_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
    
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EA9449]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-[120px] px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#EA9449] to-[#29C1B0] bg-clip-text text-transparent">
            Character Profile
          </h1>
          <p className="text-gray-300 text-lg">
            Connect your Discord account to view your FiveM character information
          </p>
        </div>

        {!user ? (
          <div className="max-w-md mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white">Login Required</CardTitle>
                <CardDescription className="text-gray-300">
                  Please login with Discord to access your character information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <DiscordLoginButton />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <ErrorBoundary>
              <CharacterInfoCard discordId={user.id} />
            </ErrorBoundary>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Discord Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Your connected Discord account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  {user.avatar && (
                    <Image
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                      alt="Discord Avatar"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {user.username}#{user.discriminator}
                    </h3>
                    <p className="text-gray-300">Discord ID: {user.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
