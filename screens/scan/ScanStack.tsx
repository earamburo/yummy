import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CameraScreen, ProcessingScreen, ReviewScreen } from './index';


export const ScanStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Camera: {
      screen: CameraScreen,
      options: {
        gestureEnabled: true,
      },
      linking: { path: 'camera' },
    },
    Processing: {
      screen: ProcessingScreen,
      options: {
        gestureEnabled: false,  // Can't swipe back during OCR
        animation: 'fade',
      },
      linking: { path: 'processing' },
    },
    Review: {
      screen: ReviewScreen,
      options: {
        gestureEnabled: true,
        animation: 'slide_from_right',
      },
      linking: { path: 'review' },
    },
  },
});