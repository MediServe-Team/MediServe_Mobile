import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "../navigations/AuthStackNavigator";
import MainTabNavigator from "../navigations/MainTabNavigator";

const Stack = createStackNavigator();

export default RootComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="App" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
