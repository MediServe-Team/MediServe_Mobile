import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { sampleItem } from "../../../../static/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./StyleDetailItem";

export default function DetailItem({ route, navigation }) {
  const id = route.params.idItem;
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
    const result = sampleItem.find((i) => i.id === id);
    setData(result);
  }, []);

  return (
    <>
      {data && (
        <>
          <ScrollView
            scroll
            onScroll={handleScroll}
            ref={scrollRef}
            style={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <ImageBackground
              src={data.itemImage}
              style={styles.image}
              resizeMode="contain"
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={45}
                  color={"#b6bab7"}
                />
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.containerContent}>
              <View style={styles.containerLine}>
                <Text style={styles.title}>Tên thuốc:</Text>
                <Text style={styles.textContent}>
                  {data.itemName === "" ? "Không có" : data.itemName}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Danh mục:</Text>
                <Text style={styles.textContent}>
                  {data.categoryId === "" ? "Không có" : data.categoryId}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Số đăng ký:</Text>
                <Text style={styles.textContent}>
                  {data.registrationNumber === ""
                    ? "Không có"
                    : data.registrationNumber}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Dạng bào chế:</Text>
                <Text style={styles.textContent}>
                  {data.dosageForm === "" ? "Không có" : data.dosageForm}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Hàm lượng:</Text>
                <Text style={styles.textContent}>
                  {data.productContent === ""
                    ? "Không có"
                    : data.productContent}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Quy cách đóng gói:</Text>
                <Text style={styles.textContent}>
                  {data.packingSpecification === ""
                    ? "Không có"
                    : data.packingSpecification}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Tên hoạt chất:</Text>
                <Text style={styles.textContent}>
                  {data.chemicalName === "" ? "Không có" : data.chemicalName}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Đơn vị:</Text>
                <Text style={styles.textContent}>
                  {data.sellUnit === "" ? "Không có" : data.sellUnit}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Chức năng:</Text>
                <Text style={styles.textContent}>
                  {data.itemFunction === "" ? "Không có" : data.itemFunction}
                </Text>
              </View>
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
