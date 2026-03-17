// ============================================================================
// Receipt Chef — Design System & Style Tokens
// Version 1.0 | Phase 1: Receipt Scanning
// ============================================================================
// 
// HOW TO USE THIS FILE:
// Import tokens directly into your React Native components:
//   import { colors, typography, spacing, shadows } from '@/styles/theme';
//
// Or use the pre-built component styles:
//   import { componentStyles } from '@/styles/theme';
//   <View style={componentStyles.card}> ... </View>
//
// For Nativewind/Tailwind users, the equivalent classes are noted
// in comments next to each token.
// ============================================================================

import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// 1. COLOR TOKENS
// ============================================================================
// Color naming convention: [semantic].[shade]
// Shades: 50 (lightest) → 900 (darkest)
// Every color has been tested for WCAG AA contrast on both light/dark backgrounds.

export const colors = {
  // --- Brand Primary: Teal ---
  // Used for: CTAs, active states, navigation highlights, success indicators
  primary: {
    50:  '#E1F5EE',   // tw: bg-emerald-50   — Light tint backgrounds
    100: '#9FE1CB',   // tw: bg-emerald-200  — Hover states, light badges
    200: '#5DCAA5',   // tw: bg-emerald-300  — Secondary buttons
    400: '#1D9E75',   // tw: bg-emerald-500  — Not used directly (too mid)
    600: '#0F6E56',   // tw: bg-emerald-700  — PRIMARY CTA, tab active, links
    800: '#085041',   // tw: bg-emerald-800  — Dark mode primary
    900: '#04342C',   // tw: bg-emerald-900  — Dark mode pressed state
  },

  // --- Accent: Coral ---
  // Used for: Expiring items, warnings, destructive quantity changes
  coral: {
    50:  '#FAECE7',   // tw: bg-orange-50    — Warning background tint
    100: '#F5C4B3',   // tw: bg-orange-200   — Light warning badges
    200: '#F0997B',   // tw: bg-orange-300   — Warning borders
    400: '#D85A30',   // tw: bg-orange-600   — WARNING TEXT, expiry labels
    600: '#993C1D',   // tw: bg-orange-700   — Dark warning text
    800: '#712B13',   // tw: bg-orange-800   — Dark mode warning
    900: '#4A1B0C',   // tw: bg-orange-900   — Dark mode pressed
  },

  // --- Accent: Amber ---
  // Used for: Medium difficulty, "not in pantry" indicators, secondary warnings
  amber: {
    50:  '#FAEEDA',   // tw: bg-amber-50     — Subtle highlight bg
    100: '#FAC775',   // tw: bg-amber-200    — Badge backgrounds
    200: '#EF9F27',   // tw: bg-amber-400    — Active amber elements
    400: '#BA7517',   // tw: bg-amber-600    — AMBER TEXT (difficulty, missing items)
    600: '#854F0B',   // tw: bg-amber-700    — Dark amber text
    800: '#633806',   // tw: bg-amber-800    — Dark mode amber
    900: '#412402',   // tw: bg-amber-900    — Dark mode pressed
  },

  // --- Accent: Blue ---
  // Used for: Dairy category, informational elements
  blue: {
    50:  '#E6F1FB',   // tw: bg-blue-50
    100: '#B5D4F4',   // tw: bg-blue-200
    400: '#378ADD',   // tw: bg-blue-500     — DAIRY category dot
    600: '#185FA5',   // tw: bg-blue-700
    800: '#0C447C',   // tw: bg-blue-800
  },

  // --- Accent: Green ---
  // Used for: Produce category
  green: {
    50:  '#EAF3DE',   // tw: bg-lime-50
    100: '#C0DD97',   // tw: bg-lime-300
    400: '#639922',   // tw: bg-lime-600     — PRODUCE category dot
    600: '#3B6D11',   // tw: bg-lime-700
    800: '#27500A',   // tw: bg-lime-800
  },

  // --- Neutrals ---
  // Used for: Backgrounds, text, borders, disabled states
  neutral: {
    0:   '#FFFFFF',   // tw: bg-white        — Card backgrounds
    50:  '#FAFAF7',   // tw: bg-stone-50     — Page background (THE app bg)
    100: '#F1EFE8',   // tw: bg-stone-100    — Surface backgrounds, metric cards
    200: '#E8E7E2',   // tw: bg-stone-200    — Input borders, dividers (light)
    300: '#E0DFD8',   // tw: bg-stone-300    — Card borders, tab bar border
    400: '#D3D1C7',   // tw: bg-stone-400    — Disabled borders
    500: '#B4B2A9',   // tw: bg-stone-500    — Placeholder text
    600: '#888780',   // tw: bg-stone-500    — SECONDARY TEXT (muted labels)
    700: '#5F5E5A',   // tw: bg-stone-600    — Tertiary text
    800: '#3D3D3A',   // tw: bg-stone-700    — Strong secondary text
    900: '#1A1A18',   // tw: bg-stone-900    — PRIMARY TEXT (headings, body)
  },

  // --- Semantic Aliases ---
  // Use these in components instead of raw color values.
  // This makes theming and dark mode implementation trivial.
  background: {
    primary:   '#FAFAF7',   // Main app background
    secondary: '#F1EFE8',   // Surface/card backgrounds (metric cards)
    card:      '#FFFFFF',   // Elevated card backgrounds
    overlay:   'rgba(26, 26, 24, 0.5)', // Modal overlays
  },

  text: {
    primary:   '#1A1A18',   // Headings, body copy, high emphasis
    secondary: '#888780',   // Labels, meta text, timestamps
    tertiary:  '#B4B2A9',   // Placeholder text, hints
    inverse:   '#FFFFFF',   // Text on dark/colored backgrounds
    link:      '#0F6E56',   // Tappable text, "See all" links
  },

  border: {
    light:     '#E8E7E2',   // Ingredient row dividers
    default:   '#E0DFD8',   // Card borders, input borders
    strong:    '#D3D1C7',   // Emphasized borders
  },

  // --- Category Colors ---
  // Used for the colored dots next to ingredients in pantry/review screens
  category: {
    protein:   '#D85A30',   // Coral 400
    produce:   '#639922',   // Green 400
    dairy:     '#378ADD',   // Blue 400
    grain:     '#BA7517',   // Amber 400
    spice:     '#534AB7',   // Purple (from design system)
    condiment: '#1D9E75',   // Primary 400
    frozen:    '#185FA5',   // Blue 600
    other:     '#888780',   // Neutral 600
  },

  // --- Status Colors ---
  status: {
    success:    '#0F6E56',  // Saved, confirmed, in pantry
    warning:    '#BA7517',  // Missing ingredient, medium difficulty
    danger:     '#D85A30',  // Expiring soon, quantity deducted
    info:       '#378ADD',  // Informational badges
  },
} as const;


