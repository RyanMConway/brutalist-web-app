const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// The most likely correct names
const candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-pro",
    "gemini-1.0-pro"
];

async function bruteForce() {
    console.log("🤖 Starting Connection Test...\n");

    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ ERROR: No API Key found in .env file!");
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    for (const modelName of candidates) {
        process.stdout.write(`Testing model name: "${modelName}" ... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const response = await result.response;
            const text = response.text();

            console.log("✅ SUCCESS!");
            console.log("---------------------------------------------------");
            console.log(`🎉 WINNER: You must use "${modelName}" in server.js`);
            console.log("---------------------------------------------------");
            return; // Stop looking, we found it

        } catch (err) {
            // Just print a short error, not the huge stack trace
            let msg = err.message;
            if (msg.includes("404")) msg = "404 Not Found (Wrong Name)";
            console.log(`❌ Failed: ${msg}`);
        }
    }
    console.log("\n⚠️ All attempts failed. Your API Key might be invalid or has no credits.");
}

bruteForce();