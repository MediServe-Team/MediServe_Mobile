import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/Home/Home";
import Chat from "../screens/Chat/Chat";
import {
  PostStackNavigator,
  MedicineStackNavigator,
  OrderStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "rgba(249, 249, 249, 1)",
        tabBarInactiveBackgroundColor: "rgba(249, 249, 249, 1)",
        tabBarActiveTintColor: "rgba(22, 149, 204, 1)",
        tabBarInactiveTintColor: "rgba(191, 191, 191, 1)",
        tabBarStyle: { height: 70, gap: 10 },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: { fontWeight: 600, fontSize: 14 },
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Nhà",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={25} color={color} />
          ),
        }}
      />

      {/* Post Tab */}
      <Tab.Screen
        name="Post"
        component={PostStackNavigator}
        options={{
          tabBarLabel: "Bài viết",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="post" size={25} color={color} />
          ),
        }}
      />

      {/* Chat Tab */}
      {/* <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Nhắn tin",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" size={25} color={color} />
          ),
        }}
      /> */}

      {/* Medicine Tab */}
      <Tab.Screen
        name="Medicine"
        component={MedicineStackNavigator}
        options={{
          tabBarLabel: "Thuốc",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="medical-bag"
              size={25}
              color={color}
            />
          ),
        }}
      />

      {/* Order Tab */}
      <Tab.Screen
        name="Order"
        component={OrderStackNavigator}
        options={{
          tabBarLabel: "Đơn",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="truck" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