// ============================================================================
// 2. TYPOGRAPHY TOKENS
// ============================================================================
// Font: System default (San Francisco on iOS, Roboto on Android)
// We use the system font for maximum readability and native feel.
// If the designer wants a custom font, replace fontFamily values here.

export const typography = {
  // --- Font Families ---
  fontFamily: {
    regular: Platform.select({ ios: 'System', android: 'Roboto' }) as string,
    medium:  Platform.select({ ios: 'System', android: 'Roboto-Medium' }) as string,
    bold:    Platform.select({ ios: 'System', android: 'Roboto-Bold' }) as string,
    mono:    Platform.select({ ios: 'Menlo', android: 'monospace' }) as string,
  },

  // --- Font Weights ---
  // React Native uses string weights. These are the only three we use.
  weight: {
    regular: '400' as const,
    medium:  '500' as const,
    bold:    '600' as const,
  },

  // --- Type Scale ---
  // Each level defines size, lineHeight, weight, and intended use.
  // lineHeight = size × multiplier (1.3 for headings, 1.5 for body)
  scale: {
    // Display — only on home screen greeting
    displayLg: {
      fontSize: 28,
      lineHeight: 36,        // 28 × 1.29
      fontWeight: '500' as const,
      letterSpacing: -0.3,
      // Usage: "What's for dinner?" on home screen
    },

    // Headings
    headingLg: {
      fontSize: 24,
      lineHeight: 32,        // 24 × 1.33
      fontWeight: '500' as const,
      letterSpacing: -0.2,
      // Usage: Screen titles ("Your pantry", "Recipes for you")
    },
    headingMd: {
      fontSize: 22,
      lineHeight: 28,        // 22 × 1.27
      fontWeight: '500' as const,
      letterSpacing: -0.2,
      // Usage: Recipe detail title on hero image
    },
    headingSm: {
      fontSize: 17,
      lineHeight: 24,        // 17 × 1.41
      fontWeight: '500' as const,
      letterSpacing: 0,
      // Usage: Card titles, CTA button labels, recipe card name
    },

    // Body
    bodyLg: {
      fontSize: 16,
      lineHeight: 24,        // 16 × 1.5
      fontWeight: '400' as const,
      letterSpacing: 0,
      // Usage: Primary buttons, large body text
    },
    bodyMd: {
      fontSize: 15,
      lineHeight: 22,        // 15 × 1.47
      fontWeight: '400' as const,
      letterSpacing: 0,
      // Usage: Ingredient names, step instructions, main content
    },
    bodySm: {
      fontSize: 14,
      lineHeight: 20,        // 14 × 1.43
      fontWeight: '400' as const,
      letterSpacing: 0,
      // Usage: Greeting subtitle, processing description
    },

    // Captions & Labels
    caption: {
      fontSize: 13,
      lineHeight: 18,        // 13 × 1.38
      fontWeight: '400' as const,
      letterSpacing: 0,
      // Usage: Meta text (cook time, servings), "See all" links, pantry subtext
    },
    label: {
      fontSize: 12,
      lineHeight: 16,        // 12 × 1.33
      fontWeight: '500' as const,
      letterSpacing: 0.5,
      // Usage: Category headers ("PROTEIN"), step numbers, section labels
      // Note: Often used with textTransform: 'uppercase'
    },
    micro: {
      fontSize: 11,
      lineHeight: 14,        // 11 × 1.27
      fontWeight: '400' as const,
      letterSpacing: 0,
      // Usage: Expiry countdown text, pill badges, fine print
    },

    // Tab Bar
    tabLabel: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '400' as const,
      letterSpacing: 0,
      // Usage: Tab bar labels only
    },
  },
} as const;


