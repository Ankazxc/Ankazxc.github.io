import React, { useState, useCallback, useEffect } from 'react';
import Background from './components/Background';
import ScriptCard from './components/ScriptCard';
import Notification from './components/Notification';
import { scripts } from './data';
import { Youtube, Disc, Cpu, Code2 } from 'lucide-react';

const App: React.FC = () => {
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleCopy = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification('Script Copied Successfully');
      }).catch(err => {
        console.error('Failed to copy', err);
        showNotification('Failed to copy script');
      });
    } else {
       showNotification('Clipboard API not supported');
    }
  }, []);

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 2500);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-gray-100 selection:bg-brand-red selection:text-white">
      <Background />
      <Notification show={notification.show} message={notification.message} />
      
      {/* Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]" />
      <div className="pointer-events-none fixed inset-0 z-50 h-[2px] w-full animate-[scan_5s_ease-in-out_infinite] bg-brand-red/20 opacity-50 shadow-[0_0_20px_rgba(255,77,77,0.5)]">
         <style>{`
           @keyframes scan {
             0% { top: -10%; opacity: 0; }
             10% { opacity: 1; }
             90% { opacity: 1; }
             100% { top: 110%; opacity: 0; }
           }
         `}</style>
      </div>

      <main className="relative z-10 flex flex-grow flex-col items-center">
        
        {/* Navbar / Top Bar */}
        <div className="w-full flex justify-between items-center p-6 lg:px-12 border-b border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                <span className="font-rajdhani font-bold text-sm tracking-widest text-white/60">SYSTEM ONLINE</span>
            </div>
            <div className="font-mono text-xs text-white/40">V.2.0.4</div>
        </div>

        {/* Hero Section */}
        <header className="relative mt-12 mb-20 text-center px-4">
          <div className={`transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              <SparkleIcon />
              <span>Premium Script Hub</span>
            </div>
            
            <h1 className="relative font-orbitron font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white mb-2">
              <span className="absolute -inset-1 block blur-2xl bg-gradient-to-r from-brand-red to-brand-crimson opacity-40 animate-pulse"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                ANKAZCX
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto font-rajdhani text-xl md:text-2xl font-medium text-gray-400 tracking-wide">
              The <span className="text-brand-red text-glow">ultimate</span> collection of high-performance automation scripts.
            </p>
          </div>
        </header>

        {/* Stats / Info Bar (Optional decorative) */}
        <div className="flex gap-8 md:gap-16 mb-16 border-y border-white/5 py-6 px-10 bg-black/30 backdrop-blur-md">
           <StatItem label="Scripts" value={scripts.length.toString().padStart(2, '0')} />
           <StatItem label="Status" value="UNDETECTED" color="text-green-400" />
           <StatItem label="Uptime" value="99.9%" />
        </div>

        {/* Script Grid */}
        <div className="container mx-auto px-4 pb-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scripts.map((item, index) => (
              <div 
                key={item.id} 
                className={`transition-all duration-700 delay-[${index * 100}ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <ScriptCard item={item} onCopy={handleCopy} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto w-full border-t border-white/5 bg-[#030303] py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="font-orbitron text-2xl font-bold text-white mb-2">ANKAZCX</h3>
                        <p className="text-gray-500 text-sm font-inter max-w-xs">
                          Elevating your gameplay with state-of-the-art scripting solutions.
                        </p>
                    </div>
                    
                    <div className="flex gap-6">
                        <SocialLink href="https://youtube.com/@ankazcx?si=mueW11ueIGThOdmN" icon={<Youtube size={20} />} label="YouTube" />
                        <SocialLink href="https://discord.gg/aegZ2prZfF" icon={<Disc size={20} />} label="Discord" />
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs font-mono uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Ankazcx Systems. All rights reserved.
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
};

const StatItem = ({ label, value, color = 'text-white' }: { label: string, value: string, color?: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">{label}</span>
    <span className={`font-orbitron text-lg font-bold ${color}`}>{value}</span>
  </div>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-red/30 transition-all duration-300"
  >
    <span className="text-gray-400 group-hover:text-white transition-colors">{icon}</span>
    <span className="font-rajdhani font-semibold text-gray-300 group-hover:text-brand-red tracking-wide">{label}</span>
  </a>
);

const SparkleIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L14.39 8.26L21 9.27L15.92 13.71L17.5 20.08L12 16.7L6.5 20.08L8.08 13.71L3 9.27L9.61 8.26L12 2Z" />
  </svg>
);

export default App;