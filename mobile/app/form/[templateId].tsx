import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography, useThemeColor } from 'heroui-native';
import { Spacing } from '../../constants/theme';
import { useFormStore, FormTemplate, FormFieldDefinition } from '../../store/formStore';
import { FormField } from '../../components/forms/FormField';
import { ProgressBar } from '../../components/forms/ProgressBar';
import { Button } from '../../components/ui/Button';
import { useSettingsStore } from '../../store/settingsStore';
import { validatePhoneNumber, validateNID } from '../../utils/validation';

export default function FormFillingScreen() {
  const { templateId } = useLocalSearchParams();
  const { t } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const background = useThemeColor('background') as string;

  const {
    activeTemplate,
    currentStep,
    formData,
    formErrors,
    setActiveTemplate,
    setCurrentStep,
    setFieldValue,
    setFieldError,
    clearFieldError,
  } = useFormStore();

  useEffect(() => {
    const template: FormTemplate = {
      id: String(templateId),
      titleEn: 'Trade License Application',
      titleBn: 'ট্রেড লাইসেন্স আবেদন ফরম',
      departmentEn: 'Local Government Division',
      departmentBn: 'স্থানীয় সরকার বিভাগ',
      category: 'Business',
      stepsCount: 3,
      fields: [
        {
          id: 'business_name',
          labelEn: 'Business Name',
          labelBn: 'ব্যবসা প্রতিষ্ঠানের নাম',
          type: 'text',
          placeholderEn: 'e.g. M/S Karim Enterprises',
          placeholderBn: 'যেমনঃ মেসার্স করিম এন্টারপ্রাইজ',
          required: true,
        },
        {
          id: 'applicant_name',
          labelEn: 'Applicant Full Name',
          labelBn: 'আবেদনকারীর নাম',
          type: 'text',
          placeholderEn: 'As per NID',
          placeholderBn: 'জাতীয় পরিচয়পত্র অনুযায়ী',
          required: true,
        },
        {
          id: 'nid_number',
          labelEn: 'National ID (NID)',
          labelBn: 'জাতীয় পরিচয়পত্র (NID) নম্বর',
          type: 'nid',
          placeholderEn: '10 or 17 digit NID',
          placeholderBn: '১০ বা ১৭ সংখ্যার এনআইডি নম্বর',
          required: true,
        },
        {
          id: 'phone',
          labelEn: 'Mobile Number',
          labelBn: 'মোবাইল নম্বর',
          type: 'phone',
          placeholderEn: '01XXXXXXXXX',
          placeholderBn: '০১XXXXXXXXX',
          required: true,
        },
        {
          id: 'business_address',
          labelEn: 'Business Address (Ward / Holding)',
          labelBn: 'ব্যবসা প্রতিষ্ঠানের ঠিকানা (ওয়ার্ড / হোল্ডিং)',
          type: 'text',
          placeholderEn: 'Holding No, Road, Ward',
          placeholderBn: 'হোল্ডিং নম্বর, সড়ক, ওয়ার্ড',
          required: true,
        },
      ],
    };
    setActiveTemplate(template);
  }, [templateId, setActiveTemplate]);

  if (!activeTemplate) return null;

  const stepFields =
    currentStep === 0
      ? activeTemplate.fields.slice(0, 2)
      : currentStep === 1
      ? activeTemplate.fields.slice(2, 4)
      : activeTemplate.fields.slice(4);

  const handleVoiceFill = (field: FormFieldDefinition) => {
    if (field.type === 'nid') {
      setFieldValue(field.id, '19902692512345678');
    } else if (field.type === 'phone') {
      setFieldValue(field.id, '01712345678');
    } else if (field.id === 'business_name') {
      setFieldValue(field.id, 'মেসার্স সততা জেনারেল স্টোর');
    } else if (field.id === 'applicant_name') {
      setFieldValue(field.id, 'মোহাম্মদ রফিকুল ইসলাম');
    } else {
      setFieldValue(field.id, 'বাড়ি ১২, রোড ৪, ধানমন্ডি, ঢাকা');
    }
  };

  const validateCurrentStep = (): boolean => {
    let isValid = true;
    for (const field of stepFields) {
      const val = formData[field.id];
      if (field.required && (!val || String(val).trim() === '')) {
        setFieldError(
          field.id,
          language === 'bn' ? 'এই তথ্যটি আবশ্যক' : 'This field is required'
        );
        isValid = false;
        continue;
      }
      if (field.type === 'phone' && val) {
        const check = validatePhoneNumber(val);
        if (!check.isValid) {
          setFieldError(
            field.id,
            language === 'bn' ? 'সঠিক ১১ সংখ্যার নম্বর লিখুন' : 'Invalid phone'
          );
          isValid = false;
          continue;
        }
      }
      if (field.type === 'nid' && val) {
        const check = validateNID(val);
        if (!check.isValid) {
          setFieldError(
            field.id,
            language === 'bn' ? '১০ বা ১৭ সংখ্যার এনআইডি লিখুন' : 'Invalid NID'
          );
          isValid = false;
          continue;
        }
      }
      clearFieldError(field.id);
    }
    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < activeTemplate.stepsCount - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/form/review');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Typography type="h4" weight="medium">
          {language === 'bn' ? activeTemplate.titleBn : activeTemplate.titleEn}
        </Typography>
        <Typography type="body-sm" color="muted" style={{ marginTop: 2, marginBottom: Spacing.sm }}>
          {language === 'bn'
            ? activeTemplate.departmentBn
            : activeTemplate.departmentEn}
        </Typography>

        <ProgressBar
          currentStep={currentStep}
          totalSteps={activeTemplate.stepsCount}
        />

        <View style={styles.fieldsContainer}>
          {stepFields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              value={formData[field.id]}
              error={formErrors[field.id]}
              onChangeValue={(val) => setFieldValue(field.id, val)}
              onVoiceFill={() => handleVoiceFill(field)}
            />
          ))}
        </View>

        <View style={styles.actionsRow}>
          <Button
            title={t('common.back')}
            variant="outline"
            style={{ flex: 1 }}
            onPress={handleBack}
          />
          <Button
            title={
              currentStep === activeTemplate.stepsCount - 1
                ? language === 'bn'
                  ? 'যাচাই করুন'
                  : 'Review'
                : t('common.continue')
            }
            style={{ flex: 2 }}
            onPress={handleNext}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  fieldsContainer: {
    gap: Spacing.sm,
    marginVertical: Spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: Spacing.lg,
  },
});
