const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function check() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("Checking available models for your API key...");

    try {
        const result = await genAI.listModels();
        console.log("\n✅ SUCCESS! You can use these exact names:");

        // Filter for models that support 'generateContent' (Chat)
        const chatModels = result.models.filter(m =>
            m.supportedGenerationMethods.includes('generateContent')
        );

        chatModels.forEach(m => console.log(`"${m.name.replace('models/', '')}"`));

    } catch (e) {
        console.error("\n❌ ERROR:", e.message);
        console.log("Tip: If the error says 'API key not valid', check your .env file.");
    }
}

check();