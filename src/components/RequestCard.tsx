import { REQUEST_OPTIONS } from '../data';
import { RequestType } from '../types';
import { Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';

interface RequestCardProps {
  onSendRequest: (requestType: RequestType, emoji: string, details: string) => void;
  isSending: boolean;
}

export default function RequestCard({ onSendRequest, isSending }: RequestCardProps) {
  const [selectedType, setSelectedType] = useState<RequestType>('Bacio');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const matchedOption = REQUEST_OPTIONS.find(opt => opt.type === selectedType);
    const emoji = matchedOption ? matchedOption.emoji : '✨';
    onSendRequest(selectedType, emoji, details);
    setDetails('');
  };

  return (
    <section id="request-card" className="flex flex-col">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
        Voglio...
      </h2>

      <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Dropdown Selection */}
          <div className="relative">
            <select
              id="request-dropdown"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as RequestType)}
              className="w-full bg-white border-none rounded-xl p-3 text-sm text-gray-700 outline-none ring-1 ring-pink-200 focus:ring-2 focus:ring-pink-400 appearance-none cursor-pointer font-medium"
            >
              {REQUEST_OPTIONS.map((opt) => (
                <option key={opt.type} value={opt.type}>
                  {opt.emoji} {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-400 font-bold text-xs">
              ▼
            </div>
          </div>

          {/* Text Input Details */}
          <input
            id="request-details"
            type="text"
            placeholder="Qualche dettaglio? (es. stasera, con panna...)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-white border-none rounded-xl p-3 text-sm text-gray-700 outline-none ring-1 ring-pink-200 focus:ring-2 focus:ring-pink-400 placeholder:text-gray-400"
          />

          {/* Submit Button */}
          <motion.button
            id="send-request-btn"
            type="submit"
            disabled={isSending}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Invia Richiesta {REQUEST_OPTIONS.find(o => o.type === selectedType)?.emoji}</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
