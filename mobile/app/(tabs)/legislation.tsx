import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  SearchField,
  Tabs,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Badge } from '../../components/ui/Badge';
import { Screen } from '../../components/common/Screen';
import { useSettingsStore } from '../../store/settingsStore';
import { Volume2, ArrowRight } from 'lucide-react-native';

interface BillItem {
  id: string;
  titleEn: string;
  titleBn: string;
  actNumber: string;
  status: 'enacted' | 'passed' | 'proposed';
  basicSummaryBn: string;
  basicSummaryEn: string;
}

const BILLS: BillItem[] = [
  {
    id: 'local-gov-act-2009',
    titleEn: 'Local Government (City Corporation) Act 2009',
    titleBn: 'স্থানীয় সরকার (সিটি কর্পোরেশন) আইন ২০০৯',
    actNumber: 'Act No. 60 of 2009',
    status: 'enacted',
    basicSummaryBn:
      'শহরের নাগরিক সেবা, ট্রেড লাইসেন্স ফি ও হোল্ডিং ট্যাক্স নির্ধারণ সংক্রান্ত সিটি কর্পোরেশনের দায়িত্ব ও নাগরিকদের অধিকার।',
    basicSummaryEn:
      'Defines citizen services, trade license standards, and municipal tax rules for city residents.',
  },
  {
    id: 'birth-death-reg-act',
    titleEn: 'Birth and Death Registration Act 2004 (Amended 2018)',
    titleBn: 'জন্ম ও মৃত্যু নিবন্ধন আইন ২০০৪ (সংশোধিত ২০১৮)',
    actNumber: 'Act No. 29 of 2004',
    status: 'enacted',
    basicSummaryBn:
      'জন্মের ৪৫ দিনের মধ্যে বিনামূল্যে এবং পরবর্তীতে স্বল্প ফিতে নিবন্ধন ও জাতীয় আইডি ও পাসপোর্ট প্রাপ্তির প্রক্রিয়া।',
    basicSummaryEn:
      'Mandates free registration within 45 days of birth and subsequent fee tiers for official certificates.',
  },
  {
    id: 'data-protection-act',
    titleEn: 'Bangladesh Data Protection Act (Proposed Draft)',
    titleBn: 'উপাত্ত সুরক্ষা আইন (প্রস্তাবিত খসড়া)',
    actNumber: 'Draft Bill 2024',
    status: 'proposed',
    basicSummaryBn:
      'নাগরিকদের ব্যক্তিগত তথ্যের সার্বভৌম সুরক্ষা এবং সম্মতিহীন তথ্য স্থানান্তর নিষিদ্ধকরণ।',
    basicSummaryEn:
      'Sovereign protection of personal data and restrictions on unauthorized data processing.',
  },
];

export default function LegislationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const accent = useThemeColor('accent') as string;

  const [readingLevel, setReadingLevel] = useState('basic');
  const [search, setSearch] = useState('');

  const filteredBills = BILLS.filter((b) => {
    const q = search.toLowerCase();
    return b.titleBn.toLowerCase().includes(q) || b.titleEn.toLowerCase().includes(q);
  });

  const renderItem = ({ item }: { item: BillItem }) => {
    const title = language === 'bn' ? item.titleBn : item.titleEn;
    const summary = language === 'bn' ? item.basicSummaryBn : item.basicSummaryEn;

    return (
      <Pressable
        onPress={() => router.push(`/bill/${item.id}` as any)}
        accessibilityRole="button"
      >
        <Card style={styles.billCard}>
          <Card.Body>
            <View style={styles.cardHeader}>
              <Badge
                label={
                  item.status === 'enacted'
                    ? language === 'bn'
                      ? 'কার্যকর'
                      : 'Enacted'
                    : language === 'bn'
                    ? 'প্রস্তাবিত'
                    : 'Proposed'
                }
                variant={item.status === 'enacted' ? 'success' : 'warning'}
              />
              <Typography type="body-xs" color="muted">
                {item.actNumber}
              </Typography>
            </View>

            <Typography type="body" weight="medium" style={{ marginTop: 8 }}>
              {title}
            </Typography>
            <Typography type="body-sm" color="muted" style={{ marginTop: 6, lineHeight: 20 }}>
              {summary}
            </Typography>

            <View style={styles.cardFooter}>
              <View style={styles.voiceNarration}>
                <Volume2 size={16} color={accent} strokeWidth={1.5} />
                <Typography type="body-sm" style={{ color: accent }} weight="medium">
                  {language === 'bn' ? 'অডিও শুনুন' : 'Listen'}
                </Typography>
              </View>
              <View style={styles.arrowRow}>
                <Typography type="body-sm" style={{ color: accent }} weight="medium">
                  {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                </Typography>
                <ArrowRight size={14} color={accent} strokeWidth={1.5} />
              </View>
            </View>
          </Card.Body>
        </Card>
      </Pressable>
    );
  };

  return (
    <Screen title={t('legislation.title')}>
      <View style={styles.header}>
        <SearchField value={search} onChange={setSearch}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              placeholder={
                language === 'bn' ? 'আইন বা গেজেট খুঁজুন...' : 'Search laws & bylaws...'
              }
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <Tabs
          value={readingLevel}
          onValueChange={setReadingLevel}
          style={{ marginTop: Spacing.sm }}
        >
          <Tabs.List>
            <Tabs.Trigger value="basic">
              <Tabs.Label>{t('legislation.level_basic')}</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="intermediate">
              <Tabs.Label>{t('legislation.level_intermediate')}</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="advanced">
              <Tabs.Label>{t('legislation.level_advanced')}</Tabs.Label>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </View>

      <FlatList
        data={filteredBills}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  listContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  billCard: {
    borderRadius: BorderRadius.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  voiceNarration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
