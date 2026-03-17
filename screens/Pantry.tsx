import React from 'react'

export const PantryScreen = () => {
  return (
    <div>Pantry</div>
  )
}

// // ============================================================================
// // Pantry Screen — "(tabs)/pantry.tsx"
// // ============================================================================
// // Shows all ingredients the user currently has on hand. Features:
// //   1. Category filter pills (All, Protein, Produce, Dairy, etc.)
// //   2. Ingredient list sorted by expiry (soonest first)
// //   3. Expiry warnings (coral tint for items expiring within 3 days)
// //   4. Empty state when pantry is empty
// //
// // The list is reactive — it updates automatically when ingredients
// // are added (via receipt scan) or removed (via cooking).
// // ============================================================================

// // import {
// //   CategoryFilter,
// //   EmptyState,
// //   IngredientRow,
// // } from '@/components';
// import { colors, spacing, typography } from '@/constants/theme';
// import { useAppStore } from '@/stores/appStore';
// import { Ingredient, PantryFilter } from '@/types';
// import { daysUntilExpiry } from '@/utils';
// import { useRouter } from 'expo-router';
// import React, { useCallback, useMemo, useState } from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function PantryScreen() {
//   const router = useRouter();
//   const pantry = useAppStore((s) => s.pantry);
//   const [activeFilter, setActiveFilter] = useState<PantryFilter>('all');

//   // ---- Compute active (non-depleted) items ----
//   const activeItems = useMemo(
//     () => pantry.filter((item) => !item.isDepleted),
//     [pantry]
//   );

//   // ---- Count items per category for the filter pills ----
//   const categoryCounts = useMemo(() => {
//     const counts: Record<PantryFilter, number> = {
//       all: activeItems.length,
//       protein: 0,
//       produce: 0,
//       dairy: 0,
//       grain: 0,
//       spice: 0,
//       condiment: 0,
//       frozen: 0,
//       other: 0,
//     };
//     for (const item of activeItems) {
//       counts[item.category] = (counts[item.category] || 0) + 1;
//     }
//     return counts;
//   }, [activeItems]);

//   // ---- Filter and sort the list ----
//   // Filter: show all or just the selected category
//   // Sort: expiring soonest first, then alphabetical
//   const filteredItems = useMemo(() => {
//     let items = activeItems;

//     if (activeFilter !== 'all') {
//       items = items.filter((item) => item.category === activeFilter);
//     }

//     return items.sort((a, b) => {
//       const aDays = daysUntilExpiry(a.estimatedExpiry);
//       const bDays = daysUntilExpiry(b.estimatedExpiry);
//       if (aDays !== bDays) return aDays - bDays; // Soonest first
//       return a.name.localeCompare(b.name);        // Then alphabetical
//     });
//   }, [activeItems, activeFilter]);

//   // ---- Render each ingredient row ----
//   const renderItem = useCallback(
//     ({ item }: { item: Ingredient }) => (
//       <IngredientRow
//         variant="pantry"
//         name={item.name}
//         category={item.category}
//         quantity={item.quantity}
//         unit={item.unit}
//         expiryDate={item.estimatedExpiry}
//         onPress={() => {
//           // TODO: Open ingredient detail/edit sheet
//           console.log('Tapped ingredient:', item.name);
//         }}
//       />
//     ),
//     []
//   );

//   // ---- Key extractor for FlatList ----
//   const keyExtractor = useCallback((item: Ingredient) => item.id, []);

//   // ---- Empty state ----
//   if (activeItems.length === 0) {
//     return (
//       <SafeAreaView style={styles.screen} edges={['top']}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.screenTitle}>Your pantry</Text>
//         </View>
//         <EmptyState
//           icon="basket-outline"
//           title="Your pantry is empty"
//           subtitle="Scan a receipt to add groceries and start getting recipe suggestions."
//           actionTitle="Scan a receipt"
//           onAction={() => router.push('/scan/camera')}
//         />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.screen} edges={['top']}>
//       {/* ---- Screen Header ---- */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.screenTitle}>Your pantry</Text>
//       </View>

//       {/* ---- Category Filter Pills ---- */}
//       <CategoryFilter
//         activeFilter={activeFilter}
//         counts={categoryCounts}
//         onFilterChange={setActiveFilter}
//       />

//       {/* ---- Ingredient List ---- */}
//       <FlatList
//         data={filteredItems}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         style={styles.list}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         // Performance optimizations
//         initialNumToRender={15}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         // Pull to refresh could be added here for cloud sync in Phase 2
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: colors.background.primary,
//   },
//   headerContainer: {
//     paddingHorizontal: spacing.screenHorizontal,
//     paddingTop: spacing.screenTop,
//   },
//   screenTitle: {
//     fontSize: typography.scale.headingLg.fontSize,
//     fontWeight: typography.weight.medium,
//     color: colors.text.primary,
//   },
//   list: {
//     flex: 1,
//     borderTopWidth: 0.5,
//     borderTopColor: colors.border.light,
//   },
//   listContent: {
//     paddingBottom: spacing.xxl,
//   },
// });
