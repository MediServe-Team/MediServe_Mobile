import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import styles from "./StyleCardBlog";
import { imagesDataURL } from "../../../../static/data";
import DetailBlog from "../DetailBlog/DetailBlog";

const BG_IMG_COLORS = {
  blue: ['#00B37D', '#1F98DC'],
  yellow: ['#DBD41E', '#B34000'],
  pink: ['#E9AFDC', '#C51BA0'],
  gray: ['#C8CECC', '#4A4C4D'],
  green: ['#A8FBB0', '#207518'],
  purple: ['#9C70A0', '#770865'],
};

export default function CardBlog({ info }) {
  return (
    <>
      {
        info?.image ?
        <LinearGradient colors={BG_IMG_COLORS[info.image]} style={styles.imgLinear}>
          <Text numberOfLines={5} ellipsizeMode="tail" style={styles.textStatus}>{info?.content}</Text>
        </LinearGradient>:
        <Image src={info?.BlogImages[0]?.imageUrl} style={styles.imgCard} />
      }

      <View
        style={{
          paddingHorizontal: 15,
          gap: 15,
          paddingTop: 5,
        }}
      >
        <Text numberOfLines={2} style={styles.title}>
          {info?.title}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Image style={styles.imgAuthor} src={info?.user?.avatar} />
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              {info?.user?.fullName}
            </Text>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "600",
                color: "rgba(140, 140, 140, 1)",
              }}
            >
              {new Date(info?.updatedAt).toLocaleString("default", {
                day: "2-digit",
              }) +
                "/" +
                new Date(info?.updatedAt).toLocaleString("default", {
                  month: "2-digit",
                }) +
                "/" +
                new Date(info?.updatedAt).toLocaleString("default", {
                  year: "numeric",
                })}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
