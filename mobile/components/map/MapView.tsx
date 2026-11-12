import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Typography, useThemeColor } from 'heroui-native';
import { BorderRadius, Spacing } from '../../constants/theme';
import { MapPin } from 'lucide-react-native';
import { formatCoordinates } from '../../utils/geo';

export interface MapViewProps {
  latitude: number;
  longitude: number;
  title?: string;
  height?: number;
}

export const MapView: React.FC<MapViewProps> = ({
  latitude,
  longitude,
  title,
  height = 180,
}) => {
  const [surfaceSecondary, border, danger, accentSoft] = useThemeColor([
    'surface-secondary',
    'border',
    'danger',
    'accent-soft',
  ]) as string[];

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: surfaceSecondary,
          borderColor: border,
        },
      ]}
    >
      <View style={styles.markerContainer}>
        <View style={[styles.markerHalo, { backgroundColor: accentSoft }]} />
        <MapPin size={28} color={danger} strokeWidth={1.5} />
      </View>
      <Surface style={styles.infoCard}>
        <Typography type="body-sm" weight="medium">
          {title || 'Location'}
        </Typography>
        <Typography type="body-xs" color="muted">
          {formatCoordinates({ latitude, longitude })}
        </Typography>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHalo: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  infoCard: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
});
