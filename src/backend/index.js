const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { generateWorksheetHTML } = require('./templates/base');
const { generateWorksheetContent } = require('./aiService');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('ใบงานไทย Pro Backend API is running with Groq AI!');
});

app.get('/api/worksheets/:grade', async (req, res) => {
    const { grade } = req.params;
    console.log(`[Backend] Requesting worksheets for grade: ${grade}`);
    
    try {
        const subjectsToGen = ['ภาษาไทย', 'คณิตศาสตร์', 'วิทยาศาสตร์'];
        const results = await Promise.all(subjectsToGen.map(async (sub) => {
            try {
                const content = await generateWorksheetContent(grade, sub);
                return { id: Math.random().toString(36).substr(2, 9), grade, subject: sub, ...content };
            } catch (err) {
                console.error(`Error generating ${sub}:`, err.message);
                // Return a mock if one fails so the whole request doesn't die
                return { id: Math.random().toString(36).substr(2, 9), grade, subject: sub, title: "Error", isError: true };
            }
        }));
        console.log(`[Backend] Successfully generated ${results.length} worksheets`);
        res.json(results);
    } catch (error) {
        console.error("[Backend] Global Error:", error.message);
        res.status(500).json({ error: "Failed to generate worksheets from AI" });
    }
});

app.post('/api/generate-pdf', async (req, res) => {
    const { worksheetData } = req.body;
    console.log(`[Backend] Generating PDF for: ${worksheetData?.title}`);

    if (!worksheetData) {
        return res.status(400).send('Worksheet data is required');
    }

    try {
        const htmlContent = generateWorksheetHTML(worksheetData);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                bottom: '20mm',
                left: '15mm',
                right: '15mm'
            }
        });

        await browser.close();
        console.log("[Backend] PDF generated successfully");
        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});