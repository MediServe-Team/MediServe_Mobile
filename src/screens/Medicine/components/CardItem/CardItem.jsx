import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import styles from "./StyleCardItem";

export default function CardItem({ info }) {
  return (
    <View>
      <Image src={info.itemImage} style={styles.imgCard} />

      <View style={styles.containerInfo}>
        <Text numberOfLines={1} style={styles.itemName}>
          {info.itemName}
        </Text>

        <Text numberOfLines={1} style={styles.packingSpecification}>
          {info.packingSpecification}
        </Text>

        {info.registrationNumber !== "" && (
          <Text numberOfLines={1} style={styles.registrationNumber}>
            {info.registrationNumber}
          </Text>
        )}
      </View>
    </View>
  );
}
