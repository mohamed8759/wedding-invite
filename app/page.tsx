"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  function getNextSaturdayAt4PM() {
    const now = new Date();
    const day = now.getDay();

    let daysUntilSaturday = (6 - day + 7) % 7;

    if (daysUntilSaturday === 0 && now.getHours() >= 16) {
      daysUntilSaturday = 7;
    }

    const nextSaturday = new Date(now);
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(16, 0, 0, 0);

    return nextSaturday.getTime();
  }

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = getNextSaturdayAt4PM();
      const now = new Date().getTime();
      setTimeLeft(target - now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🎆 Confetti كل شوية
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔊 تشغيل الصوت بعد أول تفاعل
  useEffect(() => {
    const video = document.querySelector("video");

    const enableSound = () => {
      if (video) {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {});
      }
    };

    window.addEventListener("click", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const boxStyle =
    "bg-white/70 backdrop-blur-xl rounded-xl p-3 w-20 shadow-md border border-white/40 hover:scale-110 transition-all duration-300";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-rose-100 via-pink-200 to-rose-50 bg-[length:300%_300%] animate-gradientMove text-gray-800">

      <div className="text-center max-w-md w-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-white/30 animate-float">

        {/* 🎬 Video */}
        <div className="mb-6 rounded-3xl overflow-hidden shadow-xl border border-white/30">
          <video
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-52 object-cover scale-105 hover:scale-110 transition duration-700"
          />
        </div>

        {/* ❤️ Title */}
        <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold mb-3 whitespace-nowrap">
          <span>Khaled</span>
          <span className="animate-heartbeat text-rose-500 text-xl sm:text-2xl">❤️</span>
          <span>Mariam</span>
        </h1>

        <p className="text-sm opacity-70 mb-5">
          Engagement Invitation
        </p>

        {/* 📜 Text */}
        <p className="mb-6 leading-relaxed text-sm sm:text-base text-gray-700">
          الحمد لله الذي جمع بين القلوب بالمودة والرحمة
          <br />
          نتشرف بدعوتكم لحضور حفل خطوبتنا 🎉
        </p>

        {/* ⏳ Countdown */}
        <div className="flex justify-center gap-3 mb-6">

          <div className={boxStyle}>
            <p className="text-xl font-extrabold animate-pulse">{days}</p>
            <span className="text-xs">يوم</span>
          </div>

          <div className={boxStyle}>
            <p className="text-xl font-extrabold animate-pulse">{hours}</p>
            <span className="text-xs">ساعة</span>
          </div>

          <div className={boxStyle}>
            <p className="text-xl font-extrabold animate-pulse">{minutes}</p>
            <span className="text-xs">دقيقة</span>
          </div>

          <div className={boxStyle}>
            <p className="text-xl font-extrabold animate-pulse">{seconds}</p>
            <span className="text-xs">ثانية</span>
          </div>

        </div>

        {/* 📍 Details */}
        <div className="mb-6 space-y-2 text-sm text-gray-700">
          <p> السبت 25 أبريل 2026 - الساعة 4 مساءً</p>
          <p>📍 قاعة ليالي - كرداسة</p>
        </div>

        {/* 🔗 Button */}
        <a
          href="https://maps.app.goo.gl/PHHJLi94N3wEkFTz5?g_st=aw"
          target="_blank"
          className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-400/40 transition-all duration-300 font-semibold"
        >
          📍 عرض اللوكيشن
        </a>

      </div>

      {/* 🎨 Animations */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-gradientMove {
          animation: gradientMove 10s ease infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.2s infinite;
        }
      `}</style>

    </main>
  );
}