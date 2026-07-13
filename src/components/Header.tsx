import { Heart, Settings, MessageSquareHeart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onOpenSettings: () => void;
  telegramConfigured: boolean;
  totalMessagesSent: number;
}

export default function Header({ onOpenSettings, telegramConfigured, totalMessagesSent }: HeaderProps) {
  const [greeting, setGreeting] = useState("Ciao Amore! 💖");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting("Buongiorno amore 🌸");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Buon pomeriggio ☀️");
    } else if (hours >= 17 && hours < 22) {
      setGreeting("Che hai fatto oggi? ✨");
    } else {
      setGreeting("Sogni d'oro 🌙");
    }
  }, []);

  const triggerHeartPulse = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  return (
    <header className="relative w-full p-6 pt-10 pb-6 bg-gradient-to-r from-pink-200 to-purple-100 border-b border-pink-100 text-center flex flex-col items-center shrink-0">
      {/* Decorative ambient elements */}
      <div className="absolute top-3 left-4 text-[10px] font-bold text-pink-500 tracking-wider uppercase flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-full border border-pink-200/50">
        <MessageSquareHeart className="w-3.5 h-3.5" />
        {totalMessagesSent} {totalMessagesSent === 1 ? 'Inviato' : 'Inviati'}
      </div>

      <div className="absolute top-2 right-2">
        <button
          id="settings-gear-btn"
          onClick={onOpenSettings}
          className="relative p-2 rounded-full hover:bg-white/40 text-pink-500 hover:text-pink-600 transition-all duration-300 group"
          title="Configura Telegram"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          {!telegramConfigured && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Main logo / avatar area */}
      <div className="mt-4 flex flex-col items-center text-center">
        <div 
          onClick={triggerHeartPulse}
          className="relative cursor-pointer select-none mb-2"
        >
          <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center border border-pink-200 shadow-sm hover:scale-105 transition-transform">
            <Heart 
              className={`w-7 h-7 text-pink-500 fill-pink-500 transition-transform ${
                pulse ? 'scale-120' : 'animate-heart-pulse'
              }`} 
            />
          </div>
          {/* Sparkles */}
          <span className="absolute -top-1 -right-1 text-sm animate-bounce">✨</span>
          <span className="absolute -bottom-1 -left-1 text-xs">🌸</span>
        </div>

        <h1 className="font-display font-bold text-2xl tracking-tight text-pink-600">
          Sofia-Link
        </h1>
        <p className="mt-1 text-xs text-pink-500/80 font-semibold italic">
          {greeting}
        </p>
      </div>
    </header>
  );
}
