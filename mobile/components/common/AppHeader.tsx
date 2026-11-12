import React, { useState } from 'react';
import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react-native';
import { OnShader } from '../../constants/colors';
import { Spacing, TouchTargets } from '../../constants/theme';
import { usePalette } from '../../hooks/usePalette';
import { AccountAvatar } from './AccountAvatar';
import { AppSidebar } from './AppSidebar';
import { MenuIcon } from './MenuIcon';

export type AppHeaderProps = {
  title?: string;
  /** Left control: the grid button opens the sidebar, back pops the stack. */
  leading?: 'menu' | 'back';
  /** Right control: the account image opens the profile screen. */
  trailing?: 'account' | 'none';
  /** Account photo for the right control. */
  accountImage?: ImageSourcePropType;
  /** Render for the "deep" shader tone, where content is always light. */
  onShader?: boolean;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leading = 'menu',
  trailing = 'account',
  accountImage,
  onShader = false,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const palette = usePalette();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const buttonStyle = {
    backgroundColor: onShader ? OnShader.glass : palette.glass,
    borderColor: onShader ? OnShader.glassBorder : palette.glassBorder,
  };
  const iconColor = onShader ? OnShader.text : palette.foreground;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <>
      <View style={styles.header}>
        {leading === 'back' ? (
          <Pressable
            onPress={goBack}
            style={[styles.circleBtn, buttonStyle]}
            accessibilityRole="button"
            accessibilityLabel={t('common.back')}
          >
            <ChevronLeft size={22} color={iconColor} strokeWidth={1.75} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setSidebarOpen(true)}
            style={[styles.circleBtn, buttonStyle]}
            accessibilityRole="button"
            accessibilityLabel={t('nav.open_menu')}
          >
            <MenuIcon size={18} color={iconColor} />
          </Pressable>
        )}

        <View style={styles.titleWrap} pointerEvents="none">
          {title ? (
            <Text
              numberOfLines={1}
              accessibilityRole="header"
              style={[styles.title, { color: iconColor }]}
            >
              {title}
            </Text>
          ) : null}
        </View>

        {trailing === 'account' ? (
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={[styles.circleBtn, buttonStyle]}
            accessibilityRole="button"
            accessibilityLabel={t('nav.profile')}
          >
            <AccountAvatar size={TouchTargets.min - 8} image={accountImage} />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>

      {leading === 'menu' ? (
        <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  circleBtn: {
    width: TouchTargets.min,
    height: TouchTargets.min,
    borderRadius: TouchTargets.min / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: TouchTargets.min,
    height: TouchTargets.min,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
});
