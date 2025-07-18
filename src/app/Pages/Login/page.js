"use client";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "@/RTK/Reducers/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const metadata={
  titel:"صفحه تسجيل الدخول",
  description:"صفحه تسجيل دخول المستخدم "
}
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const [localError, setError] = useState(error);
console.log("error", error);
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("تم تسجيل الدخول بنجاح!");
      setPassword("");
      setEmail("");
      router.push("/");
    }
     if (error) {
      toast.error(error);
      setError(error);
    }
  }, [isAuthenticated, router, error]);

// useEffect(() => {
//   if (error) {
//     const timer = setTimeout(() => {
//       setError();
//     }, 1000);
//     return () => clearTimeout(timer);
//   }
// }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("يرجى ملء جميع الحقول.");
      // setSuccess("");
      return;
    }
    // setSuccess("");
    dispatch(loginAsync({ email, password }));
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="bg-gradient-to-br from-teal-400 to-cyan-400 p-4 rounded-full shadow-lg mb-2">
            <FaSignInAlt className="text-white text-2xl" />
          </span>
          <h2 className="text-3xl font-extrabold text-teal-700 mb-1">تسجيل الدخول</h2>
          <p className="text-cyan-700 text-sm">أدخل بياناتك للمتابعة</p>
        </div>

        {/* {error  &&  <div  className="text-red-600 text-center mb-3 font-semibold bg-red-50 rounded-lg p-2">{error}</div>} */}

        {/* {success && (
          <div className="text-green-600 text-center mb-3 font-semibold bg-green-50 rounded-lg p-2">
            {success}
          </div>
        )} */}

        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-cyan-400" />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full pl-10 pr-4 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 text-teal-900 shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            className="w-full pl-10 pr-4 py-2 border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 text-teal-900 shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white font-bold rounded-xl shadow-lg hover:from-cyan-400 hover:to-teal-500 transition-colors text-lg cursor-pointer disabled:opacity-50"
        >
          {loading ? "جاري تسجيل الدخول..." : "دخول"}
        </button>

        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <Link href="/Pages/ForgotPassword" className="text-cyan-700 hover:underline text-sm">
            نسيت كلمة المرور؟
          </Link>
          <Link href="/Pages/Register" className="text-cyan-700 hover:underline text-sm">
            ليس لديك حساب؟ إنشاء حساب جديد
          </Link>
        </div>
      </form>
    </div>
  );
}
