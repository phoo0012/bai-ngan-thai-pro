const Groq = require("groq-sdk");
require('dotenv').config();

async function verifyGroq() {
    console.log("Checking GROQ_API_KEY...");
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
        console.error("❌ ERROR: GROQ_API_KEY is not set in .env file!");
        return;
    }

    console.log(`Groq API Key found (Length: ${apiKey.length})`);
    const groq = new Groq({ apiKey });

    const modelName = "llama-3.3-70b-versatile"; 
    console.log(`Testing with model: ${modelName}...`);

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "สวัสดี ทดสอบการเชื่อมต่อ Groq API กรุณาตอบกลับเป็นภาษาไทยสั้นๆ",
                },
            ],
            model: modelName,
        });

        const response = chatCompletion.choices[0]?.message?.content;
        
        console.log("-----------------------------------");
        console.log("✅ GROQ API SUCCESS!");
        console.log("Response from Groq:", response);
        console.log("-----------------------------------");
    } catch (error) {
        console.error("❌ GROQ API FAILURE!");
        console.error("Error Message:", error.message);
    }
}

verifyGroq();
