import { NextRequest, NextResponse } from 'next/server'
import { getCharactersByUserId } from '@/lib/database'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userIdParam = searchParams.get('userId')

  if (!userIdParam) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const userId = parseInt(userIdParam, 10)
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
  }

  try {
    const characters = await getCharactersByUserId(userId)
    return NextResponse.json(characters)
  } catch (error) {
    console.error('Error fetching characters:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
