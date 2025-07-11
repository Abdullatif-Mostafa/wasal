// News Page
"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegNewspaper, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const newsList = [
  {
    id: 1,
    title: "إطلاق ميزة الدردشة الجماعية",
    image: "/globe.svg",
    date: "2025-06-10",
    summary: "تم إطلاق ميزة الدردشة الجماعية الجديدة التي تتيح لك التواصل مع عدة أصدقاء في نفس الوقت بسهولة وفعالية.",
    link: "#"
  },
  {
    id: 2,
    title: "تحسين سرعة تحميل المنشورات",
    image: "/file.svg",
    date: "2025-06-08",
    summary: "تمت ترقية خوادمنا لتحسين سرعة تحميل المنشورات بنسبة 40% لتجربة أكثر سلاسة.",
    link: "#"
  },
  {
    id: 3,
    title: "إضافة دعم الوضع الليلي",
    image: "/next.svg",
    date: "2025-06-01",
    summary: "يمكنك الآن تفعيل الوضع الليلي من إعدادات الحساب لتحسين تجربة الاستخدام في الإضاءة المنخفضة.",
    link: "#"
  },
  {
    id: 4,
    title: "تحديثات الأمان الجديدة",
    image: "/vercel.svg",
    date: "2025-05-28",
    summary: "تمت إضافة طبقات حماية إضافية لحماية بياناتك ومحادثاتك بشكل أفضل.",
    link: "#"
  },
];

const NewsPage = () => {
  const router = useRouter();
useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Pages/Login');
    }
  }, []);
  <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 py-10 font-[Ruboto,sans-serif]">
    <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-teal-700 text-center flex-1 flex items-center gap-2">
          <FaRegNewspaper className="text-cyan-500 text-2xl" />
          الأخبار
        </h2>
        <Link href="/" className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
          <FaArrowLeft /> الرئيسية
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {newsList.map(news => (
          <div key={news.id} className="bg-cyan-50 rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-2xl transition group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition"></div>
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-3 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
              <Image src={news.image} alt={news.title} width={80} height={80} className="object-cover rounded-full" />
            </div>
            <h3 className="text-lg font-bold text-teal-800 group-hover:text-cyan-600 transition-colors text-center mb-1">{news.title}</h3>
            <span className="flex items-center gap-1 text-xs text-cyan-700 mb-2"><FaCalendarAlt /> {news.date}</span>
            <p className="text-gray-600 text-sm mb-2 text-center">{news.summary}</p>
            <Link href={news.link} className="mt-2 px-4 py-1 bg-cyan-500 text-white rounded-full hover:bg-teal-600 transition text-sm font-semibold shadow group-hover:scale-105">اقرأ المزيد</Link>
          </div>
        ))}
      </div>
      {/* <div className="w-full text-center mt-8 flex flex-col gap-2">
        <Link href="/Pages/Friends" className="text-cyan-700 hover:underline text-base font-bold">الأصدقاء</Link>
        <span className="text-xs text-gray-400">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</span>
      </div> */}
    </div>
  </div>
}

export default NewsPage;
