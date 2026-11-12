import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/colors';
import { useSettingsStore } from '../../store/settingsStore';
import { Mic, FileText, Camera, BookOpen, User } from 'lucide-react-native';

export default function TabLayout() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => (s.theme === 'dark' ? 'dark' : 'light'));
  const palette = Colors[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: palette.surface,
        },
        headerTintColor: palette.foreground,
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="voice"
        options={{
          title: t('nav.voice'),
          tabBarIcon: ({ color, size }) => (
            <Mic size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          title: t('nav.forms'),
          tabBarIcon: ({ color, size }) => (
            <FileText size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: t('nav.report'),
          tabBarIcon: ({ color, size }) => (
            <Camera size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="legislation"
        options={{
          title: t('nav.legislation'),
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('nav.profile'),
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}
