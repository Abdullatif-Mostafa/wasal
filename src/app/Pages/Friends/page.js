// Friends Page
"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getAllUsersAsync } from "@/RTK/Reducers/userSlice";
import UserCardSkeleton from "@/app/Component/Skeletons/UserCardSkeleton";

const FriendsPage = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log("users ", users);
  useEffect(() => {
    dispatch(getAllUsersAsync())
  }, [dispatch]);
  // Dummy friends data (replace with real data from backend or Redux)

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-cyan-50 via-white to-teal-100 py-10 font-[Ruboto,sans-serif]">
      <div style={{ display: "flex", justifyContent: "space-between" }} className="max-w-3xl h-full mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md flex flex-col gap-8">
        <div className="flex  flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <Link href="/" className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
            {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} className="inline-block mr-2" /> */}
            الصفحة الرئيسية
          </Link>

          <h2 className="text-3xl font-extrabold text-teal-700 text-center flex-1">الأصدقاء</h2>
          <Link href="/Pages/Account" className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
            حسابي
          </Link>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {users?.map(user => (
            <div key={user?._id} className="bg-cyan-50 rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-2xl transition group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition"></div>
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-3 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
                <img src={user?.profileImage || "/file.svg" } alt={"user"} width={80} height={80} className="object-cover rounded-full"/>
              </div>
              <h3 className="text-xl font-bold text-teal-800 group-hover:text-cyan-600 transition-colors">{user.username}</h3>
              <p className="text-gray-600 text-sm mt-1 mb-2 text-center">{user?.bio || "لا يوجد وصف للمستخدم"}</p>
              <span className="text-xs text-cyan-700 mb-2">عضو منذ: {user.createdAt}</span>
              <Link href={`/Pages/${user._id}`} className="mt-2 px-4 py-1 bg-cyan-500 text-white rounded-full hover:bg-teal-600 transition text-sm font-semibold shadow group-hover:scale-105">عرض الحساب</Link>
            </div>
          ))}
        </div> */}
        {loading ? <UserCardSkeleton count={6} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {users?.map(user => (
              <div key={user?._id} className="bg-cyan-50 rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-2xl transition group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition"></div>
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-3 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
                  <img src={user?.profileImage || "/file.svg"} alt={"user"} width={80} height={80} className="object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-teal-800 group-hover:text-cyan-600 transition-colors">{user.username}</h3>
                <p className="text-gray-600 text-sm mt-1 mb-2 text-center">{user?.bio || "لا يوجد وصف للمستخدم"}</p>
                <span className="text-xs text-cyan-700 mb-2">عضو منذ: {user.createdAt}</span>
                <Link href={`/Pages/${user._id}`} className="mt-2 px-4 py-1 bg-cyan-500 text-white rounded-full hover:bg-teal-600 transition text-sm font-semibold shadow group-hover:scale-105">عرض الحساب</Link>
              </div>
            ))}
          </div>
        )}

        <div className="w-full text-center mt-8 flex flex-col gap-2">
          <Link href="/" className="text-cyan-700 hover:underline text-base font-bold">العودة للصفحة الرئيسية</Link>
          {/* <span className="text-xs text-gray-400">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</span> */}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
