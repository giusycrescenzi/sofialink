import { useState, useEffect } from 'react';
import { TelegramSettings, HistoryItem, RequestType } from './types';
import { DEFAULT_BOT_TOKEN, DEFAULT_CHAT_ID, sendTelegramNotification } from './utils/telegram';
import Header from './components/Header';
import MoodCard from './components/MoodCard';
import RequestCard from './components/RequestCard';
import ThoughtCard from './components/ThoughtCard';
import EmergencyButton from './components/EmergencyButton';
import HistoryPanel from './components/HistoryPanel';
import SettingsModal from './components/SettingsModal';
import NotificationBanner from './components/NotificationBanner';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

const SETTINGS_KEY = 'cuore_app_telegram_settings';
const HISTORY_KEY = 'cuore_app_message_history';

export default function App() {
  const [settings, setSettings] = useState<TelegramSettings>({
    botToken: DEFAULT_BOT_TOKEN,
    chatId: DEFAULT_CHAT_ID,
    useTelegram: false
  });

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    simulated: boolean;
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Errore nel caricamento dei settaggi:", e);
      }
    }

    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Errore nel caricamento della cronologia:", e);
      }
    }
  }, []);

  // Save settings helper
  const handleSaveSettings = (newSettings: TelegramSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    
    // Quick notification feedback
    setNotification({
      show: true,
      message: newSettings.useTelegram 
        ? "Configurazione Telegram salvata! Ora puoi ricevere i messaggi reali! 💌" 
        : "Impostazioni aggiornate. L'app ora userà la simulazione locale. ✨",
      simulated: !newSettings.useTelegram
    });

    confetti({
      particleCount: 40,
      spread: 50,
      colors: ['#a855f7', '#f43f5e', '#ec4899']
    });
  };

  // Add history item helper
  const addHistoryItem = (type: HistoryItem['type'], content: string, details?: string) => {
    const timeString = new Date().toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content,
      details,
      timestamp: timeString
    };

    const updatedHistory = [newItem, ...history].slice(0, 50); // Keep last 50
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  // Trigger sweet confetti
  const triggerConfetti = (type: 'pink' | 'red' | 'magic') => {
    if (type === 'red') {
      // Explode lots of red/rose confetti for SOS
      confetti({
        particleCount: 150,
        spread: 80,
        colors: ['#ff1e56', '#ff809b', '#ffcbd5', '#e11d48'],
        origin: { y: 0.6 }
      });
    } else {
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#ff99ac', '#ffcbd5', '#e9d5ff', '#ec4899', '#f472b6'],
        origin: { y: 0.7 }
      });
    }
  };

  // 1. Send Mood Action
  const handleSendMood = async (mood: string, emoji: string) => {
    setIsSending(true);
    const textMsg = `<b>Umore di Amore:</b> ${emoji} Oggi mi sento <b>${mood}</b>! 💖`;
    
    const result = await sendTelegramNotification(textMsg, settings);
    setIsSending(false);

    if (result.success) {
      addHistoryItem('mood', `Mi sento ${mood} ${emoji}`);
      triggerConfetti('pink');
      setNotification({
        show: true,
        message: `Stato d'animo "${mood}" inviato con successo! ${emoji}`,
        simulated: result.simulated
      });
    } else {
      setNotification({
        show: true,
        message: `Errore nell'invio: ${result.error}. Ricontrolla le credenziali!`,
        simulated: false
      });
    }
  };

  // 2. Send Request Action
  const handleSendRequest = async (requestType: RequestType, emoji: string, details: string) => {
    setIsSending(true);
    let textMsg = `<b>Nuova Richiesta da Amore:</b> Voglio un <b>${requestType}</b>! ${emoji}\n`;
    if (details.trim()) {
      textMsg += `📝 <i>Dettagli:</i> ${details}`;
    }

    const result = await sendTelegramNotification(textMsg, settings);
    setIsSending(false);

    if (result.success) {
      addHistoryItem('request', `Voglio un ${requestType} ${emoji}`, details.trim() || undefined);
      triggerConfetti('magic');
      setNotification({
        show: true,
        message: `La tua richiesta di "${requestType}" è stata inviata! ${emoji}`,
        simulated: result.simulated
      });
    } else {
      setNotification({
        show: true,
        message: `Errore: ${result.error}`,
        simulated: false
      });
    }
  };

  // 3. Send Thought Action
  const handleSendThought = async (thought: string) => {
    setIsSending(true);
    const textMsg = `<b>Pensiero da Amore:</b>\n"<i>${thought}</i>" 💬`;

    const result = await sendTelegramNotification(textMsg, settings);
    setIsSending(false);

    if (result.success) {
      addHistoryItem('thought', thought);
      triggerConfetti('pink');
      setNotification({
        show: true,
        message: "Il tuo pensiero è stato spedito.",
        simulated: result.simulated
      });
    } else {
      setNotification({
        show: true,
        message: `Errore: ${result.error}`,
        simulated: false
      });
    }
  };

  // 4. Send Emergency Action
  const handleSendEmergency = async () => {
    setIsSending(true);
    const textMsg = `🚨 <b>SOS EMERGENZA DA AMORE</b> 🚨\n\nHo bisogno di te IMMEDIATAMENTE! Chiamami subito o vieni da me!`;

    const result = await sendTelegramNotification(textMsg, settings);
    setIsSending(false);

    if (result.success) {
      addHistoryItem('emergency', "SOS: Ho bisogno di te subito! 🚨");
      triggerConfetti('red');
      setNotification({
        show: true,
        message: "Segnale SOS inviato! Chiamerò il prima possibile! 🚨❤️",
        simulated: result.simulated
      });
    } else {
      setNotification({
        show: true,
        message: `Errore SOS: ${result.error}`,
        simulated: false
      });
    }
  };

  const isTelegramConfigured = settings.botToken !== DEFAULT_BOT_TOKEN && settings.chatId !== DEFAULT_CHAT_ID;

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex items-center justify-center p-4">
      
      {/* Phone Simulator Wrapper */}
      <div className="w-full max-w-[390px] h-[812px] max-h-[94vh] bg-white rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden flex flex-col relative">
        
        {/* Top Banner feedback (positioned inside the phone frame) */}
        <NotificationBanner 
          notification={notification} 
          onClose={() => setNotification(null)} 
        />

        {/* Header App (fixed top) */}
        <Header 
          onOpenSettings={() => setIsSettingsOpen(true)}
          telegramConfigured={isTelegramConfigured}
          totalMessagesSent={history.length}
        />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          
          {/* Dynamic configuration reminder if not set */}
          {!isTelegramConfigured && (
            <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 shadow-xs flex items-center justify-between gap-3 text-[10px] text-pink-700 font-medium">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse shrink-0" />
                <span>Ricevi i messaggi reali su Telegram?</span>
              </div>
              <button
                id="configure-reminder-btn"
                onClick={() => setIsSettingsOpen(true)}
                className="px-2.5 py-1 bg-white hover:bg-pink-50 text-pink-500 hover:text-pink-600 font-bold rounded-lg border border-pink-100 shadow-xs transition duration-300 whitespace-nowrap cursor-pointer"
              >
                Imposta ✨
              </button>
            </div>
          )}

          {/* Section 1: Mood */}
          <MoodCard onSendMood={handleSendMood} isSending={isSending} />

          {/* Section 2: Request */}
          <RequestCard onSendRequest={handleSendRequest} isSending={isSending} />

          {/* Section 3: Thoughts */}
          <ThoughtCard onSendThought={handleSendThought} isSending={isSending} />

          {/* Section 5: History Log */}
          <HistoryPanel history={history} onClearHistory={handleClearHistory} />

        </div>

        {/* Section 4: Sticky SOS Emergency Button at footer */}
        <EmergencyButton onSendEmergency={handleSendEmergency} isSending={isSending} />

      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />

    </div>
  );
}
