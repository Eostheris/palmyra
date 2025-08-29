// Test script to verify Discord ID matching
// Run with: node test-discord-lookup.js

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testDiscordLookup() {
  console.log('Testing Discord ID lookup...');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log('✅ Connected to MySQL successfully!');
    
    // Test the exact Discord ID format from your database
    const testDiscordId = 'discord:597913379125985320';
    console.log(`🔍 Looking up Discord ID: ${testDiscordId}`);
    
    // Get user by Discord ID
    const [userRows] = await connection.execute(
      'SELECT * FROM users WHERE discord = ?',
      [testDiscordId]
    );
    
    if (userRows.length > 0) {
      const user = userRows[0];
      console.log('👤 Found user:', {
        userId: user.userId,
        username: user.username,
        discord: user.discord
      });
      
      // Now get characters for this user
      const [characterRows] = await connection.execute(
        'SELECT citizenid, name, charinfo, money, job FROM players WHERE license = ? OR license = ?',
        [user.license, user.license2]
      );
      
      console.log(`📊 Found ${characterRows.length} character(s):`);
      
      characterRows.forEach((char, index) => {
        console.log(`  Character ${index + 1}:`);
        console.log(`    Citizen ID: ${char.citizenid}`);
        console.log(`    Name: ${char.name}`);
        
        try {
          const charinfo = JSON.parse(char.charinfo);
          const money = JSON.parse(char.money);
          const job = JSON.parse(char.job);
          
          console.log(`    Full Name: ${charinfo.firstname} ${charinfo.lastname}`);
          console.log(`    Bank: $${money.bank.toLocaleString()}`);
          console.log(`    Cash: $${money.cash.toLocaleString()}`);
          console.log(`    Job: ${job.label} (${job.grade.name})`);
        } catch (e) {
          console.log('    (Could not parse character data)');
        }
      });
      
    } else {
      console.log('❌ No user found with that Discord ID');
      
      // Let's see what Discord IDs are in the database
      const [allUsers] = await connection.execute(
        'SELECT discord FROM users LIMIT 5'
      );
      
      console.log('📋 Sample Discord IDs in database:');
      allUsers.forEach(user => {
        console.log(`  - ${user.discord}`);
      });
    }
    
    await connection.end();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDiscordLookup();
