import { View, Text, StyleSheet } from "react-native";

export default function AuthStackNavigator() {
  return (
    <View style={styles.container}>
      <Text>AuthStackNavigator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "gray",
  },
});
