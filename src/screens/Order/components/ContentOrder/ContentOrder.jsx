import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import styles from "./StyleContentOrder";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatNumber } from "../../../../utils/formatNumber";

export default function ContentOrder({
  status,
  data,
  searchValue,
  isSearched,
  navigation,
}) {
  const [confirm, setConfirm] = useState([]);
  const [order, setOrder] = useState([]);
  const [receive, setReceive] = useState([]);
  const [cancel, setCancel] = useState([]);

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

  const renderConfirm = (i, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => navigation.navigate("DetailOrder", { idOrder: i.id })}
      >
        <View style={styles.containerInfo}>
          <View style={styles.containerLeft}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={require("../../../../../assets/logo.png")}
                style={{ width: 34, height: 22 }}
              />
              <Text style={styles.textName} numberOfLines={1}>
                {i.name}
              </Text>
            </View>
            <Text style={styles.textStaff} numberOfLines={1}>
              Kê bởi: {i.staff}
            </Text>

            <Text style={styles.textTime} numberOfLines={1}>
              Thời gian kê đơn:
              {" " + i.timeOrder.toLocaleTimeString("en-US", { hour12: false })}
            </Text>

            <Text style={styles.textDate} numberOfLines={1}>
              Ngày kê đơn:
              {" " +
                i.dateOrder.toLocaleString("default", { day: "2-digit" }) +
                "/" +
                i.dateOrder.toLocaleString("default", { month: "2-digit" }) +
                "/" +
                i.dateOrder.toLocaleString("default", { year: "numeric" })}
            </Text>
          </View>

          <View style={styles.containerRight}>
            <View style={[styles.contentRight, { borderBottomWidth: 1 }]}>
              <Text style={styles.titleRight}>Tổng cộng</Text>
              <Text style={styles.textRight} numberOfLines={1}>
                {i.numItems} sản phẩm
              </Text>
            </View>

            <View style={[styles.contentRight, { borderTopWidth: 1 }]}>
              <Text style={styles.titleRight}>Thành tiền</Text>
              <Text style={styles.textRight} numberOfLines={1}>
                {formatNumber(i.totalPrice)}đ
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerStatus}>
          <Text style={styles.textStatus}>Đang chờ người mua xác nhận</Text>
        </View>

        <View style={styles.containerBtn}>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => handleCancel(i.id)}
          >
            <Text style={[styles.textBtn, { color: "#fff" }]}>HỦY ĐƠN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnAccept}
            onPress={() => handleConfirm(i.id)}
          >
            <Text style={[styles.textBtn, { color: "#000" }]}>XÁC NHẬN</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrder = (i, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => navigation.navigate("DetailOrder", { idOrder: i.id })}
      >
        <View style={styles.containerInfo}>
          <View style={styles.containerLeft}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={require("../../../../../assets/logo.png")}
                style={{ width: 34, height: 22 }}
              />
              <Text style={styles.textName} numberOfLines={1}>
                {i.name}
              </Text>
            </View>
            <Text style={styles.textStaff} numberOfLines={1}>
              Kê bởi: {i.staff}
            </Text>

            <Text style={styles.textTime} numberOfLines={1}>
              Thời gian kê đơn:
              {" " + i.timeOrder.toLocaleTimeString("en-US", { hour12: false })}
            </Text>

            <Text style={styles.textDate} numberOfLines={1}>
              Ngày kê đơn:
              {" " +
                i.dateOrder.toLocaleString("default", { day: "2-digit" }) +
                "/" +
                i.dateOrder.toLocaleString("default", { month: "2-digit" }) +
                "/" +
                i.dateOrder.toLocaleString("default", { year: "numeric" })}
            </Text>
          </View>

          <View style={styles.containerRight}>
            <View style={[styles.contentRight, { borderBottomWidth: 1 }]}>
              <Text style={styles.titleRight}>Tổng cộng</Text>
              <Text style={styles.textRight} numberOfLines={1}>
                {i.numItems} sản phẩm
              </Text>
            </View>

            <View style={[styles.contentRight, { borderTopWidth: 1 }]}>
              <Text style={styles.titleRight}>Thành tiền</Text>
              <Text style={styles.textRight} numberOfLines={1}>
                {formatNumber(i.totalPrice)}đ
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerStatus}>
          <Text style={styles.textStatus}>Đơn hàng đã giao tới tận nhà</Text>
        </View>

        <View style={styles.containerBtn}>
          <Text
            style={[
              styles.textBtn,
              { color: "rgba(180, 180, 180, 1)", textAlignVertical: "center" },
            ]}
          >
            Đang chờ người mua nhận hàng
          </Text>

          <TouchableOpacity
            style={styles.btnAccept}
            onPress={() => handleReceive(i.id)}
          >
            <Text style={[styles.textBtn, { color: "#000" }]}>ĐÃ NHẬN</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    switch (status) {
      case "history_receipt":
        return confirm.length > 0
          ? confirm.map((i, index) => renderConfirm(i, index))
          : renderNoOrder();
        break;
      case "history_prescription":
        return order.length > 0
          ? order.map((i, index) => renderOrder(i, index))
          : renderNoOrder();
        break;
      default:
        return null;
        break;
    }
  };

  const handleSearch = (state) => {
    switch (state) {
      case "wait_confirmed":
        setConfirm(() =>
          data.filter(
            (i) =>
              i.status === state &&
              i.name.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
        );
        break;
      case "wait_ordered":
        setOrder(() =>
          data.filter(
            (i) =>
              i.status === state &&
              i.name.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
        );
        break;
      case "received":
        setReceive(() =>
          data.filter(
            (i) =>
              i.status === state &&
              i.name.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
        );
        break;
      case "cancelled":
        setCancel(() =>
          data.filter(
            (i) =>
              i.status === state &&
              i.name.toLowerCase().includes(searchValue.trim().toLowerCase())
          )
        );
        break;
      default:
        console.log("Errorl: loi trang thai order!!!");
        break;
    }
  };

  const handleCancel = (id) => {
    setData((pre) =>
      pre.map((item) => {
        if (item.id === id)
          return {
            ...item,
            status: "cancelled",
          };
        else return item;
      })
    );
  };

  const handleConfirm = (id) => {
    setData((pre) =>
      pre.map((item) => {
        if (item.id === id)
          return {
            ...item,
            status: "wait_ordered",
          };
        else return item;
      })
    );
  };

  const handleReceive = (id) => {
    setData((pre) =>
      pre.map((item) => {
        if (item.id === id)
          return {
            ...item,
            status: "received",
          };
        else return item;
      })
    );
  };

  useEffect(() => {
    setConfirm(() => data.filter((i) => i.status === "wait_confirmed"));
    setOrder(() => data.filter((i) => i.status === "wait_ordered"));
    setReceive(() => data.filter((i) => i.status === "received"));
    setCancel(() => data.filter((i) => i.status === "cancelled"));
  }, [data]);

  useEffect(() => {
    handleSearch(status);
  }, [isSearched]);

  useEffect(() => {
    handleSearch(status);
  }, [status]);

  return <View style={styles.container}>{renderContent()}</View>;
}
