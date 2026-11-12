import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Typography,
  TextField,
  Input,
  Label,
  useThemeColor,
} from 'heroui-native';
import { Spacing } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const background = useThemeColor('background') as string;
  const { verifyOtp, isLoading } = useAuth();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nid, setNid] = useState('');

  const handleRegister = async () => {
    await verifyOtp({ phone: phone || '01812345678', otp: '1234', nid });
    router.replace('/(tabs)/voice');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Typography type="h2" weight="medium">
          {t('auth.register_button')}
        </Typography>
        <Typography type="body" color="muted" style={styles.subtitle}>
          {t('auth.welcome_subtitle')}
        </Typography>

        <View style={styles.form}>
          <TextField>
            <Label>পূর্ণ নাম</Label>
            <Input
              placeholder="আপনার নাম লিখুন"
              value={name}
              onChangeText={setName}
            />
          </TextField>

          <TextField isRequired>
            <Label>{t('auth.phone_label')}</Label>
            <Input
              placeholder={t('auth.phone_placeholder')}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </TextField>

          <TextField>
            <Label>{t('auth.nid_optional')}</Label>
            <Input
              placeholder="১০ বা ১৭ সংখ্যার এনআইডি"
              value={nid}
              onChangeText={setNid}
              keyboardType="numeric"
            />
          </TextField>

          <Button
            variant="primary"
            size="lg"
            isDisabled={isLoading}
            onPress={handleRegister}
            style={{ alignSelf: 'stretch', marginTop: Spacing.md }}
          >
            <Button.Label>{t('auth.register_button')}</Button.Label>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: Spacing.lg,
  },
  form: {
    gap: Spacing.sm,
  },
});
