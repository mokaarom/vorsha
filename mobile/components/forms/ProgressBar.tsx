import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, useThemeColor } from 'heroui-native';
import { toBanglaNumber } from '../../utils/formatting';
import { useSettingsStore } from '../../store/settingsStore';

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const language = useSettingsStore((s) => s.language);
  const [accent, border, muted] = useThemeColor([
    'accent',
    'border',
    'muted',
  ]) as string[];

  const progress = totalSteps > 0 ? (currentStep + 1) / totalSteps : 0;
  const percentage = Math.round(progress * 100);

  const displayStep =
    language === 'bn' ? toBanglaNumber(currentStep + 1) : currentStep + 1;
  const displayTotal =
    language === 'bn' ? toBanglaNumber(totalSteps) : totalSteps;
  const displayPercentage =
    language === 'bn' ? toBanglaNumber(percentage) : percentage;

  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View style={styles.textRow}>
        <Typography type="body-sm" color="muted" weight="medium">
          {language === 'bn'
            ? `ধাপ ${displayStep} / ${displayTotal}`
            : `Step ${displayStep} of ${displayTotal}`}
        </Typography>
        <Typography type="body-sm" weight="medium" style={{ color: accent }}>
          {displayPercentage}%
        </Typography>
      </View>
      <View style={[styles.track, { backgroundColor: border }]}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: accent },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
