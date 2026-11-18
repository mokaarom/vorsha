import React, { useEffect, useId } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useIsDark } from '../../hooks/usePalette';
import {
  ShaderBackgroundProps,
  ShaderColors,
  shaderBase,
} from './shaderTheme';

export type { ShaderBackgroundProps, ShaderTone } from './shaderTheme';

type BlobProps = {
  color: string;
  size: number;
  left: number;
  top: number;
  driftX: number;
  driftY: number;
  duration: number;
  intensity: number;
};

function Blob({
  color,
  size,
  left,
  top,
  driftX,
  driftY,
  duration,
  intensity,
}: BlobProps) {
  const gradientId = `shader${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    return () => cancelAnimation(progress);
  }, [duration, progress, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.value * driftX },
      { translateY: progress.value * driftY },
      { scale: 1 + progress.value * 0.06 },
    ],
  }));

  return (
    <Animated.View
      style={[
        { position: 'absolute', left, top, width: size, height: size },
        animatedStyle,
      ]}
    >
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={0.95 * intensity} />
            <Stop
              offset="0.55"
              stopColor={color}
              stopOpacity={0.45 * intensity}
            />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={`url(#${gradientId})`}
        />
      </Svg>
    </Animated.View>
  );
}

/**
 * Native full-screen background. ShaderGradient is a Three.js canvas and only
 * runs on web (see ShaderBackground.web.tsx), so native draws the same PRD
 * colours as slowly drifting gradient fields.
 */
export function ShaderBackground({
  tone = 'mist',
  style,
  opacity = 1,
}: ShaderBackgroundProps) {
  const isDark = useIsDark();
  const { width, height } = useWindowDimensions();
  const intensity = 1;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.root,
        { backgroundColor: shaderBase(tone, isDark), opacity },
        style,
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Blob
        color={ShaderColors.color1}
        size={width * 1.6}
        left={-width * 0.3}
        top={height * 0.42}
        driftX={width * 0.08}
        driftY={height * 0.04}
        duration={14000}
        intensity={intensity}
      />
      <Blob
        color={ShaderColors.color2}
        size={width * 1.45}
        left={width * 0.05}
        top={height * 0.52}
        driftX={-width * 0.1}
        driftY={height * 0.03}
        duration={18000}
        intensity={intensity}
      />
      <Blob
        color={ShaderColors.color3}
        size={width * 1.1}
        left={width * 0.12}
        top={height * 0.36}
        driftX={width * 0.04}
        driftY={-height * 0.03}
        duration={22000}
        intensity={0.55}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
});

export default ShaderBackground;
