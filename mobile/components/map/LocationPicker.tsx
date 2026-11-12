import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Surface, Typography, useThemeColor } from 'heroui-native';
import { BorderRadius, Spacing, TouchTargets } from '../../constants/theme';
import { useSettingsStore } from '../../store/settingsStore';
import { MapPin, Navigation } from 'lucide-react-native';
import { formatCoordinates } from '../../utils/geo';

export interface LocationPickerProps {
  latitude: number;
  longitude: number;
  onRefreshLocation?: () => void;
  loading?: boolean;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  latitude,
  longitude,
  onRefreshLocation,
  loading = false,
}) => {
  const language = useSettingsStore((s) => s.language);
  const [accent, accentSoft, border] = useThemeColor([
    'accent',
    'accent-soft',
    'border',
  ]) as string[];

  return (
    <Surface
      style={[
        styles.container,
        { borderColor: border, borderWidth: 1 },
      ]}
    >
      <View style={styles.iconWrapper}>
        <MapPin size={20} color={accent} strokeWidth={1.5} />
      </View>
      <View style={styles.textWrapper}>
        <Typography type="body-xs" color="muted">
          {language === 'bn' ? 'GPS অবস্থান' : 'GPS location'}
        </Typography>
        <Typography type="body-sm" weight="medium">
          {formatCoordinates({ latitude, longitude })}
        </Typography>
      </View>
      {onRefreshLocation ? (
        <Pressable
          onPress={onRefreshLocation}
          disabled={loading}
          accessibilityLabel="Refresh location"
          accessibilityRole="button"
          style={[styles.refreshBtn, { backgroundColor: accentSoft }]}
        >
          <Navigation size={16} color={accent} strokeWidth={1.5} />
        </Pressable>
      ) : null}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: TouchTargets.min,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.xs,
  },
  iconWrapper: {
    marginRight: Spacing.sm,
    width: 24,
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    gap: 2,
  },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
