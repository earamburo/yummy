// ============================================================================
// Mock Data — Receipt Chef
// ============================================================================
// Sample data for testing and development. Import into your screens/components
// or use as seed data for your storage layer.
// ============================================================================

import type {
    CookingLog,
    Ingredient,
    OcrLine,
    OcrResult,
    ParsedIngredient,
    Receipt,
    Recipe,
} from '@/types';

// ============================================================================
// Receipts
// ============================================================================

export const mockReceipts: Receipt[] = [
  {
    id: 'receipt_001',
    imageUri: '/mock/receipt_trader_joes.jpg',
    rawOcrText: `TRADER JOE'S #542
123 Main St, Atlanta GA
03/15/2026 14:32

Organic Chicken Breast    $8.99
Broccoli Crowns          $2.49
Greek Yogurt 32oz        $4.99
Basmati Rice 2lb         $3.99
Garlic (3 bulbs)         $1.29
Olive Oil 500ml          $7.99
Honey                    $5.49

TOTAL                   $35.23`,
    storeName: "Trader Joe's",
    totalAmount: 35.23,
    scannedAt: '2026-03-15T14:32:00Z',
    itemCount: 7,
  },
  {
    id: 'receipt_002',
    imageUri: '/mock/receipt_kroger.jpg',
    rawOcrText: `KROGER #8421
Your Neighborhood Store
03/12/2026 09:15

Salmon Fillet 1.2lb      $14.38
Bell Peppers (3pk)        $3.99
Soy Sauce                 $2.79
Ginger Root               $1.89
Brown Sugar               $2.49

TOTAL                    $25.54`,
    storeName: 'Kroger',
    totalAmount: 25.54,
    scannedAt: '2026-03-12T09:15:00Z',
    itemCount: 5,
  },
  {
    id: 'receipt_003',
    imageUri: '/mock/receipt_whole_foods.jpg',
    rawOcrText: `WHOLE FOODS MARKET
03/10/2026 16:45

Organic Spinach          $3.99
Roma Tomatoes 2lb        $4.99
Mozzarella 16oz          $6.49
Fresh Basil              $2.99
Balsamic Vinegar         $8.99

TOTAL                   $27.45`,
    storeName: 'Whole Foods Market',
    totalAmount: 27.45,
    scannedAt: '2026-03-10T16:45:00Z',
    itemCount: 5,
  },
];

// ============================================================================
// Ingredients
// ============================================================================

