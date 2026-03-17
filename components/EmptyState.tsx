// ============================================================================
// EmptyState — Centered message with optional action button
// ============================================================================
// Shown when there's no data to display:
//   - Empty pantry → "Your pantry is empty" + Scan CTA
//   - No recipes → "No recipes found" + suggestion
//   - OCR failure → "Couldn't read this receipt" + Retry/Manual buttons
//
// Usage:
//   <EmptyState
//     icon="basket-outline"
//     title="Your pantry is empty"
//     subtitle="Scan a receipt to get started"
//     actionTitle="Scan a receipt"
//     onAction={() => router.push('/scan/camera')}
//   />
// ============================================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radii } from '@/constants/theme';
import { CTAButton } from './CTAButton';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  actionTitle?: string;
  onAction?: () => void;
  secondaryTitle?: string;
  onSecondary?: () => void;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  actionTitle,
  onAction,
  secondaryTitle,
  onSecondary,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {/* Icon in a tinted circle */}
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={36} color={colors.primary[600]} />
      </View>

      {/* Title and subtitle */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Primary action button */}
      {actionTitle && onAction && (
        <CTAButton
          title={actionTitle}
          onPress={onAction}
          style={styles.actionButton}
        />
      )}

      {/* Optional secondary action (e.g., "Add manually") */}
      {secondaryTitle && onSecondary && (
        <CTAButton
          title={secondaryTitle}
          onPress={onSecondary}
          variant="secondary"
          style={styles.secondaryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.scale.headingMd.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.scale.bodySm.fontSize,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  actionButton: {
    width: '100%',
    marginTop: spacing.xxl,
  },
  secondaryButton: {
    width: '100%',
    marginTop: spacing.md,
  },
});
