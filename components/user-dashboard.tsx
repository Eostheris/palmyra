'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { ChevronDown, User, LogOut } from 'lucide-react'

interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string
}

interface Character {
  citizenid: string
  charinfo: {
    firstname: string
    lastname: string
  }
}

export default function UserDashboard() {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for Discord user
    const savedUser = localStorage.getItem('discord_user')
    if (savedUser) {
      const discordUser = JSON.parse(savedUser)
      setUser(discordUser)
      fetchCharacters(discordUser.id)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchCharacters = async (discordId: string) => {
    try {
      const userResponse = await fetch(`/api/fivem/user?discordId=${discordId}`)
      if (!userResponse.ok) {
        setLoading(false)
        return
      }
      
      const userData = await userResponse.json()
      const charactersResponse = await fetch(`/api/fivem/characters?userId=${userData.userId}`)
      if (!charactersResponse.ok) {
        setLoading(false)
        return
      }
      
      const charactersData = await charactersResponse.json()
      setCharacters(charactersData)
      
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('discord_user')
    setUser(null)
    setCharacters([])
    window.location.href = '/'
  }

  const handleCharacterSelect = (character: Character) => {
    // Navigate to profile with selected character
    window.location.href = `/profile?character=${character.citizenid}`
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-32 bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (characters.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">Welcome, {user.username}</span>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-neutral-800">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  if (characters.length === 1) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/profile" className="text-white hover:text-orange-400 transition-colors">
          <Button variant="ghost" className="text-white hover:bg-neutral-800">
            <User className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-neutral-800">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-white hover:bg-neutral-800">
            <User className="w-4 h-4 mr-2" />
            Dashboard
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-neutral-900 border-neutral-700">
          <DropdownMenuLabel className="text-white">Select Character</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-neutral-700" />
          {characters.map((character) => (
            <DropdownMenuItem
              key={character.citizenid}
              onClick={() => handleCharacterSelect(character)}
              className="text-white hover:bg-neutral-800 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {character.charinfo.firstname} {character.charinfo.lastname}
                </span>
                <span className="text-xs text-gray-400">
                  {character.citizenid}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-400 hover:bg-neutral-800 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
