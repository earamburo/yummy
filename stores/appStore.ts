// ============================================================================
// Receipt Chef — Global State Store (Zustand)
// ============================================================================
// Single store for all app state. Zustand was chosen over Redux because:
//   1. Zero boilerplate — no actions, reducers, or dispatch
//   2. Works seamlessly with React Native
//   3. Built-in subscriptions (no need for selectors/connect)
//
// HOW TO USE:
//   import { useAppStore } from '@/stores/appStore';
//   const pantry = useAppStore((state) => state.pantry);
//   const addIngredients = useAppStore((state) => state.addIngredients);
//
// IMPORTANT: Always select specific slices, not the entire store.
// This prevents unnecessary re-renders.
//   ✅ const pantry = useAppStore((s) => s.pantry);
//   ❌ const store = useAppStore();  // re-renders on ANY state change
// ============================================================================

import {
    CookingLog,
    Ingredient,
    IngredientCategory,
    ParsedIngredient,
    Recipe,
} from '@/types';
import {
    generateId,
    getDefaultExpiryDays,
    stringSimilarity,
} from '@/utils';
import { create } from 'zustand';

// ---------------------------------------------------------------------------
// Store Shape
// ---------------------------------------------------------------------------

interface AppState {
  // --- Data ---
  pantry: Ingredient[];
  recipes: Recipe[];
  cookingLog: CookingLog[];
  groceryList: { name: string; category: IngredientCategory }[];

  // --- UI State ---
  isProcessing: boolean;
  processingProgress: number; // 0–100

  // --- Actions ---
  addIngredients: (items: ParsedIngredient[]) => void;
  removeIngredient: (id: string) => void;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  setRecipes: (recipes: Recipe[]) => void;
  markAsCooked: (recipeId: string, servings: number) => CookingLog['ingredientsUsed'];
  toggleFavorite: (recipeId: string) => void;
  setProcessing: (isProcessing: boolean) => void;
  setProcessingProgress: (progress: number) => void;
  clearGroceryList: () => void;
  removeFromGroceryList: (name: string) => void;
}

// ---------------------------------------------------------------------------
// Store Implementation
// ---------------------------------------------------------------------------

