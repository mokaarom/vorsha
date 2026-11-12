import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert } from 'heroui-native';
import { WifiOff } from 'lucide-react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from 'heroui-native';

export const OfflineIndicator: React.FC = () => {
  const { t } = useTranslation();
  const offlineMode = useSettingsStore((s) => s.offlineMode);
  const danger = useThemeColor('danger') as string;

  if (!offlineMode) return null;

  return (
    <View style={styles.wrap}>
      <Alert status="danger">
        <Alert.Indicator>
          <WifiOff size={16} color={danger} strokeWidth={1.5} />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>{t('common.offline_mode')}</Alert.Title>
        </Alert.Content>
      </Alert>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
});
