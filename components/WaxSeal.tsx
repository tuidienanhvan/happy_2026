import React from 'react';
import { audioManager, playSound } from '../utils/audio-manager';

// 🌸 CHRYSANTHEMUM FLOWER - Traditional Golden Style
// Exported and accepts SVGProps for positioning (x, y)
export const ChrysanthemumIcon = ({ size = 24, className = "", ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
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
      {/* Petal Gold Gradient - Metallic Look */}
      <linearGradient id="goldPetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="40%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>

      {/* Center gradient - deeper gold */}
      <radialGradient id="goldCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="60%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>

      {/* Stroke for definition */}
      <linearGradient id="petalStroke" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>

      {/* Shadow filter */}
      <filter id="flowerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.4)" />
      </filter>
    </defs>

    <g filter="url(#flowerShadow)">
      {/* --- OUTER PETALS (16 petals) --- */}
      {[...Array(16)].map((_, i) => (
        <ellipse
          key={`outer-${i}`}
          cx="60"
          cy="25"
          rx="8"
          ry="22"
          fill="url(#goldPetal)"
          stroke="url(#petalStroke)"
          strokeWidth="0.5"
          transform={`rotate(${i * 22.5} 60 60)`}
        />
      ))}

      {/* --- MIDDLE PETALS (12 petals, shorter) --- */}
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={`mid-${i}`}
          cx="60"
          cy="35"
          rx="6"
          ry="16"
          fill="url(#goldPetal)"
          stroke="url(#petalStroke)"
          strokeWidth="0.5"
          transform={`rotate(${i * 30 + 15} 60 60)`}
        />
      ))}

      {/* --- INNER PETALS (8 petals, smallest) --- */}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="60"
          cy="45"
          rx="5"
          ry="10"
          fill="url(#goldPetal)"
          stroke="url(#petalStroke)"
          strokeWidth="0.5"
          transform={`rotate(${i * 45 + 22.5} 60 60)`}
        />
      ))}

      {/* --- FLOWER CENTER --- */}
      <circle cx="60" cy="60" r="12" fill="url(#goldCenter)" stroke="#92400E" strokeWidth="1" />
      
      {/* Center details - small dots */}
      {[...Array(6)].map((_, i) => (
        <circle
          key={`dot-${i}`}
          cx={60 + 6 * Math.cos((i * 60 * Math.PI) / 180)}
          cy={60 + 6 * Math.sin((i * 60 * Math.PI) / 180)}
          r="1.5"
          fill="#78350F"
          opacity="0.6"
        />
      ))}
      <circle cx="60" cy="60" r="3" fill="#78350F" opacity="0.5" />
    </g>
  </svg>
);

// Keep CrabIcon as alias for backward compatibility
export const CrabIcon = ChrysanthemumIcon;

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
            0% { transform: scale(1) translateZ(0); }
            20% { transform: scale(1.15) translateZ(0); } /* Pop up slightly */
            100% { transform: translateY(400px) rotate(25deg) translateZ(0); opacity: 0; } /* Drop down */
          }
          .animate-wax-drop {
            animation: wax-drop 0.8s cubic-bezier(0.5, 0, 0.75, 0) forwards;
            pointer-events: none;
            will-change: transform, opacity;
          }
        `}</style>

      <div
        onClick={isVisible ? (e) => {
          e.preventDefault();
          e.stopPropagation();
          audioManager.toggleMusic();
          playSound('click');
          onClick();
        } : undefined}
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