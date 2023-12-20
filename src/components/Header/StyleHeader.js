import { Dimensions, StyleSheet } from "react-native";
import theme from "../../config/theme";
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(69, 152, 211, 1)",
    gap: 5,
    paddingLeft: 20,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 24,
    color: "#ffff",
    letterSpacing: 0.5,
  },
  logo: {
    width: 40,
    height: 26,
  },
});

export default styles;
