import React from 'react';
import { ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { Button as HeroButton, useThemeColor } from 'heroui-native';

export interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const mapVariant = (
  variant: ButtonProps['variant']
): 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' => {
  switch (variant) {
    case 'secondary':
      return 'secondary';
    case 'outline':
      return 'outline';
    case 'danger':
      return 'danger';
    case 'ghost':
      return 'ghost';
    default:
      return 'primary';
  }
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  style,
  onPress,
}) => {
  const [accent, accentFg, dangerFg] = useThemeColor([
    'accent',
    'accent-foreground',
    'danger-foreground',
  ]) as string[];

  const spinnerColor =
    variant === 'outline' || variant === 'ghost' || variant === 'secondary'
      ? accent
      : variant === 'danger'
      ? dangerFg
      : accentFg;

  return (
    <HeroButton
      variant={mapVariant(variant)}
      size={size}
      isDisabled={disabled || loading}
      onPress={onPress}
      style={[
        {
          alignSelf: fullWidth ? 'stretch' : 'auto',
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          {icon}
          <HeroButton.Label>{title}</HeroButton.Label>
        </>
      )}
    </HeroButton>
  );
};
