import { Dimensions, StyleSheet, StatusBar } from "react-native";
import theme from "../../../../config/theme";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 245,
    paddingTop: 5,
    paddingLeft: 7,
    backgroundColor: "#ffffff",
  },
  containerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  containerLine: {
    flexDirection: "row",
    gap: 10,
  },
  containerCol: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    color: "rgba(69, 152, 211, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    width: "45%",
    flexShrink: 1,
    lineHeight: 30,
    textTransform: "capitalize",
  },
  textContent: {
    width: "55%",
    fontWeight: "400",
    fontSize: 18,
    textAlignVertical: "top",
    flexShrink: 1,
    lineHeight: 30,
  },
  textContentCol: {
    paddingHorizontal: 20,
    fontWeight: "400",
    fontSize: 18,
    textAlignVertical: "top",
    flexShrink: 1,
    lineHeight: 30,
  },
  btnTop: {
    position: "absolute",
    right: 8,
    bottom: 20,
  },
});

export default styles;
