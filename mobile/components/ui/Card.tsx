import React from 'react';
import { ViewProps, StyleProp, ViewStyle } from 'react-native';
import { Card as HeroCard, PressableFeedback } from 'heroui-native';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'flat';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  onPress,
  variant = 'elevated',
  style,
  children,
  ...props
}) => {
  const surfaceVariant =
    variant === 'flat' ? 'transparent' : variant === 'outlined' ? 'secondary' : 'default';

  const content = (
    <HeroCard variant={surfaceVariant} style={style as StyleProp<ViewStyle>} {...props}>
      {children}
    </HeroCard>
  );

  if (onPress) {
    return (
      <PressableFeedback onPress={onPress} accessibilityRole="button">
        {content}
      </PressableFeedback>
    );
  }

  return content;
};

export const CardHeader = HeroCard.Header;
export const CardBody = HeroCard.Body;
export const CardFooter = HeroCard.Footer;
export const CardTitle = HeroCard.Title;
export const CardDescription = HeroCard.Description;
