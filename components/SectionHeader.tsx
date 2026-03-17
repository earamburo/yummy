// ============================================================================
// SectionHeader — Title with optional trailing link
// ============================================================================
// Displays a section label with an optional "See all" or action link
// on the right side. Used on the Home screen above recipe cards.
//
// Usage:
//   <SectionHeader
//     title="Suggested recipes"
//     actionText="See all"
//     onAction={() => router.push('/(tabs)/recipes')}
//   />
// ============================================================================

import { colors, spacing, typography } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
}

export const SectionHeader = ({
  title,
  actionText,
  onAction,
}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionText && onAction && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.scale.bodyLg.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
  },
  action: {
    fontSize: typography.scale.caption.fontSize,
    color: colors.primary[600],
  },
});
