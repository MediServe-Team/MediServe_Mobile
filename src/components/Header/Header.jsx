import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./StyleHeader";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navi = useNavigation();
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      <Text style={styles.headerText} onPress={() => navi.navigate("Home")}>
        MediServe
      </Text>
    </View>
  );
}
