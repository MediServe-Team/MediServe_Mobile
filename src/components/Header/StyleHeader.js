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
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#ffff",
    letterSpacing: 0.5,
  },
  logo: {
    width: 34,
    height: 22,
  },
});

export default styles;
