// ============================================================================
// ScanCTA — Prominent scan button on the Home screen
// ============================================================================
// The primary action card that drives the core product loop.
// Tapping it navigates to the Camera screen.
//
// Design notes:
//   - Full-width teal card with a circular icon and two lines of text
//   - Scale animation on press (0.98) for tactile feedback
//   - Accessibility: described as a button that opens the camera
//
// Usage:
//   <ScanCTA onPress={() => router.push('/scan/camera')} />
// ============================================================================

import { colors, radii, spacing, typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ScanCTAProps {
  onPress: () => void;
}

export function ScanCTA({ onPress }: ScanCTAProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityLabel="Scan a receipt to add groceries to your pantry"
      accessibilityRole="button"
    >
      {/* Icon circle */}
      <View style={styles.iconCircle}>
        <Ionicons name="camera-outline" size={24} color={colors.text.inverse} />
      </View>

      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Scan a receipt</Text>
        <Text style={styles.subtitle}>Add groceries to your pantry</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[600],
    borderRadius: radii.xl,
    padding: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginHorizontal: spacing.screenHorizontal,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.scale.headingSm.fontSize,
    fontWeight: typography.weight.medium,
    color: colors.text.inverse,
  },
  subtitle: {
    fontSize: typography.scale.caption.fontSize,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
});
