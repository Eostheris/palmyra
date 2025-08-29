'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Wallet, 
  Briefcase, 
  Phone, 
  Car, 
  Zap,
  Wrench,
  Fuel,
  Calendar
} from 'lucide-react'
import { getVehicleDisplayName, getVehicleCategory } from '@/lib/vehicle-lookup'

interface Vehicle {
  id: number
  license: string
  citizenid: string
  vehicle: string
  hash: string
  mods: string
  plate: string
  fakeplate: string | null
  garage: string
  fuel: number
  engine: number
  body: number
  state: number
  depotprice: number
  drivingdistance: number | null
  status: string
  glovebox: string | null
  trunk: string | null
  nosColour: string | null
  traveldistance: number
  noslevel: number
  hasnitro: number
  evidence: string | null
  financed: number
  finance_data: string | null
  vinscratch: number
  parking: string | null
  balance: number
  paymentamount: number
  paymentsleft: number
  financetime: number
}

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] = useState(false)
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
            fetchVehicles(foundCharacter.citizenid)
          } else if (charactersData.length > 0) {
            setSelectedCharacter(charactersData[0])
            fetchVehicles(charactersData[0].citizenid)
          }
        } else if (charactersData.length > 0) {
          setSelectedCharacter(charactersData[0])
          fetchVehicles(charactersData[0].citizenid)
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

  const fetchVehicles = async (citizenId: string) => {
    try {
      setVehiclesLoading(true)
      const response = await fetch(`/api/fivem/vehicles?citizenId=${citizenId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles')
      }
      const vehiclesData = await response.json()
      setVehicles(vehiclesData)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setVehicles([])
    } finally {
      setVehiclesLoading(false)
    }
  }

  // Helper function to get garage status
  const getGarageStatus = (state: number) => {
    switch (state) {
      case 0: return { label: 'Garage', color: 'bg-green-600/20 text-green-400 border-green-600/40' }
      case 1: return { label: 'Out', color: 'bg-blue-600/20 text-blue-400 border-blue-600/40' }
      case 2: return { label: 'Impound', color: 'bg-red-600/20 text-red-400 border-red-600/40' }
      case 3: return { label: 'Scrapped', color: 'bg-gray-600/20 text-gray-400 border-gray-600/40' }
      default: return { label: 'Unknown', color: 'bg-gray-600/20 text-gray-400 border-gray-600/40' }
    }
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
                fetchVehicles(character.citizenid)
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

      {/* Character Details with Tabs */}
      {selectedCharacter && (
        <div className="bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8">
          <div className="mb-6">
            <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
              <User className="w-5 h-5" />
              {selectedCharacter.charinfo.firstname} {selectedCharacter.charinfo.lastname}
            </h2>
            <span className="inline-block bg-neutral-800 text-neutral-300 px-3 py-1 rounded-lg text-sm font-semibold">
              {selectedCharacter.citizenid}
            </span>
          </div>

          <Tabs defaultValue="character" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-900 border border-neutral-700">
              <TabsTrigger value="character" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-400">
                Character Info
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-400">
                Vehicles ({vehicles.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="character" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Character Information Panel */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h3>
                    
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
                </div>

                {/* Finances & Employment Panel */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      Finances
                    </h3>
                    
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

                    <Separator className="bg-neutral-700 my-6" />

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
              </div>
            </TabsContent>

            <TabsContent value="vehicles" className="mt-6">
              {vehiclesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EA9449]"></div>
                  <span className="ml-3 text-white text-lg">Loading vehicles...</span>
                </div>
              ) : vehicles.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">No Vehicles Found</h3>
                  <p className="text-neutral-400">This character doesn&apos;t own any vehicles yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicles.map((vehicle) => {
                    const statusInfo = getGarageStatus(vehicle.state)
                    const vehicleDisplayName = getVehicleDisplayName(vehicle.vehicle)
                    const vehicleCategory = getVehicleCategory(vehicle.vehicle)
                    
                    return (
                      <Card key={vehicle.id} className="bg-neutral-900/50 border-neutral-700 hover:border-neutral-600 transition-colors">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Vehicle Header */}
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Car className="w-5 h-5 text-[#EA9449]" />
                                  <h4 className="text-white font-bold text-lg">
                                    {vehicleDisplayName}
                                  </h4>
                                </div>
                                <p className="text-neutral-400 text-sm">{vehicleCategory}</p>
                              </div>
                              <Badge className={`${statusInfo.color} font-semibold`}>
                                {statusInfo.label}
                              </Badge>
                            </div>

                            {/* Vehicle Details */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-neutral-400 text-sm">Plate:</span>
                                <span className="text-white font-semibold font-mono text-sm bg-neutral-800 px-2 py-1 rounded">
                                  {vehicle.plate}
                                </span>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-neutral-400 text-sm">Garage:</span>
                                <span className="text-white text-sm">{vehicle.garage}</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-neutral-400 text-sm flex items-center gap-1">
                                  <Fuel className="w-3 h-3" />
                                  Fuel:
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-neutral-700 rounded-full h-2">
                                    <div 
                                      className="bg-green-400 h-2 rounded-full transition-all" 
                                      style={{ width: `${Math.max(0, Math.min(100, vehicle.fuel))}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-white text-sm w-10">{vehicle.fuel}%</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-neutral-400 text-sm flex items-center gap-1">
                                  <Wrench className="w-3 h-3" />
                                  Engine:
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-neutral-700 rounded-full h-2">
                                    <div 
                                      className="bg-blue-400 h-2 rounded-full transition-all" 
                                      style={{ width: `${(vehicle.engine / 1000) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-white text-sm w-10">{Math.round((vehicle.engine / 1000) * 100)}%</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-neutral-400 text-sm">Body:</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-neutral-700 rounded-full h-2">
                                    <div 
                                      className="bg-orange-400 h-2 rounded-full transition-all" 
                                      style={{ width: `${(vehicle.body / 1000) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-white text-sm w-10">{Math.round((vehicle.body / 1000) * 100)}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Financial Info */}
                            {vehicle.financed === 1 && (
                              <div className="border-t border-neutral-700 pt-4 mt-4">
                                <h5 className="text-yellow-400 font-semibold text-sm mb-2 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Financed Vehicle
                                </h5>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-neutral-400">Balance:</span>
                                    <span className="text-white">{formatMoney(vehicle.balance)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-400">Payment:</span>
                                    <span className="text-white">{formatMoney(vehicle.paymentamount)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-400">Payments Left:</span>
                                    <span className="text-white">{vehicle.paymentsleft}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
