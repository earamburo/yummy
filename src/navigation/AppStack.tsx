import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home';


export const AppStack = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      linking: {
        path: '',
      },
    },
  },
});

