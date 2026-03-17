// ============================================================================
// Tab Layout — Bottom Tab Navigation
// ============================================================================
// Defines the four tabs shown at the bottom of the main screens.
// The "Scan" tab is special — instead of switching to a tab screen,
// it pushes the Camera screen as a modal (outside the tab navigator).
//
// Tab bar styling matches the design spec:
//   - 84px height (including safe area)
//   - 0.5px top border
//   - Teal active color, gray inactive
//   - 22px icons with 10px labels
// ============================================================================

import { colors, spacing, typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        // Hide the default header — we build our own
        headerShown: false,

        // Tab bar styling from the design spec
        tabBarStyle: {
          height: spacing.tabBarHeight,
          borderTopWidth: 0.5,
          borderTopColor: colors.border.default,
          backgroundColor: colors.background.primary,
          paddingTop: 10,
          // Remove the default shadow on Android
          elevation: 0,
        },
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: typography.scale.tabLabel.fontSize,
          fontWeight: typography.weight.regular,
        },
        // Haptic feedback on tab press (iOS only)
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* ---- HOME TAB ---- */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      {/* ---- SCAN TAB (special behavior) ---- */}
      {/* 
        The Scan tab doesn't navigate to a tab screen.
        Instead, it intercepts the press and pushes the Camera
        screen as a full-screen modal. This keeps the camera
        outside the tab navigator (no tab bar visible).
      */}
      <Tabs.Screen
        name="scan-placeholder"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" size={22} color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                // Push camera screen outside the tab navigator
                router.push('/scan/camera');
              }}
            />
          ),
        }}
      />

      {/* ---- PANTRY TAB ---- */}
      <Tabs.Screen
        name="pantry"
        options={{
          title: 'Pantry',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={22} color={color} />
          ),
        }}
      />

      {/* ---- RECIPES TAB ---- */}
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
