// ============================================================================
// CategoryHeader — Uppercase category label for ingredient lists
// ============================================================================
// Displays a small, muted, uppercase label like "PROTEIN" or "PRODUCE"
// that separates groups of ingredients in the Review and Pantry screens.
//
// Usage:
//   <CategoryHeader title="Protein" />
// ============================================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

interface CategoryHeaderProps {
  title: string;
}

export function CategoryHeader({ title }: CategoryHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.categoryHeaderTop,
    paddingBottom: spacing.categoryHeaderBottom,
    paddingHorizontal: spacing.screenHorizontal,
  },
  text: {
    fontSize: typography.scale.label.fontSize,
    fontWeight: typography.scale.label.fontWeight,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: typography.scale.label.letterSpacing,
  },
});
