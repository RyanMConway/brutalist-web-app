const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_gym_rat_key_123';

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

// --- AI CONFIGURATION ---
const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

// --- AUTH MIDDLEWARE (SECURITY GUARD) ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- ROUTES ---

// 1. Health Check
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: "Server Online", db_time: result.rows[0].now });
    } catch (err) {
        console.error("DB Connection Error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// 2. Users Endpoint
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 3. Messages Endpoint (Public - Send Message)
app.post('/messages', async (req, res) => {
    const { sender_name, message_content } = req.body;
    if (!sender_name || !message_content) return res.status(400).json({ error: "Missing fields" });

    try {
        const query = 'INSERT INTO messages (sender_name, message_content) VALUES ($1, $2) RETURNING *';
        const values = [sender_name, message_content];
        const result = await pool.query(query, values);
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Failed to save message" });
    }
});

// 4. Admin Login Endpoint
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

        // Generate Token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
});

// 5. Admin: Get Messages (PROTECTED)
app.get('/admin/messages', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// 6. Admin: Delete Message (PROTECTED)
app.delete('/admin/messages/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

// 7. AI Chat Endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!genAI) return res.status(500).json({ error: "AI API Key missing." });
    if (!message) return res.status(400).json({ error: "Message required" });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
            You are the specialized AI assistant for Ryan Conway's professional portfolio.
            
            **YOUR PRIMARY MISSION:**
            Your goal is to impress visitors with Ryan's technical expertise to help him land high-level engineering roles.
            
            **RYAN'S TECH PROFILE (The Focus):**
            - **Role:** Senior Software Developer at TIAA (Charlotte, NC).
            - **AWS Specialist:** Expert in EMR, EC2, EKS, and cost-optimized infrastructure.
            - **Data Engineering:** Deep proficiency in PySpark, Python ETL pipelines, and big data processing.
            - **Web:** Capable Full Stack developer (React, Node.js, Postgres).
            
            **RYAN'S PERSONAL PROFILE (The Flavor):**
            - He is a competitive bodybuilder (6'0", ~260lbs off-season).
            - He is a "nerd" who loves Magic: The Gathering and D&D.
            
            **CONVERSATION RULES:**
            1. **Prioritize Tech:** If the user asks general questions, steer the topic toward his AWS and PySpark experience.
            2. **Limit Hobbies:** If asked about bodybuilding or gaming, answer in 1-2 sentences max, then *pivot* back to engineering.
               - *Good Pivot Example:* "Ryan brings the same discipline to optimizing EMR clusters as he does to bodybuilding."
               - *Bad Example:* Giving a full workout routine or diet advice.
            3. **Tone:** Professional, confident, and concise. 
            
            **USER QUERY:**
            ${message}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (err) {
        console.error("AI Error:", err.message);
        res.status(500).json({ error: "AI processing failed." });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});