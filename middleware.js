// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // نحاول نحصل على التوكن من الكوكيز
  const token = localStorage.getItem('token');
  // لو مفيش توكن → نعمل redirect للوجين
  if (!token) {
    return NextResponse.redirect(new URL('/Pages/Login'));
  }
  // لو فيه توكن → نسمح للصفحة بالتحميل
  return NextResponse.next();
}
// نحدد المسارات اللي عايزين نحميها
export const config = {
  matcher: [
    '/Pages/Account/:path*',
    '/Pages/Friends/:path*',
    '/Pages/Posts/:path*',
    '/Pages/Settings/:path*',
    '/Pages/Notifications/:path*',
    '/Pages/Chat/:path*',
  ],
};
