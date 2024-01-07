import { Dimensions, StyleSheet, StatusBar } from "react-native";
import theme from "../../config/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#ffffff",
    paddingBottom: 20,
  },
  imgBg: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 222,
    paddingRight: 10,
  },
  containerTitleBg: {
    width: 190,
  },
  titleBg: {
    color: "rgba(22, 149, 204, 1)",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    backgroundColor: "rgba(240, 134, 74, 1)",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  titleBtn: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  title: {
    color: "rgba(255, 178, 64, 1)",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
  },
  card: {
    borderRadius: 10,
    //backgroundColor: "rgba(210, 234, 255, 1)",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    width: "100%",
    height: 300,
  },
  cardIos: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowColor: "#000",
    shadowRadius: 4,
  },
  cardAndroid: {
    elevation: 10,
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 15,
  },
  containerLogo: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000000",
  },
  status: { flexDirection: "row", gap: 20 },
  titleStatus: { flexDirection: "row", gap: 10 },
  searchSection: {
    flex: 1,
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
  searchIconArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 37,
    fontSize: 17,
    fontWeight: "500",
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
