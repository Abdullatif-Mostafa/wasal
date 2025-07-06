"use client";

import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "@/RTK/Reducers/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {isAuthenticated,loading,token,error}=useSelector((state) => state.auth);
  console.log("error", error);
  useEffect(() => {
    console.log("isAuthenticated",isAuthenticated);
     if (isAuthenticated) {
      toast.success("تم تسجيل الدخول بنجاح!");
      setPassword("");
      setEmail("");
      setUsername("");
      router.push("/");
    }
    if (loading) {
      setError("جاري تحميل البيانات...");
    }
    if (error) {
      toast.error(error);
      setError(error);
    }
  }, [isAuthenticated, loading, error, router]);
  
//   useEffect(() => {
//   if (error || localError) {
//     const timer = setTimeout(() => {
//       setError("");
//     }, 1000);
//     return () => clearTimeout(timer);
//   }
// }, [error, localError]);
  
const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) {
      setError("يرجى ملء جميع الحقول.");
      return;
    }
    dispatch(registerAsync({ username, email, password }))
    // setSuccess("تم إنشاء الحساب بنجاح!");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif]">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-gradient-to-br from-teal-400 to-cyan-400 p-4 rounded-full shadow-lg mb-2">
            <FaUserPlus className="text-white text-2xl" />
          </span>
          <h2 className="text-3xl font-extrabold text-teal-700 mb-1">إنشاء حساب</h2>
          <p className="text-cyan-700 text-sm">سجّل بياناتك للانضمام إلينا</p>
        </div>
        {/* {error  && localError && <div  className="text-red-600 text-center mb-3 font-semibold bg-red-50 rounded-lg p-2">{error}</div>} */}
        {/* {success && <div className="text-green-600 text-center mb-3 font-semibold bg-green-50 rounded-lg p-2">{success}</div>} */}
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-cyan-400" />
          <input
            type="text"
            placeholder="اسم المستخدم"
            className="w-full pl-10 pr-4 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 text-teal-900 shadow"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="relative mb-4">
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
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            className="w-full pl-10 pr-4 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 text-teal-900 shadow"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-3 text-cyan-400 text-lg focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white font-bold rounded-xl shadow-lg hover:from-cyan-400 hover:to-teal-500 transition-colors text-lg cursor-pointer">
          {loading ? "جاري التسجيل..." : " تسجيل الحساب"}
          </button>
        <div className="mt-4 text-center">
          <Link href="/Pages/Login" className="text-cyan-700 hover:underline text-sm">لديك حساب بالفعل؟ تسجيل الدخول</Link>
        </div>
      </form>
    </div>
  );
}