import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppStack } from "./navigation/AppStack";
import { ScanStack } from "./screens";

/*
 * 
 * This is React Navigation v7's "static" API. 
 * Instead of the v6 pattern where you write <Stack.Navigator><Stack.Screen ... /></Stack.Navigator> in JSX, you define your screens as a plain config object. 
 * The navigator itself is created outside of any component, which is why it can be used to extract type information statically.
 */
const RootStack = createNativeStackNavigator({
    screens: {
        Main: {
            screen: AppStack,
            options: {
                headerShown: false,
            },
            linking: {
                path: ''
            },
        },
        Scan: {
            screen: ScanStack,
            options: {
                headerShown: false,
                presentation: 'modal'
            },
            linking: {
                path: 'scan-tab'
            },
        }
    }
});


/** This extracts the TypeScript types from your navigator config automatically. 
 * Instead of manually writing { Home: undefined }, the StaticParamList utility infers it from the config you already defined. 
 * So your param types stay in sync with your screen definitions without duplication. */

type RootStackParamList = StaticParamList<typeof RootStack>;

/**
 *  This is a TypeScript module augmentation. 
 * It tells React Navigation "whenever you see a navigation prop or useNavigation() anywhere in the app, use these param types." 
 * Without it, navigation.navigate('Home') wouldn't be type-checked. With it, you get autocomplete and errors if you try to navigate to a screen that doesn't exist.
 * 
 */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
/**
 * 
 * This converts the static config into an actual React component you can render.
 * It wraps everything in a NavigationContainer internally, which is why you don't need to add one yourself. 
 * The returned Navigation component takes no props — all config (screens, linking, options) is already baked into the static definition.
 */

const Navigation = createStaticNavigation(RootStack);

const LinkingLoading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
    </View>
);

export const App = () => {
    return (
        <SafeAreaProvider>
            <Navigation
                linking={{
                    enabled: 'auto',
                    prefixes: [],
                }}
            />
        </SafeAreaProvider>


    )
}