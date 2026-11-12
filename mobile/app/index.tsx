import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { type Href, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography } from 'heroui-native';
import { Spacing } from '../constants/theme';
import { usePalette } from '../hooks/usePalette';
import { useChat } from '../hooks/useChat';
import { useVoiceStore } from '../store/voiceStore';
import { OfflineIndicator } from '../components/common/OfflineIndicator';
import { Screen } from '../components/common/Screen';
import { ShaderColors } from '../components/common/shaderTheme';
import SiriOrb from '../components/ui/siri-orb';
import { Composer } from '../components/voice/Composer';

type Suggestion = {
  id: string;
  title: string;
  route: string;
};

export default function HomeVoiceHub() {
  const { t } = useTranslation();
  const router = useRouter();
  const palette = usePalette();
  const { width } = useWindowDimensions();
  const voiceState = useVoiceStore((s) => s.state);
  const { sendText } = useChat();
  const [draft, setDraft] = useState('');

  const orbSize = Math.min(192, Math.round(width * 0.48));
  const orbDuration =
    voiceState === 'listening' ? 8 : voiceState === 'processing' ? 12 : 20;

  const suggestions: Suggestion[] = [
    {
      id: 'trade',
      title: t('home.services.trade_license'),
      route: '/form/trade-license',
    },
    {
      id: 'birth',
      title: t('home.services.birth_certificate'),
      route: '/(tabs)/forms',
    },
    {
      id: 'report',
      title: t('home.services.road_repair'),
      route: '/(tabs)/report',
    },
    {
      id: 'laws',
      title: t('legislation.title'),
      route: '/(tabs)/legislation',
    },
  ];

  const openLive = () => router.push('/live' as Href);

  const handleSend = () => {
    if (sendText(draft)) {
      setDraft('');
      router.push('/(tabs)/voice');
    }
  };

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <OfflineIndicator />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.hero}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SiriOrb
            size={`${orbSize}px`}
            animationDuration={orbDuration}
            colors={{
              bg: 'transparent',
              c1: ShaderColors.color1,
              c2: ShaderColors.color2,
              c3: ShaderColors.color3,
            }}
            onPress={openLive}
            accessibilityLabel={t('composer.live')}
          />
          <Typography
            type="h2"
            weight="medium"
            align="center"
            style={styles.heroTitle}
          >
            {t('home.hero_title')}
          </Typography>
        </ScrollView>

        <View style={styles.dock}>
          <View style={styles.suggestions}>
            {suggestions.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => router.push(item.route as Href)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.suggestion,
                  {
                    backgroundColor: palette.glass,
                    borderColor: palette.glassBorder,
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Typography type="body-sm" numberOfLines={1}>
                  {item.title}
                </Typography>
              </Pressable>
            ))}
          </View>

          <Composer
            value={draft}
            onChangeText={setDraft}
            onSend={handleSend}
            onLivePress={openLive}
            onAttachPress={() => router.push('/(tabs)/report')}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  hero: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  heroTitle: {
    marginTop: Spacing.md,
  },
  dock: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.md,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  suggestion: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
