import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from 'expo-router';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useIsDark } from '../../hooks/usePalette';
import {
  ShaderBackgroundProps,
  ShaderColors,
  shaderBase,
} from './shaderTheme';

export type { ShaderBackgroundProps, ShaderTone } from './shaderTheme';

/**
 * Web full-screen background: ShaderGradient in the PRD colours.
 * The canvas only mounts while its screen is focused, so screens kept alive
 * in the stack or tabs do not each hold a running WebGL context.
 */
export function ShaderBackground({
  tone = 'mist',
  style,
  opacity = 1,
}: ShaderBackgroundProps) {
  const isDark = useIsDark();
  const isFocused = useIsFocused();

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
      {isFocused ? (
        <ShaderGradientCanvas
          style={canvasStyle}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            bgColor1={ShaderColors.bg1}
            bgColor2={ShaderColors.bg2}
            brightness={1.2}
            cAzimuthAngle={170}
            cDistance={4.4}
            cPolarAngle={70}
            cameraZoom={1}
            color1={ShaderColors.color1}
            color2={ShaderColors.color2}
            color3={ShaderColors.color3}
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0.9}
            positionZ={-0.3}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={45}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.2}
            uFrequency={0}
            uSpeed={0.2}
            uStrength={3.4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      ) : null}
    </View>
  );
}

const canvasStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'transparent',
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
});

export default ShaderBackground;
