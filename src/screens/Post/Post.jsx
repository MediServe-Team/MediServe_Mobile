import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  RefreshControl,
} from "react-native";
import styles from "./StylePost";
import { imagesDataURL, sampleBlog } from "../../static/data";
import MUI from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState, useEffect, useRef, useCallback } from "react";
import CardBlog from "./Components/CardBlog/CardBlog";
import { useScrollToTop } from "@react-navigation/native";
import { BASE_URL } from "../../../baseURL";
import Toast from "react-native-root-toast";
import theme from "../../config/theme";

export default function Post({ navigation }) {
  const [active, setActive] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);
  const [listBlogs, setListBlogs] = useState([]);
  const ref = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useScrollToTop(ref);

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearchSubmit = () => {
    setListBlogs(() =>
      allBlogs.filter((i) =>
        i.title.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );
  };

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchValue("");

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
          setAllBlogs(data.data);
          setListBlogs(data.data);
        } else {
          toastFail("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        toastFail("Không thể lấy dữ liệu!");
      }
    };

    fetchData();

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

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
          setAllBlogs(data.data);
          setListBlogs(data.data);
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
      <ScrollView
        style={styles.scrollView}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        <View style={styles.searchSection}>
          <View style={styles.searchPallet}>
            <TouchableOpacity
              style={styles.searchIconArea}
              onPress={handleSearchSubmit}
            >
              <FontAwesome5
                name="search"
                size={20}
                color={"rgba(194, 193, 193, 1)"}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              value={searchValue}
              onChangeText={setSearchValue}
              onSubmitEditing={handleSearchSubmit}
            />

            {searchValue.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
              >
                <FontAwesome5
                  name="times-circle"
                  size={20}
                  color={"rgba(194, 193, 193, 1)"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

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
