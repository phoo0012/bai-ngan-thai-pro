'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Eye, FileText, RefreshCw, AlertCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const GradeDashboard = () => {
  const { id } = useParams();
  const router = useRouter();
  const [worksheets, setWorksheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const gradeName = id?.toString().toUpperCase();

  const fetchWorksheets = async () => {
    setLoading(true);
    setError(null);
    console.log(`[Frontend] Fetching worksheets for ${id}...`);
    try {
      const response = await fetch(`${API_BASE_URL}/api/worksheets/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(`[Frontend] Received ${data.length} worksheets. First one has ${data[0]?.questions?.length} questions.`);
      setWorksheets(data);
    } catch (error) {
      console.error('[Frontend] Fetch error:', error);
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่า Backend ทำงานอยู่');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchWorksheets();
  }, [id]);

  const handleDownload = async (worksheet: any) => {
    setDownloadingId(worksheet.id);
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
      setDownloadingId(null);
    }
  };

  const handleViewWorksheet = (ws: any) => {
    console.log('[Dashboard] Viewing worksheet:', ws.title, 'hasImage:', !!ws.imageUrl);
    sessionStorage.setItem(`worksheet_${ws.id}`, JSON.stringify(ws));
    router.push(`/worksheet/${ws.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} /> กลับหน้าหลัก
        </button>

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">ใบงานสำหรับชั้น {gradeName}</h1>
            <p className="text-slate-500 font-medium">รวมใบงานประจำวันที่ {new Date().toLocaleDateString('th-TH')}</p>
          </div>
          <button 
            onClick={fetchWorksheets}
            disabled={loading}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            สุ่มสร้างใหม่
          </button>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-8 flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
            <p className="text-slate-500 font-medium animate-pulse text-center">
              กำลังใช้ AI ออกแบบใบงานให้คุณ...<br/>
              <span className="text-xs opacity-70">รอสักครู่ (Groq AI เร็วมาก ปกติใช้เวลา 3-5 วินาที)</span>
            </p>
          </div>
        ) : worksheets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {worksheets.map((ws) => (
              <div key={ws.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                <div className="h-44 bg-slate-50 flex items-center justify-center border-b border-slate-50 group-hover:bg-teal-50/50 transition-colors relative">
                  <FileText size={56} className="text-slate-200 group-hover:text-teal-100 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-teal-700 text-[10px] font-black px-2 py-1 rounded-md border border-teal-100 uppercase tracking-wider">
                    {ws.isMock ? 'OFFLINE' : 'LIVE AI'}
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-teal-100/80 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-teal-100">
                      {ws.subject}
                    </span>
                    <span className="text-slate-400 text-[11px] font-bold bg-slate-50 px-2 py-1 rounded border border-slate-100">{ws.indicator}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 mb-3 leading-tight group-hover:text-teal-700 transition-colors">{ws.title}</h3>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">{ws.instructions}</p>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleViewWorksheet(ws)}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-50 text-slate-700 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-colors border border-slate-200"
                    >
                      <Eye size={18} /> พรีวิว
                    </button>
                    <button 
                      onClick={() => handleDownload(ws)}
                      disabled={downloadingId === ws.id}
                      className="flex-[1.2] flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-black hover:bg-teal-700 transition-all shadow-md active:scale-95 disabled:opacity-70"
                    >
                      {downloadingId === ws.id ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                      ) : (
                        <>
                          <Download size={18} /> PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4 opacity-20 text-slate-400">📝</div>
            <p className="text-slate-400 font-bold text-lg">ไม่พบข้อมูลใบงาน</p>
            <button 
              onClick={fetchWorksheets}
              className="mt-6 text-teal-600 font-bold hover:underline"
            >
              ลองสร้างใบงานใหม่ตอนนี้
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeDashboard;
