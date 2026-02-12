import { useNavigation } from '@react-navigation/native';
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from '../context/ThemeContext';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const { theme, colors, spacing, container, logo } = useTheme();

    return (
        <View style={[container.pageContainer, container.loginPageContainer]} id='login-page-container'>
            <View style={container.logoContainer} id='logo-container'>
                <Image
                    style={logo}
                    source={require("../../assets/images/splash-icon.png")}
                />
            </View>
            <Text style={{fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 24}}>Let's Start Cooking!</Text>
            <TextInput
                style={container.inputContainer}
                placeholder="Username"
            // value={user.username}
            // onChangeText={(username) => setUser({ ...user, username })}
            />
            <TextInput
                style={container.inputContainer}
                placeholder="Password"
            // value={user.password}
            // onChangeText={(password) => setUser({ ...user, password })}
            />

            {/* {state.error && (
                <Text style={formStyles.errorText}>{state.error}</Text>
            )} */}

            <TouchableOpacity
                style={[container.buttonContainer, container.buttonAlt]}
                // onPress={handleLogin}
                // disabled={state.isLoading}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )

}