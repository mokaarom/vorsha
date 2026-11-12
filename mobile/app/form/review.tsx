import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Alert as HeroAlert,
  Separator,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { useFormStore } from '../../store/formStore';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/common/Screen';
import { useSettingsStore } from '../../store/settingsStore';
import { FileCheck, Download, CheckCircle2 } from 'lucide-react-native';

export default function FormReviewScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const [accent, surfaceSecondary, success] = useThemeColor([
    'accent',
    'surface-secondary',
    'success',
  ]) as string[];
  const { activeTemplate, formData, resetForm } = useFormStore();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleDownloadPdf = () => {
    Alert.alert(
      language === 'bn' ? 'পিডিএফ প্রস্তুত' : 'PDF Ready',
      language === 'bn'
        ? 'আপনার পূরণকৃত আবেদন ফরমের ডিজিটাল PDF কপি ডাউনলোড হয়েছে।'
        : 'The digital PDF of your application has been generated.'
    );
  };

  const handleFinish = () => {
    resetForm();
    router.replace('/(tabs)/forms');
  };

  return (
    <Screen
      title={t('nav.review')}
      leading="back"
      edges={['top', 'bottom', 'left', 'right']}
    >
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.summaryCard}>
        <Card.Body style={{ alignItems: 'center' }}>
          <View
            style={[styles.iconWrapper, { backgroundColor: surfaceSecondary }]}
          >
            <FileCheck size={24} color={accent} strokeWidth={1.5} />
          </View>
          <Typography type="h4" weight="medium" align="center">
            {language === 'bn' ? 'আবেদন তথ্য যাচাই' : 'Application summary'}
          </Typography>
          <Typography type="body-sm" color="muted" align="center" style={{ marginTop: 4, marginBottom: Spacing.md }}>
            {language === 'bn' ? activeTemplate?.titleBn : activeTemplate?.titleEn}
          </Typography>

          <View style={styles.dataList}>
            {activeTemplate?.fields.map((field, index) => (
              <View key={field.id}>
                {index > 0 ? <Separator style={{ marginVertical: 8 }} /> : null}
                <View style={styles.dataRow}>
                  <Typography type="body-sm" color="muted" style={{ flex: 1 }}>
                    {language === 'bn' ? field.labelBn : field.labelEn}
                  </Typography>
                  <Typography type="body-sm" weight="medium" style={styles.fieldValue}>
                    {formData[field.id] || '—'}
                  </Typography>
                </View>
              </View>
            ))}
          </View>
        </Card.Body>
      </Card>

      {submitted ? (
        <View style={styles.successSection}>
          <HeroAlert status="success">
            <HeroAlert.Indicator>
              <CheckCircle2 size={18} color={success} strokeWidth={1.5} />
            </HeroAlert.Indicator>
            <HeroAlert.Content>
              <HeroAlert.Title>
                {language === 'bn' ? 'আবেদন দাখিল হয়েছে' : 'Submitted'}
              </HeroAlert.Title>
              <HeroAlert.Description>
                {language === 'bn'
                  ? 'আপনার আবেদন সফলভাবে সংরক্ষিত হয়েছে।'
                  : 'Your application has been saved.'}
              </HeroAlert.Description>
            </HeroAlert.Content>
          </HeroAlert>
          <Button
            title={t('forms.download_pdf')}
            variant="outline"
            fullWidth
            icon={<Download size={16} color={accent} strokeWidth={1.5} />}
            onPress={handleDownloadPdf}
          />
          <Button
            title={t('common.done')}
            fullWidth
            style={{ marginTop: 8 }}
            onPress={handleFinish}
          />
        </View>
      ) : (
        <View style={styles.actionSection}>
          <Button
            title={t('common.submit')}
            size="lg"
            loading={submitting}
            fullWidth
            onPress={handleSubmit}
          />
          <Button
            title={t('common.edit')}
            variant="ghost"
            fullWidth
            style={{ marginTop: 8 }}
            onPress={() => router.back()}
          />
        </View>
      )}
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
  },
  summaryCard: {
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  dataList: {
    width: '100%',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  fieldValue: {
    maxWidth: '55%',
    textAlign: 'right',
  },
  actionSection: {
    marginTop: Spacing.md,
  },
  successSection: {
    gap: Spacing.sm,
  },
});
