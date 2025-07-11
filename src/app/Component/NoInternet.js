import React from "react";
import { IconBase } from "react-icons";

const NoInternet = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-gradient-to-br from-cyan-50 to-teal-100 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center gap-4">
                <div className="bg-white/120 rounded-full p-4 shadow-lg mb-2">
                    {/* <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16.5V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1.5"/><path d="M6 16.5V15a6 6 0 0 1 12 0v1.5"/><path d="M8 10V8a4 4 0 1 1 8 0v2"/><line x1="12" y1="20" x2="12" y2="16"/><line x1="8" y1="20" x2="8" y2="16"/><line x1="16" y1="20" x2="16" y2="16"/></svg> */}
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M2.05 8.05a10 10 0 0 1 19.9 0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M5.5 11.5a6 6 0 0 1 13 0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8.5 15a2 2 0 0 1 7 0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="12" cy="19" r="2" fill="#fff" stroke="#38bdf8" strokeWidth="1.5" />
                        <line x1="10.8" y1="17.8" x2="13.2" y2="20.2" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="13.2" y1="17.8" x2="10.8" y2="20.2" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-cyan-700 mb-2">لا يوجد اتصال بالانترنت</h2>
                <p className="text-cyan-700 text-center text-base font-normal max-w-xs">
                    <span className="text-cyan-700 text-center text-base font-bold max-w-xs mb-31">
                        {text}
                    </span>
                    <br />يرجى التحقق من اتصالك بالانترنت وإعادة المحاولة.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 text-white rounded-full font-bold shadow px-6 py-2 text-base hover:from-cyan-400 hover:to-teal-500 transition-colors"
                >
                    إعادة المحاولة
                </button>
            </div>
        </div>
    );
};

export default NoInternet;
