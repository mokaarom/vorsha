'use client';

import React, { useState } from 'react';
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

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden text-white font-sans select-none bg-transparent">

      {/* Main Content Column - Exactly formatted as the mobile reference */}
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-between px-6 pt-8 pb-7">
        {/* 
          ======================================================================
          1. Top Header:
          - Left: Circular avatar mark + "Vorosha," \n "Citizen Assistant"
          - Right: Lamp/Notification icon + Menu icon
          ======================================================================
        */}
        <header className="flex w-full items-center justify-between">
          {/* Left Avatar + Greeting */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 shadow-md ring-1 ring-white/10">
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
              <span className="text-sm font-semibold tracking-tight text-white/95">
                Sajid,
              </span>
              <span className="text-xs font-normal text-white/70">
                Welcome back
              </span>
            </div>
          </div>

          {/* Right Two Round Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white/85 hover:text-white transition-all active:scale-95 shadow-sm"
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
          2. Bottom Content Block (Placed in the lower region / yellow marked area):
          - Headline: "What service do you need today?"
          - Action Cards Carousel
          - Bottom AI Input Container
          ======================================================================
        */}
        <div className="mt-auto flex flex-col gap-4 sm:gap-5 pt-12 pb-1">
          {/* Headline */}
          <div>
            <h1 className="text-[38px] sm:text-[44px] font-bold tracking-tight text-white leading-[1.08] font-sans">
              What service do<br />
              you need today?
            </h1>
          </div>

          {/* Action Cards Carousel */}
          <div className="py-1">
            <div className="flex gap-3.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1 -mx-2 px-2 scroll-smooth">
              {ACTION_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card)}
                  className="group relative flex h-[142px] w-[148px] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-[#250901]/60 hover:bg-[#340e02]/80 backdrop-blur-xl p-4 text-left transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
                >
                  {/* Top-Left Sparkle Icon */}
                  <div className="text-[#ff7826] group-hover:scale-110 transition-transform">
                    <MaterialIcon name="auto_awesome" size={20} />
                  </div>

                  {/* Bottom Title */}
                  <span className="text-[13px] font-medium text-white/95 leading-snug line-clamp-3">
                    {card.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom AI Container */}
          <div>
            <div className="rounded-[32px] border border-white/10 bg-[#1c0702]/80 backdrop-blur-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all focus-within:border-white/25">
              {/* Input Prompt */}
              <div className="mb-7 pt-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                  placeholder="Ask about any government service or speak your need..."
                  className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/40 font-sans"
                />
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Paperclip / Attachment Button */}
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all active:scale-95"
                    title="Attach citizen document"
                    aria-label="Attach citizen document"
                  >
                    <MaterialIcon name="attach_file" size={19} />
                  </button>
                </div>

                {/* Minimal Voice Button */}
                <button
                  type="button"
                  onClick={() => onOpenVoice(inputText.trim() || undefined)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff5e00] hover:bg-[#ea5300] text-white shadow-md shadow-black/20 hover:shadow-orange-500/25 transition-all duration-150 active:scale-95"
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
