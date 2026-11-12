import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Typography, useThemeColor } from 'heroui-native';
import { BorderRadius, Spacing } from '../../constants/theme';
import { useSettingsStore } from '../../store/settingsStore';
import i18n from '../../i18n';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useSettingsStore();
  const [accent, accentFg, surfaceSecondary, foreground] = useThemeColor([
    'accent',
    'accent-foreground',
    'surface-secondary',
    'foreground',
  ]) as string[];

  const toggleLang = (newLang: 'bn' | 'en') => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: surfaceSecondary }]}
      accessibilityRole="tablist"
    >
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: language === 'bn' }}
        onPress={() => toggleLang('bn')}
        style={[
          styles.btn,
          language === 'bn' && { backgroundColor: accent },
        ]}
      >
        <Typography
          type="body-sm"
          weight="medium"
          style={{ color: language === 'bn' ? accentFg : foreground }}
        >
          বাংলা
        </Typography>
      </Pressable>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: language === 'en' }}
        onPress={() => toggleLang('en')}
        style={[
          styles.btn,
          language === 'en' && { backgroundColor: accent },
        ]}
      >
        <Typography
          type="body-sm"
          weight="medium"
          style={{ color: language === 'en' ? accentFg : foreground }}
        >
          EN
        </Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    padding: 2,
    alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
