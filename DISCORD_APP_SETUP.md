# Discord Application Setup - Step by Step

## 1. Create Discord Application

1. Go to: https://discord.com/developers/applications
2. Click "New Application"
3. Name it "Palmyra RP" (or whatever you prefer)
4. Click "Create"

## 2. Get Your Client ID and Secret

After creating the application:

### Client ID:

1. On the "General Information" page
2. Copy the "Application ID" (this is your CLIENT_ID)
3. It will look like: `123456789012345678` (18-19 digit number)

### Client Secret:

1. Go to "OAuth2" tab in the left sidebar
2. Click "Reset Secret" if needed
3. Copy the "Client Secret"
4. It will look like: `abcdef123456789_randomstring`

## 3. Configure OAuth2 Redirects and Scopes

1. Still in "OAuth2" tab
2. In "Redirects" section, add these URLs:
   - `https://palmyra-three.vercel.app/auth/discord/callback`
   - `http://localhost:3001/auth/discord/callback` (for local development)
3. In "Default Authorization Link" section, check these scopes:
   - ✅ **identify** (required - gets basic user info)
   - ✅ **guilds** (optional - if you want to check server membership later)
4. Click "Save Changes"

### Required OAuth2 Scopes:

- **identify**: Allows your app to get the user's Discord ID, username, avatar
- **guilds**: (Optional) Allows checking what Discord servers the user is in

## 4. Update Your .env.local

Replace the placeholder values with your actual Discord application credentials:

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=123456789012345678
DISCORD_CLIENT_SECRET=your_actual_secret_here
```

## Example of what valid credentials look like:

```env
# ✅ CORRECT - Real Discord Application ID (18-19 digits)
NEXT_PUBLIC_DISCORD_CLIENT_ID=1234567890123456789

# ❌ WRONG - Placeholder text
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id_here
```

## 5. Test the Setup

After updating your .env.local:

1. Restart your development server: `npm run dev`
2. Go to http://localhost:3001
3. Click "Discord Login" in the navigation
4. You should be redirected to Discord for authentication

## Troubleshooting

If you get errors:

- Make sure the Client ID is the actual numeric Application ID
- Make sure the redirect URL matches exactly what you added in Discord
- Check that your .env.local file is saved
- Restart your development server after changing environment variables
