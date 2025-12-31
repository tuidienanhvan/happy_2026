
import React, { useState, useRef } from 'react';
import { AppStage } from './types';
import { useScaler } from './hooks/useScaler';
import FloatingBackground from './components/FloatingBackground';
import StageEnvelope from './components/StageEnvelope';
import StageSuccess from './components/StageSuccess';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<AppStage>(AppStage.ENVELOPE);

  useScaler(containerRef, stageRef, false);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-black overflow-hidden relative"
    >
      {/* 
        MOVED OUTSIDE: Dynamic Romantic Background 
        Now acts as a global background layer independent of game scaling
      */}
      <div className="absolute inset-0 z-0">
         <FloatingBackground stage={stage} />
      </div>

      {/* Scaled Game Stage (1920x1080 Logic) */}
      <div 
        ref={stageRef} 
        className="absolute top-0 left-0 overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out z-10"
        style={{ width: '1920px', height: '1080px', transformOrigin: '0 0', opacity: 0 }}
      >
        {/* Main Content Area */}
        <div className="absolute inset-0 z-20">
          {stage === AppStage.ENVELOPE && (
            <StageEnvelope onForgive={() => setStage(AppStage.CELEBRATION)} />
          )}

          {stage === AppStage.CELEBRATION && (
            <StageSuccess />
          )}
        </div>
        
      </div>
    </div>
  );
};

export default App;
