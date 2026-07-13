import { TelegramSettings } from '../types';

// PLACEHOLDERS RICHIESTI DALL'UTENTE
export const DEFAULT_BOT_TOKEN = "INSERISCI_QUI_IL_TUO_BOT_TOKEN";
export const DEFAULT_CHAT_ID = "INSERISCI_QUI_IL_TUO_CHAT_ID";

/**
 * Invia una notifica al Bot Telegram specificato.
 * Se vengono usati i placeholder di default, simula l'invio locale.
 */
export async function sendTelegramNotification(
  message: string,
  settings: TelegramSettings
): Promise<{ success: boolean; error?: string; simulated: boolean }> {
  const token = settings.botToken.trim();
  const chatId = settings.chatId.trim();

  // Verifica se i token sono rimasti ai placeholder di default o vuoti
  const isDefaultToken = token === DEFAULT_BOT_TOKEN || token === "" ;
  const isDefaultChatId = chatId === DEFAULT_CHAT_ID || chatId === "";

  if (isDefaultToken || isDefaultChatId) {
    console.log("Simulazione invio messaggio a Telegram:", message);
    // Ritardo artificiale per simulare la rete
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, simulated: true };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ description: 'Errore sconosciuto' }));
      return {
        success: false,
        error: errorData.description || `HTTP errore ${response.status}`,
        simulated: false,
      };
    }

    return { success: true, simulated: false };
  } catch (err) {
    console.error("Errore durante l'invio a Telegram:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Errore di connessione di rete',
      simulated: false,
    };
  }
}
