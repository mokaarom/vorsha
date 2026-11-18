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
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import type { VoiceState } from '../../store/voiceStore';
import { AI_BLOB_CONFIG, AIBlobState, toBlobState } from './aiBlobConfig';

/**
 * The voice orb used on Home, Live and Onboarding.
 *
 * STAND-IN: this draws a simple SVG orb. It is NOT the React Bits Pro
 * "AI Blob". That component has to be installed with the shadcn CLI and a
 * license key (`npx shadcn@latest add @reactbits-starter/ai-blob-tw`). Once it
 * is in the project, render it here with `AI_BLOB_CONFIG` and
 * `state={toBlobState(state)}`; every screen picks it up through this file.
 */
export interface VoiceOrbProps {
  state: VoiceState;
  size?: number;
  /** Live input level, 0 to 1. */
  volume?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const MOTION: Record<
  AIBlobState,
  { breath: number; breathMs: number; spinMs: number; halo: number }
> = {
  idle: { breath: 0.03, breathMs: 2600, spinMs: 14000, halo: 1 },
  listening: { breath: 0.06, breathMs: 900, spinMs: 9000, halo: 1.1 },
  thinking: { breath: 0.04, breathMs: 700, spinMs: 2600, halo: 1.04 },
  speaking: { breath: 0.09, breathMs: 520, spinMs: 7000, halo: 1.14 },
};

const [COLOR_A, COLOR_B] = AI_BLOB_CONFIG.colors;

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state,
  size = AI_BLOB_CONFIG.size,
  volume = 0,
  onPress,
  accessibilityLabel,
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const blobState = toBlobState(state);
  const reduceMotion = useReducedMotion();

  const breath = useSharedValue(0);
  const spin = useSharedValue(0);
  const amplitude = useSharedValue(MOTION.idle.breath);
  const haloScale = useSharedValue(MOTION.idle.halo);
  const level = useSharedValue(0);

  useEffect(() => {
    const motion = MOTION[blobState];
    amplitude.value = withTiming(motion.breath, { duration: 400 });
    haloScale.value = withTiming(motion.halo, { duration: 400 });

    if (reduceMotion) {
      breath.value = 0;
      return;
    }

    breath.value = 0;
    breath.value = withRepeat(
      withTiming(1, {
        duration: motion.breathMs,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
    spin.value = 0;
    spin.value = withRepeat(
      withTiming(360, { duration: motion.spinMs, easing: Easing.linear }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(breath);
      cancelAnimation(spin);
    };
  }, [blobState, reduceMotion, amplitude, breath, haloScale, spin]);

  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, volume));
    level.value = withTiming(clamped, { duration: 120 });
  }, [volume, level]);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.7 + breath.value * 0.3,
    transform: [
      {
        scale:
          haloScale.value + breath.value * amplitude.value * 1.5 + level.value * 0.18,
      },
    ],
  }));

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + breath.value * amplitude.value + level.value * 0.08 },
    ],
  }));

  const rimStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + breath.value * amplitude.value + level.value * 0.08 },
      { rotate: `${spin.value}deg` },
    ],
  }));

  const orb = (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[styles.layer, haloStyle]}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id={`halo${uid}`} cx="50%" cy="50%" r="50%">
              <Stop offset="0.5" stopColor={COLOR_A} stopOpacity={0.42} />
              <Stop offset="0.78" stopColor={COLOR_B} stopOpacity={0.16} />
              <Stop offset="1" stopColor={COLOR_B} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill={`url(#halo${uid})`} />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.layer, bodyStyle]}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id={`body${uid}`} cx="42%" cy="36%" r="70%">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.96} />
              <Stop offset="0.5" stopColor="#D7ECFF" stopOpacity={0.82} />
              <Stop offset="1" stopColor={COLOR_A} stopOpacity={0.72} />
            </RadialGradient>
            <RadialGradient id={`core${uid}`} cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={COLOR_B} stopOpacity={0.85} />
              <Stop offset="1" stopColor={COLOR_B} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="33" fill={`url(#body${uid})`} />
          <Circle cx="54" cy="58" r="20" fill={`url(#core${uid})`} />
          <Ellipse
            cx="40"
            cy="33"
            rx="11"
            ry="5.5"
            fill="#FFFFFF"
            opacity={0.6}
            transform="rotate(-28 40 33)"
          />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.layer, rimStyle]}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id={`rim${uid}`} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={COLOR_A} stopOpacity={1} />
              <Stop offset="0.5" stopColor={COLOR_B} stopOpacity={1} />
              <Stop offset="1" stopColor={COLOR_A} stopOpacity={1} />
            </LinearGradient>
          </Defs>
          <Circle
            cx="50"
            cy="50"
            r="33"
            fill="none"
            stroke={`url(#rim${uid})`}
            strokeWidth={2.2}
          />
        </Svg>
      </Animated.View>
    </View>
  );

  if (!onPress) {
    return (
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {orb}
      </View>
    );
  }

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
};

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
