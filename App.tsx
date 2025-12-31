import React, { useState, useRef, useEffect } from 'react';
import { AppStage } from './types';
import { useScaler } from './hooks/useScaler';
import FloatingBackground from './components/FloatingBackground';
import EnvelopeScreen from './pages/EnvelopeScreen';
import LetterScreen from './pages/LetterScreen';
import CertificateScreen from './pages/CertificateScreen';
import { audioManager } from './utils/audio-manager';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<AppStage>(AppStage.ENVELOPE);

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

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black overflow-hidden relative"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <FloatingBackground stage={stage} />
      </div>

      {/* Scaled Game Stage (1920x1080) */}
      <div
        ref={stageRef}
        className="absolute top-0 left-0 overflow-hidden shadow-2xl z-10"
        style={{ width: '1920px', height: '1080px', transformOrigin: '0 0', opacity: 0 }}
      >
        <div className="absolute inset-0 z-20">

          {/* Screen 1: Envelope */}
          {stage === AppStage.ENVELOPE && (
            <EnvelopeScreen onOpen={() => setStage(AppStage.LETTER)} />
          )}

          {/* Screen 2: Letter */}
          {stage === AppStage.LETTER && (
            <LetterScreen onForgive={() => setStage(AppStage.CERTIFICATE)} />
          )}

          {/* Screen 3: Certificate */}
          {stage === AppStage.CERTIFICATE && (
            <CertificateScreen />
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
