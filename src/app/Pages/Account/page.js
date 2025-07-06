"use client";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle, FaEnvelope, FaEdit, FaSignOutAlt, FaCalendarAlt, FaUserFriends, FaRegImage, FaRegCommentDots, FaMoon, FaSun, FaCog, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/RTK/Reducers/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { editPostAsync, fetchPostById, fetchPosts, fetchPostsByUserId, toggleLikeOnPost, updateLikesInPosts } from "@/RTK/Reducers/postSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import PostSkeleton from "@/app/Component/Skeletons/PostSkeleton";
import { deleteCommentAsync, editCommentAsync, getCommentsForPost, submitComment } from "@/RTK/Reducers/commentSlice";

export default function Account() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { posts } = useSelector((state) => state.posts)
  console.log("posts in account page", posts);
  const router = useRouter();
  const [editModal, setEditModal] = useState({ open: false, post: null });
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({ ...user });
  const [openMenuId, setOpenMenuId] = useState(false);
  const [previewImg, setPreviewImg] = useState(user?.profileImage);
  const [editCommentModal, setEditCommentModal] = useState({ open: false, comment: null, postId: null });
  const [commentText, setCommentText] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const { loading: commentsLoading, error: commentsError, commentsMap } = useSelector((state) => state.comments);
  const [theme, setTheme] = useState("light");
  const API_URL =process.env.REACT_APP_API_URL ||"https://wasal-api-production.up.railway.app" ;
  const userId = user?._id;
  console.log("userId ", userId);
  // console.log("posts by user", selectedPost);
  useEffect(() => {
      dispatch(fetchPostsByUserId(userId));
  }, [dispatch, userId]);

  const stats = {
    posts: "",
    comments: "",
    friends: "",
  };
  const recentPosts = [
    // { id: 1, title: "أول منشور", date: "2024-06-01", snippet: "هذا مثال لمحتوى منشور حديث..." },
    // { id: 2, title: "ثاني منشور", date: "2024-05-28", snippet: "منشور آخر للتجربة وعرض التصميم..." },
  ];

  // Logout logic
  const handleLogout = async () => {
    const result = await Swal.fire({
      // title: 'تأكيد تسجيل الخروج',
      text: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#38bdf8',
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      customClass: { popup: 'rounded-2xl w-[90%] sm:w-[400px]' },
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    });
    if (result.isConfirmed) {
      dispatch(logout());
      router.push("/");
    }
  };

  // Edit modal logic
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files && files[0]) {
      setPreviewImg(URL.createObjectURL(files[0]));
      setEditData({ ...editData, profileImage: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال البيانات إلى الخادم
    // على سبيل المثال، يمكنك استخدام fetch أو axios لإرسال البيانات
    toast.success("تم تحديث الحساب بنجاح!");
    setShowEdit(false);
  };
  const handleSubmitComment = (postId) => {
    if (!commentText.trim()) return;
    dispatch(submitComment({ postId, content: commentText }))
      .unwrap()
      .then(() => {
        toast.success("تم إضافة التعليق بنجاح");
        setCommentText("");
        // setActiveCommentPostId(null);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          (typeof err === 'string' ? err : 'حدث خطأ أثناء إضافة التعليق')
        );
      });
  };
  const handleEditComment = (commentId, content, postId) => {
    setEditCommentModal({ open: true, comment: { _id: commentId, content }, postId });
    setEditCommentText(content);
  };
  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();
    if (!editCommentText.trim()) {
      toast.error("لا يمكن إرسال تعليق فارغ");
      return;
    }
    try {
      await dispatch(editCommentAsync({ commentId: editCommentModal.comment._id, content: editCommentText, postId: editCommentModal.postId })).unwrap();
      toast.success("تم تعديل التعليق بنجاح");
      setEditCommentModal({ open: false, comment: null, postId: null });
      setEditCommentText("");
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'حدث خطأ أثناء تعديل التعليق');
    }
  };
  const handleDeleteComment = (commentId, postId) => {
    dispatch(deleteCommentAsync({ commentId, postId }));
    toast.success("تم حذف التعليق بنجاح");
  }
  const fetchCommentsForPost = (postId) => {
    dispatch(getCommentsForPost(postId));
  }
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
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deletePostAsync(postId)).unwrap();
        toast.success("تم حذف المنشور بنجاح!");
        // setTimeout(() => { dispatch(fetchPosts()); }
        // , 1000);
        dispatch(fetchPosts());
      } catch (err) {
        toast.error("فشل في حذف المنشور");
      }
    }
  };
  const handleLike = (post) => {
    console.log("post in the handleLike ", post); 
    if (!isAuthenticated && !user) {
      toast.error('يجب تسجيل الدخول للإعجاب بالمنشور');
      return;
    }
    // 1. حدّد الوضع الجديد
    const alreadyLiked = post.likes.some(l => l._id === user._id);
    const newLikes = alreadyLiked ? post.likes.filter(l => l._id !== user._id)
      : [...post.likes, { _id: user._id, username: user.username }];
    // 2. Optimistically update UI
    dispatch(updateLikesInPosts({ postId: post._id, likes: newLikes }));
    // 3. ثم ابعث الطلب
    dispatch(toggleLikeOnPost({ postId: post._id }))
      .unwrap()
      .catch(err => {
        // 4. rollback on error
        dispatch(updateLikesInPosts({ postId: post._id, likes: post.likes }));
        toast.error("فشل في الإعجاب");
      });
  };
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif] py-10 ${theme === "dark" ? "dark" : ""}`}>
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-8 border border-cyan-100 backdrop-blur-md flex flex-col items-center gap-6 relative">
        {/* Settings Dropdown */}
        <div className="absolute top-4 mt-3 right-4">
          <Link href="/" className=" justify-start px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex items-center gap-2">
            <FaArrowRight /> الرئيسية
          </Link>
        </div>
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-6xl text-white shadow-lg overflow-hidden">
            {user?.profileImage ? (
              <img src={user?.profileImage} alt="الصورة الشخصية" width={112} height={112} className="object-cover rounded-full" />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-teal-700 mt-2">{user?.username}</h2>
          <p className="text-cyan-700 text-sm flex items-center gap-2"><FaEnvelope /> {user?.email}</p>
          <p className="text-gray-600 text-sm mt-1">عضو منذ: {user?.createdAt}</p>
        </div>
        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-4 mt-2">
          <div className="bg-cyan-50 rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-teal-600">{posts?.length}</span>
            <span className="text-gray-500 text-xs mt-1">المنشورات</span>
          </div>
          <div className="bg-cyan-50 rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-teal-600">{stats.comments || 0}</span>
            <span className="text-gray-500 text-xs mt-1">التعليقات</span>
          </div>
          <div className="bg-cyan-50 rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-teal-600">{stats.friends || 0}</span>
            <span className="text-gray-500 text-xs mt-1 flex items-center gap-1"><FaUserFriends /> الأصدقاء</span>
          </div>
        </div>
        {/* Bio */}
        <div className="w-full bg-cyan-50 rounded-xl shadow p-4 flex flex-col gap-2">
          <h3 className="text-cyan-700 font-bold mb-1 flex items-center gap-2"><FaUserCircle className="text-cyan-400" /> النبذة الشخصية</h3>
          <p className="text-gray-700 text-sm">{user?.bio || "لا يوجد نبذة شخصية."}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white font-bold rounded-full shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-base sm:text-lg w-full sm:w-auto"
            onClick={() => setShowEdit(true)}
            title="تعديل الحساب"
          >
            <FaEdit className="text-base sm:text-lg" /> تعديل الحساب
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-red-500 via-pink-400 to-red-400 text-white font-bold rounded-full shadow hover:from-pink-400 hover:to-red-500 transition-colors text-base sm:text-lg w-full sm:w-auto"
            onClick={handleLogout}
            title="تسجيل الخروج"
          >
            <FaSignOutAlt className="text-base sm:text-lg" /> تسجيل الخروج
          </button>
        </div>

        {/* Recent Posts */}
        <div className="w-full bg-white/80 rounded-xl shadow p-4 flex flex-col gap-2 mt-2">
          <h3 className="text-cyan-700 font-bold mb-1">أحدث المنشورات</h3>
          {Array.isArray(posts) && posts.length !== 0 ? (
            <ul className="flex flex-col gap-2">
              {posts?.map((post) => {
                return (
                  <div
                    key={post._id}
                    style={{ width: "100%", cursor: "pointer" }}
                    className="relative bg-gradient-to-br from-white via-teal-50 to-cyan-100 rounded-2xl shadow-lg p-0 text-right border border-teal-200 hover:shadow-2xl transition-shadow duration-200 mb-0.5"
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
                        >
                          <span className="chakra-button__icon">
                            <svg stroke="gray" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" cursor="pointer" strokeLinejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                          </span>
                        </button>
                        {openMenuId === post?._id && (
                          <div className="absolute left-0  top-10 z-30 min-w-[200px] bg-gradient-to-br from-cyan-50 to-teal-100 border border-cyan-200 rounded-xl shadow-lg p-3 flex flex-col gap-1 animate-fade-in">
                            <button onClick={() => { toast.success("تم حفظ المنشور بنجاح!"); setOpenMenuId(false); }} className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition">
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
                            {post?.user?._id !== user?._id &&
                              (
                                <button className="flex items-center gap-2 bg-white cursor-pointer rounded-lg p-2 shadow hover:bg-cyan-50 text-cyan-900 font-semibold transition" onClick={() => { toast.success("تم الإبلاغ عن المنشور!"); setOpenMenuId(false); }}>
                                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414M12 8v4m0 4h.01" /></svg>
                                  الإبلاغ عن المنشور
                                </button>
                              )
                            }

                            {post?.user?._id === user?._id && (

                              <>
                                <button
                                  onClick={() => {
                                    // استدعاء دالة تعديل البوست هنا مثلاً: openEditModal(post)
                                    console.log("تعديل البوست", post._id);
                                    setEditModal({ open: true, post }); // ✅ فتح المودال مع بيانات البوست
                                    setOpenMenuId(false);
                                  }}
                                  className="flex items-center cursor-pointer gap-2 px-3 py-2 bg-white rounded-lg shadow hover:bg-yellow-50 text-yellow-600"
                                >
                                  <svg
                                    className="w-5 h-5 text-yellow-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16 5L19 8"
                                    />
                                  </svg>
                                  تعديل المنشور
                                </button>
                                <button onClick={() => { handleDeletePost(post?._id); setOpenMenuId(false); }} className="flex items-center  cursor-pointer gap-2 px-3 py-2  bg-white rounded-lg shadow bg:red-100 hover:bg-red-50 text-red-600">
                                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                  حذف المنشور
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <Link href={`/Pages/postDetails/${post._id}`}>
                      <div className="px-6 pb-0 pt-2">
                        <p className="text-lg font-semibold mb-2 text-teal-800">{post.description || "لا يوجد محتوى"}</p>
                        {/* <p className="text-gray-700 mb-2 break-words leading-relaxed">{post.description || "لا يوجد محتوى"}</p> */}
                      </div>
                      {post.image && (
                        <div className="w-full border-none">
                          <img
                            alt={post.image}
                            className="max-h-75 object-cover w-full border border-teal-200"
                            src={post.image.startsWith('http') ? post.image : `${API_URL}/${post.image}`}
                            // src={`http://localhost:4000/${post.image}`}
                          />
                        </div>
                      )}
                    </Link>
                    <div className="">
                      {/*اعجاب  */}
                   <div className="flex justify-between gap-0 border-t pt-3 px-6 pb-4 bg-cyan-50 rounded-b-2xl">
                        <div className="relative group">
                          <button
                            href="#"
                            type="button"
                            onClick={() => handleLike(post)}
                            className={`${post.likes.some(like => like._id === user?._id)
                              ? "text-red-500"
                              : "text-cyan-700"
                              } flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold cursor-pointer transition-colors`}
                          >
                            <span className="chakra-button__icon">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1.2em"
                                width="1.2em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
                              </svg>
                            </span>
                            أعجبني ({post?.likes?.length || 0})
                            {/* {console.log("post.likes",post.likes.some(like => like._id === user?._id))} */}
                          </button>
                          <div className="absolute  top-8 z-40 min-w-[180px] bg-white border border-cyan-200 rounded-xl shadow-lg p-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
                            <div>
                              {post?.likes?.length > 0 ? (
                                post?.likes?.map((like) => (
                                  <div key={like._id} className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-cyan-100 text-cyan-700 font-semibold cursor-pointer transition-colors">
                                    <span className="w-6 h-6 flex justify-center items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 text-white font-bold">
                                      {like.username?.[0] || "م"} 
                                      {/* { console.log("llike details",like) } */}
                                    </span>
                                    <span className="text-sm">{like.username || "مستخدم مجهول"}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-gray-500 text-sm">
                                  لا يوجد إعجابات بعد
                                </div>
                              )
                              }
                            </div>
                          </div>
                        </div>
                        {/* تعليق  */}
                        <button
                          type="button"
                          onClick={() => { setActiveCommentPostId(activeCommentPostId === post._id ? null : post._id), fetchCommentsForPost(post?._id) }}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors"
                        >
                          <span className="chakra-button__icon">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1.277L7 21.766V18H4V8h12v8h-5.277L7 21.766V18H4V8z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path></svg>
                          </span>
                          تعليق ({commentsMap[post._id]?.length ?? post?.comments?.length ?? 0})
                        </button>
                        {/*  مشاركة */}
                        <div className="relative group">
                          <button
                            type="button"
                            className="flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-cyan-100 font-semibold text-cyan-700 cursor-pointer transition-colors"
                          >
                            <span className="chakra-button__icon">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"></path></svg>
                            </span>
                            مشاركة
                          </button>
                          <div className="absolute left-0 top-8 z-40 min-w-[180px] bg-white border border-cyan-200 rounded-xl shadow-lg p-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
                            <button onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/Pages/postDetails/' + post._id)}`, '_blank'); setOpenMenuId(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-100 text-cyan-700">
                              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                              فيسبوك
                            </button>
                            <button onClick={() => { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.origin + '/Pages/postDetails/' + post._id)}`, '_blank'); setOpenMenuId(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-100 text-green-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.519-5.688-1.515l-6.305 1.721zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.64-1.026-5.122-2.891-6.989-1.863-1.866-4.354-2.899-6.991-2.9-5.451 0-9.887 4.434-9.889 9.884-.001 1.956.572 3.86 1.661 5.499l-.999 3.637 3.828-1.048zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
                              واتساب
                            </button>
                            <button onClick={() => { window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.origin + '/Pages/postDetails/' + post._id)}`, '_blank'); setOpenMenuId(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-100 text-pink-500">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 8.332 2 8.741 2 12c0 3.259.012 3.668.07 4.948.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-4.948 0-3.259-.012-3.668-.07-4.948-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
                              انستغرام
                            </button>

                            <button onClick={() => { navigator.clipboard.writeText(window.location.origin + '/Pages/postDetails/' + post._id); setOpenMenuId(false); toast.success('تم نسخ الرابط!'); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-100 text-cyan-700">
                              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                              نسخ الرابط
                            </button>
                          </div>
                        </div>
                   </div>
                  
                    </div>
                    {/* حقل التعليق وعرض التعليقات */}
                    {activeCommentPostId === post._id && (
                      <div className="px-6 mt-2 mb-4">
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment(post._id); }} className="flex flex-col gap-2">
                          <input
                            type="text"
                            required
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="اكتب تعليقك هنا..."
                            className="border border-teal-200 rounded-lg text-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                          />
                          <button type="submit" className="self-start bg-teal-500 text-white px-4 py-1 rounded-lg hover:bg-teal-600">
                            {commentsLoading ? 'جار التحميل...' : 'نشر التعليق '}
                          </button>
                        </form>
                        {/* عرض التعليقات */}
                        {(commentsMap[post._id] || []).map((comment) => (
                          <div key={comment._id} className="flex w-full items-center gap-1 mt-3">
                            {/* صورة المستخدم */}
                            <Link href={`/Pages/${comment?.user?._id}`} className="w-13 h-13 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-white font-bold flex items-center justify-center shadow">
                              {/* {comment?.user?.username?.[0] || "م"} */}
                              <img src={comment.user.profileImage} alt="user" className="w-13 h-13 rounded-full object-cover shadow" />
                            </Link>
                            <div style={{ maxWidth: "91%", minHeight: "20px" }} className=" bg-cyan-100 px-4 py-2 rounded-xl text-sm text-right w-full relative">
                              <div className="font-bold text-teal-800 mb-1">{comment?.user?.username || "مستخدم"}</div>
                              <div className=" text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                                {comment?.content}
                              </div>
                              {/* أزرار الحذف والتعديل - تظهر فقط إذا كان صاحب التعليق */}
                              {comment?.user?._id === user?._id && (
                                <div className="absolute top-2 left-2 flex gap-2">
                                  <button
                                    onClick={() => { handleEditComment(comment._id, comment.content, post._id) }}
                                    className="text-yellow-600 hover:text-yellow-800 text-xs font-semibold"
                                    title="تعديل التعليق"
                                  >
                                    ✏️ تعديل
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(comment._id, post._id)}
                                    className="text-red-600 hover:text-red-800 text-xs font-semibold"
                                    title="حذف التعليق"
                                  >
                                    🗑️ حذف
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {editCommentModal.open && (
                          <div className="absolute flex items-end justify-center inset-0 z-500 bg-dark-40">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                              <button
                                onClick={() => setEditCommentModal({ open: false, comment: null, postId: null })}
                                className="absolute left-4 mb-2 top-0 text-gray-400 hover:text-red-500 text-2xl"
                              >
                                ×
                              </button>
                              {/* <h2 className="text-xl font-bold text-teal-700 mb-4">تعديل التعليق</h2> */}
                              <form
                                onSubmit={handleEditCommentSubmit}
                                className="flex flex-col gap-4"
                              >
                                <input
                                  type="text"
                                  name="editComment"
                                  value={editCommentText}
                                  onChange={e => setEditCommentText(e.target.value)}
                                  className="border border-cyan-200 bg-cyan-50 rounded-lg px-4 py-2 focus:outline-none text-gray-600 focus:ring-2 focus:ring-cyan-400 min-h-[50px]"
                                />
                                <div className="flex justify-between gap-2 ">
                                  <button onClick={() => setEditCommentModal({ open: false, comment: null, postId: null })}
                                    className="text-white w-sm bg-gray-600  rounded-full font-bold shadow hover:from-gray-400 hover:to-gray-500 text-sm transition-colors py-2">الغاء</button>
                                  <button
                                    type="submit"
                                    className="bg-gradient-to-r w-xs from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 text-sm transition-colors py-2"
                                  >
                                    تعديل
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {editModal.open && editModal.post?._id === post._id && (
                      <div className="absolute flex items-center justify-center inset-0 z-500 bg-dark-40">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                          <button onClick={() => setEditModal({ open: false, post: null })} className="absolute left-4 top-4 text-gray-400 hover:text-red-500 text-2xl">×</button>
                          <h2 className="text-xl font-bold text-teal-700 mb-4">تعديل المنشور</h2>
                          <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = { ...editModal.post, description: e.target.description.value };
                            await dispatch(editPostAsync(formData));
                            toast.success("تم تعديل المنشور بنجاح!");
                            setEditModal({ open: false, post: null });
                            dispatch(fetchPostById(post._id));
                            // dispatch(fetchPosts());
                          }} className="flex flex-col gap-4">
                            <textarea
                              name="description"
                              defaultValue={editModal.post.description}
                              className="border border-cyan-200 bg-cyan-50 rounded-lg px-4 py-2 focus:outline-none text-gray-600 focus:ring-2 focus:ring-cyan-400 min-h-[100px]"
                            />
                            <button type="submit" className=" bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 font-size-md hover:to-teal-500 text-sm  transition-colors py-2">حفظ التعديلات</button>
                          </form>
                        </div>
                      </div>
                    )}

                  </div>
                )
              })}
            </ul>
          ) : (
            <PostSkeleton count={5} />
            // <p className="text-gray-400 text-xs md:text-sm">لا توجد منشورات حديثة.</p>
          )}
        </div>
        <div className="w-full text-center mt-6">
          <Link href="/" className="text-cyan-700 hover:underline text-sm">العودة للصفحة الرئيسية</Link>
        </div>
        {/* Edit Modal */}
        {showEdit && (
          <div style={{ backgroundColor: "transparent", maxHeight: "100vh", width: "100%" }} className="fixed top-5 flex items-center justify-center  inset-0 z-40">
            <div className="inset-5 w-sm animate-fade-in">
              <div className="bg-white w-full rounded-2xl shadow-2xl p-8 relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl cursor-pointer" onClick={() => setShowEdit(false)} title="إغلاق"><FaTimes /></button>
                <h2 className="text-2xl font-bold text-teal-700 mb-4">تعديل الحساب</h2>
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
                        {previewImg ? (
                          <img src={previewImg} alt="معاينة الصورة" width={80} height={80} className="object-cover rounded-full" />
                        ) : (
                          <FaUserCircle className="text-4xl text-cyan-400" />
                        )}
                      </div>
                      <input type="file" id="profileImage" name="profileImage" accept="image/*" className="hidden" onChange={handleEditChange} />
                    </label>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={editData?.username}
                    onChange={handleEditChange}
                    className="border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="اسم المستخدم"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className="border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="البريد الإلكتروني"
                    required
                  />
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    className="border rounded-lg text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="نبذة عنك"
                    rows={3}
                  />
                  <button type="submit" className="bg-gradient-to-r from-teal-500 cursor-pointer via-cyan-400 to-teal-400 text-white font-bold rounded-full py-2 mt-2 hover:from-cyan-400 hover:to-teal-500 transition-colors">حفظ التغييرات</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
