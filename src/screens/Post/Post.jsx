import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import styles from "./StylePost";
import { imagesDataURL, sampleBlog } from "../../static/data";
import MUI from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState, useRef } from "react";
import CardBlog from "./Components/CardBlog/CardBlog";
import { useScrollToTop } from "@react-navigation/native";

export default function Post({ navigation }) {
  const [active, setActive] = useState(true);
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={ref}>
        <ImageBackground
          source={{ uri: imagesDataURL[3] }}
          resizeMode="cover"
          style={styles.imgBg}
        >
          <View style={styles.containerTitleBg}>
            <View style={{ alignItems: "center" }}>
              <MUI name="post" size={70} color="rgba(22, 149, 204, 1)" />
            </View>
            <Text style={styles.titleBg}>
              Blog chia sẻ kiến thức và kinh nghiệm về chăm sóc sức khỏe, duy
              trì lối sống lành mạnh
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.containerContent}>
          <Text style={styles.title}>Blogs</Text>

          <View style={{ gap: 30 }}>
            {sampleBlog.length > 0 &&
              sampleBlog.map((info, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Detailblog", { idBlog: info.id });
                  }}
                  style={[
                    styles.card,
                    Platform.OS === "ios" ? styles.cardIos : styles.cardAndroid,
                  ]}
                >
                  <CardBlog navigation={navigation} info={info} />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
