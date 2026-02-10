import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from "react-native";
import { AppStack } from "./navigation/AppStack";
import { LoginScreen } from "./screens/Login";


const RootStack = createNativeStackNavigator({
    screens: {
        Login: {
            screen: LoginScreen,
            linking: {
                path: 'login'
            }
        },
        Home: {
            screen: AppStack,
            linking: {
                path: 'home'
            }
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
        <Navigation
            linking={{
                enabled: 'auto',
                prefixes: [],
            }}
            fallback={<LinkingLoading />} />
    )
}