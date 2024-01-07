import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect, useContext } from "react";
import styles from "./StyleDetailPrescription";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  sampleOrder,
  sampleDetailPrescriptionItem,
  sampleDetailReceiptItem,
} from "../../../../static/data";
import { formatNumber } from "../../../../utils/formatNumber";
import { BASE_URL } from "../../../../../baseURL";
import { AuthContext } from "../../../../context/AuthContext";

export default function DetailPrescription({ navigation, route }) {
  const [medicines, setMedicines] = useState([]);
  const [dataOrder, setDataOrder] = useState();
  const { userId } = useContext(AuthContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/me/prescriptions/${route.params.idOrder}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setDataOrder(data.data);
          setMedicines(data.data.MedicineGuideSells);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/customer/my-profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          setAddress(data.data.address);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchAddress();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerGoBack}>
        <TouchableOpacity
          style={styles.containerIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="rgba(69, 152, 211, 1)"
          />
        </TouchableOpacity>

        <Text style={styles.title}>Chi tiết đơn hàng</Text>
      </View>

      {dataOrder && (
        <View style={{ gap: 20 }}>
          <View>
            <View style={styles.containerFirst}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                size={30}
                color="rgba(22, 149, 204, 1)"
              />

              <View style={{ gap: 3, flex: 1 }}>
                <Text style={styles.textTitle}>Địa chỉ nhận hàng</Text>
                <Text
                  style={[
                    styles.text,
                    { color: "rgba(160, 160, 160, 1)", lineHeight: 20 },
                  ]}
                  numberOfLines={3}
                >
                  {address}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.containerFirst,
                { paddingHorizontal: 20, gap: 17 },
              ]}
            >
              <FontAwesome5Icon
                name="notes-medical"
                size={25}
                color="rgba(22, 149, 204, 1)"
              />

              <View style={{ gap: 3, flex: 1 }}>
                <Text style={styles.textTitle} numberOfLines={1}>
                  Kê bởi: {dataOrder.staff?.fullName}
                </Text>

                <Text style={styles.textDateTime} numberOfLines={1}>
                  Thời gian kê đơn:
                  {" " +
                    new Date(dataOrder.createdAt).getUTCHours() +
                    ":" +
                    new Date(dataOrder.createdAt).getUTCMinutes() +
                    ":" +
                    new Date(dataOrder.createdAt).getUTCSeconds()}
                </Text>

                <Text style={styles.textDateTime} numberOfLines={1}>
                  Ngày kê đơn:
                  {" " +
                    new Date(dataOrder.createdAt).getUTCDate() +
                    "/" +
                    (new Date(dataOrder.createdAt).getUTCMonth() + 1) +
                    "/" +
                    new Date(dataOrder.createdAt).getUTCFullYear()}
                </Text>
              </View>
            </View>
          </View>

          {medicines && (
            <View style={styles.containerItem}>
              <Text style={styles.titleInfo}>Thông tin kê đơn</Text>
              <Text style={[styles.textTitleInfo, { fontStyle: "italic" }]}>
                Chẩn đoán:{" "}
                <Text style={[styles.textInfo, { fontStyle: "italic" }]}>
                  {dataOrder.diagnose}
                </Text>
              </Text>

              <View style={styles.containerTitleInfo}>
                <Text style={[styles.textTitleInfo, { width: "45%" }]}>
                  Tên thuốc
                </Text>
                <Text style={[styles.textTitleInfo, { width: "10%" }]}>SL</Text>
                <Text style={[styles.textTitleInfo, { width: "20%" }]}>
                  Giá
                </Text>
                <Text style={[styles.textTitleInfo, { width: "25%" }]}>
                  Thành tiền
                </Text>
              </View>

              {medicines.map((i, index) => (
                <View style={styles.containerTitleInfo} key={index}>
                  <Text
                    style={[styles.textInfo, { width: "45%", paddingRight: 2 }]}
                    numberOfLines={4}
                  >
                    {`${i.medicine.item.itemName}\n`}
                    <Text
                      style={{ color: "#757678" }}
                    >{`${i.medicine.item.packingSpecification}`}</Text>
                  </Text>
                  <Text
                    style={[styles.textInfo, { width: "10%" }]}
                    numberOfLines={1}
                  >
                    {i.quantity}
                  </Text>
                  <Text
                    style={[styles.textInfo, { width: "20%" }]}
                    numberOfLines={1}
                  >
                    {i.medicine.sellPrice}
                  </Text>
                  <Text
                    style={[styles.textInfo, { width: "25%" }]}
                    numberOfLines={1}
                  >
                    {i.totalPrice}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ gap: 2 }}>
            <View style={styles.containerPrice}>
              <Text style={styles.textPrice}>Tổng tiền:</Text>
              <Text style={styles.textPrice} numberOfLines={1}>
                {formatNumber(
                  dataOrder.MedicineGuideSells.reduce(
                    (accumulator, item) => accumulator + item.totalPrice,
                    0
                  )
                )}
                đ
              </Text>
            </View>

            <View style={[styles.containerPrice, { flexDirection: "column" }]}>
              <Text
                style={[styles.textPrice, { color: "rgba(69, 152, 211, 1)" }]}
              >
                Ghi chú:
              </Text>
              <Text style={{ fontSize: 15 }}>
                {`  ${dataOrder?.note === "" ? "Không có" : dataOrder.note}`}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
