import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
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

const db = SQLite.openDatabaseSync("flashcards.db");

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { t } = useLanguage(); // Use the translation function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const result: any = await db.getAllAsync("SELECT * FROM users LIMIT 1;");
      if (result && result.length > 0) {
        const u = result[0];
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
      }
    } catch (error) {
      console.log("Error fetching user for edit:", error);
    }
  };

  // Gallery eken Image pick qilish
  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Awasaraya Awashyai",
        "Profile photo eka mawa ganeema sadaha gallery access awashyai.",
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

  // Data Save qilish
  const handleSaveChanges = async () => {
    try {
      const formattedBirthday = birthday.toISOString().split("T")[0];
      const existing: any = await db.getAllAsync(
        "SELECT * FROM users LIMIT 1;",
      );

      if (existing && existing.length > 0) {
        await db.runAsync(
          `UPDATE users SET name = ?, email = ?, age = ?, birthday = ?, avatar = ? WHERE id = ?;`,
          [name, email, age, formattedBirthday, avatar, existing[0].id],
        );
      } else {
        await db.runAsync(
          `INSERT INTO users (name, email, age, birthday, avatar) VALUES (?, ?, ?, ?, ?);`,
          [name, email, age, formattedBirthday, avatar],
        );
      }

      Alert.alert(
        "Sarthakai! ✅",
        "Profile thorathuru sarthakawa update wuni.",
        [{ text: "Hondai", onPress: () => router.back() }],
      );
    } catch (error) {
      console.log("Error updating profile:", error);
      Alert.alert("Doshayak!", "Profile data save kireema asarthakawai.");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Navigation */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: colors.text }]}>
          {t("editProfile", "headerLabel")}
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

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>
            {t("editProfile", "saveButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: { padding: 4 },
  topTitle: { fontSize: 18, fontWeight: "bold" },
  avatarSection: {
    alignItems: "center",
    marginBottom: 25,
    position: "relative",
  },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    padding: 10,
    borderRadius: 22,
    elevation: 3,
  },
  formContainer: { gap: 14, paddingBottom: 40 },
  inputLabel: { fontSize: 13, fontWeight: "600", marginLeft: 4 },
  input: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 15,
  },
  datePickerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
