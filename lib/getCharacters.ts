import type { Character } from './database';

export async function fetchUserCharacters(discordId: string): Promise<Character[]> {
  try {
    // Try to fetch user with the Discord ID as-is first
    let userResponse = await fetch(`/api/fivem/user?discordId=${discordId}`);
    
    // If that fails, try with discord: prefix (common in FiveM databases)
    if (!userResponse.ok && !discordId.startsWith('discord:')) {
      console.log(`Trying with discord: prefix for ID: ${discordId}`);
      userResponse = await fetch(`/api/fivem/user?discordId=discord:${discordId}`);
    }
    
    if (!userResponse.ok) {
      console.error('Failed to fetch user data for Discord ID:', discordId);
      return [];
    }
    
    const userData = await userResponse.json();
    if (!userData || !userData.userId) {
      console.error('No user data found for Discord ID:', discordId);
      return [];
    }
    
    console.log('Found FiveM user:', userData);
    
    // Then fetch characters for that user ID
    const charactersResponse = await fetch(`/api/fivem/characters?userId=${userData.userId}`);
    if (!charactersResponse.ok) {
      console.error('Failed to fetch characters for user ID:', userData.userId);
      return [];
    }
    
    const characters = await charactersResponse.json();
    console.log('Found characters:', characters);
    return Array.isArray(characters) ? characters : [];
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}
