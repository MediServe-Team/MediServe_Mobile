import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { sampleItem, sampleCategory } from "../../../../static/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./StyleDetailItem";
import { BASE_URL } from "../../../../../baseURL";
import theme from "../../../../config/theme";
import Toast from "react-native-root-toast";

export default function DetailItem({ route, navigation }) {
  const id = route.params.idItem;
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("");
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
    const fetchCategory = async (idCate) => {
      try {
        const response = await fetch(`${BASE_URL}/categories/${idCate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setCategory(data.data.categoryName);
        } else {
          toastFail("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        toastFail("Không thể lấy dữ liệu!");
      }
    };

    const fetchItem = async () => {
      try {
        const response = await fetch(`${BASE_URL}/items/filter`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const d = await response.json();
        if (d.status === 200 || d.status === 201) {
          const re = d.data.find((i) => i.id === id);
          if (re) {
            setData(re);
            fetchCategory(re?.categoryId);
          } else {
            toastFail("Không thể lấy dữ liệu!");
          }
        } else {
          toastFail("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        toastFail("Không thể lấy dữ liệu!");
      }
    };

    fetchItem();
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
                  {category === "" ? "Không có" : category}
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
                <Text style={[styles.textContent, { textAlign: "justify" }]}>
                  {data.itemFunction === "" ? "Không có" : data.itemFunction}
                </Text>
              </View>

              <View style={styles.containerLine}>
                <Text style={styles.title}>Ghi chú:</Text>
                <Text style={[styles.textContent, { textAlign: "justify" }]}>
                  {data.note === "" ? "Không có" : data.note}
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
