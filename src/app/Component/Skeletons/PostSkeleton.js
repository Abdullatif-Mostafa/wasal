import React from "react";

const PostSkeleton = ({ count = 3 }) => {
  return (
    <div  className="w-full max-w-xl mx-auto">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="CardBox rounded-2xl shadow-lg p-0 text-right border border-teal-200 mb-0.5 animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 border-b bg-teal-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-teal-200"></div>
              <div>
                <div className="w-28 h-4 bg-teal-200 rounded mb-1"></div>
                <div className="w-16 h-3 bg-cyan-200 rounded"></div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-cyan-200"></div>
          </div>

          {/* Description */}
          <div className="px-6 pt-4 pb-2">
            <div className="h-4 bg-teal-200 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-cyan-100 rounded w-1/2"></div>
          </div>

          {/* Image */}
          <div className="w-full h-52 bg-cyan-100"></div>

          {/* Footer */}
          <div className="flex justify-between gap-2 border-t pt-3 px-6 pb-4 bg-cyan-50 rounded-b-2xl">
            <div className="w-20 h-4 bg-cyan-200 rounded"></div>
            <div className="w-20 h-4 bg-cyan-200 rounded"></div>
            <div className="w-20 h-4 bg-cyan-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
