import React from 'react';

const Background: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#030303]">
        {/* Deep Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-brand-crimson/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Dynamic Gradient Orb - Center */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-brand-red/5 to-transparent rounded-full blur-[120px] animate-spin-slow" />
      </div>

      {/* Retro-Futuristic Grid Floor */}
      <div 
        className="fixed bottom-0 left-0 w-full h-[60vh] z-0 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 77, 77, 0.1) 100%)',
          perspective: '500px',
        }}
      >
        <div 
          className="w-full h-full absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .1) 25%, rgba(255, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .1) 75%, rgba(255, 255, 255, .1) 76%, transparent 77%, transparent), 
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .1) 25%, rgba(255, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .1) 75%, rgba(255, 255, 255, .1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to bottom, transparent, black)'
          }}
        />
      </div>

      {/* Floating Particles/Dust */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      
      {/* Noise Overlay handled in index.html for global coverage */}
      <div className="fixed inset-0 z-[50] opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
           }} 
      />
    </>
  );
};

export default Background;