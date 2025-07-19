"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import RightAside from "../../Component/RightAside";
import LeftAside from "../../Component/LeftAside";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const metadata={
  title:"المحادثات",
  description:"صفحة المحادثات تعرض جميع المحادثات الخاصة بموقع وصال."
}
const SOCKET_URL = "http://localhost:4000";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const getingMessages=async()=>{
    fetch('http://localhost:4000/api/messages/6851982403af215b4a14c015')
      .then((response) => response.json())
      .then((data) => {
        console.log("messages data",data);
        if (data.status === "success") {
          setMessages(data.messages);
        } else {
          console.error("Error fetching messages:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }
  useEffect(()=>{
    getingMessages()
  },[input])

  // تأكد من وجود التوكن وإلا انقل المستخدم
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Pages/Login');
    }
  }, []);

  // الاتصال بـ socket.io
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token') || null,
      },
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      socketRef.current.emit("join-conversations");
    });

    socketRef.current.on("disconnect", () => setIsConnected(false));

    socketRef.current.on("new-message", (msg) => {
      console.log("new-message", msg);
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // إرسال رسالة
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log("input ==== ",input)
    const dummyConversationId = "6851982403af215b4a14c015"; 

    socketRef.current.emit("send-message", {
      conversationId: dummyConversationId,
      content: input,
    });
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
            </div>

            <div className="flex items-center justify-between gap-2 mb-4 px-5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold">{user?.username.charAt(0)}</span>
                <span className="text-white font-semibold">{user?.username}</span>
              </div>
              <span className={`text-xs font-bold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'متصل' : 'غير متصل'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-white/70 dark:bg-gray-800/60 rounded-lg mb-4 transition-colors duration-300">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender?.username !== user.username ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md ${msg.sender?.username !== user.username ? 'bg-gradient-to-l from-teal-500 via-cyan-400 to-teal-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-bold text-sx">{msg.sender?.username || msg.user}</span>
                      <span className={`text-[10px] font-bold ${msg.sender?.username !== user.username ? 'text-dark' : 'text-teal-600'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="break-words text-right mb-2">{msg.content || msg.text}</p>
                    {msg.sender?.username === user.username && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => { console.log("edit msg:", msg.content); }}
                          className="text-yellow-600 hover:text-yellow-800 text-xs font-semibold"
                          title="تعديل الرساله"
                        >
                          ✏️ تعديل
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 text-xs font-semibold"
                          title="حذف الرساله"
                        >
                          🗑️ حذف
                        </button>
                      </div>
                    )}
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
