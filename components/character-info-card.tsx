'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Wallet, 
  Briefcase, 
  Phone, 
  Car, 
  Shield,
  Heart,
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
}

export default function CharacterInfoCard({ discordId }: CharacterInfoCardProps) {
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
        
        // Select first character by default
        if (charactersData.length > 0) {
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
  }, [discordId])

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-500'
    if (health >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusColor = (status: number) => {
    if (status >= 80) return 'text-green-500'
    if (status >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EA9449]"></div>
            <span className="ml-2">Loading character data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p className="text-lg font-semibold">Error Loading Character Data</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (characters.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-lg font-semibold">No Characters Found</p>
            <p className="text-sm text-gray-600 mt-2">
              No characters found for this Discord account in the FiveM database.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Character Selection */}
      {characters.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Select Character
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {characters.map((character) => (
                <button
                  key={character.citizenid}
                  onClick={() => setSelectedCharacter(character)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedCharacter?.citizenid === character.citizenid
                      ? 'border-[#EA9449] bg-[#EA9449]/10'
                      : 'border-gray-200 hover:border-[#EA9449]/50'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {character.charinfo.firstname} {character.charinfo.lastname}
                  </div>
                  <div className="text-xs text-gray-500">
                    {character.citizenid}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Character Details */}
      {selectedCharacter && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Character Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://cdn.discordapp.com/avatars/${discordId.replace('discord:', '')}/avatar.png`} />
                  <AvatarFallback>
                    {selectedCharacter.charinfo.firstname[0]}{selectedCharacter.charinfo.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedCharacter.charinfo.firstname} {selectedCharacter.charinfo.lastname}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedCharacter.citizenid}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Birthdate:</span>
                  <span className="text-sm">{selectedCharacter.charinfo.birthdate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gender:</span>
                  <span className="text-sm">{selectedCharacter.charinfo.gender === '0' ? 'Male' : 'Female'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Nationality:</span>
                  <span className="text-sm">{selectedCharacter.charinfo.nationality}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span className="text-sm">{selectedCharacter.charinfo.phone}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Blood Type:</span>
                  <span className="text-sm">{selectedCharacter.metadata.bloodtype}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Money & Job */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Money & Employment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Money */}
              <div>
                <h4 className="font-medium mb-2">Finances</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bank:</span>
                    <span className="text-sm font-semibold text-green-600">
                      {formatMoney(selectedCharacter.money.bank)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cash:</span>
                    <span className="text-sm font-semibold">
                      {formatMoney(selectedCharacter.money.cash)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Crypto:</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {formatMoney(selectedCharacter.money.crypto)}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Job */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Employment
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Job:</span>
                    <span className="text-sm font-medium">{selectedCharacter.job.label}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Grade:</span>
                    <Badge variant="outline">
                      {selectedCharacter.job.grade.name} (Level {selectedCharacter.job.grade.level})
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={selectedCharacter.job.onduty ? "default" : "secondary"}>
                      {selectedCharacter.job.onduty ? "On Duty" : "Off Duty"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Gang */}
              {selectedCharacter.gang.name !== 'none' && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Gang Affiliation
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Gang:</span>
                        <span className="text-sm font-medium">{selectedCharacter.gang.label}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rank:</span>
                        <Badge variant="outline">
                          {selectedCharacter.gang.grade.name} (Level {selectedCharacter.gang.grade.level})
                        </Badge>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Health & Status */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Health & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Health Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getHealthColor(selectedCharacter.metadata.health)}`}>
                    {selectedCharacter.metadata.health}%
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3" />
                    Health
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getHealthColor(selectedCharacter.metadata.armor)}`}>
                    {selectedCharacter.metadata.armor}%
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Armor
                  </div>
                </div>
              </div>

              <Separator />

              {/* Needs */}
              <div>
                <h4 className="font-medium mb-2">Needs</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hunger:</span>
                    <span className={`text-sm font-medium ${getStatusColor(selectedCharacter.metadata.hunger)}`}>
                      {selectedCharacter.metadata.hunger}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thirst:</span>
                    <span className={`text-sm font-medium ${getStatusColor(selectedCharacter.metadata.thirst)}`}>
                      {selectedCharacter.metadata.thirst}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Stress:</span>
                    <span className={`text-sm font-medium ${selectedCharacter.metadata.stress < 20 ? 'text-green-500' : selectedCharacter.metadata.stress < 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {selectedCharacter.metadata.stress}%
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Status Badges */}
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCharacter.metadata.isdead && (
                    <Badge variant="destructive">Dead</Badge>
                  )}
                  {selectedCharacter.metadata.inlaststand && (
                    <Badge variant="destructive">Last Stand</Badge>
                  )}
                  {selectedCharacter.metadata.ishandcuffed && (
                    <Badge variant="secondary">Handcuffed</Badge>
                  )}
                  {selectedCharacter.metadata.injail > 0 && (
                    <Badge variant="destructive">In Jail ({selectedCharacter.metadata.injail} months)</Badge>
                  )}
                  {!selectedCharacter.metadata.isdead && !selectedCharacter.metadata.inlaststand && !selectedCharacter.metadata.ishandcuffed && selectedCharacter.metadata.injail === 0 && (
                    <Badge variant="default">Active</Badge>
                  )}
                </div>
              </div>

              {/* Licenses */}
              <div>
                <h4 className="font-medium mb-2">Licenses</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCharacter.metadata.licences.driver && (
                    <Badge variant="outline">
                      <Car className="w-3 h-3 mr-1" />
                      Driver&apos;s License
                    </Badge>
                  )}
                  {selectedCharacter.metadata.licences.weapon && (
                    <Badge variant="outline">
                      <Zap className="w-3 h-3 mr-1" />
                      Weapon License
                    </Badge>
                  )}
                  {selectedCharacter.metadata.licences.business && (
                    <Badge variant="outline">
                      <Briefcase className="w-3 h-3 mr-1" />
                      Business License
                    </Badge>
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
