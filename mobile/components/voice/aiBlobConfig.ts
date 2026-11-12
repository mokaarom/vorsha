import type { VoiceState } from '../../store/voiceStore';

export type AIBlobState = 'idle' | 'listening' | 'thinking' | 'speaking';

/**
 * Configuration for the React Bits Pro "AI Blob" (`@reactbits-starter/ai-blob-tw`).
 * These are the exact values requested for the orb. `state` is the resting
 * value; screens drive the live value from the voice store via `toBlobState`.
 */
export const AI_BLOB_CONFIG = {
  colors: ['#3a86ff', '#06ffa5', '#3a86ff', '#06ffa5'],
  glowIntensity: 1.23,
  noiseScale: 3.8000000000000003,
  innerScale: 1.56,
  rimWidth: 1.75,
  rimIntensity: 1.45,
  coreIntensity: 0.87,
  glints: 1,
  halo: 1.69,
  wobble: 0,
  size: 400,
  state: 'idle' as AIBlobState,
  autoVolume: true,
  reactivity: 1,
  animationSpeed: 0.66,
  colorSpeed: 1,
  hoverTilt: 1.58,
  resolution: 1,
  blend: 'auto' as 'auto' | 'glow' | 'ink',
  interactive: true,
  intro: true,
  paused: false,
};

/** Maps the app's voice pipeline state onto the orb's four states. */
export function toBlobState(state: VoiceState): AIBlobState {
  switch (state) {
    case 'listening':
      return 'listening';
    case 'processing':
      return 'thinking';
    case 'speaking':
      return 'speaking';
    default:
      return 'idle';
  }
}

/** Converts recorder metering (dBFS, roughly -160..0) to a 0..1 level. */
export function meteringToVolume(db: number): number {
  if (!Number.isFinite(db)) return 0;
  const level = (db + 60) / 60;
  return Math.max(0, Math.min(1, level));
}
