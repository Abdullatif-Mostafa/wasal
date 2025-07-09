// RightAside.js
"use client";

import { FaUserPlus, FaCommentDots, FaSearch, FaUserFriends } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "@/RTK/Reducers/userSlice";

const suggestedFriends = [
  { name: "محمود", initial: "م", color: "bg-teal-400" },
  { name: "سارة", initial: "س", color: "bg-cyan-400" },
  // { name: "أحمد", initial: "أ", color: "bg-teal-300" },
  // { name: "ليلى", initial: "ل", color: "bg-cyan-300" },
  // { name: "يوسف", initial: "ي", color: "bg-teal-200" },
];

const recentChats = [
  { name: "خالد", lastMsg: "كيف حالك؟", time: "قبل دقيقة" },
  { name: "محمد", lastMsg: "سأراك لاحقًا!", time: "قبل 5 دقائق" },
  // { name: "ليلى", lastMsg: "تم إرسال الصورة.", time: "قبل 10 دقائق" },
];
const RightAside = ({ chatMode }) => {

  const [search, setSearch] = useState("");
  const filteredFriends = suggestedFriends.filter(f => f.name.includes(search));
  const { users, loading } = useSelector((state) => state.users);
  console.log("users in right aside", users);
  const dispatch = useDispatch();
  console.log("users ", users);
  useEffect(() => {
    dispatch(getAllUsersAsync())
  }, [dispatch]);
  return (
    <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] w-64 bg-gradient-to-br from-cyan-50 to-teal-100 border-l border-teal-200 shadow-lg rounded-2xl p-6 m-4">
      <div className="flex flex-col gap-3 h-full">
        {chatMode ? (
          <>
            <h2 className="text-xl font-bold text-teal-800 mb-2">قائمة الأصدقاء المتصلين</h2>
            <ul className="space-y-2 max-h-100 overflow-y-auto">
              { users &&
                users?.map((user) => (
                  <li key={user._id} className="bg-white  cursor-pointer rounded-lg p-2 shadow flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold">{user.username.charAt(0)}</span>
                        <span className="text-teal-900 font-semibold">{user.username}</span>

                    </div>
                    <span className="w-2 h-2 rounded-full bg-green-400" title="متصل"></span>
                  </li>
                ))
              }
            </ul>
            <div className="mt-6 bg-white rounded-xl shadow p-4">
              <h3 className="text-cyan-700 font-bold mb-2">نصيحة الدردشة</h3>
              <p className="text-cyan-900 text-sm">حافظ على احترام الآخرين وشارك المحادثة بإيجابية!</p>
              <p className="text-cyan-900 text-sm mt-2">تذكر أن الدردشة هي وسيلة للتواصل والتفاعل الاجتماعي.</p>
            </div>
          </>
        ) : (
          <>
            {/* Search Bar */}
            <div className="relative mb-0">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن صديق..."
                className="w-full rounded-lg border border-cyan-200 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-white text-teal-900 shadow"
              />
              <FaSearch className="absolute left-3 top-3 text-cyan-400" />
            </div>
            {/* Suggested Friends */}
            <div className="mt-auto min-h-35">
              <h2 className="text-xl font-bold text-teal-800 mb-2 flex items-center gap-2"><FaUserFriends className="text-cyan-400" /> الأصدقاء المقترحون</h2>
              <ul className="space-y-1">
                {filteredFriends.length ? filteredFriends.map((f, i) => (
                  <Link href={`/Pages/Friends`} key={i} className="bg-white rounded-lg p-2 shadow hover:bg-cyan-50 cursor-pointer flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full ${f.color} flex items-center justify-center text-white font-bold`}>{f.initial}</span>
                      <span className="text-teal-900 font-semibold">{f.name}</span>
                    </div>
                    <button className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 cursor-pointer rounded-full p-2 transition" title="إضافة صديق"><FaUserPlus /></button>
                  </Link>
                )) : <li className="text-cyan-700 text-center">لا يوجد نتائج</li>}
              </ul>
            </div>
            {/* Recent Chats */}
            <div className="mt-auto">
              <h3 className=" text-lg font-bold text-cyan-800 mb-2 flex items-center gap-2"><FaCommentDots className="text-cyan-400" /> الدردشات الأخيرة</h3>
              <ul className="space-y-2">
                {recentChats.map((chat, i) => (
                  <Link href={`/Pages/Chat`} key={i} className="bg-white rounded-lg p-2 shadow flex flex-col gap-1 cursor-pointer hover:bg-cyan-50 transition">
                    <div className="flex relative items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-cyan-300 flex items-center justify-center text-white font-bold">{chat.name[0]}</span>
                      <span className="text-teal-900 font-semibold">{chat.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{chat.time}</span>
                    </div>
                    <span className="text-xs text-cyan-700 pl-2">{chat.lastMsg}</span>
                  </Link>
                ))}
              </ul>
            </div>
            {/* Tips Section */}
            <div className="mt-auto bg-white rounded-xl shadow p-3">
              <h4 className="text-cyan-700 font-bold mb-1 flex items-center gap-1"><FaUserPlus className="text-cyan-400" /> نصيحة سريعة</h4>
              <p className="text-cyan-900 text-sm">تواصل مع أصدقاء جدد وابدأ محادثة اليوم!</p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default RightAside;
