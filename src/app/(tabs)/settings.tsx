// import { Ionicons } from "@expo/vector-icons";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useTheme } from "../context/ThemeContext"; // Theme context eka import karaganna

// export default function SettingsScreen() {
//   const { theme, colors, spacing, toggleTheme } = useTheme();

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         සැකසුම් (Settings)
//       </Text>

//       {/* Theme Toggle Button Card eka */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <View style={styles.row}>
//           <View style={styles.labelContainer}>
//             <Ionicons
//               name={theme === "dark" ? "moon" : "sunny"}
//               size={24}
//               color={colors.primary}
//             />
//             <Text style={[styles.label, { color: colors.text }]}>
//               අඳුරු තේමාව (Dark Mode)
//             </Text>
//           </View>

//           {/* Toggle Button */}
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: colors.primary }]}
//             onPress={toggleTheme}
//           >
//             <Text style={styles.buttonText}>
//               {theme === "dark" ? "Light වෙත මාරු වන්න" : "Dark වෙත මාරු වන්න"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "flex-start",
//     paddingTop: 60,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   labelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });

//

// import { Ionicons } from "@expo/vector-icons";
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system/legacy";
// import * as Sharing from "expo-sharing";
// import * as SQLite from "expo-sqlite";
// import JSZip from "jszip";
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useTheme } from "../../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function SettingsScreen() {
//   const { theme, colors, toggleTheme } = useTheme();

//   // --- 1. EXPORT & ZIP SHARE BACKUP ---
//   const handleExportZip = async () => {
//     try {
//       const zip = new JSZip();

//       // 1. ඩේටාබේස් ඩේටා JSON එකක් ලෙස ZIP එකට එකතු කිරීම
//       const allRows = await db.getAllAsync("SELECT * FROM flashcards;");
//       zip.file("flashcards.json", JSON.stringify(allRows, null, 2));

//       // 2. ඩොකියුමන්ට් ෆෝල්ඩරයේ ඇති සියලුම මීඩියා (Images & Voices) ZIP එකේ 'media' ෆෝල්ඩරයට එකතු කිරීම
//       const mediaFolder = zip.folder("media");
//       const docFiles = await FileSystem.readDirectoryAsync(
//         FileSystem.documentDirectory!,
//       );

//       for (const file of docFiles) {
//         if (
//           file !== "FlashcardBackup" &&
//           file !== "SQLite" &&
//           file !== "Expo" &&
//           !file.endsWith(".zip")
//         ) {
//           const fileUri = `${FileSystem.documentDirectory}${file}`;
//           const fileInfo = await FileSystem.getInfoAsync(fileUri);

//           if (!fileInfo.isDirectory) {
//             // ෆයිල් එක Base64 ලෙස කියවා Zip එකට ඇතුළත් කිරීම
//             const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
//               encoding: FileSystem.EncodingType.Base64,
//             });
//             mediaFolder?.file(file, fileBase64, { base64: true });
//           }
//         }
//       }

//       // 3. ZIP ෆයිල් එක ජෙනරේට් කිරීම
//       const base64Zip = await zip.generateAsync({ type: "base64" });
//       const zipUri = `${FileSystem.documentDirectory}flashcards_backup.zip`;

//       await FileSystem.writeAsStringAsync(zipUri, base64Zip, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       // 4. ෂෙයාර් මෙනු එක විවෘත කිරීම (Telegram, WhatsApp etc.)
//       if (!(await Sharing.isAvailableAsync())) {
//         Alert.alert(
//           "දෝෂයකි",
//           "මෙම උපාංගයේ ෂෙයාර් කිරීමේ පහසුකම ක්‍රියාත්මක නොවේ.",
//         );
//         return;
//       }

//       await Sharing.shareAsync(zipUri, {
//         dialogTitle: "ෆ්ලෑෂ් කාඩ් සම්පූර්ණ බැකප් එක (ZIP)",
//         mimeType: "application/zip",
//         UTI: "public.zip",
//       });
//     } catch (error) {
//       console.log("Export ZIP error:", error);
//       Alert.alert(
//         "දෝෂයක් ඇති විය",
//         "බැකප් එක සෑදීම හෝ ෂෙයාර් කිරීම අසාර්ථක විය.",
//       );
//     }
//   };

//   //   // --- 2. IMPORT ZIP BACKUP ---
//   //   const handleImportZip = async () => {
//   //     try {
//   //       const result = await DocumentPicker.getDocumentAsync({
//   //         type: ["application/zip", "application/x-zip-compressed", "*/*"],
//   //         copyToCacheDirectory: true,
//   //       });

//   //       if (result.canceled) return;

//   //       const selectedFile = result.assets[0];
//   //       if (!selectedFile.name.endsWith(".zip")) {
//   //         Alert.alert("දෝෂයකි", "කරුණාකර නිවැරදි .zip බැකප් ෆයිල් එකක් තෝරන්න.");
//   //         return;
//   //       }

//   //       // 1. ZIP ෆයිල් එක කියවීම
//   //       const zipBase64 = await FileSystem.readAsStringAsync(selectedFile.uri, {
//   //         encoding: FileSystem.EncodingType.Base64,
//   //       });

//   //       const zip = new JSZip();
//   //       const loadedZip = await zip.loadAsync(zipBase64, { base64: true });

//   //       // 2. flashcards.json ෆයිල් එක සොයා ගැනීම
//   //       const jsonFile = loadedZip.file("flashcards.json");
//   //       if (!jsonFile) {
//   //         Alert.alert(
//   //           "දෝෂයකි",
//   //           "මෙම බැකප් ෆයිල් එකේ දත්ත (flashcards.json) අඩංගු නැත.",
//   //         );
//   //         return;
//   //       }

//   //       const jsonString = await jsonFile.async("string");
//   //       const parsedData = JSON.parse(jsonString);

//   //       if (!Array.isArray(parsedData)) {
//   //         Alert.alert("දෝෂයකි", "බැකප් දත්ත ආකෘතිය වැරදිය.");
//   //         return;
//   //       }

//   //       // 3. මීඩියා ෆයිල්ස් (Images & Voices) නිවැරදි ඩොකියුමන්ට් ෆෝල්ඩරයට එක්ස්ට්‍රැක්ට් කිරීම
//   //       const mediaFiles = Object.keys(loadedZip.files).filter(
//   //         (filename) =>
//   //           filename.startsWith("media/") && !loadedZip.files[filename].dir,
//   //       );

//   //       for (const relativePath of mediaFiles) {
//   //         const fileName = relativePath.replace("media/", "");
//   //         const fileData = await loadedZip.file(relativePath)?.async("base64");

//   //         if (fileData) {
//   //           const targetUri = `${FileSystem.documentDirectory}${fileName}`;
//   //           await FileSystem.writeAsStringAsync(targetUri, fileData, {
//   //             encoding: FileSystem.EncodingType.Base64,
//   //           });
//   //         }
//   //       }

//   //       // 4. ඩේටාබේස් එකට දත්ත ඇතුළත් කිරීම (නව උපාංගයේ පාත් එකට ගැලපෙන සේ සකස් කරමින්)
//   //       for (const item of parsedData) {
//   //         let qContent = item.questionContent;
//   //         let aContent = item.answerContent;

//   //         // වෙනත් ෆෝන් එකකට දමන විට පරණ පාත් එක වෙනස් වී ඇති බැවින්, වර්තමාන ෆෝන් එකේ Path එකට යාවත්කාලීන කිරීම
//   //         if (
//   //           (item.questionType === "voice" || item.questionType === "image") &&
//   //           qContent
//   //         ) {
//   //           const fileName = qContent.split("/").pop();
//   //           if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
//   //         }

//   //         if (
//   //           (item.answerType === "voice" || item.answerType === "image") &&
//   //           aContent
//   //         ) {
//   //           const fileName = aContent.split("/").pop();
//   //           if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
//   //         }

//   //         await db.runAsync(
//   //           `INSERT OR REPLACE INTO flashcards (id, subject, lesson, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//   //           [
//   //             item.id,
//   //             item.subject,
//   //             item.lesson,
//   //             item.questionType,
//   //             qContent,
//   //             item.answerType,
//   //             aContent,
//   //             item.reminderEnabled,
//   //             item.reminderDays,
//   //           ],
//   //         );
//   //       }

//   //       Alert.alert(
//   //         "සාර්ථකයි! 📥",
//   //         "සම්පූර්ණ බැකප් එක (වොයිස්, පින්තූර සහ ඩේටා සමඟ) සාර්ථකව ප්‍රතිස්ථාපනය කරන ලදී!",
//   //       );
//   //     } catch (error) {
//   //       console.log("Import ZIP error:", error);
//   //       Alert.alert("දෝෂයකි", "බැකප් එක රීස්ටෝර් කිරීමේදී දෝෂයක් ඇති විය.");
//   //     }
//   //   };
//   //   const handleImportZip = async () => {
//   //     try {
//   //       const result = await DocumentPicker.getDocumentAsync({
//   //         type: ["application/zip", "application/x-zip-compressed", "*/*"],
//   //         copyToCacheDirectory: true,
//   //       });

//   //       if (result.canceled) return;

//   //       const selectedFile = result.assets[0];

//   //       // 1. තෝරාගත් ෆයිල් එක ZIP ද නැතහොත් JSON ද යන්න පරීක්ෂා කිරීම
//   //       const zip = new JSZip();
//   //       let parsedData = [];
//   //       let zipFiles: { [key: string]: any } = {};

//   //       if (selectedFile.name.endsWith(".zip")) {
//   //         const zipBase64 = await FileSystem.readAsStringAsync(selectedFile.uri, {
//   //           encoding: FileSystem.EncodingType.Base64,
//   //         });
//   //         const loadedZip = await zip.loadAsync(zipBase64, { base64: true });
//   //         zipFiles = loadedZip.files;

