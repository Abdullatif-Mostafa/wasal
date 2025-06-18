// Posts.js
"use client";
import { deletePostAsync, fetchPosts } from "@/RTK/Reducers/postSlice";
import Image from "next/image";
// import EnhancedCreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from 'sweetalert2';
import toast, { Toaster } from "react-hot-toast";

const Posts = ({ newPost }) => {
  const [data, setData] = useState([]);
  const [LocalLoading, setLoading] = useState(true);
  const [Localerror, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { posts, loading, error } = useSelector((state) => state?.posts);
  const { user } = useSelector((state) => state.auth);
  console.log(" user in the posts page ", user)
  console.log("Posts from Redux type of ------ ", posts.posts);
  useEffect(() => {
      dispatch(fetchPosts());
  }, [dispatch]);
  const allPosts = Array.isArray(posts.posts) ? [...posts.posts] : [];
  if(newPost && (!allPosts.length || allPosts[0]?.id !== newPost.id)) {
    allPosts.unshift(newPost);
  }
  const handleSavePost = () => {
    toast.success("تم حفظ المنشور بنجاح!");
  };
  
  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      text: 'هل أنت متأكد من حذف المنشور؟',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#38bdf8',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      reverseButtons: true,
      customClass: {
        popup: 'w-100px  rounded-xl p-6 shadow-lg',
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-500',
        title: 'text-lg font-bold text-gray-800 text-center',
        actions: 'flex flex-row-reverse gap-2 justify-center',
        content: 'text-gray-700 text-sm text-center',
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    })
    if (result.isConfirmed) {
      toast.success("تم حذف المنشور بنجاح!");
      dispatch(deletePostAsync(postId))

      dispatch(fetchPosts());
    }
  };
  if (loading) return <div style={{ height: "100vh" }} className="w-full h-full text-center text-teal-600 font-bold text-xl rounded-lg  shadow-md mt-7">جاري تحميل المنشورات...</div>;
  if (error) return <div style={{ height: "100vh" }} className="w-full h-full  text-center text-red-600 font-bold text-xl  rounded-lg p-6 shadow-md mt-7">{error}</div>;
  if (!allPosts.length) return <div style={{ height: "100vh" }} className="w-full h-full text-center text-teal-600 font-bold text-lg rounded-lg p-6 shadow-md mt-7">لا توجد منشورات</div>;
  return (
    <div className="flex lg:w-1/1 md:w-2/3 sm:w-full items-center gap-0">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div style={{ height: "100vh" }} className="mx-auto w-full  max-w-xl space-y-6">
        {allPosts.map((post) => (
          <div
            key={post._id}
            style={{ width: "100%", cursor: "pointer" }}
            className="CardBox bg-gradient-to-br from-white via-teal-50 to-cyan-100 rounded-2xl shadow-lg p-0 text-right border border-teal-200 hover:shadow-2xl transition-shadow duration-200 mb-0.5"
          // onClick={() => router.push(`/Pages/Post?id=${post.id}`)}
          >
            <div className="flex justify-between items-center px-6 pt-3 pb-2 border-b bg-teal-50 rounded-t-2xl">
              <Link href={`/Pages/${post?.user?._id}`} className="flex items-center justify-center gap-2">
                <span className="w-12 h-12 flex justify-center items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400  text-xl font-bold text-white shadow-md">
                  <span role="img" aria-label={post?.user?.username || ""} className="mb-2">{post?.user?.username?.[0] || "م"}</span>
                </span>
                <div>
                  <span className="chakra-heading font-bold text-teal-900 text-lg">{post?.user?.username || "مستخدم مجهول"}</span>
                  <p className="text-xs f font-semibold" style={{ color: '#319795' }}>{post.createdAt ? new Date(post.createdAt).toLocaleString('ar-EG', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : "الآن"}</p>
                </div>
              </Link>
              <div className="relative">
                <button
                  type="button"
                  className="chakra-button p-2 rounded-full hover:bg-cyan-100 focus:outline-none"
                  onClick={() => setOpenMenuId(openMenuId === post._id ? null : post._id)}
                // onClick={()=>{console.log(" user id from modal ",post.user._id)}}
                >
                  <span className="chakra-button__icon">
                    <svg stroke="gray" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" cursor="pointer" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </span>
                </button>
                {openMenuId === post?._id && (
                  <div className="absolute left-0  top-10 z-30 min-w-[200px] bg-gradient-to-br from-cyan-50 to-teal-100 border border-cyan-200 rounded-xl shadow-lg p-3 flex flex-col gap-1 animate-fade-in">
                    <button onClick={()=>{ toast.success("تم حفظ المنشور بنجاح!"); setOpenMenuId(false); }} className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      حفظ المنشور
                    </button>
                    {post.image && (
                      <a
                        href={post.image.startsWith('http') ? post.image : `http://localhost:4000/${post.image}`}
                        download
                        className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition"
                        onClick={() => { toast.success("تم تنزيل الصورة بنجاح!"); setOpenMenuId(false); }}
                      >
                        <svg className="w-5 h-5 font-bold text-teal-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        تنزيل الصورة
                      </a>
                    )}
                    <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition" onClick={() => { toast.success("تمت مشاركة المنشور!"); setOpenMenuId(false); }}>
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 00-6 0v4a3 3 0 006 0V8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6a7 7 0 01-14 0V8" /></svg>
                      مشاركة المنشور
                    </button>
                    <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition" onClick={() => { toast.success("تم إخفاء المنشور!"); setOpenMenuId(false); }}>
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                      إخفاء المنشور
                    </button>
                    <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition" onClick={() => { toast.success("تم الإبلاغ عن المنشور!"); setOpenMenuId(false); }}>
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414M12 8v4m0 4h.01" /></svg>
                      الإبلاغ عن المنشور
                    </button>
                    { post?.user?._id === user?._id && (
                      <button onClick={() => { handleDeletePost(post?._id); setOpenMenuId(false); }} className="flex items-center  cursor-pointer gap-2 px-3 py-2  bg-white rounded-lg shadow bg:red-100 hover:bg-red-50 text-red-600">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        حذف المنشور
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Link href={`/Pages/postDetails/${post._id}`}>
              <div className="px-6 pb-0 pt-2">
                <p className="text-lg font-semibold mb-2 text-teal-800">{post.description}</p>
                {/* <p className="text-gray-700 mb-2 break-words leading-relaxed">{post.description || "لا يوجد محتوى"}</p> */}
              </div>
              {post.image && (
                <div className="w-full border-none">
                  <img
                    alt={post.image}
                    className="max-h-75 object-cover w-full border border-teal-200"
                    src={post.image.startsWith('http') ? post.image : `http://localhost:4000/${post.image}`}
                  // src={`http://localhost:4000/${post.image}`}
                  />
                </div>
              )}
            </Link>
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
        ))}
      </div>
    </div>
  );
};

export default Posts;
