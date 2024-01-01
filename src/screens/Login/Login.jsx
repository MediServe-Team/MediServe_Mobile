import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import background from "../../../assets/bg_login.jpg";
import logo from "../../../assets/logo.png";
import styles from "./StyleLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import theme from "../../config/theme";
import { BASE_URL } from "../../../baseURL";

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  // const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputCurrentPasswordType, setInputCurrentPasswordType] =
    useState("password");
  const togglePasswordVisibility = () => {
    setInputCurrentPasswordType(
      inputCurrentPasswordType === "password" ? "text" : "password"
    );
  };

  const toastSuccessLogin = () => {
    Toast.show("Đăng nhập thành công!", {
      duration: 1000,
      delay: 500,
      backgroundColor: "rgba(69, 152, 211, 1)",
      textColor: "#fff",
      textStyle: { fontWeight: "500" },
    });
  };

  const toastFailLogin = () => {
    Toast.show("Đăng nhập thất bại!!!", {
      duration: 1000,
      delay: 500,
      backgroundColor: theme.colors.danger,
      textColor: "#fff",
      textStyle: { fontWeight: "500" },
      position: -60,
    });
  };

  const handleLoginSucess = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("App");
    toastSuccessLogin();
  };

  const handleLoginFail = () => {
    toastFailLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/customer-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === 200 || data.status === 201) {
        login(data.user.id);
        handleLoginSucess();
      } else {
        handleLoginFail();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.wrapper}
      >
        <View style={styles.content}>
          <View style={styles.appInfoContainer}>
            <View style={styles.appInfo}>
              <Image style={styles.logo} source={logo} />
              <Text style={styles.name}>MediServe</Text>
            </View>
            <Text style={styles.slogan}>
              Ứng dụng này hỗ trợ bên phía người dùng của MediServe.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tài khoản</Text>
            <TextInput
              placeholder="Email@gmail.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              placeholder="Nhập mật khẩu"
              secureTextEntry={inputCurrentPasswordType === "password"}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={togglePasswordVisibility}
            >
              {inputCurrentPasswordType === "password" ? (
                <Ionicons name="eye-off-outline" size={24} />
              ) : (
                <Ionicons name="eye-outline" size={24} />
              )}
            </TouchableOpacity>
          </View>
          {/* {errorMessage !== "" && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  )} */}

          <TouchableOpacity style={styles.btnAuth} onPress={handleLogin}>
            <Text style={styles.textAuth}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>

          {/* <View style={styles.line_container}>
                    <View style={styles.line} />
                    <Text style={styles.or}>Hoặc</Text>
                    <View style={styles.line} />
                  </View> */}

          {/* <TouchableOpacity style={styles.google}>
                    <Ionicons name="logo-google" size={20}></Ionicons>
                    <Text style={styles.textGoogle}>Đăng nhập với Google</Text>
                  </TouchableOpacity> */}

          <View style={styles.forget_container}>
            <Text style={styles.forget_title}>Bạn chưa có tài khoản?</Text>
            <Text
              style={styles.forget_button}
              onPress={() => navigation.navigate("Signup")}
            >
              Đăng ký
            </Text>
          </View>

          {/* <View style={styles.forget_container}>
                    <Text style={styles.forget_button1}>Quên mật khẩu?</Text>
                  </View> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
