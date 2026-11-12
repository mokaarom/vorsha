import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Typography,
  TextField,
  Input,
  Label,
} from 'heroui-native';
import { Spacing } from '../../constants/theme';
import { Screen } from '../../components/common/Screen';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { verifyOtp, isLoading } = useAuth();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nid, setNid] = useState('');

  const handleRegister = async () => {
    await verifyOtp({ phone: phone || '01812345678', otp: '1234', nid });
    router.replace('/(tabs)/voice');
  };

  return (
    <Screen
      leading="back"
      trailing="none"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
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
    </Screen>
  );
}

const styles = StyleSheet.create({
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
