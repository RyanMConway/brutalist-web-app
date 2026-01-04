require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
if (!key) { console.error("❌ No Key found in .env"); process.exit(1); }

async function findModels() {
    console.log("🔍 Scanning for available models with your key...");

    // We use the REST API directly to bypass library issues
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (data.error) {
        console.error("❌ API Error:", data.error.message);
        return;
    }

    console.log("\n✅ SUCCESS! Here are the exact names you can use in server.js:\n");

    const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));

    chatModels.forEach(m => {
        // The API returns names like "models/gemini-pro".
        // We strip "models/" because the SDK often adds it automatically.
        const cleanName = m.name.replace("models/", "");
        console.log(`Model: "${cleanName}"`);
    });

    console.log("\n👉 Pick one of the above and put it in your server.js line ~90");
}

findModels();