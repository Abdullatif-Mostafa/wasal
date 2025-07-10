"use client";

import { addPostAsync, fetchPosts } from "@/RTK/Reducers/postSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaImage, FaSmile, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ onPost }) => {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Localloading, setLoading] = useState(false);
  const toastTimeout = useRef(null);
  const dispatch = useDispatch();
  const { user, token ,isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  }, []);
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [image]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  const handlePostSubmit = async () => {
    if (!isAuthenticated || !user?.token) {
      toast.error("يرجى تسجيل الدخول لنشر المحتوى", { rtl: true });
      return;
    }
    if (!postText && !image) {
      toast.error("يرجى إضافة نص أو صورة للمنشور", { rtl: true });
      return;
    }
    const formData = new FormData();
    formData.append("text", postText);
    if (image) formData.append("image", image);
    setLoading(true);
    dispatch(addPostAsync({ formData, token })).then((action) => {        
      if (addPostAsync.fulfilled.match(action)) {
        console.log("action.payload in create post", action.payload);
        const newPost = action.payload?.post;
        if (!newPost) {
          toast.error("حدث خطأ غير متوقع", { rtl: true });
          setLoading(false);
          return;
        }
        setPostText("");
        setImage(null);
        setPreview(null);
        setLoading(false);
        // onPost(newPost); // ✅ فقط post
        toast.success("تم نشر المنشور بنجاح!")
        // toastTimeout.current = setTimeout(() => {
        //   toast.dismiss();
        // }, 3000);
        dispatch(fetchPosts());
      } else {
        setLoading(false);
        toast.error(`فشل في نشر المنشور: ${action.error.message}`, { rtl: true });
      }
    });
  };
  
  useEffect(() => {
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, []);
  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-br from-cyan-50 via-white to-teal-100 rounded-2xl shadow-lg p-5 mb-0 mt-2.5 border border-cyan-200">
      <div style={{maxWidth:"99%"}} className="flex items-center gap-1 sm:gap-1 mb-1 ">
        {
          isAuthenticated ?
          <Link href={"/Pages/Account"}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
              <img src={user?.profileImage} alt={user?.username} width={40} height={40} className="object-cover rounded-full" />
            </div>
          </Link>
          :
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
           <img src="/file.svg" alt="صورة المستخدم" width={40} height={40} className="rounded-full w-10 h-10 object-cover border border-cyan-200"/>
          </div>
        }
        <input
          className="flex-1 px-4 py-1.5 rounded-full border border-cyan-200 bg-white/80 text-teal-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
          placeholder="بماذا تفكر اليوم؟"
          value={postText}
          onChange={e => setPostText(e.target.value)}
          maxLength={300}
        />
      </div>
      {preview && (
        <div className="mb-3">
          <Image src={preview} alt="معاينة الصورة" width={400} height={256} className="rounded-lg max-h-64 object-cover border border-cyan-200 mx-auto" />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 mt-2">
        <label className="flex items-center gap-2 cursor-pointer text-cyan-700 hover:text-teal-600 transition">
          <FaImage className="w-5 h-5" />
          <span className="text-sm font-semibold">إضافة صورة</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
        <button
          className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 hover:from-cyan-400 hover:to-teal-500 text-white font-bold rounded-full shadow transition-colors duration-200 disabled:opacity-60"
          onClick={handlePostSubmit}
          disabled={Localloading || (!postText && !image)}
        >
          <FaPaperPlane className="w-4 h-4 cursor-pointer" />
          {Localloading ? "جاري النشر..." : "نشر"}
        </button>
      </div>
      {/* <ToastContainer theme="colored" autoClose={2500} pauseOnHover={false} position="top-center" /> */}
    </div>
  );
};
export default CreatePost;
