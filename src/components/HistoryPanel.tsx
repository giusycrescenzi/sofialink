import { HistoryItem } from '../types';
import { Clock, Heart, Trash2, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

export default function HistoryPanel({ history, onClearHistory }: HistoryPanelProps) {
  const getBadgeStyle = (type: HistoryItem['type']) => {
    switch (type) {
      case 'mood':
        return 'bg-pink-100/70 text-pink-600 border-pink-200/40';
      case 'request':
        return 'bg-purple-100/70 text-purple-600 border-purple-200/40';
      case 'thought':
        return 'bg-blue-100/70 text-blue-600 border-blue-200/40';
      case 'emergency':
        return 'bg-red-100/70 text-red-600 border-red-200/40 animate-pulse';
    }
  };

  const getBadgeLabel = (type: HistoryItem['type']) => {
    switch (type) {
      case 'mood':
        return 'Umore';
      case 'request':
        return 'Richiesta';
      case 'thought':
        return 'Pensiero';
      case 'emergency':
        return 'SOS 🚨';
    }
  };

  const getIcon = (type: HistoryItem['type']) => {
    switch (type) {
      case 'mood':
        return <Sparkles className="w-3 h-3" />;
      case 'request':
        return <Heart className="w-3 h-3" />;
      case 'thought':
        return <MessageSquare className="w-3 h-3" />;
      case 'emergency':
        return <ShieldAlert className="w-3 h-3" />;
    }
  };

  return (
    <section id="history-card" className="flex flex-col">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Cronologia Messaggi
        </h2>
        {history.length > 0 && (
          <button
            id="clear-history-btn"
            onClick={onClearHistory}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
            title="Svuota cronologia"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="bg-pink-50/20 rounded-2xl border border-pink-100/60 p-4 space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-xs text-pink-400 leading-relaxed italic">
              Nessun messaggio inviato oggi. Mandami qualcosa! 💕
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 bg-white border border-pink-100/50 rounded-xl flex flex-col space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${getBadgeStyle(item.type)}`}>
                      {getIcon(item.type)}
                      {getBadgeLabel(item.type)}
                    </span>
                    <span className="text-[9px] font-medium text-gray-400">
                      {item.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-xs font-semibold text-gray-700 leading-relaxed pt-0.5">
                    {item.content}
                  </p>

                  {item.details && (
                    <p className="text-[10px] text-gray-500 italic bg-gray-50 px-2 py-1 rounded-lg border border-pink-50/30">
                      Dettagli: "{item.details}"
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
