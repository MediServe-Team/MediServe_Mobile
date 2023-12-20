import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import styles from "./StyleCardBlog";
import { imagesDataURL } from "../../../../static/data";
import DetailBlog from "../DetailBlog/DetailBlog";

export default function CardBlog({ info }) {
  return (
    <>
      <Image src={info.image} style={styles.imgCard} />

      <View
        style={{
          paddingHorizontal: 15,
          gap: 15,
          paddingTop: 5,
        }}
      >
        <Text numberOfLines={2} style={styles.title}>
          {info.title}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Image style={styles.imgAuthor} src={info.imageAuthor} />
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              {info.nameAuthor}
            </Text>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "600",
                color: "rgba(140, 140, 140, 1)",
              }}
            >
              {info.datePost.toLocaleString("default", { day: "2-digit" }) +
                "/" +
                info.datePost.toLocaleString("default", { month: "2-digit" }) +
                "/" +
                info.datePost.toLocaleString("default", { year: "numeric" })}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
