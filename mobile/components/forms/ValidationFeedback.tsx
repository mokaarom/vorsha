import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert, useThemeColor } from 'heroui-native';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';

export interface ValidationFeedbackProps {
  isValid: boolean;
  message: string;
}

export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({
  isValid,
  message,
}) => {
  const [success, danger] = useThemeColor(['success', 'danger']) as string[];

  if (!message) return null;

  return (
    <View style={styles.wrap}>
      <Alert status={isValid ? 'success' : 'danger'}>
        <Alert.Indicator>
          {isValid ? (
            <CheckCircle2 size={16} color={success} strokeWidth={1.5} />
          ) : (
            <AlertCircle size={16} color={danger} strokeWidth={1.5} />
          )}
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>{message}</Alert.Title>
        </Alert.Content>
      </Alert>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
  },
});
