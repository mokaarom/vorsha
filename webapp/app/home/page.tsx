'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import HomePage from '@/components/HomePage';

export default function HomeRoute() {
  const router = useRouter();

  const handleOpenVoice = (context?: string) => {
    if (context) {
      router.push(`/?prompt=${encodeURIComponent(context)}`);
    } else {
      router.push('/?voice=true');
    }
  };

  return <HomePage onOpenVoice={handleOpenVoice} />;
}
