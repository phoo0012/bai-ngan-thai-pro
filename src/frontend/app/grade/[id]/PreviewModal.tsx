import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  worksheet: any;
  onDownload: (worksheet: any) => void;
}

const PreviewModal = ({ isOpen, onClose, worksheet, onDownload }: PreviewModalProps) => {
  if (!isOpen || !worksheet) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">{worksheet.title}</h2>
              <p className="text-xs text-slate-500">{worksheet.subject} • {worksheet.grade}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content - Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8">
          <div className="bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-lg p-[20mm] flex flex-col font-sans text-[#333]">
            {/* Header */}
            <div className="border-b-[3px] border-teal-700 pb-2 mb-6 flex justify-between items-end">
              <h1 className="text-2xl font-bold text-teal-700 m-0">{worksheet.title}</h1>
              <div className="text-sm font-bold text-slate-500">{worksheet.subject} {worksheet.grade}</div>
            </div>

            {/* Student Info */}
            <div className="flex justify-between mb-8 text-sm">
              <span>ชื่อ-นามสกุล: ........................................................................</span>
              <span>เลขที่: ............</span>
            </div>

            {/* Instructions */}
            <div className="bg-slate-50 border-l-4 border-teal-700 p-4 mb-8 rounded-r-lg">
              <div className="font-bold text-teal-700 mb-1">คำชี้แจง:</div>
              <div className="text-sm">{worksheet.instructions}</div>
            </div>

            {/* Questions */}
            <div className="flex-1 mb-10">
              {worksheet.questions.map((q, i) => (
                <div key={i} className="mb-6 text-sm">
                  <div className="mb-2">
                    <span className="font-bold text-teal-700 mr-2">{i + 1}.</span>
                    {q.text}
                  </div>
                  <div className="text-slate-300">
                    ตอบ: ............................................................................................
                  </div>
                </div>
              ))}
            </div>

            {/* Creative Zone */}
            <div className="border-2 border-dashed border-orange-800 rounded-2xl h-80 bg-orange-50/30 flex flex-col items-center justify-center text-orange-800 mb-8">
              <span className="text-4xl mb-2">🎨</span>
              <span className="font-bold text-lg">{worksheet.creativeSpaceLabel}</span>
              <span className="text-xs opacity-70 mt-1">(วาดภาพและระบายสีให้สวยงาม)</span>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-top border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
              <div>ตัวชี้วัด: {worksheet.indicator}</div>
              <div className="flex gap-1 text-yellow-400">⭐⭐⭐</div>
              <div>ใบงานไทย Pro | พิมพ์เมื่อ {new Date().toLocaleDateString('th-TH')}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
          >
            ยกเลิก
          </button>
          <button 
            onClick={() => onDownload(worksheet)}
            className="flex items-center gap-2 bg-teal-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-md active:scale-95"
          >
            <Download size={18} /> ดาวน์โหลด PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
