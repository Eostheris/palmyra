import type { Character } from './database';

export async function fetchUserCharacters(discordId: string): Promise<Character[]> {
  try {
    // First, get the FiveM user ID from Discord ID
    const userResponse = await fetch(`/api/fivem/user?discordId=${discordId}`);
    if (!userResponse.ok) {
      console.error('Failed to fetch user data');
      return [];
    }
    
    const userData = await userResponse.json();
    if (!userData || !userData.id) {
      console.error('No user data found');
      return [];
    }
    
    // Then fetch characters for that user ID
    const charactersResponse = await fetch(`/api/fivem/characters?userId=${userData.id}`);
    if (!charactersResponse.ok) {
      console.error('Failed to fetch characters');
      return [];
    }
    
    const characters = await charactersResponse.json();
    return Array.isArray(characters) ? characters : [];
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}
