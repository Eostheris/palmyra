'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  User, 
  Wallet, 
  Briefcase, 
  Phone, 
  Car, 
  Zap
} from 'lucide-react'

interface Character {
  citizenid: string
  charinfo: {
    firstname: string
    lastname: string
    birthdate: string
    gender: string | number
    nationality: string
    phone: string
  }
  money: {
    bank: number
    cash: number
    crypto: number
  }
  job: {
    name: string
    label: string
    grade: {
      name: string
      level: number
    }
    onduty: boolean
  }
  gang: {
    name: string
    label: string
    grade: {
      name: string
      level: number
    }
  }
  metadata: {
    health: number
    armor: number
    hunger: number
    thirst: number
    stress: number
    isdead: boolean
    inlaststand: boolean
    ishandcuffed: boolean
    tracker: boolean
    injail: number
    jailitems: unknown[]
    status: unknown[]
    phone: unknown[]
    fitbit: unknown[]
    commandbinds: unknown[]
    bloodtype: string
    dealerrep: number
    craftingrep: number
    attachmentcraftingrep: number
    currentapartment: string | null
    jobrep: {
      tow: number
      trucker: number
      taxi: number
      hotdog: number
    }
    callsign: string
    fingerprint: string
    walletid: string
    criminalrecord: {
      hasRecord: boolean
      date: string | null
    }
    licences: {
      driver: boolean
      business: boolean
      weapon: boolean
    }
    inside: {
      house: string | null
      apartment: {
        apartmentType: string | null
        apartmentId: number | null
      }
    }
    phonedata: {
      SerialNumber: string
      InstalledApps: unknown[]
    }
  }
}

interface CharacterInfoCardProps {
  discordId: string
  selectedCharacterId?: string | null
  onCharacterSelect?: (characterId: string) => void
}

