"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import RightAside from "../../Component/RightAside";
import LeftAside from "../../Component/LeftAside";
import { useSelector } from "react-redux";

const SOCKET_URL = "http://localhost:4000";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  console.log("user in chat page", user)
  // Assuming you have a user state or context
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socketRef.current.on("connect", () => setIsConnected(true));
    socketRef.current.on("disconnect", () => setIsConnected(false));
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = {
      text: input,
      user: user.username || "مستخدم مجهول",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    socketRef.current.emit("chat message", msg);
    socketRef.current.emit(" typing", { user: msg.user });
    setInput("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 font-[Ruboto,sans-serif]">
      <div className="flex w-full max-w-screen-2xl mx-auto">
        <div className="hidden lg:block bg-[#f0f4f8] border-l border-[#e0e7ef] sticky top-0 h-[90vh]">
          <RightAside chatMode />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <div className="flex flex-col h-[80vh] w-full max-w-2xl mx-auto border rounded-2xl shadow-2xl bg-gradient-to-br from-cyan-100 via-teal-200 to-cyan-300 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900 p-4 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-extrabold text-teal-700 dark:text-cyan-200 flex items-center gap-2">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v-6m0 0l-3 3m3-3l3 3" /></svg>
                غرفة الدردشة
              </h2>
              <span className={`text-xs font-bold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>{isConnected ? 'متصل' : 'غير متصل'}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                className="flex-1 px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-right bg-white/80 dark:bg-gray-800/80 text-black dark:text-white shadow"
                placeholder="ادخل اسم المستخدم (اختياري)"
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={20}
              />
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-white/70 dark:bg-gray-800/60 rounded-lg mb-4 transition-colors duration-300">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.user !== msg.user ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md ${msg.user === username ? 'bg-gradient-to-l from-teal-500 via-cyan-400 to-teal-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-bold text-sx trxt-dark dark:text-teal-200">{msg.user}</span>
                      <span className="text-[10px] font-bold text-teal-600">{msg.time}</span>
                      {/* {console.log("message ",msg)} */}
                    </div>
                    <p className="break-words text-right mb-2">{msg.text}</p>
                 {msg.user &&
                    <div className="flex gap-3">
                      <button
                        // onClick={() => { handleEditComment(comment._id, comment.content, post._id) }}
                        className="text-yellow-600 hover:text-yellow-800 text-xs font-semibold"
                        title="تعديل الرساله"
                      >
                        ✏️ تعديل
                      </button>
                      <button
                        // onClick={() => handleDeleteComment(comment._id, post._id)}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold"
                        title="حذف الرساله"
                      >
                        🗑️ حذف
                      </button>
                    </div>
                 }
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex gap-2 mt-auto">
              <input
                className="flex-1 px-4 py-2 border border-teal-400 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-right bg-white/90 dark:bg-gray-900/80 text-black dark:text-white shadow"
                placeholder="اكتب رسالتك..."
                value={input}
                onChange={e => setInput(e.target.value)}
                maxLength={300}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 hover:from-cyan-400 hover:to-teal-500 text-white font-bold rounded-full shadow transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13"></path><path strokeLinecap="round" strokeLinejoin="round" d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                إرسال
              </button>
            </form>
          </div>
        </main>
        <div className="hidden lg:block bg-[#f0f4f8] border-r border-[#e0e7ef] sticky top-0 h-[90vh]">
          <LeftAside chatMode />
        </div>
      </div>
    </div>
  );
}