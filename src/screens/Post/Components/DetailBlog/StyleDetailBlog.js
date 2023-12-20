import { Dimensions, StyleSheet, StatusBar } from "react-native";
import theme from "../../../../config/theme";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 245,
    paddingTop: 5,
    paddingLeft: 7,
  },
  imgAuthor: {
    borderRadius: 999,
    width: 30,
    height: 30,
  },
  containerContent: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    gap: 15,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: "rgba(22, 149, 204, 1)",
    textAlign: "justify",
    textAlignVertical: "center",
  },
  containerAuthor: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  author: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textContent: {
    fontWeight: "400",
    fontSize: 15,
    textAlign: "justify",
  },
  btnTop: {
    position: "absolute",
    right: 8,
    bottom: 20,
  },
});

export default styles;
