import { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export function useOffline() {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const { offlineMode, setOfflineMode } = useSettingsStore();

  useEffect(() => {
    // Offline detection logic
    setIsOffline(offlineMode);
  }, [offlineMode]);

  const toggleOffline = () => {
    setOfflineMode(!offlineMode);
  };

  return { isOffline, toggleOffline };
}

