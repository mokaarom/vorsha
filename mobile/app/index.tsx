import React from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Typography,
  Button,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius, TouchTargets } from '../constants/theme';
import { useVoice } from '../hooks/useVoice';
import { VoiceButton } from '../components/voice/VoiceButton';
import { VoiceStateIndicator } from '../components/voice/VoiceStateIndicator';
import { Waveform } from '../components/voice/Waveform';
import { TranscriptionBubble } from '../components/voice/TranscriptionBubble';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { OfflineIndicator } from '../components/common/OfflineIndicator';
import { FileText, AlertTriangle, Scale, User, ArrowRight } from 'lucide-react-native';

export default function HomeVoiceHub() {
  const { t } = useTranslation();
  const router = useRouter();
  const [background, surface, border, accent, muted, danger] =
    useThemeColor([
      'background',
      'surface',
      'border',
      'accent',
      'muted',
      'danger',
    ]) as string[];

  const { state, realtimeTranscription, toggleRecording } = useVoice();

  const quickServices = [
    {
      id: 'trade',
      title: t('home.services.trade_license'),
      icon: FileText,
      route: '/form/trade-license',
    },
    {
      id: 'report',
      title: t('home.services.road_repair'),
      icon: AlertTriangle,
      route: '/(tabs)/report',
    },
    {
      id: 'legis',
      title: t('home.services.land_mutation'),
      icon: Scale,
      route: '/(tabs)/legislation',
    },
    {
      id: 'profile',
      title: t('home.services.birth_certificate'),
      icon: User,
      route: '/(tabs)/forms',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <OfflineIndicator />

      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View>
            <Typography type="h4" weight="medium" style={{ color: accent }}>
              ভরসা
            </Typography>
            <Typography type="body-xs" color="muted">
              {t('app_tagline')}
            </Typography>
          </View>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Voice hub — the single bright moment */}
        <Card style={styles.heroCard}>
          <Card.Body style={styles.heroBody}>
            <Typography type="h3" align="center" weight="medium">
              {t('home.greeting')}
            </Typography>
            <Typography type="body-sm" color="muted" align="center" style={styles.subGreeting}>
              {t('home.how_can_i_help')}
            </Typography>

            <View style={styles.voiceZone}>
              {state === 'listening' ? (
                <View style={styles.waveformWrapper}>
                  <Waveform height={32} barColor={danger} />
                </View>
              ) : null}

              <VoiceButton state={state} onPress={toggleRecording} size={72} />
              <VoiceStateIndicator state={state} />

              {realtimeTranscription ? (
                <TranscriptionBubble
                  text={realtimeTranscription}
                  isRealtime={state === 'listening'}
                />
              ) : null}
            </View>
          </Card.Body>
        </Card>

        <View style={styles.sectionHeader}>
          <Typography type="h5" weight="medium">
            {t('home.quick_services')}
          </Typography>
          <Pressable
            onPress={() => router.push('/(tabs)/forms')}
            style={styles.seeAllBtn}
            accessibilityRole="button"
          >
            <Typography type="body-sm" style={{ color: accent }} weight="medium">
              {t('common.see_all')}
            </Typography>
            <ArrowRight size={14} color={accent} strokeWidth={1.5} />
          </Pressable>
        </View>

        <View style={styles.grid}>
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <Pressable
                key={service.id}
                onPress={() => router.push(service.route as any)}
                accessibilityRole="button"
                style={[
                  styles.gridCard,
                  { backgroundColor: surface, borderColor: border },
                ]}
              >
                <View style={[styles.iconWrapper, { backgroundColor: background }]}>
                  <Icon size={20} color={muted} strokeWidth={1.5} />
                </View>
                <Typography type="body-sm" weight="medium" numberOfLines={2}>
                  {service.title}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        <Button
          variant="primary"
          size="lg"
          onPress={() => router.push('/(tabs)/voice')}
          style={styles.chatBar}
        >
          <Button.Label>{t('voice.tap_to_start')}</Button.Label>
          <ArrowRight size={16} color="#FFFFFF" strokeWidth={1.5} />
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  heroCard: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  heroBody: {
    alignItems: 'center',
    gap: 4,
  },
  subGreeting: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  voiceZone: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  waveformWrapper: {
    marginBottom: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  gridCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    minHeight: TouchTargets.min * 1.6,
    justifyContent: 'space-between',
    gap: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBar: {
    alignSelf: 'stretch',
  },
});
