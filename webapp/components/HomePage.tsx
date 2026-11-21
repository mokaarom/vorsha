'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import MaterialIcon from './MaterialIcon';
import RightSidebar from './RightSidebar';

interface HomePageProps {
  onOpenVoice: (context?: string) => void;
}

interface ActionCard {
  id: string;
  title: string;
  prompt: string;
}

const ACTION_CARDS: ActionCard[] = [
  {
    id: 'nid',
    title: 'Apply for Smart NID card',
    prompt: 'How do I apply for a new Smart NID card or correct my voter information in Bangladesh?',
  },
  {
    id: 'passport',
    title: 'Track e-Passport application',
    prompt: 'How can I track my e-Passport application status and police verification online?',
  },
  {
    id: 'land',
    title: 'Land records & e-Namjari mutation',
    prompt: 'Help me search my land Khatian and apply for e-Namjari mutation on the land portal.',
  },
  {
    id: 'birth',
    title: 'Digital birth & death registration',
    prompt: 'What are the steps to apply for or correct an online digital birth registration certificate?',
  },
  {
    id: 'tax',
    title: 'File zero income tax return (e-TIN)',
    prompt: 'Guide me step-by-step through filing a zero tax return and obtaining an NBR tax certificate.',
  },
  {
    id: 'brta',
    title: 'Renew BRTA driving license',
    prompt: 'How do I renew my BRTA smart card driving license or get a learner test permit?',
  },
  {
    id: 'pension',
    title: 'Universal pension scheme enrollment',
    prompt: 'Explain how Bangladeshi citizens can enroll in the Universal Pension Scheme (Prottoy/Prabash/Progoti).',
  },
  {
    id: 'trade',
    title: 'Digital municipal trade license',
    prompt: 'How do I obtain or renew a digital municipal trade license through e-Trade online?',
  },
];

