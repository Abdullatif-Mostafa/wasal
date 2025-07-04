"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// URL السيرفر اللي شغَّال عليه Express + Socket.io
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function useSocket(namespace = "") {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // أنشئ الاتصال مرة واحدة على الـ client
    socketRef.current = io(SOCKET_URL + namespace, {
      transports: ["websocket"], // اختياري: يسرع handshake
      autoConnect: true,
    });
    socketRef.current.on("connect", () => setConnected(true));
    socketRef.current.on("disconnect", () => setConnected(false));
    return () => {
      socketRef.current.disconnect();
    };
  }, [namespace]);
  return { socket: socketRef.current, connected };
}
