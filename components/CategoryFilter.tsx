// ============================================================================
// CategoryFilter — Horizontal scrolling filter pills
// ============================================================================
// Displays category pills (All, Protein, Produce, Dairy, etc.)
// for filtering the pantry list. The active pill is highlighted
// in the primary color; inactive pills use category-specific tints.
//
// Usage:
//   <CategoryFilter
//     activeFilter="all"
//     counts={{ all: 23, protein: 3, produce: 8, dairy: 4, ... }}
//     onFilterChange={(filter) => setActiveFilter(filter)}
//   />
// ============================================================================

import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import {
  colors,
  typography,
  spacing,
  layout,
  getCategoryTint,
  getCategoryPillTextColor,
} from '@/constants/theme';
import { PantryFilter, IngredientCategory } from '@/types';

interface CategoryFilterProps {
  activeFilter: PantryFilter;
  counts: Record<PantryFilter, number>;
  onFilterChange: (filter: PantryFilter) => void;
}

/**
 * The order of filter pills. 'all' is always first,
 * then categories in order of typical grocery importance.
 */
const FILTER_ORDER: PantryFilter[] = [
  'all',
  'protein',
  'produce',
  'dairy',
  'grain',
  'spice',
  'condiment',
  'frozen',
  'other',
];

/**
 * Display labels for each filter. Capitalized for the pill text.
 */
const FILTER_LABELS: Record<PantryFilter, string> = {
  all: 'All',
  protein: 'Protein',
  produce: 'Produce',
  dairy: 'Dairy',
  grain: 'Grain',
  spice: 'Spice',
  condiment: 'Condiment',
  frozen: 'Frozen',
  other: 'Other',
};

export function CategoryFilter({
  activeFilter,
  counts,
  onFilterChange,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      {FILTER_ORDER.map((filter) => {
        // Skip categories with 0 items (don't show empty pills)
        if (filter !== 'all' && (counts[filter] ?? 0) === 0) return null;

        const isActive = activeFilter === filter;
        const count = counts[filter] ?? 0;

        return (
          <Pressable
            key={filter}
            style={[
              styles.pill,
              isActive
                ? styles.pillActive
                : {
                    backgroundColor:
                      filter === 'all'
                        ? colors.neutral[100]
                        : getCategoryTint(filter),
                  },
            ]}
            onPress={() => onFilterChange(filter)}
            accessibilityLabel={`Filter by ${FILTER_LABELS[filter]}, ${count} items`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.pillText,
                isActive
                  ? styles.pillTextActive
                  : {
                      color:
                        filter === 'all'
                          ? colors.text.secondary
                          : getCategoryPillTextColor(filter),
                    },
              ]}
            >
              {FILTER_LABELS[filter]} ({count})
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0, // Don't expand vertically
  },
  scrollContent: {
    paddingHorizontal: spacing.screenHorizontal,
    gap: layout.filterPill.gap,
    paddingVertical: spacing.md,
  },
  pill: {
    paddingVertical: layout.filterPill.paddingVertical,
    paddingHorizontal: layout.filterPill.paddingHorizontal,
    borderRadius: layout.filterPill.borderRadius,
  },
  pillActive: {
    backgroundColor: colors.primary[600],
  },
  pillText: {
    fontSize: layout.filterPill.fontSize,
    fontWeight: typography.weight.medium,
  },
  pillTextActive: {
    color: colors.text.inverse,
  },
});
