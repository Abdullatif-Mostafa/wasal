"use client";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const metadata={
  tile:"الصفحة غير موجودة",
  description:"هذه الصفحة غير موجودة أو تم نقلها. يرجى العودة للصفحة الرئيسية."
  
}
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-100 p-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 border border-cyan-100 flex flex-col items-center gap-6 max-w-md w-full">
        <FaExclamationTriangle className="text-cyan-400 text-6xl mb-2" />
        <h1 className="text-4xl font-extrabold text-cyan-800 mb-2 text-center">الصفحة غير موجودة</h1>
        <p className="text-cyan-700 text-center text-lg">عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.</p>
        <Link href="/" className="mt-4 px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition-all">العودة للصفحة الرئيسية</Link>
      </div>
    </div>
  );
}
