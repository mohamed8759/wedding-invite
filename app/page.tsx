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

  // 🎆 Confetti
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
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
    "bg-white/40 backdrop-blur-xl rounded-2xl p-4 w-24 shadow-xl border border-white/20 hover:scale-110 transition";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-300 via-rose-200 to-white bg-[length:200%_200%] animate-[gradientMove_8s_ease_infinite] text-gray-800">

      <div className="text-center max-w-md w-full bg-white/40 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">

        {/* 🎬 Video Header */}
        <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl border border-white/30">
          <video
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-56 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-2 tracking-wide">
          Khaled <span className="animate-pulse">❤️</span> Mariam
        </h1>

        <p className="text-sm opacity-70 mb-6">
          Engagement Invitation
        </p>

        {/* Text */}
        <p className="mb-6 leading-relaxed">
          الحمد لله الذي جمع بين القلوب بالمودة والرحمة
          <br />
          ندعوكم لحضور حفل خطوبتنا 🎉
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-3 mb-6">

          <div className={boxStyle}>
            <p className="text-3xl font-extrabold">{days}</p>
            <span className="text-xs">يوم</span>
          </div>

          <div className={boxStyle}>
            <p className="text-3xl font-extrabold">{hours}</p>
            <span className="text-xs">ساعة</span>
          </div>

          <div className={boxStyle}>
            <p className="text-3xl font-extrabold">{minutes}</p>
            <span className="text-xs">دقيقة</span>
          </div>

          <div className={boxStyle}>
            <p className="text-3xl font-extrabold">{seconds}</p>
            <span className="text-xs">ثانية</span>
          </div>

        </div>

        {/* Details */}
        <div className="mb-6 space-y-1">
          <p>📅 السبت 25-4-2026 - الساعة 4 مساءً</p>
          <p>📍 قاعة ليالي - كرداسة</p>
        </div>

        {/* Button */}
        <a
          href="https://maps.app.goo.gl/PHHJLi94N3wEkFTz5?g_st=aw"
          target="_blank"
          className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-300/50 transition-all duration-300"
        >
          📍 عرض اللوكيشن
        </a>

      </div>

      {/* Background Animation */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>

    </main>
  );
}