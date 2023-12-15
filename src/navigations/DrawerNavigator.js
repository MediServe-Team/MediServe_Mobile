import { View, Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile/Profile";
import Chat from "../screens/Chat/Chat";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      //screenOptions={{ headerShown: false }}
      initialRouteName="MediServe"
    >
      <Drawer.Screen name="MediServe" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
