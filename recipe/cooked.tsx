// ============================================================================
// Cooked Confirmation — "recipe/cooked.tsx"
// ============================================================================
// Satisfying confirmation screen shown after marking a recipe as cooked.
// Features:
//   1. Animated success checkmark
//   2. "Bon appetit!" celebration message
//   3. Deduction card showing exactly what was subtracted from pantry
//   4. "Back to home" navigation
//
// This screen receives the deduction data via route params from
// the Recipe Detail screen's markAsCooked action.
// ============================================================================

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CTAButton } from '@/components';
import { colors, typography, spacing, radii } from '@/constants/theme';
import { CookingLog } from '@/types';
import { formatQuantity } from '@/utils';

export default function CookedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    recipeId: string;
    deductions: string;
  }>();

  // Parse deductions from route params
  const deductions: CookingLog['ingredientsUsed'] = useMemo(() => {
    try {
      return JSON.parse(params.deductions || '[]');
    } catch {
      return [];
    }
  }, [params.deductions]);

  const handleGoHome = () => {
    // Replace the entire stack and go back to home
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* ---- Success Icon ---- */}
        <View style={styles.iconCircle}>
          <Ionicons
            name="checkmark"
            size={36}
            color={colors.primary[600]}
          />
        </View>

        {/* ---- Title ---- */}
        <Text style={styles.title}>Bon appetit!</Text>
        <Text style={styles.subtitle}>
          Your pantry has been updated. We deducted the ingredients used in
          this recipe.
        </Text>

        {/* ---- Deductions Card ---- */}
        {deductions.length > 0 && (
          <View style={styles.deductionCard}>
            <Text style={styles.cardHeader}>Pantry changes</Text>
            {deductions.map((item, index) => (
              <View key={index} style={styles.deductionRow}>
                <Text style={styles.deductionName}>{item.name}</Text>
                <Text style={styles.deductionAmount}>
                  -{formatQuantity(item.quantity, item.unit)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ---- Back Button ---- */}
        <CTAButton
          title="Back to home"
          onPress={handleGoHome}
          style={styles.backButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // ---- Success Icon ----
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },

  // ---- Text ----
  title: {
    fontSize: typography.scale.headingMd.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.scale.bodySm.fontSize,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },

  // ---- Deduction Card ----
  deductionCard: {
    width: '100%',
    marginTop: 28,
    backgroundColor: colors.background.card,
    borderRadius: radii.lg,
    borderWidth: 0.5,
    borderColor: colors.border.default,
    padding: spacing.cardPadding,
  },
  cardHeader: {
    fontSize: typography.scale.caption.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  deductionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  deductionName: {
    fontSize: typography.scale.bodySm.fontSize,
    color: colors.text.primary,
  },
  deductionAmount: {
    fontSize: typography.scale.bodySm.fontSize,
    color: colors.coral[400],
  },

  // ---- Button ----
  backButton: {
    width: '100%',
    marginTop: spacing.xxl,
  },
});
