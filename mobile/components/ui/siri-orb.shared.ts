import { ShaderColors } from '../common/shaderTheme';

export interface SiriOrbProps {
  size?: string | number;
  className?: string;
  colors?: {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  animationDuration?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const SIRI_ORB_SHADER_COLORS = {
  bg: 'transparent',
  c1: ShaderColors.color1,
  c2: ShaderColors.color2,
  c3: ShaderColors.color3,
} as const;

export function parseOrbSize(size: string | number = '192px'): number {
  if (typeof size === 'number') return size;
  const parsed = parseInt(size.replace('px', ''), 10);
  return Number.isFinite(parsed) ? parsed : 192;
}
