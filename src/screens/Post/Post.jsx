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
import { useState, useEffect, useRef } from "react";
import CardBlog from "./Components/CardBlog/CardBlog";
import { useScrollToTop } from "@react-navigation/native";
import { BASE_URL } from "../../../baseURL";
import Toast from "react-native-root-toast";
import theme from "../../config/theme";

export default function Post({ navigation }) {
  const [active, setActive] = useState(true);
  const [listBlogs, setListBlogs] = useState([]);
  const ref = useRef(null);

  useScrollToTop(ref);

  const toastFail = (mess) => {
    Toast.show(mess, {
      duration: 1000,
      delay: 500,
      backgroundColor: theme.colors.danger,
      textColor: "#fff",
      textStyle: { fontWeight: "500" },
      position: -40,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs/view-all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setListBlogs(data.data.filter((i) => i.visibility === true));
        } else {
          toastFail("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        toastFail("Không thể lấy dữ liệu!");
      }
    };

    fetchData();
  }, []);

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
            {listBlogs.length > 0 &&
              listBlogs.map((info, index) => (
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
