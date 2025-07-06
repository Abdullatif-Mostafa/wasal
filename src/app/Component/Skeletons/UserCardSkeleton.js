const UserCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-cyan-50 rounded-2xl shadow p-6 flex flex-col items-center group relative overflow-hidden animate-pulse">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60"></div>

          {/* الصورة الدائرية */}
          <div className="w-20 h-20 mb-3 rounded-full bg-gradient-to-br from-teal-300 to-cyan-300 flex items-center justify-center border-4 border-white shadow-lg" />

          {/* اسم المستخدم */}
          <div className="h-4 w-24 bg-teal-200 rounded mb-2" />

          {/* الوصف */}
          <div className="h-3 w-36 bg-cyan-100 rounded mb-1" />
          <div className="h-3 w-28 bg-cyan-100 rounded mb-2" />

          {/* تاريخ التسجيل */}
          <div className="h-2 w-20 bg-cyan-200 rounded mb-4" />

          {/* زر عرض الحساب */}
          <div className="h-8 w-24 bg-cyan-300 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default UserCardSkeleton;
