import { create } from 'zustand';

interface SettingsState {
  language: 'bn' | 'en';
  theme: 'light' | 'dark' | 'system';
  voiceSpeed: number; // 0.8, 1.0, 1.2
  offlineMode: boolean;
  notificationsEnabled: boolean;
  setLanguage: (lang: 'bn' | 'en') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setVoiceSpeed: (speed: number) => void;
  setOfflineMode: (offline: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'bn',
  theme: 'light',
  voiceSpeed: 1.0,
  offlineMode: false,
  notificationsEnabled: true,
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  setVoiceSpeed: (voiceSpeed) => set({ voiceSpeed }),
  setOfflineMode: (offlineMode) => set({ offlineMode }),
  setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
}));

