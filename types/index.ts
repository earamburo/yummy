// ============================================================================
// Receipt Chef — Core Types
// ============================================================================
// All shared types live here. Import from '@/types' in any file.
// These mirror the database schema from the architecture spec.
// ============================================================================

/**
 * Ingredient categories — used for coloring dots, filtering, and
 * estimating expiry dates. Keep this in sync with the category
 * colors in theme.ts.
 */
export type IngredientCategory =
  | 'protein'
  | 'produce'
  | 'dairy'
  | 'grain'
  | 'spice'
  | 'condiment'
  | 'frozen'
  | 'other';

/**
 * A single ingredient in the user's pantry.
 * This is the core data model — receipts populate it,
 * cooking depletes it, and recipes reference it.
 */
export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;               // 'lb', 'oz', 'ct', 'bunch', 'bag', etc.
  purchaseDate: string;       // ISO 8601 timestamp
  estimatedExpiry: string;    // ISO 8601 timestamp
  receiptId: string;          // FK to Receipt
  isDepleted: boolean;
}

/**
 * A scanned receipt with its raw OCR data and extracted items.
 */
export interface Receipt {
  id: string;
  imageUri: string;           // Local file path to the captured image
  rawOcrText: string;         // Full OCR output for debugging
  storeName: string | null;   // Detected store name if available
  totalAmount: number | null; // Receipt total for validation
  scannedAt: string;          // ISO 8601 timestamp
  itemCount: number;          // Number of ingredients extracted
}

/**
 * Where the recipe came from. 'spoonacular' = API database,
 * 'claude' = LLM-generated, 'user' = manually entered.
 */
export type RecipeSource = 'spoonacular' | 'claude' | 'user';

/**
 * Difficulty level for a recipe.
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * A single ingredient requirement within a recipe.
 * Separate from the Ingredient model because this represents
 * what's NEEDED, not what's ON HAND.
 */
export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  inPantry: boolean;          // Computed at display time by cross-referencing pantry
}

/**
 * A single step in a recipe's instructions.
 */
export interface RecipeStep {
  number: number;
  instruction: string;
  timerMinutes?: number;      // Optional timer for steps that require waiting
}

/**
 * A complete recipe with all data needed for display and cooking.
 */
export interface Recipe {
  id: string;
  title: string;
  source: RecipeSource;
  externalId: string | null;  // Spoonacular recipe ID if applicable
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  cookTimeMin: number;
  servings: number;
  imageUrl: string | null;
  difficulty: Difficulty;
  isFavorite: boolean;
  timesCooked: number;
  pantryMatchCount: number;   // How many user ingredients this recipe uses
  missingCount: number;       // How many ingredients the user doesn't have
}

/**
 * A record of a recipe being cooked, tracking which
 * ingredients were deducted from the pantry.
 */
export interface CookingLog {
  id: string;
  recipeId: string;
  cookedAt: string;           // ISO 8601 timestamp
  servingsMade: number;
  ingredientsUsed: {
    ingredientId: string;
    name: string;
    quantity: number;
    unit: string;
  }[];
}

/**
 * The result of OCR processing — used between the Processing
 * and Review screens.
 */
export interface OcrResult {
  rawText: string;
  confidence: number;         // 0-1, overall confidence score
  lines: OcrLine[];
}

export interface OcrLine {
  text: string;
  confidence: number;
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

/**
 * A parsed ingredient extracted from a receipt, before
 * it's saved to the pantry. Users can edit these on the
 * Review screen.
 */
export interface ParsedIngredient {
  id: string;                 // Temporary ID for list rendering
  rawText: string;            // Original OCR text for debugging
  name: string;               // Normalized name
  category: IngredientCategory;
  quantity: number;
  unit: string;
  price: number | null;       // Extracted price if available
  isValid: boolean;           // false if parser couldn't confidently parse
}

/**
 * Navigation parameter types for Expo Router.
 * These define what data can be passed between screens.
 */
export type RootStackParamList = {
  '(tabs)': undefined;
  'scan/camera': undefined;
  'scan/processing': { imageUri: string };
  'scan/review': { ingredients: ParsedIngredient[] };
  'recipe/[id]': { id: string };
  'recipe/cooked': { recipeId: string; deductions: CookingLog['ingredientsUsed'] };
};

/**
 * Props for the IngredientRow component, which is used
 * across Review, Pantry, and Recipe Detail screens.
 */
export type IngredientRowVariant = 'review' | 'pantry' | 'recipe';

/**
 * Filter state for the Pantry screen's category pills.
 */
export type PantryFilter = 'all' | IngredientCategory;

/**
 * Time-of-day greeting used on the Home screen.
 */
export type Greeting = 'Good morning' | 'Good afternoon' | 'Good evening' | 'Late night cooking?';