export default function CharacterInfoCard({ discordId, selectedCharacterId, onCharacterSelect }: CharacterInfoCardProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // First get the user data from Discord ID
        const userResponse = await fetch(`/api/fivem/user?discordId=${discordId}`)
        if (!userResponse.ok) {
          const errorData = await userResponse.json().catch(() => ({}))
          throw new Error(errorData.error || 'User not found in FiveM database')
        }
        
        const userData = await userResponse.json()
        
        // Then get all characters for this user
        const charactersResponse = await fetch(`/api/fivem/characters?userId=${userData.userId}`)
        if (!charactersResponse.ok) {
          const errorData = await charactersResponse.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to fetch characters')
        }
        
        const charactersData = await charactersResponse.json()
        
        // Validate character data structure
        if (!Array.isArray(charactersData)) {
          throw new Error('Invalid characters data received')
        }
        
        setCharacters(charactersData)
        
        // Select character based on prop or first character by default
        if (selectedCharacterId) {
          const foundCharacter = charactersData.find((char: Character) => char.citizenid === selectedCharacterId)
          if (foundCharacter) {
            setSelectedCharacter(foundCharacter)
          } else if (charactersData.length > 0) {
            setSelectedCharacter(charactersData[0])
          }
        } else if (charactersData.length > 0) {
          setSelectedCharacter(charactersData[0])
        }
        
      } catch (err) {
        console.error('Character data fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (discordId) {
      fetchCharacterData()
    }
  }, [discordId, selectedCharacterId])

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EA9449]"></div>
              <span className="ml-3 text-white text-lg">Loading character data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center text-red-400">
              <p className="text-xl font-semibold">Error Loading Character Data</p>
              <p className="text-sm mt-2 text-gray-300">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-xl font-semibold text-white">No Characters Found</p>
              <p className="text-gray-300 mt-2">
                No characters found for this Discord account in the FiveM database.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Character Selection */}
      {characters.length > 1 && (
        <div className="bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Select Character
          </h3>
          <Select 
            value={selectedCharacter?.citizenid || ''} 
            onValueChange={(value) => {
              const character = characters.find(char => char.citizenid === value)
              if (character) {
                setSelectedCharacter(character)
                onCharacterSelect?.(value)
              }
            }}
          >
            <SelectTrigger className="w-full bg-neutral-900 border-neutral-700 text-white rounded-lg h-12">
              <SelectValue placeholder="Select a character" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-neutral-700">
              {characters.map((character) => (
                <SelectItem 
                  key={character.citizenid} 
                  value={character.citizenid}
                  className="text-white hover:bg-neutral-800"
                >
                  {character.charinfo.firstname} {character.charinfo.lastname} ({character.citizenid})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Character Details */}
      {selectedCharacter && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Character Information Panel */}
          <div className="bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                <User className="w-5 h-5" />
                Character Information
              </h2>
            </div>

            {/* Character Header */}
            <div className="mb-8">
              <h3 className="text-white font-black text-2xl">
                {selectedCharacter.charinfo.firstname} {selectedCharacter.charinfo.lastname}
              </h3>
              <span className="inline-block bg-neutral-800 text-neutral-300 px-3 py-1 rounded-lg text-sm font-semibold mt-2">
                {selectedCharacter.citizenid}
              </span>
            </div>

            <Separator className="bg-neutral-700 mb-6" />

            {/* Personal Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold min-w-32">Birthdate:</span>
                <span className="text-white font-semibold">{selectedCharacter.charinfo.birthdate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold min-w-32">Gender:</span>
                <span className="text-white font-semibold">{selectedCharacter.charinfo.gender === 0 || selectedCharacter.charinfo.gender === '0' ? 'Male' : 'Female'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold min-w-32">Nationality:</span>
                <span className="text-white font-semibold">{selectedCharacter.charinfo.nationality}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold min-w-32">Phone:</span>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-white font-semibold">{selectedCharacter.charinfo.phone}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold min-w-32">Blood Type:</span>
                <span className="text-white font-semibold">{selectedCharacter.metadata.bloodtype}</span>
              </div>
            </div>

            <Separator className="bg-neutral-700 my-6" />

            {/* Licenses */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 opacity-90">Active Licenses</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.metadata.licences.driver && (
                  <Badge className="bg-green-600/20 text-green-400 border border-green-600/40 hover:bg-green-600/30">
                    <Car className="w-3 h-3 mr-1" />
                    Driver&apos;s License
                  </Badge>
                )}
                {selectedCharacter.metadata.licences.weapon && (
                  <Badge className="bg-green-600/20 text-green-400 border border-green-600/40 hover:bg-green-600/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Weapon License
                  </Badge>
                )}
                {selectedCharacter.metadata.licences.business && (
                  <Badge className="bg-green-600/20 text-green-400 border border-green-600/40 hover:bg-green-600/30">
                    <Briefcase className="w-3 h-3 mr-1" />
                    Business License
                  </Badge>
                )}
                {!selectedCharacter.metadata.licences.driver && 
                 !selectedCharacter.metadata.licences.weapon && 
                 !selectedCharacter.metadata.licences.business && (
                  <span className="text-neutral-500 text-sm">No active licenses</span>
                )}
              </div>
            </div>
          </div>

          {/* Finances & Employment Panel */}
          <div className="bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                <Wallet className="w-5 h-5" />
                Finances & Employment
              </h2>
            </div>

            {/* Money Section */}
            <div className="mb-8">
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 opacity-90">Finances</h4>
              <div className="space-y-4">
                <div className="bg-neutral-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300 font-bold">Bank Account:</span>
                    <span className="text-green-400 font-bold text-lg">
                      {formatMoney(selectedCharacter.money.bank)}
                    </span>
                  </div>
                </div>
                <div className="bg-neutral-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300 font-bold">Cash on Hand:</span>
                    <span className="text-green-400 font-bold text-lg">
                      {formatMoney(selectedCharacter.money.cash)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-neutral-700 mb-6" />

            {/* Employment Section */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 opacity-90 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Current Job
              </h4>
              <div className="bg-neutral-900/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-300 font-bold">Position:</span>
                  <span className="text-white font-semibold">{selectedCharacter.job.label}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-300 font-bold">Grade:</span>
                  <Badge className="bg-neutral-700 text-white border-neutral-600">
                    {selectedCharacter.job.grade.name} (Level {selectedCharacter.job.grade.level})
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
