import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { type Href, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography, Separator } from 'heroui-native';
import { BookOpen } from 'lucide-react-native';
import { Spacing } from '../../constants/theme';
import { usePalette } from '../../hooks/usePalette';
import { useChat } from '../../hooks/useChat';
import { useVoice } from '../../hooks/useVoice';
import { useVoiceStore, ChatMessage } from '../../store/voiceStore';
import { Citation } from '../../components/common/Citation';
import { Screen } from '../../components/common/Screen';
import { Composer } from '../../components/voice/Composer';
import { Waveform } from '../../components/voice/Waveform';

export default function VoiceConversationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const palette = usePalette();

  const messages = useVoiceStore((s) => s.messages);
  const audioMetering = useVoiceStore((s) => s.audioMetering);
  const { state, toggleRecording } = useVoice();
  const { sendText } = useChat();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const scrollToEnd = () => flatListRef.current?.scrollToEnd({ animated: true });

  const handleSendText = () => {
    if (sendText(inputText)) {
      setInputText('');
    }
  };

  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.userMessageRow : styles.assistantMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser
              ? [styles.userBubble, { backgroundColor: palette.accent }]
              : [
                  styles.assistantBubble,
                  {
                    backgroundColor: palette.glass,
                    borderColor: palette.glassBorder,
                  },
                ],
          ]}
        >
          <Typography
            type="body"
            style={isUser ? { color: palette.accentForeground } : undefined}
          >
            {item.text}
          </Typography>

          {item.citations && item.citations.length > 0 ? (
            <View style={styles.citationsContainer}>
              <Separator style={styles.citationSeparator} />
              <View style={styles.citationHeader}>
                <BookOpen size={14} color={palette.accent} strokeWidth={1.75} />
                <Typography
                  type="body-xs"
                  weight="medium"
                  style={{ color: palette.accent }}
                >
                  {t('voice.citation_label')}
                </Typography>
              </View>
              {item.citations.map((c) => (
                <Citation key={c.id} citation={c} />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <Screen title={t('nav.voice')}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={scrollToEnd}
        />

        <View style={styles.dock}>
          {state === 'listening' ? (
            <View style={styles.listeningRow} accessibilityLiveRegion="polite">
              <Waveform
                metering={audioMetering}
                height={24}
                barColor={palette.danger}
              />
              <Typography
                type="body-sm"
                weight="medium"
                style={{ color: palette.danger }}
              >
                {t('voice.listening')}
              </Typography>
            </View>
          ) : null}

          <Composer
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSendText}
            onLivePress={() => router.push('/live' as Href)}
            onMicPress={toggleRecording}
            micActive={state === 'listening'}
            placeholder={t('voice.fallback_input')}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  assistantMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '86%',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 6,
  },
  assistantBubble: {
    borderWidth: 1,
    borderBottomLeftRadius: 6,
  },
  citationsContainer: {
    marginTop: Spacing.sm,
  },
  citationSeparator: {
    marginBottom: 8,
  },
  citationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  dock: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  listeningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
});
