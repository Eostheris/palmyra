'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
    gender: string
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
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Character Selection */}
      {characters.length > 1 && (
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="w-5 h-5" />
              Select Character
            </CardTitle>
          </CardHeader>
          <CardContent>
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
              <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select a character" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {characters.map((character) => (
                  <SelectItem 
                    key={character.citizenid} 
                    value={character.citizenid}
                    className="text-white hover:bg-gray-700"
                  >
                    {character.charinfo.firstname} {character.charinfo.lastname} ({character.citizenid})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Character Details */}
      {selectedCharacter && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Basic Information */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                Character Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarFallback className="bg-[#EA9449] text-white text-lg">
                    {selectedCharacter.charinfo.firstname[0]}{selectedCharacter.charinfo.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl text-white">
                  {selectedCharacter.charinfo.firstname} {selectedCharacter.charinfo.lastname}
                </h3>
                <p className="text-gray-400 text-sm">{selectedCharacter.citizenid}</p>
              </div>
              
              <Separator className="bg-gray-600" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Birthdate:</span>
                  <span className="text-white font-medium">{selectedCharacter.charinfo.birthdate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gender:</span>
                  <span className="text-white font-medium">{selectedCharacter.charinfo.gender === '0' ? 'Male' : 'Female'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Nationality:</span>
                  <span className="text-white font-medium">{selectedCharacter.charinfo.nationality}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Phone:</span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#EA9449]" />
                    <span className="text-white font-medium">{selectedCharacter.charinfo.phone}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Blood Type:</span>
                  <span className="text-white font-medium">{selectedCharacter.metadata.bloodtype}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Money & Banking */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wallet className="w-5 h-5" />
                Finances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bank Account:</span>
                    <span className="text-green-400 font-bold text-lg">
                      {formatMoney(selectedCharacter.money.bank)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cash on Hand:</span>
                    <span className="text-yellow-400 font-bold text-lg">
                      {formatMoney(selectedCharacter.money.cash)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cryptocurrency:</span>
                    <span className="text-blue-400 font-bold text-lg">
                      {formatMoney(selectedCharacter.money.crypto)}
                    </span>
                  </div>
                </div>
                <Separator className="bg-gray-600" />
                <div className="bg-[#EA9449]/10 p-4 rounded-lg border border-[#EA9449]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Total Worth:</span>
                    <span className="text-[#EA9449] font-bold text-xl">
                      {formatMoney(selectedCharacter.money.bank + selectedCharacter.money.cash + selectedCharacter.money.crypto)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job & Licenses */}
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-2xl md:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5" />
                Employment & Licenses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Information */}
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#EA9449]" />
                  Current Job
                </h4>
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Position:</span>
                    <span className="text-white font-medium">{selectedCharacter.job.label}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Grade:</span>
                    <Badge className="bg-[#EA9449] text-white">
                      {selectedCharacter.job.grade.name} (Level {selectedCharacter.job.grade.level})
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Licenses */}
              <div>
                <h4 className="text-white font-medium mb-3">Active Licenses</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCharacter.metadata.licences.driver && (
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      <Car className="w-3 h-3 mr-1" />
                      Driver&apos;s License
                    </Badge>
                  )}
                  {selectedCharacter.metadata.licences.weapon && (
                    <Badge variant="outline" className="border-red-500 text-red-400">
                      <Zap className="w-3 h-3 mr-1" />
                      Weapon License
                    </Badge>
                  )}
                  {selectedCharacter.metadata.licences.business && (
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      <Briefcase className="w-3 h-3 mr-1" />
                      Business License
                    </Badge>
                  )}
                  {!selectedCharacter.metadata.licences.driver && 
                   !selectedCharacter.metadata.licences.weapon && 
                   !selectedCharacter.metadata.licences.business && (
                    <span className="text-gray-500 text-sm">No active licenses</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
