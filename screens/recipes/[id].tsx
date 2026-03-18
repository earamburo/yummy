// ============================================================================
// Recipe Detail Screen — "recipe/[id].tsx"
// ============================================================================
// Full recipe view with:
//   1. Hero image with title overlay
//   2. Ingredient list cross-referenced with pantry (green/amber dots)
//   3. Step-by-step cooking instructions
//   4. "I cooked this" button that triggers pantry deduction
//
// This is a dynamic route — [id] is the recipe ID from the URL.
// Example: /recipe/abc123 → useLocalSearchParams returns { id: 'abc123' }
// ============================================================================

import { CTAButton } from '@/components';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { useAppStore } from '@/stores/appStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const RecipeDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const recipes = useAppStore((s) => s.recipes);
  const markAsCooked = useAppStore((s) => s.markAsCooked);

  const recipe = useMemo(
    () => recipes.find((r) => r.id === id),
    [recipes, id]
  );

  // ---- Handle "I cooked this" ----
  const handleCooked = () => {
    if (!recipe) return;
    const deductions = markAsCooked(recipe.id, recipe.servings);
    router.push({
      pathname: '/recipe/cooked',
      params: {
        recipeId: recipe.id,
        deductions: JSON.stringify(deductions),
      },
    });
  };

  if (!recipe) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Recipe not found</Text>
        <CTAButton title="Go back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* ---- Hero Image ---- */}
        <View style={styles.hero}>
          {/* Back button */}
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
          </Pressable>

          {/* Favorite button */}
          <Pressable
            style={styles.favoriteButton}
            onPress={() => useAppStore.getState().toggleFavorite(recipe.id)}
            hitSlop={12}
          >
            <Ionicons
              name={recipe.isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color="#FFFFFF"
            />
          </Pressable>

          {/* Title and info pills on hero */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{recipe.title}</Text>
            <View style={styles.pillRow}>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>{recipe.cookTimeMin} min</Text>
              </View>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>{recipe.servings} servings</Text>
              </View>
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>
                  {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ---- Ingredients Section ---- */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>INGREDIENTS</Text>
          {recipe.ingredients.map((ing, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View
                style={[
                  styles.ingredientDot,
                  {
                    backgroundColor: ing.inPantry
                      ? colors.primary[600]
                      : colors.amber[400],
                  },
                ]}
              />
              <Text style={styles.ingredientName}>
                {ing.name}
                {ing.quantity > 0 ? ` (${ing.quantity} ${ing.unit})` : ''}
              </Text>
              <Text
                style={[
                  styles.ingredientStatus,
                  {
                    color: ing.inPantry
                      ? colors.primary[600]
                      : colors.amber[400],
                  },
                ]}
              >
                {ing.inPantry ? 'In pantry' : 'Not in pantry'}
              </Text>
            </View>
          ))}
        </View>

        {/* ---- Steps Section ---- */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionLabel}>STEPS</Text>
          {recipe.steps.map((step) => (
            <View key={step.number} style={styles.step}>
              <Text style={styles.stepNumber}>Step {step.number}</Text>
              <Text style={styles.stepText}>{step.instruction}</Text>
              {step.timerMinutes && (
                <View style={styles.timerBadge}>
                  <Ionicons
                    name="timer-outline"
                    size={14}
                    color={colors.primary[600]}
                  />
                  <Text style={styles.timerText}>
                    {step.timerMinutes} min
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ---- Cook Button ---- */}
        <View style={styles.cookButtonContainer}>
          <CTAButton title="I cooked this" onPress={handleCooked} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: colors.background.primary,
  },
  notFoundText: {
    fontSize: typography.scale.headingLg.fontSize,
    color: colors.text.secondary,
    marginBottom: spacing.xxl,
  },

  // ---- Hero ----
  hero: {
    height: 260,
    backgroundColor: '#8B6544',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 52,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  heroContent: {
    padding: spacing.screenHorizontal,
    paddingBottom: 20,
  },
  heroTitle: {
    fontSize: typography.scale.headingMd.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.inverse,
    lineHeight: 28,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  infoPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  infoPillText: {
    fontSize: typography.scale.micro.fontSize,
    color: colors.text.inverse,
    fontWeight: typography.weight.medium,
  },

  // ---- Ingredients ----
  section: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionLabel: {
    fontSize: typography.scale.bodySm.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
  },
  ingredientName: {
    flex: 1,
    fontSize: typography.scale.bodyMd.fontSize,
    color: colors.text.primary,
  },
  ingredientStatus: {
    fontSize: typography.scale.caption.fontSize,
  },

  // ---- Steps ----
  stepsSection: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: colors.border.light,
  },
  step: {
    paddingVertical: spacing.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  stepNumber: {
    fontSize: typography.scale.label.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.primary[600],
    marginBottom: 6,
  },
  stepText: {
    fontSize: typography.scale.bodyMd.fontSize,
    color: colors.text.primary,
    lineHeight: 22,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: colors.primary[50],
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  timerText: {
    fontSize: typography.scale.label.fontSize,
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
  },

  // ---- Cook Button ----
  cookButtonContainer: {
    padding: spacing.screenHorizontal,
    paddingTop: spacing.lg,
    paddingBottom: 40,
  },
});
