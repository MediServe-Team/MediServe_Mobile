import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "../navigations/AuthStackNavigator";
import MainTabNavigator from "../navigations/MainTabNavigator";

const Stack = createStackNavigator();

export default RootComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" component={AuthStackNavigator} />
        <Stack.Screen name="app" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
