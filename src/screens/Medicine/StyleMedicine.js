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
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 222,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  containerTitleBg: {
    width: 230,
    gap: 5,
  },
  titleBg: {
    color: "rgba(131, 255, 225, 1)",
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    fontWeight: "400",
    fontSize: 17,
    color: "#969696",
  },
  textHighlight: {
    color: "rgba(248, 177, 69, 1)",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
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
  menu: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  containerDropdown: {
    paddingHorizontal: 20,
    flex: 1,
  },
  card: {
    borderRadius: 10,
    //backgroundColor: "rgba(210, 234, 255, 1)",
    backgroundColor: "#ffffff",
    width: 170,
    height: "auto",
    paddingBottom: 5,
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
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 30,
  },
});

export default styles;
