import React, { useEffect, useRef } from 'react';
import { Pressable, View, StyleSheet, Animated, Easing } from 'react-native';
import { useThemeColor } from 'heroui-native';
import { TouchTargets } from '../../constants/theme';
import { VoiceState } from '../../store/voiceStore';
import { Mic, Square, Loader2, Volume2 } from 'lucide-react-native';

export interface VoiceButtonProps {
  state: VoiceState;
  onPress: () => void;
  size?: number;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  state,
  onPress,
  size = TouchTargets.voiceButton,
}) => {
  const [accent, danger, warning, success, accentFg] = useThemeColor([
    'accent',
    'danger',
    'warning',
    'success',
    'accent-foreground',
  ]) as string[];
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === 'listening' || state === 'speaking') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
    pulseAnim.setValue(1);
  }, [state, pulseAnim]);

  const getBackgroundColor = () => {
    switch (state) {
      case 'listening':
        return danger;
      case 'processing':
        return warning;
      case 'speaking':
        return success;
      default:
        return accent;
    }
  };

  const renderIcon = () => {
    const iconSize = Math.round(size * 0.4);
    const color = accentFg;
    switch (state) {
      case 'listening':
        return <Square size={iconSize} color={color} fill={color} strokeWidth={1.5} />;
      case 'processing':
        return <Loader2 size={iconSize} color={color} strokeWidth={1.5} />;
      case 'speaking':
        return <Volume2 size={iconSize} color={color} strokeWidth={1.5} />;
      default:
        return <Mic size={iconSize} color={color} strokeWidth={1.5} />;
    }
  };

  const isLive = state === 'listening' || state === 'speaking';
  const bg = getBackgroundColor();

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ripple,
          {
            width: size * 1.36,
            height: size * 1.36,
            borderRadius: (size * 1.36) / 2,
            backgroundColor: bg,
            opacity: isLive ? 0.1 : 0,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          state === 'listening' ? 'Stop listening' : 'Start voice query'
        }
        style={({ pressed }) => [
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
            opacity: pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }],
          },
        ]}
      >
        {renderIcon()}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
