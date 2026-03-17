// ============================================================================
// Root Layout — App Entry Point
// ============================================================================
// This is the top-level layout for Expo Router. It:
//   1. Sets the global status bar style
//   2. Wraps the app in SafeAreaProvider
//   3. Defines the navigation stack structure
//
// FILE-BASED ROUTING EXPLAINED (for junior engineers):
// Expo Router uses the file system as the router. The folder structure
// inside /app directly maps to URL paths:
//
//   app/
//   ├── _layout.tsx          ← THIS FILE (root layout, wraps everything)
//   ├── (tabs)/
//   │   ├── _layout.tsx      ← Tab bar layout (Home, Pantry, Recipes)
//   │   ├── index.tsx        ← Home screen (default tab)
//   │   ├── pantry.tsx       ← Pantry screen
//   │   └── recipes.tsx      ← Recipes screen
//   ├── scan/
//   │   ├── camera.tsx       ← Camera screen (outside tabs — no tab bar)
//   │   ├── processing.tsx   ← OCR processing screen
//   │   └── review.tsx       ← Review ingredients screen
//   └── recipe/
//       ├── [id].tsx         ← Recipe detail (dynamic route)
//       └── cooked.tsx       ← Cooked confirmation screen
//
// Screens inside (tabs)/ show the tab bar.
// Screens outside (tabs)/ are full-screen (no tab bar).
// ============================================================================

import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Light status bar text on dark screens (camera), dark on others */}
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          // Global defaults for all screens in the stack
          headerShown: false, // We build our own headers
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
          animation: 'slide_from_right', // iOS-style push animation
        }}
      >
        {/* Tab screens — show tab bar */}
        <Stack.Screen name="(tabs)" />

        {/* Scan flow — full screen, no tab bar */}
        <Stack.Screen
          name="scan/camera"
          options={{
            animation: 'slide_from_bottom', // Camera slides up like a modal
            contentStyle: { backgroundColor: '#1A1A18' },
          }}
        />
        <Stack.Screen name="scan/processing" />
        <Stack.Screen name="scan/review" />

        {/* Recipe flow — full screen, no tab bar */}
        <Stack.Screen
          name="recipe/[id]"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="recipe/cooked"
          options={{
            animation: 'fade', // Gentle fade for the success screen
            gestureEnabled: false, // Prevent swipe back (they should tap the button)
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
