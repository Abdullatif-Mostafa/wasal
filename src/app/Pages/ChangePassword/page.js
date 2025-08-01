"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
const metadata={
  title:"تغيير كلمه المرور",
  description:"صفحه لعرض تغيير كلمه المرور"
}
export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("كلمة المرور الجديدة غير متطابقة");
      return;
    }
    setLoading(true);
    try {
      // استبدل هذا بالطلب الحقيقي للباكند
      // مثال:
      // await dispatch(changePasswordAsync({ oldPassword, newPassword }))
      await new Promise((res) => setTimeout(res, 1200));
      setLoading(false);
      toast.success("تم تغيير كلمة المرور بنجاح!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/Pages/Account"), 1500);
    } catch (err) {
      setLoading(false);
      toast.error("حدث خطأ أثناء تغيير كلمة المرور");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-100 py-10">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-2">تغيير كلمة المرور</h2>
        <input
          type="password"
          placeholder="كلمة المرور الحالية"
          className="border text-gray-900 border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          className="border text-gray-900 border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور الجديدة"
          className="border text-gray-900 border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors py-2 mt-2 disabled:opacity-60"
        >
          {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
        </button>
      </form>
    </div>
  );
}
