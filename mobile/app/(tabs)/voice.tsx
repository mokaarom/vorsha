import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Input,
  Separator,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius, TouchTargets } from '../../constants/theme';
import { useVoiceStore, ChatMessage } from '../../store/voiceStore';
import { useVoice } from '../../hooks/useVoice';
import { VoiceButton } from '../../components/voice/VoiceButton';
import { Waveform } from '../../components/voice/Waveform';
import { Citation } from '../../components/common/Citation';
import { Send, BookOpen } from 'lucide-react-native';

export default function VoiceConversationScreen() {
  const { t } = useTranslation();
  const [background, surface, border, accent, danger, accentFg] = useThemeColor([
    'background',
    'surface',
    'border',
    'accent',
    'danger',
    'accent-foreground',
  ]) as string[];

  const { messages, addMessage } = useVoiceStore();
  const { state, toggleRecording } = useVoice();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSendText = () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);
    setInputText('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: 'সরকারি বিধিমালা অনুযায়ী এই সেবার জন্য প্রয়োজনীয় কাগজপত্রের বিস্তারিত নিচে দেওয়া হলো। আপনি আরও কোনো প্রশ্ন করতে পারেন।',
        timestamp: new Date().toISOString(),
        citations: [
          {
            id: 'c-1',
            title: 'পৌরসভা আইন ও নাগরিক সেবা নির্দেশিকা',
            documentName: 'Ministry of LGRD Manual',
            section: 'অধ্যায় ৪, পৃষ্ঠা ১৮',
            confidenceScore: 0.95,
          },
        ],
        confidenceScore: 0.95,
      };
      addMessage(botMsg);
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 800);
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
              ? { backgroundColor: accent }
              : { backgroundColor: surface, borderColor: border, borderWidth: 1 },
          ]}
        >
          <Typography
            type="body-sm"
            style={{ color: isUser ? accentFg : undefined, lineHeight: 22 }}
          >
            {item.text}
          </Typography>

          {item.citations && item.citations.length > 0 ? (
            <View style={styles.citationsContainer}>
              <Separator style={{ marginBottom: 8 }} />
              <View style={styles.citationHeader}>
                <BookOpen size={12} color={accent} strokeWidth={1.5} />
                <Typography type="body-xs" style={{ color: accent }} weight="medium">
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: background }]}
      keyboardVerticalOffset={80}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {state === 'listening' ? (
        <Card style={styles.liveWaveform}>
          <Card.Body style={{ alignItems: 'center', gap: 6 }}>
            <Waveform height={36} barColor={danger} />
            <Typography type="body-xs" style={{ color: danger }} weight="medium">
              {t('voice.listening')}
            </Typography>
          </Card.Body>
        </Card>
      ) : null}

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: surface, borderTopColor: border },
        ]}
      >
        <View style={styles.inputRow}>
          <Input
            placeholder={t('voice.fallback_input')}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendText}
            style={styles.textInput}
          />

          {inputText.trim() ? (
            <Pressable
              onPress={handleSendText}
              accessibilityRole="button"
              style={[styles.sendBtn, { backgroundColor: accent }]}
            >
              <Send size={18} color={accentFg} strokeWidth={1.5} />
            </Pressable>
          ) : (
            <VoiceButton state={state} onPress={toggleRecording} size={56} />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  assistantMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '84%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  citationsContainer: {
    marginTop: Spacing.sm,
  },
  citationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  liveWaveform: {
    position: 'absolute',
    bottom: 88,
    left: 20,
    right: 20,
  },
  bottomBar: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    flex: 1,
  },
  sendBtn: {
    width: TouchTargets.min,
    height: TouchTargets.min,
    borderRadius: TouchTargets.min / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
