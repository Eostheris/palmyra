# FiveM Database Integration Setup

## Overview

This guide will help you connect your Palmyra RP website to your FiveM server's MySQL database using HeidiSQL credentials.

## 1. Environment Configuration

Create a `.env.local` file in your project root with these variables:

```env
# Discord OAuth Configuration
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=1384589047833297007

# MySQL Database Configuration (FiveM Server)
MYSQL_HOST=your_mysql_server_ip_or_hostname
MYSQL_PORT=3306
MYSQL_USER=your_heidi_sql_username
MYSQL_PASSWORD=your_heidi_sql_password
MYSQL_DATABASE=your_fivem_database_name

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. HeidiSQL Connection Info

Use the same credentials from your HeidiSQL connection:

- **Host**: Usually your server's IP address
- **Port**: Typically 3306 (default MySQL port)
- **Username**: Your MySQL username
- **Password**: Your MySQL password
- **Database**: Your FiveM database name (usually something like `es_extended` or similar)

## 3. Database Schema Expected

Your `users` table should have this structure (which you already have):

```sql
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `license` varchar(255) NOT NULL,
  `license2` varchar(255) DEFAULT NULL,
  `fivem` varchar(255) DEFAULT NULL,
  `discord` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
);
```

## 4. How It Works

1. **Discord Authentication**: Users sign in with Discord through Supabase
2. **Discord ID Extraction**: The system extracts their Discord ID from the auth data
3. **FiveM Verification**: Checks if that Discord ID exists in your `users` table
4. **Access Control**: Only users with matching Discord IDs can access protected content

## 5. API Endpoints Created

- `/api/fivem/verify` - Verifies if a Discord user exists in your FiveM database
- Returns user data: `userId`, `username`, `fivem`, `discord`

## 6. Component Integration

- **Main Navigation**: Added "Connect to FiveM" button that verifies database connection
- **Main Page**: Added Discord join button alongside server connect
- **Protected Routes**: Can now verify users against your FiveM database

## 7. Testing the Connection

1. Set up your `.env.local` with correct MySQL credentials
2. Start your development server: `npm run dev`
3. Try the "Connect to FiveM" button in the navigation
4. Check browser console and terminal for any connection errors

## 8. Common Connection Issues

### "Connection refused" or "Can't connect to MySQL server"

- Check if your server allows external connections
- Verify firewall settings allow connections on port 3306
- Ensure your hosting provider allows external database connections

### "Access denied for user"

- Double-check username and password
- Verify the user has proper permissions for the database
- Check if the user is allowed to connect from external IPs

### "Unknown database"

- Verify the database name is correct
- Check if the database exists in HeidiSQL

## 9. Security Considerations

- **Never commit `.env.local`** to version control
- Use strong MySQL passwords
- Consider creating a dedicated read-only user for the website
- Limit database access to specific IP addresses if possible

## 10. Production Deployment

For production (Vercel, etc.):

1. Add all environment variables to your hosting platform
2. Ensure your production server can reach your MySQL database
3. Consider using connection pooling for better performance
4. Monitor database connection usage

## 11. Advanced Features

You can extend this system to:

- Show player statistics on the website
- Display character information
- Create admin panels for staff
- Sync Discord roles with in-game permissions
- Track player activity and playtime

## 12. Troubleshooting Commands

Test your database connection directly:

```bash
# Test MySQL connection from command line
mysql -h your_host -P 3306 -u your_username -p your_database

# Check if your Discord ID exists in the database
SELECT * FROM users WHERE discord = 'your_discord_id';
```
