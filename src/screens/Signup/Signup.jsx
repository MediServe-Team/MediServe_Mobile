import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./StyleSignup";
import logo from "../../../assets/logo.png";
import background from "../../../assets/bg_login.jpg";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import theme from "../../config/theme";
import { BASE_URL } from "../../../baseURL";

export default function Signup({ navigation }) {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [inputCurrentPasswordType, setInputCurrentPasswordType] =
    useState("password");
  const [inputRepeatPasswordType, setInputRepeatPasswordType] =
    useState("password");

  const toastSuccessSignup = () => {
    Toast.show("Đăng ký thành công!", {
      duration: 1000,
      delay: 500,
      backgroundColor: "#39F5C7",
      textColor: "#fff",
      position: -40,
    });
  };

  const toastFailSignup = (mess) => {
    Toast.show(mess, {
      duration: 1000,
      delay: 500,
      backgroundColor: theme.colors.danger,
      textColor: "#fff",
      textStyle: { fontWeight: "500" },
      position: -40,
    });
  };

  const togglePasswordVisibility = () => {
    setInputCurrentPasswordType(
      inputCurrentPasswordType === "password" ? "text" : "password"
    );
  };
  const toggleRepeatPasswordVisibility = () => {
    setInputRepeatPasswordType(
      inputRepeatPasswordType === "password" ? "text" : "password"
    );
  };

  const handleSignupSucess = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    navigation.navigate("Login");
    toastSuccessSignup();
  };

  const handleSignupFail = (mess) => {
    toastFailSignup(mess);
  };

  const handleRegister = async () => {
    if (name === "" || email === "" || password === "" || confirm === "") {
      handleSignupFail("Thiếu thông tin đăng ký!");
    } else if (password !== confirm) {
      handleSignupFail("Mật khẩu lặp lại sai!");
    } else {
      try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        });
        const data = await response.json();
        if (data.status === 409) {
          handleSignupFail("Email đã tồn tại!");
        } else if (data.status === 400) {
          handleSignupFail("Mật khẩu ít nhất 8 ký tự!");
        } else {
          login(data.data.id);
          handleSignupSucess();
        }
      } catch (error) {
        handleSignupFail(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={background} style={styles.wrapper} />

      <ScrollView style={styles.content}>
        <View style={styles.appInfoContainer}>
          <View style={styles.appInfo}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.name}>MediServe</Text>
          </View>

          <Text style={styles.slogan}>
            Đăng ký tài khoản mới để trải nghiệm những tiện ích của MediServe
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên đại diện</Text>
          <TextInput
            placeholder="Username"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
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
              <Ionicons
                style={styles.eye_icon}
                name="eye-off-outline"
                size={24}
              />
            ) : (
              <Ionicons style={styles.eye_icon} name="eye-outline" size={24} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <TextInput
            placeholder="Lặp lại mật khẩu"
            secureTextEntry={inputRepeatPasswordType === "password"}
            value={confirm}
            onChangeText={setConfirm}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={toggleRepeatPasswordVisibility}
          >
            {inputRepeatPasswordType === "password" ? (
              <Ionicons
                style={styles.eye_icon}
                name="eye-off-outline"
                size={24}
              />
            ) : (
              <Ionicons style={styles.eye_icon} name="eye-outline" size={24} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnAuth} onPress={handleRegister}>
          <Text style={styles.textAuth}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <View style={styles.forget_container}>
          <Text style={styles.forget_title}>Bạn đã có tài khoản?</Text>
          <Text
            style={styles.forget_button}
            onPress={() => navigation.navigate("Login")}
          >
            Đăng nhập
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