//   //         // flashcards.json සොයා ගැනීම (media/ ෆෝල්ඩරය ඇතුළේ හෝ එළියේ තිබිය හැක)
//   //         let jsonFile = loadedZip.file("flashcards.json");
//   //         if (!jsonFile) {
//   //           // වෙනත් නමකින් හෝ වෙනත් තැනක ඇත්දැයි බැලීම
//   //           const jsonKey = Object.keys(zipFiles).find((k) =>
//   //             k.endsWith("flashcards.json"),
//   //           );
//   //           if (jsonKey) jsonFile = loadedZip.file(jsonKey);
//   //         }

//   //         if (!jsonFile) {
//   //           Alert.alert(
//   //             "දෝෂයකි",
//   //             "මෙම ZIP බැකප් එකේ 'flashcards.json' ගොනුව හමු නොවීය.",
//   //           );
//   //           return;
//   //         }

//   //         const jsonString = await jsonFile.async("string");
//   //         parsedData = JSON.parse(jsonString);
//   //       } else if (selectedFile.name.endsWith(".json")) {
//   //         // පරණ JSON බැකප් එකක් වුවද එකවර සේව් වීමට පහසුකම සැපයීම
//   //         const jsonString = await FileSystem.readAsStringAsync(selectedFile.uri);
//   //         parsedData = JSON.parse(jsonString);
//   //       } else {
//   //         Alert.alert(
//   //           "දෝෂයකි",
//   //           "කරුණාකර නිවැරදි .zip හෝ .json බැකප් ෆයිල් එකක් තෝරන්න.",
//   //         );
//   //         return;
//   //       }

//   //       if (!Array.isArray(parsedData)) {
//   //         Alert.alert("දෝෂයකි", "බැකප් දත්ත ආකෘතිය වැරදිය.");
//   //         return;
//   //       }

//   //       // 2. ZIP එකක නම්, මීඩියා ෆයිල්ස් (Images & Voices) එක්ස්ට්‍රැක්ට් කිරීම
//   //       if (selectedFile.name.endsWith(".zip")) {
//   //         for (const relativePath of Object.keys(zipFiles)) {
//   //           if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
//   //             const fileName = relativePath.split("/").pop(); // නම පමණක් ලබා ගැනීම
//   //             if (fileName) {
//   //               const fileData = await zipFiles[relativePath].async("base64");
//   //               const targetUri = `${FileSystem.documentDirectory}${fileName}`;
//   //               await FileSystem.writeAsStringAsync(targetUri, fileData, {
//   //                 encoding: FileSystem.EncodingType.Base64,
//   //               });
//   //             }
//   //           }
//   //         }
//   //       }

//   //       // 3. ඩේටාබේස් එකට දත්ත ඇතුළත් කිරීම
//   //       for (const item of parsedData) {
//   //         let qContent = item.questionContent;
//   //         let aContent = item.answerContent;

//   //         if (
//   //           (item.questionType === "voice" || item.questionType === "image") &&
//   //           qContent
//   //         ) {
//   //           const fileName = qContent.split("/").pop();
//   //           if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
//   //         }

//   //         if (
//   //           (item.answerType === "voice" || item.answerType === "image") &&
//   //           aContent
//   //         ) {
//   //           const fileName = aContent.split("/").pop();
//   //           if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`; // Fix: aContent should use aContent
//   //           if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
//   //         }

//   //         await db.runAsync(
//   //           `INSERT OR REPLACE INTO flashcards (id, subject, lesson, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//   //           [
//   //             item.id,
//   //             item.subject,
//   //             item.lesson,
//   //             item.questionType,
//   //             qContent,
//   //             item.answerType,
//   //             aContent,
//   //             item.reminderEnabled,
//   //             item.reminderDays,
//   //           ],
//   //         );
//   //       }

//   //       Alert.alert(
//   //         "සාර්ථකයි! 📥",
//   //         "බැකප් එක (මීඩියා සහ ඩේටා සමඟ) සාර්ථකව ප්‍රතිස්ථාපනය කරන ලදී!",
//   //       );
//   //       // } catch (error) {
//   //       //   console.log("Import ZIP error:", error);
//   //       // //   Alert.alert(
//   //       // //     "දෝෂයකි",
//   //       // //     "බැකප් එක රීස්ටෝර් කිරීමේදී දෝෂයක් ඇති විය. කරුණාකර නිවැරදි ෆයිල් එකක් තෝරා ඇත්දැයි පරීක්ෂා කරන්න.",
//   //       // //   );
//   //       // Alert.alert(
//   //       //     error.message || "බැකප් එක රීස්ටෝර් කිරීමේදී දෝෂයක් ඇති විය. කරුණාකර නිවැරදි ෆයිල් එකක් තෝරා ඇත්දැයි පරීක්ෂා කරන්න.",
//   //       //   );
//   //       // }
//   //     } catch (error: any) {
//   //       console.log("Import ZIP error details:", error);

//   //       // Error එකේ නියම හේතුව Alert එකේ පෙන්වීම සඳහා
//   //       Alert.alert("දෝෂයක් ඇති විය ❌", error?.message || JSON.stringify(error));
//   //     }
//   //   };

//   // --- 2. IMPORT ZIP BACKUP ---
//   // --- 2. IMPORT ZIP BACKUP ---
//   const handleImportZip = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["application/zip", "application/x-zip-compressed", "*/*"],
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) return;

//       const selectedFile = result.assets[0];

//       // 1. fetch සහ FileReader මඟින් ෆයිල් එක ආරක්ෂිතව Base64 ලෙස කියවීම (Permission errors මඟහරවා ගැනීමට)
//       const response = await fetch(selectedFile.uri);
//       const blob = await response.blob();

//       const base64Data: string = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const resultStr = reader.result as string;
//           const base64 = resultStr.includes(",")
//             ? resultStr.split(",")[1]
//             : resultStr;
//           resolve(base64);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(blob);
//       });

//       // 2. ඩොකියුමන්ට් ෆෝල්ඩරයට තාවකාලිකව සේව් කරගැනීම
//       const localFileUri = `${FileSystem.documentDirectory}temp_import.zip`;
//       await FileSystem.writeAsStringAsync(localFileUri, base64Data, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       // 3. ZIP එක කියවීම
//       const zip = new JSZip();
//       let parsedData = [];
//       let zipFiles: { [key: string]: any } = {};

//       if (
//         selectedFile.name.endsWith(".zip") ||
//         selectedFile.name.endsWith(".bin")
//       ) {
//         const loadedZip = await zip.loadAsync(base64Data, { base64: true });
//         zipFiles = loadedZip.files;

//         // flashcards.json සොයා ගැනීම
//         let jsonFile = loadedZip.file("flashcards.json");
//         if (!jsonFile) {
//           const jsonKey = Object.keys(zipFiles).find((k) =>
//             k.endsWith("flashcards.json"),
//           );
//           if (jsonKey) jsonFile = loadedZip.file(jsonKey);
//         }

//         if (!jsonFile) {
//           Alert.alert(
//             "දෝෂයකි",
//             "මෙම ZIP බැකප් එකේ 'flashcards.json' ගොනුව හමු නොවීය.",
//           );
//           return;
//         }

//         const jsonString = await jsonFile.async("string");
//         parsedData = JSON.parse(jsonString);
//       } else if (selectedFile.name.endsWith(".json")) {
//         const jsonString = await FileSystem.readAsStringAsync(localFileUri);
//         parsedData = JSON.parse(jsonString);
//       } else {
//         Alert.alert("දෝෂයකි", "කරුණාකර නිවැරදි .zip බැකප් ෆයිල් එකක් තෝරන්න.");
//         return;
//       }

//       if (!Array.isArray(parsedData)) {
//         Alert.alert("දෝෂයකි", "බැකප් දත්ත ආකෘතිය වැරදිය.");
//         return;
//       }

//       // 4. මීඩියා ෆයිල්ස් (Images & Voices) එක්ස්ට්‍රැක්ට් කිරීම
//       if (
//         selectedFile.name.endsWith(".zip") ||
//         selectedFile.name.endsWith(".bin")
//       ) {
//         for (const relativePath of Object.keys(zipFiles)) {
//           if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
//             const fileName = relativePath.split("/").pop();
//             if (fileName) {
//               const fileData = await zipFiles[relativePath].async("base64");
//               const targetUri = `${FileSystem.documentDirectory}${fileName}`;
//               await FileSystem.writeAsStringAsync(targetUri, fileData, {
//                 encoding: FileSystem.EncodingType.Base64,
//               });
//             }
//           }
//         }
//       }

//       // 5. ඩේටාබේස් එකට දත්ත ඇතුළත් කිරීම
//       for (const item of parsedData) {
//         let qContent = item.questionContent;
//         let aContent = item.answerContent;

//         if (
//           (item.questionType === "voice" || item.questionType === "image") &&
//           qContent
//         ) {
//           const fileName = qContent.split("/").pop();
//           if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
//         }

//         if (
//           (item.answerType === "voice" || item.answerType === "image") &&
//           aContent
//         ) {
//           const fileName = aContent.split("/").pop();
//           if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
//         }

//         await db.runAsync(
//           `INSERT OR REPLACE INTO flashcards (id, subject, lesson, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//           [
//             item.id,
//             item.subject,
//             item.lesson,
//             item.questionType,
//             qContent,
//             item.answerType,
//             aContent,
//             item.reminderEnabled,
//             item.reminderDays,
//           ],
//         );
//       }

//       // 6. තාවකාලික ෆයිල් එක මකා දැමීම
//       await FileSystem.deleteAsync(localFileUri, { idempotent: true });

//       Alert.alert(
//         "සාර්ථකයි! 📥",
//         "බැකප් එක (මීඩියා සහ ඩේටා සමඟ) සාර්ථකව ප්‍රතිස්ථාපනය කරන ලදී!",
//       );
//     } catch (error: any) {
//       console.log("Import ZIP error details:", error);
//       Alert.alert(
//         "දෝෂයක් ඇති විය ❌",
//         error?.message || "බැකප් එක රීස්ටෝර් කිරීමේදී දෝෂයක් ඇති විය.",
//       );
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         සැකසුම් (Settings)
//       </Text>

