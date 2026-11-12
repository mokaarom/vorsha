import { useCallback } from 'react';
import { ChatMessage, useVoiceStore } from '../store/voiceStore';

/**
 * Typed questions. Adds the user's message to the shared conversation and
 * then the assistant's reply, so it works from any screen with a composer.
 */
export function useChat() {
  const addMessage = useVoiceStore((s) => s.addMessage);
  const setState = useVoiceStore((s) => s.setState);

  const sendText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return false;

      const userMsg: ChatMessage = {
        id: 'msg-' + Date.now(),
        sender: 'user',
        text: trimmed,
        timestamp: new Date().toISOString(),
      };
      addMessage(userMsg);
      // Leave the state alone if a recording or playback is already running.
      if (useVoiceStore.getState().state === 'idle') {
        setState('processing');
      }

      // Placeholder reply until the policy service is wired to typed input.
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: 'bot-' + Date.now(),
          sender: 'assistant',
          text: 'সরকারি বিধিমালা অনুযায়ী এই সেবার জন্য প্রয়োজনীয় কাগজপত্রের বিস্তারিত নিচে দেওয়া হলো। আপনি আরও কোনো প্রশ্ন করতে পারেন।',
          timestamp: new Date().toISOString(),
          citations: [
            {
              id: 'c-1',
              title: 'পৌরসভা আইন ও নাগরিক সেবা নির্দেশিকা',
              documentName: 'Ministry of LGRD Manual',
              section: 'অধ্যায় ৪, পৃষ্ঠা ১৮',
              confidenceScore: 0.95,
            },
          ],
          confidenceScore: 0.95,
        };
        addMessage(botMsg);
        if (useVoiceStore.getState().state === 'processing') {
          setState('idle');
        }
      }, 800);

      return true;
    },
    [addMessage, setState],
  );

  return { sendText };
}
