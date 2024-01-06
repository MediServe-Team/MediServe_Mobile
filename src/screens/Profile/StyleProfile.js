import { Dimensions, StyleSheet } from "react-native";
import theme from "../../config/theme";
const styles = StyleSheet.create({
  screensContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  title: {
    color: "rgba(69, 152, 211, 1)",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  image: {
    borderRadius: 999,
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: "rgba(69, 152, 211, 1)",
  },
  iconContainer: {
    position: "absolute",
    bottom: 5,
    right: 10,
    zIndex: 999,
  },
  inputGroup: {
    flexDirection: "column",
    gap: 25,
    paddingTop: 20,
  },
  group: {
    flexDirection: "column",
    gap: 5,
  },
  titleInput: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "rgba(200, 200, 200, 1)",
    color: "#000",
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    fontWeight: "400",
    //backgroundColor: "rgba(238, 238, 238, 1)",
  },
  button: {
    backgroundColor: "rgba(240, 134, 74, 1)",
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
  },
  titleButton: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  select: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "rgba(200, 200, 200, 1)",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default styles;
