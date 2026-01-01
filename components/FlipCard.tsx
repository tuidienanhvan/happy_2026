import React from 'react';

interface FlipCardProps {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}

// Card size optimized for 1920x1080 game stage
// ALWAYS landscape (horizontal) on all devices
export const CARD_SIZE = {
  width: 'max-w-[950px]', // Wider card
  mobileWidth: 'w-[95%]', // Fill most of screen on mobile
  aspectRatio: 'aspect-[16/10]', // Always horizontal rectangle
  mdAspectRatio: 'md:aspect-[16/10]', // Same for desktop
};

const FlipCard: React.FC<FlipCardProps> = ({ isFlipped, front, back }) => {
  return (
    <>
      <style>{`
        .flip-card-container {
          perspective: 2500px;
          perspective-origin: center center;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 1.1s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg) translateZ(0);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 4px;
          overflow: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .flip-card-back {
          transform: rotateY(180deg) translateZ(0);
        }
        
        /* Add shadow that moves with flip */
        .flip-card-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
          z-index: 100;
          opacity: 0;
          transition: opacity 0.5s;
        }
        
        .flip-card-inner.flipped::before {
          opacity: 0;
        }
      `}</style>

      <div className={`${CARD_SIZE.mobileWidth} ${CARD_SIZE.width} ${CARD_SIZE.aspectRatio} ${CARD_SIZE.mdAspectRatio} flip-card-container`}>
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front Side - Letter */}
          <div className="flip-card-front">
            {front}
          </div>

          {/* Back Side - Certificate */}
          <div className="flip-card-back">
            {back}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlipCard;
