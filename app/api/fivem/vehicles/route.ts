import { NextRequest, NextResponse } from 'next/server'
import { getVehiclesByCharacterId } from '@/lib/database'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const citizenId = searchParams.get('citizenId')

  if (!citizenId) {
    return NextResponse.json({ error: 'Citizen ID is required' }, { status: 400 })
  }

  try {
    const vehicles = await getVehiclesByCharacterId(citizenId)
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}