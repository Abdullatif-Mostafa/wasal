"use client";
import { useState } from "react";
import { FaEnvelope, FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
const metadata={
  title:"نسيت كلمه المرور",
  description:" صفحه عرض نسيت كلمه المرور وتمكني من اعاده تعيينها"
}
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني");
      setSuccess("");
      return;
    }
    // تنفيذ منطق إرسال رابط إعادة تعيين كلمة المرور هنا
    setError("");
    setSuccess("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني إذا كان مسجلاً.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif]">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-gradient-to-br from-teal-400 to-cyan-400 p-4 rounded-full shadow-lg mb-2">
            <FaUnlockAlt className="text-white text-2xl" />
          </span>
          <h2 className="text-2xl font-extrabold text-teal-700 mb-1">نسيت كلمة المرور؟</h2>
          <p className="text-cyan-700 text-sm">أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور</p>
        </div>
        {error && <div className="text-red-600 text-center mb-3 font-semibold bg-red-50 rounded-lg p-2">{error}</div>}
        {success && <div className="text-green-600 text-center mb-3 font-semibold bg-green-50 rounded-lg p-2">{success}</div>}
        <div className="relative mb-6">
          <FaEnvelope className="absolute left-3 top-3 text-cyan-400" />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full pl-10 pr-4 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 text-teal-900 shadow"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white font-bold rounded-xl shadow-lg hover:from-cyan-400 hover:to-teal-500 transition-colors text-lg cursor-pointer">إرسال رابط إعادة التعيين</button>
        <div className="mt-4 text-center">
          <Link href="/Pages/Login" className="text-cyan-700 hover:underline text-sm">العودة لتسجيل الدخول</Link>
        </div>
      </form>
    </div>
  );
}
