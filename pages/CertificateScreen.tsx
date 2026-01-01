import React from 'react';
import { Heart, Star, Gift, CheckCircle2, Sparkles } from 'lucide-react';
import { CornerFlourish } from '../components/Letter';
import { playSound, audioManager } from '../utils/audio-manager';

const CertificateScreen: React.FC = () => {

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
        
        /* Mobile portrait responsive */
        @media screen and (max-width: 767px) and (orientation: portrait) {
          .cert-content { padding: 0.5rem !important; }
          .cert-name { font-size: 2.5rem !important; padding: 0.5rem !important; }
          .cert-body-main { font-size: 1rem !important; }
          .cert-body-sub { font-size: 0.75rem !important; }
          .cert-voucher h3 { font-size: 1rem !important; }
          .cert-voucher p { font-size: 0.625rem !important; }
          .cert-footer { gap: 1rem !important; padding: 0 0.5rem !important; }
          .cert-footer-days { font-size: 1.25rem !important; }
          .cert-footer-sign { font-size: 1.75rem !important; }
          .cert-stamp { bottom: 60px !important; right: 8px !important; }
          .cert-stamp > div { width: 50px !important; height: 50px !important; }
        }
        
        /* Mobile landscape responsive */
        @media screen and (max-width: 900px) and (orientation: landscape) {
          .cert-content { padding: 0.25rem 0.5rem !important; gap: 0.25rem !important; }
          .cert-header { margin-top: 0 !important; }
          .cert-header h2 { font-size: 0.875rem !important; }
          .cert-name { font-size: 2rem !important; padding: 0.25rem !important; margin: 0 !important; }
          .cert-name-label { font-size: 0.625rem !important; }
          .cert-body { gap: 0.125rem !important; }
          .cert-body-main { font-size: 0.875rem !important; }
          .cert-body-sub { font-size: 0.625rem !important; }
          .cert-voucher { margin-top: 0 !important; padding: 0.25rem !important; }
          .cert-voucher h3 { font-size: 0.875rem !important; }
          .cert-voucher p { font-size: 0.5rem !important; }
          .cert-footer { margin-top: 0 !important; gap: 0.5rem !important; }
          .cert-footer-days { font-size: 1rem !important; }
          .cert-footer-sign { font-size: 1.25rem !important; }
          .cert-stamp { bottom: 30px !important; right: 4px !important; }
          .cert-stamp > div { width: 40px !important; height: 40px !important; }
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
      <div className="cert-content relative z-10 w-full h-full flex flex-col items-center justify-between p-4 md:p-8 text-center">

        {/* Header */}
        <div className="cert-header flex flex-col items-center w-full mt-2">
          <div className="flex items-center gap-3 opacity-80 mb-2">
            <div className="h-[1px] w-12 bg-rose-400"></div>
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <div className="h-[1px] w-12 bg-rose-400"></div>
          </div>
          <h2 className="font-nunito uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#881337] text-lg md:text-2xl font-extrabold bg-gradient-to-r from-[#881337] via-[#be123c] to-[#881337] bg-clip-text text-transparent drop-shadow-sm">
            Giấy Chứng Nhận Tình Yêu
          </h2>
        </div>

        {/* Name */}
        <div className="relative w-full flex flex-col items-center my-2">
          <span className="cert-name-label font-hand text-rose-900/70 text-lg md:text-xl italic mb-[-5px] font-semibold">Trao tặng cho bé yêu:</span>
          <div className="cert-name font-script text-7xl md:text-9xl p-4 transform -rotate-2 hover:scale-105 transition-transform duration-500 cursor-default">
            <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(255,200,200,1)]">
              Cua Bé Bỏng
            </span>
          </div>
          <div className="w-1/3 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent rounded-full mt-2"></div>
        </div>

        {/* Body */}
        <div className="cert-body max-w-[90%] space-y-2 md:space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-green-600 drop-shadow-sm" size={32} />
            <p className="cert-body-main font-nunito text-2xl md:text-3xl text-rose-950 font-extrabold tracking-tight">
              Đã chính thức <span className="text-[#e11d48] underline decoration-wavy decoration-3 underline-offset-4 decoration-rose-300">tha thứ</span> cho anh.
            </p>
          </div>
          <p className="cert-body-sub font-nunito text-lg md:text-xl text-slate-700 leading-relaxed font-semibold">
            Chứng nhận này xác nhận quyền được <br className="md:hidden" />
            <span className="relative inline-block px-2 mx-1">
              <span className="absolute inset-0 transform -skew-x-12 bg-yellow-200/80 rounded-sm mix-blend-multiply"></span>
              <span className="relative font-bold text-[#9a3412]">chiều chuộng & yêu thương</span>
            </span>
            vô điều kiện.
          </p>
        </div>

        {/* Voucher */}
        <div className="cert-voucher w-full max-w-2xl relative group/voucher mt-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-lg opacity-40 blur-sm group-hover/voucher:opacity-60 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-[#fff7ed] to-[#fff1f2] border-2 border-dashed border-[#fbbf24] rounded-lg p-4 md:p-6 shadow-sm flex items-center justify-between gap-4 overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] text-yellow-500/10 rotate-12 transform scale-150">
              <Gift size={120} />
            </div>
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
            <div className="flex-shrink-0 bg-white/60 p-3 rounded-full border border-rose-200 shadow-sm z-10">
              <Gift size={32} className="text-rose-600" />
            </div>
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 animate-[shimmer_3s_infinite]"></div>
          </div>
        </div>

        {/* Footer & Signature */}
        <div className="cert-footer w-full grid grid-cols-2 gap-8 mt-2 md:mt-4 px-4 md:px-12 items-end">
          <div className="flex flex-col items-center">
            <span className="cert-footer-days font-hand text-3xl md:text-4xl text-rose-950 font-bold mb-1">198 ngày</span>
            <div className="w-24 h-[2px] bg-rose-200"></div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-800/60 mt-2 font-bold">Together</span>
          </div>
          <div className="flex flex-col items-center relative">
            <span className="cert-footer-sign font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-rose-600 to-red-800 font-bold transform -rotate-6 relative z-10 pb-2 pr-2 drop-shadow-sm">
              Từ Anh Văn
            </span>
            <svg className="w-40 h-6 text-rose-700 overflow-visible mt-[-10px]" viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10,10 Q40,15 80,10 T150,10" className="animate-[sign-flow_2s_ease-out_forwards]" strokeDasharray="160" />
            </svg>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-rose-800/60 mt-1 font-bold">Authorized Signature</span>
          </div>
        </div>

        {/* Ink Stamp - CLICKABLE FOR MUSIC */}
        <div
          onClick={() => { audioManager.toggleMusic(); playSound('click'); }}
          className="cert-stamp absolute bottom-24 right-8 md:bottom-28 md:right-12 transform mix-blend-multiply z-40 cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 animate-[stamp-bounce_0.5s_ease-out_0.3s_forwards] opacity-0"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 border-[4px] border-red-700 rounded-full flex flex-col items-center justify-center p-2 transform rotate-[-15deg] opacity-90 mask-grunge bg-red-50/10 backdrop-blur-[1px]">
            <div className="w-full h-full border border-red-700 rounded-full flex flex-col items-center justify-center border-dashed">
              <Heart size={16} className="text-red-700 fill-red-700 mb-1" />
              <span className="font-black text-red-700 text-[10px] md:text-xs uppercase tracking-widest">Official</span>
              <span className="font-black text-red-700 text-base md:text-lg uppercase tracking-tighter leading-none">LOVE</span>
              <span className="font-black text-red-700 text-[0.5rem] uppercase tracking-wide mt-1">Confirmed</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificateScreen;
