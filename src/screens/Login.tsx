import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from "react-native";

export const LoginScreen = () => {
      const navigation = useNavigation();

    return (
        <View>
            <Text>Login</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )

}