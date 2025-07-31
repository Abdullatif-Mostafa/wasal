"use client";
import { resetPasswordAsync } from "@/RTK/Reducers/authSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use, useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// export const metadata = {
//   title: "إعادة تعيين كلمة المرور | واصل",
//   description: "صفحة إعادة تعيين كلمة المرور تمكنك من تعيين كلمة مرور جديدة بأمان.",
//   keywords: "إعادة تعيين كلمة المرور, كلمة مرور جديدة, واصل, reset password, new password",
//   robots: "index, follow",
// }
export default function ResetPassword({params}) {
  const { resetPassword } = use(params);
  const token = resetPassword 
  // console.log("params ====",token)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {loading}=useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("يرجى إدخال كلمة المرور وتأكيدها");
      setSuccess("");
      return;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setSuccess("");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      setSuccess("");
      return;
    }
    // هنا منطق إرسال كلمة المرور الجديدة إلى السيرفر
    dispatch(resetPasswordAsync({ token, newPassword: password })) 
    .unwrap()
    .then(() => {
      setError("");
      setSuccess("تم تعيين كلمة المرور الجديدة بنجاح! يمكنك الآن تسجيل الدخول.");
      setPassword("");
      setConfirmPassword("");
    })
    .catch((err) => {
        setError(err);
        setSuccess("");
      }) 
    // setError("");
    // setSuccess("تم تعيين كلمة المرور الجديدة بنجاح! يمكنك الآن تسجيل الدخول.");
    // setPassword("");
    // setConfirmPassword("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif]">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-gradient-to-br from-teal-400 to-cyan-400 p-4 rounded-full shadow-lg mb-2">
            <FaLock className="text-white text-2xl" />
          </span>
          <h2 className="text-2xl font-extrabold text-teal-700 mb-1">إعادة تعيين كلمة المرور</h2>
          <p className="text-cyan-700 text-sm">أدخل كلمة المرور الجديدة وأكدها</p>
        </div>
        {error && <div className="text-red-600 text-center mb-3 font-semibold bg-red-50 rounded-lg p-2">{error}</div>}
        {success && <div className="text-green-600 text-center mb-3 font-semibold bg-green-50 rounded-lg p-2">{success}</div>}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="كلمة المرور الجديدة"
            className="w-full border text-gray-700 border-cyan-200 rounded-lg px-4 py-3 pr-5 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-right text-base"
            autoComplete="new-password"
          />
          <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute left-3 top-4 text-cyan-400">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="تأكيد كلمة المرور"
            className="w-full border border-cyan-200 text-gray-700 rounded-lg px-4 py-3 pr-5 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-right text-base"
            autoComplete="new-password"
          />
          <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute left-3 top-4 text-cyan-400">
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow text-lg py-3 transition-colors hover:from-cyan-400 hover:to-teal-500">{loading ? "جاري تعيين كلمه المرور ..." : " تعيين كلمه المرور "}</button>
        <Link href={'/Pages/Login'}>
            <p className="text-cyan-700 text-md mt-3 text-center">تسجيل الدخول</p>
        </Link>
      </form>
    </div>
  );
}
