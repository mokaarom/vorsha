import { create } from 'zustand';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export interface CitationItem {
  id: string;
  title: string;
  documentName: string;
  section?: string;
  pageNumber?: number;
  confidenceScore: number;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  timestamp: string;
  citations?: CitationItem[];
  confidenceScore?: number;
}

interface VoiceStoreState {
  state: VoiceState;
  realtimeTranscription: string;
  audioMetering: number;
  messages: ChatMessage[];
  activeConversationId: string | null;
  activeCitations: CitationItem[] | null;
  setState: (state: VoiceState) => void;
  setRealtimeTranscription: (text: string) => void;
  setAudioMetering: (metering: number) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setActiveConversationId: (id: string | null) => void;
  setActiveCitations: (citations: CitationItem[] | null) => void;
  clearConversation: () => void;
}

export const useVoiceStore = create<VoiceStoreState>((set) => ({
  state: 'idle',
  realtimeTranscription: '',
  audioMetering: -160,
  messages: [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'আসসালামু আলাইকুম! আমি ভরসা, আপনার সরকারি তথ্য ও সেবা সহকারী। আপনি যেকোনো সরকারি ফরম, ট্রেড লাইসেন্স বা আইন সম্পর্কে বাংলায় কথা বলে জানতে পারেন।',
      timestamp: new Date().toISOString(),
    },
  ],
  activeConversationId: null,
  activeCitations: null,
  setState: (state) => set({ state }),
  setRealtimeTranscription: (realtimeTranscription) => set({ realtimeTranscription }),
  setAudioMetering: (audioMetering) => set({ audioMetering }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setActiveCitations: (activeCitations) => set({ activeCitations }),
  clearConversation: () =>
    set({
      messages: [],
      activeConversationId: null,
      activeCitations: null,
      state: 'idle',
      realtimeTranscription: '',
    }),
}));

