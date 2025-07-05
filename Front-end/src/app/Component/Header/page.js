"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/RTK/Reducers/authSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaComments, FaBell, FaHome, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
// import 'animate.css';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log("user in the header ", user);
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => document.removeEventListener("mousedown", handleOutsideClick);
  // }, []);
  useEffect(() => {
    const User=localStorage.getItem("user");
    console.log("User in the header ", User);
  },[])
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
      toast.success('تم تسجيل الخروج بنجاح!');
    }
  };
  const renderDropdown = () => (
    <div ref={dropdownRef} className="absolute mt-2 w-56 bg-white text-cyan-900 rounded-xl shadow-2xl border border-cyan-100 z-50 animate-fade-in">
      <ul className="flex flex-col gap-1 py-2">
        <li>
          <Link
            href="/Pages/Account"
            className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-100 rounded transition"
            onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }}
          >
            <span>👤</span>
            الملف الشخصي
          </Link>
        </li>
        <li>
          <Link
            href="/Pages/Friends"
            className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-100 rounded transition"
            onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }}
          >
            <span>👥</span>
            الأصدقاء
          </Link>
        </li>
        <li>
          <Link
            href="/Pages/News"
            className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-100 rounded transition"
            onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }}
          >
            <span>📰</span>
            الأخبار
          </Link>
        </li>
        <li>
          <Link
            href="/Pages/Groups"
            className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-100 rounded transition"
            onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }}
          >
            <span>👨‍👩‍👧‍👦</span>
            المجموعات
          </Link>
        </li>
        <li>
          <Link
            href="/Pages/Notifications"
            className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-100 rounded transition"
            onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }}
          >
            <span>🔔</span>
            الإشعارات
          </Link>
        </li>
        <li>
          <Link
            href="/Pages/setting"
            className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-100 rounded transition"
            onClick={() => { setDropdownOpen(false); setMenuOpen(!menuOpen) }}

          >
            <span>⚙️</span>
            الإعدادات
          </Link>
        </li>
        <li className="border-t border-cyan-100 mt-1 pt-1">
          <button
            className="flex items-center gap-3 w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
            onClick={() => {
              handleLogout();
              setMenuOpen(!menuOpen)
              setDropdownOpen(false);
            }}
          >
            <span>🚪</span>
            تسجيل الخروج
          </button>
        </li>
      </ul>
    </div>
  );

  // Example notification and chat counts (replace with real state/selectors if available)
  const notificationCount = 5; // يمكنك ربطها من ريدكس أو API
  const chatCount = 2; // يمكنك ربطها من ريدكس أو API

  return (
    <nav className="bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-700 fixed w-full top-0 text-white p-4 z-50 shadow-lg border-b border-cyan-200/40 backdrop-blur-md" style={{ direction: "rtl" }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h4 className="text-2xl font-bold flex items-center gap-2">
          {/* <FaUserCircle className="text-white/80 bg-cyan-500 rounded-full p-1 w-8 h-8 shadow" /> */}
          وصال
        </h4>

        {/* روابط سطح المكتب */}
        <ul className="hidden md:flex space-x-2 items-center">
          <li className="nav-item flex items-center justify-center">
            <Link onClick={() => setDropdownOpen(false)} className="hover:text-teal-200 transition-colors duration-200 flex items-center justify-center" href="/">
              <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition">
                <FaHome className="w-6 h-6 text-teal-600" title="الصفحة الرئيسية" />
              </span>
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link href="/Pages/Chat" onClick={() => setDropdownOpen(false)}  className="relative group flex items-center justify-center">
                  <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition relative">
                    <FaComments className="w-6 h-6 text-teal-600" title="الدردشة" />
                    {chatCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg border-2 border-white animate-bounce">
                        {chatCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/Pages/Notifications" onClick={() => setDropdownOpen(false)} className="relative group flex items-center justify-center">
                  <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition relative">
                    <FaBell className="w-6 h-6 text-teal-600" title="الإشعارات" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg border-2 border-white animate-bounce">
                        {notificationCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            </>
          )}
          {isAuthenticated ? (
            <>
              <li className="" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-cyan-600 font-bold text-lg shadow">{user?.username?.[0] || "م"}</span>
                  <span>{user?.username || "حسابي"}</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && renderDropdown()}
              </li>
            </>
          ) : (
            <>
              <li><Link className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow" href="/Pages/Login">تسجيل الدخول</Link></li>
              <li><Link className="flex items-center  px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow " href="/Pages/Register">تسجيل حساب جديد</Link></li>
            </>
          )}
        </ul>

        {/* زر القائمة للهاتف */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* القائمة للهاتف */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <ul className="flex flex-col items-start p-4 space-y-2">
          {isAuthenticated && (
            <div className="w-full flex items-center gap-2 py-1 px-2 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow">
              <li className="nav-item w-full text-right flex items-center gap-4">
                {/* <li className="nav-item flex items-center justify-center"> */}
                  <Link href="/" onClick={() => setMenuOpen(!menuOpen)} className="hover:text-teal-200 transition-colors duration-200 flex items-center justify-center">
                    <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition">
                      <FaHome className="w-6 h-6 text-teal-600" title="الصفحة الرئيسية" />
                    </span>
                  </Link>
                {/* </li> */}
                <Link href="/Pages/Chat" onClick={() => setMenuOpen(!menuOpen)} className="flex items-center relative">
                  <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition relative">
                    <FaComments className="w-6 h-6 text-teal-600" title="الدردشة" />
                    {chatCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg border-2 border-white animate-bounce">
                        {chatCount}
                      </span>
                    )}
                  </span>
                </Link>
                <Link href="/Pages/Notifications" onClick={() => setMenuOpen(!menuOpen)} className="flex items-center relative">
                  <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition relative">
                    <FaBell className="w-6 h-6 text-teal-600" title="الإشعارات" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg border-2 border-white animate-bounce">
                        {notificationCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>

            </div>
          )}
          {isAuthenticated ? (
            <li className="relative w-full text-right" ref={dropdownRef}>
              <button onClick={() => { setDropdownOpen(!dropdownOpen) }} className="flex items-center gap-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-cyan-600 font-bold text-lg shadow">{user?.username?.[0] || "م"}</span>
                <span>{user?.username || "حسابي"}</span>
                <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {dropdownOpen && renderDropdown()}
            </li>
          ) : (
            <>
              <Link onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 w-full py-2 px-2 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow" href="/">
                <span className="bg-white/90 rounded-full p-2 shadow hover:bg-cyan-100 transition">
                  <FaHome className="w-5 h-5 text-teal-600" title="الصفحة الرئيسية" />
                </span>
                <span className="w-full text-right">
                  الصفحة الرئيسية
                </span>
              </Link>
              <li onClick={() => setMenuOpen(false)} className="flex items-center gap-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow"><Link href="/Pages/Login" className="w-full">تسجيل الدخول</Link></li>
              <li onClick={() => { setMenuOpen(false) }} className="flex items-center gap-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-teal-400 hover:to-cyan-500 font-bold shadow"><Link className="w-full" href="/Pages/Register">تسجيل حساب جديد</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
