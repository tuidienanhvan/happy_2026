import React from 'react';

interface FlipCardProps {
    isFlipped: boolean;
    front: React.ReactNode;
    back: React.ReactNode;
}

// Card size optimized for 1920x1080 game stage
// Mobile (portrait): taller card fits better
// Desktop (landscape): wider card
export const CARD_SIZE = {
    width: 'max-w-[850px]', // Slightly smaller than full width
    mobileWidth: 'w-[90%]', // Fill most of screen on mobile
    aspectRatio: 'aspect-[3/4]', // Tall for portrait/mobile
    mdAspectRatio: 'md:aspect-[4/3]', // Wide for landscape/desktop
};

const FlipCard: React.FC<FlipCardProps> = ({ isFlipped, front, back }) => {
    return (
        <>
            <style>{`
        .flip-card-container {
          perspective: 2500px;
          perspective-origin: center center;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          /* Smoother, longer flip animation */
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          /* Add subtle shadow for depth */
          border-radius: 4px;
          overflow: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
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
