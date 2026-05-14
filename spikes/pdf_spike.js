const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // HTML Content for the worksheet
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&family=Mitr:wght@500&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Sarabun', sans-serif;
                margin: 0;
                padding: 40px;
                color: #333;
            }
            .header {
                border-bottom: 2px solid #0F6E56;
                padding-bottom: 10px;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
            }
            .title {
                font-family: 'Mitr', sans-serif;
                font-size: 28px;
                color: #0F6E56;
                margin: 0;
            }
            .student-info {
                font-size: 14px;
                margin-bottom: 20px;
            }
            .question-box {
                background-color: #F5F5F5;
                border: 1px dashed #9FE1CB;
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 10px;
            }
            .creative-zone {
                border: 2px dashed #854F0B;
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #854F0B;
                font-size: 18px;
                margin-top: 30px;
                background-color: #FAEEDA;
            }
            .footer {
                margin-top: 50px;
                font-size: 12px;
                color: #999;
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 class="title">ใบงานที่ 1: การนับเลข 1-10</h1>
            <div>วิชาคณิตศาสตร์ ป.1</div>
        </div>

        <div class="student-info">
            ชื่อ.......................................................................... เลขที่................ ชั้น................
        </div>

        <div class="question-box">
            <strong>คำชี้แจง:</strong> ให้นักเรียนนับจำนวนแอปเปิ้ลในภาพแล้วเขียนตัวเลขลงในช่องว่าง
            <br><br>
            🍎 🍎 🍎 = ( .......... )
            <br><br>
            🍎 🍎 🍎 🍎 🍎 = ( .......... )
        </div>

        <div class="creative-zone">
            พื้นที่สำหรับวาดภาพระบายสีแอปเปิ้ลของฉัน
        </div>

        <div class="footer">
            รหัสตัวชี้วัด: ค 1.1 ป.1/1  |  ใบงานไทย Pro
        </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const outputPath = path.join('C:', 'Users', 'poohp', 'Downloads', 'spike_test_worksheet.pdf');
    
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20mm',
            bottom: '20mm',
            left: '15mm',
            right: '15mm'
        }
    });

    console.log(`PDF Spike generated at: ${outputPath}`);
    await browser.close();
}

generatePDF().catch(console.error);