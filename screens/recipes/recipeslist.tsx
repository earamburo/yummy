
// // ============================================================================
// // Recipes Screen — "(tabs)/recipes.tsx"
// // ============================================================================
// // Shows all recipe suggestions ranked by how many pantry items they use.
// // Features:
// //   1. Header with item count context ("Based on your 23 pantry items")
// //   2. Scrollable list of RecipeCard components
// //   3. Loading skeleton state while recipes are being generated
// //   4. Empty state when no recipes or no pantry items
// // ============================================================================

import { EmptyState, RecipeCard } from '@/components';
import { colors, spacing, typography } from '@/constants/theme';
import { getActivePantryItems, mockRecipes } from '@/stores/mockData';
// import { useAppStore } from '@/stores/appStore';
import { Recipe } from '@/types';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RecipesListScreen = () => {
    const router = useRouter();
    //   const recipes = useAppStore((s) => s.recipes);
    const recipes = mockRecipes;
    //   const pantry = useAppStore((s) => s.pantry);
    const pantry = getActivePantryItems();

    const activeItemCount = pantry.length;

    //   const activeItemCount = useMemo(
    //     () => pantry.filter((item) => !item.isDepleted).length,
    //     [pantry]
    //   );

    // Recipes are already ranked by pantryMatchCount in the store,
    // but we sort here as a safety net
    const sortedRecipes = useMemo(
        () =>
            [...recipes].sort((a, b) => {
                // Primary: most pantry matches first
                if (b.pantryMatchCount !== a.pantryMatchCount) {
                    return b.pantryMatchCount - a.pantryMatchCount;
                }
                // Secondary: fewest missing ingredients
                return a.missingCount - b.missingCount;
            }),
        [recipes]
    );

    const renderItem = useCallback(
        ({ item }: { item: Recipe }) => (
            <RecipeCard
                recipe={item}
                onPress={() => router.push(`/recipe/${item.id}`)}
            />
        ),
        [router]
    );

    const keyExtractor = useCallback((item: Recipe) => item.id, []);

    // ---- Empty: no pantry items at all ----
    if (activeItemCount === 0) {
        return (
            <SafeAreaView style={styles.screen} edges={['top']}>
                <View style={styles.headerContainer}>
                    <Text style={styles.screenTitle}>Recipes for you</Text>
                </View>
                <EmptyState
                    icon="restaurant-outline"
                    title="No ingredients yet"
                    subtitle="Scan a receipt first, then we'll suggest recipes based on what you bought."
                    actionTitle="Scan a receipt"
                    onAction={() => router.push('/scan/camera')}
                />
            </SafeAreaView>
        );
    }

    // ---- Empty: has ingredients but no recipes found ----
    if (sortedRecipes.length === 0) {
        return (
            <SafeAreaView style={styles.screen} edges={['top']}>
                <View style={styles.headerContainer}>
                    <Text style={styles.screenTitle}>Recipes for you</Text>
                    <Text style={styles.subtitle}>
                        Based on your {activeItemCount} pantry items
                    </Text>
                </View>
                <EmptyState
                    icon="search-outline"
                    title="No recipes found"
                    subtitle="We couldn't find recipes matching your current ingredients. Try scanning more items."
                    actionTitle="Scan more items"
                    onAction={() => router.push('/scan/camera')}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            {/* ---- Header ---- */}
            <View style={styles.headerContainer}>
                <Text style={styles.screenTitle}>Recipes for you</Text>
                <Text style={styles.subtitle}>
                    Based on your {activeItemCount} pantry items
                </Text>
            </View>

            {/* ---- Recipe List ---- */}
            <FlatList
                data={sortedRecipes}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={3}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    headerContainer: {
        paddingHorizontal: spacing.screenHorizontal,
        paddingTop: spacing.screenTop,
        paddingBottom: spacing.lg,
    },
    screenTitle: {
        fontSize: typography.scale.headingLg.fontSize,
        fontWeight: typography.weight.medium,
        color: colors.text.primary,
    },
    subtitle: {
        fontSize: typography.scale.caption.fontSize,
        color: colors.text.secondary,
        marginTop: 4,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: spacing.xxl,
    },
});
