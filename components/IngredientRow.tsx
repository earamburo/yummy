// ============================================================================
// IngredientRow — Reusable list item for ingredients
// ============================================================================
// Used on three screens with different trailing info:
//   - 'review'  → Shows quantity on the right (e.g., "2.3 lb")
//   - 'pantry'  → Shows quantity + expiry countdown below the name
//   - 'recipe'  → Shows "In pantry" or "Not in pantry" status
//
// Usage:
//   <IngredientRow
//     variant="pantry"
//     name="Chicken breast"
//     category="protein"
//     quantity={2.3}
//     unit="lb"
//     expiryDate="2026-03-19T00:00:00Z"
//     onPress={() => handleTap(id)}
//   />
// ============================================================================

import {
  colors,
  getCategoryColor,
  getExpiryStyle,
  radii,
  spacing,
  typography
} from '@/constants/theme';
import { IngredientCategory, IngredientRowVariant } from '@/types';
import { daysUntilExpiry, formatQuantity } from '@/utils';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface IngredientRowProps {
  variant: IngredientRowVariant;
  name: string;
  category: IngredientCategory;
  quantity?: number;
  unit?: string;
  expiryDate?: string;       // Required for 'pantry' variant
  inPantry?: boolean;         // Required for 'recipe' variant
  onPress?: () => void;
  onLongPress?: () => void;   // For swipe-to-delete on Review screen
}

export function IngredientRow({
  variant,
  name,
  category,
  quantity,
  unit,
  expiryDate,
  inPantry,
  onPress,
  onLongPress,
}: IngredientRowProps) {
  // Determine if this item is expiring soon (pantry variant only)
  const isExpiring =
    variant === 'pantry' && expiryDate
      ? daysUntilExpiry(expiryDate) <= 3
      : false;

  const expiryInfo =
    variant === 'pantry' && expiryDate
      ? getExpiryStyle(daysUntilExpiry(expiryDate))
      : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        // Add warm tint for expiring items in pantry view
        isExpiring && styles.expiringRow,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      // Accessibility: describe the ingredient for screen readers
      accessibilityLabel={`${name}, ${quantity} ${unit}${
        isExpiring ? ', expiring soon' : ''
      }`}
      accessibilityRole="button"
    >
      {/* Category color dot */}
      <View
        style={[
          styles.dot,
          { backgroundColor: getCategoryColor(category) },
        ]}
      />

      {/* Name + optional expiry subtitle */}
      <View style={styles.nameContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        {variant === 'pantry' && expiryInfo && (
          <Text
            style={[
              styles.expiry,
              { color: expiryInfo.textColor },
            ]}
          >
            {expiryInfo.label}
          </Text>
        )}
      </View>

      {/* Trailing info varies by variant */}
      {variant === 'review' && quantity !== undefined && unit && (
        <Text style={styles.quantity}>
          {formatQuantity(quantity, unit)}
        </Text>
      )}

      {variant === 'pantry' && quantity !== undefined && unit && (
        <Text style={styles.quantity}>
          {formatQuantity(quantity, unit)}
        </Text>
      )}

      {variant === 'recipe' && (
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: inPantry
                  ? colors.primary[600]
                  : colors.amber[400],
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              {
                color: inPantry
                  ? colors.primary[600]
                  : colors.amber[400],
              },
            ]}
          >
            {inPantry ? 'In pantry' : 'Not in pantry'}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.listItemVertical,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  expiringRow: {
    backgroundColor: '#FFF8F5',
  },
  pressed: {
    opacity: 0.7,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    marginRight: 14,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: typography.scale.bodyMd.fontSize,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
  },
  expiry: {
    fontSize: typography.scale.micro.fontSize,
    marginTop: 2,
  },
  quantity: {
    fontSize: typography.scale.caption.fontSize,
    color: colors.text.secondary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
  },
  statusText: {
    fontSize: typography.scale.caption.fontSize,
    fontWeight: typography.weight.regular,
  },
});
