import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import styles from "./StyleContentReceipt";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatNumber } from "../../../../utils/formatNumber";
import { BASE_URL } from "../../../../../baseURL";
import Toast from "react-native-root-toast";
import theme from "../../../../config/theme";

export default function ContentReceipt({ data, navigation }) {
  const [order, setOrder] = useState([]);

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

  const renderNoOrder = () => {
    return (
      <View style={styles.containerContent}>
        <MaterialCommunityIcons
          name="notebook-edit-outline"
          size={70}
          color="rgba(191, 191, 191, 1)"
        />
        <Text style={styles.textNoOrder}>Chưa có đơn hàng</Text>
      </View>
    );
  };

  const renderReceipt = (i, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => navigation.navigate("DetailReceipt", { idOrder: i.id })}
      >
        <View style={styles.containerInfo}>
          <View style={styles.containerLeft}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={require("../../../../../assets/logo.png")}
                style={{ width: 34, height: 22 }}
              />
              <Text style={styles.textName} numberOfLines={1}>
                {`Mã hóa đơn: ` + i.id}
              </Text>
            </View>
            <Text style={styles.textStaff} numberOfLines={1}>
              Kê bởi: {i.staff?.fullName}
            </Text>

            <Text style={styles.textTime} numberOfLines={1}>
              Thời gian kê đơn:
              {" " +
                new Date(i.createdAt).getUTCHours() +
                ":" +
                new Date(i.createdAt).getUTCMinutes() +
                ":" +
                new Date(i.createdAt).getUTCSeconds()}
            </Text>

            <Text style={styles.textDate} numberOfLines={1}>
              Ngày kê đơn:
              {" " +
                new Date(i.createdAt).getUTCDate() +
                "/" +
                (new Date(i.createdAt).getUTCMonth() + 1) +
                "/" +
                new Date(i.createdAt).getUTCFullYear()}
            </Text>
          </View>

          <View style={styles.containerRight}>
            <View style={[styles.contentRight, { borderBottomWidth: 1 }]}>
              <Text style={styles.titleRight}>Tổng tiền</Text>
              <Text style={styles.textRight} numberOfLines={1}>
                {formatNumber(i.totalPayment)}đ
              </Text>
            </View>

            <View style={[styles.contentRight, { borderTopWidth: 1 }]}>
              <Text style={styles.titleRight}>Tiền đã đưa</Text>
              <Text style={styles.textRight} numberOfLines={1}>
                {formatNumber(i.givenByCustomer)}đ
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return order.length > 0
      ? order.map((i, index) => renderReceipt(i, index))
      : renderNoOrder();
  };

  useEffect(() => {
    setOrder(data);
  }, [data]);

  return <View style={styles.container}>{renderContent()}</View>;
}
