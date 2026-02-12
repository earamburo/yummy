export const Theme = {
  name: "Chef's Delight",

  colors: {
    // Primary - Vibrant chef green
    primary: {
      main: '#4CAF50',        // Vibrant green
      light: '#81C784',       // Light green
      dark: '#388E3C',        // Deep green
      contrast: '#FFFFFF',
    },

    // Secondary - Playful orange from hat band
    secondary: {
      main: '#FF8A50',        // Bright orange
      light: '#FFB27A',       // Soft orange
      dark: '#E5673A',        // Deep coral
      contrast: '#FFFFFF',
    },

    // Accent - Cheerful yellow
    accent: {
      main: '#FFD54F',        // Sunny yellow
      light: '#FFE082',
      dark: '#FFCA28',
    },

    // Background
    background: {
      default: '#FAFFFE',     // Crisp white with mint
      paper: '#FFFFFF',
      subtle: '#E8F5E9',      // Very light green
    },

    // Text
    text: {
      primary: '#1B5E20',     // Dark green
      secondary: '#4E7D50',   // Medium green
      disabled: '#A5C8A7',
      inverse: '#FFFFFF',
    },

    // Status
    status: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },

    // Freshness indicators
    freshness: {
      fresh: '#4CAF50',
      useSoon: '#FF9800',
      expiring: '#F44336',
    },

    // UI Elements
    border: '#C8E6C9',
    divider: '#E8F5E9',
    shadow: 'rgba(27, 94, 32, 0.15)',
  },

  spacing: {

  },
  // Gradients
  gradients: {
    primary: ['#81C784', '#4CAF50'],
    hero: ['#E8F5E9', '#C8E6C9'],
    accent: ['#FFE082', '#FFD54F'],
    card: ['#FFFFFF', '#FAFFFE'],
  },

  // Typography
  typography: {
    fontFamily: {
      heading: 'Quicksand-Bold',    // Playful, rounded
      body: 'Quicksand-Regular',
      accent: 'Quicksand-SemiBold',
    },
  },

  // Border Radius - Very rounded, playful
  borderRadius: {
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },

  // Shadows - More pronounced
  shadows: {
    sm: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 5,
    },
    lg: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 20,
      elevation: 10,
    },
  },

  container: {
    pageContainer: {
      height: '100vh',
      overflow: 'hidden'
    },
    loginPageContainer: {
      backgroundColor: '#4CAF50',
    },
    inputContainer: {
      backgroundColor: '#FFFFFF',
      marginLeft: 40,
      marginRight: 40,
      padding: 7,
      borderRadius: 5,
      marginTop: 20
    },
    logoContainer: {
      padding: 2,
      height: '50vh',
    },
    buttonContainer: {
      marginLeft: 60,
      marginRight: 60,
      padding: 7,
      borderRadius: 5,
      marginTop: 20, 
      textAlign: 'center'
    },
    buttonAlt: {
      backgroundColor: '#FF8A50'
    }
  },
  logo: {
    height: '50%',
    width: '50%',
    margin: 'auto'
  }
};

// ============================================
// THEME TYPE DEFINITION
// ============================================

export type AppTheme = typeof Theme;


// ============================================
// DEFAULT THEME
// ============================================

export const defaultTheme = Theme;