import { View, Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile/Profile";
import Header from "../components/Header/Header";
import Icon from "react-native-vector-icons/Entypo";
import { useState } from "react";

export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="FirstDrawer"
      screenOptions={{
        headerLeft: () => {
          return (
            <Icon
              name="menu"
              size={25}
              color="#ffff"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          );
        },
        headerTitle: () => <Header />,
        headerTitleContainerStyle: {
          width: "100%",
          marginHorizontal: 0,
        },
        headerLeftContainerStyle: {
          backgroundColor: "rgba(69, 152, 211, 1)",
          paddingLeft: 10,
        },
        headerRightContainerStyle: {
          backgroundColor: "rgba(69, 152, 211, 1)",
        },
      }}
    >
      <Drawer.Screen
        name="FirstDrawer"
        component={TabNavigator}
        options={{ title: "Trang chủ" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Thông tin cá nhân" }}
      />
    </Drawer.Navigator>
  );
}
