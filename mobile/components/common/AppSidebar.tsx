import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography, useThemeColor } from 'heroui-native';
import {
  AudioLines,
  MessageCircle,
  FileText,
  Camera,
  BookOpen,
  User,
  Home,
  X,
} from 'lucide-react-native';
import { Spacing, BorderRadius, TouchTargets, Shadows } from '../../constants/theme';
import { AccountAvatar } from './AccountAvatar';
import { LanguageToggle } from './LanguageToggle';
import { useAuthStore } from '../../store/authStore';

const SIDEBAR_WIDTH = Math.min(Dimensions.get('window').width * 0.82, 320);

type NavItem = {
  key: string;
  labelKey: string;
  icon: typeof Home;
  route: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'home', labelKey: 'nav.home', icon: Home, route: '/' },
  { key: 'live', labelKey: 'live.title', icon: AudioLines, route: '/live' },
  {
    key: 'voice',
    labelKey: 'nav.voice',
    icon: MessageCircle,
    route: '/(tabs)/voice',
  },
  { key: 'forms', labelKey: 'nav.forms', icon: FileText, route: '/(tabs)/forms' },
  { key: 'report', labelKey: 'nav.report', icon: Camera, route: '/(tabs)/report' },
  {
    key: 'legislation',
    labelKey: 'nav.legislation',
    icon: BookOpen,
    route: '/(tabs)/legislation',
  },
  {
    key: 'profile',
    labelKey: 'nav.profile',
    icon: User,
    route: '/(tabs)/profile',
  },
];

export type AppSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AppSidebar: React.FC<AppSidebarProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const progress = useSharedValue(0);
  const [mounted, setMounted] = React.useState(open);

  const [surface, background, foreground, muted, border, accent] =
    useThemeColor([
      'surface',
      'background',
      'foreground',
      'muted',
      'border',
      'accent',
    ]) as string[];

  useEffect(() => {
    if (open) {
      setMounted(true);
      progress.value = withTiming(1, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    progress.value = withTiming(
      0,
      { duration: 220, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(setMounted)(false);
        }
      },
    );
  }, [open, progress]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: (1 - progress.value) * -SIDEBAR_WIDTH,
      },
    ],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.45,
  }));

  const close = () => onOpenChange(false);

  const navigate = (route: string) => {
    onOpenChange(false);
    router.push(route as any);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={close}
      statusBarTranslucent
    >
      <View style={styles.modalRoot}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: '#0B1220' },
              overlayStyle,
            ]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.panel,
            {
              width: SIDEBAR_WIDTH,
              backgroundColor: surface,
              paddingTop: insets.top + Spacing.sm,
              paddingBottom: insets.bottom + Spacing.md,
            },
            Shadows.lg,
            panelStyle,
          ]}
          accessibilityViewIsModal
        >
          <View style={styles.panelHeader}>
            <View style={styles.brandRow}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <View style={styles.brandCopy}>
                <Typography type="h4" weight="medium" style={{ color: accent }}>
                  {t('app_name')}
                </Typography>
                <Typography type="body-xs" color="muted" numberOfLines={1}>
                  {t('app_tagline')}
                </Typography>
              </View>
            </View>
            <Pressable
              onPress={close}
              style={[styles.closeBtn, { backgroundColor: background }]}
              accessibilityRole="button"
              accessibilityLabel={t('common.close')}
              hitSlop={8}
            >
              <X size={18} color={foreground} strokeWidth={1.75} />
            </Pressable>
          </View>

          <Pressable
            onPress={() => navigate('/(tabs)/profile')}
            style={[styles.accountCard, { backgroundColor: background, borderColor: border }]}
            accessibilityRole="button"
            accessibilityLabel={t('nav.profile')}
          >
            <AccountAvatar size={44} />
            <View style={styles.accountCopy}>
              <Typography type="body" weight="medium" numberOfLines={1}>
                {user?.name || t('nav.profile')}
              </Typography>
              <Typography type="body-xs" color="muted" numberOfLines={1}>
                {user?.phone || t('app_tagline')}
              </Typography>
            </View>
          </Pressable>

          <View style={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => navigate(item.route)}
                  style={({ pressed }) => [
                    styles.navItem,
                    pressed && { backgroundColor: background },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={t(item.labelKey)}
                >
                  <View
                    style={[styles.navIconWrap, { backgroundColor: background }]}
                  >
                    <Icon size={18} color={muted} strokeWidth={1.5} />
                  </View>
                  <Typography type="body" weight="medium">
                    {t(item.labelKey)}
                  </Typography>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.footer, { borderTopColor: border }]}>
            <Typography type="body-xs" color="muted" style={styles.langLabel}>
              {t('auth.language_select')}
            </Typography>
            <LanguageToggle />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: 'row',
  },
  panel: {
    height: '100%',
    paddingHorizontal: Spacing.md,
    zIndex: 2,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: Spacing.sm,
  },
  brandLogo: {
    width: 40,
    height: 40,
  },
  brandCopy: {
    flex: 1,
    gap: 2,
  },
  closeBtn: {
    width: TouchTargets.min * 0.75,
    height: TouchTargets.min * 0.75,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    minHeight: TouchTargets.min,
  },
  accountCopy: {
    flex: 1,
    gap: 2,
  },
  navList: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: TouchTargets.min,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  navIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  langLabel: {
    marginBottom: 2,
  },
});
