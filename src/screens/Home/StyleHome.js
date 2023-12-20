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
    alignItems: "flex-start",
    height: 222,
    paddingLeft: 65,
  },
  containerTitleBg: {
    width: 150,
  },
  titleBg: {
    color: "rgba(141, 224, 255, 1)",
    fontSize: 25,
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
    backgroundColor: "rgba(210, 234, 255, 1)",
    width: "100%",
    height: 180,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
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
});

export default styles;
