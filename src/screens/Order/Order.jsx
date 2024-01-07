import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { useRef, useState, useEffect, useContext, useCallback } from "react";
import { imagesDataURL, sampleOrder } from "../../static/data";
import styles from "./StyleOrder";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useScrollToTop } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { BASE_URL } from "../../../baseURL";
import Toast from "react-native-root-toast";
import theme from "../../config/theme";
import { AuthContext } from "../../context/AuthContext";
import ContentReceipt from "./components/ContentReceipt/ContentReceipt";
import ContentPrescription from "./components/ContentPrescription/ContentPrescription";

export default function Order({ navigation }) {
  const ref = useRef(null);

  useScrollToTop(ref);
  const { userId } = useContext(AuthContext);
  const [allReceipts, setAllReceipts] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [order, setOrder] = useState([]);

  const [status, setStatus] = useState("history_receipt");
  const [searchValue, setSearchValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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

  const handleClear = () => {
    setSearchValue("");
  };

  const handleReceipt = () => {
    setStatus("history_receipt");
    let items = allReceipts;
    if (searchValue.trim() !== "") {
      items = items.filter(
        (i) =>
          i.id.includes(searchValue.trim()) ||
          i.staff.fullName
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
      );
    }
    setOrder(items);
  };

  const handlePrescription = () => {
    setStatus("history_prescription");
    let items = allPrescriptions;
    if (searchValue.trim() !== "") {
      items = items.filter(
        (i) =>
          i.diagnose.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
          i.staff.fullName
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
      );
    }
    setOrder(items);
  };

  const handleSearchSubmit = () => {
    if (status === "history_receipt") {
      setOrder(() =>
        allReceipts.filter(
          (i) =>
            i.id.toString().includes(searchValue.trim()) ||
            i.staff.fullName
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase())
        )
      );
    } else {
      setOrder(() =>
        allPrescriptions.filter(
          (i) =>
            i.diagnose
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()) ||
            i.staff.fullName
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase())
        )
      );
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchValue("");
    setStatus("history_receipt");

    const fetchReceipt = async () => {
      try {
        const response = await fetch(`${BASE_URL}/me/receipts/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setAllReceipts(data.data);
          setOrder(data.data);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log("Không thể lấy dữ liệu!");
      }
    };

    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/me/prescriptions/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setAllPrescriptions(data.data);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log("Không thể lấy dữ liệu!");
      }
    };

    fetchReceipt();
    fetchPrescription();

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await fetch(`${BASE_URL}/me/receipts/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setAllReceipts(data.data);
          setOrder(data.data);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log("Không thể lấy dữ liệu!");
      }
    };

    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/me/prescriptions/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setAllPrescriptions(data.data);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log("Không thể lấy dữ liệu!");
      }
    };

    fetchReceipt();
    fetchPrescription();
  }, []);

  return (
    <ScrollView
      ref={ref}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ImageBackground
        source={{ uri: imagesDataURL[6] }}
        resizeMode="cover"
        style={styles.imgBg}
      >
        <View style={styles.containerTitleBg}>
          <MaterialCommunityIcons
            name="truck"
            size={80}
            color="rgba(131, 255, 225, 1)"
          />

          <Text style={styles.titleBg}>
            Nhận kê đơn từ quầy thuốc. Xem lại lịch sử mua thuốc, sản phẩm
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
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <FontAwesome5
                name="times-circle"
                size={20}
                color={"rgba(194, 193, 193, 1)"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.menu}>
        <Text
          style={[
            styles.text,
            status === "history_receipt" && styles.textHighlight,
          ]}
          onPress={handleReceipt}
        >
          Lịch sử hóa đơn
        </Text>

        <Text
          style={[
            styles.text,
            status === "history_prescription" && styles.textHighlight,
          ]}
          onPress={handlePrescription}
        >
          Lịch sử kê đơn
        </Text>
      </View>

      {status === "history_receipt" ? (
        <ContentReceipt data={order} navigation={navigation} />
      ) : (
        <ContentPrescription data={order} navigation={navigation} />
      )}
    </ScrollView>
  );
}
