import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AppStage } from './types';
import { useScaler } from './hooks/useScaler';
import FloatingBackground from './components/FloatingBackground';
import EnvelopeScreen from './pages/EnvelopeScreen';
import LetterScreen from './pages/LetterScreen';
import CertificateScreen from './pages/CertificateScreen';
import FlipCard from './components/FlipCard';
import { audioManager, playSound } from './utils/audio-manager';
import { PartyPopper, Sparkles } from 'lucide-react';

// Firework Button Component - moved here for reuse
const FireworkTriggerButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="group relative cursor-pointer focus:outline-none">
    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
    <div className="relative flex items-center gap-4 px-10 py-4 bg-gradient-to-br from-[#881337] via-[#9f1239] to-[#4c0519] rounded-full border border-[#fcd34d]/50 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(190,18,60,0.4)] active:translate-y-0 active:scale-95 overflow-hidden">
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
      <div className="relative z-10 p-2 bg-white/10 rounded-full border border-white/20 group-hover:bg-white/20 transition-colors">
        <PartyPopper className="w-6 h-6 text-yellow-300" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="font-nunito text-[10px] uppercase tracking-[0.2em] text-yellow-200/80 font-bold">Celebration Mode</span>
        <span className="font-hand text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100 tracking-wide drop-shadow-sm whitespace-nowrap">
          Bắn Pháo Hoa
        </span>
      </div>
      <Sparkles className="w-5 h-5 text-yellow-400/80 animate-pulse ml-2" />
    </div>
  </button>
);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<AppStage>(AppStage.ENVELOPE);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showLetter, setShowLetter] = useState(false); // For smooth fade-in

  useScaler(containerRef, stageRef, false);

  // Unlock audio on first user interaction
  useEffect(() => {
    const unlock = () => {
      audioManager.unlock();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);

  const handleOpenLetter = () => {
    setStage(AppStage.LETTER);
    // Show letter immediately - no fade delay (letter arc animation already handled positioning)
    setShowLetter(true);
  };

  const handleForgive = () => {
    playSound('flip');
    setIsFlipped(true);
    // After flip animation completes, update stage
    setTimeout(() => {
      setStage(AppStage.CERTIFICATE);
    }, 400);
  };

  // Firework handler
  const fireRealFirework = useCallback((ratioX: number, ratioY: number) => {
    const count = 200;
    const defaults = { origin: { x: ratioX, y: ratioY }, zIndex: 1500 };

    function fire(particleRatio: number, opts: any) {
      if ((window as any).confetti) {
        (window as any).confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
      }
    }

    fire(0.25, { spread: 26, startVelocity: 55, shapes: ['star'], colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'] });
    fire(0.2, { spread: 60, shapes: ['circle'], colors: ['#F59E0B', '#D97706', '#FFFFFF'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#e11d48', '#be123c', '#fb7185'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#FFFFFF'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#FCD34D'] });
  }, []);

  const handleCelebrate = () => {
    playSound('firework');
    fireRealFirework(0.5, 0.8);
    setTimeout(() => { playSound('firework'); fireRealFirework(0.2, 0.5); }, 200);
    setTimeout(() => { playSound('firework'); fireRealFirework(0.8, 0.5); }, 400);
    setTimeout(() => { playSound('firework'); fireRealFirework(0.5, 0.3); }, 600);
  };

  // Auto-fire on certificate
  useEffect(() => {
    if (stage === AppStage.CERTIFICATE) {
      const timer = setTimeout(() => {
        playSound('firework');
        fireRealFirework(0.5, 0.5);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [stage, fireRealFirework]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black overflow-hidden relative"
    >
      {/* Smooth transition CSS */}
      <style>{`
        .smooth-fade-enter {
          opacity: 0;
          transform: scale(0.92) translateY(30px);
        }
        .smooth-fade-active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .smooth-fade-exit {
          opacity: 0;
          transform: scale(0.96) translateY(-20px);
        }
        .smooth-transition {
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Background - Full screen, single layer */}
      <FloatingBackground stage={stage} />

      {/* Scaled Game Stage (1920x1080) */}
      <div
        ref={stageRef}
        className="absolute top-0 left-0 overflow-hidden z-10"
        style={{ width: '1920px', height: '1080px', transformOrigin: '0 0', opacity: 0 }}
      >
        <div className="absolute inset-0 z-20">

          {/* Screen 1: Envelope with smooth fade-out */}
          <div
            className={`absolute inset-0 smooth-transition ${stage === AppStage.ENVELOPE
              ? 'smooth-fade-active'
              : 'smooth-fade-exit pointer-events-none'
              }`}
          >
            <EnvelopeScreen onOpen={handleOpenLetter} />
          </div>

          {/* Screen 2 & 3: Letter → Certificate with Flip Effect */}
          {(stage === AppStage.LETTER || stage === AppStage.CERTIFICATE) && (
            <div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
              style={{ perspective: '2000px' }}
            >
              <FlipCard
                isFlipped={isFlipped}
                front={<LetterScreen onForgive={handleForgive} />}
                back={<CertificateScreen />}
              />

              {/* Firework Button - OUTSIDE the card, only visible on Certificate */}
              <div className={`mt-6 z-50 transition-all duration-500 ${stage === AppStage.CERTIFICATE
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                <FireworkTriggerButton onClick={handleCelebrate} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
