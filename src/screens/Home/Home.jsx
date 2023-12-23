import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./StyleHome";
import { imagesDataURL } from "../../static/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";

export default function Home({ navigation }) {
  const [active, setActive] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={{ uri: imagesDataURL[2] }}
          resizeMode="cover"
          style={styles.imgBg}
        >
          <View style={styles.containerTitleBg}>
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="home-sharp"
                size={70}
                color="rgba(141, 224, 255, 1)"
              />
            </View>
            <Text style={styles.titleBg}>Chào mừng đến với MediServe</Text>
          </View>
        </ImageBackground>

        <View style={styles.containerContent}>
          <Text style={styles.title}>Trạng thái hoạt động</Text>

          <View style={styles.card}>
            <View style={styles.containerLogo}>
              <Image
                style={{ width: 38, height: 26 }}
                source={require("../../../assets/logo.png")}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: "700",
                    color: "rgba(22, 149, 204, 1)",
                    fontSize: 20,
                  },
                ]}
              >
                Quầy MediServe
              </Text>
            </View>

            <View style={styles.status}>
              <View style={styles.titleStatus}>
                <FontAwesome5 name="caret-right" size={25} color="#000" />
                <Text
                  style={[styles.text, { textDecorationLine: "underline" }]}
                >
                  Trạng thái:
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <FontAwesome5
                  solid={true}
                  name="circle"
                  size={13}
                  color={
                    active ? "rgba(33, 232, 161, 1)" : "rgba(252, 36, 3, 1)"
                  }
                />

                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 16,
                      color: active
                        ? "rgba(4, 222, 144, 1)"
                        : "rgba(252, 36, 3, 1)",
                    },
                  ]}
                >
                  {active ? "Đang hoạt động" : "Tạm ngưng hoạt động"}
                </Text>
              </View>
            </View>

            <View style={styles.titleStatus}>
              <FontAwesome5 name="caret-right" size={25} color="#000" />
              <Text style={[styles.text, { textDecorationLine: "underline" }]}>
                Mở cửa:
              </Text>
            </View>

            <View style={{ gap: 5, paddingLeft: 20 }}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 16, color: "rgba(22, 149, 204, 1)" },
                ]}
              >
                {"+ Ngày: Thứ hai - Thứ sáu"}
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontSize: 16, color: "rgba(22, 149, 204, 1)" },
                ]}
              >
                {"+ Giờ:     8h00 - 23h00"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.titleBtn}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
