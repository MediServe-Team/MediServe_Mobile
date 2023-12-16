import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./StyleHeader";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      <Text style={styles.headerText}>MediServe</Text>
    </View>
  );
}
