import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import styles from "./StyleDetailOrder";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  sampleOrder,
  sampleDetailPrescriptionItem,
  sampleDetailReceiptItem,
} from "../../../../static/data";
import { formatNumber } from "../../../../utils/formatNumber";

export default function DetailOrder({ navigation, route }) {
  const idOrder = route.params.idOrder;
  const [dataOrder, setDataOrder] = useState();
  const [address, setAddress] = useState("48 Ông Ích Khiêm, Hải Châu, Đà Nẵng");

  const [itemOrder, setItemOrder] = useState();
  const [medicine, setMedicine] = useState();

  const renderTextByStatus = (status) => {
    switch (status) {
      case "wait_confirmed":
        return (
          <Text style={styles.textStatus}>Đang chờ người mua xác nhận</Text>
        );
        break;
      case "wait_ordered":
        return (
          <Text style={styles.textStatus}>
            Đã giao tới, chờ người mua nhận hàng
          </Text>
        );
        break;
      case "received":
        return (
          <Text style={[styles.textStatus, { color: "rgba(0, 218, 165, 1)" }]}>
            Đã nhận hàng
          </Text>
        );
        break;
      case "cancelled":
        return (
          <Text style={[styles.textStatus, { color: "rgba(255, 72, 47, 1)" }]}>
            Đã hủy
          </Text>
        );
        break;
      default:
        return null;
        break;
    }
  };

  useEffect(() => {
    setDataOrder(() => sampleOrder.find((i) => i.id === idOrder));
  }, []);

  useEffect(() => {
    if (dataOrder) {
      setItemOrder(() =>
        sampleDetailReceiptItem.filter((i) => i.receiptId === idOrder)
      );
      setMedicine(() =>
        sampleDetailPrescriptionItem.filter(
          (i) => i.prescriptionId === dataOrder.prescriptionId
        )
      );
    }
  }, [dataOrder]);

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
                name="truck-delivery-outline"
                size={30}
                color="rgba(22, 149, 204, 1)"
              />

              <View style={{ gap: 3, flex: 1 }}>
                <Text style={styles.textTitle}>Tình trạng đơn hàng</Text>
                {renderTextByStatus(dataOrder.status)}
              </View>
            </View>

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
                  Kê bởi: {dataOrder.staff}
                </Text>

                <Text style={styles.textDateTime} numberOfLines={1}>
                  Thời gian kê đơn:
                  {" " +
                    dataOrder.timeOrder.toLocaleTimeString("en-US", {
                      hour12: false,
                    })}
                </Text>

                <Text style={styles.textDateTime} numberOfLines={1}>
                  Ngày kê đơn:
                  {" " +
                    dataOrder.dateOrder.toLocaleString("default", {
                      day: "2-digit",
                    }) +
                    "/" +
                    dataOrder.dateOrder.toLocaleString("default", {
                      month: "2-digit",
                    }) +
                    "/" +
                    dataOrder.dateOrder.toLocaleString("default", {
                      year: "numeric",
                    })}
                </Text>
              </View>
            </View>
          </View>

          {itemOrder && (
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

              {itemOrder.map((i, index) => (
                <View style={styles.containerTitleInfo} key={index}>
                  <Text
                    style={[styles.textInfo, { width: "45%" }]}
                    numberOfLines={2}
                  >
                    {i.itemName}
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
                    {i.sellPrice}
                  </Text>
                  <Text
                    style={[styles.textInfo, { width: "25%" }]}
                    numberOfLines={1}
                  >
                    {i.totalPrice}
                  </Text>
                </View>
              ))}

              <Text style={[styles.textTitleInfo, { textAlign: "right" }]}>
                Tổng:{" "}
                {formatNumber(
                  itemOrder.reduce(
                    (accumulator, item) => accumulator + item.totalPrice,
                    0
                  )
                )}
                đ
              </Text>
            </View>
          )}

          {medicine && (
            <View style={styles.containerItem}>
              <Text style={styles.titleInfo}>Thông tin kê đơn</Text>
              <Text style={[styles.textTitleInfo, { fontStyle: "italic" }]}>
                Chẩn đoán: {dataOrder.name}
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

              {medicine.map((i, index) => (
                <View style={styles.containerTitleInfo} key={index}>
                  <Text
                    style={[styles.textInfo, { width: "45%" }]}
                    numberOfLines={2}
                  >
                    {i.itemName}
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
                    {i.sellPrice}
                  </Text>
                  <Text
                    style={[styles.textInfo, { width: "25%" }]}
                    numberOfLines={1}
                  >
                    {i.totalPrice}
                  </Text>
                </View>
              ))}

              <Text style={[styles.textTitleInfo, { textAlign: "right" }]}>
                Tổng:{" "}
                {formatNumber(
                  medicine.reduce(
                    (accumulator, item) => accumulator + item.totalPrice,
                    0
                  )
                )}
                đ
              </Text>
            </View>
          )}

          <View style={styles.containerPrice}>
            <Text style={styles.textPrice}>Tổng tiền:</Text>
            <Text style={styles.textPrice} numberOfLines={1}>
              {formatNumber(dataOrder.totalPrice)}đ
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
