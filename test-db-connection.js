// Test script to verify MySQL connection
// Run with: node test-db-connection.js

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing MySQL connection...');
  console.log('Host:', process.env.MYSQL_HOST);
  console.log('Port:', process.env.MYSQL_PORT);
  console.log('User:', process.env.MYSQL_USER);
  console.log('Database:', process.env.MYSQL_DATABASE);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log('✅ Connected to MySQL successfully!');
    
    // Test query to check users table
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log(`📊 Found ${rows[0].count} users in the database`);
    
    // Test query to get a sample user (without sensitive data)
    const [sampleUser] = await connection.execute(
      'SELECT userId, username, discord FROM users LIMIT 1'
    );
    
    if (sampleUser.length > 0) {
      console.log('👤 Sample user:', sampleUser[0]);
    }
    
    await connection.end();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Tips:');
      console.log('- Check if MySQL is running on the remote server');
      console.log('- Verify the IP address is correct');
      console.log('- Check firewall settings');
    }
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Tips:');
      console.log('- Check username and password');
      console.log('- Verify user has remote access permissions');
    }
  }
}

testConnection();