export default function HomePage({ onOpenVoice }: HomePageProps) {
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (card: ActionCard) => {
    onOpenVoice(card.prompt);
  };

  const handleInputSubmit = () => {
    if (inputText.trim()) {
      onOpenVoice(inputText.trim());
    } else {
      onOpenVoice();
    }
  };

  const scrollCards = (direction: 'left' | 'right') => {
    if (cardsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      cardsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex h-screen h-[100dvh] w-full flex-col justify-between overflow-hidden text-white font-sans select-none bg-transparent">
      {/* 
        Full-width, window-fitted responsive shell:
        - Removes side gaps on desktop by letting header and carousel span comfortably edge-to-edge
        - Anchors content to the bottom without vertical overflow
        - Mobile: max-w-md centered, thumb-friendly
      */}
      <div className="relative z-10 flex w-full h-full flex-col justify-between">
        {/* 
          ======================================================================
          1. Top Header: Edge-to-edge wide desktop header, no side gap
          - Left: Circular avatar + "Sajid," \n "Welcome back"
          - Right: Notification icon + Menu icon
          ======================================================================
        */}
        <header className="flex w-full items-center justify-between shrink-0 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-4 sm:pt-5 md:pt-6">
          {/* Left Avatar + Greeting */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 shadow-md ring-1 ring-white/10">
              <Image
                src="/assets/avatar/sajid.jpg"
                alt="Sajid Profile"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base font-semibold tracking-tight text-white/95">
                Sajid,
              </span>
              <span className="text-xs font-normal text-white/70">
                Welcome back
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white/85 hover:text-white transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Notifications"
            >
              <MaterialIcon name="notifications" size={19} />
            </button>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white/85 hover:text-white transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Open menu"
            >
              <MaterialIcon name="menu" size={19} />
            </button>
          </div>
        </header>

        {/* 
          ======================================================================
          2. Content Block: Full-width responsive container, eliminating side gaps
          - Headline: Centered on desktop
          - Action Cards: Full-width scrollable row spanning across the screen
          - Bottom AI Input Container: Generous max-width, bottom-docked
          ======================================================================
        */}
        <div className="flex-1 flex flex-col justify-end gap-3.5 sm:gap-4 md:gap-5 pb-5 sm:pb-6 md:pb-7 min-h-0 w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16">
          {/* Headline */}
          <div className="w-full text-left md:text-center">
            <h1 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold tracking-tight text-white leading-[1.1] font-sans">
              What service do<br className="md:hidden" /> you need today?
            </h1>
          </div>

          {/* Action Cards: Full-width row across the desktop screen */}
          <div className="relative w-full py-0.5">
            {/* Desktop Left Scroll Button */}
            <button
              type="button"
              onClick={() => scrollCards('left')}
              className="hidden md:flex absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#1c0702]/90 hover:bg-[#340e02] text-white/80 hover:text-white shadow-lg backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <MaterialIcon name="chevron_left" size={20} />
            </button>

            {/* Scrollable Cards Carousel Row */}
            <div
              ref={cardsContainerRef}
              className="flex gap-3 sm:gap-3.5 md:gap-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-1 scroll-smooth w-full"
            >
              {ACTION_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card)}
                  className="group relative flex h-[124px] sm:h-[130px] md:h-[134px] w-[142px] sm:w-[155px] md:w-[172px] lg:w-[195px] xl:w-[220px] 2xl:flex-1 shrink-0 2xl:shrink flex-col justify-between rounded-2xl border border-white/10 bg-[#250901]/65 hover:bg-[#340e02]/85 hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(255,94,0,0.18)] backdrop-blur-xl p-3.5 sm:p-4 text-left transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
                >
                  <div className="text-[#ff7826] group-hover:scale-110 transition-transform">
                    <MaterialIcon name="auto_awesome" size={20} />
                  </div>
                  <span className="text-[12.5px] sm:text-[13px] md:text-[13.5px] font-medium text-white/95 leading-snug line-clamp-3">
                    {card.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Desktop Right Scroll Button */}
            <button
              type="button"
              onClick={() => scrollCards('right')}
              className="hidden md:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#1c0702]/90 hover:bg-[#340e02] text-white/80 hover:text-white shadow-lg backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <MaterialIcon name="chevron_right" size={20} />
            </button>
          </div>

          {/* Bottom AI Input Container: Centered, spacious, never overflowing */}
          <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            <div className="rounded-[26px] sm:rounded-[30px] border border-white/12 bg-[#1c0702]/85 backdrop-blur-2xl p-3.5 sm:p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all focus-within:border-orange-500/40">
              {/* Input Prompt */}
              <div className="mb-3 sm:mb-4 pt-0.5">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                  placeholder="Ask about any government service or speak your need..."
                  className="w-full bg-transparent text-[14.5px] sm:text-base md:text-[16.5px] text-white outline-none placeholder:text-white/40 font-sans"
                />
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Paperclip / Attachment Button */}
                  <button
                    type="button"
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all active:scale-95 cursor-pointer"
                    title="Attach citizen document"
                    aria-label="Attach citizen document"
                  >
                    <MaterialIcon name="attach_file" size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  {inputText.trim() && (
                    <button
                      type="button"
                      onClick={handleInputSubmit}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all cursor-pointer"
                    >
                      <span>Send</span>
                      <MaterialIcon name="arrow_upward" size={14} />
                    </button>
                  )}

                  {/* Minimal Radiant Voice Button */}
                  <button
                    type="button"
                    onClick={() => onOpenVoice(inputText.trim() || undefined)}
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#ff5e00] hover:bg-[#ea5300] text-white shadow-md shadow-black/20 hover:shadow-[0_0_22px_rgba(255,94,0,0.55)] transition-all duration-150 active:scale-95 cursor-pointer"
                    title="Start Voice Assistant"
                    aria-label="Start Voice Assistant"
                  >
                    <MaterialIcon
                      name="mic"
                      size={21}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Slide-over Sidebar Drawer */}
      <RightSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectChat={(prompt) => onOpenVoice(prompt)}
        onNewChat={() => onOpenVoice()}
      />
    </div>
  );
}
