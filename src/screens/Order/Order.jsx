import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRef, useState } from "react";
import { imagesDataURL, sampleOrder } from "../../static/data";
import styles from "./StyleOrder";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useScrollToTop } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ContentOrder from "./components/ContentOrder/ContentOrder";

export default function Order({ navigation }) {
  const ref = useRef(null);
  useScrollToTop(ref);
  const [data, setData] = useState(sampleOrder);

  const [status, setStatus] = useState("wait_confirmed");
  const [searchValue, setSearchValue] = useState("");

  const [isSearched, setIsSearched] = useState(false);

  const handleClear = () => {
    setSearchValue("");
  };

  const handleWaitConfirmed = () => {
    setStatus("wait_confirmed");
  };

  const handleWaitOrdered = () => {
    setStatus("wait_ordered");
  };

  const handleReceived = () => {
    setStatus("received");
  };

  const handleCancelled = () => {
    setStatus("cancelled");
  };

  const handleSearchSubmit = () => {
    setIsSearched((pre) => !pre);
  };

  return (
    <ScrollView ref={ref} style={styles.scrollView}>
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
            status === "wait_confirmed" && styles.textHighlight,
          ]}
          onPress={handleWaitConfirmed}
        >
          Chờ xác nhận
        </Text>
        <Text
          style={[
            styles.text,
            status === "wait_ordered" && styles.textHighlight,
          ]}
          onPress={handleWaitOrdered}
        >
          Chờ giao hàng
        </Text>
        <Text
          style={[styles.text, status === "received" && styles.textHighlight]}
          onPress={handleReceived}
        >
          Đã giao
        </Text>
        <Text
          style={[styles.text, status === "cancelled" && styles.textHighlight]}
          onPress={handleCancelled}
        >
          Đã hủy
        </Text>
      </View>

      <ContentOrder
        status={status}
        data={data}
        setData={setData}
        searchValue={searchValue}
        isSearched={isSearched}
        navigation={navigation}
      />
    </ScrollView>
  );
}
