import { Dimensions, StyleSheet } from "react-native";
import theme from "../../config/theme";
const styles = StyleSheet.create({
  example: {
    color: "#000",
  },
  wrapper: {
    flex: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 70,
  },
  appInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  appInfo: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 30,
    marginRight: "2%",
  },
  name: {
    fontSize: theme.fontSizes.headline_two,
    color: theme.colors.white,
    textAlign: "center",
  },
  slogan: {
    fontSize: theme.fontSizes.text_body,
    color: theme.colors.white,
    marginHorizontal: "8%",
  },
  inputContainer: {
    marginVertical: "4%",
  },
  label: {
    marginBottom: "2%",
    marginStart: "10%",
    color: theme.colors.white,
  },
  input: {
    backgroundColor: "#ebeef2",
    width: "80%",
    marginHorizontal: "10%",
    paddingLeft: "4%",
    paddingRight: "13%",
    paddingVertical: "2%",
    borderRadius: 10,
    color: theme.colors.black,
    fontSize: theme.fontSizes.text_body,
  },
  eyeBtn: {
    backgroundColor: "transparent",
    position: "absolute",
    top: "50%",
    right: "14%",
  },
  btnAuth: {
    backgroundColor: theme.colors.tertiary,
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center",
    marginVertical: 20,
    height: 54,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  textAuth: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
  line_container: {
    marginVertical: "3%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "10%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
  },
  or: {
    marginHorizontal: 10,
    color: "white",
  },
  google: {
    backgroundColor: "#ebeef2",
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center",
    marginVertical: 20,
    height: 54,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textGoogle: {
    color: theme.colors.black,
    textAlign: "center",
    marginLeft: "5%",
  },
  forget_container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  forget_title: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.text_body,
  },
  forget_button: {
    color: theme.colors.green,
    textDecorationLine: "underline",
    fontSize: theme.fontSizes.text_body,
    fontWeight: "800",
    marginLeft: "2%",
  },
  forget_button1: {
    color: theme.colors.yellow,
    textDecorationLine: "underline",
    fontSize: theme.fontSizes.text_body,
    fontWeight: "700",
    marginVertical: "3%",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    marginLeft: "10%",
  },
  buttonbtn: {
    backgroundColor: theme.colors.tertiary,
    width: 30,
    alignSelf: "center",
    marginVertical: 20,
    height: 54,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    color: theme.colors.white,
    textAlign: "center",
  },
});

export default styles;
