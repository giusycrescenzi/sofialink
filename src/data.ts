import { MoodConfig, RequestConfig } from './types';

export const MOODS: MoodConfig[] = [
  {
    type: 'Felice',
    emoji: '🥰',
    label: 'Innamorata / Felice',
    color: 'text-pink-500',
    bgGradient: 'from-pink-100 to-rose-100 border-pink-200 hover:from-pink-200 hover:to-rose-200',
    hoverBg: 'hover:bg-pink-50'
  },
  {
    type: 'Triste',
    emoji: '🥺',
    label: 'Triste / Malinconica',
    color: 'text-blue-500',
    bgGradient: 'from-blue-100 to-indigo-100 border-blue-200 hover:from-blue-200 hover:to-indigo-200',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    type: 'Arrabbiata',
    emoji: '😤',
    label: 'Arrabbiata / Pouty',
    color: 'text-orange-500',
    bgGradient: 'from-orange-100 to-red-100 border-orange-200 hover:from-orange-200 hover:to-red-200',
    hoverBg: 'hover:bg-orange-50'
  },
  {
    type: 'Ansiosa',
    emoji: '🫣',
    label: 'Ansiosa / Timida',
    color: 'text-purple-500',
    bgGradient: 'from-purple-100 to-fuchsia-100 border-purple-200 hover:from-purple-200 hover:to-fuchsia-200',
    hoverBg: 'hover:bg-purple-50'
  },
  {
    type: 'Coccole',
    emoji: '🫂',
    label: 'Bisogno di Coccole',
    color: 'text-teal-500',
    bgGradient: 'from-teal-100 to-emerald-100 border-teal-200 hover:from-teal-200 hover:to-emerald-200',
    hoverBg: 'hover:bg-teal-50'
  }
];

export const REQUEST_OPTIONS: RequestConfig[] = [
  { type: 'Bacio', label: 'Un bacio gigante', emoji: '😘' },
  { type: 'Coccole', label: 'Coccole e grattini', emoji: '🫂' },
  { type: 'Gelato', label: 'Gelato o Dolcetto', emoji: '🍦' },
  { type: 'Attenzioni', label: 'Tante attenzioni', emoji: '🥺' },
  { type: 'Altro', label: 'Qualcos\'altro...', emoji: '✨' }
];