export const mockIngredients: Ingredient[] = [
  // From receipt_001
  {
    id: 'ing_001',
    name: 'Chicken Breast',
    category: 'protein',
    quantity: 1.5,
    unit: 'lb',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2026-03-20T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  {
    id: 'ing_002',
    name: 'Broccoli',
    category: 'produce',
    quantity: 2,
    unit: 'crowns',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2026-03-22T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  {
    id: 'ing_003',
    name: 'Greek Yogurt',
    category: 'dairy',
    quantity: 32,
    unit: 'oz',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2026-04-05T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  {
    id: 'ing_004',
    name: 'Basmati Rice',
    category: 'grain',
    quantity: 2,
    unit: 'lb',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2027-03-15T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  {
    id: 'ing_005',
    name: 'Garlic',
    category: 'produce',
    quantity: 3,
    unit: 'bulbs',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2026-04-15T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  {
    id: 'ing_006',
    name: 'Olive Oil',
    category: 'condiment',
    quantity: 500,
    unit: 'ml',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2027-03-15T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  {
    id: 'ing_007',
    name: 'Honey',
    category: 'condiment',
    quantity: 12,
    unit: 'oz',
    purchaseDate: '2026-03-15T14:32:00Z',
    estimatedExpiry: '2028-03-15T00:00:00Z',
    receiptId: 'receipt_001',
    isDepleted: false,
  },
  // From receipt_002
  {
    id: 'ing_008',
    name: 'Salmon Fillet',
    category: 'protein',
    quantity: 1.2,
    unit: 'lb',
    purchaseDate: '2026-03-12T09:15:00Z',
    estimatedExpiry: '2026-03-14T00:00:00Z',
    receiptId: 'receipt_002',
    isDepleted: true, // Already cooked
  },
  {
    id: 'ing_009',
    name: 'Bell Peppers',
    category: 'produce',
    quantity: 3,
    unit: 'ct',
    purchaseDate: '2026-03-12T09:15:00Z',
    estimatedExpiry: '2026-03-19T00:00:00Z',
    receiptId: 'receipt_002',
    isDepleted: false,
  },
  {
    id: 'ing_010',
    name: 'Soy Sauce',
    category: 'condiment',
    quantity: 15,
    unit: 'oz',
    purchaseDate: '2026-03-12T09:15:00Z',
    estimatedExpiry: '2027-03-12T00:00:00Z',
    receiptId: 'receipt_002',
    isDepleted: false,
  },
  {
    id: 'ing_011',
    name: 'Ginger Root',
    category: 'produce',
    quantity: 4,
    unit: 'oz',
    purchaseDate: '2026-03-12T09:15:00Z',
    estimatedExpiry: '2026-04-12T00:00:00Z',
    receiptId: 'receipt_002',
    isDepleted: false,
  },
  {
    id: 'ing_012',
    name: 'Brown Sugar',
    category: 'other',
    quantity: 16,
    unit: 'oz',
    purchaseDate: '2026-03-12T09:15:00Z',
    estimatedExpiry: '2027-03-12T00:00:00Z',
    receiptId: 'receipt_002',
    isDepleted: false,
  },
  // From receipt_003
  {
    id: 'ing_013',
    name: 'Spinach',
    category: 'produce',
    quantity: 1,
    unit: 'bag',
    purchaseDate: '2026-03-10T16:45:00Z',
    estimatedExpiry: '2026-03-17T00:00:00Z',
    receiptId: 'receipt_003',
    isDepleted: false,
  },
  {
    id: 'ing_014',
    name: 'Roma Tomatoes',
    category: 'produce',
    quantity: 2,
    unit: 'lb',
    purchaseDate: '2026-03-10T16:45:00Z',
    estimatedExpiry: '2026-03-20T00:00:00Z',
    receiptId: 'receipt_003',
    isDepleted: false,
  },
  {
    id: 'ing_015',
    name: 'Mozzarella',
    category: 'dairy',
    quantity: 16,
    unit: 'oz',
    purchaseDate: '2026-03-10T16:45:00Z',
    estimatedExpiry: '2026-03-31T00:00:00Z',
    receiptId: 'receipt_003',
    isDepleted: false,
  },
  {
    id: 'ing_016',
    name: 'Fresh Basil',
    category: 'produce',
    quantity: 1,
    unit: 'bunch',
    purchaseDate: '2026-03-10T16:45:00Z',
    estimatedExpiry: '2026-03-17T00:00:00Z',
    receiptId: 'receipt_003',
    isDepleted: false,
  },
  {
    id: 'ing_017',
    name: 'Balsamic Vinegar',
    category: 'condiment',
    quantity: 12,
    unit: 'oz',
    purchaseDate: '2026-03-10T16:45:00Z',
    estimatedExpiry: '2028-03-10T00:00:00Z',
    receiptId: 'receipt_003',
    isDepleted: false,
  },
];

// ============================================================================
// Recipes
// ============================================================================

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe_001',
    title: 'Honey Garlic Chicken with Broccoli',
    source: 'spoonacular',
    externalId: 'sp_644387',
    ingredients: [
      { name: 'Chicken Breast', quantity: 1, unit: 'lb', inPantry: true },
      { name: 'Broccoli', quantity: 2, unit: 'crowns', inPantry: true },
      { name: 'Garlic', quantity: 4, unit: 'cloves', inPantry: true },
      { name: 'Honey', quantity: 3, unit: 'tbsp', inPantry: true },
      { name: 'Soy Sauce', quantity: 2, unit: 'tbsp', inPantry: true },
      { name: 'Olive Oil', quantity: 2, unit: 'tbsp', inPantry: true },
    ],
    steps: [
      {
        number: 1,
        instruction: 'Cut chicken breast into bite-sized pieces and season with salt and pepper.',
      },
      {
        number: 2,
        instruction: 'Heat olive oil in a large skillet over medium-high heat.',
      },
      {
        number: 3,
        instruction: 'Add chicken and cook until golden brown, about 5-7 minutes.',
        timerMinutes: 7,
      },
      {
        number: 4,
        instruction: 'Add minced garlic and broccoli florets. Stir-fry for 3 minutes.',
        timerMinutes: 3,
      },
      {
        number: 5,
        instruction: 'Mix honey and soy sauce, pour over chicken and broccoli. Cook for 2 more minutes.',
        timerMinutes: 2,
      },
      {
        number: 6,
        instruction: 'Serve hot over rice or enjoy as is.',
      },
    ],
    cookTimeMin: 25,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
    difficulty: 'easy',
    isFavorite: true,
    timesCooked: 3,
    pantryMatchCount: 6,
    missingCount: 0,
  },
  {
    id: 'recipe_002',
    title: 'Caprese Salad',
    source: 'claude',
    externalId: null,
    ingredients: [
      { name: 'Roma Tomatoes', quantity: 3, unit: 'ct', inPantry: true },
      { name: 'Mozzarella', quantity: 8, unit: 'oz', inPantry: true },
      { name: 'Fresh Basil', quantity: 10, unit: 'leaves', inPantry: true },
      { name: 'Balsamic Vinegar', quantity: 2, unit: 'tbsp', inPantry: true },
      { name: 'Olive Oil', quantity: 3, unit: 'tbsp', inPantry: true },
      { name: 'Salt', quantity: 1, unit: 'pinch', inPantry: false },
      { name: 'Black Pepper', quantity: 1, unit: 'pinch', inPantry: false },
    ],
    steps: [
      {
        number: 1,
        instruction: 'Slice tomatoes and mozzarella into 1/4-inch thick rounds.',
      },
      {
        number: 2,
        instruction: 'Arrange tomato and mozzarella slices alternating on a serving platter.',
      },
      {
        number: 3,
        instruction: 'Tuck fresh basil leaves between slices.',
      },
      {
        number: 4,
        instruction: 'Drizzle with olive oil and balsamic vinegar.',
      },
      {
        number: 5,
        instruction: 'Season with salt and pepper to taste. Serve immediately.',
      },
    ],
    cookTimeMin: 10,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5',
    difficulty: 'easy',
    isFavorite: false,
    timesCooked: 1,
    pantryMatchCount: 5,
    missingCount: 2,
  },
  {
    id: 'recipe_003',
    title: 'Stir-Fried Garlic Ginger Vegetables',
    source: 'spoonacular',
    externalId: 'sp_782564',
    ingredients: [
      { name: 'Bell Peppers', quantity: 2, unit: 'ct', inPantry: true },
      { name: 'Broccoli', quantity: 1, unit: 'crown', inPantry: true },
      { name: 'Garlic', quantity: 3, unit: 'cloves', inPantry: true },
      { name: 'Ginger Root', quantity: 1, unit: 'tbsp', inPantry: true },
      { name: 'Soy Sauce', quantity: 3, unit: 'tbsp', inPantry: true },
      { name: 'Olive Oil', quantity: 2, unit: 'tbsp', inPantry: true },
      { name: 'Sesame Oil', quantity: 1, unit: 'tsp', inPantry: false },
    ],
    steps: [
      {
        number: 1,
        instruction: 'Slice bell peppers and cut broccoli into florets.',
      },
      {
        number: 2,
        instruction: 'Mince garlic and grate ginger.',
      },
      {
        number: 3,
        instruction: 'Heat olive oil in a wok or large skillet over high heat.',
      },
      {
        number: 4,
        instruction: 'Add garlic and ginger, stir-fry for 30 seconds until fragrant.',
      },
      {
        number: 5,
        instruction: 'Add vegetables and stir-fry for 4-5 minutes until crisp-tender.',
        timerMinutes: 5,
      },
      {
        number: 6,
        instruction: 'Add soy sauce and sesame oil, toss to coat. Cook for 1 more minute.',
        timerMinutes: 1,
      },
      {
        number: 7,
        instruction: 'Serve hot over rice or noodles.',
      },
    ],
    cookTimeMin: 15,
    servings: 3,
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    difficulty: 'easy',
    isFavorite: false,
    timesCooked: 0,
    pantryMatchCount: 6,
    missingCount: 1,
  },
  {
    id: 'recipe_004',
    title: 'Greek Yogurt Parfait',
    source: 'user',
    externalId: null,
    ingredients: [
      { name: 'Greek Yogurt', quantity: 16, unit: 'oz', inPantry: true },
      { name: 'Honey', quantity: 2, unit: 'tbsp', inPantry: true },
      { name: 'Granola', quantity: 1, unit: 'cup', inPantry: false },
      { name: 'Fresh Berries', quantity: 1, unit: 'cup', inPantry: false },
    ],
    steps: [
      {
        number: 1,
        instruction: 'Layer Greek yogurt in serving glasses or bowls.',
      },
      {
        number: 2,
        instruction: 'Drizzle honey over yogurt.',
      },
      {
        number: 3,
        instruction: 'Add a layer of granola.',
      },
      {
        number: 4,
        instruction: 'Top with fresh berries and an additional drizzle of honey.',
      },
      {
        number: 5,
        instruction: 'Serve immediately or refrigerate up to 2 hours.',
      },
    ],
    cookTimeMin: 5,
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    difficulty: 'easy',
    isFavorite: true,
    timesCooked: 5,
    pantryMatchCount: 2,
    missingCount: 2,
  },
  {
    id: 'recipe_005',
    title: 'Balsamic Glazed Salmon',
    source: 'spoonacular',
    externalId: 'sp_893421',
    ingredients: [
      { name: 'Salmon Fillet', quantity: 1.5, unit: 'lb', inPantry: false },
      { name: 'Balsamic Vinegar', quantity: 1/4, unit: 'cup', inPantry: true },
      { name: 'Brown Sugar', quantity: 2, unit: 'tbsp', inPantry: true },
      { name: 'Garlic', quantity: 2, unit: 'cloves', inPantry: true },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp', inPantry: true },
      { name: 'Dijon Mustard', quantity: 1, unit: 'tsp', inPantry: false },
    ],
    steps: [
      {
        number: 1,
        instruction: 'Preheat oven to 400°F (200°C).',
      },
      {
        number: 2,
        instruction: 'In a small saucepan, combine balsamic vinegar, brown sugar, and minced garlic. Simmer for 5 minutes until slightly thickened.',
        timerMinutes: 5,
      },
      {
        number: 3,
        instruction: 'Place salmon on a lined baking sheet and brush with olive oil.',
      },
      {
        number: 4,
        instruction: 'Brush salmon with half of the balsamic glaze.',
      },
      {
        number: 5,
        instruction: 'Bake for 12-15 minutes until salmon is cooked through.',
        timerMinutes: 15,
      },
      {
        number: 6,
        instruction: 'Brush with remaining glaze and serve immediately.',
      },
    ],
    cookTimeMin: 30,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    difficulty: 'medium',
    isFavorite: false,
    timesCooked: 0,
    pantryMatchCount: 4,
    missingCount: 2,
  },
];

// ============================================================================
// Cooking Logs
// ============================================================================

export const mockCookingLogs: CookingLog[] = [
  {
    id: 'log_001',
    recipeId: 'recipe_001',
    cookedAt: '2026-03-16T18:30:00Z',
    servingsMade: 4,
    ingredientsUsed: [
      { ingredientId: 'ing_001', name: 'Chicken Breast', quantity: 1, unit: 'lb' },
      { ingredientId: 'ing_002', name: 'Broccoli', quantity: 2, unit: 'crowns' },
      { ingredientId: 'ing_005', name: 'Garlic', quantity: 4, unit: 'cloves' },
      { ingredientId: 'ing_007', name: 'Honey', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing_010', name: 'Soy Sauce', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing_006', name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
    ],
  },
  {
    id: 'log_002',
    recipeId: 'recipe_004',
    cookedAt: '2026-03-14T08:15:00Z',
    servingsMade: 2,
    ingredientsUsed: [
      { ingredientId: 'ing_003', name: 'Greek Yogurt', quantity: 16, unit: 'oz' },
      { ingredientId: 'ing_007', name: 'Honey', quantity: 2, unit: 'tbsp' },
    ],
  },
];

// ============================================================================
// Parsed Ingredients (for Review Screen)
// ============================================================================

export const mockParsedIngredients: ParsedIngredient[] = [
  {
    id: 'parsed_001',
    rawText: 'Organic Chicken Breast    $8.99',
    name: 'Chicken Breast',
    category: 'protein',
    quantity: 1.5,
    unit: 'lb',
    price: 8.99,
    isValid: true,
  },
  {
    id: 'parsed_002',
    rawText: 'Broccoli Crowns          $2.49',
    name: 'Broccoli',
    category: 'produce',
    quantity: 2,
    unit: 'crowns',
    price: 2.49,
    isValid: true,
  },
  {
    id: 'parsed_003',
    rawText: 'Greek Yogurt 32oz        $4.99',
    name: 'Greek Yogurt',
    category: 'dairy',
    quantity: 32,
    unit: 'oz',
    price: 4.99,
    isValid: true,
  },
  {
    id: 'parsed_004',
    rawText: 'XZQR123 UNKN             $3.50',
    name: 'Unknown Item',
    category: 'other',
    quantity: 1,
    unit: 'ct',
    price: 3.50,
    isValid: false,
  },
];

// ============================================================================
// OCR Results (for Processing Screen)
// ============================================================================

export const mockOcrLines: OcrLine[] = [
  {
    text: "TRADER JOE'S #542",
    confidence: 0.98,
    boundingBox: { top: 10, left: 50, width: 200, height: 20 },
  },
  {
    text: '123 Main St, Atlanta GA',
    confidence: 0.95,
    boundingBox: { top: 35, left: 50, width: 180, height: 15 },
  },
  {
    text: '03/15/2026 14:32',
    confidence: 0.97,
    boundingBox: { top: 55, left: 50, width: 120, height: 15 },
  },
  {
    text: 'Organic Chicken Breast    $8.99',
    confidence: 0.92,
    boundingBox: { top: 85, left: 30, width: 240, height: 18 },
  },
  {
    text: 'Broccoli Crowns          $2.49',
    confidence: 0.94,
    boundingBox: { top: 108, left: 30, width: 240, height: 18 },
  },
  {
    text: 'Greek Yogurt 32oz        $4.99',
    confidence: 0.91,
    boundingBox: { top: 131, left: 30, width: 240, height: 18 },
  },
  {
    text: 'TOTAL                   $35.23',
    confidence: 0.96,
    boundingBox: { top: 200, left: 30, width: 240, height: 20 },
  },
];

export const mockOcrResult: OcrResult = {
  rawText: `TRADER JOE'S #542
123 Main St, Atlanta GA
03/15/2026 14:32

Organic Chicken Breast    $8.99
Broccoli Crowns          $2.49
Greek Yogurt 32oz        $4.99
Basmati Rice 2lb         $3.99
Garlic (3 bulbs)         $1.29
Olive Oil 500ml          $7.99
Honey                    $5.49

TOTAL                   $35.23`,
  confidence: 0.94,
  lines: mockOcrLines,
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all ingredients that are currently active (not depleted).
 */
export const getActivePantryItems = (): Ingredient[] => {
  return mockIngredients.filter(ing => !ing.isDepleted);
};

/**
 * Get ingredients expiring within the next N days.
 */
export const getExpiringSoon = (days: number = 3): Ingredient[] => {
  const now = new Date();
  const threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  return mockIngredients.filter(ing => {
    if (ing.isDepleted) return false;
    const expiryDate = new Date(ing.estimatedExpiry);
    return expiryDate <= threshold && expiryDate >= now;
  });
};

/**
 * Get recipes sorted by pantry match percentage.
 */
export const getRecipesByMatch = (): Recipe[] => {
  return [...mockRecipes].sort((a, b) => {
    const matchA = a.pantryMatchCount / a.ingredients.length;
    const matchB = b.pantryMatchCount / b.ingredients.length;
    return matchB - matchA;
  });
};

/**
 * Get favorite recipes.
 */
export const getFavoriteRecipes = (): Recipe[] => {
  return mockRecipes.filter(recipe => recipe.isFavorite);
};

/**
 * Get recently cooked recipes (from cooking logs).
 */
export const getRecentlyCooked = (): { recipe: Recipe; log: CookingLog }[] => {
  return mockCookingLogs
    .map(log => ({
      recipe: mockRecipes.find(r => r.id === log.recipeId)!,
      log,
    }))
    .filter(item => item.recipe)
    .sort((a, b) => 
      new Date(b.log.cookedAt).getTime() - new Date(a.log.cookedAt).getTime()
    );
};