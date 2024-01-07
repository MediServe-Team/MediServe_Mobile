import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect, useContext } from "react";
import styles from "./StyleDetailReceipt";
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

export default function DetailReceipt({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [pres, setPres] = useState();
  const [dataOrder, setDataOrder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/receipts/detail/${route.params.idOrder}`,
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
          setItems(data.data.DetailReceiptItems);
          setPres(data.data.DetailReceiptPrescriptions[0]);
        } else {
          console.log("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
                  {dataOrder.customer.address}
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

          {items.length > 0 && (
            <View style={styles.containerItem}>
              <Text style={styles.titleInfo}>Thông tin sản phẩm</Text>

              <View style={styles.containerTitleInfo}>
                <Text style={[styles.textTitleInfo, { width: "45%" }]}>
                  Tên sản phẩm
                </Text>
                <Text style={[styles.textTitleInfo, { width: "10%" }]}>SL</Text>
                <Text style={[styles.textTitleInfo, { width: "20%" }]}>
                  Giá
                </Text>
                <Text style={[styles.textTitleInfo, { width: "25%" }]}>
                  Thành tiền
                </Text>
              </View>

              {items.map((i, index) => (
                <View style={styles.containerTitleInfo} key={index}>
                  <Text
                    style={[styles.textInfo, { width: "45%", paddingRight: 2 }]}
                    numberOfLines={4}
                  >
                    {`${i.itemInStock.item.itemName}\n`}
                    <Text
                      style={{ color: "#757678" }}
                    >{`${i.itemInStock.item.packingSpecification}`}</Text>
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
                    {i.itemInStock.sellPrice}
                  </Text>
                  <Text
                    style={[styles.textInfo, { width: "25%" }]}
                    numberOfLines={1}
                  >
                    {i.totalPrice}
                  </Text>
                </View>
              ))}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textTitleInfo}>Tổng:</Text>

                <Text style={styles.textTitleInfo}>
                  {formatNumber(
                    items.reduce(
                      (accumulator, item) => accumulator + item.totalPrice,
                      0
                    )
                  )}
                  đ
                </Text>
              </View>
            </View>
          )}

          {pres && (
            <View style={styles.containerItem}>
              <Text style={styles.titleInfo}>Thông tin kê đơn</Text>
              <Text style={[styles.textTitleInfo, { fontStyle: "italic" }]}>
                Chẩn đoán:{" "}
                <Text style={[styles.textInfo, { fontStyle: "italic" }]}>
                  {pres.prescription.diagnose}
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

              {pres.prescription?.MedicineGuideSells.map((i, index) => (
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.textTitleInfo}>Tổng:</Text>

                <Text style={styles.textTitleInfo}>
                  {formatNumber(pres.totalPrice)}đ
                </Text>
              </View>
            </View>
          )}

          <View style={{ gap: 2 }}>
            <View style={styles.containerPrice}>
              <Text style={styles.textPrice}>Tổng tiền:</Text>
              <Text style={styles.textPrice} numberOfLines={1}>
                {formatNumber(dataOrder.totalPayment)}đ
              </Text>
            </View>

            <View style={styles.containerPrice}>
              <Text style={styles.textPrice}>Tiền đã đưa:</Text>
              <Text style={styles.textPrice} numberOfLines={1}>
                {formatNumber(dataOrder.givenByCustomer)}đ
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
