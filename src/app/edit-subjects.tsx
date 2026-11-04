import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const db = SQLite.openDatabaseSync("flashcards.db");

export default function EditSubjectsScreen() {
  const { colors } = useTheme();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null,
  );
  const [newLessonName, setNewLessonName] = useState("");

  // Edit Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [editingType, setEditingType] = useState<"subject" | "lesson" | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editText, setEditText] = useState("");
  const { t } = useLanguage(); // Use the translation function

  useEffect(() => {
    initDBAndLoad();
  }, []);

  const initDBAndLoad = async () => {
    try {
      // ඩේටාබේස් වගු සෑදීම
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS subjects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE
        );
        CREATE TABLE IF NOT EXISTS lessons (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subject_id INTEGER,
          name TEXT
        );
      `);

      // පළමු වරට ඩේටා හිස් නම් පෙරනිමි විෂයයන් සහ පාඩම් ඇතුළත් කිරීම
      const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
      //   if (subs.length === 0) {
      //     const defaultSubs = ["Chemistry", "Physics", "Combined Maths"];
      //     for (const sub of defaultSubs) {
      //       const res: any = await db.runAsync(
      //         "INSERT OR IGNORE INTO subjects (name) VALUES (?);",
      //         [sub],
      //       );
      //       const count = sub === "Physics" ? 9 : 10;
      //       const subId = res.lastInsertRowId;
      //       if (subId) {
      //         for (let i = 1; i <= count; i++) {
      //           await db.runAsync(
      //             "INSERT INTO lessons (subject_id, name) VALUES (?, ?);",
      //             [subId, `පාඩම ${i}`],
      //           );
      //         }
      //       }
      //     }
      //   }
      loadSubjects();
    } catch (err) {
      console.log("DB Init Error:", err);
    }
  };

  const loadSubjects = async () => {
    const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
    setSubjects(subs);
    if (subs.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subs[0].id);
      loadLessons(subs[0].id);
    } else if (selectedSubjectId) {
      loadLessons(selectedSubjectId);
    }
  };

  const loadLessons = async (subId: number) => {
    const less: any = await db.getAllAsync(
      "SELECT * FROM lessons WHERE subject_id = ?;",
      [subId],
    );
    setLessons(less);
  };

  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) {
      Alert.alert(t("common", "error"), t("manageLessons", "emptySubject"));
      return;
    }
    try {
      await db.runAsync("INSERT INTO subjects (name) VALUES (?);", [
        newSubjectName.trim(),
      ]);
      setNewSubjectName("");
      loadSubjects();
      Alert.alert(
        t("common", "successful"),
        t("manageLessons", "subjectAdded"),
      );
    } catch (err) {
      Alert.alert(t("common", "error"), t("manageLessons", "subjectExists"));
    }
  };

  const handleAddLesson = async () => {
    if (!selectedSubjectId || !newLessonName.trim()) {
      Alert.alert(t("common", "error"), t("manageLessons", "emptySubject"));
      return;
    }
    try {
      await db.runAsync(
        "INSERT INTO lessons (subject_id, name) VALUES (?, ?);",
        [selectedSubjectId, newLessonName.trim()],
      );
      setNewLessonName("");
      loadLessons(selectedSubjectId);
      Alert.alert(t("common", "successful"), t("manageLessons", "lessonAdded"));
    } catch (err) {
      console.log("Add lesson error:", err);
    }
  };

  const openEdit = (type: "subject" | "lesson", item: any) => {
    setEditingType(type);
    setEditingItem(item);
    setEditText(item.name);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim() || !editingItem) return;
    try {
      if (editingType === "subject") {
        await db.runAsync("UPDATE subjects SET name = ? WHERE id = ?;", [
          editText.trim(),
          editingItem.id,
        ]);
        loadSubjects();
      } else if (editingType === "lesson") {
        await db.runAsync("UPDATE lessons SET name = ? WHERE id = ?;", [
          editText.trim(),
          editingItem.id,
        ]);
        if (selectedSubjectId) loadLessons(selectedSubjectId);
      }
      setModalVisible(false);
      setEditingItem(null);
      setEditingType(null);
      Alert.alert(
        t("common", "successful"),
        t("manageLessons", "lessonUpdated"),
      );
    } catch (err) {
      Alert.alert(
        t("common", "error"),
        t("manageLessons", "lessonUpdateFailed"),
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        {t("manageLessons", "header")}
      </Text>

      {/* Add New Subject Section */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.label, { color: colors.primary }]}>
          {t("manageLessons", "addSubject")}
        </Text>
        <View style={styles.row}>
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.tint + "50", flex: 1 },
            ]}
            placeholder={t("manageLessons", "addSubjectPlaceholder")}
            placeholderTextColor={colors.text + "60"}
            value={newSubjectName}
            onChangeText={setNewSubjectName}
          />
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={handleAddSubject}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* View & Select Subjects */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.label, { color: colors.primary }]}>
          {t("manageLessons", "currentSubjects")}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 8 }}
        >
          {subjects.map((subj) => (
            <View
              key={subj.id}
              style={[
                styles.subChipWrapper,
                { borderColor: colors.tint + "40" },
                selectedSubjectId === subj.id && {
                  borderColor: colors.primary,
                  borderWidth: 2,
                  backgroundColor: colors.primary + "15",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedSubjectId(subj.id);
                  loadLessons(subj.id);
                }}
                style={styles.subChipTextContainer}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: "bold",
                    fontSize: 13,
                  }}
                >
                  {subj.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openEdit("subject", subj)}
                style={styles.editIconBtn}
              >
                <Ionicons
                  name="create-outline"
                  size={15}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Add & View Lessons for Selected Subject */}
      {selectedSubjectId && (
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.label, { color: colors.primary }]}>
            {t("manageLessons", "addLesson")}
          </Text>
          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.tint + "50",
                  flex: 1,
                },
              ]}
              placeholder={t("manageLessons", "addLessonPlaceholder")}
              placeholderTextColor={colors.text + "60"}
              value={newLessonName}
              onChangeText={setNewLessonName}
            />
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.primary }]}
              onPress={handleAddLesson}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.label,
              { color: colors.text, marginTop: 16, marginBottom: 8 },
            ]}
          >
            {t("manageLessons", "currentLessons")}
          </Text>
          {lessons.map((les) => (
            <View
              key={les.id}
              style={[
                styles.lessonRow,
                { borderBottomColor: colors.tint + "20" },
              ]}
            >
              <Text style={{ color: colors.text, fontSize: 14 }}>
                {les.name}
              </Text>
              <TouchableOpacity
                onPress={() => openEdit("lesson", les)}
                style={{ padding: 6 }}
              >
                <Ionicons
                  name="create-outline"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Edit Modal (Popup for Renaming) */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editingType === "subject"
                ? t("manageLessons", "changeSubject")
                : t("manageLessons", "changeLesson")}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.primary,
                  marginBottom: 16,
                  width: "100%",
                },
              ]}
              value={editText}
              onChangeText={setEditText}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#888" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {t("common", "cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveEdit}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {t("common", "save")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
  label: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", gap: 8, alignItems: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  subChipWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    overflow: "hidden",
  },
  subChipTextContainer: {
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 6,
  },
  editIconBtn: { paddingRight: 8, paddingLeft: 2 },
  lessonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    justifyContent: "flex-end",
  },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
});
