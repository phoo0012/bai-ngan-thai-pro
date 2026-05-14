const generateWorksheetHTML = (data) => {
    const {
        title,
        grade,
        subject,
        indicator,
        instructions,
        questions,
        creativeSpaceLabel,
        color = "#0F6E56",
        accentColor = "#9FE1CB",
        creativeColor = "#854F0B",
        creativeBg = "#FAEEDA"
    } = data;

    const questionsHtml = questions.map((q, i) => `
        <div class="question">
            <span class="q-number">${i + 1}.</span> ${q.text}
            <div class="answer-line">ตอบ: ............................................................................................</div>
        </div>
    `).join('');

    return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&family=Mitr:wght@500&display=swap" rel="stylesheet">
        <style>
            @page { size: A4; margin: 0; }
            body {
                font-family: 'Sarabun', sans-serif;
                margin: 0; padding: 0; color: #333; line-height: 1.6;
            }
            .page {
                width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; position: relative;
            }
            .header {
                border-bottom: 3px solid ${color};
                padding-bottom: 10px; margin-bottom: 20px;
                display: flex; justify-content: space-between; align-items: flex-end;
            }
            .title { font-family: 'Mitr', sans-serif; font-size: 26px; color: ${color}; margin: 0; }
            .grade-subject { font-size: 16px; font-weight: bold; color: #666; }
            .student-info {
                display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 15px;
            }
            .instruction-box {
                background-color: #f8fafc; border-left: 4px solid ${color};
                padding: 12px 18px; margin-bottom: 25px; border-radius: 0 8px 8px 0;
            }
            .instruction-title { font-weight: bold; color: ${color}; margin-bottom: 4px; }
            .questions-container { margin-bottom: 20px; }
            .question { margin-bottom: 12px; font-size: 14px; }
            .q-number { font-weight: bold; color: ${color}; margin-right: 8px; }
            .answer-line { margin-top: 5px; color: #ccc; font-size: 13px; }
            .creative-zone {
                border: 2px dashed ${creativeColor}; border-radius: 15px;
                height: 250px; display: flex; flex-direction: column;
                justify-content: center; align-items: center;
                background-color: ${creativeBg}; color: ${creativeColor};
                margin-top: 10px;
            }
            .creative-icon { font-size: 30px; margin-bottom: 5px; }
            .creative-label { font-family: 'Mitr', sans-serif; font-size: 16px; font-weight: bold; }
            .footer {
                position: absolute; bottom: 10mm; left: 20mm; right: 20mm;
                display: flex; justify-content: space-between; align-items: center;
                border-top: 1px solid #eee; pt-10px; font-size: 12px; color: #999;
            }
            .rating { display: flex; gap: 4px; font-size: 18px; color: #fbbf24; }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="header">
                <h1 class="title">${title}</h1>
                <div class="grade-subject">${subject} ${grade}</div>
            </div>

            <div class="creative-label-header" style="font-family: 'Mitr', sans-serif; font-size: 18px; font-weight: bold; color: ${color}; margin-bottom: 10px;">
                🎨 ${creativeSpaceLabel.startsWith('วาดภาพ') ? creativeSpaceLabel : 'วาดภาพและ' + creativeSpaceLabel}
            </div>

            <div class="student-info">
                <span>ชื่อ-นามสกุล: ........................................................................</span>
                <span>เลขที่: ............</span>
            </div>

            <div class="instruction-box">
                <div class="instruction-title">คำชี้แจง:</div>
                <div>${instructions}</div>
            </div>

            <div class="questions-container">
                ${questionsHtml}
            </div>

            <div class="creative-zone">
                <!-- Empty box for drawing -->
            </div>

            <div class="footer">
                <div>ตัวชี้วัด: ${indicator}</div>
                <div class="rating">⭐⭐⭐</div>
                <div>ใบงานไทย Pro | พิมพ์เมื่อ ${new Date().toLocaleDateString('th-TH')}</div>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { generateWorksheetHTML };