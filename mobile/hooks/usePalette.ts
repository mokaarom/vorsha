import { Colors, ThemeColors } from '../constants/colors';
import { useSettingsStore } from '../store/settingsStore';

export function useIsDark(): boolean {
  return useSettingsStore((s) => s.theme === 'dark');
}

/** Full colour palette for the active theme, including the glass tokens. */
export function usePalette(): ThemeColors {
  const isDark = useIsDark();
  return isDark ? Colors.dark : Colors.light;
}
