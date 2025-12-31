
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Envelope from './Envelope';
import { CornerFlourish, LoveStamp } from './Letter';
import { APOLOGY_CONTENT } from '../constants';
import StageSuccess from './StageSuccess';

interface Props {
  onForgive: () => void;
}

const StageEnvelope: React.FC<Props> = ({ onForgive }) => {
  // STEP DEFINITIONS:
  // 0: Initial (Sealed)
  // 1: Seal Drops
  // 2: Flap Opens
  // 3: Letter Slides Out
  // 4: Full Screen Read (Front) -> Flipped (Back = Success)
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0); 
  const [isFlipped, setIsFlipped] = useState(false);
  
  // State for the "No" button position
  const [noBtnPos, setNoBtnPos] = useState<{x: number, y: number} | null>(null);

  const handleOpenSequence = () => {
    if (step > 0) return;
    setStep(1); 
    setTimeout(() => setStep(2), 900); 
    setTimeout(() => setStep(3), 1800); 
  };

  const handleLetterClick = () => {
    if (step === 3) {
      setStep(4);
    }
  };

  const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation(); 
    // Constrain the movement range
    const rangeX = 100; 
    const rangeY = 60;
    const x = (Math.random() - 0.5) * rangeX;
    const y = (Math.random() - 0.5) * rangeY;
    setNoBtnPos({ x, y });
  };

  const handleForgive = () => {
    // TRIGGER FLIP ANIMATION
    setIsFlipped(true);
    // Note: We do NOT call parent onForgive() immediately to keep the card visible while flipping.
    // The BackFace of this component now renders the StageSuccess content directly.
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative perspective-[2000px] overflow-hidden">
      
      {/* Enhanced Glow Animations */}
      <style>{`
        @keyframes glow-spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes glow-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes glow-pulse-deep {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
        .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
      `}</style>

      {/* --- ENVELOPE STAGE WRAPPER --- */}
      <div 
        className="transition-all duration-[1500px] ease-in-out relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: step === 4 
            ? 'scale(3) translateY(300px) opacity-0' 
            : 'scale(1) rotateX(10deg)', 
          // Hide envelope when reading/flipped
          pointerEvents: step === 4 ? 'none' : 'auto'
        }}
      >
        {/* --- HOLY GLOW EFFECT --- */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0 -z-10 pointer-events-none">
            {/* Layer 1: Gold Conic Beams */}
            <div 
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[80px] opacity-40"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(251, 191, 36, 0.3) 60deg, transparent 120deg, rgba(251, 191, 36, 0.3) 180deg, transparent 240deg, rgba(251, 191, 36, 0.3) 300deg, transparent 360deg)',
                animation: 'glow-spin-slow 20s linear infinite'
              }}
            ></div>
             {/* Layer 2: Red Conic Beams (Counter Rotate) */}
            <div 
              className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full blur-[60px] opacity-30"
              style={{
                background: 'conic-gradient(from 15deg, transparent 0deg, rgba(225, 29, 72, 0.3) 60deg, transparent 120deg, rgba(225, 29, 72, 0.3) 180deg, transparent 240deg, rgba(225, 29, 72, 0.3) 300deg, transparent 360deg)',
                animation: 'glow-spin-reverse 25s linear infinite'
              }}
            ></div>

            {/* Layer 3: Central Core Pulse */}
            <div 
              className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full blur-[80px]"
              style={{
                background: 'radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(225, 29, 72, 0.2) 50%, transparent 100%)',
                animation: 'glow-pulse-deep 4s ease-in-out infinite'
              }}
            ></div>
        </div>
        
        {/* The Envelope Component */}
        <Envelope step={step} onOpen={handleOpenSequence} onLetterClick={handleLetterClick} />
      </div>

      {/* --- READING MODE / FLIP CARD CONTAINER (Step 4) --- */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-1000 ${step === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
      >
        {/* THE 3D FLIPPING CONTAINER */}
        <div className="relative w-full max-w-[1000px] aspect-[4/5] md:aspect-[3/2] animate-[drift_10s_ease-in-out_infinite] perspective-[2000px]">
            
            {/* The Moving Card Wrapper that Rotates */}
            <div className={`relative w-full h-full transition-transform duration-[1200ms] cubic-bezier(0.45, 0.05, 0.55, 0.95) transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* === FRONT FACE: APOLOGY LETTER === */}
                <div className="absolute inset-0 backface-hidden bg-[#fffbf0] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col">
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
                    <div className="relative z-10 flex flex-col h-full py-8 px-4 md:px-12 md:py-10">
                        
                        {/* HEADER - Increased Top Margin for spacing */}
                        <div className="w-full text-left mb-6 md:mb-10 mt-10 md:mt-12 pl-2">
                            <h2 className="font-script text-5xl md:text-7xl text-[#9f1239] font-bold drop-shadow-sm rotate-[-2deg] origin-bottom-left">
                                {APOLOGY_CONTENT.greeting}
                            </h2>
                        </div>
                        
                        {/* BODY */}
                        <div className="flex-1 flex flex-col justify-center space-y-6 text-left pl-2 md:pl-4 pr-2">
                            {APOLOGY_CONTENT.paragraphs.map((para, idx) => (
                                <p key={idx} className="font-hand text-2xl md:text-3xl font-bold text-[#5d2e0c] leading-relaxed">
                                    {para}
                                </p>
                            ))}
                            <p className="font-script text-4xl text-right text-[#be123c] mt-4 pr-8">
                                {APOLOGY_CONTENT.sign}
                            </p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-8 pt-4 w-full flex items-center justify-center gap-8 md:gap-16 relative min-h-[100px]">
                            
                            {/* YES BUTTON - Triggers Flip */}
                            <button 
                                onClick={handleForgive}
                                className="group relative transition-transform duration-300 hover:scale-105 hover:-rotate-1 z-20"
                            >
                                <div className="absolute inset-0 bg-[#ffe4e6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[255px_15px_225px_15px/15px_225px_15px_255px]"></div>
                                <div 
                                    className="relative border-2 border-[#e11d48] px-8 py-3 flex items-center gap-3 bg-[#fff0f3]/90 backdrop-blur-[1px] shadow-sm transition-all"
                                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                                >
                                    <Heart className="fill-[#e11d48] text-[#e11d48] animate-pulse" size={32} />
                                    <span className="font-hand text-3xl md:text-4xl font-bold text-[#be123c]">{APOLOGY_CONTENT.btnYes}</span>
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

                {/* === BACK FACE: SUCCESS CERTIFICATE === */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 overflow-visible">
                    {/* Render StageSuccess without wrappers to fit the card */}
                    <StageSuccess isEmbedded={true} isActive={isFlipped} />
                </div>

            </div>
        </div>
      </div>

    </div>
  );
};

export default StageEnvelope;
