import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import RootComponent from "./src/screens/index";

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="black" />
        <RootComponent />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