//       {/* Theme Toggle Button Card */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <View style={styles.row}>
//           <View style={styles.labelContainer}>
//             <Ionicons
//               name={theme === "dark" ? "moon" : "sunny"}
//               size={24}
//               color={colors.primary}
//             />
//             <Text style={[styles.label, { color: colors.text }]}>
//               අඳුරු තේමාව (Dark Mode)
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: colors.primary }]}
//             onPress={toggleTheme}
//           >
//             <Text style={styles.buttonText}>
//               {theme === "dark" ? "Light වෙත මාරු වන්න" : "Dark වෙත මාරු වන්න"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* --- EXPORT & SHARE ZIP BACKUP CARD --- */}
//       <View
//         style={[
//           styles.card,
//           { backgroundColor: colors.cardBackground, marginTop: 15 },
//         ]}
//       >
//         <View style={styles.row}>
//           <View style={styles.labelContainer}>
//             <Ionicons name="archive-outline" size={24} color={colors.primary} />
//             <Text style={[styles.label, { color: colors.text }]}>
//               සම්පූර්ණ බැකප් එකක් සාදා Share කරන්න (ZIP)
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: colors.primary }]}
//             onPress={handleExportZip}
//           >
//             <Text style={styles.buttonText}>Export ZIP</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* --- IMPORT ZIP BACKUP CARD --- */}
//       <View
//         style={[
//           styles.card,
//           { backgroundColor: colors.cardBackground, marginTop: 15 },
//         ]}
//       >
//         <View style={styles.row}>
//           <View style={styles.labelContainer}>
//             <Ionicons
//               name="folder-open-outline"
//               size={24}
//               color={colors.primary}
//             />
//             <Text style={[styles.label, { color: colors.text }]}>
//               බැකප් එක ලබාගන්න (Import ZIP)
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: colors.primary }]}
//             onPress={handleImportZip}
//           >
//             <Text style={styles.buttonText}>Import ZIP</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "flex-start",
//     paddingTop: 60,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   labelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     flex: 1,
//     marginRight: 10,
//   },
//   label: {
//     fontSize: 15,
//     fontWeight: "500",
//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });

// import { Ionicons } from "@expo/vector-icons";
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system/legacy";
// import { useRouter } from "expo-router";
// import * as Sharing from "expo-sharing";
// import * as SQLite from "expo-sqlite";
// import JSZip from "jszip";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useTheme } from "../../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function ProfileSettingsScreen() {
//   const { theme, colors, toggleTheme } = useTheme();
//   const router = useRouter();

//   // User State
//   const [user, setUser] = useState<any>(null);
//   // Language Modal State
//   const [languageModalVisible, setLanguageModalVisible] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

//   // ඩේටාබේස් එකෙන් යූසර් ඩේටා ලබා ගැනීම
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const result: any = await db.getAllAsync("SELECT * FROM users LIMIT 1;");
//       if (result && result.length > 0) {
//         setUser(result[0]);
//       } else {
//         // යූසර් කෙනෙක් නැත්නම් Login/Signup පේජ් එකට රීඩිරෙක්ට් කරන්න (අවශ්‍ය නම් router.replace('/login') දමන්න)
//         setUser({
//           name: "Suhan Hasan",
//           email: "example@email.com",
//           age: "21",
//           birthday: "2004-10-24",
//         });
//       }
//     } catch (error) {
//       console.log("Error fetching user:", error);
//     }
//   };

//   // භාෂා ලැයිස්තුව (කොඩි සමඟ)
//   const languages = [
//     { name: "English (US)", flag: "🇺🇸" },
//     { name: "Sinhala (සිංහල)", flag: "🇱🇰" },
//     { name: "German (Germany)", flag: "🇩🇪" },
//     { name: "Japanese (日本語)", flag: "🇯🇵" },
//     { name: "Chinese (中文)", flag: "🇨🇳" },
//   ];

//   // --- EXPORT ZIP BACKUP ---
//   const handleExportZip = async () => {
//     try {
//       const zip = new JSZip();
//       const allRows = await db.getAllAsync("SELECT * FROM flashcards;");
//       zip.file("flashcards.json", JSON.stringify(allRows, null, 2));

//       const mediaFolder = zip.folder("media");
//       const docFiles = await FileSystem.readDirectoryAsync(
//         FileSystem.documentDirectory!,
//       );

//       for (const file of docFiles) {
//         if (
//           file !== "FlashcardBackup" &&
//           file !== "SQLite" &&
//           file !== "Expo" &&
//           !file.endsWith(".zip")
//         ) {
//           const fileUri = `${FileSystem.documentDirectory}${file}`;
//           const fileInfo = await FileSystem.getInfoAsync(fileUri);

//           if (!fileInfo.isDirectory) {
//             const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
//               encoding: FileSystem.EncodingType.Base64,
//             });
//             mediaFolder?.file(file, fileBase64, { base64: true });
//           }
//         }
//       }

//       const base64Zip = await zip.generateAsync({ type: "base64" });
//       const zipUri = `${FileSystem.documentDirectory}flashcards_backup.zip`;

//       await FileSystem.writeAsStringAsync(zipUri, base64Zip, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       if (!(await Sharing.isAvailableAsync())) {
//         Alert.alert(
//           "දෝෂයකි",
//           "මෙම උපාංගයේ ෂෙයාර් කිරීමේ පහසුකම ක්‍රියාත්මක නොවේ.",
//         );
//         return;
//       }

//       await Sharing.shareAsync(zipUri, {
//         dialogTitle: "ෆ්ලෑෂ් කාඩ් සම්පූර්ණ බැකප් එක (ZIP)",
//         mimeType: "application/zip",
//         UTI: "public.zip",
//       });
//     } catch (error) {
//       console.log("Export ZIP error:", error);
//       Alert.alert("දෝෂයක් ඇති විය", "බැකප් එක සෑදීම අසාර්ථක විය.");
//     }
//   };

//   // --- IMPORT ZIP BACKUP ---
//   const handleImportZip = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["application/zip", "application/x-zip-compressed", "*/*"],
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) return;
//       const selectedFile = result.assets[0];

//       const response = await fetch(selectedFile.uri);
//       const blob = await response.blob();

//       const base64Data: string = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const resultStr = reader.result as string;
//           const base64 = resultStr.includes(",")
//             ? resultStr.split(",")[1]
//             : resultStr;
//           resolve(base64);
//         };
//         reader.onerror = (error) => reject(error);
//         reader.readAsDataURL(blob);
//       });

//       const zip = new JSZip();
//       const loadedZip = await zip.loadAsync(base64Data, { base64: true });
//       const zipFiles = loadedZip.files;

//       let jsonFile = loadedZip.file("flashcards.json");
//       if (!jsonFile) {
//         const jsonKey = Object.keys(zipFiles).find((k) =>
//           k.endsWith("flashcards.json"),
//         );
//         if (jsonKey) jsonFile = loadedZip.file(jsonKey);
//       }

//       if (!jsonFile) {
//         Alert.alert("දෝෂයකි", "බැකප් එකේ 'flashcards.json' ගොනුව හමු නොවීය.");
//         return;
//       }

//       const jsonString = await jsonFile.async("string");
//       const parsedData = JSON.parse(jsonString);

//       for (const relativePath of Object.keys(zipFiles)) {
//         if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
//           const fileName = relativePath.split("/").pop();
//           if (fileName) {
//             const fileData = await zipFiles[relativePath].async("base64");
//             const targetUri = `${FileSystem.documentDirectory}${fileName}`;
//             await FileSystem.writeAsStringAsync(targetUri, fileData, {
//               encoding: FileSystem.EncodingType.Base64,
//             });
//           }
//         }
//       }

//       for (const item of parsedData) {
//         let qContent = item.questionContent;
//         let aContent = item.answerContent;

//         if (
//           (item.questionType === "voice" || item.questionType === "image") &&
//           qContent
//         ) {
//           const fileName = qContent.split("/").pop();
//           if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
//         }

//         if (
//           (item.answerType === "voice" || item.answerType === "image") &&
//           aContent
//         ) {
//           const fileName = aContent.split("/").pop();
//           if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
//         }

//         await db.runAsync(
//           `INSERT OR REPLACE INTO flashcards (id, subject, lesson, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//           [
//             item.id,
//             item.subject,
//             item.lesson,
//             item.questionType,
//             qContent,
//             item.answerType,
//             aContent,
//             item.reminderEnabled,
//             item.reminderDays,
//           ],
//         );
//       }

//       Alert.alert("සාර්ථකයි! 📥", "බැකප් එක සාර්ථකව ප්‍රතිස්ථාපනය කරන ලදී!");
//     } catch (error: any) {
//       console.log("Import error:", error);
//       Alert.alert(
//         "දෝෂයක් ඇති විය ❌",
//         error?.message || "රීස්ටෝර් කිරීම අසාර්ථක විය.",
//       );
//     }
//   };

//   const setupUserTable = async () => {
//     try {
//       await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         email TEXT,
//         password TEXT,
//         age TEXT,
//         birthday TEXT,
//         avatar TEXT
//       );
//     `);
//       console.log("Users table created successfully! ✅");
//     } catch (error) {
//       console.log("Error creating users table:", error);
//     }
//     // Call the function to create the table when the component mounts
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Profile Header Card */}
//       <View
//         style={[styles.profileCard, { backgroundColor: colors.cardBackground }]}
//       >
//         <Image
//           source={{
//             uri:
//               user?.avatar ||
//               "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
//           }}
//           style={styles.avatar}
//         />
//         <Text style={[styles.profileName, { color: colors.text }]}>
//           {user?.name || "User Name"}
//         </Text>
//         <Text style={[styles.profileEmail, { color: colors.tint }]}>
//           {user?.email || "user@email.com"}
//         </Text>

//         {/* Edit Profile Button */}
//         <TouchableOpacity
//           style={[
//             styles.editProfileBtn,
//             { backgroundColor: colors.primary + "15" },
//           ]}
//           onPress={() => router.push("/edit-profile")}
//         >
//           <Ionicons name="create-outline" size={16} color={colors.primary} />
//           <Text style={[styles.editProfileText, { color: colors.primary }]}>
//             Edit Profile
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* General / Management Section */}
//       <Text style={[styles.sectionHeader, { color: colors.text }]}>
//         Management
//       </Text>