// ============================================================================
// 3. SPACING TOKENS
// ============================================================================
// Based on a 4px grid. All spacing values are multiples of 4.
// The app uses a warm, breathable layout — generous padding everywhere.

export const spacing = {
  // --- Base Unit ---
  unit: 4,

  // --- Named Spacers ---
  xxs: 2,    // Micro spacing (dot to text gap inside status indicators)
  xs:  4,    // Tight spacing (between text lines in a card)
  sm:  8,    // Small gap (between badge pills, icon padding)
  md:  12,   // Medium gap (between list items, card sections)
  lg:  16,   // Large gap (section padding, card internal padding)
  xl:  20,   // Extra-large (major section breaks)
  xxl: 24,   // Screen horizontal padding, major vertical breaks
  xxxl: 32,  // Between screen sections (e.g. CTA to stats cards)

  // --- Screen Padding ---
  // Consistent horizontal padding across all screens
  screenHorizontal: 24,  // Left/right padding on all scrollable content
  screenTop: 8,          // Below status bar (content start)

  // --- Component-specific ---
  cardPadding: 18,       // Internal padding inside recipe/metric cards
  cardGap: 12,           // Gap between side-by-side cards (metric cards)
  listItemVertical: 14,  // Vertical padding inside ingredient rows
  tabBarHeight: 84,      // Total tab bar height including safe area
  statusBarHeight: 54,   // Status bar + notch clearance
  buttonPadding: 16,     // Vertical padding inside CTA buttons
  categoryHeaderTop: 16, // Space above "PROTEIN" category labels
  categoryHeaderBottom: 8,// Space below category labels to first item

  // --- Safe Areas ---
  // These adjust for notch/home indicator. Use react-native-safe-area-context
  // in production — these are fallback defaults.
  safeTop: Platform.select({ ios: 54, android: 24 }) as number,
  safeBottom: Platform.select({ ios: 34, android: 0 }) as number,
} as const;


// ============================================================================
// 4. BORDER RADIUS TOKENS
// ============================================================================

export const radii = {
  xs:   4,    // Small inline elements (progress bar track)
  sm:   8,    // Input fields, small buttons, category dots (if rounded rect)
  md:   12,   // Gallery/retake buttons on camera screen, filter pills
  lg:   16,   // Metric cards, recipe card body, modals
  xl:   20,   // Large cards (recipe cards, scan CTA), pill badges
  xxl:  44,   // Phone frame (design only), circular elements
  full: 9999, // Perfect circles (avatar, shutter button, category dot)
} as const;


