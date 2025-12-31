
import React from 'react';
import { Heart, MousePointerClick } from 'lucide-react';
import { APOLOGY_CONTENT } from '../constants';

interface Props {
  isUp: boolean;
  onClick: () => void;
}

// 🌿 Vintage Corner Ornament SVG
export const CornerFlourish = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10,10 L30,10 Q50,10 50,30" opacity="0.5" />
    <path d="M10,10 L10,30 Q10,50 30,50" opacity="0.5" />
    <path d="M5,5 L40,5 Q60,5 60,25 T80,40" strokeWidth="3" />
    <path d="M5,5 L5,40 Q5,60 25,60 T40,80" strokeWidth="3" />
    <circle cx="5" cy="5" r="3" fill="currentColor" />
  </svg>
);

// 💌 Postage Stamp SVG
export const LoveStamp = () => (
  <div className="absolute top-4 right-4 w-12 h-16 md:w-16 md:h-20 bg-rose-100 border-2 border-dashed border-rose-300 shadow-sm flex flex-col items-center justify-center rotate-[5deg] opacity-90">
    <div className="w-8 h-10 md:w-12 md:h-14 bg-rose-500/10 flex items-center justify-center">
      <Heart size={20} className="text-rose-500 fill-rose-500 md:w-6 md:h-6" />
    </div>
    <span className="text-[0.4rem] md:text-[0.5rem] font-serif text-rose-800 mt-1 uppercase tracking-widest">Love Mail</span>
  </div>
);

// 🖊️ Fake Handwriting Lines SVG
export const HandwritingLines = ({ className }: { className?: string }) => (
  <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none" className={`opacity-40 ${className}`}>
    <path d="M10,10 Q30,5 50,10 T90,10 T130,8 T180,10" fill="none" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
    <path d="M10,30 Q40,32 70,30 T120,28 T160,30" fill="none" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
    <path d="M10,50 Q30,48 60,50 T110,52 T150,50 T170,51" fill="none" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const Letter: React.FC<Props> = ({ isUp, onClick }) => {
  return (
    <div
      onClick={isUp ? onClick : undefined}
      className={`absolute left-4 right-4 transition-all duration-[1000px] ease-in-out flex flex-col items-center justify-center group ${isUp ? 'cursor-pointer hover:-translate-y-[240px]' : ''}`}
      style={{
        top: '12px',
        height: '88%', // Slightly reduced height to ensure it fits nicely
        transform: isUp ? 'translateY(-80px)' : 'translateY(0)',
        zIndex: 5,
        pointerEvents: isUp ? 'auto' : 'none'
      }}
    >
      {/* Main Paper Sheet */}
      <div className="w-full h-full bg-[#fffbf0] shadow-[0_2px_15px_rgba(0,0,0,0.1)] relative overflow-hidden border border-[#e5e0d0]">

        {/* 📜 Paper Texture (Noise) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* ⚜️ Gold Border Frame */}
        <div className="absolute inset-2 border-2 border-double border-[#d4af37] opacity-60 pointer-events-none"></div>

        {/* ✨ Corner Ornaments */}
        <CornerFlourish className="absolute top-3 left-3 w-8 h-8 md:w-12 md:h-12 text-[#d4af37]" />
        <CornerFlourish className="absolute bottom-3 right-3 w-8 h-8 md:w-12 md:h-12 text-[#d4af37] rotate-180" />

        {/* 📮 Stamp */}
        <LoveStamp />

        {/* 📝 Content Preview - Use justify-center with gap to prevent pushing elements out */}
        <div className="absolute top-8 left-6 right-6 bottom-4 flex flex-col items-center justify-center gap-4">

          {/* Greeting */}
          <div className="mt-4 transform rotate-[-2deg] origin-left transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0">
            <h2 className="font-script text-2xl md:text-4xl text-[#9f1239] drop-shadow-sm pr-12 pb-2">
              {APOLOGY_CONTENT.greeting}
            </h2>
          </div>

          {/* Decorative Line / Handwriting */}
          <div className="w-full flex justify-center opacity-80 py-2">
            <HandwritingLines />
          </div>

          {/* Center Graphic */}
          <div className="mb-1 self-center opacity-80 animate-pulse">
            <div className="relative">
              <Heart className="text-rose-400 fill-rose-100" size={32} />
              {/* Tiny decorative leaves */}
              <svg className="absolute -left-5 top-2 w-5 h-5 text-green-700/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 6 4 8 2 12C4 16 8 18 12 22C12 16 12 10 12 2Z" />
              </svg>
              <svg className="absolute -right-5 top-2 w-5 h-5 text-green-700/40 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 6 4 8 2 12C4 16 8 18 12 22C12 16 12 10 12 2Z" />
              </svg>
            </div>
          </div>

        </div>

        {/* Light Sheen/Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default Letter;
