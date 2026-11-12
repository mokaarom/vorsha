import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  MessageCircle,
  FileText,
  Camera,
  BookOpen,
  User,
} from 'lucide-react-native';
import { usePalette } from '../../hooks/usePalette';

export default function TabLayout() {
  const { t } = useTranslation();
  const palette = usePalette();

  return (
    <Tabs
      screenOptions={{
        // Each tab renders its own header through <Screen>.
        headerShown: false,
        tabBarActiveTintColor: palette.accent,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: {
          backgroundColor: palette.glassStrong,
          borderTopColor: palette.glassBorder,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="voice"
        options={{
          title: t('nav.voice'),
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          title: t('nav.forms'),
          tabBarIcon: ({ color, size }) => (
            <FileText size={size} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: t('nav.report'),
          tabBarIcon: ({ color, size }) => (
            <Camera size={size} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="legislation"
        options={{
          title: t('nav.legislation'),
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('nav.profile'),
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={1.75} />
          ),
        }}
      />
    </Tabs>
  );
}
