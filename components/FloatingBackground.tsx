
import React, { useMemo } from 'react';

interface Props {
  stage: any;
}

// 🏮 SVG: Floating Lantern (Optimized)
const LanternSVG = React.memo(({ style, color }: { style: React.CSSProperties; color: string }) => (
  <div style={style} className="absolute flex flex-col items-center opacity-90 will-change-transform">
    {/* String */}
    <div className="w-[1px] h-10 bg-yellow-200/50 mb-[-2px]"></div>
    
    {/* Lantern Body */}
    <div className="relative">
        {/* Glow - Reduced radius for performance */}
        <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md opacity-40 animate-pulse"></div>
        <svg viewBox="0 0 100 120" width="100%" height="100%" className="drop-shadow-md">
        <defs>
            <radialGradient id={`lanternGrad-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffeb3b" /> 
            <stop offset="60%" stopColor={color} />
            <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
        </defs>
        <path d="M30,10 L70,10 L75,15 L25,15 Z" fill="#4a0404" />
        <path d="M25,15 Q10,40 25,95 L75,95 Q90,40 75,15 Z" fill={`url(#lanternGrad-${color})`} />
        <path d="M50,15 L50,95" stroke="#4a0404" strokeWidth="0.5" opacity="0.5" />
        <path d="M30,95 L70,95 L65,100 L35,100 Z" fill="#4a0404" />
        </svg>
    </div>
    
    {/* Tassel - Simplified DOM */}
    <div className="flex flex-col items-center mt-[-2px]">
        <div className="w-[2px] h-2 bg-red-900"></div>
        <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
        <div className="w-[1px] h-8 bg-red-600/80"></div>
    </div>
  </div>
));

// 🌸 SVG: Blossom (Optimized)
const BlossomSVG = React.memo(({ style }: { style: React.CSSProperties }) => (
  <svg viewBox="0 0 50 50" style={style} className="absolute opacity-90 drop-shadow-sm will-change-transform">
    <defs>
      <radialGradient id="petalGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffecf2" />
        <stop offset="100%" stopColor="#f43f5e" />
      </radialGradient>
    </defs>
    <path d="M25,25 Q35,5 25,0 Q15,5 25,25 Z" fill="url(#petalGrad)" transform="rotate(0 25 25)" />
    <path d="M25,25 Q45,15 50,25 Q45,35 25,25 Z" fill="url(#petalGrad)" transform="rotate(72 25 25)" />
    <path d="M25,25 Q35,45 25,50 Q15,45 25,25 Z" fill="url(#petalGrad)" transform="rotate(144 25 25)" />
    <path d="M25,25 Q5,35 0,25 Q5,15 25,25 Z" fill="url(#petalGrad)" transform="rotate(216 25 25)" />
    <path d="M25,25 Q15,5 25,0 Q35,5 25,25 Z" fill="url(#petalGrad)" transform="rotate(288 25 25)" />
    <circle cx="25" cy="25" r="3" fill="#fbbf24" />
  </svg>
));

const FloatingBackground: React.FC<Props> = () => {
  
  const lanterns = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, 
    size: Math.random() * 40 + 40, // Reduced max size slightly
    duration: Math.random() * 15 + 20 + 's',
    delay: -Math.random() * 20 + 's', // Negative delay to start mid-animation
    color: Math.random() > 0.5 ? '#dc2626' : (Math.random() > 0.5 ? '#f59e0b' : '#be123c'),
    swayDuration: Math.random() * 4 + 3 + 's'
  })), []);

  const blossoms = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 12 + 8,
    duration: Math.random() * 10 + 10 + 's',
    delay: -Math.random() * 15 + 's', 
    rotation: Math.random() * 360
  })), []);

  const fireflies = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1, // Smaller for better performance
    duration: Math.random() * 4 + 4 + 's',
    floatDuration: Math.random() * 20 + 15 + 's',
    delay: -Math.random() * 10 + 's'
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#1a0505]">
      <style>{`
        /* GPU Optimized Animations using translate3d */
        
        @keyframes subtle-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes float-up-gpu {
            0% { transform: translate3d(0, 110vh, 0) scale(0.8); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate3d(20px, -20vh, 0) scale(0.9); opacity: 0; }
        }

        @keyframes sway {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }

        @keyframes fall-down-gpu {
            0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translate3d(40px, 110vh, 0) rotate(360deg); opacity: 0.8; }
        }

        @keyframes firefly-move-gpu {
            0% { transform: translate3d(0, 0, 0); opacity: 0; }
            20% { opacity: 1; }
            50% { transform: translate3d(30px, -30px, 0); opacity: 0.5; }
            80% { opacity: 1; }
            100% { transform: translate3d(-10px, -50px, 0); opacity: 0; }
        }
      `}</style>

      {/* 1. Base Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#2a0a12] via-[#3f070f] to-[#1e1b4b]"
        style={{
            backgroundSize: '200% 200%',
            animation: 'subtle-shift 20s ease infinite',
            transform: 'translate3d(0,0,0)' // Force layer
        }}
      ></div>

      {/* 2. Static Glows (Optimized) */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/5 rounded-full blur-[80px] pointer-events-none mix-blend-screen transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-orange-900/30 to-transparent pointer-events-none"></div>

      {/* 3. Fireflies */}
      {fireflies.map((f) => (
        <div
            key={`firefly-${f.id}`}
            className="absolute rounded-full bg-yellow-200 blur-[1px] will-change-transform"
            style={{
                left: `${f.left}%`,
                top: `${f.top}%`,
                width: f.size,
                height: f.size,
                animation: `firefly-move-gpu ${f.floatDuration} ease-in-out infinite`,
                animationDelay: f.delay
            }}
        />
      ))}

      {/* 4. Falling Blossoms */}
      {blossoms.map((b) => (
        <div 
          key={`blossom-${b.id}`}
          className="absolute will-change-transform"
          style={{
             left: `${b.left}%`,
             top: 0, // Start from top
             animation: `fall-down-gpu ${b.duration} linear infinite`,
             animationDelay: b.delay,
             width: b.size,
             height: b.size,
          }}
        >
          <BlossomSVG style={{ width: '100%', height: '100%' }} />
        </div>
      ))}

      {/* 5. Floating Lanterns */}
      {lanterns.map((l) => (
        <div
            key={`lantern-${l.id}`}
            className="absolute z-10 will-change-transform"
            style={{
                left: `${l.left}%`,
                top: 0, // Reference point
                width: l.size,
                height: l.size * 1.4,
                animation: `float-up-gpu ${l.duration} linear infinite`,
                animationDelay: l.delay,
            }}
        >
            <div style={{ animation: `sway ${l.swayDuration} ease-in-out infinite alternate` }}>
                <LanternSVG 
                    style={{ width: '100%', height: '100%' }} 
                    color={l.color} 
                />
            </div>
        </div>
      ))}
      
      {/* 6. Vignette (Static) */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_40%,rgba(0,0,0,0.6)_100%)] z-20 pointer-events-none"></div>
      
      {/* 7. Noise (Static) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20 mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}>
      </div>

    </div>
  );
};

export default FloatingBackground;
