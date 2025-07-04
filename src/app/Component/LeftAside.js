// LeftAside.js
"use client";

import Link from "next/link";
import { FaComments, FaRegNewspaper, FaUserCircle, FaLightbulb, FaBell } from "react-icons/fa";

const tips = [
  "استخدم الدردشة للتواصل الفوري مع أصدقائك!",
  "يمكنك تخصيص حسابك من صفحة الحساب.",
  "تابع المنشورات الجديدة باستمرار للبقاء على اطلاع.",
  "جرب الوضع الليلي من إعدادات الحساب لتحسين تجربة الاستخدام.",
  "استخدم البحث للعثور على أصدقاء جدد بسهولة!"
];
const updates = [
  { icon: <FaBell className="text-cyan-500" />, text: "تم إضافة ميزة الإشعارات الجديدة!" },
  { icon: <FaBell className="text-cyan-500" />, text: "تحديثات على صفحة المنشورات." },
  { icon: <FaBell className="text-cyan-500" />, text: "تحسينات في سرعة الدردشة." }
];
const randomTip = tips[Math.floor(Math.random() * tips.length)];
const LeftAside = ({ chatMode }) => (
  <aside className="hidden lg:block sticky top-20 h-[calc(100vh-6rem)] w-64 bg-gradient-to-br from-cyan-50 to-teal-100 border-r border-teal-200 shadow-lg rounded-2xl p-6 m-4">
    <div className="flex flex-col gap-6 h-full">
      {chatMode ? (
        <>
          <h2 className="text-xl font-bold text-teal-800 mb-0">معلومات الدردشة</h2>
          <div className="bg-white rounded-xl shadow p-4 mb-2">
            <h3 className="text-cyan-700 font-bold mb-2">إرشادات الأمان</h3>
            <ul className="text-cyan-900 text-sm list-disc pr-4 space-y-1">
              <li>لا تشارك معلوماتك الشخصية مع الغرباء.</li>
              <li>أبلغ عن أي سلوك غير لائق.</li>
              {/* <li>احترم خصوصية الآخرين.</li> */}
            </ul>
          </div>
          <h2 className="text-xl font-bold text-teal-800 mb-0"> مجموعاتك</h2>
          <div className="bg-white rounded-xl shadow p-4">
            <ul className="space-y-2">
              <li className="flex cursor-pointer items-center gap-2 bg-cyan-50 rounded-lg p-2 shadow hover:bg-cyan-100 transition">
                <FaComments className="text-cyan-400" />
                <span className="text-cyan-900 font-semibold">دردشة الأصدقاء</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 bg-cyan-50 rounded-lg p-2 shadow hover:bg-cyan-100 transition">
                <FaRegNewspaper className="text-cyan-400" />
                <span className="text-cyan-900 font-semibold">آخر الأخبار</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 bg-cyan-50 rounded-lg p-2 shadow hover:bg-cyan-100 transition">
                <FaUserCircle className="text-cyan-400" />
                <span className="text-cyan-900 font-semibold">ناشونال جيوجرافيك </span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 bg-cyan-50 rounded-lg p-2 shadow hover:bg-cyan-100 transition">
                <FaLightbulb className="text-cyan-400" />
                <span className="text-cyan-900 font-semibold">نصائح يومية</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="sticky top-24">
            <ul className="space-y-1.5">
              {/* <li>
                <Link href="/Pages/Posts" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                  المنشورات
                </Link>
              </li> */}
              <li>
                <Link href="/Pages/Account" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  الحساب
                </Link>
              </li>
              {/* الاصدقاء */}
              <li>
                <Link href="/Pages/Friends" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 11-8 0 4 4 0 018 0zM6.5 20a7.5 7.5 0 0111 0M12 15v3m0-3a7.5 7.5 0 00-6.5-3.5m13 3.5A7.5 7.5 0 0012 15z" /></svg>
                  الأصدقاء
                </Link>
              </li>
              {/*  المحفوظات */}
              <li>
                <Link href="/Pages/Saved" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                  </svg>
                  المحفوظات
                </Link>
              </li>

              {/*  الاخبار */}
              <li>
                <Link href="/Pages/News" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18M3 12h18m-9 4h9m-9 4h9M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>
                  الأخبار
                </Link>
              </li>
              {/* المجموعات   */}
              <li>
                <Link href="/Pages/Groups" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8m8 0a2 2 0 11-4 0 2 2 0 014 0zM6 12a2 2 0 11-4 0 2 2 0 014 0zM18.364 5.636a9.003 9.003 0 00-12.728 0m12.728 12.728a9.003 9.003 0 01-12.728 0" /></svg>
                  المجموعات
                </Link>
              </li>
              {/*   التنبيهات  */}
              <li>
                <Link href="/Pages/Notifications" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <FaBell className="w-5 h-5 text-cyan-400" />
                  التنبيهات
                </Link>
              </li>
              {/* الاعدادات */}
              <li>
                <Link href="/Pages/setting" className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8m8 0a2 2 0 11-4 0 2 2 0 014 0zM6 12a2 2 0 11-4 0 2 2 0 014 0zM18.364 5.636a9.003 9.003 0 00-12.728 0m12.728 12.728a9.003 9.003 0 01-12.728 0" /></svg>
                  الإعدادات
                </Link>
              </li>
            </ul>
            {/* <div className="mt-2 bg-white rounded-xl shadow p-4">
              <h3 className="text-cyan-700 font-bold mb-2 flex items-center gap-1">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
                نصيحة اليوم
              </h3>
              <p className="text-cyan-900 text-sm">{randomTip}</p>
            </div> */}
            <div className="mt-2 bg-white rounded-xl shadow p-4">
              <h3 className="text-cyan-700 font-bold mb-2 flex items-center gap-1">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                آخر التحديثات
              </h3>
              <ul className="text-cyan-900 text-sm list-disc pr-4 space-y-1">
                <li>إطلاق ميزة الدردشة الجماعية</li>
                <li>تحسين سرعة تحميل المنشورات</li>
                <li>إضافة دعم الوضع الليلي</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  </aside>
);

export default LeftAside;
