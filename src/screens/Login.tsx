import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from "react-native";
import { useTheme } from '../context/ThemeContext';

export const LoginScreen = () => {
      const navigation = useNavigation();
      const { theme }  = useTheme();

    return (
        <View>
            <Text>Login</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
                color={theme.colors.primary.main}
            />
        </View>
    )

}