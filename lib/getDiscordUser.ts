export interface DiscordUser {
  id: string; // numeric Discord user ID as a string
  username?: string;
  discriminator?: string;
  avatar?: string;
}

export async function fetchDiscordUser(): Promise<DiscordUser | null> {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return null;
    
    // Get user from localStorage (this matches the Discord login flow)
    const savedUser = localStorage.getItem('discord_user');
    if (!savedUser) return null;
    
    const user = JSON.parse(savedUser);
    
    // Ensure the user has the required id field
    if (user && typeof user.id === "string") {
      return user as DiscordUser;
    }
    
    return null;
  } catch {
    return null;
  }
}
