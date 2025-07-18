"use client";
import { useState } from "react";
import { FaMoon, FaSun, FaBell, FaUserShield, FaLock, FaLanguage, FaPalette, FaUserEdit, FaTrashAlt, FaChevronDown, FaChevronUp, FaLightbulb, FaChevronLeft, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/RTK/Reducers/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Swal from 'sweetalert2';
import { deleteMyAccountAsync, deleteUserByIdAsync } from "@/RTK/Reducers/userSlice";
import { useRouter } from "next/navigation";

const languages = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export default function SettingPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("ar");
  const [showSecurity, setShowSecurity] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const router = useRouter();
 const metadata={
  title:"الاعدادت",
  description:"صفحه لعرض الاعدادات الموجوده في الموقع"
 }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Pages/Login');
    }
  }, []);
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast.success(newTheme === "dark" ? "تم تفعيل الوضع الليلي" : "تم تفعيل الوضع النهاري");
  };
// const USER=JSON.parse(localStorage.getItem("user"));
// console.log("USER in setting", USER.username);
  const handleLangChange = (e) => {
    setLang(e.target.value);
    toast.success("تم تغيير اللغة إلى " + languages.find(l => l.code === e.target.value)?.label, { position: "top-center" });
  };
  const handleLogout = async () => {
    const result = await Swal.fire({
      // title: 'تأكيد تسجيل الخروج',
      text: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
      // icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#38bdf8',
      confirmButtonText: 'نعم',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl p-6 shadow-lg bg-white text-black w-100px text-center ',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel',
      }
      ,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      showLoaderOnConfirm: true

    });
    if (result.isConfirmed) {
      dispatch(logout());
      toast.success('تم تسجيل الخروج بنجاح!');
      router.push("/");
    }
  };
  const handleDeleteAccount = async (userId) => {
    const result = await Swal.fire({
      // title: 'تأكيد حذف الحساب',
      text: 'سيتم حذف الحساب نهائياً ولا يمكن التراجع! هل أنت متأكد؟',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#38bdf8',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel',
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      showLoaderOnConfirm: true
    });
    if (result.isConfirmed) {
      try {
        await dispatch(deleteMyAccountAsync()).unwrap();
        dispatch(logout());
        toast.success('تم حذف الحساب بنجاح!');
        router.push("/Pages/Register");
      } catch (error) {
        toast.error('فشل حذف الحساب. حاول مرة أخرى لاحقاً.');
      }
    }
    else {
      toast.error('تم الغاء حذف الحساب.');
    }
};
return (
  <div className="min-h-screen border-none flex flex-col items-center py-10 bg-gradient-to-br from-cyan-50 via-white to-teal-100">
    <Toaster position="top-center" reverseOrder={false} />
    <div className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-8 border border-cyan-100 flex flex-col gap-2 transition-all duration-300">
      <div className="flex justify-between  items-center  gap-2 mb-5">

        {/* <h3 className="text-3xl md:text-4xl font-extrabold text-cyan-900 mb-2 text-center tracking-tight">الإعدادات </h3> */}
        <Link href="/" className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
          <FaArrowLeft /> الرئيسية
        </Link>
        {/* حفظ  */}
        <p onClick={() => toast.success('تم حفظ التغييرات بنجاح!')} className="px-4 cursor-pointer py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">حفظ</p>
      </div>
      {/* <p className="text-center text-cyan-800 mb-6 text-base md:text-lg">تحكم في كل تفاصيل تجربتك داخل التطبيق من هنا.</p> */}

      {/* Appearance */}
      <section className="bg-cyan-100  rounded-xl shadow p-2 ps-4 hover:bg-cyan-200 transition group relative overflow-hidden border-l-4 border-cyan-300 group-hover:border-teal-400">
        <button className="flex cursor-pointer items-center gap-4 w-full text-lg font-bold text-cyan-800 mb-2 transition-colors" onClick={() => setShowAppearance(v => !v)}>
          <FaPalette /> المظهر {showAppearance ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showAppearance && (
          <div className="bg-cyan-50  rounded-xl p-4 flex flex-col items-start gap-4 border border-cyan-100 ">
            <div className="flex  md:flex-row items-center gap-4">
              <span className="font-semibold text-cyan-900">الوضع الليلي:</span>
              <button onClick={handleThemeToggle} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-all-300">
                {theme === "light" ? <FaMoon /> : <FaSun />} {theme === "light" ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري"}
              </button>
            </div>
            <div className="flex md:flex-row items-center cursor-pointer gap-4">
              {/* <FaLanguage className="text-cyan-400 cursor-pointer" /> */}
              <label htmlFor="lang" className="font-semibold  text-cyan-900">اللغة:</label>
              <select id="lang" value={lang} onChange={handleLangChange} className="rounded-lg border-cyan-200 cursor-pointer px-3 py-1 focus:ring-2 focus:ring-cyan-400 text-cyan-900">
                {languages.map(l => <option className="text-cyan-900 cursor-pointer" key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </div>
          </div>
        )}
      </section>

      {/* Notifications */}
      <section className="bg-cyan-100  rounded-xl shadow p-2 ps-4 hover:bg-cyan-200 transition group relative overflow-hidden border-l-4 border-cyan-300 group-hover:border-teal-400">
        <button className="flex cursor-pointer items-center gap-2 w-full text-lg font-bold text-cyan-800 mb-2 transition-colors" onClick={() => setShowNotifications(v => !v)}>
          <FaBell /> الإشعارات {showNotifications ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showNotifications && (
          <div className="bg-cyan-50 rounded-xl p-4 flex flex-col gap-4 border border-cyan-100">
            <div className="flex items-center hover:bg-cyan-100 p-1 border-r-2 gap-4">
              <input type="checkbox" id="notif1" className="accent-cyan-500 cursor-pointer" defaultChecked />
              <label htmlFor="notif1" className="text-cyan-900 cursor-pointer">تفعيل إشعارات الرسائل الجديدة</label>
            </div>
            <div className="flex items-center hover:bg-cyan-100 p-1 border-r-2 gap-4">
              <input type="checkbox" id="notif2" className="accent-cyan-500 cursor-pointer" />
              <label htmlFor="notif2" className="text-cyan-900 cursor-pointer">تفعيل إشعارات التعليقات</label>
            </div>
            <div className="flex items-center hover:bg-cyan-100 p-1 border-r-2 gap-4">
              <input type="checkbox" id="notif3" className="accent-cyan-500 cursor-pointer" />
              <label htmlFor="notif3" className="text-cyan-900 cursor-pointer">تفعيل إشعارات الأصدقاء الجدد</label>
            </div>
          </div>
        )}
      </section>

      {/* Security */}
      <section className="bg-cyan-100  rounded-xl shadow p-2 ps-4 hover:bg-cyan-200 transition group relative overflow-hidden border-l-4 border-cyan-300 group-hover:border-teal-400">
        <button className="flex cursor-pointer items-center gap-2 w-full text-lg font-bold text-cyan-800 mb-2 transition-colors" onClick={() => setShowSecurity(v => !v)}>
          <FaLock /> الأمان {showSecurity ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showSecurity && (
          <div className="bg-cyan-50 rounded-xl p-4 flex flex-col gap-4 border border-cyan-100">
            <div className="flex items-center gap-4">
              <FaUserShield className="text-cyan-400" />
              <span className="text-cyan-900">تفعيل المصادقة الثنائية (قريباً)</span>
            </div>
            <div className="flex items-center gap-4">
              <FaLock className="text-cyan-400" />
              <span className="text-cyan-900">تغيير كلمة المرور</span>
              <Link href="/Pages/ChangePassword" className="ml-auto px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-all">تغيير</Link>
            </div>
            <div className="flex items-center gap-4">
              <FaTrashAlt className="text-red-400" />
              <span className="text-cyan-900">حذف الحساب</span>
              <button onClick={() => handleDeleteAccount(user?._id)} className="cursor-pointer ml-auto px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all">حذف</button>
            </div>
          </div>
        )}
      </section>

      {/* Account */}
      <section className="bg-cyan-100  rounded-xl shadow p-2 ps-4 hover:bg-cyan-200 transition group relative overflow-hidden border-l-4 border-cyan-300 group-hover:border-teal-400">
        <button className="flex items-center gap-2 w-full text-lg font-bold text-cyan-800 mb-2 transition-colors" onClick={() => setShowAccount(v => !v)}>
          <FaUserEdit /> الحساب {showAccount ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showAccount && (
          <div className="bg-cyan-50 rounded-xl p-4 flex flex-col gap-4 border border-cyan-100">
            <div className="flex items-center gap-4">
              <span className="text-cyan-900">تعديل الملف الشخصي</span>
              <Link href="/Pages/Account" className="ml-auto px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-all">الذهاب</Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cyan-900">تسجيل الخروج</span>
              <button onClick={handleLogout} className="ml-auto px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all">خروج</button>
            </div>
          </div>
        )}
      </section>

      {/* More Features */}
      <section className="bg-cyan-100 cursor-pointer rounded-xl shadow p-2 ps-4 hover:bg-cyan-200 transition group relative overflow-hidden border-l-4 border-cyan-300 group-hover:border-teal-400">
        <h2 className="text-lg font-bold text-cyan-800 mb-2 flex items-center gap-2"><FaLightbulb /> ميزات متقدمة</h2>
        <div className="bg-cyan-50 rounded-xl p-4 flex flex-col gap-4 border border-cyan-100">
          <ul className="list-disc pr-4 text-cyan-900 space-y-1">
            <li>إدارة الجلسات النشطة (قريباً)</li>
            <li>تصدير بيانات الحساب (قريباً)</li>
            <li>إعدادات الخصوصية المتقدمة (قريباً)</li>
            <li>تخصيص ألوان التطبيق (قريباً)</li>
            <li>إعدادات البحث الذكي (قريباً)</li>
            <li>إدارة الأجهزة المتصلة (قريباً)</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);
}
