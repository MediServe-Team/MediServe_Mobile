import { Dimensions, StyleSheet } from "react-native";
import theme from "../../../../config/theme";
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "rgba(235, 235, 235, 1)",
  },
  containerGoBack: {
    height: 45,
    width: "100%",
    backgroundColor: "rgba(235, 235, 235, 1)",
    flexDirection: "row",
  },
  containerIcon: {
    justifyContent: "center",
    left: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 19,
    fontWeight: "700",
    color: "rgba(69, 152, 211, 1)",
  },
  containerFirst: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(217, 217, 217, 1)",
  },
  textStatus: {
    fontWeight: "500",
    fontSize: 15,
    color: "rgba(255, 178, 64, 1)",
  },
  textTitle: {
    fontWeight: "600",
    color: "#000",
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
  textDateTime: {
    fontSize: 15,
    color: "rgba(160, 160, 160, 1)",
    fontWeight: "500",
  },
  containerPrice: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  textPrice: {
    fontWeight: "500",
    fontSize: 17,
    color: "rgba(255, 178, 64, 1)",
  },
  containerItem: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    gap: 5,
  },
  containerTitleInfo: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "rgba(217, 217, 217, 1)",
    paddingBottom: 2,
  },
  titleInfo: {
    fontWeight: "500",
    fontSize: 16,
    color: "rgba(255, 178, 64, 1)",
  },
  textTitleInfo: {
    fontWeight: "500",
    fontSize: 15,
    color: "#000",
  },
  textInfo: {
    fontWeight: "400",
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
  },
});
export default styles;
