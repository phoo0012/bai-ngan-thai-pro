'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Printer, ArrowLeft, FileText, Share2 } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const WorksheetPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [worksheet, setWorksheet] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      const data = sessionStorage.getItem(`worksheet_${id}`);
      if (data) {
        const parsed = JSON.parse(data);
        console.log(`[Worksheet] Loaded from cache. Questions: ${parsed.questions?.length}`);
        setWorksheet(parsed);
      }
    }
  }, [id]);

  const handleDownload = async () => {
    if (!worksheet) return;
    setDownloading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worksheetData: worksheet }),
      });

      if (!response.ok) throw new Error('PDF generation failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${worksheet.title}_${worksheet.grade}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('PDF generation error', error);
      alert('เกิดข้อผิดพลาดในการดาวน์โหลด PDF');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!worksheet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">กำลังโหลดใบงาน...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white">
      {/* Header - Hidden on Print */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 print:hidden">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              title="กลับ"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
               <span className="text-xl">📚</span>
               <span className="font-bold text-slate-800 hidden md:inline">{worksheet.title}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <Printer size={18} /> <span className="hidden sm:inline">พิมพ์</span>
            </button>
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 md:px-6 py-2 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-md active:scale-95 disabled:opacity-70"
            >
              {downloading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
              ) : (
                <>
                  <Download size={18} /> <span className="hidden sm:inline">PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Worksheet Area */}
      <main className="py-8 px-4 flex justify-center print:p-0 print:m-0">
        <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-xl p-[15mm] md:p-[20mm] flex flex-col font-sans text-[#333] print:shadow-none print:max-w-none print:w-full print:min-h-0">
          {/* Worksheet Header */}
          <div className="border-b-[3px] border-teal-700 pb-2 mb-6 flex justify-between items-end">
            <h1 className="text-2xl font-bold text-teal-700 m-0">{worksheet.title}</h1>
            <div className="text-sm font-bold text-slate-500">{worksheet.subject} {worksheet.grade}</div>
          </div>

          {/* Student Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8 text-sm gap-4">
            <span>ชื่อ-นามสกุล: ........................................................................</span>
            <span>เลขที่: ............</span>
          </div>

          {/* Instructions */}
          <div className="bg-slate-50 border-l-4 border-teal-700 p-4 mb-8 rounded-r-lg">
            <div className="font-bold text-teal-700 mb-1">คำชี้แจง:</div>
            <div className="text-sm">{worksheet.instructions}</div>
          </div>

          {/* Questions */}
          <div className="flex-1 mb-6">
            {worksheet.questions.map((q: any, i: number) => (
              <div key={i} className="mb-4 text-sm">
                <div className="mb-1">
                  <span className="font-bold text-teal-700 mr-2">{i + 1}.</span>
                  {q.text}
                </div>
                <div className="text-slate-300">
                  ตอบ: ............................................................................................
                </div>
              </div>
            ))}
          </div>

          {/* Creative Zone - AI Coloring Image */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden bg-slate-50 mb-6 break-inside-avoid">
            <div className="p-3 border-b border-dashed border-slate-200 flex items-center bg-white">
               <span className="font-bold text-teal-700 flex items-center gap-2">
                 <span className="text-xl">🎨</span> {worksheet.creativeSpaceLabel?.startsWith('วาดภาพ') ? worksheet.creativeSpaceLabel : `วาดภาพและ${worksheet.creativeSpaceLabel || 'ระบายสีให้สวยงาม'}`}
               </span>
            </div>
            <div className="relative h-48 flex items-center justify-center bg-white">
              {/* Empty space for drawing */}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
            <div>ตัวชี้วัด: {worksheet.indicator}</div>
            <div className="flex gap-1 text-yellow-400">⭐⭐⭐</div>
            <div>ใบงานไทย Pro | พิมพ์เมื่อ {new Date().toLocaleDateString('th-TH')}</div>
          </div>
        </div>
      </main>

      {/* Styles for print */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            margin: 0;
            size: A4;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WorksheetPage;
