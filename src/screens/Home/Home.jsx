import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Move to Login"
        onPress={() => {
          navigation.navigate("Auth");
        }}
      />
    </View>
  );
}
