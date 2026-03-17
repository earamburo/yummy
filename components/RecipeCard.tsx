// ============================================================================
// RecipeCard — Recipe suggestion card for the Home and Recipes screens
// ============================================================================
// Displays a recipe with its image, title, cook time, servings,
// difficulty, and how many pantry items it uses.
//
// Usage:
//   <RecipeCard
//     recipe={recipe}
//     onPress={() => router.push(`/recipe/${recipe.id}`)}
//   />
// ============================================================================

import { colors, layout, radii, spacing, typography } from '@/constants/theme';
import { Difficulty, Recipe } from '@/types';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

/**
 * Returns the color for the difficulty label.
 * Easy = teal (encouraging), Medium = amber (caution), Hard = coral (challenge).
 */
function getDifficultyColor(difficulty: Difficulty) {
  switch (difficulty) {
    case 'easy':
      return colors.primary[600];
    case 'medium':
      return colors.amber[400];
    case 'hard':
      return colors.coral[400];
  }
}

/**
 * Capitalizes the first letter of difficulty for display.
 */
function formatDifficulty(difficulty: Difficulty): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityLabel={`${recipe.title}, ${recipe.cookTimeMin} minutes, uses ${recipe.pantryMatchCount} of your items`}
      accessibilityRole="button"
    >
      {/* Image area — gradient placeholder until we have real images */}
      <View style={styles.imageArea}>
        {recipe.imageUrl ? (
          <ImageBackground
            source={{ uri: recipe.imageUrl }}
            style={styles.image}
            imageStyle={styles.imageInner}
          >
            <PantryBadge count={recipe.pantryMatchCount} />
          </ImageBackground>
        ) : (
          // Gradient placeholder — different hue per recipe for variety
          <View
            style={[
              styles.image,
              styles.placeholderImage,
              {
                backgroundColor: getPlaceholderColor(recipe.id),
              },
            ]}
          >
            <PantryBadge count={recipe.pantryMatchCount} />
          </View>
        )}
      </View>

      {/* Card body — title and meta info */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{recipe.cookTimeMin} min</Text>
          <Text style={styles.metaDot}>{'\u00B7'}</Text>
          <Text style={styles.metaText}>{recipe.servings} servings</Text>
          <Text style={styles.metaDot}>{'\u00B7'}</Text>
          <Text
            style={[
              styles.metaText,
              { color: getDifficultyColor(recipe.difficulty) },
            ]}
          >
            {formatDifficulty(recipe.difficulty)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// PantryBadge — Shows "Uses X of your items" on the card image
// ---------------------------------------------------------------------------

function PantryBadge({ count }: { count: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        Uses {count} of your items
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Placeholder colors — deterministic per recipe ID so they're consistent
// ---------------------------------------------------------------------------

function getPlaceholderColor(id: string): string {
  const placeholderColors = [
    '#C1946A', '#A67C52', '#D4A574', '#8B6544',
    '#B08D6E', '#967254', '#C4A882', '#7A5C3E',
  ];
  // Simple hash from the ID to pick a color
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return placeholderColors[Math.abs(hash) % placeholderColors.length];
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.lg,
    borderRadius: layout.recipeCard.borderRadius,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border.default,
    backgroundColor: colors.background.card,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  imageArea: {
    height: layout.recipeCard.imageHeight,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  imageInner: {
    // Ensure image covers the area without distortion
    resizeMode: 'cover',
  },
  placeholderImage: {
    // Warm earthy tone placeholder for food context
    opacity: 0.85,
  },
  body: {
    padding: layout.recipeCard.bodyPadding,
    paddingHorizontal: spacing.cardPadding,
  },
  title: {
    fontSize: typography.scale.headingSm.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
    lineHeight: typography.scale.headingSm.lineHeight,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: typography.scale.label.fontSize,
    color: colors.text.secondary,
  },
  metaDot: {
    fontSize: typography.scale.label.fontSize,
    color: colors.text.tertiary,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  badgeText: {
    fontSize: typography.scale.micro.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
  },
});
