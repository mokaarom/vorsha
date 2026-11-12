/**
 * Brand palette from the PRD (section 9.4):
 * Government blue #1A5276, Trust green #27AE60, Alert red #E74C3C.
 */
export const Brand = {
  blue: '#1A5276',
  blueLight: '#2E86C1',
  green: '#27AE60',
  red: '#E74C3C',
};

export const Colors = {
  light: {
    // Neutral ramp, tinted toward the government blue
    background: '#F4F7FA',
    foreground: '#0F1B26',
    surface: '#FFFFFF',
    surfaceForeground: '#0F1B26',
    surfaceSecondary: '#EBF0F5',
    surfaceTertiary: '#DFE7EE',
    overlay: '#FFFFFF',
    overlayForeground: '#0F1B26',
    backdrop: 'rgba(15, 27, 38, 0.28)',
    muted: '#5F6F7F',
    default: '#EBF0F5',
    defaultForeground: '#0F1B26',
    accent: '#1A5276',
    accentForeground: '#FFFFFF',
    accentSoft: 'rgba(26, 82, 118, 0.10)',
    accentSoftForeground: '#1A5276',
    field: '#FFFFFF',
    fieldForeground: '#0F1B26',
    fieldPlaceholder: '#6F7E8D',
    fieldBorder: '#D6DFE8',
    border: '#DFE7EE',
    separator: '#D2DBE4',

    // Translucent surfaces that sit on the shader background
    glass: 'rgba(255, 255, 255, 0.78)',
    glassStrong: 'rgba(255, 255, 255, 0.94)',
    glassBorder: 'rgba(26, 82, 118, 0.10)',

    // Status
    success: '#27AE60',
    successForeground: '#FFFFFF',
    successSoft: 'rgba(39, 174, 96, 0.14)',
    successSoftForeground: '#1E8449',
    warning: '#D97706',
    warningForeground: '#0F1B26',
    warningSoft: 'rgba(217, 119, 6, 0.12)',
    warningSoftForeground: '#B45309',
    danger: '#E74C3C',
    dangerForeground: '#FFFFFF',
    dangerSoft: 'rgba(231, 76, 60, 0.12)',
    dangerSoftForeground: '#C0392B',

    // Legacy aliases
    primary: '#1A5276',
    primaryLight: '#2E86C1',
    primaryDark: '#154360',
    secondary: '#27AE60',
    secondaryLight: '#58D68D',
    secondaryDark: '#1E8449',
    dangerLight: 'rgba(231, 76, 60, 0.12)',
    info: '#1A5276',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    divider: '#DFE7EE',
    text: '#0F1B26',
    textSecondary: '#44535F',
    textMuted: '#5F6F7F',
    textInverse: '#FFFFFF',

    // Voice states
    voiceActive: '#1A5276',
    voiceListening: '#E74C3C',
    voiceProcessing: '#D97706',
    voiceSpeaking: '#27AE60',
    voiceRipple: 'rgba(26, 82, 118, 0.14)',
  },
  dark: {
    background: '#080E15',
    foreground: '#EDF2F6',
    surface: '#0F1821',
    surfaceForeground: '#EDF2F6',
    surfaceSecondary: '#17222D',
    surfaceTertiary: '#1F2C39',
    overlay: '#131D27',
    overlayForeground: '#EDF2F6',
    backdrop: 'rgba(0, 0, 0, 0.55)',
    muted: '#8696A5',
    default: '#17222D',
    defaultForeground: '#EDF2F6',
    accent: '#3E97D1',
    accentForeground: '#FFFFFF',
    accentSoft: 'rgba(62, 151, 209, 0.16)',
    accentSoftForeground: '#7DBDE8',
    field: '#17222D',
    fieldForeground: '#EDF2F6',
    fieldPlaceholder: '#8696A5',
    fieldBorder: '#263442',
    border: '#1F2C39',
    separator: '#283747',

    glass: 'rgba(15, 24, 33, 0.58)',
    glassStrong: 'rgba(15, 24, 33, 0.86)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',

    success: '#2ECC71',
    successForeground: '#06130C',
    successSoft: 'rgba(46, 204, 113, 0.16)',
    successSoftForeground: '#58D68D',
    warning: '#F59E0B',
    warningForeground: '#080E15',
    warningSoft: 'rgba(245, 158, 11, 0.16)',
    warningSoftForeground: '#FBBF24',
    danger: '#E74C3C',
    dangerForeground: '#FFFFFF',
    dangerSoft: 'rgba(231, 76, 60, 0.18)',
    dangerSoftForeground: '#F1948A',

    primary: '#3E97D1',
    primaryLight: '#5DADE2',
    primaryDark: '#1A5276',
    secondary: '#2ECC71',
    secondaryLight: '#58D68D',
    secondaryDark: '#27AE60',
    dangerLight: 'rgba(231, 76, 60, 0.18)',
    info: '#3E97D1',
    surfaceElevated: '#17222D',
    card: '#0F1821',
    divider: '#1F2C39',
    text: '#EDF2F6',
    textSecondary: '#AEBBC7',
    textMuted: '#8696A5',
    textInverse: '#080E15',

    voiceActive: '#3E97D1',
    voiceListening: '#E74C3C',
    voiceProcessing: '#F59E0B',
    voiceSpeaking: '#2ECC71',
    voiceRipple: 'rgba(62, 151, 209, 0.18)',
  },
};

export type ThemeColors = typeof Colors.light;

/**
 * Colours for content placed directly on the "deep" shader tone
 * (live voice, onboarding). These do not follow the light/dark theme.
 */
export const OnShader = {
  text: '#F4F8FB',
  muted: 'rgba(244, 248, 251, 0.70)',
  glass: 'rgba(255, 255, 255, 0.10)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
  solid: '#FFFFFF',
  solidForeground: '#0F1B26',
};
