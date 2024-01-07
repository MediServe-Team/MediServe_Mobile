import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Signup from "../screens/Signup/Signup";
import Blog from "../screens/Post/Post";
import DetailBlog from "../screens/Post/Components/DetailBlog/DetailBlog";
import Item from "../screens/Medicine/Medicine";
import DetailItem from "../screens/Medicine/components/DetailItem/DetailItem";
import Order from "../screens/Order/Order";
import DetailReceipt from "../screens/Order/components/DetailReceipt/DetailReceipt";
import DetailPrescription from "../screens/Order/components/DetailPrescription/DetailPrescription";

const Stack = createNativeStackNavigator();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export function PostStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Blog"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="Detailblog" component={DetailBlog} />
    </Stack.Navigator>
  );
}

export function MedicineStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Item"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen name="DetailItem" component={DetailItem} />
    </Stack.Navigator>
  );
}

export function OrderStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ListOrder"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ListOrder" component={Order} />
      <Stack.Screen name="DetailReceipt" component={DetailReceipt} />
      <Stack.Screen name="DetailPrescription" component={DetailPrescription} />
    </Stack.Navigator>
  );
}
