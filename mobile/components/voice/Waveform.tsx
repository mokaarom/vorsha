import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from 'heroui-native';
import { calculateWaveformHeights } from '../../utils/audio';

export interface WaveformProps {
  metering?: number;
  height?: number;
  barColor?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  metering = -40,
  height = 40,
  barColor,
}) => {
  const accent = useThemeColor('accent') as string;
  const color = barColor || accent;
  const bars = calculateWaveformHeights(metering);

  return (
    <View style={[styles.container, { height }]} accessibilityLabel="Audio waveform">
      {bars.map((relativeHeight, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              height: Math.max(4, relativeHeight * height),
              opacity: 0.55 + relativeHeight * 0.45,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
});
