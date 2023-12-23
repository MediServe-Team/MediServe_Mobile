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

export default function DetailBlog({ route, navigation }) {
  const id = route.params.idBlog;
  const [data, setData] = useState(null);
  const [scrollDown, setScrollDown] = useState(false);
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

  useEffect(() => {
    const result = sampleBlog.filter((i) => i.id === id);
    setData(result[0]);
  }, []);

  return (
    <>
      {data && (
        <>
          <ScrollView
            scroll
            onScroll={handleScroll}
            ref={scrollRef}
            style={{ flex: 1 }}
          >
            <ImageBackground src={data.image} style={styles.image}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={45}
                  color={"#b6bab7"}
                />
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.containerContent}>
              <Text style={styles.title}>{data.title}</Text>

              <View style={styles.containerAuthor}>
                <View style={styles.author}>
                  <Image style={styles.imgAuthor} src={data.imageAuthor} />
                  <Text style={{ fontWeight: "600", fontSize: 15 }}>
                    {data.nameAuthor}
                  </Text>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.textDate}>
                    {data.datePost.toLocaleString("default", {
                      day: "2-digit",
                    }) +
                      "-" +
                      data.datePost.toLocaleString("default", {
                        month: "2-digit",
                      }) +
                      "-" +
                      data.datePost.toLocaleString("default", {
                        year: "numeric",
                      })}
                  </Text>
                </View>
              </View>

              {data.content.length > 0 &&
                data.content.map((i, index) => (
                  <Text style={styles.textContent} key={index}>
                    {i}
                  </Text>
                ))}
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
