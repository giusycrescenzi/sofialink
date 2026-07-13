import { useState } from 'react';
import { TelegramSettings } from '../types';
import { DEFAULT_BOT_TOKEN, DEFAULT_CHAT_ID } from '../utils/telegram';
import { X, Key, Send, AlertTriangle, HelpCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TelegramSettings;
  onSave: (newSettings: TelegramSettings) => void;
}

export default function SettingsModal({ isOpen, onClose, settings, onSave }: SettingsModalProps) {
  const [botToken, setBotToken] = useState(settings.botToken === DEFAULT_BOT_TOKEN ? '' : settings.botToken);
  const [chatId, setChatId] = useState(settings.chatId === DEFAULT_CHAT_ID ? '' : settings.chatId);
  const [showGuide, setShowGuide] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      botToken: botToken.trim() || DEFAULT_BOT_TOKEN,
      chatId: chatId.trim() || DEFAULT_CHAT_ID,
      useTelegram: botToken.trim() !== '' && chatId.trim() !== '',
    });
    onClose();
  };

  const handleReset = () => {
    setBotToken('');
    setChatId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        id="settings-modal"
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-pink-200 to-purple-100 flex items-center justify-between border-b border-pink-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/80 rounded-xl text-pink-500">
              <Key className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-pink-600 text-base">Configurazione Telegram</h3>
          </div>
          <button 
            id="close-settings-btn"
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-white/40 text-pink-500 hover:text-pink-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <p className="text-xs text-gray-600 leading-relaxed">
            Per ricevere le notifiche in tempo reale sul tuo telefono, configura un Bot Telegram gratuito. Se lasci questi campi vuoti, l'app <strong>simulerà</strong> l'invio sul momento per permetterti di provarla subito!
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 px-1">
                Token del Bot Telegram
              </label>
              <input
                id="bot-token-input"
                type="text"
                placeholder={DEFAULT_BOT_TOKEN}
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="w-full bg-pink-50/40 border-none rounded-xl p-3 text-sm text-gray-700 outline-none ring-1 ring-pink-100 focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 px-1">
                Chat ID Telegram
              </label>
              <input
                id="chat-id-input"
                type="text"
                placeholder={DEFAULT_CHAT_ID}
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-full bg-pink-50/40 border-none rounded-xl p-3 text-sm text-gray-700 outline-none ring-1 ring-pink-100 focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>
          </div>

          {/* Quick instructions toggle */}
          <button
            id="toggle-guide-btn"
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1 text-xs text-pink-500 hover:text-pink-600 font-semibold transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showGuide ? "Nascondi guida rapida" : "Come ottengo queste credenziali?"}
          </button>

          {showGuide && (
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-gray-600 space-y-2.5 leading-relaxed">
              <p className="font-bold text-purple-700">Guida in 3 passi semplici:</p>
              <ol className="list-decimal list-inside space-y-1.5">
                <li>Cerca <strong>@BotFather</strong> su Telegram e scrivi <code>/newbot</code>. Segui i passaggi per dare un nome al tuo Bot e copia il <strong>Token API</strong> generato.</li>
                <li>Cerca il tuo bot appena creato su Telegram, premi <strong>Avvia</strong> (o scrivi un messaggio iniziale).</li>
                <li>Cerca <strong>@userinfobot</strong> su Telegram e avvialo: ti risponderà con il tuo <strong>Id (Chat ID)</strong> personale di cifre. Incolla questi due codici qui sopra!</li>
              </ol>
            </div>
          )}

          {/* Simulated Notice */}
          {(!botToken || !chatId) && (
            <div className="flex items-start gap-2.5 p-3.5 bg-pink-50/50 rounded-2xl border border-pink-100 text-xs text-pink-700">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-pink-400" />
              <span>
                <strong>Modalità Simulazione Attiva:</strong> Non avendo inserito i token reali, i messaggi verranno salvati nella cronologia locale ma non inviati a Telegram.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-pink-100 flex gap-3">
          <button
            id="reset-settings-btn"
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 bg-white border border-pink-100 rounded-xl text-xs font-semibold text-gray-500 hover:text-pink-500 hover:bg-pink-50/20 transition shrink-0 cursor-pointer"
          >
            Azzera campi
          </button>
          <button
            id="save-settings-btn"
            type="button"
            onClick={handleSave}
            className="w-full py-2.5 bg-pink-400 hover:bg-pink-500 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-100 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Salva Configurazione
          </button>
        </div>
      </div>
    </div>
  );
}
