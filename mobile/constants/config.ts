export const Config = {
  APP_NAME: 'Vorosha',
  APP_NAME_BN: 'ভরসা',
  TAGLINE: 'Citizen Voice AI Assistant',
  TAGLINE_BN: 'নাগরিক সেবা ও তথ্য ভয়েস সহকারী',
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  WS_VOICE_URL: process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:8000/ws/voice/',
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: '@vorosha_auth_token',
    REFRESH_TOKEN: '@vorosha_refresh_token',
    USER_PROFILE: '@vorosha_user_profile',
    LANGUAGE: '@vorosha_language',
    THEME: '@vorosha_theme',
    OFFLINE_QUEUE: '@vorosha_offline_queue',
  },

  DEFAULT_LANGUAGE: 'bn' as const, // Default Bangla for citizen inclusion
  FALLBACK_LANGUAGE: 'en' as const,
  SUPPORTED_LANGUAGES: ['bn', 'en'] as const,

  // Audio Recording Specs
  AUDIO: {
    SAMPLE_RATE: 16000,
    CHANNELS: 1,
    BIT_RATE: 128000,
  },
};

