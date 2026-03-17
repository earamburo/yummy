import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppStack } from "./navigation/AppStack";


const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: AppStack,
            options: {
                headerShown: false
            },
            linking: {
                path: ''
            },
            
        }
    }
});


type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
const Navigation = createStaticNavigation(RootStack);

const LinkingLoading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
    </View>
);

export const App = () => {
    return (
        <SafeAreaProvider>
            {/* <ThemeProvider> */}

                <Navigation
                    linking={{
                        enabled: 'auto',
                        prefixes: [],
                    }}
                    fallback={<LinkingLoading />} />
            {/* </ThemeProvider> */}
        </SafeAreaProvider>


    )
}