import { Platform } from 'react-native';

export const Fonts = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'sans-serif',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'sans-serif',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'sans-serif',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
  heading: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'sans-serif',
  }),
  light: 'Mont-ExtraLight',
  bengali: 'NotoSansBengali-Regular',
  bengaliBold: 'NotoSansBengali-Bold',
};

// Strictly on the 4px grid scale: 4, 8, 12, 16, 20, 24, 32, 48
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// HeroUI Native radius scale (--radius: 8px, --field-radius: 12px)
export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

export const TouchTargets = {
  min: 48, // 48dp minimum required by SRS NFR-A-05
  voiceButton: 72, // ≥ 64dp required by SRS Section 9.4 (on 4px scale)
};

export const Shadows = {
  sm: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  lg: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
};
