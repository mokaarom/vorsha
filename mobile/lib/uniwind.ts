import React from 'react';
import { useSettingsStore } from '../store/settingsStore';

export type UniwindTheme = 'light' | 'dark';

export const Uniwind = {
  setTheme: (theme: UniwindTheme) => {
    useSettingsStore.getState().setTheme(theme);
  },
  getTheme: (): UniwindTheme => {
    const current = useSettingsStore.getState().theme;
    return current === 'dark' ? 'dark' : 'light';
  },
};

export function useUniwind(): {
  theme: UniwindTheme;
  setTheme: (theme: UniwindTheme) => void;
} {
  const theme = useSettingsStore((s) => (s.theme === 'dark' ? 'dark' : 'light'));
  const setTheme = useSettingsStore((s) => s.setTheme);
  return {
    theme,
    setTheme: (next: UniwindTheme) => setTheme(next),
  };
}

export function withUniwind<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { className?: string }> {
  const Wrapped: React.FC<P & { className?: string }> = (props) => {
    return React.createElement(Component, props);
  };
  Wrapped.displayName = `withUniwind(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}
