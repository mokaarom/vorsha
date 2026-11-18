'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MaterialIcon from './MaterialIcon';

export interface ChatHistoryEntry {
  id: string;
  title: string;
  prompt: string;
}

export interface HistoryGroup {
  group: string;
  items: ChatHistoryEntry[];
}

export const VOROSHA_SIDEBAR_GROUPS: HistoryGroup[] = [
  {
    group: 'Pinned chats',
    items: [
      {
        id: 'pin-1',
        title: 'Smart NID card correction...',
        prompt: 'How do I check the status of my Smart NID card correction and upload required documents?',
      },
      {
        id: 'pin-2',
        title: 'e-Passport police verification',
        prompt: 'Track my e-Passport application status and police clearance online.',
      },
      {
        id: 'pin-3',
        title: 'e-Namjari mutation & RS Khatian',
        prompt: 'Help me apply for e-Namjari land mutation and search Khatian records online.',
      },
    ],
  },
  {
    group: 'Today',
    items: [
      {
        id: 'today-1',
        title: 'Digital birth certificate translation',
        prompt: 'What are the steps to obtain an official English translated birth registration certificate?',
      },
      {
        id: 'today-2',
        title: 'NBR zero income tax return (e-TIN)',
        prompt: 'Guide me step-by-step through filing a zero tax return on the NBR portal.',
      },
      {
        id: 'today-3',
        title: 'BRTA driving license renewal',
        prompt: 'How do I renew my BRTA smart card driving license or apply for a learner test permit?',
      },
    ],
  },
  {
    group: 'Yesterday',
    items: [
      {
        id: 'yest-1',
        title: 'Universal Pension Scheme (Prottoy)',
        prompt: 'Explain how Bangladeshi citizens can enroll in the Universal Pension Scheme (Prottoy/Prabash).',
      },
      {
        id: 'yest-2',
        title: 'Digital municipal trade license',
        prompt: 'How do I obtain or renew a digital municipal trade license through e-Trade online?',
      },
      {
        id: 'yest-3',
        title: 'Utility bill & surcharge inquiry',
        prompt: 'How to verify and pay DESCO/DPDC electricity and Titas gas bills without late fee surcharge?',
      },
      {
        id: 'yest-4',
        title: 'Freedom Fighter allowance status',
        prompt: 'Check beneficiary allowance disbursement status through MIS and Nagad/bKash.',
      },
      {
        id: 'yest-5',
        title: 'Bangladesh Bank remittance bonus',
        prompt: 'What is the current 2.5% cash incentive rule for expatriate wage earner remittances?',
      },
      {
        id: 'yest-6',
        title: 'Helpline 333 & 999 quick guides',
        prompt: 'List the emergency and citizen hotline services available through 333 and 999.',
      },
    ],
  },
];

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat?: (prompt: string) => void;
  onNewChat?: () => void;
}

export default function RightSidebar({
  isOpen,
  onClose,
  onSelectChat,
  onNewChat,
}: RightSidebarProps) {
  const [activeNav, setActiveNav] = useState<string>('dashboard');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleActionClick = (prompt: string) => {
    onClose();
    onSelectChat?.(prompt);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Docked Edge-to-Edge Right Sidebar (No outer margin, not floating) */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-[280px] sm:w-[300px] flex-col justify-between border-l border-white/10 bg-[#140a06]/92 text-slate-200 backdrop-blur-2xl shadow-[-16px_0_40px_rgba(0,0,0,0.85)] transition-transform duration-300 ease-out font-sans select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Sidebar"
      >
        {/* ==================================================================
            1. FIXED TOP SECTION (Close button & Normal Navigation Links)
            ================================================================== */}
        <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-white/[0.07]">
          {/* Top Row: Clean Close Button */}
          <div className="flex items-center justify-end pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Close sidebar"
            >
              <MaterialIcon name="close" size={17} />
            </button>
          </div>

          {/* Normal, Non-Toggle Navigation Links */}
          <div className="flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => {
                setActiveNav('dashboard');
                handleActionClick('Show my citizen dashboard, application status and pending approvals.');
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] transition-all cursor-pointer ${
                activeNav === 'dashboard'
                  ? 'bg-white/10 text-white font-medium border border-white/10 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MaterialIcon
                name="dashboard"
                size={18}
                className={activeNav === 'dashboard' ? 'text-orange-400' : 'text-slate-400'}
              />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('invoices');
                handleActionClick('Check government invoice fees, receipts and payment slips.');
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] transition-all cursor-pointer ${
                activeNav === 'invoices'
                  ? 'bg-white/10 text-white font-medium border border-white/10 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MaterialIcon
                name="credit_card"
                size={18}
                className={activeNav === 'invoices' ? 'text-orange-400' : 'text-slate-400'}
              />
              <span>Invoices & Fees</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('wallet');
                handleActionClick('Open citizen document wallet, certificates and NID copies.');
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] transition-all cursor-pointer ${
                activeNav === 'wallet'
                  ? 'bg-white/10 text-white font-medium border border-white/10 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MaterialIcon
                name="attach_file"
                size={18}
                className={activeNav === 'wallet' ? 'text-orange-400' : 'text-slate-400'}
              />
              <span>Document Wallet</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('notifications');
                handleActionClick('Show government circulars, verification updates and alerts.');
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] transition-all cursor-pointer ${
                activeNav === 'notifications'
                  ? 'bg-white/10 text-white font-medium border border-white/10 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MaterialIcon
                name="notifications"
                size={18}
                className={activeNav === 'notifications' ? 'text-orange-400' : 'text-slate-400'}
              />
              <span>Notifications</span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            2. SCROLLABLE MIDDLE SECTION (Chat History with groups)
            ================================================================== */}
        <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Header row: Chat History + New */}
          <div className="flex items-center justify-between px-1 pb-2">
            <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
              Chat History
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNewChat?.();
              }}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors cursor-pointer"
              title="Start a new inquiry"
            >
              <MaterialIcon name="add" size={14} />
              <span>New</span>
            </button>
          </div>

          {/* Grouped History Lists */}
          <div className="flex flex-col space-y-3.5">
            {VOROSHA_SIDEBAR_GROUPS.map((group) => (
              <div key={group.group} className="flex flex-col space-y-1">
                {/* Section title */}
                <span className="px-1 text-[11px] font-medium text-slate-500">
                  {group.group}
                </span>

                {/* Items */}
                <div className="flex flex-col space-y-0.5">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleActionClick(item.prompt)}
                      className="group flex w-full items-center rounded-lg px-2 py-1.5 text-left text-[12.5px] text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================================
            3. FIXED BOTTOM SECTION (Settings Link & Version)
            ================================================================== */}
        <div className="flex-shrink-0 px-4 py-3.5 border-t border-white/[0.07] bg-black/30">
          <div className="flex items-center justify-between px-1 text-xs">
            <Link
              href="/settings"
              onClick={onClose}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer group"
            >
              <MaterialIcon name="settings" size={16} className="text-orange-400 group-hover:rotate-45 transition-transform duration-200" />
              <span className="font-medium text-[12.5px] group-hover:text-orange-200">Settings</span>
            </Link>
            <span className="text-slate-500 font-mono text-[10.5px]">
              ver. 2.0.4
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