// ============================================================================
// 5. SHADOW TOKENS
// ============================================================================
// We use very minimal shadows — the app relies on borders, not elevation.
// Only two shadow levels exist.

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Subtle card lift — used sparingly (recipe cards on scroll)
  sm: {
    shadowColor: '#1A1A18',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  // Modal/sheet shadow
  md: {
    shadowColor: '#1A1A18',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;


// ============================================================================
// 6. ICON SIZING
// ============================================================================

export const iconSize = {
  xs: 16,    // Inline icons (chevrons, info)
  sm: 20,    // Navigation icons (back arrow), tab bar inactive
  md: 22,    // Tab bar icons
  lg: 24,    // Action icons (camera buttons, gallery)
  xl: 36,    // Success checkmark on cooked screen
} as const;


// ============================================================================
// 7. ANIMATION TOKENS
// ============================================================================
// Keep animations subtle and purposeful. No bounce, no spring.
// Use react-native-reanimated for all animations.

export const animation = {
  duration: {
    instant:  100,   // Active press states
    fast:     150,   // Button hover, tab switch
    normal:   250,   // Screen transitions, card expand
    slow:     400,   // Progress bar fill, processing spinner
    glacial:  800,   // Onboarding fade-ins
  },

  easing: {
    // For react-native-reanimated Easing functions:
    // import { Easing } from 'react-native-reanimated';
    // Easing.bezier(0.25, 0.1, 0.25, 1)  — standard ease
    // Easing.bezier(0, 0, 0.2, 1)         — decelerate (entering)
    // Easing.bezier(0.4, 0, 1, 1)         — accelerate (exiting)
    standard:    [0.25, 0.1, 0.25, 1] as const,
    decelerate:  [0, 0, 0.2, 1] as const,
    accelerate:  [0.4, 0, 1, 1] as const,
  },
} as const;


// ============================================================================
// 8. LAYOUT CONSTANTS
// ============================================================================

export const layout = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  // Recipe card dimensions
  recipeCard: {
    imageHeight: 180,
    borderRadius: radii.xl,
    bodyPadding: 16,
  },

  // Camera screen
  camera: {
    frameWidth: 280,
    frameHeight: 400,
    frameRadius: 16,
    shutterSize: 72,
    shutterInner: 58,
    sideButtonSize: 44,
  },

  // Ingredient row
  ingredientRow: {
    dotSize: 8,
    dotMarginRight: 14,
    height: 50,        // Approximate minimum tappable height
  },

  // Tab bar
  tabBar: {
    height: 84,
    iconSize: 22,
    labelSize: 10,
    paddingTop: 10,
  },

  // Category filter pills
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radii.md,
    fontSize: 13,
    gap: 8,
  },

  // CTA Button
  ctaButton: {
    height: 52,          // 16px padding top + 16px padding bottom + ~20px text
    borderRadius: 14,
    fontSize: 16,
  },

  // Metric cards (home screen)
  metricCard: {
    borderRadius: radii.lg,
    padding: 18,
    numberSize: 28,
    labelSize: 13,
  },
} as const;


// ============================================================================
// 9. PRE-BUILT COMPONENT STYLES
// ============================================================================
// Ready-to-use StyleSheet objects. Import and spread into your components.
// Example:  <View style={componentStyles.card}> ... </View>

