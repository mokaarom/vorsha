import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';
import { Uniwind } from 'uniwind';
import '../global.css';
import '../i18n';
import { useSettingsStore } from '../store/settingsStore';
import { Colors } from '../constants/colors';

SplashScreen.preventAutoHideAsync();

const heroConfig: HeroUINativeConfig = {
  textProps: {
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.5,
  },
  textInputProps: {
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.5,
  },
  toast: {
    defaultProps: {
      placement: 'top',
    },
  },
  devInfo: {
    stylingPrinciples: false,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Mont-ExtraLight': require('../assets/fonts/Mont-ExtraLight.otf'),
    'Mont-Heavy': require('../assets/fonts/Mont-Heavy.otf'),
  });

  const theme = useSettingsStore((s) => (s.theme === 'dark' ? 'dark' : 'light'));
  const palette = Colors[theme];

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={heroConfig}>
        <View style={{ flex: 1, backgroundColor: palette.background }}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: palette.surface,
              },
              headerTintColor: palette.foreground,
              headerTitleStyle: {
                fontWeight: '500',
                fontSize: 17,
              },
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: palette.background,
              },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="conversation/[id]"
              options={{
                title: 'Conversation',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen
              name="form/[templateId]"
              options={{
                title: 'Form',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen
              name="form/review"
              options={{
                title: 'Review',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen
              name="issue/[id]"
              options={{
                title: 'Issue',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen
              name="bill/[id]"
              options={{
                title: 'Legislation',
                headerBackTitle: 'Back',
              }}
            />
          </Stack>
        </View>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
