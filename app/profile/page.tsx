'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import CharacterInfoCard from '@/components/character-info-card'
import DiscordLoginButton from '@/components/discord-login-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
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
            <CharacterInfoCard />
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Discord Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Your connected Discord account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Display Name</label>
                  <p className="text-white">{user.user_metadata?.full_name || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Username</label>
                  <p className="text-white">{user.user_metadata?.preferred_username || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Discord ID</label>
                  <p className="text-sm text-gray-300 font-mono">{user.user_metadata?.provider_id || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <p className="text-white">{user.email || 'N/A'}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-600">
                  <p className="text-xs text-gray-500">
                    Connected since: {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