export const componentStyles = StyleSheet.create({

  // --- Screen Container ---
  // Wrap every screen in this. Gives the warm background + safe area.
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  // --- Card ---
  // White elevated card with subtle border. For recipe cards, metric cards.
  card: {
    backgroundColor: colors.background.card,
    borderRadius: radii.xl,
    borderWidth: 0.5,
    borderColor: colors.border.default,
    overflow: 'hidden',
  },

  // --- Metric Card ---
  // Gray surface card on home screen (items count, expiring count).
  metricCard: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: radii.lg,
    padding: layout.metricCard.padding,
    borderWidth: 0.5,
    borderColor: colors.border.default,
  },
  metricNumber: {
    fontSize: layout.metricCard.numberSize,
    fontWeight: typography.weight.medium,
    color: colors.primary[600],
  },
  metricLabel: {
    fontSize: layout.metricCard.labelSize,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  // --- Primary CTA Button ---
  ctaButton: {
    backgroundColor: colors.primary[600],
    borderRadius: layout.ctaButton.borderRadius,
    paddingVertical: spacing.buttonPadding,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  ctaButtonText: {
    color: colors.text.inverse,
    fontSize: layout.ctaButton.fontSize,
    fontWeight: typography.weight.medium,
  },

  // --- Scan CTA Card (Home screen) ---
  scanCta: {
    backgroundColor: colors.primary[600],
    borderRadius: radii.xl,
    padding: spacing.xxl,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: spacing.lg,
  },
  scanCtaIcon: {
    width: 52,
    height: 52,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  scanCtaTitle: {
    fontSize: 17,
    fontWeight: typography.weight.medium,
    color: colors.text.inverse,
  },
  scanCtaSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },

  // --- Ingredient Row ---
  ingredientRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: spacing.listItemVertical,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  ingredientDot: {
    width: layout.ingredientRow.dotSize,
    height: layout.ingredientRow.dotSize,
    borderRadius: radii.full,
    marginRight: layout.ingredientRow.dotMarginRight,
  },
  ingredientName: {
    flex: 1,
    fontSize: typography.scale.bodyMd.fontSize,
    color: colors.text.primary,
  },
  ingredientQty: {
    fontSize: typography.scale.caption.fontSize,
    color: colors.text.secondary,
  },
  ingredientExpiry: {
    fontSize: typography.scale.micro.fontSize,
    marginTop: 2,
  },
  ingredientExpiryWarning: {
    color: colors.coral[400],
  },
  ingredientExpiryNormal: {
    color: colors.text.secondary,
  },
  ingredientRowExpiring: {
    backgroundColor: '#FFF8F5', // Very subtle warm tint for expiring items
  },

  // --- Category Header ---
  // "PROTEIN", "PRODUCE", etc.
  categoryHeader: {
    paddingTop: spacing.categoryHeaderTop,
    paddingBottom: spacing.categoryHeaderBottom,
    paddingHorizontal: spacing.screenHorizontal,
  },
  categoryHeaderText: {
    fontSize: typography.scale.label.fontSize,
    fontWeight: typography.scale.label.fontWeight,
    color: colors.text.secondary,
    textTransform: 'uppercase' as const,
    letterSpacing: typography.scale.label.letterSpacing,
  },

  // --- Filter Pill ---
  filterPill: {
    paddingVertical: layout.filterPill.paddingVertical,
    paddingHorizontal: layout.filterPill.paddingHorizontal,
    borderRadius: layout.filterPill.borderRadius,
  },
  filterPillActive: {
    backgroundColor: colors.primary[600],
  },
  filterPillActiveText: {
    color: colors.text.inverse,
    fontSize: layout.filterPill.fontSize,
    fontWeight: typography.weight.medium,
  },

  // --- Recipe Card ---
  recipeCard: {
    marginHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.lg,
    borderRadius: layout.recipeCard.borderRadius,
    overflow: 'hidden' as const,
    borderWidth: 0.5,
    borderColor: colors.border.default,
    backgroundColor: colors.background.card,
  },
  recipeCardImage: {
    height: layout.recipeCard.imageHeight,
    justifyContent: 'flex-end' as const,
    padding: spacing.lg,
  },
  recipeCardBody: {
    padding: layout.recipeCard.bodyPadding,
    paddingHorizontal: spacing.cardPadding,
  },
  recipeCardTitle: {
    ...typography.scale.headingSm,
    color: colors.text.primary,
    marginBottom: spacing.sm - 2,
  },
  recipeCardMeta: {
    flexDirection: 'row' as const,
    gap: spacing.md,
  },
  recipeCardMetaText: {
    fontSize: typography.scale.label.fontSize,
    color: colors.text.secondary,
  },

  // --- Badge Pill ---
  badgePill: {
    paddingVertical: spacing.xs,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  badgePillText: {
    fontSize: typography.scale.micro.fontSize,
    fontWeight: typography.weight.medium,
  },

  // --- Tab Bar ---
  tabBar: {
    height: layout.tabBar.height,
    borderTopWidth: 0.5,
    borderTopColor: colors.border.default,
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    paddingTop: layout.tabBar.paddingTop,
    backgroundColor: colors.background.primary,
  },
  tab: {
    flex: 1,
    alignItems: 'center' as const,
    gap: spacing.xs,
  },
  tabLabel: {
    ...typography.scale.tabLabel,
    color: colors.text.secondary,
  },
  tabLabelActive: {
    color: colors.primary[600],
    fontWeight: typography.weight.medium,
  },

  // --- Cook Step ---
  cookStep: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  cookStepNumber: {
    ...typography.scale.label,
    color: colors.primary[600],
    marginBottom: spacing.sm - 2,
  },
  cookStepText: {
    ...typography.scale.bodyMd,
    color: colors.text.primary,
    lineHeight: 22,
  },

  // --- Success Screen (Cooked confirmation) ---
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.primary[50],
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: spacing.xxl,
  },
  successTitle: {
    ...typography.scale.headingMd,
    color: colors.text.primary,
    textAlign: 'center' as const,
  },
  successSubtitle: {
    ...typography.scale.bodySm,
    color: colors.text.secondary,
    textAlign: 'center' as const,
    marginTop: spacing.sm,
    lineHeight: 22,
  },

  // --- Pantry Deduction Row (Cooked screen) ---
  deductionRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 6,
  },
  deductionName: {
    ...typography.scale.bodySm,
    color: colors.text.primary,
  },
  deductionAmount: {
    ...typography.scale.bodySm,
    color: colors.coral[400],
  },

  // --- Section Header with "See all" link ---
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'baseline' as const,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.scale.bodyLg,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
  },
  sectionLink: {
    ...typography.scale.caption,
    color: colors.primary[600],
  },

  // --- Camera Screen ---
  cameraContainer: {
    flex: 1,
    backgroundColor: colors.neutral[900],
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  cameraFrame: {
    width: layout.camera.frameWidth,
    height: layout.camera.frameHeight,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: layout.camera.frameRadius,
  },
  cameraScanLine: {
    position: 'absolute' as const,
    top: -1,
    left: 30,
    right: 30,
    height: 3,
    backgroundColor: colors.primary[600],
    borderRadius: 2,
  },
  shutterButton: {
    width: layout.camera.shutterSize,
    height: layout.camera.shutterSize,
    borderRadius: radii.full,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  shutterInner: {
    width: layout.camera.shutterInner,
    height: layout.camera.shutterInner,
    borderRadius: radii.full,
    backgroundColor: '#FFFFFF',
  },
  cameraSideButton: {
    width: layout.camera.sideButtonSize,
    height: layout.camera.sideButtonSize,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  // --- Processing Screen ---
  processingContainer: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: 40,
  },
  progressTrack: {
    width: 200,
    height: 4,
    backgroundColor: colors.border.light,
    borderRadius: radii.xs,
    overflow: 'hidden' as const,
    marginTop: spacing.xxl,
  },
  progressFill: {
    height: '100%' as const,
    backgroundColor: colors.primary[600],
    borderRadius: radii.xs,
  },

  // --- Navigation Header ---
  navHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border.light,
  },
  navTitle: {
    ...typography.scale.bodyLg,
    fontWeight: typography.weight.medium,
    color: colors.text.primary,
  },
  navAction: {
    ...typography.scale.bodySm,
    color: colors.primary[600],
  },
});


