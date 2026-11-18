'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Grainient from './Grainient';

export default function BackgroundGrainient() {
  const pathname = usePathname();

  // Disable Grainient background on the settings page
  if (pathname === '/settings') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
      <Grainient
        colors={['#120f17', '#2a0f0a', '#9a3412', '#f97316', '#fed7aa']}
        angle={50}
        flow={0.85}
        silk={0.35}
        grainAmount={0.08}
        scale={3}
        grainSize={0.5}
        variation={14}
        stir={1.15}
        interactive={true}
        clickSwirl={true}
        className="h-full w-full"
      />
      {/* Subtle radial vignette for focus and text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_25%,rgba(18,15,23,0.55)_70%,#120f17_100%)]" />
    </div>
  );
}
