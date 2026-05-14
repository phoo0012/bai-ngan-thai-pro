'use client';

import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const grades = [
    { id: 'p1', name: 'ป.1', color: 'bg-red-100 text-red-600 border-red-200 hover:border-red-400' },
    { id: 'p2', name: 'ป.2', color: 'bg-orange-100 text-orange-600 border-orange-200 hover:border-orange-400' },
    { id: 'p3', name: 'ป.3', color: 'bg-yellow-100 text-yellow-600 border-yellow-200 hover:border-yellow-400' },
    { id: 'p4', name: 'ป.4', color: 'bg-green-100 text-green-600 border-green-200 hover:border-green-400' },
    { id: 'p5', name: 'ป.5', color: 'bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-400' },
    { id: 'p6', name: 'ป.6', color: 'bg-purple-100 text-purple-600 border-purple-200 hover:border-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold text-teal-700">ใบงานไทย Pro</span>
        </Link>
        <div className="hidden md:flex gap-6 text-slate-600 font-medium">
          <Link href="/" className="hover:text-teal-600">หน้าแรก</Link>
          <a href="#" className="hover:text-teal-600">วิชาทั้งหมด</a>
          <a href="#" className="hover:text-teal-600">ราคา</a>
        </div>
        <button className="bg-teal-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-sm">
          เข้าสู่ระบบ
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          สร้างใบงานประถม <span className="text-teal-600">อัตโนมัติ</span><br />
          ประหยัดเวลาครู ได้คุณภาพระดับมืออาชีพ
        </h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          ใบงานกว่า 60 แบบใหม่ทุกวัน ครอบคลุม ป.1-ป.6 ตามหลักสูตรแกนกลาง 2551 (ปรับปรุง 2560) พร้อมพื้นที่ระบายสีเพื่อความคิดสร้างสรรค์
        </p>

        {/* Grade Picker */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center justify-center gap-2">
            เลือกชั้นเรียนที่ต้องการเริ่มใช้งาน
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {grades.map((grade) => (
              <Link
                key={grade.id}
                href={`/grade/${grade.id}`}
                className={`group relative overflow-hidden h-24 rounded-2xl border-2 ${grade.color} transition-all hover:scale-[1.03] active:scale-[0.98] flex flex-col items-center justify-center`}
              >
                <span className="text-3xl font-black">{grade.name}</span>
                <span className="text-sm font-medium opacity-80 mt-1 group-hover:opacity-100">คลิกเพื่อดูใบงาน</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-1">60+</div>
            <div className="text-sm text-slate-500 font-medium">ใบงานใหม่/วัน</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-1">8+</div>
            <div className="text-sm text-slate-500 font-medium">กลุ่มสาระวิชา</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-1">PDF</div>
            <div className="text-sm text-slate-500 font-medium">พร้อมพิมพ์ทันที</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-1">AI</div>
            <div className="text-sm text-slate-500 font-medium">ตรงหลักสูตร 100%</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        &copy; 2026 ใบงานไทย Pro - แพลตฟอร์มเพื่อครูไทย ยุค AI
      </footer>
    </div>
  );
};

export default LandingPage;