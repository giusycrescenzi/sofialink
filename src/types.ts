export type MoodType = 'Felice' | 'Triste' | 'Arrabbiata' | 'Ansiosa' | 'Coccole';

export interface MoodConfig {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
  bgGradient: string;
  hoverBg: string;
}

export type RequestType = 'Bacio' | 'Coccole' | 'Gelato' | 'Attenzioni' | 'Altro';

export interface RequestConfig {
  type: RequestType;
  label: string;
  emoji: string;
}

export interface TelegramSettings {
  botToken: string;
  chatId: string;
  useTelegram: boolean;
}

export interface HistoryItem {
  id: string;
  type: 'mood' | 'request' | 'thought' | 'emergency';
  content: string;
  details?: string;
  timestamp: string;
}
