import React, { useState, useEffect } from 'react';
import Envelope from '../components/Envelope';
import { playSound } from '../utils/audio-manager';

interface Props {
    onOpen: () => void;
}

const EnvelopeScreen: React.FC<Props> = ({ onOpen }) => {
    const [showGlow, setShowGlow] = useState(false);
    // 0: Sealed, 1: Seal Drops, 2: Flap Opens, 3: Letter Slides Out, 4: Letter Flying Up + Envelope Drops
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);

    // Delay glow effects to prevent FOUC
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGlow(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Click WaxSeal → Start opening sequence
    const handleSealClick = () => {
        if (step > 0) return;
        playSound('open');
        setStep(1); // Seal drops
        setTimeout(() => setStep(2), 900); // Flap opens
        setTimeout(() => {
            playSound('whoosh');
            setStep(3); // Letter slides out
        }, 1800);
    };

    // Click Letter → Start flying animation, then go to LetterScreen
    const handleLetterClick = () => {
        if (step === 3) {
            playSound('whoosh');
            setStep(4); // Letter flies to center
            // When animation ends, show LetterScreen immediately
            setTimeout(() => {
                onOpen();
            }, 600); // Match animation duration exactly
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative perspective-[2000px] overflow-hidden">

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
        
        /* Step 4: Envelope drops down */
        @keyframes envelope-drop {
          0% { transform: scale(1) rotateX(10deg) translateY(0); opacity: 1; }
          100% { transform: scale(0.8) rotateX(20deg) translateY(300px); opacity: 0; }
        }
        
        /* Step 4: Letter flies up and scales */
        @keyframes letter-fly-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          60% { transform: translateY(-400px) scale(1.5); opacity: 1; }
          100% { transform: translateY(-350px) scale(2); opacity: 0; }
        }
        
        .envelope-dropping {
          animation: envelope-drop 1s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        
        .letter-flying {
          animation: letter-fly-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

            {/* --- ENVELOPE WRAPPER --- */}
            <div
                className={`transition-all duration-[1500ms] ease-in-out relative z-10 ${step === 4 ? 'envelope-dropping' : ''}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'scale(1) rotateX(10deg)',
                }}
            >
                {/* --- HOLY GLOW EFFECT (delayed, hide after letter out) --- */}
                {showGlow && step < 3 && (
                    <div className="absolute top-1/2 left-1/2 w-0 h-0 -z-10 pointer-events-none">
                        {/* Layer 1: Gold Conic Beams */}
                        <div
                            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[80px] opacity-40"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(251, 191, 36, 0.3) 60deg, transparent 120deg, rgba(251, 191, 36, 0.3) 180deg, transparent 240deg, rgba(251, 191, 36, 0.3) 300deg, transparent 360deg)',
                                animation: 'glow-spin-slow 20s linear infinite'
                            }}
                        ></div>

                        {/* Layer 2: Red Conic Beams */}
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
                )}

                {/* The Envelope Component with animation steps - pass step 4 info */}
                <Envelope step={step} onOpen={handleSealClick} onLetterClick={handleLetterClick} />
            </div>

        </div>
    );
};

export default EnvelopeScreen;
