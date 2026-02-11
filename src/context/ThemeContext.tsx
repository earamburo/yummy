import React, { createContext, ReactNode, useContext } from 'react';
import { Theme } from '../constants/theme';


interface ThemeContextType {
    theme: any;
    colors: any;
    spacing: any;
    borderRadius: any;
    shadows: any;
    typography: any;
    gradients: any;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) =>  {

    const value: ThemeContextType = {
        theme: Theme,
        colors: Theme.colors,
        spacing: Theme.spacing,
        borderRadius: Theme.borderRadius,
        shadows: Theme.shadows,
        typography: Theme.typography,
        gradients: Theme.gradients,
    };

    // interface ThemeContextType {
//     theme: typeof Theme;
//     colors: typeof Theme['colors'];
//     // spacing: typeof Theme['spacing'];
//     borderRadius: typeof Theme['borderRadius'];
//     shadows: typeof Theme['shadows'];
//     typography: typeof Theme['typography'];
//     gradients: typeof Theme['gradients'];
// }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}






// // ============================================
// // HOOKS
// // ============================================

// /**
//  * Main hook to access the full theme
//  * 
//  * @example
//  * ```tsx
//  * const { colors, spacing } = useTheme();
//  * 
//  * <View style={{ backgroundColor: colors.background.default, padding: spacing[4] }}>
//  * ```
//  */
// export function useTheme(): ThemeContextType {
//     const context = useContext(ThemeContext);
//     if (context === undefined) {
//         throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
// }

// /**
//  * Hook to access just colors
//  * 
//  * @example
//  * ```tsx
//  * const colors = useColors();
//  * <Text style={{ color: colors.text.primary }}>Hello</Text>
//  * ```
//  */
// export function useColors() {
//     const { colors } = useTheme();
//     return colors;
// }

// /**
//  * Hook to access just spacing
//  * 
//  * @example
//  * ```tsx
//  * const spacing = useSpacing();
//  * <View style={{ padding: spacing[4], margin: spacing[2] }} />
//  * ```
//  */
// export function useSpacing() {
//     const { spacing } = useTheme();
//     return spacing;
// }

// /**
//  * Hook to access just border radius
//  * 
//  * @example
//  * ```tsx
//  * const borderRadius = useBorderRadius();
//  * <View style={{ borderRadius: borderRadius.lg }} />
//  * ```
//  */
// export function useBorderRadius() {
//     const { borderRadius } = useTheme();
//     return borderRadius;
// }

// /**
//  * Hook to access just shadows
//  * 
//  * @example
//  * ```tsx
//  * const shadows = useShadows();
//  * <View style={{ ...shadows.md }} />
//  * ```
//  */
// export function useShadows() {
//     const { shadows } = useTheme();
//     return shadows;
// }

// /**
//  * Hook to access just typography
//  * 
//  * @example
//  * ```tsx
//  * const typography = useTypography();
//  * <Text style={{ fontSize: typography.sizes.lg }}>Title</Text>
//  * ```
//  */
// export function useTypography() {
//     const { typography } = useTheme();
//     return typography;
// }

// /**
//  * Hook to access gradients
//  * 
//  * @example
//  * ```tsx
//  * const gradients = useGradients();
//  * <LinearGradient colors={gradients.primary} />
//  * ```
//  */
// export function useGradients() {
//     const { gradients } = useTheme();
//     return gradients;
// }

// // ============================================
// // STYLED COMPONENT HELPER
// // ============================================

// /**
//  * Helper to create themed styles
//  * 
//  * @example
//  * ```tsx
//  * const styles = useThemedStyles((theme) => ({
//  *   container: {
//  *     backgroundColor: theme.colors.background.default,
//  *     padding: theme.spacing[4],
//  *     borderRadius: theme.borderRadius.lg,
//  *   },
//  *   title: {
//  *     color: theme.colors.text.primary,
//  *     fontSize: theme.typography.sizes['2xl'],
//  *   },
//  * }));
//  * ```
//  */
// export function useThemedStyles<T>(
//     styleFactory: (theme: Theme) => T
// ): T {
//     const { theme } = useTheme();
//     return styleFactory(theme);
// }

// export default ThemeProvider;