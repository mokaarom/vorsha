import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { User } from 'lucide-react-native';
import { usePalette } from '../../hooks/usePalette';
import { useAuthStore } from '../../store/authStore';

export type AccountAvatarProps = {
  size?: number;
  /** Account photo. Falls back to the user's initials, then a person icon. */
  image?: ImageSourcePropType;
};

export const AccountAvatar: React.FC<AccountAvatarProps> = ({
  size = 40,
  image,
}) => {
  const palette = usePalette();
  const name = useAuthStore((s) => s.user?.name);
  const initials = name?.trim().slice(0, 2);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.accent,
      }}
    >
      {image ? (
        <Image
          source={image}
          style={{ width: size, height: size }}
          accessibilityIgnoresInvertColors
        />
      ) : initials ? (
        <Text
          style={{
            color: palette.accentForeground,
            fontSize: size * 0.36,
            fontWeight: '600',
          }}
        >
          {initials}
        </Text>
      ) : (
        <User
          size={Math.round(size * 0.48)}
          color={palette.accentForeground}
          strokeWidth={1.75}
        />
      )}
    </View>
  );
};
