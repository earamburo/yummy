import { colors, spacing, typography } from '@/constants/theme';
import { mockIngredients, mockRecipes } from '@/stores/mockData';
import { daysUntilExpiry } from '@/util';
import { linkTo } from 'expo-router/build/global-state/routing';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetricCard, RecipeCard, ScanCTA, SectionHeader } from '../components';

export const HomeScreen = () => {

    const pantry = mockIngredients;
    const recipes = mockRecipes;

    // Computed values (memoized so they only recalculate when pantry changes)
    const activeItems = useMemo(
        () => pantry.filter((item) => !item.isDepleted),
        [pantry]
    );

    const expiringCount = useMemo(
        () =>
            activeItems.filter(
                (item) => daysUntilExpiry(item.estimatedExpiry) <= 3
            ).length,
        [activeItems]
    );


    const topRecipes = useMemo(() => recipes.slice(0, 3), [recipes]);

    const Greeting = ({ greeting, meal }: any) => {
        return (
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingSubtitle}>{greeting}</Text>
                <Text style={styles.greetingTitle}>What's for {meal}?</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary }} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <>
                    <Greeting greeting='Good Evening!' meal='dinner' />
                    <ScanCTA onPress={() => linkTo('/scan/camera')} />
                    <View style={styles.metricsRow}>
                        <MetricCard
                            // value={activeItems.length}
                            value={23}
                            label="Items in pantry"
                            color={colors.primary[600]}
                        // onPress={() => router.push('/(tabs)/pantry')}
                        />
                        <MetricCard
                            // value={expiringCount}
                            value={3}
                            label="Expiring soon"
                            color={expiringCount > 0 ? colors.coral[400] : colors.text.secondary}
                        // onPress={() => router.push('/(tabs)/pantry')}
                        />
                    </View>
                    {topRecipes.length > 0 ? (
                        <>
                            <SectionHeader
                                title="Suggested recipes"
                                actionText="See all"
                                onAction={() => {}}
                            />
                            {topRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onPress={() => { }}
                                />
                            ))}
                        </>
                    ) : activeItems.length > 0 ? (
                        // Has ingredients but no recipes generated yet
                        <View style={styles.noRecipesContainer}>
                            <Text style={styles.noRecipesText}>
                                Generating recipe ideas from your {activeItems.length} pantry items...
                            </Text>
                        </View>
                    ) : null}
                    {/* Bottom padding for scroll */}
                    < View style={{ height: spacing.xxl }} />
                </>
            </ScrollView>

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: spacing.screenTop,
    },
    greetingContainer: {
        paddingHorizontal: spacing.screenHorizontal,
        paddingBottom: spacing.xl,
    },
    greetingSubtitle: {
        fontSize: typography.scale.bodySm.fontSize,
        color: colors.text.secondary,
    },
    greetingTitle: {
        fontSize: typography.scale.displayLg.fontSize,
        fontWeight: typography.weight.medium,
        color: colors.text.primary,
        marginTop: 4,
        letterSpacing: typography.scale.displayLg.letterSpacing,
    },
    metricsRow: {
        flexDirection: 'row',
        gap: spacing.cardGap,
        paddingHorizontal: spacing.screenHorizontal,
        marginTop: spacing.xl,
        marginBottom: spacing.xxl,
    },
    noRecipesContainer: {
        paddingHorizontal: spacing.screenHorizontal,
        paddingVertical: spacing.xxxl,
        alignItems: 'center',
    },
    noRecipesText: {
        fontSize: typography.scale.bodySm.fontSize,
        color: colors.text.secondary,
        textAlign: 'center',
    },
});

