'use client';

import React, { useState } from 'react';
import VoiceAssistant from '@/components/VoiceAssistant';
import HomePage from '@/components/HomePage';

export default function Page() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(true);
  const [serviceContext, setServiceContext] = useState<string | undefined>(undefined);

  const handleOpenVoice = (context?: string) => {
    setServiceContext(context);
    setIsVoiceOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleCloseVoice = () => {
    setIsVoiceOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/home');
    }
  };

  if (!isVoiceOpen) {
    return <HomePage onOpenVoice={handleOpenVoice} />;
  }

  return (
    <VoiceAssistant
      onClose={handleCloseVoice}
      serviceContext={serviceContext}
    />
  );
}
