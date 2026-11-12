import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, AppHeaderProps } from './AppHeader';
import { ShaderBackground } from './ShaderBackground';
import type { ShaderTone } from './shaderTheme';

export type ScreenProps = {
  children: React.ReactNode;
  /** mist for content screens, deep for immersive ones. */
  tone?: ShaderTone;
  /** Pass false to render the screen without the shared header. */
  header?: boolean;
  title?: AppHeaderProps['title'];
  leading?: AppHeaderProps['leading'];
  trailing?: AppHeaderProps['trailing'];
  /** Safe-area edges to pad. Tab screens leave the bottom to the tab bar. */
  edges?: Edge[];
};

const DEFAULT_EDGES: Edge[] = ['top', 'left', 'right'];

/**
 * Shared screen shell: full-screen shader background, safe area and the
 * app header. Every route renders inside one of these.
 */
export const Screen: React.FC<ScreenProps> = ({
  children,
  tone = 'mist',
  header = true,
  title,
  leading,
  trailing,
  edges = DEFAULT_EDGES,
}) => {
  return (
    <View style={styles.root}>
      <ShaderBackground tone={tone} />
      <SafeAreaView style={styles.safeArea} edges={edges}>
        {header ? (
          <AppHeader
            title={title}
            leading={leading}
            trailing={trailing}
            onShader={tone === 'deep'}
          />
        ) : null}
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
});
