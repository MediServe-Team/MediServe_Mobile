import { Dimensions, StyleSheet } from "react-native";
import theme from "../../../../config/theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgba(235, 235, 235, 1)",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  containerContent: {
    flex: 1,
    width: "100%",
    height: 183,
    backgroundColor: "rgba(235, 235, 235, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  textNoOrder: {
    color: "rgba(191, 191, 191, 1)",
    fontSize: 17,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 205,
  },
  containerInfo: {
    flexDirection: "row",
    flex: 1,
  },
  containerLeft: {
    width: "60%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRightWidth: 2,
    borderColor: "rgba(215, 215, 215, 1)",
  },
  textName: {
    fontSize: 17,
    color: "rgba(69, 152, 211, 1)",
    fontWeight: "600",
  },
  textStaff: {
    fontSize: 15,
    color: "#000",
    fontWeight: "600",
  },
  textTime: {
    fontSize: 15,
    color: "rgba(135, 135, 135, 1)",
    fontWeight: "600",
  },
  textDate: {
    fontSize: 15,
    color: "rgba(135, 135, 135, 1)",
    fontWeight: "600",
  },
  containerRight: {
    width: "40%",
  },
  contentRight: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(215, 215, 215, 1)",
  },
  titleRight: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(248, 177, 69, 1)",
  },
  textRight: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(69, 152, 211, 1)",
  },
  containerStatus: {
    paddingHorizontal: 20,
    justifyContent: "center",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "rgba(215, 215, 215, 1)",
    paddingVertical: 10,
  },
  textStatus: {
    color: "rgba(255, 178, 64, 1)",
    fontSize: 15,
    fontWeight: "500",
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnCancel: {
    backgroundColor: "rgba(255, 88, 88, 1)",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  btnAccept: {
    backgroundColor: "rgba(57, 245, 199, 1)",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  textBtn: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
