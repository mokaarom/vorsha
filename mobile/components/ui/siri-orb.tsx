import React, { useEffect, useId } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';
import {
  SIRI_ORB_SHADER_COLORS,
  parseOrbSize,
  type SiriOrbProps,
} from './siri-orb.shared';

export type { SiriOrbProps } from './siri-orb.shared';
export { SIRI_ORB_SHADER_COLORS, parseOrbSize } from './siri-orb.shared';

/**
 * Native stand-in for the CSS Siri orb (see siri-orb.web.tsx). Overlapping
 * shader-coloured fields rotate inside a circular clip.
 */
export default function SiriOrb({
  size = '192px',
  colors,
  animationDuration = 20,
  onPress,
  accessibilityLabel,
}: SiriOrbProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const reduceMotion = useReducedMotion();
  const px = parseOrbSize(size);
  const palette = { ...SIRI_ORB_SHADER_COLORS, ...colors };
  const angle = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) {
      angle.value = 0;
      return;
    }
    angle.value = 0;
    angle.value = withRepeat(
      withTiming(360, {
        duration: animationDuration * 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    return () => cancelAnimation(angle);
  }, [angle, animationDuration, reduceMotion]);

  const spin = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
  }));

  const orb = (
    <View
      style={[
        styles.clip,
        { width: px, height: px, borderRadius: px / 2, backgroundColor: palette.bg },
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, spin]}>
        <Svg width={px} height={px} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id={`c1${uid}`} cx="30%" cy="65%" r="55%">
              <Stop offset="0" stopColor={palette.c1} stopOpacity={0.95} />
              <Stop offset="1" stopColor={palette.c1} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`c2${uid}`} cx="70%" cy="35%" r="55%">
              <Stop offset="0" stopColor={palette.c2} stopOpacity={0.95} />
              <Stop offset="1" stopColor={palette.c2} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`c3${uid}`} cx="65%" cy="75%" r="50%">
              <Stop offset="0" stopColor={palette.c3} stopOpacity={0.9} />
              <Stop offset="1" stopColor={palette.c3} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`c2b${uid}`} cx="25%" cy="25%" r="45%">
              <Stop offset="0" stopColor={palette.c2} stopOpacity={0.7} />
              <Stop offset="1" stopColor={palette.c2} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`c1b${uid}`} cx="80%" cy="80%" r="45%">
              <Stop offset="0" stopColor={palette.c1} stopOpacity={0.7} />
              <Stop offset="1" stopColor={palette.c1} stopOpacity={0} />
            </RadialGradient>
            <RadialGradient id={`core${uid}`} cx="40%" cy="60%" r="60%">
              <Stop offset="0" stopColor={palette.c3} stopOpacity={0.55} />
              <Stop offset="1" stopColor={palette.c3} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill={`url(#core${uid})`} />
          <Circle cx="30" cy="65" r="38" fill={`url(#c1${uid})`} />
          <Circle cx="70" cy="35" r="36" fill={`url(#c2${uid})`} />
          <Circle cx="65" cy="75" r="32" fill={`url(#c3${uid})`} />
          <Circle cx="25" cy="25" r="28" fill={`url(#c2b${uid})`} />
          <Circle cx="80" cy="80" r="26" fill={`url(#c1b${uid})`} />
        </Svg>
      </Animated.View>
      <Svg
        width={px}
        height={px}
        viewBox="0 0 100 100"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Ellipse
          cx="45"
          cy="38"
          rx="22"
          ry="12"
          fill="#FFFFFF"
          opacity={0.14}
          transform="rotate(-24 45 38)"
        />
      </Svg>
    </View>
  );

  if (!onPress) return orb;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.97 : 1 }] })}
    >
      {orb}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
});
