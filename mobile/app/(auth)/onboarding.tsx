import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Mic, FileCheck, ShieldCheck } from 'lucide-react-native';
import { OnShader } from '../../constants/colors';
import { BorderRadius, Spacing, TouchTargets } from '../../constants/theme';
import { LanguageToggle } from '../../components/common/LanguageToggle';
import { Screen } from '../../components/common/Screen';
import { VoiceOrb } from '../../components/voice/VoiceOrb';
import { useSettingsStore } from '../../store/settingsStore';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const language = useSettingsStore((s) => s.language);

  const features = [
    {
      icon: Mic,
      title: language === 'bn' ? 'ভয়েস ফার্স্ট' : 'Voice first',
      desc:
        language === 'bn'
          ? 'নিজের ভাষায় বলে তথ্য ও ফরম পূরণ করুন'
          : 'Ask and fill forms by speaking Bangla or English',
    },
    {
      icon: FileCheck,
      title: language === 'bn' ? 'সরকারি বিধিমালা' : 'Grounded in law',
      desc:
        language === 'bn'
          ? 'গেজেট ও আইন থেকে নির্ভুল উত্তর ও সূত্র'
          : 'Answers cited from gazettes and municipal bylaws',
    },
    {
      icon: ShieldCheck,
      title: language === 'bn' ? 'ডেটা সুরক্ষা' : 'Data stays local',
      desc:
        language === 'bn'
          ? 'ব্যক্তিগত তথ্য দেশের সীমানার মধ্যে সংরক্ষিত'
          : 'Personal data kept within Bangladesh residency',
    },
  ];

  return (
    <Screen
      tone="deep"
      header={false}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <LanguageToggle />
        </View>

        <View style={styles.hero}>
          <VoiceOrb state="idle" size={Math.min(220, Math.round(width * 0.56))} />
          <Text style={styles.title} accessibilityRole="header">
            {t('auth.welcome_title')}
          </Text>
          <Text style={styles.subtitle}>{t('auth.welcome_subtitle')}</Text>
        </View>

        <View style={styles.features}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <View key={feature.title} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon size={20} color={OnShader.text} strokeWidth={1.75} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => router.push('/(auth)/login')}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.primaryLabel}>{t('auth.login_button')}</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace('/(tabs)/voice')}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.secondaryLabel}>
              {language === 'bn' ? 'হোমে যান' : 'Continue to home'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  topBar: {
    alignItems: 'flex-end',
  },
  hero: {
    alignItems: 'center',
  },
  title: {
    color: OnShader.text,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  subtitle: {
    color: OnShader.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: Spacing.sm,
    maxWidth: 320,
  },
  features: {
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: OnShader.glassBorder,
    backgroundColor: OnShader.glass,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OnShader.glass,
  },
  featureText: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    color: OnShader.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  featureDesc: {
    color: OnShader.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: Spacing.sm,
  },
  primaryBtn: {
    minHeight: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OnShader.solid,
  },
  primaryLabel: {
    color: OnShader.solidForeground,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    minHeight: TouchTargets.min,
    borderRadius: TouchTargets.min / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: {
    color: OnShader.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
