import type { StyleProp, ViewStyle } from 'react-native';

/**
 * mist: default full-screen shader for content screens.
 * deep: immersive shader for live voice and onboarding.
 */
export type ShaderTone = 'mist' | 'deep';

export interface ShaderBackgroundProps {
  tone?: ShaderTone;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
}

/** ShaderGradient water-plane colours. */
export const ShaderColors = {
  color1: '#94ffd1',
  color2: '#6bf5ff',
  color3: '#ffffff',
  bg1: '#000000',
  bg2: '#000000',
};

export function shaderBase(_tone: ShaderTone, _isDark: boolean): string {
  return ShaderColors.bg1;
}
