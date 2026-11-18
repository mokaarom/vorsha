import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Chip } from 'heroui-native';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  style?: StyleProp<ViewStyle>;
}

const mapColor = (
  variant: BadgeProps['variant']
): 'accent' | 'default' | 'success' | 'warning' | 'danger' => {
  switch (variant) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
    case 'info':
      return 'accent';
    default:
      return 'default';
  }
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  style,
}) => {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={mapColor(variant)}
      style={style}
    >
      <Chip.Label>{label}</Chip.Label>
    </Chip>
  );
};
