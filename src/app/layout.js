"use client";
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
       <head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width = device-width,initial-scale=1"></meta>
        <meta name="" description="موقع تواصل اجتماعي يتيح لك التواصل مع الاهل والاصدقاء والاحباب وهو شبيه بموقع فيس بوك"></meta>
        <title>وصال</title>
       </head>
      <body 
      style={{backgroundColor:"#F5F7FA",height:"100vh"}}
        className={'backdrop:#F5F7FA'}
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
