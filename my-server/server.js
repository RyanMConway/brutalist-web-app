const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies in POST requests

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// 1. Root Endpoint (Health Check)
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: "Backend is running!", db_time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// 2. Users Endpoint (For the "System Monitor" on Home Page)
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 3. Messages Endpoint (For the Contact Page / Terminal)
app.post('/messages', async (req, res) => {
    const { sender_name, message_content } = req.body;

    // Basic Validation: Ensure data exists before trying to save
    if (!sender_name || !message_content) {
        return res.status(400).json({ error: "Missing name or content" });
    }

    try {
        // Insert into database and return the saved row
        const query = 'INSERT INTO messages (sender_name, message_content) VALUES ($1, $2) RETURNING *';
        const values = [sender_name, message_content];

        const result = await pool.query(query, values);

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Failed to save message" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});