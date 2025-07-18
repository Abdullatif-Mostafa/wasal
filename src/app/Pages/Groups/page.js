// Groups Page
"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUsers, FaComments, FaRegNewspaper, FaGlobe, FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const metadata={
  title:"الجروبات",
  description:"هذه الصفحه تعرض الجروبات التي مشترك فيها المستخدم"
}

const groups = [
  {
    id: 1,
    name: "مبرمجو الويب",
    image: "/file.svg",
    members: 1200,
    desc: "مجتمع لمناقشة كل ما يخص تطوير الويب والتقنيات الحديثة.",
    link: "#"
  },
  {
    id: 2,
    name: "عشاق التصميم",
    image: "/globe.svg",
    members: 850,
    desc: "كل ما يتعلق بالتصميم الجرافيكي وتجارب المستخدم.",
    link: "#"
  },
  {
    id: 3,
    name: "رواد الأعمال",
    image: "/next.svg",
    members: 430,
    desc: "نقاشات حول ريادة الأعمال والمشاريع الناشئة.",
    link: "#"
  },
  {
    id: 4,
    name: "مجموعة الأخبار التقنية",
    image: "/vercel.svg",
    members: 2100,
    desc: "آخر أخبار التقنية والتحديثات العالمية.",
    link: "#"
  },
  {
    id: 5,
    name: "الدردشة العامة",
    image: "/window.svg",
    members: 3000,
    desc: "مساحة حرة للدردشة والتعارف بين الجميع.",
    link: "#"
  },
];

const GroupsPage = () => {
    const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/Pages/Login';
    }
  }, [])
return(
  <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 py-10 font-[Ruboto,sans-serif]">
    <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-teal-700 text-center flex-1 flex items-center gap-2">
          <FaUsers className="text-cyan-500 text-2xl" />
          المجموعات
        </h2>
        <Link href="/" className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
          <FaArrowLeft /> الرئيسية
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {groups.map(group => (
          <div key={group.id} className="bg-cyan-50 rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-2xl transition group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition"></div>
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-3 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
              <Image src={group.image} alt={group.name} width={80} height={80} className="object-cover rounded-full" />
            </div>
            <h3 className="text-lg font-bold text-teal-800 group-hover:text-cyan-600 transition-colors text-center mb-1">{group.name}</h3>
            <span className="flex items-center gap-1 text-xs text-cyan-700 mb-2"><FaUsers /> {group.members} عضو</span>
            <p className="text-gray-600 text-sm mb-2 text-center">{group.desc}</p>
            <Link href={group.link} className="mt-2 px-4 py-1 bg-cyan-500 text-white rounded-full hover:bg-teal-600 transition text-sm font-semibold shadow group-hover:scale-105">دخول المجموعة</Link>
          </div>
        ))}
      </div>
      {/* <div className="w-full text-center mt-8 flex flex-col gap-2">
        <Link href="/Pages/Friends" className="text-cyan-700 hover:underline text-base font-bold">الأصدقاء</Link>
        <span className="text-xs text-gray-400">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</span>
      </div> */}
    </div>
  </div>
)  
}
export default GroupsPage;
