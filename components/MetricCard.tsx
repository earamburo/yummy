// ============================================================================
// MetricCard — Stat display card on the Home screen
// ============================================================================
// Shows a large number with a label underneath. Used in a row of two:
//   - "23 Items in pantry" (teal number)
//   - "3 Expiring soon" (coral number)
//
// Usage:
//   <MetricCard
//     value={23}
//     label="Items in pantry"
//     color={colors.primary[600]}
//     onPress={() => router.push('/(tabs)/pantry')}
//   />
// ============================================================================

import { colors, layout, radii, spacing, typography } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface MetricCardProps {
  value: number;
  label: string;
  color: string;
  onPress?: () => void;
}

export function MetricCard({ value, label, color, onPress }: MetricCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && onPress && styles.pressed,
      ]}
      onPress={onPress}
      disabled={!onPress}
      accessibilityLabel={`${value} ${label}`}
      accessibilityRole={onPress ? 'button' : 'text'}
    >
      <Text style={[styles.number, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: radii.lg,
    padding: layout.metricCard.padding,
    borderWidth: 0.5,
    borderColor: colors.border.default,
  },
  pressed: {
    opacity: 0.7,
  },
  number: {
    fontSize: layout.metricCard.numberSize,
    fontWeight: typography.weight.medium,
  },
  label: {
    fontSize: layout.metricCard.labelSize,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
