"use client";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaBookmark, FaRegFileImage, FaCheckCircle } from "react-icons/fa";

export default function SavedPage() {
const [removedItem, setRemovedItem] = useState(null);
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "منشور عن الذكاء الاصطناعي",
      description: "مقال رائع حول مستقبل الذكاء الاصطناعي في العالم العربي.",
      image: null,
      date: "2025-06-25 14:30",
    },
    {
      id: 2,
      title: "صورة ملهمة",
      description: "صورة جميلة للطبيعة في المغرب.",
      image: "/globe.svg",
      date: "2025-06-24 10:15",
    },
    {
      id: 3,
      title: "مقال عن التكنولوجيا",
      description: "مقال رائع حول التكنولوجيا في العالم العربي.",
      image: null,
      date: "2025-06-23 18:45",
    },
    {
      id: 4,
      title: "مقال عن الطبيعة",
      description: "مقال رائع حول الطبيعة في العالم العربي.",
      image: null,
      date: "2025-06-22 09:00",
    },
    {
      id: 5,
      title: "صورة ملهمة",
      description: "صورة جميلة للطبيعة في المغرب.",
      image: "/globe.svg",
      date: "2025-06-21 15:30",
    }
  ])
  const handleRemove = (id , number) => {
    setRemovedItem(id);
    setTimeout(() => {
      setSavedItems(prev => prev.filter(item => item.id !== id));
      setRemovedItem(null);
    }, 1000); // مجرد تأثير
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-cyan-100 via-white to-teal-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-6 border border-cyan-100 backdrop-blur-md flex flex-col gap-6 relative">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className=" fixed top-0 right-0 px-4 py-2 mt-6  bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow hover:from-cyan-400 hover:to-teal-500 transition-colors text-sm flex  gap-2"
          >
            <FaArrowRight /> الرئيسية
          </Link>
        </div>

        {/* <h2 className="text-2xl mt-10 font-extrabold text-teal-700 mb-2 flex items-center gap-2">
          <FaBookmark className="text-cyan-400" />
          المحفوظات ({savedItems.length})
        </h2> */}

        {savedItems.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-12">
            لا توجد عناصر محفوظة بعد.
          </div>
        ) : (
          <ul className="flex flex-col gap-4 mt-12">
            {savedItems.map((item) => (
              <li
                key={item.id}
                className="bg-gradient-to-br from-white via-teal-50 to-cyan-100 rounded-2xl shadow p-4 border border-teal-200 flex flex-col sm:flex-row items-center gap-4 hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-cyan-50 rounded-xl border border-cyan-100 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaRegFileImage className="text-cyan-200 text-4xl" />
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-1 text-right">
                  <h3 className="text-lg font-bold text-teal-800">
                    {item.title}
                  </h3>
                  <p className="text-cyan-900 text-sm mb-1">{item.description}</p>
                  <span className="text-xs text-cyan-500">{item.date}</span>
                </div>

                <button
                  disabled={removedItem === item.id}
                  onClick={() => handleRemove(item.id)}
                  className={`px-4 py-2 rounded-full font-bold shadow text-sm transition-all ${
                    removedItem === item.id
                      ? "bg-gray-200 text-teal-400 cursor-not-allowed flex items-center gap-2"
                      : "bg-gradient-to-r from-cyan-400 to-teal-400 text-white hover:from-teal-400 hover:to-cyan-400"
                  }`}
                >
                  {removedItem === item.id ? (
                    <>
                      <FaCheckCircle /> تمت الإزالة
                    </>
                  ) : (
                    "إزالة"
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
