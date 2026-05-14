const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function verifyApiKey() {
    console.log("Checking GEMINI_API_KEY...");
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error("❌ ERROR: GEMINI_API_KEY is not set in .env file!");
        return;
    }

    console.log(`API Key found (Length: ${apiKey.length})`);
    const genAI = new GoogleGenerativeAI(apiKey);

    // Using one of the models confirmed by list-models.js
    const modelName = "gemini-2.0-flash"; 
    console.log(`Testing with model: ${modelName}...`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("สวัสดี ทดสอบการเชื่อมต่อ API");
        const response = await result.response;
        const text = response.text();
        
        console.log("-----------------------------------");
        console.log("✅ API SUCCESS!");
        console.log("Response from AI:", text);
        console.log("-----------------------------------");
    } catch (error) {
        console.error("❌ API FAILURE!");
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

verifyApiKey();
