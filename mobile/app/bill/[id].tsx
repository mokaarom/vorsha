import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  TextField,
  Input,
  Button,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Badge } from '../../components/ui/Badge';
import { Screen } from '../../components/common/Screen';
import { useSettingsStore } from '../../store/settingsStore';

export default function BillDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.language);
  const accentSoft = useThemeColor('accent-soft') as string;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAsk = () => {
    if (!question.trim()) return;
    setAnswer(
      language === 'bn'
        ? 'এই আইনের ধারা ৪২ অনুযায়ী, ছোট ও কুটির শিল্পের ক্ষেত্রে পৌরসভা নির্ধারিত ট্রেড লাইসেন্স ফি ৫০% পর্যন্ত হ্রাস করার বিশেষ সুবিধা রয়েছে।'
        : 'Under Section 42 of this Act, cottage and small industries are eligible for up to 50% concession on standard municipal trade license fees.'
    );
  };

  return (
    <Screen title={t('legislation.title')} leading="back">
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Card style={styles.headerCard}>
        <Card.Body style={{ gap: 6 }}>
          <Badge
            label={language === 'bn' ? 'গেজেট বিজ্ঞপ্তি' : 'Gazette notice'}
            variant="success"
          />
          <Typography type="h4" weight="medium">
            স্থানীয় সরকার (সিটি কর্পোরেশন) আইন ২০০৯
          </Typography>
          <Typography type="body-xs" color="muted">
            আইন নং ৬০, ২০০৯ · স্থানীয় সরকার বিভাগ · {id}
          </Typography>
        </Card.Body>
      </Card>

      <Typography type="body-sm" weight="medium" style={styles.sectionTitle}>
        {language === 'bn' ? 'নাগরিকের জন্য মূল প্রভাব' : 'Citizen impact'}
      </Typography>
      <Card>
        <Card.Body style={{ gap: 10 }}>
          <Typography type="body-sm" style={styles.bullet}>
            · ট্রেড লাইসেন্স আবেদন প্রাপ্তির ৭ কার্যদিবসের মধ্যে নিষ্পত্তি বাধ্যতামূলক।
          </Typography>
          <Typography type="body-sm" style={styles.bullet}>
            · হোল্ডিং ট্যাক্স পুনঃনির্ধারণে নাগরিকদের লিখিত আপত্তি জানানোর ৩০ দিন সময় প্রদান।
          </Typography>
          <Typography type="body-sm" style={styles.bullet}>
            · বর্জ্য ব্যবস্থাপনা ও রাস্তা রক্ষণাবেক্ষণে অবহেলার ক্ষেত্রে অভিযোগ কমিটি গঠন।
          </Typography>
        </Card.Body>
      </Card>

      <Typography type="body-sm" weight="medium" style={styles.sectionTitle}>
        {language === 'bn' ? 'এই আইন সম্পর্কে প্রশ্ন করুন' : 'Ask about this law'}
      </Typography>
      <Card>
        <Card.Body style={{ gap: 12 }}>
          <TextField>
            <Input
              placeholder={
                language === 'bn'
                  ? 'যেমনঃ ফি নির্ধারণের নিয়ম কী?'
                  : 'Ask a specific question...'
              }
              value={question}
              onChangeText={setQuestion}
            />
          </TextField>
          <Button variant="primary" size="sm" onPress={handleAsk}>
            <Button.Label>
              {language === 'bn' ? 'উত্তর জানুন' : 'Get answer'}
            </Button.Label>
          </Button>
          {answer ? (
            <View style={[styles.answerBox, { backgroundColor: accentSoft }]}>
              <Typography type="body-sm" style={{ lineHeight: 22 }}>
                {answer}
              </Typography>
            </View>
          ) : null}
        </Card.Body>
      </Card>
    </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  headerCard: {
    borderRadius: BorderRadius.xl,
  },
  sectionTitle: {
    marginTop: Spacing.sm,
  },
  bullet: {
    lineHeight: 22,
  },
  answerBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
});
