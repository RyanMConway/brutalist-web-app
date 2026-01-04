const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const USERNAME = 'ryan';
const PASSWORD = 'password123'; // <--- CHANGE THIS to your real password

async function createAdmin() {
    try {
        const hashedPassword = await bcrypt.hash(PASSWORD, 10);

        await pool.query(
            'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
            [USERNAME, hashedPassword]
        );

        console.log(`✅ Admin '${USERNAME}' created successfully!`);
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        pool.end();
    }
}

createAdmin();