import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./StyleSignup";
import logo from "../../../assets/logo.png";
import background from "../../../assets/bg_login.jpg";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Signup({ navigation }) {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [inputCurrentPasswordType, setInputCurrentPasswordType] =
    useState("password");
  const [inputRepeatPasswordType, setInputRepeatPasswordType] =
    useState("password");
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
  // const handleRegister = async () => {
  //   if (
  //     password === "" ||
  //     name === "" ||
  //     email === "" ||
  //     password !== confirm
  //   ) {
  //     setErrorMessage("Đăng ký thất bại!");
  //   } else {
  //     try {
  //       const response = await fetch(
  //         "https://moneytrackerserver-production.up.railway.app/auth/register",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             name: name,
  //             email: email,
  //             password: password,
  //           }),
  //         }
  //       );
  //       const data = await response.json();
  //       if (data.status === 200 || data.status === 201) {
  //         login(data.data.newAccount._id);
  //         navigation.navigate("app");
  //       } else {
  //         setErrorMessage("Đăng ký thất bại!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
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
            Quản lý chi tiêu một cách thông minh, dễ dàng và hiệu quả.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            placeholder="Nguyễn A"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
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

        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <TouchableOpacity
          style={styles.btnAuth}
          //onPress={handleRegister}
        >
          <Text style={styles.textAuth}>Đăng ký</Text>
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
      </View>
    </ImageBackground>
  );
}
