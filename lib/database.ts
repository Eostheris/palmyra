import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: 'utf8mb4',
  timezone: '+00:00',
};

// Create connection pool for better performance
let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

// User interface matching your FiveM database structure
export interface FiveMUser {
  userId: number;
  username: string;
  license: string;
  license2: string;
  fivem: string;
  discord: string;
}

// Player interface for the players table
export interface FiveMPlayer {
  citizenid: string;
  // Add other player fields as needed
}

// Generic query function for custom SQL queries
export async function query(sql: string, params: unknown[] = []): Promise<unknown[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as unknown[];
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

// Function to get user by Discord ID
export async function getUserByDiscordId(discordId: string): Promise<FiveMUser | null> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE discord = ?',
      [discordId]
    );
    
    const users = rows as FiveMUser[];
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch user from database');
  }
}

// Function to check if user exists by Discord ID
export async function checkUserExists(discordId: string): Promise<boolean> {
  try {
    const user = await getUserByDiscordId(discordId);
    return user !== null;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}

// Function to get all users (for admin purposes)
export async function getAllUsers(): Promise<FiveMUser[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM users ORDER BY username');
    return rows as FiveMUser[];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch users from database');
  }
}

// Function to update user's last login or other info
export async function updateUserLastSeen(discordId: string): Promise<void> {
  try {
    // Assuming you might want to add a last_login field later
    // For now, this is a placeholder for future functionality
    console.log(`User ${discordId} accessed the website`);
  } catch (error) {
    console.error('Error updating user last seen:', error);
  }
}

// Character interface for the players table
export interface Character {
  citizenid: string;
  charinfo: {
    firstname: string;
    lastname: string;
    birthdate: string;
    gender: string;
    nationality: string;
    phone: string;
  };
  money: {
    bank: number;
    cash: number;
    crypto: number;
  };
  job: {
    name: string;
    label: string;
    grade: {
      name: string;
      level: number;
    };
    onduty: boolean;
  };
  gang: {
    name: string;
    label: string;
    grade: {
      name: string;
      level: number;
    };
  };
  metadata: {
    health: number;
    armor: number;
    hunger: number;
    thirst: number;
    stress: number;
    isdead: boolean;
    inlaststand: boolean;
    ishandcuffed: boolean;
    tracker: boolean;
    injail: number;
    jailitems: unknown[];
    status: unknown[];
    phone: unknown[];
    fitbit: unknown[];
    commandbinds: unknown[];
    bloodtype: string;
    dealerrep: number;
    craftingrep: number;
    attachmentcraftingrep: number;
    currentapartment: string | null;
    jobrep: {
      tow: number;
      trucker: number;
      taxi: number;
      hotdog: number;
    };
    callsign: string;
    fingerprint: string;
    walletid: string;
    criminalrecord: {
      hasRecord: boolean;
      date: string | null;
    };
    licences: {
      driver: boolean;
      business: boolean;
      weapon: boolean;
    };
    inside: {
      house: string | null;
      apartment: {
        apartmentType: string | null;
        apartmentId: number | null;
      };
    };
    phonedata: {
      SerialNumber: string;
      InstalledApps: unknown[];
    };
  };
}

// Raw database character interface (before JSON parsing)
interface RawCharacter {
  citizenid: string;
  charinfo: string;
  money: string;
  job: string;
  gang: string;
  metadata: string;
  [key: string]: unknown;
}

// Function to get all characters for a user
export async function getCharactersByUserId(userId: number): Promise<Character[]> {
  try {
    const pool = getPool();
    
    // First get the user's license identifiers
    const [userRows] = await pool.execute(
      'SELECT license, license2 FROM users WHERE userId = ?',
      [userId]
    );
    
    const users = userRows as { license: string; license2: string }[];
    if (users.length === 0) {
      return [];
    }
    
    const { license, license2 } = users[0];
    
    // Get all characters for this user from the players table
    // QBCore typically stores characters with license2 as the primary identifier
    const [rows] = await pool.execute(
      'SELECT * FROM players WHERE license = ? OR license = ?',
      [license, license2]
    );
    
    const characters = rows as RawCharacter[];
    return characters.map((character: RawCharacter) => ({
      citizenid: character.citizenid,
      charinfo: typeof character.charinfo === 'string' ? JSON.parse(character.charinfo) : character.charinfo,
      money: typeof character.money === 'string' ? JSON.parse(character.money) : character.money,
      job: typeof character.job === 'string' ? JSON.parse(character.job) : character.job,
      gang: typeof character.gang === 'string' ? JSON.parse(character.gang) : character.gang,
      metadata: typeof character.metadata === 'string' ? JSON.parse(character.metadata) : character.metadata,
    }));
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch characters from database');
  }
}
