import React from 'react';
import { Heart, Star, Gift, CheckCircle2 } from 'lucide-react';
import { CornerFlourish } from '../components/Letter';
import { playSound, audioManager } from '../utils/audio-manager';

const CertificateScreen: React.FC<{ isVisible?: boolean }> = ({ isVisible = false }) => {

  return (
    // Card content fills the FlipCard container - same as LetterScreen
    <div className="w-full h-full bg-[#fffbf0] shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col relative">
      <style>{`
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
        @keyframes stamp-slam {
          0% { 
            transform: translateZ(0) translateY(-120px) rotate(-25deg) scale(1.5); 
            opacity: 0; 
          }
          50% { 
            transform: translateZ(0) translateY(8px) rotate(-10deg) scale(0.92); 
            opacity: 1; 
          }
          70% { 
            transform: translateZ(0) translateY(-5px) rotate(-16deg) scale(1.03); 
          }
          85% { 
            transform: translateZ(0) translateY(2px) rotate(-14deg) scale(0.98); 
          }
          100% { 
            transform: translateZ(0) translateY(0) rotate(-15deg) scale(1); 
            opacity: 0.9; 
          }
        }
      `}</style>

      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Border */}
      <div className="absolute inset-2 md:inset-4 border-4 border-double border-[#d4af37] opacity-80 pointer-events-none z-20"></div>

      {/* Corners */}
      <CornerFlourish className="absolute top-3 left-3 md:top-5 md:left-5 w-12 h-12 md:w-16 md:h-16 text-[#d4af37] z-20" />
      <CornerFlourish className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-12 h-12 md:w-16 md:h-16 text-[#d4af37] rotate-180 z-20" />

      {/* CONTENT */}
      <div className="cert-content relative z-10 w-full h-full flex flex-col items-center justify-between p-2 md:p-4 text-center">

        {/* Header */}
        <div className="cert-header flex flex-col items-center w-full mt-1">
          <div className="flex items-center gap-3 opacity-80 mb-2">
            <div className="h-[1px] w-12 bg-rose-400"></div>
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <div className="h-[1px] w-12 bg-rose-400"></div>
          </div>
          <h2 className="font-nunito uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#881337] text-lg md:text-2xl font-extrabold bg-gradient-to-r from-[#881337] via-[#be123c] to-[#881337] bg-clip-text text-transparent drop-shadow-sm">
            Chúc Mừng Năm Mới 2026!
          </h2>
        </div>

        {/* Name */}
        <div className="relative w-full flex flex-col items-center my-0 overflow-visible">
          <span className="cert-name-label font-hand text-rose-900/70 text-lg md:text-xl italic mb-[-5px] font-semibold">Gửi đến em gái rượu</span>
          <div className="cert-name font-script text-7xl md:text-9xl py-1 px-8 transform -rotate-2 hover:scale-105 transition-transform duration-500 cursor-default overflow-visible">
            <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(255,200,200,1)]">
              &nbsp;Luyện Mai Nhi
            </span>
          </div>
          <div className="w-1/3 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full mt-1"></div>
        </div>

        {/* Body */}
        <div className="cert-body max-w-[90%] space-y-1 md:space-y-2">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-green-600 drop-shadow-sm" size={32} />
            <p className="font-nunito text-2xl md:text-3xl text-rose-950 font-extrabold tracking-tight">
              Chúc em năm mới <span className="text-[#e11d48] underline decoration-wavy decoration-3 underline-offset-4 decoration-rose-300">an khang thịnh vượng!</span>
            </p>
          </div>
          <p className="font-nunito text-base md:text-lg text-slate-700 leading-relaxed font-semibold whitespace-nowrap">
            Mong em luôn
            <span className="relative inline-block px-2 mx-1">
              <span className="absolute inset-0 transform -skew-x-12 bg-yellow-200/80 rounded-sm mix-blend-multiply"></span>
              <span className="relative font-bold text-[#9a3412]">mạnh khỏe, hạnh phúc & gặp nhiều may mắn!</span>
            </span>
          </p>
        </div>

        {/* Voucher */}
        <div className="cert-voucher w-full max-w-2xl relative group/voucher mt-1">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-lg opacity-40 blur-sm group-hover/voucher:opacity-60 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-[#fff7ed] to-[#fff1f2] border-2 border-dashed border-[#fbbf24] rounded-lg p-3 md:p-4 shadow-sm flex items-center justify-between gap-3 overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] text-yellow-500/10 rotate-12 transform scale-150">
              <Gift size={120} />
            </div>
            <div className="flex-1 text-left z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs md:text-sm font-bold tracking-widest text-yellow-700 uppercase">Lời chúc đặc biệt</span>
              </div>
              <h3 className="font-hand text-2xl md:text-4xl font-bold text-[#9f1239]">
                Sớm có người yêu mình nha
              </h3>
              <p className="text-sm md:text-base text-stone-600 mt-1 italic font-medium">Cảm ơn hữu duyên gặp lại</p>
            </div>
            <div className="flex-shrink-0 bg-white/60 p-3 rounded-full border border-rose-200 shadow-sm z-10">
              <Gift size={32} className="text-rose-600" />
            </div>
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 animate-[shimmer_3s_infinite]"></div>
          </div>
        </div>

        {/* Footer & Signature */}
        <div className="w-full grid grid-cols-2 gap-4 mt-0 mb-2 px-4 md:px-8 items-end">
          <div className="flex flex-col items-center">
            <span className="font-hand text-3xl md:text-4xl text-rose-950 font-bold mb-1">01/01/2026</span>
            <div className="w-24 h-[2px] bg-rose-200"></div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-800/60 mt-2 font-bold">Năm Mới</span>
          </div>
          <div className="flex flex-col items-center relative">
            <span className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-rose-600 to-red-800 font-bold transform -rotate-6 relative z-10 pb-2 pr-2 drop-shadow-sm">
              Từ Anh Văn
            </span>
            <svg className="w-40 h-6 text-rose-700 overflow-visible mt-[-10px]" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10,10 Q40,15 80,10 T150,10" className="animate-[sign-flow_2s_ease-out_forwards]" strokeDasharray="160" />
            </svg>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-800/60 mt-1 font-bold">Thân mến</span>
          </div>
        </div>

        {/* Ink Stamp - CLICKABLE FOR MUSIC */}
        <div
          onClick={() => { audioManager.toggleMusic(); playSound('click'); }}
          className={`absolute bottom-12 right-4 md:bottom-16 md:right-8 mix-blend-multiply z-40 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 will-change-transform ${isVisible ? 'animate-[stamp-slam_0.8s_cubic-bezier(0.34,1.56,0.64,1)_1.2s_forwards]' : ''} opacity-0`}
        >
          <div className="w-28 h-28 md:w-36 md:h-36 border-[5px] border-red-700 rounded-full flex flex-col items-center justify-center p-3 transform rotate-[-15deg] opacity-90 bg-red-50/20 backdrop-blur-[1px] shadow-lg">
            <div className="w-full h-full border-2 border-red-700 rounded-full flex flex-col items-center justify-center border-dashed">
              <Heart size={20} className="text-red-700 fill-red-700 mb-1" />
              <span className="font-black text-red-700 text-xs md:text-sm uppercase tracking-widest">Official</span>
              <span className="font-black text-red-700 text-xl md:text-2xl uppercase tracking-tighter leading-none">LOVE</span>
              <span className="font-black text-red-700 text-[0.6rem] md:text-xs uppercase tracking-wide mt-1">Confirmed</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificateScreen;
