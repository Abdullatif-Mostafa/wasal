"use client";

import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle, FaEnvelope, FaEdit, FaSignOutAlt, FaCalendarAlt, FaUserFriends, FaRegImage, FaRegCommentDots, FaMoon, FaSun, FaCog, FaTimes, FaCommentDots, FaComment, FaHistory, FaBell, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
// import Image from "next/image";
import { getUserByIdAsync } from "@/RTK/Reducers/userSlice";
import { logout } from "@/RTK/Reducers/authSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPostsByUserId } from "@/RTK/Reducers/postSlice";

export default function Page() {
  const { selectedUser } = useSelector((state) => state.users)
  const dispatch = useDispatch();
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({ ...selectedUser });
  const [previewImg, setPreviewImg] = useState(selectedUser?.profileImage);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const userId = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
  const { posts } = useSelector((state) => state.posts)
  const { user,isAuthenticated } = useSelector((state) => state.auth)
  console.log("isAuthenticated :", isAuthenticated);
  console.log("user :", user);  
  // Ensure posts is always an array
  useEffect(() => {
    dispatch(getUserByIdAsync(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPostsByUserId(userId));
    }, 1500); // Delay to ensure user data is fetched first
  }, [dispatch, userId]);
  console.log("Selected User:", selectedUser);
  console.log("Posts By User  type of :", typeof posts);
  console.log("Posts By User   :", posts);
  const stats = {
    posts: posts.length,
    comments: "",
    friends: "",
  };
  // Logout logic
  const handleLogout = () => {
    dispatch(logout());
    router.push("/Pages/Login");
  };

  // Edit modal logic
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" && files && files[0]) {
      setPreviewImg(URL.createObjectURL(files[0]));
      setEditData({ ...editData, profile_image: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowEdit(false);
  };

  // Theme toggle
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className={`min-h-screen flex items-center mt-6 justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif] py-10 ${theme === "dark" ? "dark" : ""}`}>
      <>
      </>
      <div
        className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-cyan-100 backdrop-blur-md flex flex-col items-center gap-6 relative"
      >

        {/* Settings Dropdown */}
        <button
          className="absolute top-4 right-4 text-cyan-500 hover:text-teal-600 text-xl md:text-2xl focus:outline-none"
        // onClick={() => setShowSettings((v) => !v)}
        // title=" الرئيسية"
        >

          {/* <FaCog /> */}
          <Link href="/" className="px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
            <FaArrowLeft /> الرئيسية
          </Link>
        </button>
        <div className="flex flex-col pt-4 sm:flex-row items-center justify-between mb-6 gap-4">
         
         {/*  */}
        </div>
     
        <div className="flex flex-col items-center gap-2">

          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-5xl md:text-6xl text-white shadow-lg overflow-hidden">
            {selectedUser?.profileImage ? (
              <img src={selectedUser?.profileImage || " "} alt="الصورة الشخصية" width={112} height={112} className="object-cover rounded-full w-full h-full" />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-teal-700 mt-2 break-words text-center">{selectedUser?.username}</h2>
          <p className="text-cyan-700 text-xs md:text-sm flex items-center gap-2 break-all"><FaEnvelope /> {selectedUser?.email}</p>
          <p className="text-gray-600 text-xs md:text-sm mt-1">
            عضو منذ: {selectedUser?.createdAt?.split(" ")[0] || new Date().toLocaleDateString()}
          </p>
        </div>
        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-2 md:gap-4 mt-1">
          <div className="bg-cyan-50 rounded-xl shadow p-2 md:p-4 flex flex-col items-center">
            <span className="text-lg md:text-2xl font-bold text-teal-600">{stats.posts}</span>
            <span className="text-gray-500 text-xs md:text-sm mt-1 flex items-center gap-1">
              <FaCommentDots /> المنشورات
            </span>
          </div>
          <div className="bg-cyan-50 rounded-xl shadow p-2 md:p-4 flex flex-col items-center">
            <span className="text-lg md:text-2xl font-bold text-teal-600">{stats.comments}</span>
            <span className="text-gray-500 text-xs md:text-sm mt-1 flex items-center gap-1">
              <FaRegCommentDots /> القصص
            </span>
          </div>
          <div className="bg-cyan-50 rounded-xl shadow p-2 md:p-4 flex flex-col items-center">
            <span className="text-lg md:text-2xl font-bold text-teal-600">{stats.friends}</span>
            <span className="text-gray-500 text-xs md:text-sm mt-1 flex items-center gap-1">
              <FaUserFriends /> الأصدقاء
            </span>
          </div>
        </div>
        {/* Bio */}
        <div className="w-full bg-cyan-50 rounded-xl shadow p-3 md:p-4 flex flex-col gap-2">
          <h3 className="text-cyan-700 font-bold mb-0 flex items-center gap-2 text-base md:text-lg">
            <FaUserCircle className="text-cyan-400" /> النبذة الشخصية
          </h3>
          <p className="text-gray-700 text-xs md:text-sm">{selectedUser?.bio || "لا يوجد نبذة شخصية"}</p>
        </div>
        {/* Actions */}
        {
        console.log("Selected User ID:", selectedUser?._id)}
       {console.log("Current User ID:", user?._id)
        }
        { user?._id === selectedUser?._id && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full justify-center">
            <button
              className="flex items-center gap-2 justify-center px-4 md:px-5 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white font-bold rounded-full shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-base md:text-lg cursor-pointer w-full sm:w-auto"
              onClick={() => setShowEdit(true)}
              title="تعديل الحساب"
            >
              <FaEdit /> تعديل الحساب
            </button>
            <button
              className="flex items-center gap-2 justify-center px-4 md:px-5 py-2 bg-gradient-to-r from-red-500 via-pink-400 to-red-400 text-white font-bold rounded-full shadow hover:from-pink-400 hover:to-red-500 transition-colors text-base md:text-lg cursor-pointer w-full sm:w-auto"
              onClick={handleLogout}
              title="تسجيل الخروج"
            >
              <FaSignOutAlt /> تسجيل الخروج
            </button>
          </div>
        )}
        {/* Recent Posts */}
        <div className="w-full bg-white/80 rounded-xl shadow p-3 md:p-4 flex flex-col gap-2 mt-2">
          <h3 className="text-cyan-700 font-bold mb-1 text-base md:text-lg">المنشورات الحديثة</h3>
          {Array.isArray(posts) && posts.length !== 0 ? (
            <ul className="flex flex-col gap-2">
              {posts?.map((post) => (
                <div
                  key={post._id}
                  style={{ width: "100%", cursor: "pointer" }}
                  className="CardBox bg-gradient-to-br from-white via-teal-50 to-cyan-100 rounded-2xl shadow-lg p-0 text-right border border-teal-200 hover:shadow-2xl transition-shadow duration-200 mb-0.5"
                >
                  <div className="flex justify-between items-center px-4 md:px-6 pt-3 pb-2 border-b bg-teal-50 rounded-t-2xl">
                    <Link href={`/Pages/${post?.user?._id}`} className="flex items-center justify-center gap-2">
                      <span className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 text-lg md:text-xl font-bold text-white shadow-md">
                        <span role="img" aria-label={post?.user?.username || ""} className="mb-2">{post?.user?.username?.[0] || "م"}</span>
                      </span>
                      <div>
                        <span className="chakra-heading font-bold text-teal-900 text-base md:text-lg">{post?.user?.username || "مستخدم مجهول"}</span>
                        <p className="text-xs font-semibold" style={{ color: '#319795' }}>
                          {post.createdAt ? new Date(post.createdAt).toLocaleString('ar-EG', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : "الآن"}
                        </p>
                      </div>
                    </Link>
                    <div>
                      <button type="button" className="chakra-button p-2 rounded-full hover:bg-cyan-100 focus:outline-none">
                        <span className="chakra-button__icon">
                          <svg stroke="gray" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" cursor="pointer" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <Link href={`/Pages/postDetails/${post._id}`}>
                    <div className="px-4 md:px-6 pb-0 pt-2">
                      <p className="text-base md:text-lg font-semibold mb-2 text-teal-800">{post.description}</p>
                    </div>
                    {post.image && (
                      <div className="w-full border-none">
                        <img
                          alt={post.image}
                          className="max-h-60 md:max-h-72 object-cover w-full border border-teal-200"
                          src={post.image.startsWith('http') ? post.image : `http://localhost:4000/${post.image}`}
                        />
                      </div>
                    )}
                  </Link>
                  <div className="flex justify-between gap-2 border-t pt-3 px-4 md:px-6 pb-4 bg-cyan-50 rounded-b-2xl">
                    <button type="button" className="chakra-button flex items-center gap-1 px-2 md:px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors text-xs md:text-base">
                      <span className="chakra-button__icon">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                      </span>
                      أعجبني
                    </button>
                    <button type="button" className="chakra-button flex items-center gap-1 px-2 md:px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors text-xs md:text-base">
                      <span className="chakra-button__icon">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1.277L7 21.766V18H4V8h12v8h-5.277L7 21.766V18H4V8z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path></svg>
                      </span>
                      تعليق (0)
                    </button>
                    <button type="button" className="chakra-button flex items-center gap-1 px-2 md:px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors text-xs md:text-base">
                      <span className="chakra-button__icon">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"></path></svg>
                      </span>
                      مشاركة
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-xs md:text-sm">لا توجد منشورات حديثة.</p>
              )}
        </div>
        <div className="w-full text-center mt-6">
          <Link href="/" className="text-cyan-700 hover:underline text-xs md:text-sm">العودة للصفحة الرئيسية</Link>
        </div>
        {/* Edit Modal */}
        {showEdit && (
          <div className="fixed inset-0 bg-black/40 z-30 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 w-full max-w-md relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl cursor-pointer" onClick={() => setShowEdit(false)} title="إغلاق"><FaTimes /></button>
              <h2 className="text-xl md:text-2xl font-bold text-teal-700 mb-4">تعديل الحساب</h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="profile_image" className="cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
                      {previewImg ? (
                        <img src={previewImg} alt="معاينة الصورة" width={80} height={80} className="object-cover rounded-full w-full h-full" />
                      ) : (
                        <FaUserCircle className="text-3xl md:text-4xl text-cyan-400" />
                      )}
                    </div>
                    <input type="file" id="profile_image" name="profile_image" accept="image/*" className="hidden" onChange={handleEditChange} />
                  </label>
                </div>
                <input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleEditChange}
                  className="border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
                  placeholder="اسم المستخدم"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
                  placeholder="البريد الإلكتروني"
                  required
                />
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleEditChange}
                  className="border rounded-lg text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
                  placeholder="نبذة عنك"
                  rows={3}
                />
                <button type="submit" className="bg-gradient-to-r from-teal-500 cursor-pointer via-cyan-400 to-teal-400 text-white font-bold rounded-full py-2 mt-2 hover:from-cyan-400 hover:to-teal-500 transition-colors text-base">حفظ التغييرات</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
