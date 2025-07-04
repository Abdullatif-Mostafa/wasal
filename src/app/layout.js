"use client";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../RTK/Store"
import Nav from "./Component/Header/page";
import ReduxInitializer from "./ReduxInitializer";
import { Toaster } from "react-hot-toast";
// import Home from "./Component/Header/page"
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <ReduxInitializer />
          <Nav />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </Provider>
      </body>
    </html>
  );
}
