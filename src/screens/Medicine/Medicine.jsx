import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import styles from "./StyleMedicine";
import { imagesDataURL, sampleItem, sampleCategory } from "../../static/data";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import CardItem from "./components/CardItem/CardItem";
import { useScrollToTop } from "@react-navigation/native";

export default function Medicine({ navigation }) {
  const [listCategory, setListCategory] = useState(sampleCategory);
  const [listItem, setListItem] = useState(sampleItem);

  const [searchValue, setSearchValue] = useState("");

  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("Danh mục");

  const ref = useRef(null);
  useScrollToTop(ref);

  const handleAll = () => {
    setStatus("ALL");
  };

  const handleMedicine = () => {
    setStatus("MEDICINE");
  };

  const handleProduct = () => {
    setStatus("PRODUCT");
  };

  const handleSearchSubmit = () => {
    let items = sampleItem;

    if (status !== "ALL") {
      items = items.filter((i) => i.itemType === status);
    }

    if (category !== "Danh mục") {
      const c = listCategory.find((i) => i.categoryName === category);
      items = items.filter((i) => i.categoryId === c.id);
    }

    setListItem(() =>
      items.filter((i) =>
        i.itemName.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );
  };

  useEffect(() => {
    setCategory("Danh mục");
    let items = sampleItem;

    if (status === "ALL") {
      setListCategory(sampleCategory);
    } else if (status === "MEDICINE") {
      setListCategory(() =>
        sampleCategory.filter((i) => i.isMedicine === true)
      );
      items = items.filter((i) => i.itemType === "MEDICINE");
    } else {
      setListCategory(() =>
        sampleCategory.filter((i) => i.isMedicine === false)
      );
      items = items.filter((i) => i.itemType === "PRODUCT");
    }

    if (searchValue.trim() !== "") {
      items = items.filter((i) =>
        i.itemName.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }

    setListItem(items);
  }, [status]);

  useEffect(() => {
    let items = sampleItem;

    if (status !== "ALL") {
      items = items.filter((i) => i.itemType === status);
    }

    if (category !== "Danh mục") {
      const c = listCategory.find((i) => i.categoryName === category);
      items = items.filter((i) => i.categoryId === c.id);
    }

    if (searchValue.trim() !== "") {
      items = items.filter((i) =>
        i.itemName.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }

    setListItem(items);
  }, [category]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={ref}>
        <ImageBackground
          source={{ uri: imagesDataURL[5] }}
          resizeMode="cover"
          style={styles.imgBg}
        >
          <View style={styles.containerTitleBg}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={80}
              color="rgba(131, 255, 225, 1)"
            />

            <Text style={styles.titleBg}>
              Chứa thông tin chi tiết, đáng tin cậy về thuốc và sản phẩm khác
              thuốc
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
          </View>
        </View>

        <View style={styles.menu}>
          <Text
            style={[styles.text, status === "ALL" && styles.textHighlight]}
            onPress={handleAll}
          >
            Tất cả
          </Text>
          <Text
            style={[styles.text, status === "MEDICINE" && styles.textHighlight]}
            onPress={handleMedicine}
          >
            Thuốc
          </Text>
          <Text
            style={[styles.text, status === "PRODUCT" && styles.textHighlight]}
            onPress={handleProduct}
          >
            Khác
          </Text>
        </View>

        <View style={styles.containerDropdown}>
          <View style={{ backgroundColor: "rgba(242, 242, 242, 1)" }}>
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              dropdownIconColor="rgba(186, 186, 186, 1)"
              dropdownIconRippleColor="rgba(186, 186, 186, 1)"
              style={{ color: "#969696" }}
            >
              <Picker.Item label="Danh mục..." value="Danh mục" />
              {listCategory.length > 0 &&
                listCategory.map((i, index) => (
                  <Picker.Item
                    key={index}
                    label={i.categoryName}
                    value={i.categoryName}
                  />
                ))}
            </Picker>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {listItem.length > 0 &&
            listItem.map((info, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("DetailItem", { idItem: info.id });
                }}
                style={[
                  styles.card,
                  Platform.OS === "ios" ? styles.cardIos : styles.cardAndroid,
                ]}
              >
                <CardItem info={info} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
