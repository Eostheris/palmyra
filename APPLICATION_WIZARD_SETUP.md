# Application Wizard Setup Guide

The Discord-integrated application wizard is now installed and ready to configure. This wizard allows users to apply to different departments through a sleek, one-question-per-page interface that submits directly to Discord.

## ✅ What's Already Done

- All necessary components and API routes are installed
- Integration with your existing Discord authentication system
- Department configurations for LSPD, LSCSO, EMS, Fire, and DOJ
- Dynamic routing at `/apply/[slug]` (e.g., `/apply/lspd`, `/apply/ems`)
- Updated main apply page with department selection

## 🔧 Required Configuration

### 1. Discord Webhook Setup (Recommended)

For each department, create a Discord webhook:

1. Go to your Discord server
2. Navigate to the channel where you want applications sent
3. Right-click the channel → **Edit Channel** → **Integrations** → **Webhooks**
4. Click **New Webhook**
5. Copy the webhook URL
6. Add to your `.env.local` file:

```env
LSPD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url_here
LSCSO_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url_here
EMS_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url_here
FIRE_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url_here
DOJ_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url_here
```

### 2. Alternative: Channel + Bot Token

If you prefer using your existing bot token instead of webhooks:

1. Get the channel ID for each department (Enable Developer Mode → Right-click channel → Copy ID)
2. Edit `lib/config.ts` and change the target for each department:

```ts
target: {
  type: "channel",
  channelId: "your_channel_id_here", // requires DISCORD_BOT_TOKEN
}
```

## 🎨 Customization

### Department Questions

Edit `lib/config.ts` to customize questions for each department:

- Add/remove/modify questions
- Change question types (shortText, longText, select, multiSelect, yesNo, number, date)
- Adjust validation rules (required, maxLength, min/max for numbers)

### Department Themes

Update the theme colors for each department in `lib/config.ts`:

```ts
theme: {
  primary: "#1E3A8A",    // Main color
  accent: "#60A5FA",     // Accent/button color
  foreground: "#FFFFFF", // Text color
}
```

### Add New Departments

To add a new department:

1. Add a new entry to the `departments` array in `lib/config.ts`
2. Create a webhook URL environment variable
3. The route `/apply/[slug]` will automatically work for the new department

## 🧪 Testing

1. Ensure you have Discord authentication working (you already do!)
2. Visit `/apply` to see the department selection page
3. Click on a department to test the application flow
4. Submit a test application and verify it appears in Discord

## 🔒 Security Notes

- Webhook URLs are kept server-side and never exposed to the client
- Discord user verification happens through your existing Supabase auth
- All submissions include the Discord user ID for verification

## 🎯 Usage

Users can now:

1. Visit `/apply` to see all available departments
2. Click on a department to start the application
3. Go through the questions one-by-one with a smooth UI
4. Submit their application directly to the department's Discord channel
5. Receive confirmation when the application is submitted

## 🔧 Troubleshooting

**"You must be logged in with Discord to submit"**

- User needs to authenticate with Discord first
- Check that `/api/me` returns the Discord user data correctly

**"Submit failed" or webhook errors**

- Verify webhook URLs are correct and active
- Check Discord permissions for webhooks
- Review server logs for detailed error messages

**Questions not appearing correctly**

- Check the department configuration in `lib/config.ts`
- Ensure all required fields are present for each question

## 🚀 Going Live

1. Configure all webhook URLs in production environment
2. Test each department application flow
3. Monitor Discord channels for successful submissions
4. Update department questions as needed based on feedback

---

The wizard is now ready to use! Users can apply at `/apply/[department-slug]` and you'll receive formatted applications in Discord with all the user details and responses.