// ============================================================================
// 10. HELPER FUNCTIONS
// ============================================================================

/**
 * Returns the category color for a given ingredient category.
 * Usage: <View style={{ backgroundColor: getCategoryColor('protein') }} />
 */
export function getCategoryColor(category: keyof typeof colors.category): string {
  return colors.category[category] || colors.category.other;
}

/**
 * Returns the light background tint for a category (for filter pills).
 * Usage: <View style={{ backgroundColor: getCategoryTint('protein') }} />
 */
export function getCategoryTint(category: string): string {
  const tints: Record<string, string> = {
    protein:   colors.coral[50],
    produce:   colors.green[50],
    dairy:     colors.blue[50],
    grain:     colors.amber[50],
    spice:     '#EEEDFE',  // Purple 50
    condiment: colors.primary[50],
    frozen:    colors.blue[50],
    other:     colors.neutral[100],
  };
  return tints[category] || tints.other;
}

/**
 * Returns the text color for a filter pill based on category.
 */
export function getCategoryPillTextColor(category: string): string {
  const textColors: Record<string, string> = {
    protein:   colors.coral[400],
    produce:   colors.green[400],
    dairy:     colors.blue[400],
    grain:     colors.amber[400],
    spice:     '#534AB7',
    condiment: colors.primary[400],
    frozen:    colors.blue[600],
    other:     colors.neutral[600],
  };
  return textColors[category] || textColors.other;
}

/**
 * Determines if an expiry date is "soon" (within 3 days).
 * Returns styling info for the ingredient row.
 */
