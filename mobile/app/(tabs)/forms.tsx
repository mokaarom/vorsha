import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  SearchField,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Badge } from '../../components/ui/Badge';
import { useSettingsStore } from '../../store/settingsStore';
import { FileText, ArrowRight, Clock, Building2 } from 'lucide-react-native';

interface FormItem {
  id: string;
  titleEn: string;
  titleBn: string;
  deptEn: string;
  deptBn: string;
  category: string;
  estimatedMinutes: number;
}

const FORMS: FormItem[] = [
  {
    id: 'trade-license',
    titleEn: 'Trade License Application',
    titleBn: 'নতুন ট্রেড লাইসেন্স আবেদন ফরম',
    deptEn: 'City Corporation / Union Parishad',
    deptBn: 'সিটি কর্পোরেশন / ইউনিয়ন পরিষদ',
    category: 'Business',
    estimatedMinutes: 5,
  },
  {
    id: 'birth-reg',
    titleEn: 'Birth Certificate Application',
    titleBn: 'নতুন জন্ম নিবন্ধন আবেদন ফরম',
    deptEn: 'Registrar General Office (a2i)',
    deptBn: 'রেজিস্ট্রার জেনারেলের কার্যালয় (a2i)',
    category: 'Civil',
    estimatedMinutes: 4,
  },
  {
    id: 'land-mutation',
    titleEn: 'Land Mutation (e-Namjari)',
    titleBn: 'ই-নামজারি ও জমাখারিজ আবেদন',
    deptEn: 'Ministry of Land',
    deptBn: 'ভূমি মন্ত্রণালয় ও উপজেলা ভূমি অফিস',
    category: 'Land',
    estimatedMinutes: 8,
  },
  {
    id: 'social-allowance',
    titleEn: 'Old Age & Disability Allowance',
    titleBn: 'বয়স্ক ও প্রতিবন্ধী ভাতা আবেদন',
    deptEn: 'Department of Social Services',
    deptBn: 'সমাজসেবা অধিদপ্তর',
    category: 'Social',
    estimatedMinutes: 4,
  },
];

export default function FormsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const [background, surfaceSecondary, muted, accent] = useThemeColor([
    'background',
    'surface-secondary',
    'muted',
    'accent',
  ]) as string[];
  const [search, setSearch] = useState('');

  const filteredForms = FORMS.filter((f) => {
    const query = search.toLowerCase();
    return (
      f.titleBn.toLowerCase().includes(query) ||
      f.titleEn.toLowerCase().includes(query) ||
      f.category.toLowerCase().includes(query)
    );
  });

  const renderItem = ({ item }: { item: FormItem }) => {
    const title = language === 'bn' ? item.titleBn : item.titleEn;
    const dept = language === 'bn' ? item.deptBn : item.deptEn;

    return (
      <Pressable
        onPress={() => router.push(`/form/${item.id}` as any)}
        accessibilityRole="button"
      >
        <Card style={styles.formCard}>
          <Card.Body>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconWrapper, { backgroundColor: surfaceSecondary }]}
              >
                <FileText size={18} color={muted} strokeWidth={1.5} />
              </View>
              <Badge label={item.category} variant="info" />
            </View>

            <Typography type="body" weight="medium" style={{ marginTop: 8 }}>
              {title}
            </Typography>
            <View style={styles.metaRow}>
              <Building2 size={13} color={muted} strokeWidth={1.5} />
              <Typography type="body-xs" color="muted" numberOfLines={1} style={{ flex: 1 }}>
                {dept}
              </Typography>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.timeRow}>
                <Clock size={13} color={muted} strokeWidth={1.5} />
                <Typography type="body-xs" color="muted">
                  {language === 'bn'
                    ? `~${item.estimatedMinutes} মিনিট`
                    : `~${item.estimatedMinutes} mins`}
                </Typography>
              </View>
              <View style={styles.actionRow}>
                <Typography type="body-sm" style={{ color: accent }} weight="medium">
                  {language === 'bn' ? 'পূরণ করুন' : 'Start'}
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
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.searchHeader}>
        <SearchField value={search} onChange={setSearch}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder={t('forms.search_forms')} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </View>

      <FlatList
        data={filteredForms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  listContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  formCard: {
    borderRadius: BorderRadius.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
