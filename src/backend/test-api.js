const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // There isn't a direct listModels in the main SDK class usually, 
    // it's often done via a different client or by trying common names.
    // But let's try to see if we can get anything from a simple request.
    console.log("Checking API Key availability...");
    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing!");
        return;
    }
    console.log("API Key found (length):", process.env.GEMINI_API_KEY.length);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-1.5-flash");
  } catch (e) {
    console.error("Failed with gemini-1.5-flash:", e.message);
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-pro");
    } catch (e2) {
        console.error("Failed with gemini-pro:", e2.message);
    }
  }
}

listModels();
