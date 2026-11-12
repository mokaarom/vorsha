import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Button,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Badge } from '../../components/ui/Badge';
import { MapView } from '../../components/map/MapView';
import { useSettingsStore } from '../../store/settingsStore';
import { ThumbsUp, Calendar } from 'lucide-react-native';

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.language);
  const [background, muted, accent, accentFg] = useThemeColor([
    'background',
    'muted',
    'accent',
    'accent-foreground',
  ]) as string[];
  const [upvotes, setUpvotes] = useState(14);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setUpvotes(upvotes + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <Card.Body>
          <View style={styles.headerRow}>
            <Badge label={t('report.status_review')} variant="warning" />
            <Typography type="body-xs" color="muted">
              #{id}
            </Typography>
          </View>

          <Typography type="h4" weight="medium" style={{ marginTop: 8 }}>
            রাস্তায় বড় গর্ত ও কালভার্ট ভাঙা
          </Typography>

          <View style={styles.metaRow}>
            <Calendar size={13} color={muted} strokeWidth={1.5} />
            <Typography type="body-xs" color="muted">
              {language === 'bn' ? 'দাখিল: ৭ নভেম্বর, ২০২৬' : 'Filed: 7 Nov 2026'}
            </Typography>
          </View>

          <Typography type="body-sm" color="muted" style={styles.desc}>
            মিরপুর ১০ নম্বর মোড়ের কাছে প্রধান সড়কে গভীর গর্ত তৈরি হয়েছে, যার ফলে ভারী যান চলাচলে ঝুঁকি সৃষ্টি হচ্ছে।
          </Typography>

          <View style={styles.mapWrapper}>
            <MapView latitude={23.8071} longitude={90.3686} height={160} />
          </View>

          <View style={styles.footerRow}>
            <Button
              variant={hasUpvoted ? 'primary' : 'outline'}
              size="sm"
              onPress={handleUpvote}
              isDisabled={hasUpvoted}
            >
              <ThumbsUp
                size={14}
                color={hasUpvoted ? accentFg : accent}
                strokeWidth={1.5}
              />
              <Button.Label>
                {language === 'bn'
                  ? `সমর্থন (${upvotes})`
                  : `Upvote (${upvotes})`}
              </Button.Label>
            </Button>
          </View>
        </Card.Body>
      </Card>
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
  card: {
    borderRadius: BorderRadius.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    marginBottom: Spacing.sm,
  },
  desc: {
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  mapWrapper: {
    marginBottom: Spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
