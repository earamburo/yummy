import { colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, PantryScreen, RecipesScreen, ScanScreen } from '../screens/index';






export const AppStack = createBottomTabNavigator({
  screenOptions: {
    tabBarIconStyle: {
      height: 25
    },
    tabBarActiveTintColor: colors.primary[600],
    tabBarInactiveTintColor: 'gray',



  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return <Ionicons name='home' color={focused ? colors.primary[600] : colors.neutral[600]} size={20} />;
        },

      },
      linking: {
        path: '',
      },
    },
    Scan: {
      screen: ScanScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return <Ionicons name='camera' color={focused ? colors.primary[600] : colors.neutral[600]} size={20} />;
        }
      },
      linking: {
        path: 'scan',
      },
    },
    Pantry: {
      screen: PantryScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return <Ionicons name='basket' color={focused ? colors.primary[600] : colors.neutral[600]} size={20} />;
        }
      },
      linking: {
        path: 'pantry',

      },
    },
    Recipes: {
      screen: RecipesScreen,
      options: {
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return <Ionicons name='chatbubble' color={focused ? colors.primary[600] : colors.neutral[600]} size={20} />;
        }
      },
      linking: {
        path: 'recipes',
      },
    },
  },
});

