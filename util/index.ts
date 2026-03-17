// ============================================================================
// Receipt Chef — Utility Helpers
// ============================================================================
// Pure functions with no side effects. Easy to unit test.
// Import: import { getGreeting, formatExpiry, generateId } from '@/utils';
// ============================================================================

import { Greeting, IngredientCategory } from '@/types';

/**
 * Generates a unique ID for new records.
 * Uses a combination of timestamp + random string.
 * In production, you'd use a UUID library, but this
 * avoids an extra dependency for the MVP.
 *
 * @returns A unique string ID like "1710684000000-a3f9b2"
 */
export function generateId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

/**
 * Returns a time-of-day greeting for the Home screen.
 * The greeting changes based on the current hour:
 *   5am–12pm  → "Good morning"
 *   12pm–5pm  → "Good afternoon"
 *   5pm–10pm  → "Good evening"
 *   10pm–5am  → "Late night cooking?"
 *
 * @returns The appropriate greeting string
 */
export function getGreeting(): Greeting {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 22) return 'Good evening';
  return 'Late night cooking?';
}

/**
 * Calculates the number of days until an ingredient expires.
 * Returns a negative number if already expired.
 *
 * @param expiryDate - ISO 8601 date string
 * @returns Number of days until expiry (negative = expired)
 */
export function daysUntilExpiry(expiryDate: string): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffMs = expiry.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Formats the expiry date into a human-readable label.
 * Examples: "Expires tomorrow", "Expires in 5 days", "Expired"
 *
 * @param expiryDate - ISO 8601 date string
 * @returns A formatted expiry label
 */
export function formatExpiry(expiryDate: string): string {
  const days = daysUntilExpiry(expiryDate);
  if (days <= 0) return 'Expired';
  if (days === 1) return 'Expires tomorrow';
  return `Expires in ${days} days`;
}

/**
 * Returns the default expiry days for an ingredient category.
 * These are rough estimates used when we can't determine
 * a specific expiry date. Based on USDA food storage guidelines.
 *
 * @param category - The ingredient category
 * @returns Number of days the ingredient typically lasts
 */
export function getDefaultExpiryDays(category: IngredientCategory): number {
  const defaults: Record<IngredientCategory, number> = {
    protein: 3,       // Raw meat/fish: 1-3 days
    produce: 7,       // Fruits/veggies: 3-10 days
    dairy: 10,        // Milk/cheese: 7-14 days
    grain: 90,        // Rice/pasta: months
    spice: 365,       // Spices: 1+ year
    condiment: 180,   // Sauces/oils: months
    frozen: 90,       // Frozen items: months
    other: 14,        // Default: 2 weeks
  };
  return defaults[category];
}

/**
 * Formats a quantity and unit into a display string.
 * Handles pluralization and common abbreviations.
 *
 * Examples:
 *   formatQuantity(2.3, 'lb')  → "2.3 lb"
 *   formatQuantity(1, 'bunch') → "1 bunch"
 *   formatQuantity(6, 'ct')    → "6 ct"
 *
 * @param quantity - The numeric amount
 * @param unit - The unit of measurement
 * @returns Formatted string like "2.3 lb"
 */
export function formatQuantity(quantity: number, unit: string): string {
  // Round to 1 decimal place to avoid floating point noise
  const rounded = Math.round(quantity * 10) / 10;

  // If it's a whole number, don't show the decimal
  const display = rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);

  return `${display} ${unit}`;
}

/**
 * Simple Levenshtein distance for fuzzy string matching.
 * Used in the pantry merge logic to detect duplicate ingredients
 * with slightly different names (e.g., "chicken breast" vs "chkn breast").
 *
 * @param a - First string
 * @param b - Second string
 * @returns A similarity score from 0 (completely different) to 1 (identical)
 */
export function stringSimilarity(a: string, b: string): number {
  const aLower = a.toLowerCase().trim();
  const bLower = b.toLowerCase().trim();

  if (aLower === bLower) return 1;
  if (aLower.length === 0 || bLower.length === 0) return 0;

  // Build a matrix of edit distances
  const matrix: number[][] = [];
  for (let i = 0; i <= aLower.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bLower.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= aLower.length; i++) {
    for (let j = 1; j <= bLower.length; j++) {
      const cost = aLower[i - 1] === bLower[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,       // deletion
        matrix[i][j - 1] + 1,       // insertion
        matrix[i - 1][j - 1] + cost  // substitution
      );
    }
  }

  const maxLength = Math.max(aLower.length, bLower.length);
  return 1 - matrix[aLower.length][bLower.length] / maxLength;
}

/**
 * Clamp a number between min and max.
 * Useful for progress bars, quantity edits, etc.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
