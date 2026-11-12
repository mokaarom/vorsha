import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Typography,
  TextField,
  Input,
  Label,
  FieldError,
  InputOTP,
} from 'heroui-native';
import { Spacing } from '../../constants/theme';
import { Screen } from '../../components/common/Screen';
import { useAuth } from '../../hooks/useAuth';
import { validatePhoneNumber } from '../../utils/validation';

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const { otpSent, sendOtp, verifyOtp, isLoading } = useAuth();
  const [phone, setPhone] = useState('01712345678');
  const [otp, setOtp] = useState('1234');
  const [phoneError, setPhoneError] = useState('');

  const handleSendOtp = async () => {
    const valid = validatePhoneNumber(phone);
    if (!valid.isValid) {
      setPhoneError('সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন');
      return;
    }
    setPhoneError('');
    await sendOtp(phone);
  };

  const handleVerify = async () => {
    await verifyOtp({ phone, otp });
    router.replace('/(tabs)/voice');
  };

  return (
    <Screen
      leading="back"
      trailing="none"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Typography type="h2" weight="medium">
            {t('auth.login_button')}
          </Typography>
          <Typography type="body" color="muted" style={styles.subtitle}>
            {otpSent ? t('auth.otp_subtitle') : t('auth.welcome_subtitle')}
          </Typography>

          <View style={styles.form}>
            <TextField isInvalid={!!phoneError} isDisabled={otpSent}>
              <Label>{t('auth.phone_label')}</Label>
              <Input
                placeholder={t('auth.phone_placeholder')}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!otpSent}
              />
              {phoneError ? <FieldError>{phoneError}</FieldError> : null}
            </TextField>

            {otpSent ? (
              <View style={styles.otpBlock}>
                <Typography type="body-sm" weight="medium" style={styles.otpLabel}>
                  {t('auth.otp_title')}
                </Typography>
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={setOtp}
                  onComplete={(code) => setOtp(code)}
                >
                  <InputOTP.Slot index={0} />
                  <InputOTP.Slot index={1} />
                  <InputOTP.Slot index={2} />
                  <InputOTP.Slot index={3} />
                </InputOTP>
              </View>
            ) : null}

            <Button
              variant="primary"
              size="lg"
              isDisabled={isLoading}
              onPress={otpSent ? handleVerify : handleSendOtp}
              style={{ alignSelf: 'stretch', marginTop: Spacing.md }}
            >
              <Button.Label>
                {otpSent ? t('auth.verify_otp') : t('auth.send_otp')}
              </Button.Label>
            </Button>

            {otpSent ? (
              <Button
                variant="ghost"
                onPress={handleSendOtp}
                style={{ alignSelf: 'stretch', marginTop: 8 }}
              >
                <Button.Label>{t('auth.resend_otp')}</Button.Label>
              </Button>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: Spacing.xl,
  },
  form: {
    gap: Spacing.sm,
  },
  otpBlock: {
    gap: 12,
    alignItems: 'flex-start',
    marginTop: Spacing.sm,
  },
  otpLabel: {
    marginBottom: 4,
  },
});
