import { useEffect } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="w-36 h-36 animate-logo-glow"
      />

      {/* Title: Namaa | نماء */}
      <h1 className="mt-6 text-3xl font-bold text-[#B8860B] opacity-0 animate-text-fade">
        Namaa | نماء
      </h1>

      {/* Tagline */}
      <p className="mt-2 text-lg text-[#B8860B] opacity-0 animate-text-fade-delayed">
        طريقك للتطوير والارتقاء
      </p>

      {/* Small Words */}
      <p className="mt-1 text-sm text-[#B8860B] tracking-wide opacity-0 animate-text-fade-more">
        تنمية • عبادة • إنجاز
      </p>
    </div>
  );
}
