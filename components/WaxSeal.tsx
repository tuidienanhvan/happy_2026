import React from 'react';

// 🦀 ROYAL GOLDEN CRAB - Realistic/Heraldic Style
// Now exported and accepts SVGProps for positioning (x, y)
export const CrabIcon = ({ size = 24, className = "", ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    fill="none" 
    className={className}
    {...props}
  >
    <defs>
      {/* Body Gold Gradient - Metallic Look */}
      <linearGradient id="goldBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />   {/* Light */}
        <stop offset="40%" stopColor="#F59E0B" />   {/* Gold */}
        <stop offset="100%" stopColor="#B45309" />  {/* Bronze */}
      </linearGradient>

      {/* Stroke for definition */}
      <linearGradient id="goldStroke" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      
      {/* Sharp Shadow for Embossed effect */}
      <filter id="embossShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="rgba(0,0,0,0.5)" />
      </filter>
    </defs>
    
    <g filter="url(#embossShadow)">
        {/* --- LEGS (Sharp and Angled - Realistic) --- */}
        {/* Left Legs */}
        <path d="M30,65 Q15,60 10,75" stroke="url(#goldBody)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M28,80 Q12,85 15,95" stroke="url(#goldBody)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M35,90 Q25,100 30,105" stroke="url(#goldBody)" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        {/* Right Legs */}
        <path d="M90,65 Q105,60 110,75" stroke="url(#goldBody)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M92,80 Q108,85 105,95" stroke="url(#goldBody)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M85,90 Q95,100 90,105" stroke="url(#goldBody)" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* --- CLAWS (Strong & Distinct) --- */}
        {/* Left Arm Segment */}
        <path d="M35,55 L25,45" stroke="url(#goldBody)" strokeWidth="6" strokeLinecap="round" />
        {/* Left Pincer */}
        <path d="M25,45 C10,35 10,15 30,25 C25,30 25,35 25,45 Z" fill="url(#goldBody)" stroke="url(#goldStroke)" strokeWidth="1" />
        <path d="M25,45 C35,35 40,20 30,25" fill="none" stroke="url(#goldStroke)" strokeWidth="1" /> {/* Claw separation */}

        {/* Right Arm Segment */}
        <path d="M85,55 L95,45" stroke="url(#goldBody)" strokeWidth="6" strokeLinecap="round" />
        {/* Right Pincer */}
        <path d="M95,45 C110,35 110,15 90,25 C95,30 95,35 95,45 Z" fill="url(#goldBody)" stroke="url(#goldStroke)" strokeWidth="1" />
         <path d="M95,45 C85,35 80,20 90,25" fill="none" stroke="url(#goldStroke)" strokeWidth="1" />

        {/* --- MAIN SHELL (Carapace - Hexagonal/Trapezoid shape) --- */}
        <path d="M40,50 
                 L80,50 
                 Q95,60 90,80 
                 Q60,95 30,80 
                 Q25,60 40,50 Z" 
              fill="url(#goldBody)" stroke="url(#goldStroke)" strokeWidth="1.5" />
        
        {/* Shell Detail lines */}
        <path d="M60,50 L60,85" stroke="#B45309" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M40,50 Q50,65 60,70" stroke="#B45309" strokeWidth="1" strokeOpacity="0.3" fill="none" />
        <path d="M80,50 Q70,65 60,70" stroke="#B45309" strokeWidth="1" strokeOpacity="0.3" fill="none" />

        {/* Eyes (Small stalks) */}
        <circle cx="50" cy="48" r="3" fill="url(#goldBody)" stroke="#78350F" strokeWidth="0.5" />
        <circle cx="70" cy="48" r="3" fill="url(#goldBody)" stroke="#78350F" strokeWidth="0.5" />
    </g>
  </svg>
);

interface Props {
  onClick: () => void;
  isVisible: boolean;
  style?: React.CSSProperties;
}

const WaxSeal: React.FC<Props> = ({ onClick, isVisible, style }) => {
  return (
      <>
        <style>{`
          @keyframes wax-drop {
            0% { transform: scale(1); }
            20% { transform: scale(1.15); } /* Pop up slightly */
            100% { transform: translateY(400px) rotate(25deg); opacity: 0; } /* Drop down */
          }
          .animate-wax-drop {
            animation: wax-drop 0.8s cubic-bezier(0.5, 0, 0.75, 0) forwards;
            pointer-events: none; /* Prevent clicks while falling */
          }
        `}</style>
        
        <div 
            onClick={isVisible ? onClick : undefined}
            // Add pointer-events-auto explicitly to override any parent issues
            // Use translate3d to force layer promotion and ensure it sits ON TOP of the 3D envelope
            className={`absolute z-[100] cursor-pointer group flex items-center justify-center pointer-events-auto`}
            style={{
                top: style?.top || 'auto',
                left: style?.left || 'auto',
                // Important: Use translate3d with a positive Z value to physically place it above the envelope in 3D space
                transform: 'translate3d(-50%, -50%, 20px)', 
                width: '200px', // Fixed larger click area
                height: '100px',
            }}
        >
            {/* 
                INNER GROUP
                Holds both the Bar and the Seal.
                We animate THIS group so both drop together.
            */}
            <div className={`relative flex items-center justify-center ${isVisible ? 'group-hover:scale-105 transition-transform duration-300' : 'animate-wax-drop'}`}>
                
                {/* 1. The Gold Bar Ribbon (Underneath) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-8 flex items-center justify-center">
                   <div className={`w-full h-[2px] bg-gradient-to-r from-transparent via-[#FCD34D] to-transparent shadow-[0_0_10px_rgba(252,211,77,0.8)] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* 2. The Wax Seal (On Top) */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Glow only visible when active */}
                      <div className={`absolute inset-0 bg-red-500 rounded-full blur-xl transition-opacity duration-500 ${isVisible ? 'opacity-30 group-hover:opacity-50' : 'opacity-0'}`}></div>
                      
                      {/* SEAL BODY */}
                      <div className="w-20 h-20 bg-gradient-to-br from-[#e11d48] via-[#be123c] to-[#9f1239] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.4)] border-2 border-[#fb7185] flex items-center justify-center relative">
                          
                          {/* Decoration on outer rim */}
                          <div className="absolute inset-1 rounded-full border border-[#881337] opacity-40 border-dashed"></div>
                          
                          {/* THE DOUBLE RIM (INNER CIRCLE) */}
                          <div className="w-14 h-14 rounded-full bg-[#9f1239] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center border-b border-white/10">
                               {/* Royal Crab Icon */}
                               <CrabIcon size={40} className="drop-shadow-sm" />
                          </div>
                          
                          {/* Wax shine */}
                          <div className="absolute top-3 left-4 w-6 h-3 bg-white opacity-20 rounded-full blur-[2px] rotate-[-20deg]"></div>
                      </div>
                </div>

            </div>
        </div>
      </>
  );
};

export default WaxSeal;