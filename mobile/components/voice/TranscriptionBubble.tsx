import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Typography, useThemeColor } from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';

export interface TranscriptionBubbleProps {
  text: string;
  isRealtime?: boolean;
}

export const TranscriptionBubble: React.FC<TranscriptionBubbleProps> = ({
  text,
  isRealtime = false,
}) => {
  const [accentSoft, accent, border] = useThemeColor([
    'accent-soft',
    'accent',
    'border',
  ]) as string[];

  if (!text) return null;

  return (
    <Surface
      variant={isRealtime ? 'secondary' : 'default'}
      style={[
        styles.bubble,
        {
          backgroundColor: isRealtime ? accentSoft : undefined,
          borderColor: isRealtime ? accent : border,
          borderWidth: 1,
        },
      ]}
    >
      <Typography type="body" align="center">
        {text}
      </Typography>
    </Surface>
  );
};

const styles = StyleSheet.create({
  bubble: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.xs,
    maxWidth: '90%',
    alignSelf: 'center',
  },
});
