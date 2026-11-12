import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, useThemeColor } from 'heroui-native';
import { VoiceState } from '../../store/voiceStore';
import { useTranslation } from 'react-i18next';

export interface VoiceStateIndicatorProps {
  state: VoiceState;
}

export const VoiceStateIndicator: React.FC<VoiceStateIndicatorProps> = ({
  state,
}) => {
  const { t } = useTranslation();
  const [accent, danger, warning, success, muted] = useThemeColor([
    'accent',
    'danger',
    'warning',
    'success',
    'muted',
  ]) as string[];

  const getLabel = () => {
    switch (state) {
      case 'listening':
        return t('voice.listening');
      case 'processing':
        return t('voice.processing');
      case 'speaking':
        return t('voice.speaking');
      default:
        return t('home.tap_to_speak');
    }
  };

  const getColor = () => {
    switch (state) {
      case 'listening':
        return danger;
      case 'processing':
        return warning;
      case 'speaking':
        return success;
      default:
        return muted;
    }
  };

  const color = getColor();

  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Typography type="body-sm" style={{ color }} weight="medium">
        {getLabel()}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
