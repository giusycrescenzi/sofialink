import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle, WifiOff } from 'lucide-react';

interface NotificationBannerProps {
  notification: {
    show: boolean;
    message: string;
    simulated: boolean;
  } | null;
  onClose: () => void;
}

export default function NotificationBanner({ notification, onClose }: NotificationBannerProps) {
  return (
    <AnimatePresence>
      {notification && notification.show && (
        <motion.div
          id="notification-banner"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-4 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className={`p-4 rounded-2xl shadow-lg border flex items-start gap-3.5 backdrop-blur-md ${
            notification.simulated 
              ? 'bg-rose-50/95 border-rose-200 text-rose-900 shadow-rose-100' 
              : 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-100'
          }`}>
            <div className={`p-2 rounded-xl shrink-0 ${
              notification.simulated ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {notification.simulated ? (
                <Sparkles className="w-5 h-5 animate-pulse" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 space-y-0.5">
              <h4 className="font-display font-bold text-sm">
                {notification.simulated ? 'Messaggio Creato! ✨' : 'Notifica Telegram Inviata! 🚀'}
              </h4>
              <p className="text-xs opacity-90 leading-relaxed">
                {notification.message}
              </p>
              {notification.simulated && (
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold bg-rose-100/70 text-rose-700 px-2 py-0.5 rounded-full">
                  <WifiOff className="w-2.5 h-2.5" />
                  Solo Simulazione Locale
                </span>
              )}
            </div>
            <button
              id="close-notification-btn"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 font-bold text-xs p-1 rounded-full hover:bg-black/5"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