export const useAppStore = create<AppState>((set, get) => ({
  // --- Initial Data ---
  pantry: [],
  recipes: [],
  cookingLog: [],
  groceryList: [],

  // --- Initial UI State ---
  isProcessing: false,
  processingProgress: 0,

  // ---------------------------------------------------------------------------
  // addIngredients
  // ---------------------------------------------------------------------------
  // Called when the user confirms the Review screen after scanning a receipt.
  // Takes parsed ingredients and merges them into the pantry.
  //
  // MERGE LOGIC:
  // For each new ingredient, we check if a similar item already exists
  // in the pantry using fuzzy string matching (threshold: 0.85).
  // - If a match is found: ADD to the existing quantity
  // - If no match: CREATE a new ingredient entry
  //
  // This prevents duplicates like "Chicken breast" and "Chicken Breast"
  // from showing up as separate items.
  // ---------------------------------------------------------------------------
  addIngredients: (items: ParsedIngredient[]) => {
    set((state) => {
      const updatedPantry = [...state.pantry];

      for (const item of items) {
        // Skip invalid items (parser couldn't confidently identify)
        if (!item.isValid) continue;

        // Look for an existing ingredient with a similar name
        const existingIndex = updatedPantry.findIndex(
          (existing) =>
            !existing.isDepleted &&
            stringSimilarity(existing.name, item.name) >= 0.85
        );

        if (existingIndex >= 0) {
          // MERGE: Add quantity to existing ingredient
          updatedPantry[existingIndex] = {
            ...updatedPantry[existingIndex],
            quantity: updatedPantry[existingIndex].quantity + item.quantity,
            // Update the purchase date to the most recent scan
            purchaseDate: new Date().toISOString(),
          };
        } else {
          // CREATE: New ingredient entry
          const now = new Date();
          const expiryDays = getDefaultExpiryDays(item.category);
          const expiryDate = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);

          updatedPantry.push({
            id: generateId(),
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            purchaseDate: now.toISOString(),
            estimatedExpiry: expiryDate.toISOString(),
            receiptId: generateId(), // In production, link to actual receipt
            isDepleted: false,
          });
        }
      }

      return { pantry: updatedPantry };
    });
  },

  // ---------------------------------------------------------------------------
  // removeIngredient
  // ---------------------------------------------------------------------------
  // Hard delete from pantry. Used when user swipes to delete on Review screen.
  // ---------------------------------------------------------------------------
  removeIngredient: (id: string) => {
    set((state) => ({
      pantry: state.pantry.filter((item) => item.id !== id),
    }));
  },

  // ---------------------------------------------------------------------------
  // updateIngredient
  // ---------------------------------------------------------------------------
  // Partial update for editing ingredient details (name, qty, category, etc.)
  // Used on the Review screen's edit sheet and Pantry detail view.
  // ---------------------------------------------------------------------------
  updateIngredient: (id: string, updates: Partial<Ingredient>) => {
    set((state) => ({
      pantry: state.pantry.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  // ---------------------------------------------------------------------------
  // setRecipes
  // ---------------------------------------------------------------------------
  // Replaces the current recipe list. Called after fetching from
  // Spoonacular or generating via Claude API.
  // ---------------------------------------------------------------------------
  setRecipes: (recipes: Recipe[]) => {
    set({ recipes });
  },

  // ---------------------------------------------------------------------------
  // markAsCooked
  // ---------------------------------------------------------------------------
  // The core feedback loop. When a user marks a recipe as cooked:
  //   1. Find the recipe and calculate ingredient deductions
  //   2. Subtract quantities from the pantry
  //   3. If any ingredient hits 0, mark it as depleted and add to grocery list
  //   4. Log the cooking event
  //   5. Return the deductions for the confirmation screen
  //
  // IMPORTANT: The servings parameter lets users cook half a recipe.
  // Deductions are scaled proportionally:
  //   Recipe serves 4, user makes 2 → deduct 50% of each ingredient.
  // ---------------------------------------------------------------------------
  markAsCooked: (recipeId: string, servings: number) => {
    const state = get();
    const recipe = state.recipes.find((r) => r.id === recipeId);
    if (!recipe) return [];

    // Calculate the scaling factor based on servings
    const scale = servings / recipe.servings;
    const deductions: CookingLog['ingredientsUsed'] = [];
    const updatedPantry = [...state.pantry];
    const updatedGroceryList = [...state.groceryList];

    for (const recipeIngredient of recipe.ingredients) {
      // Find the matching pantry item
      const pantryIndex = updatedPantry.findIndex(
        (item) =>
          !item.isDepleted &&
          stringSimilarity(item.name, recipeIngredient.name) >= 0.85
      );

      if (pantryIndex >= 0) {
        const pantryItem = updatedPantry[pantryIndex];
        const deductAmount = recipeIngredient.quantity * scale;

        // Record the deduction
        deductions.push({
          ingredientId: pantryItem.id,
          name: pantryItem.name,
          quantity: Math.min(deductAmount, pantryItem.quantity),
          unit: pantryItem.unit,
        });

        // Subtract from pantry
        const newQuantity = pantryItem.quantity - deductAmount;

        if (newQuantity <= 0) {
          // Depleted — mark as depleted and add to grocery list
          updatedPantry[pantryIndex] = {
            ...pantryItem,
            quantity: 0,
            isDepleted: true,
          };
          // Add to grocery list if not already there
          const alreadyInList = updatedGroceryList.some(
            (item) => stringSimilarity(item.name, pantryItem.name) >= 0.85
          );
          if (!alreadyInList) {
            updatedGroceryList.push({
              name: pantryItem.name,
              category: pantryItem.category,
            });
          }
        } else {
          updatedPantry[pantryIndex] = {
            ...pantryItem,
            quantity: Math.round(newQuantity * 10) / 10, // Avoid float noise
          };
        }
      }
    }

    // Create cooking log entry
    const logEntry: CookingLog = {
      id: generateId(),
      recipeId,
      cookedAt: new Date().toISOString(),
      servingsMade: servings,
      ingredientsUsed: deductions,
    };

    // Update recipe's timesCooked counter
    const updatedRecipes = state.recipes.map((r) =>
      r.id === recipeId ? { ...r, timesCooked: r.timesCooked + 1 } : r
    );

    set({
      pantry: updatedPantry,
      groceryList: updatedGroceryList,
      cookingLog: [...state.cookingLog, logEntry],
      recipes: updatedRecipes,
    });

    return deductions;
  },

  // ---------------------------------------------------------------------------
  // toggleFavorite
  // ---------------------------------------------------------------------------
  toggleFavorite: (recipeId: string) => {
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
      ),
    }));
  },

  // --- UI State Setters ---
  setProcessing: (isProcessing) => set({ isProcessing }),
  setProcessingProgress: (processingProgress) => set({ processingProgress }),

  // --- Grocery List ---
  clearGroceryList: () => set({ groceryList: [] }),
  removeFromGroceryList: (name) =>
    set((state) => ({
      groceryList: state.groceryList.filter((item) => item.name !== name),
    })),
}));
