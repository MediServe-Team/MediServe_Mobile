import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import background from "../../../assets/bg_login.jpg";
import logo from "../../../assets/logo.png";
import styles from "./StyleLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputCurrentPasswordType, setInputCurrentPasswordType] =
    useState("password");
  const togglePasswordVisibility = () => {
    setInputCurrentPasswordType(
      inputCurrentPasswordType === "password" ? "text" : "password"
    );
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('https://moneytrackerserver-production.up.railway.app/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });
  //     const data = await response.json();
  //     if (data.status === 200 || data.status === 201) {
  //       setErrorMessage('');
  //       login(data.data.userLogin._id);
  //       navigation.navigate('app');
  //     } else {
  //       setErrorMessage('Đăng nhập thất bại!');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <ImageBackground source={background} style={styles.wrapper}>
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
            placeholder="email@gmail.com"
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
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity
          style={styles.btnAuth}
          //onPress={handleLogin}
          onPress={() => navigation.navigate("App")}
        >
          <Text style={styles.textAuth}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.line_container}>
          <View style={styles.line} />
          <Text style={styles.or}>Hoặc</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.google}>
          <Ionicons name="logo-google" size={20}></Ionicons>
          <Text style={styles.textGoogle}>Đăng nhập với Google</Text>
        </TouchableOpacity>

        <View style={styles.forget_container}>
          <Text style={styles.forget_title}>Bạn chưa có tài khoản?</Text>
          <Text
            style={styles.forget_button}
            onPress={() => navigation.navigate("Signup")}
          >
            Đăng ký
          </Text>
        </View>

        <View style={styles.forget_container}>
          <Text style={styles.forget_button1}>Quên mật khẩu?</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
