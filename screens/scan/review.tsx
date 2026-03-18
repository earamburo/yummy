// ============================================================================
// Review Screen — "scan/review.tsx"
// ============================================================================
// The trust-building screen where users verify OCR results.
// Features:
//   1. Grouped ingredient list by category (Protein, Produce, etc.)
//   2. Tap to edit any ingredient (name, quantity, category)
//   3. Swipe-to-delete for unwanted items
//   4. "Add all to pantry" saves everything and navigates
//   5. Item count in header for confidence
//
// This screen receives parsed ingredients from the Processing screen
// via route params. Users can modify them before committing to the pantry.
// ============================================================================

import {
  CategoryHeader,
  CTAButton,
  IngredientRow,
} from '@/components';
import { colors, spacing, typography } from '@/constants/theme';
// import { useAppStore } from '@/stores/appStore';
import { IngredientCategory, ParsedIngredient } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ---- Category display order ----
const CATEGORY_ORDER: IngredientCategory[] = [
  'protein', 'produce', 'dairy', 'grain', 'spice', 'condiment', 'frozen', 'other',
];

const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  protein: 'Protein',
  produce: 'Produce',
  dairy: 'Dairy',
  grain: 'Grain',
  spice: 'Spice',
  condiment: 'Condiment',
  frozen: 'Frozen',
  other: 'Other',
};

export const ReviewScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ ingredients: string }>();
  // const addIngredients = useAppStore((s: any) => s.addIngredients);

  // Parse ingredients from route params
  const initialIngredients: ParsedIngredient[] = useMemo(() => {
    try {
      return JSON.parse(params.ingredients || '[]');
    } catch {
      return [];
    }
  }, [params.ingredients]);

  // Local state for editable ingredient list
  const [ingredients, setIngredients] = useState(initialIngredients);

  // ---- Group ingredients by category for SectionList ----
  const sections = useMemo(() => {
    const grouped = new Map<IngredientCategory, ParsedIngredient[]>();

    for (const item of ingredients) {
      if (!item.isValid) continue;
      const existing = grouped.get(item.category) || [];
      existing.push(item);
      grouped.set(item.category, existing);
    }

    // Convert to SectionList format, respecting display order
    return CATEGORY_ORDER
      .filter((cat) => grouped.has(cat))
      .map((cat) => ({
        title: CATEGORY_LABELS[cat],
        data: grouped.get(cat)!,
      }));
  }, [ingredients]);

  // ---- Delete an ingredient ----
  const handleDelete = useCallback((id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // ---- Save all to pantry ----
  const handleSaveAll = () => {
    // addIngredients(ingredients);
    // Navigate to pantry (replacing the scan flow stack)
    router.replace('/(tabs)/pantry');
  };

  // ---- Navigate back ----
  const handleBack = () => {
    router.back();
  };

  const validCount = ingredients.filter((i) => i.isValid).length;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* ---- Navigation Header ---- */}
      <View style={styles.navHeader}>
        <Pressable onPress={handleBack} hitSlop={12}>
          <Ionicons name="arrow-back" size={20} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.navTitle}>Review items</Text>
        <Pressable onPress={handleSaveAll} hitSlop={12}>
          <Text style={styles.navAction}>Done</Text>
        </Pressable>
      </View>

      {/* ---- Subtitle ---- */}
      <Text style={styles.subtitle}>
        We found {validCount} items. Tap to edit any item.
      </Text>

      {/* ---- Ingredient List ---- */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <CategoryHeader title={section.title} />
        )}
        renderItem={({ item }) => (
          <IngredientRow
            variant="review"
            name={item.name}
            category={item.category}
            quantity={item.quantity}
            unit={item.unit}
            onPress={() => {
              // TODO: Open edit bottom sheet
              console.log('Edit ingredient:', item.name);
            }}
            onLongPress={() => handleDelete(item.id)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          <View style={styles.footer}>
            <CTAButton
              title={`Add all to pantry (${validCount})`}
              onPress={handleSaveAll}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  navTitle: {
    fontSize: typography.scale.bodyLg.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
  },
  navAction: {
    fontSize: typography.scale.bodySm.fontSize,
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
  },
  subtitle: {
    fontSize: typography.scale.caption.fontSize,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  footer: {
    padding: spacing.screenHorizontal,
    paddingTop: spacing.lg,
  },
});
