import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "../navigations/StackNavigator";
import DrawerNavigator from "../navigations/DrawerNavigator";
import TabNavigator from "../navigations/TabNavigator";

const Stack = createNativeStackNavigator();

export default RootComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="App" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
