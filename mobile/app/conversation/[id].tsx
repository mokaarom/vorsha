import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Typography, Card, useThemeColor } from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { useSettingsStore } from '../../store/settingsStore';
import { Citation } from '../../components/common/Citation';
import { MessageSquare, Calendar } from 'lucide-react-native';
import { formatDate } from '../../utils/formatting';

export default function ConversationDetailScreen() {
  const { id } = useLocalSearchParams();
  const language = useSettingsStore((s) => s.language);
  const [background, muted, accent] = useThemeColor([
    'background',
    'muted',
    'accent',
  ]) as string[];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.headerCard}>
        <Card.Body>
          <View style={styles.iconRow}>
            <MessageSquare size={18} color={accent} strokeWidth={1.5} />
            <Typography type="body-xs" color="muted">
              ID: {id}
            </Typography>
          </View>
          <Typography type="h4" weight="medium" style={{ marginTop: 6 }}>
            ট্রেড লাইসেন্স ও নবায়ন সংক্রান্ত প্রশ্নোত্তর
          </Typography>
          <View style={styles.dateRow}>
            <Calendar size={14} color={muted} strokeWidth={1.5} />
            <Typography type="body-xs" color="muted">
              {formatDate(new Date().toISOString(), language)}
            </Typography>
          </View>
        </Card.Body>
      </Card>

      <Typography type="body-sm" weight="medium" style={styles.sectionTitle}>
        রেফারেন্স ও উৎস নথিপত্র
      </Typography>

      <Citation
        citation={{
          id: 'c-1',
          title: 'স্থানীয় সরকার (পৌরসভা) আইন ২০০৯',
          documentName: 'Gazette Extra-2009',
          section: 'ধারা ৯৮',
          pageNumber: 35,
          confidenceScore: 0.94,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
  },
  headerCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
});
