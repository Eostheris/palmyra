import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CharacterInfo {
  userId: number
  username: string
  discord: string
  license: string
  fivem: string
  // Add more fields as needed from your database
}

export default function CharacterInfoCard() {
  const [user, setUser] = useState<any>(null)
  const [character, setCharacter] = useState<CharacterInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user?.user_metadata?.provider_id) {
        // Fetch character info using Discord ID
        await fetchCharacterInfo(user.user_metadata.provider_id)
      }
      setLoading(false)
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      
      if (session?.user?.user_metadata?.provider_id) {
        await fetchCharacterInfo(session.user.user_metadata.provider_id)
      } else {
        setCharacter(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchCharacterInfo = async (discordId: string) => {
    try {
      const response = await fetch(`/api/fivem/character?discordId=${discordId}`)
      if (response.ok) {
        const data = await response.json()
        setCharacter(data.character)
      } else {
        setCharacter(null)
      }
    } catch (error) {
      console.error('Failed to fetch character info:', error)
      setCharacter(null)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setCharacter(null)
    toast.success('Logged out successfully')
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return null // This component only shows when user is logged in
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Character Information</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </CardTitle>
        <CardDescription>
          Connected via Discord: {user.user_metadata?.full_name || user.email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {character ? (
          <>
            <div>
              <label className="text-sm font-medium text-gray-600">Username</label>
              <p className="text-lg font-semibold">{character.username}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">User ID</label>
              <p className="text-sm text-gray-800">#{character.userId}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">FiveM ID</label>
              <p className="text-sm text-gray-800">{character.fivem}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Verified Player
              </Badge>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">
                Character data synced from FiveM server
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-2">No character found</p>
            <p className="text-sm text-gray-500">
              Your Discord account is not linked to a FiveM character on our server.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
