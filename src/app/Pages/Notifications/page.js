// Notifications Page
"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBell,
  FaUserCircle,
  FaComments,
  FaRegNewspaper,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
 const metadata = {
  title: "التنبيهات",
  description: "صفحة التنبيهات تعرض جميع التنبيهات الخاصة بك.",
};
const notifications = [
  {
    id: 1,
    type: "comment",
    icon: <FaComments className="text-cyan-500 text-xl" />,
    user: "سارة محمد",
    message: "علقت على منشورك: رائع جداً!",
    time: "قبل دقيقة",
    link: "/Pages/postDetails/1",
  },
  {
    id: 2,
    type: "group",
    icon: <FaUsers className="text-teal-500 text-xl" />,
    user: "مجموعة مبرمجو الويب",
    message: "تمت إضافتك إلى المجموعة.",
    time: "قبل 5 دقائق",
    link: "/Pages/Groups",
  },
  {
    id: 3,
    type: "news",
    icon: <FaRegNewspaper className="text-cyan-400 text-xl" />,
    user: "الأخبار",
    message: "ميزة جديدة: الوضع الليلي متاح الآن!",
    time: "قبل 10 دقائق",
    link: "/Pages/News",
  },
  {
    id: 4,
    type: "friend",
    icon: <FaUserCircle className="text-teal-400 text-xl" />,
    user: "خالد يوسف",
    message: "أرسل لك طلب صداقة.",
    time: "قبل ساعة",
    link: "/Pages/Friends",
  },
  {
    id: 5,
    type: "system",
    icon: <FaBell className="text-yellow-400 text-xl" />,
    user: "النظام",
    message: "تم تحديث سياسة الخصوصية.",
    time: "اليوم",
    link: "#",
  },
  {
    id: 6,
    type: "comment",
    icon: <FaComments className="text-cyan-500 text-xl" />,
    user: "أحمد علي",
    message: "أجاب على سؤالك في الدردشة.",
    time: "قبل ساعتين",
    link: "/Pages/Chat",
  },
  {
    id: 7,
    type: "group",
    icon: <FaUsers className="text-teal-500 text-xl" />,
    user: "مجموعة عشاق التقنية",
    message: "تمت إضافة منشور جديد.",
    time: "قبل يوم",
    link: "/Pages/Groups",
  },
];

const NotificationsPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Pages/Login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 py-10 font-[Ruboto,sans-serif]">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col pt-4 sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-extrabold text-teal-700 text-center flex-1 flex items-center gap-2">
            <FaBell className="text-cyan-500 text-2xl" />
            التنبيهات
          </h2>
          <Link
            href="/"
            className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2"
          >
            <FaArrowLeft /> الرئيسية
          </Link>
        </div>

        {/* Notifications */}
        <div className="flex flex-col gap-4">
          {notifications.map((notif) => (
            <Link
              key={notif.id}
              href={notif.link}
              className="flex items-center gap-4 bg-cyan-50 rounded-xl shadow p-4 hover:bg-cyan-100 transition group relative overflow-hidden border-l-4 border-cyan-300 group-hover:border-teal-400"
            >
              <span className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {notif.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-teal-800 group-hover:text-cyan-600 transition-colors">
                    {notif.user}
                  </span>
                  <span className="text-xs text-gray-400">{notif.time}</span>
                </div>
                <p className="text-gray-700 text-sm">{notif.message}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
