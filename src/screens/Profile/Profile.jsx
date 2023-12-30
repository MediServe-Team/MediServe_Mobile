import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import styles from "./StyleProfile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { imagesDataURL } from "../../static/data";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { sampleProfile } from "../../static/data";
import Toast from "react-native-root-toast";

export default function Profile({ navigation }) {
  const [openDob, setOpenDob] = useState(false);
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
    formState: { errors },
  } = useForm({
    defaultValues: sample,
  });

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

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("Home");
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
      });

      //console.log(result);

      if (!result.canceled) {
        await onChange(result.assets[0].uri);
      }
    } catch (error) {
      //alert("Error uploading image:" + error.message);
      console.log("looix");
    }
  };

  return (
    <SafeAreaView style={styles.screensContainer}>
      <ScrollView>
        <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => handleImageSelection(onChange)}>
                <Image style={styles.image} source={{ uri: value }} />

                <View style={styles.iconContainer}>
                  <FontAwesome5 name="camera" size={25} color="#000" />
                </View>
              </TouchableOpacity>
            </View>
          )}
          name="avatarUrl"
        />

        <View style={styles.inputGroup}>
          <View style={styles.group}>
            <Text style={styles.titleInput}>Email</Text>
            <TextInput
              value="abc@gmail.com"
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
                      {value.toLocaleString("default", { day: "2-digit" }) +
                        "-" +
                        value.toLocaleString("default", { month: "2-digit" }) +
                        "-" +
                        value.toLocaleString("default", { year: "numeric" })}
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
