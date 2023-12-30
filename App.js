import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import RootComponent from "./src/screens/RootComponent";
import { RootSiblingParent } from "react-native-root-siblings";

import React from "react";

export default function App() {
  return (
    <AuthProvider>
      <RootSiblingParent style={styles.container}>
        <StatusBar style="auto" />
        <RootComponent />
      </RootSiblingParent>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
