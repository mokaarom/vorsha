import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextArea, TextField } from 'heroui-native';
import {
  ArrowUp,
  AudioLines,
  Languages,
  Mic,
  Plus,
  Square,
} from 'lucide-react-native';
import { BorderRadius, Spacing } from '../../constants/theme';
import { usePalette } from '../../hooks/usePalette';
import i18n from '../../i18n';
import { useSettingsStore } from '../../store/settingsStore';

export interface ComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  /** Opens the full-screen live voice session. */
  onLivePress: () => void;
  /** Starts or stops inline dictation. Hidden when omitted. */
  onMicPress?: () => void;
  micActive?: boolean;
  /** The "+" button. Hidden when omitted. */
  onAttachPress?: () => void;
  placeholder?: string;
}

const BUTTON = 44;

/**
 * Prompt box: text field on top, actions underneath. The round button on the
 * right sends when there is text and opens live voice when there is none.
 */
export const Composer: React.FC<ComposerProps> = ({
  value,
  onChangeText,
  onSend,
  onLivePress,
  onMicPress,
  micActive = false,
  onAttachPress,
  placeholder,
}) => {
  const { t } = useTranslation();
  const palette = usePalette();
  const { language, setLanguage } = useSettingsStore();
  const hasText = value.trim().length > 0;

  const switchLanguage = () => {
    const next = language === 'bn' ? 'en' : 'bn';
    setLanguage(next);
    i18n.changeLanguage(next);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.glassStrong,
          borderColor: palette.glassBorder,
        },
      ]}
    >
      <TextField style={styles.field}>
        <TextArea
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? t('composer.placeholder')}
          accessibilityLabel={placeholder ?? t('composer.placeholder')}
          variant="secondary"
          style={styles.input}
        />
      </TextField>

      <View style={styles.actions}>
        <View style={styles.group}>
          {onAttachPress ? (
            <Pressable
              onPress={onAttachPress}
              hitSlop={4}
              style={[
                styles.roundBtn,
                { backgroundColor: palette.surfaceSecondary },
              ]}
              accessibilityRole="button"
              accessibilityLabel={t('composer.attach')}
            >
              <Plus size={20} color={palette.foreground} strokeWidth={1.75} />
            </Pressable>
          ) : null}

          <Pressable
            onPress={switchLanguage}
            hitSlop={6}
            style={[styles.chip, { borderColor: palette.border }]}
            accessibilityRole="button"
            accessibilityLabel={t('composer.language')}
          >
            <Languages size={16} color={palette.muted} strokeWidth={1.75} />
            <Text style={[styles.chipLabel, { color: palette.foreground }]}>
              {language === 'bn' ? 'বাংলা' : 'English'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.group}>
          {onMicPress ? (
            <Pressable
              onPress={onMicPress}
              hitSlop={4}
              style={[
                styles.roundBtn,
                micActive && { backgroundColor: palette.dangerSoft },
              ]}
              accessibilityRole="button"
              accessibilityLabel={
                micActive ? t('voice.tap_to_stop') : t('composer.dictate')
              }
            >
              {micActive ? (
                <Square
                  size={16}
                  color={palette.danger}
                  fill={palette.danger}
                  strokeWidth={1.75}
                />
              ) : (
                <Mic size={20} color={palette.muted} strokeWidth={1.75} />
              )}
            </Pressable>
          ) : null}

          <Pressable
            onPress={hasText ? onSend : onLivePress}
            hitSlop={4}
            style={[styles.roundBtn, { backgroundColor: palette.foreground }]}
            accessibilityRole="button"
            accessibilityLabel={
              hasText ? t('composer.send') : t('composer.live')
            }
          >
            {hasText ? (
              <ArrowUp size={20} color={palette.background} strokeWidth={2} />
            ) : (
              <AudioLines
                size={20}
                color={palette.background}
                strokeWidth={2}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    gap: Spacing.sm,
  },
  field: {
    marginVertical: 0,
    gap: 0,
  },
  input: {
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  roundBtn: {
    width: BUTTON,
    height: BUTTON,
    borderRadius: BUTTON / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  chipLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
