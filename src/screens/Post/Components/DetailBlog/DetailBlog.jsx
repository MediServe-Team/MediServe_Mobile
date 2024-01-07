import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { sampleBlog } from "../../../../static/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./StyleDetailBlog";
import { BASE_URL } from "../../../../../baseURL";
import Toast from "react-native-root-toast";
import theme from "../../../../config/theme";

export default function DetailBlog({ route, navigation }) {
  const id = route.params.idBlog;
  const [info, setInfo] = useState(null);
  const [scrollDown, setScrollDown] = useState(false);
  const [mainImg, setMainImg] = useState("");
  const scrollRef = useRef();

  const goToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    if (contentOffset.y > 245) {
      setScrollDown(true);
    } else {
      setScrollDown(false);
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs/detail/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setInfo(data.data);
          if(data?.data?.BlogImages[0]){
            setMainImg(data.data.BlogImages[0].imageUrl)
          }
        } else {
          toastFail("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        toastFail("Không thể lấy dữ liệu!");
      }
    };

    fetchData();
  }, []);

  const handlePickImage = (value) => {
    setMainImg(value);
  }

  return (
    <>
      {info && (
        <>
          <ScrollView
            scroll
            onScroll={handleScroll}
            ref={scrollRef}
            style={{ flex: 1 }}
          >
            {
              (info?.BlogImages && info?.BlogImages.length > 0) ?
              <View>
                <ImageBackground src={mainImg} style={styles.image}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="arrow-back-circle-sharp"
                      size={45}
                      color={"#b6bab7"}
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <View style={styles.wrapListImg}>
                {
                  info.BlogImages.map((img, index) => 
                    <TouchableOpacity key={index} style={styles.imgTouchable} onPress={() => handlePickImage(img.imageUrl)}>
                      <ImageBackground src={img.imageUrl} style={styles.subImg}></ImageBackground>
                    </TouchableOpacity>)
                }
                </View>
              </View>
            :
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-circle-sharp"
                size={45}
                color={"#b6bab7"}
              />
            </TouchableOpacity>
            } 

            <View style={styles.containerContent}>
              <Text style={styles.title}>{info?.title}</Text>

              <View style={styles.containerAuthor}>
                <View style={styles.author}>
                  <Image style={styles.imgAuthor} src={info?.user?.avatar} />
                  <Text style={{ fontWeight: "600", fontSize: 15 }}>
                    {info?.user?.fullName}
                  </Text>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.textDate}>
                    {new Date(info?.updatedAt).toLocaleString("default", {
                      day: "2-digit",
                    }) +
                      "-" +
                      new Date(info?.updatedAt).toLocaleString("default", {
                        month: "2-digit",
                      }) +
                      "-" +
                      new Date(info?.updatedAt).toLocaleString("default", {
                        year: "numeric",
                      })}
                  </Text>
                </View>
              </View>

              {/* {info.content.length > 0 &&
                data.content.map((i, index) => (
                  <Text style={styles.textContent} key={index}>
                    {i}
                  </Text>
                ))} */}
              <Text style={styles.textContent}>{info.content}</Text>
            </View>
          </ScrollView>

          {scrollDown && (
            <TouchableOpacity style={styles.btnTop} onPress={goToTop}>
              <Ionicons
                name="caret-up-circle-outline"
                size={50}
                color="#bdbdbd"
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
}
