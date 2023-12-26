import { Dimensions, StyleSheet } from "react-native";
import theme from "../../config/theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    height: 50, // Fixed height for the header
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1, // This will make it take the remaining space
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 50, // Fixed height for the footer
    backgroundColor: "lightcoral",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
