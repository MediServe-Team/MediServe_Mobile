import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons.js";
import AntDesign from "react-native-vector-icons/AntDesign.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5.js";
import { View, Text } from "react-native";
import Home from "../screens/Home/Home";
import Post from "../screens/Post/Post";
import Chat from "../screens/Chat/Chat";
import Medicine from "../screens/Medicine/Medicine";
import Order from "../screens/Order/Order";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#223F30",
        tabBarInactiveBackgroundColor: "#223F30",
        tabBarActiveTintColor: "#fcd360",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: { height: 60 },
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Nhà",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={22} color={color} />
          ),
        }}
      />

      {/* Post Tab */}
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: "Bài viết",
          tabBarIcon: ({ color }) => (
            <AntDesign name="clockcircle" size={22} color={color} />
          ),
        }}
      />

      {/* Chat Tab */}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Nhắn tin",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-stats-chart" size={22} color={color} />
          ),
        }}
      />

      {/* Medicine Tab */}
      <Tab.Screen
        name="Medicine"
        component={Medicine}
        options={{
          tabBarLabel: "Thuốc",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={22} color={color} />
          ),
        }}
      />

      {/* Order Tab */}
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: "Đơn",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
