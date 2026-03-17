// ============================================================================
// CTAButton — Primary call-to-action button
// ============================================================================
// Full-width button used for primary actions:
//   - "Add all to pantry" on Review screen
//   - "I cooked this" on Recipe Detail screen
//   - "Back to home" on Cooked screen
//   - "Scan a receipt" on empty states
//
// Usage:
//   <CTAButton title="Add all to pantry" onPress={handleSave} />
//   <CTAButton title="Retry" onPress={handleRetry} variant="secondary" />
//   <CTAButton title="Saving..." onPress={() => {}} disabled loading />
// ============================================================================

import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, layout } from '@/constants/theme';

interface CTAButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function CTAButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: CTAButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {loading ? (
        <ActivityIndicator
          color={isPrimary ? colors.text.inverse : colors.primary[600]}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
            disabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: layout.ctaButton.borderRadius,
    paddingVertical: spacing.buttonPadding,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.ctaButton.height,
  },
  primary: {
    backgroundColor: colors.primary[600],
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: colors.border.default,
  },
  disabled: {
    backgroundColor: colors.neutral[400],
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  text: {
    fontSize: layout.ctaButton.fontSize,
    fontWeight: typography.weight.medium,
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.primary[600],
  },
  disabledText: {
    color: colors.neutral[500],
  },
});
