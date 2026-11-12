import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Typography, useThemeColor } from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { LanguageToggle } from '../../components/common/LanguageToggle';
import { useSettingsStore } from '../../store/settingsStore';
import { Mic, FileCheck, ShieldCheck } from 'lucide-react-native';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const [background, accent, success, muted, surfaceSecondary] = useThemeColor([
    'background',
    'accent',
    'success',
    'muted',
    'surface-secondary',
  ]) as string[];

  const features = [
    {
      icon: Mic,
      color: accent,
      title: language === 'bn' ? 'ভয়েস ফার্স্ট' : 'Voice first',
      desc:
        language === 'bn'
          ? 'নিজের ভাষায় বলে তথ্য ও ফরম পূরণ করুন'
          : 'Ask and fill forms by speaking Bangla or English',
    },
    {
      icon: FileCheck,
      color: success,
      title: language === 'bn' ? 'সরকারি বিধিমালা' : 'Grounded in law',
      desc:
        language === 'bn'
          ? 'গেজেট ও আইন থেকে নির্ভুল উত্তর ও সূত্র'
          : 'Answers cited from gazettes and municipal bylaws',
    },
    {
      icon: ShieldCheck,
      color: muted,
      title: language === 'bn' ? 'ডেটা সুরক্ষা' : 'Data stays local',
      desc:
        language === 'bn'
          ? 'ব্যক্তিগত তথ্য দেশের সীমানার মধ্যে সংরক্ষিত'
          : 'Personal data kept within Bangladesh residency',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.topBar}>
        <LanguageToggle />
      </View>

      <View style={styles.heroSection}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Typography type="h2" align="center" weight="medium">
          {t('auth.welcome_title')}
        </Typography>
        <Typography
          type="body"
          color="muted"
          align="center"
          style={styles.subtitle}
        >
          {t('auth.welcome_subtitle')}
        </Typography>
      </View>

      <View style={styles.features}>
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <View key={f.title} style={styles.featureItem}>
              <View
                style={[styles.iconBox, { backgroundColor: surfaceSecondary }]}
              >
                <Icon size={20} color={f.color} strokeWidth={1.5} />
              </View>
              <View style={styles.featureText}>
                <Typography type="body-sm" weight="medium">
                  {f.title}
                </Typography>
                <Typography type="body-xs" color="muted">
                  {f.desc}
                </Typography>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.bottomActions}>
        <Button
          variant="primary"
          size="lg"
          onPress={() => router.push('/(auth)/login')}
          style={{ alignSelf: 'stretch' }}
        >
          <Button.Label>{t('auth.login_button')}</Button.Label>
        </Button>
        <Button
          variant="ghost"
          size="md"
          onPress={() => router.replace('/(tabs)/voice')}
          style={{ alignSelf: 'stretch', marginTop: 8 }}
        >
          <Button.Label>
            {language === 'bn' ? 'হোমে যান' : 'Continue to home'}
          </Button.Label>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  topBar: {
    alignItems: 'flex-end',
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.md,
  },
  subtitle: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  features: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    gap: 2,
  },
  bottomActions: {
    marginTop: Spacing.lg,
  },
});
