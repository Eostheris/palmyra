export interface DiscordUser {
  id: string; // numeric Discord user ID as a string
  username?: string;
  discriminator?: string;
  avatar?: string;
}

export async function fetchDiscordUser(): Promise<DiscordUser | null> {
  try {
    const res = await fetch("/api/me", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data.id === "string") return data as DiscordUser;
    return null;
  } catch {
    return null;
  }
}
