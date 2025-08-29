# Discord Authentication Setup Guide

## 1. Discord Application Setup

### Step 1: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give it a name (e.g., "Palmyra Roleplay")
4. Click "Create"

### Step 2: Configure OAuth2

1. In your application, go to "OAuth2" > "General"
2. Copy the **Client ID** and **Client Secret**
3. In "Redirects", add these URLs:
   - For production: `https://your-domain.com/auth/callback`
   - For development: `http://localhost:3000/auth/callback`

### Step 3: Create Bot

1. Go to "Bot" section
2. Click "Add Bot"
3. Copy the **Bot Token** (keep this secret!)
4. Under "Privileged Gateway Intents", enable:
   - Server Members Intent
   - Message Content Intent (if needed)

### Step 4: Add Bot to Your Server

1. Go to "OAuth2" > "URL Generator"
2. Select scopes: `bot`
3. Select permissions: `Read Messages/View Channels`
4. Copy the generated URL and open it
5. Select your Discord server and authorize

## 2. Environment Variables

Add these to your `.env.local` file:

```env
# Discord OAuth
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here

# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token_here

# Your Discord Server ID
DISCORD_GUILD_ID=your_server_id_here
```

To get your server ID:

1. Enable Developer Mode in Discord (User Settings > Appearance > Developer Mode)
2. Right-click your server name
3. Click "Copy Server ID"

## 3. Supabase Configuration

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to "Authentication" > "Providers"
4. Find "Discord" and click "Enable"
5. Enter your Discord Client ID and Client Secret
6. Save the configuration

## 4. Testing the Setup

1. Start your development server: `npm run dev`
2. Go to your site
3. Click "Join Discord & Sign In"
4. You should be redirected to Discord for authorization
5. After authorizing, you'll be redirected back to your site
6. The system will verify you're in the Discord server

## 5. Troubleshooting

### Common Issues:

- **"Invalid OAuth2 redirect"**: Check your redirect URLs in Discord settings
- **"Bot token invalid"**: Regenerate the bot token and update your env file
- **"Guild member not found"**: Make sure the bot is in your server with proper permissions
- **"Supabase auth error"**: Verify Discord provider is enabled in Supabase

### Debug Mode:

Check the browser console and server logs for detailed error messages.

## 6. Security Notes

- Never commit your `.env.local` file to version control
- Keep your bot token and client secret private
- Regularly rotate your secrets if compromised
- The bot only needs minimal permissions for member verification