//       {/* Manage Subjects Bar */}
//       <TouchableOpacity
//         style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
//         onPress={() => router.push("/edit-subjects")}
//       >
//         <View style={styles.menuLeft}>
//           <Ionicons name="book-outline" size={22} color={colors.primary} />
//           <Text style={[styles.menuText, { color: colors.text }]}>
//             Manage Subjects & Lessons
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={18} color={colors.tint} />
//       </TouchableOpacity>

//       {/* Preferences Section */}
//       <Text style={[styles.sectionHeader, { color: colors.text }]}>
//         Preferences
//       </Text>

//       {/* Dark Mode Toggle */}
//       <View
//         style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
//       >
//         <View style={styles.menuLeft}>
//           <Ionicons
//             name={theme === "dark" ? "moon" : "sunny"}
//             size={22}
//             color={colors.primary}
//           />
//           <Text style={[styles.menuText, { color: colors.text }]}>
//             Dark Mode
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={[
//             styles.toggleBtn,
//             {
//               backgroundColor:
//                 theme === "dark" ? colors.primary : colors.tint + "40",
//             },
//           ]}
//           onPress={toggleTheme}
//         >
//           <View
//             style={[
//               styles.toggleCircle,
//               theme === "dark" ? styles.toggleOn : styles.toggleOff,
//             ]}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Language Selector Bar */}
//       <TouchableOpacity
//         style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
//         onPress={() => setLanguageModalVisible(true)}
//       >
//         <View style={styles.menuLeft}>
//           <Ionicons name="language-outline" size={22} color={colors.primary} />
//           <Text style={[styles.menuText, { color: colors.text }]}>
//             Language
//           </Text>
//         </View>
//         <View style={styles.langRight}>
//           <Text style={[styles.langSelectedText, { color: colors.tint }]}>
//             {selectedLanguage}
//           </Text>
//           <Ionicons name="chevron-forward" size={18} color={colors.tint} />
//         </View>
//       </TouchableOpacity>

//       {/* Backup & Restore Section */}
//       <Text style={[styles.sectionHeader, { color: colors.text }]}>
//         Backup & Data
//       </Text>

//       <TouchableOpacity
//         style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
//         onPress={handleExportZip}
//       >
//         <View style={styles.menuLeft}>
//           <Ionicons
//             name="cloud-upload-outline"
//             size={22}
//             color={colors.primary}
//           />
//           <Text style={[styles.menuText, { color: colors.text }]}>
//             Export Backup (ZIP)
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={18} color={colors.tint} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.menuItem,
//           { backgroundColor: colors.cardBackground, marginBottom: 40 },
//         ]}
//         onPress={handleImportZip}
//       >
//         <View style={styles.menuLeft}>
//           <Ionicons
//             name="cloud-download-outline"
//             size={22}
//             color={colors.primary}
//           />
//           <Text style={[styles.menuText, { color: colors.text }]}>
//             Import Backup (ZIP)
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={18} color={colors.tint} />
//       </TouchableOpacity>

//       {/* Language Selection Modal with Flags */}
//       <Modal
//         visible={languageModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setLanguageModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View
//             style={[
//               styles.modalContent,
//               { backgroundColor: colors.cardBackground },
//             ]}
//           >
//             <Text style={[styles.modalTitle, { color: colors.text }]}>
//               Select Language
//             </Text>

//             {languages.map((lang) => (
//               <TouchableOpacity
//                 key={lang.name}
//                 style={styles.langOptionRow}
//                 onPress={() => {
//                   setSelectedLanguage(lang.name);
//                   setLanguageModalVisible(false);
//                 }}
//               >
//                 <View style={styles.langOptionLeft}>
//                   <Text style={styles.flagEmoji}>{lang.flag}</Text>
//                   <Text style={[styles.langOptionText, { color: colors.text }]}>
//                     {lang.name}
//                   </Text>
//                 </View>
//                 {selectedLanguage === lang.name && (
//                   <Ionicons
//                     name="checkmark-circle"
//                     size={20}
//                     color={colors.primary}
//                   />
//                 )}
//               </TouchableOpacity>
//             ))}

//             <TouchableOpacity
//               style={[
//                 styles.modalCloseBtn,
//                 { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setLanguageModalVisible(false)}
//             >
//               <Text style={styles.modalCloseText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, paddingTop: 50 },
//   profileCard: {
//     alignItems: "center",
//     padding: 20,
//     borderRadius: 20,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
//   profileName: { fontSize: 18, fontWeight: "bold" },
//   profileEmail: { fontSize: 13, marginTop: 2, marginBottom: 12 },
//   editProfileBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   editProfileText: { fontSize: 12, fontWeight: "bold" },
//   sectionHeader: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 15,
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   menuItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 10,
//     elevation: 1,
//   },
//   menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
//   menuText: { fontSize: 14, fontWeight: "600" },
//   toggleBtn: {
//     width: 44,
//     height: 24,
//     borderRadius: 12,
//     padding: 2,
//     justifyContent: "center",
//   },
//   toggleCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//   },
//   toggleOn: { alignSelf: "flex-end" },
//   toggleOff: { alignSelf: "flex-start" },
//   langRight: { flexDirection: "row", alignItems: "center", gap: 6 },
//   langSelectedText: { fontSize: 13 },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 24,
//     paddingBottom: 40,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   langOptionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ffffff10",
//   },
//   langOptionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
//   flagEmoji: { fontSize: 22 },
//   langOptionText: { fontSize: 15, fontWeight: "500" },
//   modalCloseBtn: {
//     marginTop: 20,
//     padding: 14,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   modalCloseText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
// });

import SwipeableNavigator from "@/components/SwipeableNavigator";
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useFocusEffect, useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import JSZip from "jszip";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

const db = SQLite.openDatabaseSync("flashcards.db");

export default function ProfileSettingsScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const router = useRouter();
  const { t, setLocale } = useLanguage();

  // User State
  const [user, setUser] = useState<any>();
  //   {
  //   name: "Suhan Hasan",
  //   email: "example@email.com",
  //   avatar:
  //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
  // }

  // Language Modal State
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

  // Language list with flags
  // const languages = [
  //   { name: "English (US)", flag: "🇺🇸", lang: "en" },
  //   { name: "Sinhala (සිංහල)", flag: "🇱🇰", lang: "si" },
  //   { name: "German (Germany)", flag: "🇩🇪", lang: "de" },
  //   { name: "Japanese (日本語)", flag: "🇯🇵", lang: "ja" },
  //   { name: "Chinese (中文)", flag: "🇨🇳", lang: "zh" },
  // ];
  const languages = [
    { name: "English (US)", flag: "🇺🇸", lang: "en" },
    { name: "Sinhala (සිංහල)", flag: "🇱🇰", lang: "si" },
    { name: "Tamil (தமிழ்)", flag: "🇱🇰", lang: "ta" },
    { name: "Chinese (中文)", flag: "🇨🇳", lang: "zh" },
    { name: "Japanese (日本語)", flag: "🇯🇵", lang: "ja" },
    { name: "Vietnamese (Tiếng Việt)", flag: "🇻🇳", lang: "vi" },
    { name: "Thai (ไทย)", flag: "🇹🇭", lang: "th" },
    { name: "Korean (한국어)", flag: "🇰🇷", lang: "ko" },
    { name: "German (Deutsch)", flag: "🇩🇪", lang: "de" },
    { name: "Russian (Русский)", flag: "🇷🇺", lang: "ru" },
    { name: "Hindi (हिन्दी)", flag: "🇮🇳", lang: "hi" },
    { name: "Arabic (العربية)", flag: "🇸🇦", lang: "ar" },
    { name: "French (Français)", flag: "🇫🇷", lang: "fr" },
    { name: "Hebrew (עברית)", flag: "🇮🇱", lang: "he" },
    { name: "Burmese (မြန်မာ)", flag: "🇲🇲", lang: "my" },
    { name: "Malay (Melayu)", flag: "🇲🇾", lang: "ms" },
    { name: "Indonesian (Indonesia)", flag: "🇮🇩", lang: "id" },
  ];

  // Fetch user data on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, []),
  );

  // const fetchUserData = async () => {
  //   try {
  //     const result: any = await db.getAllAsync("SELECT * FROM users LIMIT 1;");
  //     if (result && result.length > 0) {
  //       setUser(result[0]);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching user profile:", error);
  //   }
  // };
  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("USER_PROFILE");
      if (jsonValue !== null) {
        const parsedData = JSON.parse(jsonValue);
        setUser(parsedData); // ඔබේ state එකට ඩෙටා දමා ගැනීම
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  // --- EXPORT ZIP BACKUP ---
  // const handleExportZip = async () => {
  //   try {
  //     const zip = new JSZip();
  //     const allRows = await db.getAllAsync("SELECT * FROM flashcards;");
  //     zip.file("flashcards.json", JSON.stringify(allRows, null, 2));

  //     const mediaFolder = zip.folder("media");
  //     const docFiles = await FileSystem.readDirectoryAsync(
  //       FileSystem.documentDirectory!,
  //     );

  //     for (const file of docFiles) {
  //       if (
  //         file !== "FlashcardBackup" &&
  //         file !== "SQLite" &&
  //         file !== "Expo" &&
  //         !file.endsWith(".zip")
  //       ) {
  //         const fileUri = `${FileSystem.documentDirectory}${file}`;
  //         const fileInfo = await FileSystem.getInfoAsync(fileUri);

  //         if (!fileInfo.isDirectory) {
  //           const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //           mediaFolder?.file(file, fileBase64, { base64: true });
  //         }
  //       }
  //     }

  //     const base64Zip = await zip.generateAsync({ type: "base64" });
  //     const zipUri = `${FileSystem.documentDirectory}flashcards_backup.zip`;

  //     await FileSystem.writeAsStringAsync(zipUri, base64Zip, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     if (!(await Sharing.isAvailableAsync())) {
  //       Alert.alert(
  //         "Doshayak",
  //         "Me upangaye sharing pahasukama kriyathmaka nowe.",
  //       );
  //       return;
  //     }

  //     await Sharing.shareAsync(zipUri, {
  //       dialogTitle: "Flashcard Sampurna Backup eka (ZIP)",
  //       mimeType: "application/zip",
  //       UTI: "public.zip",
  //     });
  //   } catch (error) {
  //     console.log("Export ZIP error:", error);
  //     Alert.alert("Doshayak", "Backup eka sadheema asarthakai.");
  //   }
  // };

  // // --- IMPORT ZIP BACKUP ---
  // const handleImportZip = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: ["application/zip", "application/x-zip-compressed", "*/*"],
  //       copyToCacheDirectory: true,
  //     });

  //     if (result.canceled) return;
  //     const selectedFile = result.assets[0];

  //     const response = await fetch(selectedFile.uri);
  //     const blob = await response.blob();

  //     const base64Data: string = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const resultStr = reader.result as string;
  //         const base64 = resultStr.includes(",")
  //           ? resultStr.split(",")[1]
  //           : resultStr;
  //         resolve(base64);
  //       };
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(blob);
  //     });

  //     const zip = new JSZip();
  //     const loadedZip = await zip.loadAsync(base64Data, { base64: true });
  //     const zipFiles = loadedZip.files;

  //     let jsonFile = loadedZip.file("flashcards.json");
  //     if (!jsonFile) {
  //       const jsonKey = Object.keys(zipFiles).find((k) =>
  //         k.endsWith("flashcards.json"),
  //       );
  //       if (jsonKey) jsonFile = loadedZip.file(jsonKey);
  //     }

  //     if (!jsonFile) {
  //       Alert.alert(
  //         "Doshayak",
  //         "Backup eke 'flashcards.json' gonuwa hamu noweewi.",
  //       );
  //       return;
  //     }

  //     const jsonString = await jsonFile.async("string");
  //     const parsedData = JSON.parse(jsonString);

  //     for (const relativePath of Object.keys(zipFiles)) {
  //       if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
  //         const fileName = relativePath.split("/").pop();
  //         if (fileName) {
  //           const fileData = await zipFiles[relativePath].async("base64");
  //           const targetUri = `${FileSystem.documentDirectory}${fileName}`;
  //           await FileSystem.writeAsStringAsync(targetUri, fileData, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //         }
  //       }
  //     }

  //     for (const item of parsedData) {
  //       let qContent = item.questionContent;
  //       let aContent = item.answerContent;

  //       if (
  //         (item.questionType === "voice" || item.questionType === "image") &&
  //         qContent
  //       ) {
  //         const fileName = qContent.split("/").pop();
  //         if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
  //       }

  //       if (
  //         (item.answerType === "voice" || item.answerType === "image") &&
  //         aContent
  //       ) {
  //         const fileName = aContent.split("/").pop();
  //         if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
  //       }

  //       await db.runAsync(
  //         `INSERT OR REPLACE INTO flashcards (id, subject, lesson, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  //         [
  //           item.id,
  //           item.subject,
  //           item.lesson,
  //           item.questionType,
  //           qContent,
  //           item.answerType,
  //           aContent,
  //           item.reminderEnabled,
  //           item.reminderDays,
  //         ],
  //       );
  //     }

  //     Alert.alert(
  //       "Sarthakai! 📥",
  //       "Backup eka sarthakawa restore karana ladi!",
  //     );
  //   } catch (error: any) {
  //     console.log("Import error:", error);
  //     Alert.alert("Doshayak", error?.message || "Restore kireema asarthakai.");
  //   }
  // };
  // --- EXPORT ZIP BACKUP ---
  // const handleExportZip = async () => {
  //   try {
  //     const zip = new JSZip();
  //     const allRows = await db.getAllAsync("SELECT * FROM flashcards;");
  //     zip.file("flashcards.json", JSON.stringify(allRows, null, 2));

  //     const mediaFolder = zip.folder("media");
  //     const docFiles = await FileSystem.readDirectoryAsync(
  //       FileSystem.documentDirectory!,
  //     );

  //     for (const file of docFiles) {
  //       if (
  //         file !== "FlashcardBackup" &&
  //         file !== "SQLite" &&
  //         file !== "Expo" &&
  //         !file.endsWith(".zip")
  //       ) {
  //         const fileUri = `${FileSystem.documentDirectory}${file}`;
  //         const fileInfo = await FileSystem.getInfoAsync(fileUri);

  //         if (!fileInfo.isDirectory) {
  //           const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //           mediaFolder?.file(file, fileBase64, { base64: true });
  //         }
  //       }
  //     }

  //     const base64Zip = await zip.generateAsync({ type: "base64" });
  //     const zipUri = `${FileSystem.documentDirectory}flashcards_backup.zip`;

  //     await FileSystem.writeAsStringAsync(zipUri, base64Zip, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     if (!(await Sharing.isAvailableAsync())) {
  //       Alert.alert("දෝෂයක්", "මෙම උපකරණයේ sharing පහසුකම ක්‍රියාත්මක නොවේ.");
  //       return;
  //     }

  //     // සේ이브 වූ වහාම Share sheet එක ස්වයංක්‍රීයව පෙන්වයි
  //     await Sharing.shareAsync(zipUri, {
  //       dialogTitle: "Flashcard සම්පූර්ණ Backup එක (ZIP)",
  //       mimeType: "application/zip",
  //       UTI: "public.zip",
  //     });
  //   } catch (error) {
  //     console.log("Export ZIP error:", error);
  //     Alert.alert("දෝෂයක්", "Backup එක සැකසීම අසාර්ථකයි.");
  //   }
  // };
  // const handleExportZip = async () => {
  //   try {
  //     const zip = new JSZip();
  //     const allRows = await db.getAllAsync("SELECT * FROM flashcards;");
  //     zip.file("flashcards.json", JSON.stringify(allRows, null, 2));

  //     const mediaFolder = zip.folder("media");
  //     const docFiles = await FileSystem.readDirectoryAsync(
  //       FileSystem.documentDirectory!,
  //     );

  //     for (const file of docFiles) {
  //       if (
  //         file !== "FlashcardBackup" &&
  //         file !== "SQLite" &&
  //         file !== "Expo" &&
  //         !file.endsWith(".zip")
  //       ) {
  //         const fileUri = `${FileSystem.documentDirectory}${file}`;
  //         const fileInfo = await FileSystem.getInfoAsync(fileUri);

  //         if (!fileInfo.isDirectory) {
  //           const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //           mediaFolder?.file(file, fileBase64, { base64: true });
  //         }
  //       }
  //     }

  //     const base64Zip = await zip.generateAsync({ type: "base64" });

  //     // ස්වයංක්‍රීයව Timestamp එකක් සහිත ෆයිල් නම සැකසීම
  //     const now = new Date();
  //     const timestamp = now.toISOString().replace(/[:T]/g, "-").slice(0, 19);
  //     const fileName = `flashcards_backup_${timestamp}.zip`;

  //     // 🌟 1. පරිශීලකයාට ෆෝල්ඩරයක් තෝරාගැනීමට සිස්ටම් ඩයලොග් එක පෙන්වීම
  //     const permissions =
  //       await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  //     if (permissions.granted) {
  //       const directoryUri = permissions.directoryUri;

  //       // 🌟 2. තෝරාගත් ෆෝල්ඩරය තුළ අදාළ නමින් ෆයිල් එකක් නිර්මාණය කිරීම
  //       const createdFileUri =
  //         await FileSystem.StorageAccessFramework.createFileAsync(
  //           directoryUri,
  //           fileName,
  //           "application/zip",
  //         );

  //       // 🌟 3. ZIP ඩේටා අදාළ ෆයිල් එකට ලිවීම
  //       await FileSystem.StorageAccessFramework.writeAsStringAsync(
  //         createdFileUri,
  //         base64Zip,
  //         { encoding: FileSystem.EncodingType.Base64 },
  //       );

  //       Alert.alert(
  //         "සාර්ථකයි! 💾",
  //         "Backup ෆයිල් එක ඔබ තෝරාගත් ස්ථානයේ සාර්ථකව සුරකින ලදී!",
  //       );
  //     } else {
  //       Alert.alert("අවලංගුයි", "ඔබ ෆෝල්ඩරයක් තෝරාගැනීම ප්‍රතික්ෂේප කළා.");
  //     }
  //   } catch (error: any) {
  //     console.log("Export ZIP error:", error);
  //     Alert.alert("දෝෂයක්", "Backup එක සැකසීම අසාර්ථකයි.");
  //   }
  // };

  // --- 1. EXPORT ALL TABLES & MEDIA ---
  const handleExportZip = async () => {
    try {
      const zip = new JSZip();

      // ටේබල් තුනෙන්ම දත්ත ලබා ගැනීම
      const subjects = await db.getAllAsync("SELECT * FROM subjects;");
      const lessons = await db.getAllAsync("SELECT * FROM lessons;");
      const flashcards = await db.getAllAsync("SELECT * FROM flashcards;");

      const backupData = {
        subjects,
        lessons,
        flashcards,
      };

      // ටේබල් තුනේම දත්ත එකම JSON එකකට ඇතුළත් කිරීම
      zip.file("flashcards.json", JSON.stringify(backupData, null, 2));

      const mediaFolder = zip.folder("media");
      const docFiles = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory!,
      );

      for (const file of docFiles) {
        if (
          file !== "FlashcardBackup" &&
          file !== "SQLite" &&
          file !== "Expo" &&
          !file.endsWith(".zip")
        ) {
          const fileUri = `${FileSystem.documentDirectory}${file}`;
          const fileInfo = await FileSystem.getInfoAsync(fileUri);

          if (!fileInfo.isDirectory) {
            const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            mediaFolder?.file(file, fileBase64, { base64: true });
          }
        }
      }

      const base64Zip = await zip.generateAsync({ type: "base64" });

      const now = new Date();
      const timestamp = now.toISOString().replace(/[:T]/g, "-").slice(0, 19);
      const fileName = `flashcards_backup_${timestamp}.zip`;

      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;
        const createdFileUri =
          await FileSystem.StorageAccessFramework.createFileAsync(
            directoryUri,
            fileName,
            "application/zip",
          );

        await FileSystem.StorageAccessFramework.writeAsStringAsync(
          createdFileUri,
          base64Zip,
          { encoding: FileSystem.EncodingType.Base64 },
        );

        Alert.alert("සාර්ථකයි! 💾", "Backup ෆයිල් එක සාර්ථකව සුරකින ලදී!");
      } else {
        Alert.alert("අවලංගුයි", "ඔබ ෆෝල්ඩරයක් තෝරාගැනීම ප්‍රතික්ෂේප කළා.");
      }
    } catch (error: any) {
      console.log("Export ZIP error:", error);
      Alert.alert("දෝෂයක්", "Backup එක සැකසීම අසාර්ථකයි.");
    }
  };

  // --- 2. IMPORT & RESTORE ALL TABLES ---
  const handleImportZip = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/zip", "application/x-zip-compressed", "*/*"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;
      const selectedFile = result.assets[0];

      Alert.alert(
        "අවවාදයක්! ⚠️",
        "මෙම බැකප් එක රෙස්ටෝර් කිරීමේදී ඔබගේ දැනට ඇති සියලුම Subjects, Lessons සහ Flashcards දත්ත ඉවත් වී, බැකප් එකේ ඇති දත්ත පමණක් ඇතුළත් වේ. ඔබට දිගටම කරගෙන යාමට අවශ්‍යද?",
        [
          { text: "අවලංගු කරන්න", style: "cancel" },
          {
            text: "ඔව්, Restore කරන්න",
            style: "destructive",
            onPress: async () => {
              await executeRestore(selectedFile);
            },
          },
        ],
      );
    } catch (error: any) {
      console.log("Import error:", error);
      Alert.alert("දෝෂයක්", error?.message || "Restore කිරීම අසාර්ථකයි.");
    }
  };

  const executeRestore = async (selectedFile: any) => {
    try {
      const response = await fetch(selectedFile.uri);
      const blob = await response.blob();

      const base64Data: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const resultStr = reader.result as string;
          const base64 = resultStr.includes(",")
            ? resultStr.split(",")[1]
            : resultStr;
          resolve(base64);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });

      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(base64Data, { base64: true });
      const zipFiles = loadedZip.files;

      let jsonFile = loadedZip.file("flashcards.json");
      if (!jsonFile) {
        const jsonKey = Object.keys(zipFiles).find((k) =>
          k.endsWith("flashcards.json"),
        );
        if (jsonKey) jsonFile = loadedZip.file(jsonKey);
      }

      if (!jsonFile) {
        Alert.alert("දෝෂයක්", "Backup එකේ 'flashcards.json' ගොනුව හමුනොවේ.");
        return;
      }

      const jsonString = await jsonFile.async("string");
      const backupData = JSON.parse(jsonString);

      // පරණ දත්ත ඉවත් කිරීම (Foreign Key ගැටලු මඟහරවා ගැනීමට නිවැරදි පිළිවෙළට: Flashcards -> Lessons -> Subjects)
      await db.runAsync("DELETE FROM flashcards;");
      await db.runAsync("DELETE FROM lessons;");
      await db.runAsync("DELETE FROM subjects;");

      // මීඩියා ෆයිල්ස් documentDirectory වෙත සේව් කරගැනීම
      for (const relativePath of Object.keys(zipFiles)) {
        if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
          const fileName = relativePath.split("/").pop();
          if (fileName) {
            const fileData = await zipFiles[relativePath].async("base64");
            const targetUri = `${FileSystem.documentDirectory}${fileName}`;
            await FileSystem.writeAsStringAsync(targetUri, fileData, {
              encoding: FileSystem.EncodingType.Base64,
            });
          }
        }
      }

      // 1. Subjects ඇතුළත් කිරීම
      for (const sub of backupData.subjects || []) {
        await db.runAsync(`INSERT INTO subjects (id, name) VALUES (?, ?);`, [
          sub.id,
          sub.name,
        ]);
      }

      // 2. Lessons ඇතුළත් කිරීම
      for (const les of backupData.lessons || []) {
        await db.runAsync(
          `INSERT INTO lessons (id, subject_id, name) VALUES (?, ?, ?);`,
          [les.id, les.subject_id, les.name],
        );
      }

      // 3. Flashcards ඇතුළත් කිරීම
      for (const item of backupData.flashcards || []) {
        let qContent = item.questionContent;
        let aContent = item.answerContent;

        if (
          (item.questionType === "voice" || item.questionType === "image") &&
          qContent
        ) {
          const fileName = qContent.split("/").pop();
          if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
        }

        if (
          (item.answerType === "voice" || item.answerType === "image") &&
          aContent
        ) {
          const fileName = aContent.split("/").pop();
          if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
        }

        await db.runAsync(
          `INSERT INTO flashcards (id, subject_id, lesson_id, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            item.id,
            item.subject_id,
            item.lesson_id,
            item.questionType,
            qContent,
            item.answerType,
            aContent,
            item.reminderEnabled,
            item.reminderDays,
          ],
        );
      }

      Alert.alert(
        "සාර්ථකයි! 📥",
        "Subjects, Lessons සහ Flashcards සියල්ල සාර්ථකව Restore කරන ලදී!",
      );
    } catch (error: any) {
      console.log("Restore execution error:", error);
      Alert.alert("දෝෂයක්", error?.message || "Restore කිරීම අසාර්ථකයි.");
    }
  };
  // --- IMPORT ZIP BACKUP ---
  // const handleImportZip = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: ["application/zip", "application/x-zip-compressed", "*/*"],
  //       copyToCacheDirectory: true,
  //     });

  //     if (result.canceled) return;
  //     const selectedFile = result.assets[0];

  //     // 🌟 isn't readable දෝෂය මඟහරවා ගැනීමට fetch සහ FileReader භාවිතය
  //     const response = await fetch(selectedFile.uri);
  //     const blob = await response.blob();

  //     const base64Data: string = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const resultStr = reader.result as string;
  //         const base64 = resultStr.includes(",")
  //           ? resultStr.split(",")[1]
  //           : resultStr;
  //         resolve(base64);
  //       };
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(blob);
  //     });

  //     const zip = new JSZip();
  //     const loadedZip = await zip.loadAsync(base64Data, { base64: true });
  //     const zipFiles = loadedZip.files;

  //     let jsonFile = loadedZip.file("flashcards.json");
  //     if (!jsonFile) {
  //       const jsonKey = Object.keys(zipFiles).find((k) =>
  //         k.endsWith("flashcards.json"),
  //       );
  //       if (jsonKey) jsonFile = loadedZip.file(jsonKey);
  //     }

  //     if (!jsonFile) {
  //       Alert.alert("දෝෂයක්", "Backup එකේ 'flashcards.json' ගොනුව හමුනොවේ.");
  //       return;
  //     }

  //     const jsonString = await jsonFile.async("string");
  //     const parsedData = JSON.parse(jsonString);

  //     for (const relativePath of Object.keys(zipFiles)) {
  //       if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
  //         const fileName = relativePath.split("/").pop();
  //         if (fileName) {
  //           const fileData = await zipFiles[relativePath].async("base64");
  //           const targetUri = `${FileSystem.documentDirectory}${fileName}`;
  //           await FileSystem.writeAsStringAsync(targetUri, fileData, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //         }
  //       }
  //     }

  //     for (const item of parsedData) {
  //       let qContent = item.questionContent;
  //       let aContent = item.answerContent;

  //       if (
  //         (item.questionType === "voice" || item.questionType === "image") &&
  //         qContent
  //       ) {
  //         const fileName = qContent.split("/").pop();
  //         if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
  //       }

  //       if (
  //         (item.answerType === "voice" || item.answerType === "image") &&
  //         aContent
  //       ) {
  //         const fileName = aContent.split("/").pop();
  //         if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
  //       }

  //       await db.runAsync(
  //         `INSERT OR REPLACE INTO flashcards (id, subject_id, lesson_id, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  //         [
  //           item.id,
  //           item.subject_id,
  //           item.lesson_id,
  //           item.questionType,
  //           qContent,
  //           item.answerType,
  //           aContent,
  //           item.reminderEnabled,
  //           item.reminderDays,
  //         ],
  //       );
  //     }

  //     Alert.alert("සාර්ථකයි! 📥", "Backup එක සාර්ථකව Restore කරන ලදී!");
  //   } catch (error: any) {
  //     console.log("Import error:", error);
  //     Alert.alert("දෝෂයක්", error?.message || "Restore කිරීම අසාර්ථකයි.");
  //   }
  // };

  // // --- IMPORT ZIP BACKUP WITH CONFIRMATION & CLEAR DB ---
  // const handleImportZip = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: ["application/zip", "application/x-zip-compressed", "*/*"],
  //       copyToCacheDirectory: true,
  //     });

  //     if (result.canceled) return;
  //     const selectedFile = result.assets[0];

  //     // 🌟 1. දත්ත මැකී යාම පිළිබඳව පරිශීලකයාට අනතුරු ඇඟවීමේ ඇලට් එක පෙන්වීම
  //     Alert.alert(
  //       "අවවාදයක්! ⚠️",
  //       "මෙම බැකප් එක රෙස්ටෝර් කිරීමේදී ඔබගේ දැනට ඇති සියලුම ෆ්ලෑෂ් කාඩ් දත්ත ඉවත් වී, බැකප් එකේ ඇති දත්ත පමණක් ඇතුළත් වේ. ඔබට දිගටම කරගෙන යාමට අවශ්‍යද?",
  //       [
  //         {
  //           text: "අවලංගු කරන්න",
  //           style: "cancel",
  //         },
  //         {
  //           text: "ඔව්, දත්ත මකා දමා Restore කරන්න",
  //           style: "destructive",
  //           onPress: async () => {
  //             await executeRestore(selectedFile);
  //           },
  //         },
  //       ],
  //     );
  //   } catch (error: any) {
  //     console.log("Import error:", error);
  //     Alert.alert("දෝෂයක්", error?.message || "Restore කිරීම අසාර්ථකයි.");
  //   }
  // };

  // // 🌟 2. දත්ත මකා දැමීම සහ රෙස්ටෝර් කිරීමේ ප්‍රධාන ක්‍රියාවලිය
  // const executeRestore = async (selectedFile: any) => {
  //   try {
  //     const response = await fetch(selectedFile.uri);
  //     const blob = await response.blob();

  //     const base64Data: string = await new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const resultStr = reader.result as string;
  //         const base64 = resultStr.includes(",")
  //           ? resultStr.split(",")[1]
  //           : resultStr;
  //         resolve(base64);
  //       };
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(blob);
  //     });

  //     const zip = new JSZip();
  //     const loadedZip = await zip.loadAsync(base64Data, { base64: true });
  //     const zipFiles = loadedZip.files;

  //     let jsonFile = loadedZip.file("flashcards.json");
  //     if (!jsonFile) {
  //       const jsonKey = Object.keys(zipFiles).find((k) =>
  //         k.endsWith("flashcards.json"),
  //       );
  //       if (jsonKey) jsonFile = loadedZip.file(jsonKey);
  //     }

  //     if (!jsonFile) {
  //       Alert.alert("දෝෂයක්", "Backup එකේ 'flashcards.json' ගොනුව හමුනොවේ.");
  //       return;
  //     }

  //     const jsonString = await jsonFile.async("string");
  //     const parsedData = JSON.parse(jsonString);

  //     // 🌟 3. නව දත්ත ඇතුළත් කිරීමට පෙර ඩේටාබේස් එකේ පරණ දත්ත සියල්ල සම්පූර්ණයෙන්ම ඉවත් කිරීම
  //     await db.runAsync("DELETE FROM flashcards;");
  //     await db.runAsync("DELETE FROM lessons;");
  //     await db.runAsync("DELETE FROM subjects;");

  //     // 4. මීඩියා ෆයිල්ස් documentDirectory වෙත සේව් කරගැනීම
  //     for (const relativePath of Object.keys(zipFiles)) {
  //       if (relativePath.includes("media/") && !zipFiles[relativePath].dir) {
  //         const fileName = relativePath.split("/").pop();
  //         if (fileName) {
  //           const fileData = await zipFiles[relativePath].async("base64");
  //           const targetUri = `${FileSystem.documentDirectory}${fileName}`;
  //           await FileSystem.writeAsStringAsync(targetUri, fileData, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //         }
  //       }
  //     }

  //     // 5. බැකප් එකේ ඇති නව දත්ත ඩේටාබේස් එකට ඇතුළත් කිරීම
  //     for (const item of parsedData) {
  //       let qContent = item.questionContent;
  //       let aContent = item.answerContent;

  //       if (
  //         (item.questionType === "voice" || item.questionType === "image") &&
  //         qContent
  //       ) {
  //         const fileName = qContent.split("/").pop();
  //         if (fileName) qContent = `${FileSystem.documentDirectory}${fileName}`;
  //       }

  //       if (
  //         (item.answerType === "voice" || item.answerType === "image") &&
  //         aContent
  //       ) {
  //         const fileName = aContent.split("/").pop();
  //         if (fileName) aContent = `${FileSystem.documentDirectory}${fileName}`;
  //       }

  //       await db.runAsync(
  //         `INSERT INTO flashcards (id, subject_id, lesson_id, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  //         [
  //           item.id,
  //           item.subject_id,
  //           item.lesson_id,
  //           item.questionType,
  //           qContent,
  //           item.answerType,
  //           aContent,
  //           item.reminderEnabled,
  //           item.reminderDays,
  //         ],
  //       );
  //     }

  //     Alert.alert(
  //       "සාර්ථකයි! 📥",
  //       "පරණ දත්ත ඉවත් කර Backup එක සාර්ථකව Restore කරන ලදී!",
  //     );
  //   } catch (error: any) {
  //     console.log("Restore execution error:", error);
  //     Alert.alert("දෝෂයක්", error?.message || "Restore කිරීම අසාර්ථකයි.");
  //   }
  // };

  return (
    <SwipeableNavigator>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <Image
            source={{
              uri:
                user?.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
            }}
            style={styles.avatar}
          />
          <Text style={[styles.profileName, { color: colors.text }]}>
            {user?.name || "User Name"}
          </Text>
          <Text style={[styles.profileEmail, { color: colors.tint }]}>
            {user?.email || "user@email.com"}
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={[
              styles.editProfileBtn,
              { backgroundColor: colors.primary + "15" },
            ]}
            onPress={() => router.push("/edit-profile")}
          >
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text style={[styles.editProfileText, { color: colors.primary }]}>
              {t("settings", "editProfile")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Management Section */}
        <Text style={[styles.sectionHeader, { color: colors.text }]}>
          {t("settings", "management")}
        </Text>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
          onPress={() => router.push("/edit-subjects")}
        >
          <View style={styles.menuLeft}>
            <Ionicons name="book-outline" size={22} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>
              {t("settings", "manageSubjects")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>

        {/* Preferences Section */}
        <Text style={[styles.sectionHeader, { color: colors.text }]}>
          {t("settings", "preferences")}
        </Text>

        {/* Dark Mode Toggle */}
        <View
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name={theme === "dark" ? "moon" : "sunny"}
              size={22}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              {t("settings", "darkMode")}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              {
                backgroundColor:
                  theme === "dark" ? colors.primary : colors.tint + "40",
              },
            ]}
            onPress={toggleTheme}
          >
            <View
              style={[
                styles.toggleCircle,
                theme === "dark" ? styles.toggleOn : styles.toggleOff,
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* Language Selector Bar with Flag */}
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
          onPress={() => setLanguageModalVisible(true)}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="language-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              {t("settings", "language")}
            </Text>
          </View>
          <View style={styles.langRight}>
            <Text style={[styles.langSelectedText, { color: colors.tint }]}>
              {selectedLanguage}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.tint} />
          </View>
        </TouchableOpacity>

        {/* Backup & Data Section */}
        <Text style={[styles.sectionHeader, { color: colors.text }]}>
          {t("settings", "backup")}
        </Text>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
          onPress={handleExportZip}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="cloud-upload-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              {t("settings", "exportData")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: colors.cardBackground, marginBottom: 40 },
          ]}
          onPress={handleImportZip}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="cloud-download-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              {t("settings", "importData")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>

        {/* Language Modal with Flags */}
        {/* <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t("settings", "selectLanguage")}
            </Text>

            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.name}
                style={styles.langOptionRow}
                onPress={() => {
                  setSelectedLanguage(lang.name);
                  setLocale(lang.lang); // Update the locale in the context
                  console.log("Selected Language:", lang.name);
                  setLanguageModalVisible(false);
                }}
              >
                <View style={styles.langOptionLeft}>
                  <Text style={styles.flagEmoji}>{lang.flag}</Text>
                  <Text style={[styles.langOptionText, { color: colors.text }]}>
                    {lang.name}
                  </Text>
                </View>
                {selectedLanguage === lang.name && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.modalCloseBtn,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>{t("common", "done")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
        <Modal
          visible={languageModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setLanguageModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t("settings", "selectLanguage")}
              </Text>

              {/* 1. ලැයිස්තුව ස්ක්‍රෝල් කිරීමට හැකි වන සේ ScrollView එකක් එකතු කරන ලදී */}
              <ScrollView
                style={styles.scrollViewStyle}
                showsVerticalScrollIndicator={false}
              >
                {languages.map((lang: any) => (
                  <TouchableOpacity
                    key={lang.name}
                    style={styles.langOptionRow}
                    onPress={() => {
                      setSelectedLanguage(lang.name);
                      setLocale(lang.lang); // Update the locale in the context
                      console.log("Selected Language:", lang.name);
                      // setLanguageModalVisible(false);
                    }}
                  >
                    <View style={styles.langOptionLeft}>
                      <Text style={styles.flagEmoji}>{lang.flag}</Text>
                      <Text
                        style={[styles.langOptionText, { color: colors.text }]}
                      >
                        {lang.name}
                      </Text>
                    </View>
                    {selectedLanguage === lang.name && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={[
                  styles.modalCloseBtn,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => {
                  setLanguageModalVisible(false);
                }}
              >
                <Text style={styles.modalCloseText}>{t("common", "done")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SwipeableNavigator>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    maxHeight: "80%", // 2. මෝඩල් එක සම්පූර්ණ ස්ক্রීන් එකම වැසී යාම වැළැක්වීමට උපරිම උසක් ලබා දීම
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollViewStyle: {
    maxHeight: 350, // 3. ලැයිස්තුවට පමණක් ස්ක්‍රෝල් වීමට උස සීමා කිරීම
  },
  langOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  langOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  langOptionText: {
    fontSize: 16,
  },
  modalCloseBtn: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: { flex: 1, padding: 20, paddingTop: 50 },
  profileCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  profileEmail: { fontSize: 13, marginTop: 2, marginBottom: 12 },
  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editProfileText: { fontSize: 12, fontWeight: "bold" },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 1,
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuText: { fontSize: 14, fontWeight: "600" },
  toggleBtn: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  toggleOn: { alignSelf: "flex-end" },
  toggleOff: { alignSelf: "flex-start" },
  langRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  langSelectedText: { fontSize: 13 },
  // modalOverlay: {
  //   flex: 1,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   justifyContent: "flex-end",
  // },
  // modalContent: {
  //   borderTopLeftRadius: 24,
  //   borderTopRightRadius: 24,
  //   padding: 24,
  //   paddingBottom: 40,
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 16,
  //   textAlign: "center",
  // },
  // langOptionRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingVertical: 14,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ffffff10",
  // },
  // langOptionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  // flagEmoji: { fontSize: 22 },
  // langOptionText: { fontSize: 15, fontWeight: "500" },
  // modalCloseBtn: {
  //   marginTop: 20,
  //   padding: 14,
  //   borderRadius: 14,
  //   alignItems: "center",
  // },
  // modalCloseText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});

// import { Ionicons } from "@expo/vector-icons";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useTheme } from "../../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function SettingsScreen() {
//   const { colors } = useTheme();
//   const [subjects, setSubjects] = useState<any[]>([]);
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [newSubjectName, setNewSubjectName] = useState("");
//   const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
//     null,
//   );
//   const [newLessonName, setNewLessonName] = useState("");

//   // Edit Modal States
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingType, setEditingType] = useState<"subject" | "lesson" | null>(
//     null,
//   );
//   const [editingItem, setEditingItem] = useState<any>(null);
//   const [editText, setEditText] = useState("");

//   useEffect(() => {
//     initDBAndLoad();
//   }, []);

//   const initDBAndLoad = async () => {
//     try {
//       // ඩේටාබේස් වගු සෑදීම
//       await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS subjects (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           name TEXT UNIQUE
//         );
//         CREATE TABLE IF NOT EXISTS lessons (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           subject_id INTEGER,
//           name TEXT
//         );
//       `);

//       // පළමු වරට ඩේටා හිස් නම් පෙරනිමි විෂයයන් සහ පාඩම් ඇතුළත් කිරීම
//       const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
//       if (subs.length === 0) {
//         const defaultSubs = ["Chemistry", "Physics", "Combined Maths"];
//         for (const sub of defaultSubs) {
//           const res: any = await db.runAsync(
//             "INSERT OR IGNORE INTO subjects (name) VALUES (?);",
//             [sub],
//           );
//           const count = sub === "Physics" ? 9 : 10;
//           const subId = res.lastInsertRowId;
//           if (subId) {
//             for (let i = 1; i <= count; i++) {
//               await db.runAsync(
//                 "INSERT INTO lessons (subject_id, name) VALUES (?, ?);",
//                 [subId, `පාඩම ${i}`],
//               );
//             }
//           }
//         }
//       }
//       loadSubjects();
//     } catch (err) {
//       console.log("DB Init Error:", err);
//     }
//   };

//   const loadSubjects = async () => {
//     const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
//     setSubjects(subs);
//     if (subs.length > 0 && !selectedSubjectId) {
//       setSelectedSubjectId(subs[0].id);
//       loadLessons(subs[0].id);
//     } else if (selectedSubjectId) {
//       loadLessons(selectedSubjectId);
//     }
//   };

//   const loadLessons = async (subId: number) => {
//     const less: any = await db.getAllAsync(
//       "SELECT * FROM lessons WHERE subject_id = ?;",
//       [subId],
//     );
//     setLessons(less);
//   };

//   const handleAddSubject = async () => {
//     if (!newSubjectName.trim()) {
//       Alert.alert("දෝෂයකි", "කරුණාකර විෂය නමක් ඇතුළත් කරන්න.");
//       return;
//     }
//     try {
//       await db.runAsync("INSERT INTO subjects (name) VALUES (?);", [
//         newSubjectName.trim(),
//       ]);
//       setNewSubjectName("");
//       loadSubjects();
//       Alert.alert("සාර්ථකයි! 🎉", "නව විෂය සාර්ථකව එකතු කරන ලදී.");
//     } catch (err) {
//       Alert.alert("දෝෂයකි", "මෙම නමින් විෂයයක් දැනටමත් පවතී.");
//     }
//   };

//   const handleAddLesson = async () => {
//     if (!selectedSubjectId || !newLessonName.trim()) {
//       Alert.alert("දෝෂයකි", "විෂයයක් තෝරා පාඩමේ නම ඇතුළත් කරන්න.");
//       return;
//     }
//     try {
//       await db.runAsync(
//         "INSERT INTO lessons (subject_id, name) VALUES (?, ?);",
//         [selectedSubjectId, newLessonName.trim()],
//       );
//       setNewLessonName("");
//       loadLessons(selectedSubjectId);
//       Alert.alert("සාර්ථකයි! 🎉", "නව පාඩම සාර්ථකව එකතු කරන ලදී.");
//     } catch (err) {
//       console.log("Add lesson error:", err);
//     }
//   };

//   const openEdit = (type: "subject" | "lesson", item: any) => {
//     setEditingType(type);
//     setEditingItem(item);
//     setEditText(item.name);
//     setModalVisible(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!editText.trim() || !editingItem) return;
//     try {
//       if (editingType === "subject") {
//         await db.runAsync("UPDATE subjects SET name = ? WHERE id = ?;", [
//           editText.trim(),
//           editingItem.id,
//         ]);
//         loadSubjects();
//       } else if (editingType === "lesson") {
//         await db.runAsync("UPDATE lessons SET name = ? WHERE id = ?;", [
//           editText.trim(),
//           editingItem.id,
//         ]);
//         if (selectedSubjectId) loadLessons(selectedSubjectId);
//       }
//       setModalVisible(false);
//       setEditingItem(null);
//       setEditingType(null);
//       Alert.alert("සාර්ථකයි! 🎉", "යාවත්කාලීන කිරීම සාර්ථකයි.");
//     } catch (err) {
//       Alert.alert("දෝෂයකි", "යාවත්කාලීන කිරීම අසාර්ථක විය.");
//     }
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//     >
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         විෂය සහ පාඩම් කළමනාකරණය
//       </Text>

//       {/* Add New Subject Section */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.primary }]}>
//           නව විෂයක් එකතු කරන්න
//         </Text>
//         <View style={styles.row}>
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint + "50", flex: 1 },
//             ]}
//             placeholder="විෂයේ නම (උදා: Biology)"
//             placeholderTextColor={colors.text + "60"}
//             value={newSubjectName}
//             onChangeText={setNewSubjectName}
//           />
//           <TouchableOpacity
//             style={[styles.btn, { backgroundColor: colors.primary }]}
//             onPress={handleAddSubject}
//           >
//             <Ionicons name="add" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* View & Select Subjects */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.primary }]}>
//           පවත්නා විෂයයන් (Subjects)
//         </Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={{ marginVertical: 8 }}
//         >
//           {subjects.map((subj) => (
//             <View
//               key={subj.id}
//               style={[
//                 styles.subChipWrapper,
//                 { borderColor: colors.tint + "40" },
//                 selectedSubjectId === subj.id && {
//                   borderColor: colors.primary,
//                   borderWidth: 2,
//                   backgroundColor: colors.primary + "15",
//                 },
//               ]}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   setSelectedSubjectId(subj.id);
//                   loadLessons(subj.id);
//                 }}
//                 style={styles.subChipTextContainer}
//               >
//                 <Text
//                   style={{
//                     color: colors.text,
//                     fontWeight: "bold",
//                     fontSize: 13,
//                   }}
//                 >
//                   {subj.name}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => openEdit("subject", subj)}
//                 style={styles.editIconBtn}
//               >
//                 <Ionicons
//                   name="create-outline"
//                   size={15}
//                   color={colors.primary}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Add & View Lessons for Selected Subject */}
//       {selectedSubjectId && (
//         <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//           <Text style={[styles.label, { color: colors.primary }]}>
//             තෝරාගත් විෂයට නව පාඩමක් එකතු කරන්න
//           </Text>
//           <View style={styles.row}>
//             <TextInput
//               style={[
//                 styles.input,
//                 {
//                   color: colors.text,
//                   borderColor: colors.tint + "50",
//                   flex: 1,
//                 },
//               ]}
//               placeholder="පාඩමේ නම (උදා: පාඩම 11)"
//               placeholderTextColor={colors.text + "60"}
//               value={newLessonName}
//               onChangeText={setNewLessonName}
//             />
//             <TouchableOpacity
//               style={[styles.btn, { backgroundColor: colors.primary }]}
//               onPress={handleAddLesson}
//             >
//               <Ionicons name="add" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <Text
//             style={[
//               styles.label,
//               { color: colors.text, marginTop: 16, marginBottom: 8 },
//             ]}
//           >
//             විෂයට අදාළ දැනට ඇති පාඩම් ලැයිස්තුව:
//           </Text>
//           {lessons.map((les) => (
//             <View
//               key={les.id}
//               style={[
//                 styles.lessonRow,
//                 { borderBottomColor: colors.tint + "20" },
//               ]}
//             >
//               <Text style={{ color: colors.text, fontSize: 14 }}>
//                 {les.name}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => openEdit("lesson", les)}
//                 style={{ padding: 6 }}
//               >
//                 <Ionicons
//                   name="create-outline"
//                   size={18}
//                   color={colors.primary}
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       )}

//       {/* Edit Modal (Popup for Renaming) */}
//       <Modal visible={modalVisible} transparent={true} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View
//             style={[
//               styles.modalContent,
//               { backgroundColor: colors.cardBackground },
//             ]}
//           >
//             <Text style={[styles.modalTitle, { color: colors.text }]}>
//               {editingType === "subject"
//                 ? "විෂය නම වෙනස් කරන්න"
//                 : "පාඩම් නම වෙනස් කරන්න"}
//             </Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 {
//                   color: colors.text,
//                   borderColor: colors.primary,
//                   marginBottom: 16,
//                   width: "100%",
//                 },
//               ]}
//               value={editText}
//               onChangeText={setEditText}
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalBtn, { backgroundColor: "#888" }]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                   අවලංගු කරන්න
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalBtn, { backgroundColor: colors.primary }]}
//                 onPress={handleSaveEdit}
//               >
//                 <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                   සුරකින්න
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   headerTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
//   card: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
//   label: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
//   row: { flexDirection: "row", gap: 8, alignItems: "center" },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 44,
//     fontSize: 14,
//   },
//   btn: {
//     width: 44,
//     height: 44,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   subChipWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 8,
//     borderWidth: 1,
//     marginRight: 8,
//     overflow: "hidden",
//   },
//   subChipTextContainer: {
//     paddingVertical: 8,
//     paddingLeft: 12,
//     paddingRight: 6,
//   },
//   editIconBtn: { paddingRight: 8, paddingLeft: 2 },
//   lessonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   modalContent: {
//     width: "100%",
//     padding: 20,
//     borderRadius: 12,
//     alignItems: "center",
//     elevation: 5,
//   },
//   modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
//   modalButtons: {
//     flexDirection: "row",
//     gap: 12,
//     width: "100%",
//     justifyContent: "flex-end",
//   },
//   modalBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
// });
