import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Button,
  Switch,
  Avatar,
  Separator,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Badge } from '../../components/ui/Badge';
import { LanguageToggle } from '../../components/common/LanguageToggle';
import { Screen } from '../../components/common/Screen';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Uniwind } from 'uniwind';
import {
  ShieldCheck,
  Moon,
  Volume2,
  Trash2,
  LogOut,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, setTheme, voiceSpeed, setVoiceSpeed, language } = useSettingsStore();
  const [muted, accent, accentFg, surfaceSecondary, border] =
    useThemeColor([
      'muted',
      'accent',
      'accent-foreground',
      'surface-secondary',
      'border',
    ]) as string[];

  const isDark = theme === 'dark';

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/onboarding');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      language === 'bn' ? 'অ্যাকাউন্ট মুছবেন?' : 'Delete Account?',
      language === 'bn'
        ? 'আপনার সকল কথোপকথন এবং সংরক্ষিত তথ্য স্থায়ীভাবে মুছে ফেলা হবে।'
        : 'All your data will be permanently removed from sovereign cloud storage.',
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.delete'), style: 'destructive', onPress: handleLogout },
      ]
    );
  };

  const toggleTheme = (val: boolean) => {
    const next = val ? 'dark' : 'light';
    setTheme(next);
    try {
      Uniwind.setTheme(next);
    } catch {
      // uniwind shim may no-op
    }
  };

  return (
    <Screen title={t('profile.title')} trailing="none">
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.userCard}>
        <Card.Body>
          <View style={styles.userHeader}>
            <Avatar alt={user?.name || 'Citizen'} size="lg">
              <Avatar.Fallback>
                {user?.name ? user.name.slice(0, 2) : 'না'}
              </Avatar.Fallback>
            </Avatar>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Typography type="body" weight="medium">
                {user?.name ||
                  (language === 'bn' ? 'সম্মানিত নাগরিক' : 'Citizen User')}
              </Typography>
              <Typography type="body-sm" color="muted">
                {user?.phone || '01XXXXXXXXX'}
              </Typography>
            </View>
            <Badge
              label={
                user?.isNidVerified
                  ? language === 'bn'
                    ? 'NID যাচাইকৃত'
                    : 'NID verified'
                  : language === 'bn'
                  ? 'যাচাই প্রয়োজন'
                  : 'Unverified'
              }
              variant={user?.isNidVerified ? 'success' : 'warning'}
            />
          </View>

          {!user?.isNidVerified ? (
            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push('/(auth)/login')}
              style={{ alignSelf: 'stretch', marginTop: Spacing.sm }}
            >
              <Button.Label>{t('profile.verify_now')}</Button.Label>
            </Button>
          ) : null}
        </Card.Body>
      </Card>

      <Typography type="body-sm" weight="medium" style={styles.sectionTitle}>
        {language === 'bn' ? 'পছন্দসমূহ ও সেটিংস' : 'Preferences'}
      </Typography>

      <Card>
        <Card.Body style={{ paddingVertical: 4, paddingHorizontal: 0 }}>
          <View style={styles.settingItem}>
            <Typography type="body-sm" weight="medium">
              {t('profile.language')}
            </Typography>
            <LanguageToggle />
          </View>
          <Separator />
          <View style={styles.settingItem}>
            <View style={styles.itemLeft}>
              <Moon size={18} color={muted} strokeWidth={1.5} />
              <Typography type="body-sm" weight="medium">
                {t('profile.dark_mode')}
              </Typography>
            </View>
            <Switch isSelected={isDark} onSelectedChange={toggleTheme}>
              <Switch.Thumb />
            </Switch>
          </View>
          <Separator />
          <View style={styles.settingItem}>
            <View style={styles.itemLeft}>
              <Volume2 size={18} color={muted} strokeWidth={1.5} />
              <Typography type="body-sm" weight="medium">
                {t('profile.voice_speed')}
              </Typography>
            </View>
            <View style={styles.speedPills}>
              {[0.8, 1.0, 1.2].map((spd) => {
                const active = voiceSpeed === spd;
                return (
                  <Pressable
                    key={spd}
                    onPress={() => setVoiceSpeed(spd)}
                    style={[
                      styles.speedPill,
                      {
                        backgroundColor: active ? accent : surfaceSecondary,
                        borderColor: active ? accent : border,
                      },
                    ]}
                  >
                    <Typography
                      type="body-xs"
                      weight="medium"
                      style={{ color: active ? accentFg : undefined }}
                    >
                      {spd}x
                    </Typography>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Card.Body>
      </Card>

      <Typography type="body-sm" weight="medium" style={styles.sectionTitle}>
        {language === 'bn' ? 'নিরাপত্তা ও সার্বভৌম ডাটা' : 'Security & sovereignty'}
      </Typography>

      <Card>
        <Card.Body>
          <View style={styles.itemLeft}>
            <ShieldCheck size={18} color={accent} strokeWidth={1.5} />
            <View style={{ flex: 1 }}>
              <Typography type="body-sm" weight="medium">
                {t('profile.privacy')}
              </Typography>
              <Typography type="body-xs" color="muted">
                AES-256 · Bangladesh data residency
              </Typography>
            </View>
          </View>
        </Card.Body>
      </Card>

      <View style={styles.actionButtons}>
        {isAuthenticated ? (
          <Button
            variant="outline"
            onPress={handleLogout}
            style={{ alignSelf: 'stretch' }}
          >
            <LogOut size={16} color={accent} strokeWidth={1.5} />
            <Button.Label>{t('profile.logout')}</Button.Label>
          </Button>
        ) : (
          <Button
            variant="primary"
            onPress={() => router.push('/(auth)/login')}
            style={{ alignSelf: 'stretch' }}
          >
            <Button.Label>{t('auth.login_button')}</Button.Label>
          </Button>
        )}

        <Button
          variant="danger"
          onPress={handleDeleteAccount}
          style={{ alignSelf: 'stretch', marginTop: 8 }}
        >
          <Trash2 size={16} color="#FFFFFF" strokeWidth={1.5} />
          <Button.Label>{t('profile.delete_account')}</Button.Label>
        </Button>
      </View>
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
    paddingBottom: Spacing.xxl,
  },
  userCard: {
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.xl,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    paddingHorizontal: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  speedPills: {
    flexDirection: 'row',
    gap: 6,
  },
  speedPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minWidth: 40,
    alignItems: 'center',
  },
  actionButtons: {
    marginTop: Spacing.lg,
  },
});
