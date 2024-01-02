import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
  const [toggleLogin, setToggleLogin] = useState(false);

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
      position: -35,
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
    if (password === "" || email === "") {
      setToggleLogin(true);
      return;
    } else {
      setToggleLogin(false);
    }

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

  const moveToSignup = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={background} resizeMode="cover" style={styles.wrapper} />

      <ScrollView style={styles.content}>
        <View style={styles.appInfoContainer}>
          <View style={styles.appInfo}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.name}>MediServe</Text>
          </View>
          <Text style={styles.slogan}>
            Đăng nhập vào ứng dụng MediServe để trải nghiệm những tiện ích
          </Text>
        </View>

        <View style={styles.inputContainerEmail}>
          <Text style={styles.label}>Tài khoản</Text>
          <TextInput
            placeholder="Email@gmail.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          {toggleLogin && email === "" && (
            <Text style={styles.errorText}>Bạn chưa nhập Email!</Text>
          )}
        </View>

        <View style={styles.inputContainerPass}>
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

          {toggleLogin && password === "" && (
            <Text style={styles.errorText}>Bạn chưa nhập mật khẩu!</Text>
          )}
        </View>

        <TouchableOpacity style={styles.btnAuth} onPress={handleLogin}>
          <Text style={styles.textAuth}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <View style={styles.forget_container}>
          <Text style={styles.forget_title}>Bạn chưa có tài khoản?</Text>
          <Text style={styles.forget_button} onPress={moveToSignup}>
            Đăng ký
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
