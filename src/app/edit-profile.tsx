import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false); // 🌟 යූසර් කෙනෙක් 이미 ඉන්නවද නැද්ද බලන්න

  useEffect(() => {
    fetchUserData();
  }, []);

  // 🌟 AsyncStorage එකෙන් ඩේටා ලබා ගැනීම
  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("USER_PROFILE");
      if (jsonValue !== null) {
        const u = JSON.parse(jsonValue);
        setName(u.name || "");
        setEmail(u.email || "");
        setAge(u.age ? u.age.toString() : "");
        if (u.birthday) {
          setBirthday(new Date(u.birthday));
        }
        setAvatar(
          u.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
        );
        setIsExistingUser(true); // ඩේටා තියෙනවා නම් true කරයි
      } else {
        setIsExistingUser(false); // ඩේටා නැත්නම් false කරයි
      }
    } catch (error) {
      console.log("Error fetching user from storage:", error);
    }
  };

  // Gallery eken Image pick qilish
  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        t("editProfile", "needPermissionHeader"),
        t("editProfile", "needPermissionBody"),
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      setAvatar(pickerResult.assets[0].uri);
    }
  };

  // Date select karana welawe
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  // 🌟 AsyncStorage එකේ Data Save / Create කිරීම
  const handleSaveChanges = async () => {
    try {
      const formattedBirthday = birthday.toISOString().split("T")[0];
      const userData = {
        name,
        email,
        age,
        birthday: formattedBirthday,
        avatar,
      };

      await AsyncStorage.setItem("USER_PROFILE", JSON.stringify(userData));
      setIsExistingUser(true);

      // Alert.alert(
      //   t('common','successful'),
      //   isExistingUser
      //     ? t('editProfile','updatedSuccess')
      //     : t('editProfile','createdSuccess'),
      //   [{ text: "හොඳයි", onPress: () => router.back() }],
      // );
      if (isExistingUser) {
        // 1. කලින් යූසර් කෙනෙක් ඉඳන් Update කළොත් විතරක් Alert එක පෙන්වීම
        Alert.alert(
          t("common", "successful"),
          t("editProfile", "updatedSuccess"),
          [{ text: t("common", "ok"), onPress: () => router.back() }],
        );
      } else {
        // 2. අලුතින් Account එකක් Create කළොත් Alert එකක් නැතුව කෙලින්ම Home / Index Page එකට යැවීම
        setIsExistingUser(true);
        router.replace("/"); // හෝ ඔබේ Index / Home page එකේ route නම දාන්න (උදා: router.replace("/home"))
      }
    } catch (error) {
      console.log("Error saving profile:", error);
      Alert.alert(t("common", "error"), t("common", "failed"));
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Navigation - 🌟 ඩේටා නැත්නම් Create Account ලෙස පෙන්වීම */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: colors.text }]}>
          {isExistingUser ? t("editProfile", "headerLabel") : "Create Account"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Avatar Picker Section */}
      <View style={styles.avatarSection}>
        <Image
          source={{
            uri:
              avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
          }}
          style={styles.avatar}
        />
        <TouchableOpacity
          style={[styles.cameraBadge, { backgroundColor: colors.primary }]}
          onPress={handlePickImage}
        >
          <Ionicons name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <Text style={[styles.inputLabel, { color: colors.text }]}>
          {t("editProfile", "nameLabel")}
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.cardBackground,
              color: colors.text,
              borderColor: colors.tint + "30",
            },
          ]}
          placeholder={t("editProfile", "namePlaceholder")}
          placeholderTextColor={colors.tint}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.inputLabel, { color: colors.text }]}>
          {t("editProfile", "emailLabel")}
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.cardBackground,
              color: colors.text,
              borderColor: colors.tint + "30",
            },
          ]}
          placeholder={t("editProfile", "emailPlaceholder")}
          placeholderTextColor={colors.tint}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={[styles.inputLabel, { color: colors.text }]}>
          {t("editProfile", "ageLabel")}
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.cardBackground,
              color: colors.text,
              borderColor: colors.tint + "30",
            },
          ]}
          placeholder={t("editProfile", "agePlaceholder")}
          placeholderTextColor={colors.tint}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Date Picker Component */}
        <Text style={[styles.inputLabel, { color: colors.text }]}>
          {t("editProfile", "birthdayLabel")}
        </Text>
        <TouchableOpacity
          style={[
            styles.input,
            styles.datePickerInput,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.tint + "30",
            },
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: colors.text, fontSize: 15 }}>
            {birthday.toISOString().split("T")[0]}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthday}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* Save / Create Account Button - 🌟 තත්ත්වය අනුව නම වෙනස් වීම */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>
            {isExistingUser
              ? t("editProfile", "saveButton")
              : "Create My Account"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backBtn: { padding: 4 },
  topTitle: { fontSize: 18, fontWeight: "bold" },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    padding: 8,
    borderRadius: 20,
  },
  formContainer: { marginBottom: 30 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  datePickerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
