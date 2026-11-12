import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextField, Input, Description, FieldError } from 'heroui-native';
import { FormFieldDefinition } from '../../store/formStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Pressable } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useThemeColor } from 'heroui-native';
import { InputGroup, Label } from 'heroui-native';

export interface FormFieldProps {
  field: FormFieldDefinition;
  value: any;
  error?: string;
  onChangeValue: (val: any) => void;
  onVoiceFill?: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChangeValue,
  onVoiceFill,
}) => {
  const language = useSettingsStore((s) => s.language);
  const accent = useThemeColor('accent') as string;
  const label = language === 'bn' ? field.labelBn : field.labelEn;
  const placeholder =
    language === 'bn' ? field.placeholderBn : field.placeholderEn;
  const helpText = language === 'bn' ? field.helpTextBn : field.helpTextEn;

  return (
    <View style={styles.container}>
      <TextField isInvalid={!!error} isRequired={field.required}>
        <Label>{label}</Label>
        <InputGroup>
          <InputGroup.Input
            placeholder={placeholder}
            value={value ? String(value) : ''}
            onChangeText={onChangeValue}
            keyboardType={
              field.type === 'phone'
                ? 'phone-pad'
                : field.type === 'number' || field.type === 'nid'
                ? 'numeric'
                : 'default'
            }
          />
          {onVoiceFill ? (
            <InputGroup.Suffix>
              <Pressable
                onPress={onVoiceFill}
                hitSlop={12}
                accessibilityLabel="Fill with voice"
                accessibilityRole="button"
                style={{ padding: 4 }}
              >
                <Mic size={18} color={accent} strokeWidth={1.5} />
              </Pressable>
            </InputGroup.Suffix>
          ) : null}
        </InputGroup>
        {error ? (
          <FieldError>{error}</FieldError>
        ) : helpText ? (
          <Description>{helpText}</Description>
        ) : null}
      </TextField>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});
