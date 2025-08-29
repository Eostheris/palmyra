# MySQL Remote Connection Setup Guide

## Finding Your Remote Desktop IP Address

### Option 1: From Remote Desktop

1. Connect to your remote desktop
2. Open Command Prompt (cmd)
3. Run: `ipconfig`
4. Look for "IPv4 Address" - this is your internal IP
5. For external access, you might need the public IP

### Option 2: Check Router/Network Settings

1. Log into your router's admin panel
2. Look for connected devices
3. Find your remote desktop computer
4. Note the IP address

### Option 3: Public IP (if accessing from internet)

1. On your remote desktop, go to: https://whatismyipaddress.com/
2. Note the IPv4 address
3. Make sure port 3306 is forwarded in your router

## Database Connection Configuration

Update your `.env.local` file with:

```env
MYSQL_HOST=192.168.1.XXX  # Replace with your actual IP
MYSQL_PORT=3306
MYSQL_USER=qboxuser
MYSQL_PASSWORD=YourStrongP@ss!
MYSQL_DATABASE=qbox
```

## Common IP Address Ranges

- **Local Network**: Usually starts with:
  - `192.168.x.x` (most common)
  - `10.x.x.x`
  - `172.16.x.x` to `172.31.x.x`

## Testing the Connection

### From HeidiSQL on Local Machine:

1. Open HeidiSQL on your local machine
2. Create new session
3. Use the remote desktop IP as hostname
4. Use port 3306
5. Enter username: `qboxuser`
6. Enter password: `YourStrongP@ss!`
7. Select database: `qbox`
8. Test connection

### Troubleshooting:

- **Connection refused**: Check if MySQL is running on remote desktop
- **Timeout**: Check firewall settings on remote desktop
- **Access denied**: MySQL might not allow remote connections

## Enabling Remote MySQL Access

If you can't connect remotely, you might need to:

1. **Edit MySQL config** (on remote desktop):

   ```
   # Find my.cnf or my.ini file
   bind-address = 0.0.0.0  # Allow all IPs
   ```

2. **Grant remote access** (run in MySQL on remote desktop):

   ```sql
   GRANT ALL PRIVILEGES ON qbox.* TO 'qboxuser'@'%' IDENTIFIED BY 'YourStrongP@ss!';
   FLUSH PRIVILEGES;
   ```

3. **Open firewall port** (on remote desktop):
   - Windows: Allow port 3306 in Windows Firewall
   - Router: Forward port 3306 to remote desktop IP

## Security Notes

- Only open MySQL to specific IPs if possible
- Use strong passwords
- Consider VPN for secure remote access
- Monitor for unauthorized access attempts
