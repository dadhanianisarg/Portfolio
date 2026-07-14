import React from 'react';

export const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#0b1120] overflow-hidden">
      {/* Morphing Blur Blobs for deep backdrop depth */}
      <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] md:w-[25vw] md:h-[25vw] rounded-full bg-blue-600/5 blur-[90px] md:blur-[130px] pointer-events-none animate-blob-morph" />
      <div className="absolute bottom-[20%] right-[5%] w-[45vw] h-[45vw] md:w-[30vw] md:h-[30vw] rounded-full bg-purple-600/5 blur-[100px] md:blur-[140px] pointer-events-none animate-blob-morph" style={{ animationDelay: '-6s' }} />
      <div className="absolute top-[40%] left-[50%] w-[35vw] h-[35vw] md:w-[20vw] md:h-[20vw] rounded-full bg-cyan-600/3 blur-[80px] md:blur-[120px] pointer-events-none animate-blob-morph" style={{ animationDelay: '-12s' }} />
      
      {/* Subtle bottom ambient gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] bg-gradient-to-t from-purple-950/5 to-transparent pointer-events-none" />
    </div>
  );
};