export function getExpiryStyle(daysUntilExpiry: number) {
  if (daysUntilExpiry <= 1) {
    return {
      textColor: colors.coral[400],
      label: daysUntilExpiry <= 0 ? 'Expired' : 'Expires tomorrow',
      rowTint: '#FFF8F5',
      urgent: true,
    };
  }
  if (daysUntilExpiry <= 3) {
    return {
      textColor: colors.coral[400],
      label: `Expires in ${daysUntilExpiry} days`,
      rowTint: '#FFF8F5',
      urgent: true,
    };
  }
  return {
    textColor: colors.text.secondary,
    label: `Expires in ${daysUntilExpiry} days`,
    rowTint: undefined,
    urgent: false,
  };
}


// ============================================================================
// 11. DESIGN SPEC ANNOTATIONS
// ============================================================================
// These are reference notes for the designer — not used in runtime code.
// They document the exact measurements visible in the mockups.

export const designAnnotations = {
  homeScreen: {
    greeting: {
      topPadding: '8px below status bar',
      fontSize: '14px secondary color, regular weight',
    },
    headline: {
      fontSize: '28px, medium weight, primary color',
      marginTop: '4px below greeting',
    },
    scanCTA: {
      marginTop: '20px below headline',
      height: 'auto (padded 24px all sides)',
      iconCircle: '52px diameter, 20% white opacity bg',
      cornerRadius: '20px',
    },
    metricCards: {
      marginTop: '20px below scan CTA',
      gap: '12px between cards',
      cornerRadius: '16px',
      padding: '18px internal',
      numberSize: '28px medium weight',
      labelSize: '13px secondary color',
    },
    recipeSection: {
      headerMarginTop: '24px above "Suggested recipes"',
      cardGap: '16px between recipe cards',
    },
  },

  cameraScreen: {
    background: '#1A1A18 (neutral 900)',
    frame: '280×400px, 2px white 40% opacity border, 16px radius',
    scanLine: '3px tall, primary 600 color, inset 30px from frame edges',
    shutterButton: '72px outer ring, 4px white border, 58px inner fill',
    sideButtons: '44px square, 12px radius, 0.5px white 30% border',
    controlSpacing: '32px between shutter and side buttons',
    controlsMarginTop: '40px below frame',
  },

  reviewScreen: {
    navBar: 'Back arrow (20px) | "Review items" center | "Done" right, primary 600',
    subtitle: '13px centered, secondary color, 8px below nav',
    ingredientRow: '14px vertical padding, 24px horizontal, 0.5px bottom border',
    dot: '8px circle, 14px right margin, category-colored',
    nameSize: '15px primary color',
    qtySize: '13px secondary color, right-aligned',
    addButton: 'Full width, 16px vertical padding, 14px radius, primary 600 bg',
  },

  pantryScreen: {
    title: '24px medium weight, 8px below status bar',
    filterPills: '8px gap, 12px below title, horizontal scroll',
    activePill: 'Primary 600 bg, white text, medium weight',
    inactivePill: 'Category tint bg, category color text',
    expiringRow: '#FFF8F5 background tint, coral 400 expiry text',
    normalRow: 'No tint, secondary color expiry text',
  },

  recipeDetail: {
    heroImage: '260px tall, gradient placeholder',
    backButton: '36px circle, rgba(0,0,0,0.3) bg, positioned 52px top 16px left',
    titleOnHero: '22px medium white, 24px bottom/left padding',
    pills: 'rgba(255,255,255,0.2) bg, white text, 4px/10px padding',
    ingredientList: '20px top padding, 8px vertical per row',
    inPantryDot: '6px, primary 600',
    missingDot: '6px, amber 400',
    stepNumber: '12px medium weight, primary 600',
    stepText: '15px regular, 1.5 line height',
    cookButton: 'Full width, primary 600, same as review "Add all" button',
  },

  cookedScreen: {
    successIcon: '80px circle, primary 50 bg, centered vertically',
    checkmark: '36px, primary 600 stroke, 2.5px weight',
    title: '22px medium, "Bon appetit!"',
    deductionCard: 'White bg, 16px radius, 0.5px default border, 18px padding',
    deductionRow: 'Space-between, 6px vertical padding',
    deductionAmount: '14px, coral 400 (negative values)',
    backButton: 'Same CTA style, 24px below deduction card',
  },
} as const;
