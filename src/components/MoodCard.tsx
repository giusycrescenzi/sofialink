import { MOODS } from '../data';
import { motion } from 'motion/react';
import { useState } from 'react';

interface MoodCardProps {
  onSendMood: (mood: string, emoji: string) => void;
  isSending: boolean;
}

export default function MoodCard({ onSendMood, isSending }: MoodCardProps) {
  const [clickedMood, setClickedMood] = useState<string | null>(null);

  const handleMoodClick = (moodLabel: string, emoji: string) => {
    if (isSending) return;
    setClickedMood(moodLabel);
    onSendMood(moodLabel, emoji);
    setTimeout(() => setClickedMood(null), 1000);
  };

  return (
    <section id="mood-card" className="flex flex-col">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
        Il mio Mood
      </h2>
      
      <div className="grid grid-cols-5 gap-2">
        {MOODS.map((mood) => {
          const isSelected = clickedMood === mood.type;
          return (
            <motion.button
              id={`mood-btn-${mood.type.toLowerCase()}`}
              key={mood.type}
              onClick={() => handleMoodClick(mood.type, mood.emoji)}
              disabled={isSending}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center py-3.5 px-1 rounded-2xl border transition-all duration-300 ${mood.bgGradient} ${
                isSelected ? 'ring-2 ring-pink-400 scale-105' : 'border-pink-100/50 bg-pink-50/40 hover:bg-pink-100/60 shadow-xs'
              }`}
            >
              <span className="text-2xl select-none filter drop-shadow-xs mb-1 leading-none">
                {mood.emoji}
              </span>
              <span className="text-[10px] font-bold text-pink-600 tracking-tight leading-none mt-1">
                {mood.type}
              </span>
              {isSelected && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
