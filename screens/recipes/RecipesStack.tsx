import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CookedScreen, RecipeDetailScreen, RecipesListScreen } from './index';

export const RecipesStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Recipes: {
      screen: RecipesListScreen,
      options: {
        gestureEnabled: true,
      },
      linking: { path: 'list' },
    },
    Recipe: {
      screen: RecipeDetailScreen,
      options: {
        gestureEnabled: false,  // Can't swipe back during OCR
        animation: 'fade',
      },
      linking: { path: 'details' },
    },
    Cooked: {
      screen: CookedScreen,
      options: {
        gestureEnabled: true,
        animation: 'slide_from_right',
      },
      linking: { path: 'cooked' },
    },
  },
});


