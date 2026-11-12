import React from 'react';
import { TextProps } from 'react-native';
import { Typography as HeroTypography } from 'heroui-native';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'label';
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const mapType = (
  variant: TypographyProps['variant']
): 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'body-xs' => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'caption':
      return 'body-xs';
    case 'label':
      return 'body-sm';
    default:
      return 'body';
  }
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  align = 'left',
  style,
  children,
  ...props
}) => {
  const weight =
    variant === 'bodyBold' || variant === 'label' ? 'medium' : undefined;

  return (
    <HeroTypography
      type={mapType(variant)}
      weight={weight}
      align={align === 'left' ? 'start' : align === 'right' ? 'end' : 'center'}
      style={[{ color }, style]}
      {...props}
    >
      {children}
    </HeroTypography>
  );
};
