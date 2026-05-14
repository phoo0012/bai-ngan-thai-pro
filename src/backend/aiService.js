const Groq = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// High-quality Mock Data for fallback
const mockWorksheets = {
    'ภาษาไทย': {
        'p1': {
            title: "สนุกกับพยัญชนะไทย",
            indicator: "ท 1.1 ป.1/1",
            instructions: "ให้นักเรียนจับคู่พยัญชนะกับรูปภาพให้ถูกต้อง",
            questions: [
                { text: "ก ไก่ ออกเสียงอย่างไร และเขียนอย่างไรให้ถูกต้อง?" },
                { text: "จงเติมพยัญชนะที่หายไป: ก ... ค ง" },
                { text: "รูปภาพ 'หนู' ตรงกับพยัญชนะตัวใด?" },
                { text: "พยัญชนะตัวใดที่มีหัวออกข้างนอก?" },
                { text: "ตัวเลือกใดคือพยัญชนะไทยตัวแรก?" },
                { text: "จงเขียนตามรอยประพยัญชนะ ข ไข่" },
                { text: "พยัญชนะใดออกเสียงเหมือน 'ค'?" },
                { text: "พยัญชนะไทยมีทั้งหมดกี่ตัว?" },
                { text: "จงโยงเส้นจับคู่ภาพ 'ปลา' กับพยัญชนะ" },
                { text: "ระบายสีพยัญชนะที่มีวงกลมอยู่ด้านล่าง" }
            ],
            creativeSpaceLabel: "วาดภาพและระบายสีไก่น้อยแสนสนุก",
            imagePrompt: "cute cartoon chicken for kids coloring page, thick black outlines, white background, simple lines"
        },
        'p6': {
            title: "สำนวน สุภาษิต และคำพังเพย",
            indicator: "ท 4.1 ป.6/2",
            instructions: "จงเลือกสำนวนที่เหมาะสมกับสถานการณ์ที่กำหนดให้",
            questions: [
                { text: "'ทำดีได้ดี ทำชั่วได้ชั่ว' หมายถึงอะไร?" },
                { text: "สำนวนใดหมายถึงการพูดจาโผงผางไม่เกรงใจใคร?" },
                { text: "จงแต่งประโยคจากสำนวน 'น้ำขึ้นให้รีบตัก'" },
                { text: "สำนวน 'กบในกะลา' เปรียบเทียบกับคนลักษณะใด?" },
                { text: "จงหาความหมายของ 'เข็นครกขึ้นภูเขา'" },
                { text: "สำนวนใดมีความหมายใกล้เคียงกับ 'สอนจระเข้ว่ายน้ำ'?" },
                { text: "เติมคำในช่องว่าง: 'ดินพอกหาง...'" },
                { text: "สำนวนใดใช้เตือนใจเรื่องการเก็บออม?" },
                { text: "ทำไมจึงเปรียบคนใจร้อนว่า 'ขิงก็รา ข่าก็แรง'?" },
                { text: "จงยกตัวอย่างสถานการณ์ที่ตรงกับสำนวน 'ไก่เห็นตีนงู งูเห็นนมไก่'" }
            ],
            creativeSpaceLabel: "วาดภาพและระบายสีภาพสุภาษิต กบในกะลา",
            imagePrompt: "cartoon frog under a coconut shell, coloring page for kids, thick black outlines, white background"
        }
    },
    'คณิตศาสตร์': {
        'p1': {
            title: "การบวกเลขไม่เกิน 20",
            indicator: "ค 1.1 ป.1/4",
            instructions: "หาผลลัพธ์ของการบวกเลขต่อไปนี้",
            questions: [
                { text: "5 + 3 เท่ากับเท่าไหร่?" },
                { text: "ถ้ามีส้ม 7 ผล ซื้อมาเพิ่มอีก 4 ผล จะมีส้มรวมกี่ผล?" },
                { text: "10 + ... = 15" },
                { text: "8 + 8 = ?" },
                { text: "9 น้อยกว่า 12 อยู่เท่าไหร่?" },
                { text: "จงเติมเครื่องหมาย > , < หรือ = ในช่องว่าง: 15 ... 13" },
                { text: "นับเลขถอยหลังทีละ 1 จาก 10 ถึง 1" },
                { text: "มีแมว 3 ตัว มีสุนัขมากกว่าแมว 2 ตัว มีสุนัขกี่ตัว?" },
                { text: "เลข 1 อยู่ในหลักใดของ 14?" },
                { text: "ผลรวมของ 7, 2 และ 1 คือ?" }
            ],
            creativeSpaceLabel: "วาดภาพและระบายสีผลไม้แสนอร่อย",
            imagePrompt: "basket of various fruits, coloring page for kids, simple cartoon style, thick black outlines, white background"
        }
    },
    'วิทยาศาสตร์': {
        'p1': {
            title: "ร่างกายของฉัน",
            indicator: "ว 1.2 ป.1/1",
            instructions: "ระบุหน้าที่ของอวัยวะต่างๆ",
            questions: [
                { text: "เราใช้ส่วนใดของร่างกายในการมองเห็น?" },
                { text: "จมูกมีหน้าที่สำคัญอย่างไร?" },
                { text: "ถ้าเราต้องการฟังเสียงเพลง เราต้องใช้อวัยวะใด?" },
                { text: "เราควรทำอย่างไรเพื่อดูแลรักษาฟันให้แข็งแรง?" },
                { text: "อวัยวะใดทำหน้าที่รับรสชาติอาหาร?" },
                { text: "มือและนิ้วมือมีความสำคัญอย่างไร?" },
                { text: "เราควรล้างมือก่อนทำสิ่งใดบ้าง?" },
                { text: "อวัยวะใดอยู่ภายในทรวงอกและทำหน้าที่สูบฉีดเลือด?" },
                { text: "เมื่อเราวิ่งออกกำลังกาย ส่วนใดของร่างกายจะทำงานหนักที่สุด?" },
                { text: "จงบอกวิธีการดูแลดวงตาเมื่อต้องอ่านหนังสือ" }
            ],
            creativeSpaceLabel: "วาดภาพและระบายสีเพื่อนรักของฉัน",
            imagePrompt: "cute cartoon child pointing to eyes and ears, coloring page for kids, thick black outlines, white background"
        }
    }
};

