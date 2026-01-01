import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { CornerFlourish, LoveStamp } from '../components/Letter';
import { APOLOGY_CONTENT } from '../constants';
import { playSound } from '../utils/audio-manager';

interface Props {
    onForgive: () => void;
}

const LetterScreen: React.FC<Props> = ({ onForgive }) => {
    const [noBtnPos, setNoBtnPos] = useState<{ x: number, y: number } | null>(null);

    const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
        if (e) e.stopPropagation();
        playSound('sparkle'); // Playful sparkle when NO button evades
        const rangeX = 100;
        const rangeY = 60;
        const x = (Math.random() - 0.5) * rangeX;
        const y = (Math.random() - 0.5) * rangeY;
        setNoBtnPos({ x, y });
    };

    const handleForgive = () => {
        playSound('success');
        onForgive();
    };

    return (
        // Card content fills the FlipCard container
        <div className="w-full h-full bg-[#fffbf0] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col relative">

            <style>{`
            @keyframes tilt-in {
              0% { transform: scale(0.95) translateY(20px); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            
            /* Mobile portrait responsive - only affects screens < 768px AND portrait */
            @media screen and (max-width: 767px) and (orientation: portrait) {
              .letter-content { padding: 1rem !important; }
              .letter-header h2 { font-size: 2rem !important; }
              .letter-body p { font-size: 1rem !important; line-height: 1.4 !important; }
              .letter-body { gap: 0.5rem !important; overflow-y: auto !important; }
              .letter-sign { font-size: 1.5rem !important; }
              .letter-btn-text { font-size: 1.25rem !important; }
              .letter-btn-icon { width: 20px !important; height: 20px !important; }
            }
            
            /* Mobile landscape - reduce height-based elements */
            @media screen and (max-width: 900px) and (orientation: landscape) {
              .letter-content { padding: 0.5rem 1rem !important; }
              .letter-header { margin-bottom: 0.25rem !important; margin-top: 0.25rem !important; }
              .letter-body { gap: 0.25rem !important; overflow-y: auto !important; }
              .letter-body p { font-size: 0.875rem !important; line-height: 1.3 !important; }
              .letter-sign { font-size: 1.25rem !important; margin-top: 0.25rem !important; }
              .letter-actions { margin-top: 0.25rem !important; min-height: 50px !important; }
            }
          `}</style>

            {/* Paper Texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Gold Border Frame */}
            <div className="absolute inset-2 md:inset-4 border-4 border-double border-[#d4af37] opacity-80 pointer-events-none"></div>

            {/* Corner Ornaments */}
            <CornerFlourish className="absolute top-3 left-3 md:top-5 md:left-5 w-12 h-12 md:w-16 md:h-16 text-[#d4af37]" />
            <CornerFlourish className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-12 h-12 md:w-16 md:h-16 text-[#d4af37] rotate-180" />

            {/* Stamp */}
            <div className="absolute top-6 right-2 md:top-7 md:right-3 transform rotate-12 opacity-90 scale-125 md:scale-150 z-10 origin-top-right">
                <LoveStamp />
            </div>

            {/* Content */}
            <div className="letter-content relative z-10 flex flex-col h-full py-8 px-4 md:px-12 md:py-10">

                {/* HEADER */}
                <div className="letter-header w-full text-left mb-6 md:mb-10 mt-4 md:mt-6 pl-2">
                    <h2 className="font-script text-5xl md:text-7xl text-[#9f1239] font-bold drop-shadow-sm rotate-[-2deg] origin-bottom-left">
                        {APOLOGY_CONTENT.greeting}
                    </h2>
                </div>

                {/* BODY */}
                <div className="letter-body flex-1 flex flex-col justify-center space-y-3 md:space-y-4 text-left pl-2 md:pl-4 pr-2">
                    {APOLOGY_CONTENT.paragraphs.map((para, idx) => (
                        <p key={idx} className="font-hand text-2xl md:text-3xl font-bold text-[#5d2e0c] leading-relaxed">
                            {para}
                        </p>
                    ))}
                    <p className="letter-sign font-script text-4xl text-right text-[#be123c] mt-4 pr-8">
                        {APOLOGY_CONTENT.sign}
                    </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="letter-actions mt-4 pt-2 w-full flex items-center justify-center gap-8 md:gap-16 relative min-h-[70px]">

                    {/* YES BUTTON */}
                    <button
                        onClick={handleForgive}
                        className="group relative transition-transform duration-300 hover:scale-105 hover:-rotate-1 z-20"
                    >
                        <div className="absolute inset-0 bg-[#ffe4e6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[255px_15px_225px_15px/15px_225px_15px_255px]"></div>
                        <div
                            className="relative border-2 border-[#e11d48] px-8 py-3 flex items-center gap-3 bg-[#fff0f3]/90 backdrop-blur-[1px] shadow-sm transition-all"
                            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                        >
                            <Heart className="letter-btn-icon fill-[#e11d48] text-[#e11d48] animate-pulse" size={32} />
                            <span className="letter-btn-text font-hand text-3xl md:text-4xl font-bold text-[#be123c]">{APOLOGY_CONTENT.btnYes}</span>
                        </div>
                    </button>

                    {/* NO BUTTON */}
                    <div className="relative w-[150px] h-[50px] flex items-center justify-center z-50">
                        <button
                            onMouseEnter={moveNoButton}
                            onTouchStart={moveNoButton}
                            onClick={moveNoButton}
                            style={{
                                transform: `translate(${noBtnPos?.x || 0}px, ${noBtnPos?.y || 0}px)`,
                                transition: 'transform 0.1s linear'
                            }}
                            className="absolute group px-4 py-2 cursor-pointer"
                        >
                            <span className="font-hand text-2xl md:text-4xl font-bold text-[#78350f] opacity-70 group-hover:opacity-100 transition-all underline decoration-wavy decoration-[#78350f]/50 underline-offset-4 whitespace-nowrap">
                                {APOLOGY_CONTENT.btnNo}
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LetterScreen;
