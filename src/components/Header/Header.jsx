import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./StyleHeader";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navi = useNavigation();
  return (
    <TouchableOpacity
      style={styles.header}
      onPress={() => navi.navigate("Home")}
      activeOpacity={1}
    >
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      <Text style={styles.headerText}>MediServe</Text>
    </TouchableOpacity>
  );
}
