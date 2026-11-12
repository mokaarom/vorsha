import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Surface, Typography, Chip, useThemeColor } from 'heroui-native';
import { CitationItem } from '../../store/voiceStore';
import { BookOpen, ExternalLink } from 'lucide-react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { toBanglaNumber } from '../../utils/formatting';
import { Spacing, BorderRadius } from '../../constants/theme';

export interface CitationProps {
  citation: CitationItem;
  onPress?: () => void;
}

export const Citation: React.FC<CitationProps> = ({ citation, onPress }) => {
  const language = useSettingsStore((s) => s.language);
  const [accent, muted] = useThemeColor(['accent', 'muted']) as string[];

  const confidencePercent = Math.round(citation.confidenceScore * 100);
  const displayConfidence =
    language === 'bn' ? toBanglaNumber(confidencePercent) : confidencePercent;

  return (
    <Pressable onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
      <Surface variant="secondary" style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <BookOpen size={16} color={accent} strokeWidth={1.5} />
            <Typography type="body-sm" weight="medium" style={{ color: accent, flex: 1 }} truncate>
              {citation.title}
            </Typography>
          </View>
          <ExternalLink size={14} color={muted} strokeWidth={1.5} />
        </View>
        <Typography type="body-xs" color="muted" truncate>
          {citation.documentName}
          {citation.section ? ` · ${citation.section}` : ''}
        </Typography>
        <View style={styles.footer}>
          <Chip size="sm" variant="soft" color="success" animation="disable-all">
            <Chip.Label>
              {language === 'bn'
                ? `${displayConfidence}% নির্ভুল`
                : `${displayConfidence}% match`}
            </Chip.Label>
          </Chip>
        </View>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginVertical: 4,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  footer: {
    marginTop: 4,
  },
});
