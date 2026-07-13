import { Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';

interface ThoughtCardProps {
  onSendThought: (thought: string) => void;
  isSending: boolean;
}

export default function ThoughtCard({ onSendThought, isSending }: ThoughtCardProps) {
  const [thought, setThought] = useState('');
  const maxLength = 500;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!thought.trim() || isSending) return;

    onSendThought(thought.trim());
    setThought('');
  };

  return (
    <section id="thought-card" className="flex flex-col">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
        Pensieri
      </h2>

      <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <textarea
              id="thought-textarea"
              rows={3}
              maxLength={maxLength}
              placeholder="A cosa stai pensando? Scrivi qui..."
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              className="w-full bg-white border-none rounded-xl p-3 text-sm text-gray-700 outline-none ring-1 ring-purple-200 focus:ring-2 focus:ring-purple-400 resize-none pb-7 placeholder:text-gray-400"
            />
            <div className="absolute bottom-2 right-3 text-[9px] font-bold text-purple-300">
              {thought.length}/{maxLength}
            </div>
          </div>

          <motion.button
            id="send-thought-btn"
            type="submit"
            disabled={!thought.trim() || isSending}
            whileHover={{ scale: thought.trim() ? 1.01 : 1 }}
            whileTap={{ scale: thought.trim() ? 0.99 : 1 }}
            className={`w-full py-3 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              thought.trim()
                ? 'bg-purple-400 hover:bg-purple-500 text-white cursor-pointer hover:shadow-lg'
                : 'bg-white/85 text-gray-400 cursor-not-allowed border border-purple-100/50'
            }`}
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Condividi Pensiero 💖</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