const generateWorksheetContent = async (grade, subject) => {
    console.log(`[Groq AI] Generating: ${subject} (${grade})`);
    
    const prompt = `
    คุณคือผู้เชี่ยวชาญด้านการออกแบบใบงานประถมตามหลักสูตรแกนกลาง พ.ศ. 2551 (ฉบับปรับปรุง 2560) ของไทย
    จงสร้างเนื้อหาใบงานสำหรับชั้น ${grade} วิชา ${subject} 
    โดยให้ผลลัพธ์เป็น JSON ในรูปแบบดังนี้เท่านั้น (ห้ามมีข้อความอื่น):
    {
        "title": "ชื่อใบงาน",
        "indicator": "รหัสตัวชี้วัด",
        "instructions": "คำชี้แจง",
        "questions": [
            {"text": "คำถาม 1"}, {"text": "คำถาม 2"}, {"text": "คำถาม 3"}, {"text": "คำถาม 4"}, {"text": "คำถาม 5"},
            {"text": "คำถาม 6"}, {"text": "คำถาม 7"}, {"text": "คำถาม 8"}, {"text": "คำถาม 9"}, {"text": "คำถาม 10"}
        ],
        "creativeSpaceLabel": "หัวข้อวาดภาพและระบายสี",
        "imagePrompt": "Detailed English prompt for a coloring page (cartoon, thick outlines, white background)"
    }
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
        });

        let contentString = chatCompletion.choices[0]?.message?.content;
        
        // Clean markdown if present
        if (contentString.includes('```json')) {
            contentString = contentString.split('```json')[1].split('```')[0];
        } else if (contentString.includes('```')) {
            contentString = contentString.split('```')[1].split('```')[0];
        }

        const content = JSON.parse(contentString.trim());
        
        // STRICT VALIDATION: Ensure we have 10 questions
        if (!content.questions || content.questions.length < 10) {
            console.warn(`[Groq AI] Warning: AI returned only ${content.questions?.length} questions. Forcing fallback to ensure 10 questions.`);
            throw new Error("AI returned insufficient questions");
        }
        
        // Ensure imagePrompt exists for URL generation
        const finalPrompt = content.imagePrompt || `coloring page for kids, ${subject} ${grade}, simple cartoon, thick outlines, white background`;
        const encodedPrompt = encodeURIComponent(finalPrompt);
        content.imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=800&height=800&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
        
        console.log(`[Groq AI] Generated Image URL for ${subject}: ${content.imageUrl}`);
        return content;
    } catch (error) {
        console.error(`[Groq AI] Error: ${error.message}`);
        const fallbackData = (mockWorksheets[subject] && mockWorksheets[subject][grade]) || 
                             (mockWorksheets[subject] && mockWorksheets[subject]['p1']) ||
                             mockWorksheets['ภาษาไทย']['p1'];

        const finalFallback = { ...fallbackData, isMock: true };
        const encodedPrompt = encodeURIComponent(finalFallback.imagePrompt || "coloring page for kids");
        finalFallback.imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=800&height=800&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
        
        return finalFallback;
    }
};

module.exports = { generateWorksheetContent };
