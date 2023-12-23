import { Dimensions, StyleSheet, StatusBar } from "react-native";
import theme from "../../../../config/theme";

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    //backgroundColor: "rgba(210, 234, 255, 1)",
    backgroundColor: "#ffffff",
    width: "100%",
    height: 254,
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
  imgCard: {
    width: "100%",
    height: 150,
  },
  imgAuthor: {
    borderRadius: 999,
    width: 30,
    height: 30,
  },
  containerInfo: {
    paddingHorizontal: 15,
    gap: 5,
    paddingTop: 5,
  },
  itemName: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  packingSpecification: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(173, 173, 173, 1)",
  },
  registrationNumber: {
    textAlign: "left",
    fontSize: 13,
    fontWeight: "400",
    color: "#000",
  },
});

export default styles;
