import React, { useRef, useState } from 'react';
import { ScriptItem } from '../types';
import { Copy, Check, Terminal, Sparkles } from 'lucide-react';

interface ScriptCardProps {
  item: ScriptItem;
  onCopy: (text: string) => void;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ item, onCopy }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(item.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full w-full rounded-2xl bg-neutral-900/40 p-[1px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Spotlight Border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 77, 77, 0.4), transparent 40%)`,
        }}
      />
      
      {/* Main Card Content Container */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#0a0a0a] backdrop-blur-xl border border-white/5 shadow-2xl">
        
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Tech decorative lines */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <div className="flex gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
        </div>

        <div className="relative z-10 flex flex-grow flex-col items-center p-8 text-center">
          
          {/* Icon Halo */}
          <div className="group/icon relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-brand-red/20 blur-xl transition-all duration-500 group-hover/icon:bg-brand-red/30 group-hover/icon:blur-2xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 shadow-inner">
               <span className="text-4xl transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
            </div>
          </div>

          <h2 className="mb-3 font-orbitron text-2xl font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-brand-red">
            {item.title}
          </h2>

          <div className="mb-6 h-px w-12 bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

          <p className="mb-8 font-inter text-sm font-light leading-relaxed text-gray-400 group-hover:text-gray-300">
            {item.description}
          </p>

          <div className="mt-auto w-full">
            <button
              onClick={handleCopyClick}
              className={`
                relative w-full overflow-hidden rounded-xl border p-4 text-sm font-bold uppercase tracking-widest transition-all duration-300
                ${copied 
                  ? 'border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]' 
                  : 'border-white/10 bg-white/5 text-white hover:border-brand-red/50 hover:bg-brand-red/10 hover:shadow-[0_0_20px_rgba(255,77,77,0.2)]'
                }
              `}
            >
              <div className="relative flex items-center justify-center gap-2 z-10">
                 {copied ? (
                   <>
                     <span>Copied</span>
                     <Check className="h-4 w-4" />
                   </>
                 ) : (
                   <>
                     <span>Initialize</span>
                     <Terminal className="h-4 w-4" />
                   </>
                 )}
              </div>
              
              {/* Button Progress/Fill Animation */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ${copied ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;