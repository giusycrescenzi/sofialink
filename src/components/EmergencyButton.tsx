import { motion } from 'motion/react';

interface EmergencyButtonProps {
  onSendEmergency: () => void;
  isSending: boolean;
}

export default function EmergencyButton({ onSendEmergency, isSending }: EmergencyButtonProps) {
  return (
    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
      <motion.button
        id="sos-emergency-btn"
        onClick={onSendEmergency}
        disabled={isSending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-sm tracking-wide"
      >
        {isSending ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span className="text-lg animate-pulse">🆘</span>
            <span>HO BISOGNO DI TE! ❤️</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
