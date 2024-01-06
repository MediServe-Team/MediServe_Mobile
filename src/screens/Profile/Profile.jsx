import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import styles from "./StyleProfile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { imagesDataURL } from "../../static/data";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-root-toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../../../baseURL";
import { AuthContext } from "../../context/AuthContext";
import theme from "../../config/theme";
import { sampleProfile } from "../../static/data";

export default function Profile({ navigation }) {
  const { userId } = useContext(AuthContext);
  const [openDob, setOpenDob] = useState(false);
  const [info, setInfo] = useState();
  const [base64, setBase64] = useState("");

  const sample = {
    name: sampleProfile.name,
    fullName: sampleProfile.fullName,
    gender: sampleProfile.gender,
    dob: sampleProfile.dob,
    phone: sampleProfile.phone,
    address: sampleProfile.address,
    avatarUrl: sampleProfile.avatarUrl,
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: sample,
  });

  const setDataForm = (info) => {
    // set data in form
    setValue("name", info.name);
    setValue("fullName", info.fullName);
    setValue("gender", info.gender);
    setValue("dob", new Date(info.dateOfBirth));
    setValue("phone", info.phoneNumber);
    setValue("address", info.address);
    setValue("avatarUrl", info.avatar);
  };

  const toastSuccessSave = () => {
    Toast.show("Lưu thành công!", {
      duration: 1000,
      delay: 500,
      backgroundColor: "#39F5C7",
      textColor: "#fff",
      opacity: 1,
      textStyle: { fontWeight: "500" },
    });
  };

  const toastFail = (mess) => {
    Toast.show(mess, {
      duration: 1000,
      delay: 500,
      backgroundColor: theme.colors.danger,
      textColor: "#fff",
      textStyle: { fontWeight: "500" },
      position: -40,
    });
  };

  const updateNewData = async (info) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/customer/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: info.name,
            fullName: info.fullName,
            gender: info.gender,
            dateOfBirth: info.dob,
            phoneNumber: info.phone,
            address: info.address,
            avatar: base64,
          }),
        }
      );
      const result = await response.json();
      if (result.status === 200 || result.status === 201) {
        setInfo(result.data);
        setDataForm(result.data);
      } else {
        console.log(result);
        toastFail("5");
      }
    } catch (error) {
      toastFail("Không thể cập nhật dữ liệu!");
    }
  };

  const onSubmit = (data) => {
    updateNewData(data);
    toastSuccessSave();
  };

  const handleImageSelection = async (onChange) => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true,
      });

      //console.log(result);

      if (!result.canceled) {
        await onChange(result.assets[0].uri);
        setBase64("data:image/jpeg;base64," + result.assets[0].base64);
      }
    } catch (error) {
      //alert("Error uploading image:" + error.message);
      console.log("looix");
    }
  };

  const updateInfoUser = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/customer/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: "",
            gender: true,
            dateOfBirth: new Date(),
            phoneNumber: "",
            address: "",
            avatar: "",
          }),
        }
      );
      const data = await response.json();
      if (data.status === 200 || data.status === 201) {
        setInfo(data.data);
        setDataForm(data.data);
      } else {
        toastFail("Không thể update dữ liệu!");
      }
    } catch (error) {
      toastFail("Không thể update dữ liệu!");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", async (e) => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/customer/my-profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 || data.status === 201) {
          if (data.data.gender === null) {
            updateInfoUser();
          } else {
            setInfo(data.data);
            setDataForm(data.data);
          }
        } else {
          navigation.navigate("Home");
          toastFail("Không thể lấy dữ liệu!");
        }
      } catch (error) {
        navigation.navigate("Home");
        toastFail("Không thể lấy dữ liệu!");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screensContainer}>
      <ScrollView>
        <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => handleImageSelection(onChange)}>
                <Image
                  style={styles.image}
                  source={{ uri: value ? value : imagesDataURL[0] }}
                />

                {/* <View style={styles.iconContainer}>
                  <FontAwesome5 name="camera" size={25} color="#000" />
                </View> */}
              </TouchableOpacity>
            </View>
          )}
          name="avatarUrl"
        />

        <View style={styles.inputGroup}>
          <View style={styles.group}>
            <Text style={styles.titleInput}>Email</Text>
            <TextInput
              value={info?.email}
              editable={false}
              style={[
                styles.input,
                { backgroundColor: "rgba(238, 238, 238, 1)" },
              ]}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.titleInput}>Tên đại diện</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Samurai123"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errorText}>
                Tên đại diện không được để trống!!!
              </Text>
            )}
          </View>

          <View style={styles.group}>
            <Text style={styles.titleInput}>Họ và tên</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="David Jones"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name="fullName"
            />
            {errors.fullName && (
              <Text style={styles.errorText}>
                Họ và tên không được để trống!!!
              </Text>
            )}
          </View>

          <View style={{ flexDirection: "row", gap: 30, width: "100%" }}>
            <View style={[styles.group, { width: "35%" }]}>
              <Text style={styles.titleInput}>Giới tính</Text>

              <View style={styles.select}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker selectedValue={value} onValueChange={onChange}>
                      <Picker.Item label="Nam" value={true} />
                      <Picker.Item label="Nữ" value={false} />
                    </Picker>
                  )}
                  name="gender"
                />
              </View>
            </View>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.group, { flex: 1 }]}>
                  <Text style={styles.titleInput}>Ngày sinh</Text>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenDob(true)}
                  >
                    <Text>
                      {value.toLocaleString("default", {
                        day: "2-digit",
                      }) +
                        "-" +
                        value.toLocaleString("default", {
                          month: "2-digit",
                        }) +
                        "-" +
                        value.toLocaleString("default", {
                          year: "numeric",
                        })}
                    </Text>
                  </TouchableOpacity>
                  {openDob && (
                    <DateTimePicker
                      mode="date"
                      value={value}
                      onChange={(event, selectedDate) => {
                        setOpenDob(false);
                        onChange(selectedDate);
                      }}
                    />
                  )}
                </View>
              )}
              name="dob"
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.titleInput}>Số điện thoại</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="0912345678"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name="phone"
            />
            {errors.phone && (
              <Text style={styles.errorText}>
                Số điện thoại không được để trống hoặc sai kiểu dữ liệu!!!
              </Text>
            )}
          </View>

          <View style={styles.group}>
            <Text style={styles.titleInput}>Địa chỉ</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="108 Ông Ích Khiêm, Hải Châu, Đà Nẵng"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name="address"
            />
            {errors.address && (
              <Text style={styles.errorText}>
                Địa chỉ không được để trống!!!
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.titleButton}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
