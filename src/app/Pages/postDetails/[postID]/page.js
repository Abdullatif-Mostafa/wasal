// Post details page
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

// import Image from "next/image";
// import Posts from "@/app/Component/Posts";
import { fetchPostById } from "@/RTK/Reducers/postSlice";

const PostPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // Get postId from the dynamic path (e.g. /Pages/Post/123)
  const pathname = usePathname();
  // Extract the last segment as postId
  const pathSegments = pathname.split("/");
  // console.log("pathSegment ",pathSegments)
  const postId = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
  const { selectedPost, loading, error } = useSelector(state => state.posts);
  console.log("postId ", selectedPost, "loading ", loading, "error ", error);
  const [openMenuId, setOpenMenuId] = useState(null);
  const {user }=useSelector((state) => state.auth);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId]);
  if (loading) return <div className="text-center text-teal-600 font-bold text-xl mt-10">جاري التحميل...</div>;
  if (error) return <div className="text-center text-red-600 font-bold text-xl mt-10">{error}</div>;
  if (!selectedPost) return <div className="text-center text-gray-500 font-bold text-lg mt-10">لا يوجد منشور</div>;

  return (
    <>
      <div style={{ height: "100vh", }} className="bg-gradient-to-br from-cyan-100 via-white to-teal-100 flex w-100 h-100 sm:w-full items-center justify-center">
        <div className="flex mx-auto w-full max-w-xl  space-y-6 mt-10">
          <div
            style={{ width: "100%", cursor: "pointer" }}
            className="CardBox bg-gradient-to-br from-white via-teal-50 to-cyan-100 rounded-2xl shadow-lg p-0 text-right border border-teal-200 hover:shadow-2xl transition-shadow duration-200 mb-0.5"
          // onClick={() => router.push(`/Pages/Post?id=${selectedPost.id}`)}
          >
            <div className="flex justify-between items-center px-6 pt-3 pb-2 border-b bg-teal-50 rounded-t-2xl">
              <div className="flex items-center justify-center gap-2">
                <span className="w-12 h-12 flex justify-center items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400  text-xl font-bold text-white shadow-md">
                  <span role="img" aria-label={selectedPost?.user?.username || "مستخدم مجهول"} className="mb-2">{selectedPost.user?.username?.[0] || "م"}</span>
                </span>
                <div>
                  <span className="chakra-heading font-bold text-teal-900 text-lg">{selectedPost.user?.username || "مستخدم مجهول"}</span>
                  <p className="text-xs font-semibold" style={{ color: '#319795' }}>{selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleString('ar-EG', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : "الآن"}</p>
                </div>
              </div>
              <div>
                {/* <button type="button" className="chakra-button p-2 rounded-full hover:bg-cyan-100 focus:outline-none">
                  <span className="chakra-button__icon">
                    <svg stroke="gray" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" cursor="pointer" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </span>
                </button> */}
                <div className="relative">
                  <button
                    type="button"
                    className="chakra-button p-2 rounded-full hover:bg-cyan-100 focus:outline-none"
                    onClick={() => setOpenMenuId(openMenuId === selectedPost._id ? null : selectedPost._id)}
                  // onClick={()=>{console.log(" user id from modal ",selectedPost.user._id)}}
                  >
                    <span className="chakra-button__icon">
                      <svg stroke="gray" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" cursor="pointer" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </span>
                  </button>
                  {openMenuId === selectedPost._id && (
                    <div className="absolute left-0  top-10 z-30 min-w-[200px] bg-gradient-to-br from-cyan-50 to-teal-100 border-r border-teal-200 border border-cyan-200 dark:border-cyan-700 rounded-xl shadow-lg p-3 flex flex-col gap-2 animate-fade-in">
                      <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        حفظ المنشور
                      </button>
                      {selectedPost.image && (
                        <a
                          href={selectedPost.image.startsWith('http') ? selectedPost.image : `http://localhost:4000/${selectedPost.image}`}
                          download
                          className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition"
                        >
                          <svg className="w-5 h-5 font-bold text-teal-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                          تنزيل الصورة
                        </a>
                      )}
                      <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 00-6 0v4a3 3 0 006 0V8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6a7 7 0 01-14 0V8" /></svg>
                        مشاركة المنشور
                      </button>

                      <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                        إخفاء المنشور
                      </button>

                      <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414M12 8v4m0 4h.01" /></svg>
                        الإبلاغ عن المنشور
                      </button>

                      {/* حذف المنشور يظهر فقط لصاحب المنشور */}
                      {selectedPost.user && selectedPost.user._id === user._id && (
                        <button className="flex items-center  cursor-pointer gap-2 px-3 py-2  bg-white rounded-lg shadow bg:red-100 hover:bg-red-50 text-red-600 dark:text-red-400">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          حذف المنشور
                        </button>
                      )}
                      {/* <div className="border-t border-cyan-100 dark:border-cyan-700 my-2"></div> */}
                      {/* <div className="px-3 text-xs text-cyan-700 dark:text-cyan-200">
                      <div>تاريخ النشر: {selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleString('ar-EG', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : "الآن"}</div>
                      <div>معرف المنشور: {selectedPost._id}</div>
                      <div>اسم المستخدم: {selectedPost?.user?.username || "مستخدم مجهول"}</div>
                    </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="px-6 pb-0 pt-2">
                <p className="text-lg font-semibold mb-2 text-teal-800">{selectedPost.title}</p>
                <p className="text-gray-700 mb-2 break-words leading-relaxed">{selectedPost.description || "لا يوجد محتوى"}</p>
              </div>
              {selectedPost.image && (
                <div className="w-full border-none">
                  <img
                    alt={selectedPost.image}
                    className="max-h-75 object-cover w-full border border-teal-200"
                    src={selectedPost.image.startsWith('http') ? selectedPost.image : `http://localhost:4000/${selectedPost.image}`}
                  // src={`http://localhost:4000/${selectedPost.image}`}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between gap-2 border-t pt-3 px-6 pb-4 bg-cyan-50 rounded-b-2xl">
              <button type="button" className="chakra-button flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors">
                <span className="chakra-button__icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                </span>
                أعجبني
              </button>
              <button type="button" className="chakra-button flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors">
                <span className="chakra-button__icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1.277L7 21.766V18H4V8h12v8h-5.277L7 21.766V18H4V8z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path></svg>
                </span>
                تعليق (0)
              </button>
              <button type="button" className="chakra-button flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors">
                <span className="chakra-button__icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"></path></svg>
                </span>
                مشاركة
              </button>
            </div>
          </div>
        </div>
        {/* <h1>hello</h1> */}
      </div>    </>
  );
};

export default PostPage;
