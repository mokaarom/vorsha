import React, { useEffect, useRef } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Keyboard, Mic, Square, X } from 'lucide-react-native';
import { OnShader } from '../constants/colors';
import { Spacing, TouchTargets } from '../constants/theme';
import { useVoice } from '../hooks/useVoice';
import { useVoiceStore } from '../store/voiceStore';
import { Screen } from '../components/common/Screen';
import { ShaderColors } from '../components/common/shaderTheme';
import SiriOrb from '../components/ui/siri-orb';
import { Waveform } from '../components/voice/Waveform';

/** Full-screen live voice session: the orb listens, thinks and answers. */
export default function LiveVoiceScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { state, startRecording, toggleRecording } = useVoice();
  const audioMetering = useVoiceStore((s) => s.audioMetering);
  const messages = useVoiceStore((s) => s.messages);

  // Native can start the mic on open. The web MediaRecorder API only
  // initialises after a user gesture, so web waits for a tap on the orb/mic.
  const started = useRef(false);
  useEffect(() => {
    if (Platform.OS === 'web') return;
    if (started.current) return;
    started.current = true;
    void startRecording();
  }, [startRecording]);

  const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
  const lastAnswer = [...messages]
    .reverse()
    .find((m) => m.sender === 'assistant' && m.id !== 'welcome-msg');

  const statusKey =
    state === 'listening'
      ? 'live.listening'
      : state === 'processing'
      ? 'live.processing'
      : state === 'speaking'
      ? 'live.speaking'
      : state === 'error'
      ? 'live.error'
      : 'live.idle';

  const caption =
    state === 'processing'
      ? lastUser?.text
      : state === 'listening'
      ? undefined
      : lastAnswer?.text;

  const orbSize = Math.min(192, width - Spacing.lg * 2);
  const isListening = state === 'listening';
  const orbDuration =
    state === 'listening' ? 8 : state === 'processing' ? 12 : 20;

  const close = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <Screen
      tone="deep"
      leading="back"
      trailing="none"
      title={t('live.title')}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <StatusBar style="light" />

      <Text style={styles.status} accessibilityLiveRegion="polite">
        {t(statusKey)}
      </Text>

      <View style={styles.stage}>
        <SiriOrb
          size={`${orbSize}px`}
          animationDuration={orbDuration}
          colors={{
            bg: 'transparent',
            c1: ShaderColors.color1,
            c2: ShaderColors.color2,
            c3: ShaderColors.color3,
          }}
          onPress={toggleRecording}
          accessibilityLabel={
            isListening ? t('voice.tap_to_stop') : t('voice.tap_to_start')
          }
        />
      </View>

      <View style={styles.captionArea}>
        {isListening ? (
          <Waveform
            metering={audioMetering}
            height={32}
            barColor={OnShader.text}
          />
        ) : caption ? (
          <Text
            numberOfLines={5}
            style={[
              styles.caption,
              state === 'processing' && { color: OnShader.muted },
            ]}
          >
            {caption}
          </Text>
        ) : null}
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={() => router.replace('/(tabs)/voice')}
          style={styles.sideBtn}
          accessibilityRole="button"
          accessibilityLabel={t('live.keyboard')}
        >
          <Keyboard size={22} color={OnShader.text} strokeWidth={1.75} />
        </Pressable>

        <Pressable
          onPress={toggleRecording}
          style={({ pressed }) => [
            styles.micBtn,
            { transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            isListening ? t('voice.tap_to_stop') : t('voice.tap_to_start')
          }
        >
          {isListening ? (
            <Square
              size={24}
              color={OnShader.solidForeground}
              fill={OnShader.solidForeground}
              strokeWidth={1.75}
            />
          ) : (
            <Mic size={28} color={OnShader.solidForeground} strokeWidth={1.75} />
          )}
        </Pressable>

        <Pressable
          onPress={close}
          style={styles.sideBtn}
          accessibilityRole="button"
          accessibilityLabel={t('live.close')}
        >
          <X size={22} color={OnShader.text} strokeWidth={1.75} />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  status: {
    color: OnShader.muted,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionArea: {
    minHeight: 120,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  caption: {
    color: OnShader.text,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  sideBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OnShader.glass,
    borderColor: OnShader.glassBorder,
  },
  micBtn: {
    width: TouchTargets.voiceButton,
    height: TouchTargets.voiceButton,
    borderRadius: TouchTargets.voiceButton / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: OnShader.solid,
  },
});
