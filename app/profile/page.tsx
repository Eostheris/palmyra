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
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)

  useEffect(() => {
    // Check URL params for character selection
    const urlParams = new URLSearchParams(window.location.search)
    const characterParam = urlParams.get('character')
    if (characterParam) {
      setSelectedCharacterId(characterParam)
    }

    // Check URL params for Discord user data
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
      <div className="min-h-screen relative overflow-hidden">
        <Image
          src="/palmyrawide.png"
          alt="Palmyra Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EA9449]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/palmyraloading2.png"
          alt="Palmyra Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-[120px] px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#EA9449] via-[#29C1B0] to-[#EA9449] drop-shadow-2xl">
              Character Profile
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#EA9449] to-[#29C1B0] mx-auto rounded-full mt-4"></div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto mt-6">
              Connect your Discord account to view your FiveM character information
            </p>
          </div>

          {!user ? (
            <div className="max-w-lg mx-auto">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-white text-2xl">Login Required</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Please login with Discord to access your character information
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                  <DiscordLoginButton />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="w-full">
              <ErrorBoundary>
                <CharacterInfoCard 
                  discordId={user.id} 
                  selectedCharacterId={selectedCharacterId}
                  onCharacterSelect={setSelectedCharacterId}
                />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
