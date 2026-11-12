import React from 'react';
import { View, Pressable, TextInputProps } from 'react-native';
import {
  TextField,
  Input as HeroInput,
  Label,
  Description,
  FieldError,
  InputGroup,
  useThemeColor,
} from 'heroui-native';
import { Mic } from 'lucide-react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  onVoicePress?: () => void;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  onVoicePress,
  rightIcon,
  style,
  ...props
}) => {
  const accent = useThemeColor('accent') as string;
  const hasSuffix = !!(onVoicePress || rightIcon);

  return (
    <TextField isInvalid={!!error}>
      {label ? <Label>{label}</Label> : null}

      {hasSuffix ? (
        <InputGroup>
          <InputGroup.Input style={style} {...props} />
          <InputGroup.Suffix>
            {onVoicePress ? (
              <Pressable
                onPress={onVoicePress}
                hitSlop={12}
                accessibilityLabel="Fill with voice"
                accessibilityRole="button"
                style={{ padding: 4 }}
              >
                <Mic size={18} color={accent} strokeWidth={1.5} />
              </Pressable>
            ) : null}
            {rightIcon ? <View>{rightIcon}</View> : null}
          </InputGroup.Suffix>
        </InputGroup>
      ) : (
        <HeroInput style={style} {...props} />
      )}

      {error ? (
        <FieldError>{error}</FieldError>
      ) : helperText ? (
        <Description>{helperText}</Description>
      ) : null}
    </TextField>
  );
};
