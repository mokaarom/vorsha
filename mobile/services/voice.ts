import apiClient from './api';
import { Config } from '../constants/config';

export const voiceService = {
  async transcribeAudio(audioUri: string, language: 'bn' | 'en' = 'bn') {
    const formData = new FormData();
    const filename = audioUri.split('/').pop() || 'voice.m4a';
    
    // @ts-ignore
    formData.append('audio', {
      uri: audioUri,
      name: filename,
      type: 'audio/m4a',
    });
    formData.append('language', language);

    const response = await apiClient.post('/voice/transcribe/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async synthesizeSpeech(text: string, language: 'bn' | 'en' = 'bn') {
    const response = await apiClient.post('/voice/synthesize/', {
      text,
      language,
    });
    return response.data; // { audioUrl: string }
  },

  async getConversations() {
    const response = await apiClient.get('/voice/conversations/');
    return response.data;
  },

  async getConversationDetail(id: string) {
    const response = await apiClient.get(`/voice/conversations/${id}/`);
    return response.data;
  },

  createWebSocket(): WebSocket {
    return new WebSocket(Config.WS_VOICE_URL);
  },
};

