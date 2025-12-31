
import React, { useEffect, useCallback } from 'react';
import { Heart, Star, Gift, CheckCircle2, Feather, Sparkles, PartyPopper } from 'lucide-react';
import { CornerFlourish, LoveStamp } from './Letter';
import { playSound, audioManager } from '../utils/audio-manager';

declare global {
  interface Window {
    confetti: any;
  }
}

interface Props {
  isEmbedded?: boolean;
  isActive?: boolean;
}

// Custom Button: Elegant, Royal Style (No cartoon SVG)
const FireworkTriggerButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative cursor-pointer focus:outline-none"
  >
    {/* 1. Golden Glow Background (Behind) */}
    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>

    {/* 2. Main Button Body */}
    <div className="relative flex items-center gap-4 px-10 py-4 bg-gradient-to-br from-[#881337] via-[#9f1239] to-[#4c0519] rounded-full border border-[#fcd34d]/50 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(190,18,60,0.4)] active:translate-y-0 active:scale-95 overflow-hidden">

      {/* Shine effect overlay */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>

      {/* Icon Left */}
      <div className="relative z-10 p-2 bg-white/10 rounded-full border border-white/20 group-hover:bg-white/20 transition-colors">
        <PartyPopper className="w-6 h-6 text-yellow-300" />
      </div>

      {/* Text - CENTERED */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="font-nunito text-[10px] uppercase tracking-[0.2em] text-yellow-200/80 font-bold">Celebration Mode</span>
        <span className="font-hand text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100 tracking-wide drop-shadow-sm whitespace-nowrap">
          Bắn Pháo Hoa
        </span>
      </div>

      {/* Sparkles Right */}
      <Sparkles className="w-5 h-5 text-yellow-400/80 animate-pulse ml-2" />
    </div>
  </button>
);

const StageSuccess: React.FC<Props> = ({ isEmbedded = false, isActive = true }) => {

  // Improved Realistic Firework Logic
  const fireRealFirework = useCallback((ratioX: number, ratioY: number) => {
    const count = 200;
    const defaults = {
      origin: { x: ratioX, y: ratioY },
      zIndex: 1500, // Make sure it's above everything
    };

    function fire(particleRatio: number, opts: any) {
      if (window.confetti) {
        window.confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      shapes: ['star'],
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    });

    fire(0.2, {
      spread: 60,
      shapes: ['circle'],
      colors: ['#F59E0B', '#D97706', '#FFFFFF'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#e11d48', '#be123c', '#fb7185'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFFFFF'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FCD34D'],
    });
  }, []);

  const handleCelebrate = () => {
    playSound('firework');
    fireRealFirework(0.5, 0.8);
    setTimeout(() => {
      playSound('firework');
      fireRealFirework(0.2, 0.5);
    }, 200);
    setTimeout(() => {
      playSound('firework');
      fireRealFirework(0.8, 0.5);
    }, 400);
    setTimeout(() => {
      playSound('firework');
      fireRealFirework(0.5, 0.3);
    }, 600);
  };

  useEffect(() => {
    // Only auto-fire if active
    if (isActive) {
      const timer = setTimeout(() => {
        playSound('firework');
        fireRealFirework(0.5, 0.5);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [fireRealFirework, isActive]);

  // CONTENT COMPONENT
  const Content = (
    <>
      <style>{`
            @keyframes tilt-in {
                0% { transform: scale(0.95) translateY(20px); opacity: 0; }
                20% { opacity: 1; } /* Rapidly reach full opacity to avoid dark blending */
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            @keyframes stamp-bounce {
                0% { transform: scale(2) rotate(-10deg); opacity: 0; }
                60% { transform: scale(0.9) rotate(-10deg); opacity: 1; }
                100% { transform: scale(1) rotate(-15deg); opacity: 0.8; }
            }
            @keyframes sign-flow {
                0% { stroke-dashoffset: 100; opacity: 0; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
      `}</style>

      {/* --- CERTIFICATE CARD --- */}
      <div
        className={`relative group w-full max-w-[1000px] aspect-[4/5] md:aspect-[4/3] bg-[#fffbf0] shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col ${!isEmbedded ? 'animate-[tilt-in_1s_ease-out]' : ''}`}
        // If embedded, we rely on parent's 3D transform, no separate animation
        style={{ backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
      >

        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* Border */}
        <div className="absolute inset-2 md:inset-4 border-4 border-double border-[#d4af37] opacity-80 pointer-events-none z-20"></div>

        {/* Corners */}
        <CornerFlourish className="absolute top-3 left-3 md:top-5 md:left-5 w-12 h-12 md:w-16 md:h-16 text-[#d4af37] z-20" />
        <CornerFlourish className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-12 h-12 md:w-16 md:h-16 text-[#d4af37] rotate-180 z-20" />

        {/* CONTENT CONTAINER */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-4 md:p-8 text-center">

          {/* 1. Header Section */}
          <div className="flex flex-col items-center w-full mt-2">
            <div className="flex items-center gap-3 opacity-80 mb-2">
              <div className="h-[1px] w-12 bg-rose-400"></div>
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <div className="h-[1px] w-12 bg-rose-400"></div>
            </div>
            {/* CHANGED FONT TO NUNITO EXTRA BOLD FOR VIETNAMESE SUPPORT */}
            <h2 className="font-nunito uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#881337] text-lg md:text-2xl font-extrabold bg-gradient-to-r from-[#881337] via-[#be123c] to-[#881337] bg-clip-text text-transparent drop-shadow-sm">
              Giấy Chứng Nhận Tình Yêu
            </h2>
          </div>

          {/* 2. Main Name Section */}
          <div className="relative w-full flex flex-col items-center my-2">
            <span className="font-hand text-rose-900/70 text-lg md:text-xl italic mb-[-5px] font-semibold">Trao tặng cho bé yêu:</span>
            {/* CHANGED FONT TO DANCING SCRIPT FOR BETTER ACCENTS */}
            <div className="font-script text-7xl md:text-9xl p-4 transform -rotate-2 hover:scale-105 transition-transform duration-500 cursor-default">
              <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(255,200,200,1)]">
                Cua Bé Bỏng
              </span>
            </div>
            <div className="w-1/3 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full mt-2"></div>
          </div>

          {/* 3. Body Text Section */}
          <div className="max-w-[90%] space-y-2 md:space-y-3">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="text-green-600 drop-shadow-sm" size={32} />
              <p className="font-nunito text-2xl md:text-3xl text-rose-950 font-extrabold tracking-tight">
                Đã chính thức <span className="text-[#e11d48] underline decoration-wavy decoration-3 underline-offset-4 decoration-rose-300">tha thứ</span> cho anh.
              </p>
            </div>

            <p className="font-nunito text-lg md:text-xl text-slate-700 leading-relaxed font-semibold">
              Chứng nhận này xác nhận quyền được <br className="md:hidden" />
              <span className="relative inline-block px-2 mx-1">
                <span className="absolute inset-0 transform -skew-x-12 bg-yellow-200/80 rounded-sm mix-blend-multiply"></span>
                <span className="relative font-bold text-[#9a3412]">chiều chuộng & yêu thương</span>
              </span>
              vô điều kiện.
            </p>
          </div>

          {/* 4. Reward "Voucher" Box */}
          <div className="w-full max-w-2xl relative group/voucher mt-2">
            {/* Golden Border/Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-lg opacity-40 blur-sm group-hover/voucher:opacity-60 transition-opacity"></div>

            <div className="relative bg-gradient-to-r from-[#fff7ed] to-[#fff1f2] border-2 border-dashed border-[#fbbf24] rounded-lg p-4 md:p-6 shadow-sm flex items-center justify-between gap-4 overflow-hidden">
              {/* Background Patterns for Voucher */}
              <div className="absolute right-[-20px] top-[-20px] text-yellow-500/10 rotate-12 transform scale-150">
                <Gift size={120} />
              </div>

              {/* Left Side: Title */}
              <div className="flex-1 text-left z-10">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-yellow-600 animate-pulse" />
                  <span className="text-xs md:text-sm font-bold tracking-widest text-yellow-700 uppercase">Phần thưởng đặc biệt</span>
                </div>
                <h3 className="font-hand text-2xl md:text-4xl font-bold text-[#9f1239]">
                  Cho phép em ôm hun anh :3
                </h3>
                <p className="text-sm md:text-base text-stone-600 mt-1 italic font-medium">Có giá trị sử dụng trọn đời • Không giới hạn</p>
              </div>

              {/* Right Side: Icon */}
              <div className="flex-shrink-0 bg-white/60 p-3 rounded-full border border-rose-200 shadow-sm z-10">
                <Gift size={32} className="text-rose-600" />
              </div>

              {/* Shine Effect */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 animate-[shimmer_3s_infinite]"></div>
            </div>
          </div>

          {/* 5. Footer & Signatures */}
          <div className="w-full grid grid-cols-2 gap-8 mt-2 md:mt-4 px-4 md:px-12 items-end">
            {/* Date */}
            <div className="flex flex-col items-center">
              <span className="font-hand text-3xl md:text-4xl text-rose-950 font-bold mb-1">198 ngày</span>
              <div className="w-24 h-[2px] bg-rose-200"></div>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-800/60 mt-2 font-bold">Together</span>
            </div>

            {/* Modern Signature */}
            <div className="flex flex-col items-center relative group/sig cursor-pointer">

              {/* Script Font Signature */}
              <span className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-rose-600 to-red-800 font-bold transform -rotate-6 relative z-10 pb-2 pr-2 drop-shadow-sm">
                Từ Anh Văn
              </span>

              {/* Artistic Underline SVG */}
              <svg className="w-40 h-6 text-rose-700 overflow-visible mt-[-10px]" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10,10 Q40,15 80,10 T150,10" className="animate-[sign-flow_2s_ease-out_forwards]" strokeDasharray="160" />
              </svg>

              <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-800/60 mt-1 font-bold">Authorized Signature</span>
            </div>
          </div>

          {/* 6. The "Ink Stamp" Overlay - CLICKABLE FOR MUSIC */}
          <div
            onClick={() => {
              audioManager.toggleMusic();
              playSound('click');
            }}
            className={`absolute bottom-28 right-12 md:bottom-32 md:right-16 transform mix-blend-multiply z-40 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 ${isActive ? 'animate-[stamp-bounce_0.5s_ease-out_1s_forwards] opacity-0' : 'opacity-0'}`}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 border-[4px] border-red-700 rounded-full flex flex-col items-center justify-center p-2 transform rotate-[-15deg] opacity-90 mask-grunge bg-red-50/10 backdrop-blur-[1px]">
              <div className="w-full h-full border border-red-700 rounded-full flex flex-col items-center justify-center border-dashed">
                <Heart size={20} className="text-red-700 fill-red-700 mb-1" />
                <span className="font-black text-red-700 text-xs md:text-sm uppercase tracking-widest">Official</span>
                <span className="font-black text-red-700 text-lg md:text-xl uppercase tracking-tighter leading-none">LOVE</span>
                <span className="font-black text-red-700 text-[0.6rem] uppercase tracking-wide mt-1">Confirmed</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- CUSTOM BUTTON (OUTSIDE CARD) --- */}
      <div className="mt-6 z-50 transform w-full flex justify-center" style={{ backfaceVisibility: 'hidden' }}>
        <FireworkTriggerButton onClick={handleCelebrate} />
      </div>
    </>
  );

  if (isEmbedded) {
    return Content;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-visible z-50 p-4">
      {/* --- MAIN CONTENT WRAPPER FOR STANDALONE MODE --- */}
      <div className="relative flex flex-col items-center perspective-[1000px] w-full h-full justify-center">
        {Content}
      </div>
    </div>
  );
};

export default StageSuccess;
