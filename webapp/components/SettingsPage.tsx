'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MaterialIcon from './MaterialIcon';

type LanguageOption = 'bilingual' | 'bn' | 'en';

export default function SettingsPage() {
  const router = useRouter();

  // Settings State
  const [languageMode, setLanguageMode] = useState<LanguageOption>('bilingual');
  const [micPermission, setMicPermission] = useState<'granted' | 'prompt' | 'denied'>('granted');
  const [phoneNumber, setPhoneNumber] = useState('01712-345678');
  const [tempPhone, setTempPhone] = useState('01712-345678');

  // Inline expanded row: null | 'language' | 'phone'
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Subtle notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check browser mic permission on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.permissions) {
      navigator.permissions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .query({ name: 'microphone' as any })
        .then((permissionStatus) => {
          setMicPermission(permissionStatus.state);
          permissionStatus.onchange = () => {
            setMicPermission(permissionStatus.state);
          };
        })
        .catch(() => {
          setMicPermission('prompt');
        });
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2500);
  };

  const handleToggleMic = async () => {
    if (micPermission === 'granted') {
      setMicPermission('denied');
      showToast('Microphone access paused');
      return;
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission('granted');
        showToast('Microphone access granted');
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch {
      setMicPermission('denied');
      showToast('Microphone permission denied');
    }
  };

  const handleSavePhone = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleaned = tempPhone.trim().replace(/\s+/g, '');
    if (cleaned.length < 10) {
      showToast('Please enter a valid mobile number');
      return;
    }
    setPhoneNumber(cleaned);
    setExpandedRow(null);
    showToast('Phone number updated');
  };

  const languageLabels: Record<LanguageOption, { short: string; full: string }> = {
    bilingual: { short: 'Bilingual', full: 'Bilingual (বাংলা + English)' },
    bn: { short: 'বাংলা', full: 'বাংলা (Standard Bengali)' },
    en: { short: 'English', full: 'English (Official)' },
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0604] text-white font-sans select-none flex flex-col justify-between">
      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[#1f0b04]/90 px-4 py-2 text-xs font-medium text-orange-200 shadow-xl backdrop-blur-md transition-all">
          <MaterialIcon name="check_circle" size={16} className="text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Centered Mobile-Style Frame (Matching Reference) */}
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3.5 bg-[#0c0604]/90 backdrop-blur-md border-b border-white/[0.06]">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Back"
          >
            <MaterialIcon name="chevron_left" size={24} />
          </button>

          <h1 className="text-base font-semibold tracking-tight text-white">
            Settings
          </h1>

          {/* Balanced spacer */}
          <div className="w-9" />
        </header>

        {/* Grouped Settings List */}
        <div className="flex flex-col">
          
          {/* ================================================================
              SECTION 1: VOICE & LANGUAGE
              ================================================================ */}
          <div className="mt-2 flex flex-col">
            {/* Category Header Strip (Matching Reference) */}
            <div className="bg-white/[0.03] border-b border-white/[0.06] px-5 py-2 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
              Voice &amp; Language
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {/* Row 1: Language Selection */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedRow(expandedRow === 'language' ? null : 'language')}
                  className="group flex w-full items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <MaterialIcon
                      name="translate"
                      size={20}
                      className="text-white/60 group-hover:text-orange-400 transition-colors"
                    />
                    <span className="text-sm font-medium text-white/90">
                      Language
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-orange-400 font-medium">
                      {languageLabels[languageMode].short}
                    </span>
                    <MaterialIcon
                      name="expand_more"
                      size={18}
                      className={`text-white/30 transition-transform duration-200 ${
                        expandedRow === 'language' ? 'rotate-180 text-orange-400' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Inline Language Picker */}
                {expandedRow === 'language' && (
                  <div className="bg-black/30 px-5 py-1.5 flex flex-col divide-y divide-white/[0.04] border-t border-white/[0.04]">
                    {(['bilingual', 'bn', 'en'] as LanguageOption[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setLanguageMode(mode);
                          setExpandedRow(null);
                          showToast(`Language set to ${languageLabels[mode].short}`);
                        }}
                        className="flex items-center justify-between py-2.5 text-xs hover:text-white transition-colors cursor-pointer"
                      >
                        <span className={languageMode === mode ? 'text-orange-400 font-medium' : 'text-white/70'}>
                          {languageLabels[mode].full}
                        </span>
                        {languageMode === mode && (
                          <MaterialIcon name="check" size={16} className="text-orange-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 2: Voice Permission */}
              <div className="flex w-full items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3.5">
                  <MaterialIcon
                    name="mic"
                    size={20}
                    className="text-white/60"
                  />
                  <span className="text-sm font-medium text-white/90">
                    Voice Permission
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      micPermission === 'granted' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        micPermission === 'granted' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                    <span>{micPermission === 'granted' ? 'Allowed' : 'Off'}</span>
                  </span>

                  {/* iOS-Style Toggle Switch */}
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      micPermission === 'granted' ? 'bg-[#ff5e00]' : 'bg-white/20'
                    }`}
                    role="switch"
                    aria-checked={micPermission === 'granted'}
                    aria-label="Toggle microphone permission"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        micPermission === 'granted' ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              SECTION 2: ACCOUNT
              ================================================================ */}
          <div className="mt-4 flex flex-col">
            {/* Category Header Strip (Matching Reference) */}
            <div className="bg-white/[0.03] border-y border-white/[0.06] px-5 py-2 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
              Account
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {/* Row: Phone Registration */}
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedRow(expandedRow === 'phone' ? null : 'phone')}
                  className="group flex w-full items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <MaterialIcon
                      name="phone_iphone"
                      size={20}
                      className="text-white/60 group-hover:text-orange-400 transition-colors"
                    />
                    <span className="text-sm font-medium text-white/90">
                      Phone Registration
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/70">
                      +880 {phoneNumber}
                    </span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 text-[10px] font-medium text-emerald-400">
                      Verified
                    </span>
                    <MaterialIcon
                      name="expand_more"
                      size={18}
                      className={`text-white/30 transition-transform duration-200 ${
                        expandedRow === 'phone' ? 'rotate-180 text-orange-400' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Inline Phone Edit Input */}
                {expandedRow === 'phone' && (
                  <form
                    onSubmit={handleSavePhone}
                    className="bg-black/30 px-5 py-3 border-t border-white/[0.04] flex items-center gap-2"
                  >
                    <span className="text-xs text-white/40 font-mono">+880</span>
                    <input
                      type="tel"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      placeholder="01712-345678"
                      className="flex-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-white placeholder:text-white/30 outline-none focus:border-orange-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-[#ff5e00] px-3 py-1 text-xs font-medium text-white hover:bg-[#e05300] transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
