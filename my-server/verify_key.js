// NO IMPORTS NEEDED - Uses built-in Node.js fetch
const key = process.env.GEMINI_API_KEY || "AIzaSyCzSdkiicHNqABqZ7m13uGOMdmju2S2igE";

async function verify() {
    console.log("🔑 Testing Key:", key.substring(0, 10) + "...");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }]
        })
    });

    const data = await response.json();

    if (response.ok) {
        console.log("\n✅ SUCCESS! The key is working.");
        console.log("Response:", data.candidates[0].content.parts[0].text);
    } else {
        console.log("\n❌ ERROR: Google rejected the key.");
        console.log("Reason:", JSON.stringify(data, null, 2));
    }
}

// Load env vars just for this script if running directly
if (!process.env.GEMINI_API_KEY) require('dotenv').config();

verify();