// ============================================================================
// Processing Screen — "scan/processing.tsx"
// ============================================================================
// Shown while OCR and ingredient parsing run on the captured receipt image.
// Features:
//   1. Animated spinner
//   2. Progress bar with stage labels
//   3. "Skip to results" escape hatch
//   4. Auto-advance to Review when processing completes
//
// In production, this screen triggers:
//   1. Google ML Kit TextRecognizer on the captured image
//   2. Ingredient parser pipeline (regex → dictionary → LLM fallback)
//   3. Navigation to Review screen with parsed ingredients
//
// For development, we simulate the processing with a timer.
// ============================================================================

import { CTAButton } from '@/components';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { ParsedIngredient } from '@/types';
import { generateId } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

// ---- Processing stage labels ----
const STAGES = [
  'Detecting text blocks...',
  'Parsing line items...',
  'Matching ingredients...',
  'Almost done...',
];

// ---- Mock parsed ingredients for development ----
// In production, these come from the OCR + parser pipeline.
const MOCK_INGREDIENTS: ParsedIngredient[] = [
  { id: generateId(), rawText: 'BNLS CHKN BRST 2.34LB', name: 'Chicken breast, boneless', category: 'protein', quantity: 2.3, unit: 'lb', price: 9.32, isValid: true },
  { id: generateId(), rawText: 'GRD BEEF 80/20', name: 'Ground beef 80/20', category: 'protein', quantity: 1.5, unit: 'lb', price: 7.49, isValid: true },
  { id: generateId(), rawText: 'ATL SALMON FILT', name: 'Atlantic salmon fillet', category: 'protein', quantity: 1.2, unit: 'lb', price: 11.99, isValid: true },
  { id: generateId(), rawText: 'YLW ONIONS 3CT', name: 'Yellow onions', category: 'produce', quantity: 3, unit: 'ct', price: 2.49, isValid: true },
  { id: generateId(), rawText: 'ROMA TOMATOES', name: 'Roma tomatoes', category: 'produce', quantity: 6, unit: 'ct', price: 3.99, isValid: true },
  { id: generateId(), rawText: 'GARLIC FRESH', name: 'Fresh garlic', category: 'produce', quantity: 1, unit: 'bulb', price: 0.79, isValid: true },
  { id: generateId(), rawText: 'BROCCOLI CRWN', name: 'Broccoli crowns', category: 'produce', quantity: 1, unit: 'bunch', price: 2.49, isValid: true },
  { id: generateId(), rawText: 'LEMONS 4CT', name: 'Lemons', category: 'produce', quantity: 4, unit: 'ct', price: 1.99, isValid: true },
  { id: generateId(), rawText: 'HVY WHPNG CREAM', name: 'Heavy whipping cream', category: 'dairy', quantity: 16, unit: 'oz', price: 4.29, isValid: true },
  { id: generateId(), rawText: 'BUTTER UNSLT', name: 'Butter, unsalted', category: 'dairy', quantity: 1, unit: 'lb', price: 5.49, isValid: true },
  { id: generateId(), rawText: 'JASMINE RICE 2LB', name: 'Jasmine rice', category: 'grain', quantity: 2, unit: 'lb', price: 3.99, isValid: true },
  { id: generateId(), rawText: 'OLIVE OIL XVR', name: 'Extra virgin olive oil', category: 'condiment', quantity: 1, unit: 'bottle', price: 8.99, isValid: true },
];

export const ProcessingScreen = () => {
  const navigation = useNavigation();

  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const spinAnim = useRef(new Animated.Value(0)).current;

  // ---- Spinner animation ----
  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();
    return () => spin.stop();
  }, [spinAnim]);

  const spinInterpolation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // ---- Simulated processing progress ----
  // In production, replace this with actual ML Kit processing.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        // Update stage label based on progress
        setStageIndex(Math.min(Math.floor(next / 25), STAGES.length - 1));

        if (next >= 100) {
          clearInterval(interval);
          // Auto-navigate to Review after a brief pause
          setTimeout(() => {
            navigateToReview();
          }, 300);
        }
        return Math.min(next, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // ---- Navigate to Review screen ----
  const navigateToReview = () => {
    // In production, pass the actual parsed ingredients from the OCR pipeline.
    // We use JSON.stringify because Expo Router params are strings.
    // router.replace({
    //   pathname: '/scan/review',
    //   params: { ingredients: JSON.stringify(MOCK_INGREDIENTS) },
    // });
    navigation.navigate('Scan', { screen: 'Review' })
  };

  return (
    <View style={styles.container}>
      {/* ---- Spinner ---- */}
      <Animated.View
        style={[
          styles.spinner,
          { transform: [{ rotate: spinInterpolation }] },
        ]}
      />

      {/* ---- Title ---- */}
      <Text style={styles.title}>Reading your receipt</Text>
      <Text style={styles.description}>
        Extracting ingredients and matching them to our database...
      </Text>

      {/* ---- Progress Bar ---- */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(progress, 100)}%` },
          ]}
        />
      </View>

      {/* ---- Stage Label ---- */}
      <Text style={styles.stageText}>{STAGES[stageIndex]}</Text>

      {/* ---- Skip Button ---- */}
      <CTAButton
        title="Skip to results"
        onPress={navigateToReview}
        style={styles.skipButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  spinner: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    borderWidth: 3,
    borderColor: colors.border.light,
    borderTopColor: colors.primary[600],
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.scale.bodySm.fontSize,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  progressTrack: {
    width: 200,
    height: 4,
    backgroundColor: colors.border.light,
    borderRadius: radii.xs,
    overflow: 'hidden',
    marginTop: spacing.xxl,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: radii.xs,
  },
  stageText: {
    fontSize: typography.scale.label.fontSize,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  skipButton: {
    marginTop: 40,
    paddingHorizontal: 40,
  },
});
