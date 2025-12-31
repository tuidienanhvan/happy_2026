
import React, { useState } from 'react';
import { TET_CONTENT } from '../constants';

const StageTet: React.FC = () => {
  const [openedLixi, setOpenedLixi] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleOpenLixi = () => {
    setOpenedLixi(true);
    // Delay result showing for animation
    setTimeout(() => setShowResult(true), 800);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-20 overflow-hidden">
      
      {/* CSS Fireworks Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="firework"></div>
         <div className="firework"></div>
         <div className="firework"></div>
      </div>
      
      <style>{`
        @keyframes slide-up-fade {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes wobble {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
      `}</style>

      {/* Big Typography Greeting */}
      <div className="relative z-10 text-center mb-8 animate-[slide-up-fade_1s_ease-out]">
        <h1 className="font-pacifico text-[8rem] md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-tight p-4">
          {TET_CONTENT.greeting}
        </h1>
        <p className="font-script text-4xl md:text-5xl text-yellow-100 mt-2 tracking-wide drop-shadow-md">
          {TET_CONTENT.subheader}
        </p>
      </div>

      {/* Interactive Area */}
      <div className="relative h-[450px] w-full flex items-center justify-center z-20 perspective-[1000px]">
        
        {!openedLixi ? (
            <div 
                onClick={handleOpenLixi}
                className="group relative cursor-pointer hover:scale-105 transition-transform duration-300 animate-[wobble_3s_ease-in-out_infinite]"
            >
                {/* Lixi Envelop */}
                <div className="w-[300px] h-[450px] bg-gradient-to-b from-red-600 to-red-800 rounded-2xl border-4 border-yellow-500 shadow-[0_20px_60px_rgba(220,38,38,0.5)] flex flex-col items-center pt-12 relative overflow-hidden">
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
                    
                    {/* Golden Circle Decoration */}
                    <div className="w-32 h-32 rounded-full border-4 border-yellow-400/80 flex items-center justify-center bg-red-900 mb-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] relative">
                         {/* Chữ TẾT thư pháp */}
                        <span className="font-hand text-7xl text-yellow-400 font-bold drop-shadow-sm mt-2">Tết</span>
                        
                        {/* Mai/Đào decor */}
                        <div className="absolute -top-4 -right-4 text-4xl">🌸</div>
                        <div className="absolute -bottom-2 -left-2 text-4xl">🌼</div>
                    </div>
                    
                    <p className="font-script text-4xl text-yellow-200 text-center px-4 mb-2">
                        {TET_CONTENT.lixiMessage}
                    </p>
                    <p className="text-yellow-400/80 text-lg mt-8 animate-pulse font-nunito bg-black/20 px-4 py-1 rounded-full">
                        (Nhấn để mở ngay)
                    </p>

                    {/* Bottom wave decoration */}
                    <div className="absolute bottom-0 w-full h-16 bg-yellow-500/20 rounded-t-[50%] scale-150"></div>
                </div>
            </div>
        ) : (
            // Lixi Opened Animation
            <div className={`transition-all duration-700 ease-out transform ${showResult ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}>
                 <div className="bg-[#fffbf0] w-[340px] md:w-[600px] p-8 md:p-12 rounded-xl shadow-[0_0_100px_rgba(255,215,0,0.4)] border-[8px] border-double border-red-600 text-center relative">
                    
                    {/* Corner Decor */}
                    <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-yellow-500 rounded-tl-lg"></div>
                    <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-yellow-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-yellow-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-yellow-500 rounded-br-lg"></div>

                    <h3 className="font-pacifico text-6xl md:text-7xl text-red-600 mb-6 drop-shadow-sm">
                        {TET_CONTENT.lixiAmount}
                    </h3>
                    
                    <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-red-300 to-transparent mx-auto mb-6"></div>
                    
                    <p className="font-hand text-3xl md:text-4xl text-gray-800 mb-4 leading-relaxed">
                        {TET_CONTENT.body}
                    </p>
                    
                    <p className="text-gray-500 italic font-nunito mt-6">
                        {TET_CONTENT.lixiNote}
                    </p>
                    
                    <div className="mt-8 flex justify-center gap-6">
                         <span className="text-5xl animate-bounce delay-100 filter drop-shadow-md">🧧</span>
                         <span className="text-5xl animate-bounce delay-200 filter drop-shadow-md">💰</span>
                         <span className="text-5xl animate-bounce delay-300 filter drop-shadow-md">🥰</span>
                    </div>
                 </div>
            </div>
        )}
      </div>

    </div>
  );
};

export default StageTet;
