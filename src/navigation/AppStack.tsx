import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, PantryScreen, RecipesScreen, ScanScreen } from '../screens/index';


export const AppStack = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false
      },
      linking: {
        path: '',
      },
    },
    Scan: {
      screen: ScanScreen,
      options: {
        headerShown: false
      },
      linking: {
        path: '/scan',
      },
    },
    Pantry: {
      screen: PantryScreen,
      options: {
        headerShown: false
      },
      linking: {
        path: '/pantry',
      },
    },
    Recipes: {
      screen: RecipesScreen,
      options: {
        headerShown: false
      },
      linking: {
        path: '/recipes',
      },
    },
  },
});

