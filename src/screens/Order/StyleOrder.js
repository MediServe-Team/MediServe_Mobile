import { Dimensions, StyleSheet } from "react-native";
import theme from "../../config/theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "rgba(235, 235, 235, 1)",
    flexDirection: "column",
    paddingBottom: 20,
  },
  imgBg: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 222,
    paddingLeft: 20,
    paddingBottom: 40,
  },
  containerTitleBg: {
    width: 160,
  },
  titleBg: {
    color: "rgba(131, 255, 225, 1)",
    fontSize: 18,
    fontWeight: "600",
  },
  textHighlight: {
    color: "rgba(248, 177, 69, 1)",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  searchSection: {
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  searchPallet: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    borderRadius: 10,
    gap: 10,
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  searchInput: {
    flex: 1,
    height: 37,
    fontSize: 17,
    fontWeight: "500",
  },
  searchIconArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    color: "#969696",
  },
  containerContent: {
    paddingVertical: 10,
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(235, 235, 235, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
