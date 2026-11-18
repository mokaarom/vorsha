'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Strands from './Strands';
import MaterialIcon from './MaterialIcon';

const VORSHA_STRANDS_COLORS = [
  '#ff4d00', // Radiant Orange Primary
  '#ff7826', // Warm Amber Orange
  '#ffa000', // Golden Warm Glow
  '#ffffff', // Brilliant Core Light
  '#ffd199', // Peach / Cream Highlight
  '#ea580c', // Fiery Deep Orange
  '#9a3412', // Rich Burnt Amber
];

interface VoiceAssistantProps {
  onClose?: () => void;
  serviceContext?: string;
}

export default function VoiceAssistant({ onClose, serviceContext }: VoiceAssistantProps = {}) {
  const [isListening, setIsListening] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [micLevel, setMicLevel] = useState<number | undefined>(undefined);
  const [isClosed, setIsClosed] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Compute status message directly from state
  const statusMessage = isClosed
    ? 'Chat Closed'
    : isThinking
      ? 'Vorsha is Thinking...'
      : isPaused
        ? 'Listening Paused'
        : isListening
          ? 'Vorsha is Listening'
          : 'Vorsha is Idle';

  // Optional microphone hookup for real audio reactive levels
  const startMic = async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateLevel = () => {
        if (!analyserRef.current || isPaused || !isListening) {
          setMicLevel(undefined);
          animFrameRef.current = requestAnimationFrame(updateLevel);
          return;
        }
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(1, avg / 80);
        setMicLevel(normalized > 0.05 ? normalized : undefined);
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch {
      setMicLevel(undefined);
    }
  };

  const stopMic = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => { });
      audioContextRef.current = null;
    }
    setMicLevel(undefined);
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  // Handlers
  const toggleVoice = () => {
    if (isClosed) setIsClosed(false);
    if (!isListening) {
      setIsListening(true);
      setIsPaused(false);
      startMic();
    } else {
      setIsListening(false);
      stopMic();
    }
  };

  const togglePause = () => {
    if (!isListening) {
      setIsListening(true);
      setIsPaused(false);
      startMic();
      return;
    }
    setIsPaused((prev) => !prev);
  };

  const handleSend = () => {
    setIsThinking(true);

    // Simulate assistant thinking/reply cycle
    setTimeout(() => {
      setIsThinking(false);
    }, 1200);
  };

  const handleCloseChat = () => {
    setIsClosed(true);
    setIsListening(false);
    stopMic();
    if (onClose) {
      onClose();
    }
  };

  const handleReopen = () => {
    setIsClosed(false);
    setIsListening(true);
    setIsPaused(false);
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-transparent text-slate-100 font-sans select-none">
      {/* Subtle radial vignette overlay: keeps center focused on the voice assistant orb */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_45%,transparent_20%,rgba(18,15,23,0.45)_65%,#120f17_100%)]" />

      {/* 
        ======================================================================
        2. Top Bar (relative z-10) - Centered "Close chat"
        ======================================================================
      */}
      <header className="relative z-10 flex w-full items-center justify-center px-6 py-5 sm:px-10">
        {!isClosed ? (
          <button
            type="button"
            onClick={handleCloseChat}
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] hover:bg-white/[0.14] px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-200 active:scale-95"
            aria-label="Close chat"
          >
            <MaterialIcon
              name="close"
              size={18}
              className="text-slate-400 transition-transform duration-200 group-hover:rotate-90 group-hover:text-white"
            />
            <span>Close chat</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReopen}
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/15 hover:bg-orange-500/25 px-4 py-1.5 text-xs sm:text-sm font-medium text-orange-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(255,94,0,0.25)] backdrop-blur-2xl transition-all duration-200 active:scale-95"
          >
            <MaterialIcon
              name="chat"
              size={18}
              className="text-orange-400"
            />
            <span>Resume chat</span>
          </button>
        )}
      </header>

      {/* 
        ======================================================================
        3. Center: Clean Hero Stage with Strands Voice Orb
        ======================================================================
      */}
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6">
        {!isClosed ? (
          <div className="flex w-full flex-col items-center">
            {/* The Strands Orb Component */}
            <div className="relative flex h-[280px] w-full max-w-[360px] items-center justify-center sm:h-[340px] sm:max-w-[420px]">
              <Strands
                colors={VORSHA_STRANDS_COLORS}
                glass={true}
                glassSize={0.92}
                amplitude={1.25}
                waviness={1.3}
                speed={isPaused ? 0.2 : 1}
                energy={isPaused ? 0.15 : isListening ? 0.75 : 0.3}
                listening={isListening && !isPaused}
                level={micLevel}
                interactive={true}
                clickPulse={true}
                thickness={1.4}
                glow={1.2}
                refraction={1.35}
                dispersion={1.2}
                rim={1.4}
                lightMode={false}
                className="h-full w-full"
              />
            </div>

            {/* In bottom of strand: small font "Vorsha is Listening" (Requirement) */}
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <div className="inline-flex items-center gap-2">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full transition-all duration-300 ${!isPaused && isListening
                      ? 'bg-orange-500 shadow-[0_0_12px_rgba(255,94,0,0.95)] animate-pulse'
                      : isPaused
                        ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]'
                        : 'bg-slate-500'
                    }`}
                />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white font-sans">
                  {statusMessage}
                </span>
              </div>
              {serviceContext && (
                <span className="text-[11px] text-orange-200 font-medium px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-400/20 max-w-xs truncate shadow-sm">
                  {serviceContext}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-2xl max-w-sm mx-auto">
            <div className="h-16 w-16 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mb-4 text-orange-400">
              <Image src="/assets/logo/colored-icon.svg" alt="Vorsha Logo" width={38} height={38} />
            </div>
            <h2 className="text-xl font-bold tracking-tight mb-2 text-white">Chat is closed</h2>
            <p className="text-sm text-slate-300 mb-6 font-sans">
              Voice assistant has paused. Click below to re-open Vorsha anytime.
            </p>
            <button
              type="button"
              onClick={handleReopen}
              className="btn-gradient !px-6 !py-2.5 text-sm"
            >
              Open Voice Assistant
            </button>
          </div>
        )}
      </main>

      {/* 
        ======================================================================
        4. Bottom Controls: Pause (left), Voice (middle), Send (right)
        ======================================================================
      */}
      <footer className="relative z-10 w-full pb-8 pt-2 sm:pb-10">
        <div className="mx-auto flex w-full max-w-md flex-col items-center px-6">
          {/* Three Control Buttons: Pause (left), Voice (middle), Send (right) */}
          <div className="flex w-full items-center justify-around max-w-xs sm:max-w-sm">
            {/* 1. Pause Button on Left (Requirement) */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={togglePause}
                disabled={isClosed}
                className={`group flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full border shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-200 active:scale-95 ${isPaused
                    ? 'border-amber-400/70 bg-amber-400/20 text-amber-300 ring-2 ring-amber-400/30'
                    : 'border-white/12 bg-white/[0.07] hover:bg-white/[0.14] text-slate-200 hover:text-white'
                  }`}
                title={isPaused ? 'Resume listening' : 'Pause listening'}
                aria-label="Pause button"
              >
                {isPaused ? (
                  /* Play / Resume Icon */
                  <MaterialIcon name="play_arrow" size={26} className="text-amber-300 ml-0.5" />
                ) : (
                  /* Pause Icon */
                  <MaterialIcon name="pause" size={24} className="text-slate-200 group-hover:text-white" />
                )}
              </button>
              <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                {isPaused ? 'Resume' : 'Pause'}
              </span>
            </div>

            {/* 2. Voice Button in Middle (Minimal) */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={toggleVoice}
                className={`flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full transition-all duration-200 active:scale-95 shadow-lg ${!isClosed && isListening && !isPaused
                    ? 'bg-[#ff5e00] hover:bg-[#ea5300] text-white shadow-orange-950/40 ring-2 ring-white/15'
                    : 'border border-orange-500/40 bg-orange-950/30 text-orange-300 hover:border-orange-400 hover:bg-orange-900/30'
                  }`}
                title={isListening ? 'Stop voice' : 'Start voice'}
                aria-label="Voice button"
              >
                {/* Microphone Icon */}
                <MaterialIcon
                  name="mic"
                  size={28}
                  className="transition-transform duration-200"
                />
              </button>
              <span className="mt-2 text-[10px] font-semibold tracking-wider uppercase text-slate-300">
                {!isClosed && isListening && !isPaused ? 'Listening' : 'Voice'}
              </span>
            </div>

            {/* 3. Send Button on Right (Requirement) */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={handleSend}
                disabled={isClosed}
                className="group flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] hover:bg-white/[0.14] text-slate-200 hover:text-orange-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-200 active:scale-95"
                title="Send query"
                aria-label="Send button"
              >
                {/* Send / Paper Plane Icon */}
                <MaterialIcon
                  name="send"
                  size={22}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Send
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
