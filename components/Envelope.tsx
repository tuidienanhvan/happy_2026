
import React from 'react';
import WaxSeal, { CrabIcon } from './WaxSeal';
import Letter from './Letter';

interface Props {
  step: number; // 0: Closed, 1: Seal Drop, 2: Open Flap, 3: Letter Up, 4: Reading
  onOpen: () => void;
  onLetterClick: () => void;
}

const Envelope: React.FC<Props> = ({ step, onOpen, onLetterClick }) => {
  const W = 600;
  const H = 400;
  const CX = 300; 
  const CY = 240; 
  const OVERLAP = 30; 
  
  const BADGE_Y = CY * 0.55;

  const Defs = () => (
    <defs>
      {/* ... definitions ... */}
      <linearGradient id="pastelGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F9FAFB" />
        <stop offset="20%" stopColor="#FCD34D" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="80%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FFFBEB" />
      </linearGradient>

      <linearGradient id="paperPastel" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />    
        <stop offset="60%" stopColor="#FFF1F2" />   
        <stop offset="100%" stopColor="#FFE4E6" />  
      </linearGradient>

      <pattern id="luxuryHearts" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
         <path d="M15,23.5 C15,23.5 8,18 8,12 C8,8.5 10.5,6 13,8 C15.5,10 15,13 15,13 C15,13 14.5,10 17,8 C19.5,6 22,8.5 22,12 C22,18 15,23.5 15,23.5 Z" 
               fill="none" stroke="#F59E0B" strokeWidth="1.2" opacity="0.6" />
         <circle cx="15" cy="14" r="1.5" fill="#FCD34D" opacity="0.8" />
         <circle cx="0" cy="0" r="1" fill="#D97706" opacity="0.4" />
         <circle cx="30" cy="0" r="1" fill="#D97706" opacity="0.4" />
         <circle cx="0" cy="30" r="1" fill="#D97706" opacity="0.4" />
         <circle cx="30" cy="30" r="1" fill="#D97706" opacity="0.4" />
      </pattern>

      <pattern id="royalLattice" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#881337" />
          <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="none" stroke="#FCD34D" strokeWidth="0.5" opacity="0.4" />
          <circle cx="10" cy="10" r="1" fill="#F59E0B" />
          <circle cx="0" cy="0" r="1" fill="#F59E0B" />
          <circle cx="20" cy="0" r="1" fill="#F59E0B" />
          <circle cx="0" cy="20" r="1" fill="#F59E0B" />
          <circle cx="20" cy="20" r="1" fill="#F59E0B" />
      </pattern>

      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#831843" floodOpacity="0.4" />
        <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#881337" floodOpacity="0.3" />
      </filter>
      
      <linearGradient id="flapShadow" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="black" stopOpacity="0.15" />
         <stop offset="100%" stopColor="black" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="creaseShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4c0519" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  return (
    <div className="relative w-[340px] md:w-[600px] h-[226px] md:h-[400px]">
      
      {/* Sheen Animation */}
      <style>{`
        @keyframes sheen-sweep {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
          20% { opacity: 0.6; }
          40% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-white/40 blur-xl rounded-full opacity-60 -z-10"></div>

      {/* --- 1. BODY & BOTTOM FLAPS --- */}
      <div className="absolute inset-0 z-10">
        
        {/* A. INNER LINING */}
        <div className="absolute inset-0 bg-[#9f1239] rounded-sm overflow-hidden border border-rose-300 box-border shadow-inner">
             <div className="absolute inset-0 opacity-100" 
                  style={{ backgroundImage: 'radial-gradient(#be123c 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
             </div>
        </div>

        {/* B. LETTER */}
        <Letter isUp={step >= 3} onClick={onLetterClick} />

        {/* C. STATIC SVG FLAPS */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
           <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <Defs />
              <g>
                <path d={`M0,0 L0,${H} L${CX + OVERLAP},${CY} Z`} fill="url(#paperPastel)" />
                <path d={`M0,0 L0,${H} L${CX + OVERLAP},${CY} Z`} fill="url(#luxuryHearts)" opacity="0.5" />
                <path d={`M10,0 L10,${H} L${CX + OVERLAP - 15},${CY}`} fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
                <path d={`M0,0 L${CX + OVERLAP},${CY}`} fill="none" stroke="url(#pastelGold)" strokeWidth="1" />
              </g>

              <g>
                <path d={`M${W},0 L${W},${H} L${CX - OVERLAP},${CY} Z`} fill="url(#paperPastel)" />
                <path d={`M${W},0 L${W},${H} L${CX - OVERLAP},${CY} Z`} fill="url(#luxuryHearts)" opacity="0.5" />
                <path d={`M${W-10},0 L${W-10},${H} L${CX - OVERLAP + 15},${CY}`} fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
                <path d={`M${W},0 L${CX - OVERLAP},${CY}`} fill="none" stroke="url(#pastelGold)" strokeWidth="1" />
              </g>

              <g filter="url(#softShadow)">
                <path d={`M0,${H} L${W},${H} L${CX},${CY - OVERLAP} Z`} fill="url(#paperPastel)" />
                <path d={`M0,${H} L${W},${H} L${CX},${CY - OVERLAP} Z`} fill="url(#luxuryHearts)" opacity="0.8" />
                <path d={`M0,${H} L${W},${H} L${CX},${CY - OVERLAP} Z`} fill="url(#flapShadow)" opacity="0.3" />
                <path d={`M0,${H} L${CX},${CY - OVERLAP} L${W},${H}`} fill="none" stroke="url(#pastelGold)" strokeWidth="3" />
                <path d={`M15,${H} L${CX},${CY - OVERLAP + 15} L${W-15},${H}`} fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 3" />
              </g>
           </svg>
        </div>
        
        {/* SHEEN OVERLAY (Only visible on closed state) */}
        {step === 0 && (
            <div className="absolute inset-0 overflow-hidden rounded-lg z-30 pointer-events-none mix-blend-overlay">
                <div 
                    className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%]"
                    style={{
                        background: 'linear-gradient(to right, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
                        animation: 'sheen-sweep 5s infinite ease-in-out',
                        animationDelay: '1s'
                    }}
                ></div>
            </div>
        )}

      </div>

      {/* --- 2. TOP FLAP --- */}
      <div 
        className="absolute top-0 left-0 w-full z-20 pointer-events-none"
        style={{
          height: '60%', 
          perspective: '1200px',
          zIndex: step >= 3 ? 1 : 20 
        }}
      >
         <div 
            className="w-full h-full relative transition-transform duration-[1000ms] cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              transform: step >= 2 ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
         >
            {/* FRONT FACE */}
            <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ backfaceVisibility: 'hidden' }}>
               <svg className="w-full h-full overflow-visible pointer-events-none" viewBox={`0 0 ${W} ${H * 0.6}`} preserveAspectRatio="none">
                 <Defs />
                 <g filter="url(#softShadow)">
                    <path d={`M0,0 L${W},0 L${CX},${CY} Z`} fill="url(#paperPastel)" />
                    <path d={`M0,0 L${W},0 L${CX},${CY} Z`} fill="url(#luxuryHearts)" opacity="0.8" />
                    <path d={`M0,0 L${W},0 L${CX},${CY} Z`} fill="url(#flapShadow)" opacity="0.2" />
                    <path d={`M0,0 L${CX},${CY} L${W},0`} fill="none" stroke="url(#pastelGold)" strokeWidth="4" />
                    <path d={`M15,0 L${CX},${CY-18} L${W-15},0`} fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.9" />
                    <path d={`M${CX},${CY-50} Q${CX-30},${CY-80} ${CX-60},${CY-50} T${CX-100},${CY-40}`} fill="none" stroke="url(#pastelGold)" strokeWidth="2" strokeLinecap="round" />
                    <path d={`M${CX},${CY-50} Q${CX+30},${CY-80} ${CX+60},${CY-50} T${CX+100},${CY-40}`} fill="none" stroke="url(#pastelGold)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx={CX} cy={CY-60} r="4" fill="#F59E0B" stroke="white" strokeWidth="1" />
                 </g>
               </svg>
               {/* SHEEN ON FLAP */}
                {step === 0 && (
                    <div className="absolute inset-0 overflow-hidden z-30 mix-blend-overlay" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
                        <div 
                            className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%]"
                            style={{
                                background: 'linear-gradient(to right, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
                                animation: 'sheen-sweep 5s infinite ease-in-out',
                                animationDelay: '1.2s'
                            }}
                        ></div>
                    </div>
                )}
            </div>

            {/* BACK FACE */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)' 
              }}
            >
               <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${W} ${H * 0.6}`} preserveAspectRatio="none">
                  <path d={`M0,0 L${W},0 L${CX},${CY} Z`} fill="url(#paperPastel)" />
                  <path d={`M8,0 L${W-8},0 L${CX},${CY-12} Z`} fill="url(#royalLattice)" />
                  <path d={`M8,0 L${CX},${CY-12} L${W-8},0`} fill="none" stroke="url(#pastelGold)" strokeWidth="3" />
                  <g opacity="0.9" transform={`rotate(180, ${CX}, ${BADGE_Y})`}>
                      <circle cx={CX} cy={BADGE_Y} r="26" fill="none" stroke="url(#pastelGold)" strokeWidth="1.5" />
                      <circle cx={CX} cy={BADGE_Y} r="22" fill="none" stroke="url(#pastelGold)" strokeWidth="0.5" strokeDasharray="3 2" />
                      <CrabIcon x={CX - 18} y={BADGE_Y - 18} size={36} />
                  </g>
                  <rect x="0" y="0" width={W} height="40" fill="url(#creaseShadow)" />
               </svg>
            </div>
         </div>
      </div>

      {/* --- 3. LUXURY SEAL --- */}
      <WaxSeal 
        onClick={onOpen} 
        isVisible={step === 0}
        style={{ 
            top: `${(CY / H) * 100}%`, 
            left: '50%',
        }} 
      />

    </div>
  );
};

export default Envelope;
