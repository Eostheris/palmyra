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
export async function query(sql: string, params: any[] = []): Promise<any[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as any[];
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
    const pool = getPool();
    // Assuming you might want to add a last_login field later
    // For now, this is a placeholder for future functionality
    console.log(`User ${discordId} accessed the website`);
  } catch (error) {
    console.error('Error updating user last seen:', error);
  }
}
