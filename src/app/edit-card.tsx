// import { Ionicons } from "@expo/vector-icons";
// import {
//     RecordingPresets,
//     setAudioModeAsync,
//     useAudioRecorder,
//     useAudioRecorderState,
// } from "expo-audio";
// import * as FileSystem from "expo-file-system/legacy";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Alert,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function EditCardScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");

//   const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);

//   const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);

//   const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateQ = useAudioRecorderState(audioRecorderQ);

//   const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateA = useAudioRecorderState(audioRecorderA);

//   useEffect(() => {
//     loadCardData();
//     (async () => {
//       await setAudioModeAsync({
//         playsInSilentMode: true,
//         allowsRecording: true,
//       });
//     })();
//   }, [cardId]);

//   const loadCardData = async () => {
//     try {
//       const res: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE id = ?;",
//         [cardId as string],
//       );
//       if (res.length > 0) {
//         const item = res[0];
//         setSubject(item.subject);
//         setLesson(item.lesson);
//         setQuestionType(item.questionType);
//         setAnswerType(item.answerType);

//         if (item.questionType === "text") setQuestionText(item.questionContent);
//         else if (item.questionType === "image")
//           setQuestionImage(item.questionContent);
//         else if (item.questionType === "voice")
//           setQuestionVoiceUri(item.questionContent);

//         if (item.answerType === "text") setAnswerText(item.answerContent);
//         else if (item.answerType === "image")
//           setAnswerImage(item.answerContent);
//         else if (item.answerType === "voice")
//           setAnswerVoiceUri(item.answerContent);
//       }
//     } catch (error) {
//       console.log("Load error:", error);
//     }
//   };

//   const getLessonsList = () => {
//     if (subject === "Chemistry")
//       return Array.from({ length: 10 }, (_, i) => `පාඩම ${i + 1}`);
//     if (subject === "Physics")
//       return Array.from({ length: 9 }, (_, i) => `පාඩම ${i + 1}`);
//     if (subject === "Combined Maths")
//       return Array.from({ length: 10 }, (_, i) => `පාඩම ${i + 1}`);
//     return [];
//   };

//   const pickImage = async (target: "question" | "answer") => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       quality: 0.8,
//     });
//     if (!result.canceled) {
//       if (target === "question") setQuestionImage(result.assets[0].uri);
//       else setAnswerImage(result.assets[0].uri);
//     }
//   };

//   const handleVoiceToggle = async (target: "question" | "answer") => {
//     try {
//       if (target === "question") {
//         if (recorderStateQ.isRecording) {
//           await audioRecorderQ.stop();
//           setQuestionVoiceUri(audioRecorderQ.uri);
//         } else {
//           await audioRecorderQ.prepareToRecordAsync();
//           audioRecorderQ.record();
//         }
//       } else {
//         if (recorderStateA.isRecording) {
//           await audioRecorderA.stop();
//           setAnswerVoiceUri(audioRecorderA.uri);
//         } else {
//           await audioRecorderA.prepareToRecordAsync();
//           audioRecorderA.record();
//         }
//       }
//     } catch (err) {
//       console.log("Recording toggle error", err);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!subject || !lesson) {
//       Alert.alert("දෝෂයකි", "කරුණාකර විෂය සහ පාඩම තෝරන්න.");
//       return;
//     }

//     try {
//       let qContent =
//         questionType === "text"
//           ? questionText
//           : questionType === "image"
//             ? questionImage || ""
//             : questionVoiceUri || "";
//       let aContent =
//         answerType === "text"
//           ? answerText
//           : answerType === "image"
//             ? answerImage || ""
//             : answerVoiceUri || "";

//       // Permanent folder copy check if new media chosen
//       if (
//         (questionType === "voice" || questionType === "image") &&
//         qContent &&
//         !qContent.includes(FileSystem.documentDirectory!)
//       ) {
//         const filename = qContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({ from: qContent, to: permanentUri });
//         qContent = permanentUri;
//       }

//       if (
//         (answerType === "voice" || answerType === "image") &&
//         aContent &&
//         !aContent.includes(FileSystem.documentDirectory!)
//       ) {
//         const filename = aContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({ from: aContent, to: permanentUri });
//         aContent = permanentUri;
//       }

//       await db.runAsync(
//         `UPDATE flashcards SET subject = ?, lesson = ?, questionType = ?, questionContent = ?, answerType = ?, answerContent = ? WHERE id = ?;`,
//         [
//           subject,
//           lesson,
//           questionType,
//           qContent,
//           answerType,
//           aContent,
//           cardId as string,
//         ],
//       );

//       Alert.alert("සාර්ථකයි! 🎉", "කාඩ් එක යාවත්කාලීන කරන ලදී.");
//       router.back();
//     } catch (error) {
//       console.log("Update error:", error);
//       Alert.alert("දෝෂයකි", "යාවත්කාලීන කිරීම අසාර්ථක විය.");
//     }
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
//     >
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: colors.text }]}>
//           කාඩ් එක සංස්කරණය (Edit Card)
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Subject selection */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>විෂය තෝරන්න</Text>
//         <View style={styles.rowWrap}>
//           {["Chemistry", "Physics", "Combined Maths"].map((subj) => (
//             <TouchableOpacity
//               key={subj}
//               style={[
//                 styles.chip,
//                 subject === subj && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => {
//                 setSubject(subj);
//                 setLesson("");
//               }}
//             >
//               <Text
//                 style={{
//                   color: subject === subj ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {subj}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {subject !== "" && (
//           <>
//             <Text style={[styles.label, { color: colors.text, marginTop: 12 }]}>
//               පාඩම තෝරන්න
//             </Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {getLessonsList().map((les) => (
//                 <TouchableOpacity
//                   key={les}
//                   style={[
//                     styles.chip,
//                     lesson === les && { backgroundColor: colors.primary },
//                     { marginRight: 8 },
//                   ]}
//                   onPress={() => setLesson(les)}
//                 >
//                   <Text
//                     style={{
//                       color: lesson === les ? "#fff" : colors.text,
//                       fontSize: 12,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {les}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </>
//         )}
//       </View>

//       {/* Question Edit Box */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           ප්‍රශ්නය වෙනස් කරන්න
//         </Text>
//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Text
//                 style={{
//                   color: questionType === type ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             multiline
//             value={questionText}
//             onChangeText={setQuestionText}
//           />
//         )}

//         {questionType === "image" && (
//           <TouchableOpacity
//             style={[styles.uploadBox, { borderColor: colors.tint }]}
//             onPress={() => pickImage("question")}
//           >
//             {questionImage ? (
//               <Image
//                 source={{ uri: questionImage }}
//                 style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Text style={{ color: colors.text }}>පින්තූරයක් තෝරන්න</Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {questionType === "voice" && (
//           <TouchableOpacity
//             style={[
//               styles.voiceBtn,
//               {
//                 backgroundColor: recorderStateQ.isRecording
//                   ? "#ef4444"
//                   : colors.primary,
//               },
//             ]}
//             onPress={() => handleVoiceToggle("question")}
//           >
//             <Ionicons
//               name={recorderStateQ.isRecording ? "stop-circle" : "mic"}
//               size={20}
//               color="#fff"
//             />
//             <Text style={{ color: "#fff", fontWeight: "bold" }}>
//               {recorderStateQ.isRecording
//                 ? "රෙකෝඩ් වෙමින්..."
//                 : "හඬ යළි පටිගත කරන්න"}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Answer Edit Box */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           පිළිතුර වෙනස් කරන්න
//         </Text>
//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Text
//                 style={{
//                   color: answerType === type ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             multiline
//             value={answerText}
//             onChangeText={setAnswerText}
//           />
//         )}

//         {answerType === "image" && (
//           <TouchableOpacity
//             style={[styles.uploadBox, { borderColor: colors.tint }]}
//             onPress={() => pickImage("answer")}
//           >
//             {answerImage ? (
//               <Image
//                 source={{ uri: answerImage }}
//                 style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Text style={{ color: colors.text }}>
//                 පිළිතුරු පින්තූරයක් තෝරන්න
//               </Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {answerType === "voice" && (
//           <TouchableOpacity
//             style={[
//               styles.voiceBtn,
//               {
//                 backgroundColor: recorderStateA.isRecording
//                   ? "#ef4444"
//                   : colors.primary,
//               },
//             ]}
//             onPress={() => handleVoiceToggle("answer")}
//           >
//             <Ionicons
//               name={recorderStateA.isRecording ? "stop-circle" : "mic"}
//               size={20}
//               color="#fff"
//             />
//             <Text style={{ color: "#fff", fontWeight: "bold" }}>
//               {recorderStateA.isRecording
//                 ? "රෙකෝඩ් වෙමින්..."
//                 : "පිළිතුරු හඬ යළි පටිගත කරන්න"}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <TouchableOpacity
//         style={[styles.saveBtn, { backgroundColor: colors.primary }]}
//         onPress={handleUpdate}
//       >
//         <Text style={styles.saveBtnText}>
//           {" "}
//           වෙනස්කම් සුරකින්න (Save Changes){" "}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold" },
//   card: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
//   label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
//   rowWrap: { flexDirection: "row", gap: 8 },
//   chip: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
//   typeSelector: { flexDirection: "row", gap: 6, marginBottom: 10 },
//   typeBtn: {
//     flex: 1,
//     paddingVertical: 6,
//     alignItems: "center",
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     height: 70,
//     textAlignVertical: "top",
//   },
//   uploadBox: {
//     height: 90,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   voiceBtn: {
//     height: 44,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },
//   saveBtn: {
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   saveBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
// });

// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import {
//   createAudioPlayer,
//   RecordingPresets,
//   setAudioModeAsync,
//   useAudioRecorder,
//   useAudioRecorderState,
// } from "expo-audio";
// import * as FileSystem from "expo-file-system/legacy";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function EditCardScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");

//   const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);

//   const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);

//   // Question Player States
//   const [qPlayer, setQPlayer] = useState<any>(null);
//   const [isQPlaying, setIsQPlaying] = useState(false);
//   const [qPosition, setQPosition] = useState(0);
//   const [qDuration, setQDuration] = useState(0);

//   // Answer Player States
//   const [aPlayer, setAPlayer] = useState<any>(null);
//   const [isAPlaying, setIsAPlaying] = useState(false);
//   const [aPosition, setAPosition] = useState(0);
//   const [aDuration, setADuration] = useState(0);

//   const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateQ = useAudioRecorderState(audioRecorderQ);

//   const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateA = useAudioRecorderState(audioRecorderA);

//   useEffect(() => {
//     loadCardData();
//     (async () => {
//       await setAudioModeAsync({
//         playsInSilentMode: true,
//         allowsRecording: true,
//       });
//     })();
//   }, [cardId]);

//   // Question Player Listener
//   useEffect(() => {
//     if (!qPlayer) return;
//     const subscription = qPlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setQPosition(status.currentTime || 0);
//           setQDuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsQPlaying(false);
//             setQPosition(0);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [qPlayer]);

//   // Answer Player Listener
//   useEffect(() => {
//     if (!aPlayer) return;
//     const subscription = aPlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setAPosition(status.currentTime || 0);
//           setADuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsAPlaying(false);
//             setAPosition(0);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [aPlayer]);

//   const loadCardData = async () => {
//     try {
//       const res: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE id = ?;",
//         [cardId as string],
//       );
//       if (res.length > 0) {
//         const item = res[0];
//         setSubject(item.subject);
//         setLesson(item.lesson);
//         setQuestionType(item.questionType);
//         setAnswerType(item.answerType);

//         if (item.questionType === "text") setQuestionText(item.questionContent);
//         else if (item.questionType === "image")
//           setQuestionImage(item.questionContent);
//         else if (item.questionType === "voice")
//           setQuestionVoiceUri(item.questionContent);

//         if (item.answerType === "text") setAnswerText(item.answerContent);
//         else if (item.answerType === "image")
//           setAnswerImage(item.answerContent);
//         else if (item.answerType === "voice")
//           setAnswerVoiceUri(item.answerContent);
//       }
//     } catch (error) {
//       console.log("Load error:", error);
//     }
//   };

//   const getLessonsList = () => {
//     if (subject === "Chemistry")
//       return Array.from({ length: 10 }, (_, i) => `පාඩම ${i + 1}`);
//     if (subject === "Physics")
//       return Array.from({ length: 9 }, (_, i) => `පාඩම ${i + 1}`);
//     if (subject === "Combined Maths")
//       return Array.from({ length: 10 }, (_, i) => `පාඩම ${i + 1}`);
//     return [];
//   };

//   const pickImage = async (target: "question" | "answer") => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       quality: 0.8,
//     });
//     if (!result.canceled) {
//       if (target === "question") setQuestionImage(result.assets[0].uri);
//       else setAnswerImage(result.assets[0].uri);
//     }
//   };

//   const handleVoiceToggle = async (target: "question" | "answer") => {
//     try {
//       if (target === "question") {
//         if (recorderStateQ.isRecording) {
//           const result = await audioRecorderQ.stop();
//           const uri = result?.uri || audioRecorderQ.uri;
//           setQuestionVoiceUri(uri);
//         } else {
//           await audioRecorderQ.prepareToRecordAsync();
//           audioRecorderQ.record();
//         }
//       } else {
//         if (recorderStateA.isRecording) {
//           const result = await audioRecorderA.stop();
//           const uri = result?.uri || audioRecorderA.uri;
//           setAnswerVoiceUri(uri);
//         } else {
//           await audioRecorderA.prepareToRecordAsync();
//           audioRecorderA.record();
//         }
//       }
//     } catch (err) {
//       console.log("Recording toggle error", err);
//     }
//   };

//   const handlePlayQ = async (uri: string) => {
//     try {
//       if (!uri) return;
//       if (aPlayer) aPlayer.pause();
//       setIsAPlaying(false);

//       if (qPlayer && isQPlaying) {
//         qPlayer.pause();
//         setIsQPlaying(false);
//         return;
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       setQPlayer(soundPlayer);
//       soundPlayer.play();
//       setIsQPlaying(true);
//     } catch (err) {
//       console.log("Q play error:", err);
//     }
//   };

//   const handlePlayA = async (uri: string) => {
//     try {
//       if (!uri) return;
//       if (qPlayer) qPlayer.pause();
//       setIsQPlaying(false);

//       if (aPlayer && isAPlaying) {
//         aPlayer.pause();
//         setIsAPlaying(false);
//         return;
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       setAPlayer(soundPlayer);
//       soundPlayer.play();
//       setIsAPlaying(true);
//     } catch (err) {
//       console.log("A play error:", err);
//     }
//   };

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const handleUpdate = async () => {
//     if (!subject || !lesson) {
//       Alert.alert("දෝෂයකි", "කරුණාකර විෂය සහ පාඩම තෝරන්න.");
//       return;
//     }

//     try {
//       let qContent =
//         questionType === "text"
//           ? questionText
//           : questionType === "image"
//             ? questionImage || ""
//             : questionVoiceUri || "";
//       let aContent =
//         answerType === "text"
//           ? answerText
//           : answerType === "image"
//             ? answerImage || ""
//             : answerVoiceUri || "";

//       if (
//         (questionType === "voice" || questionType === "image") &&
//         qContent &&
//         !qContent.includes(FileSystem.documentDirectory!)
//       ) {
//         const filename = qContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({ from: qContent, to: permanentUri });
//         qContent = permanentUri;
//       }

//       if (
//         (answerType === "voice" || answerType === "image") &&
//         aContent &&
//         !aContent.includes(FileSystem.documentDirectory!)
//       ) {
//         const filename = aContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({ from: aContent, to: permanentUri });
//         aContent = permanentUri;
//       }

//       await db.runAsync(
//         `UPDATE flashcards SET subject = ?, lesson = ?, questionType = ?, questionContent = ?, answerType = ?, answerContent = ? WHERE id = ?;`,
//         [
//           subject,
//           lesson,
//           questionType,
//           qContent,
//           answerType,
//           aContent,
//           cardId as string,
//         ],
//       );

//       Alert.alert("සාර්ථකයි! 🎉", "කාඩ් එක යාවත්කාලීන කරන ලදී.");
//       router.back();
//     } catch (error) {
//       console.log("Update error:", error);
//       Alert.alert("දෝෂයකි", "යාවත්කාලීන කිරීම අසාර්ථක විය.");
//     }
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
//     >
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: colors.text }]}>
//           කාඩ් එක සංස්කරණය (Edit Card)
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Subject selection */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>විෂය තෝරන්න</Text>
//         <View style={styles.rowWrap}>
//           {["Chemistry", "Physics", "Combined Maths"].map((subj) => (
//             <TouchableOpacity
//               key={subj}
//               style={[
//                 styles.chip,
//                 subject === subj && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => {
//                 setSubject(subj);
//                 setLesson("");
//               }}
//             >
//               <Text
//                 style={{
//                   color: subject === subj ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {subj}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {subject !== "" && (
//           <>
//             <Text style={[styles.label, { color: colors.text, marginTop: 12 }]}>
//               පාඩම තෝරන්න
//             </Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {getLessonsList().map((les) => (
//                 <TouchableOpacity
//                   key={les}
//                   style={[
//                     styles.chip,
//                     lesson === les && { backgroundColor: colors.primary },
//                     { marginRight: 8 },
//                   ]}
//                   onPress={() => setLesson(les)}
//                 >
//                   <Text
//                     style={{
//                       color: lesson === les ? "#fff" : colors.text,
//                       fontSize: 12,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {les}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </>
//         )}
//       </View>

//       {/* Question Edit Box */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           ප්‍රශ්නය වෙනස් කරන්න
//         </Text>
//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Text
//                 style={{
//                   color: questionType === type ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             multiline
//             value={questionText}
//             onChangeText={setQuestionText}
//           />
//         )}

//         {questionType === "image" && (
//           <TouchableOpacity
//             style={[styles.uploadBox, { borderColor: colors.tint }]}
//             onPress={() => pickImage("question")}
//           >
//             {questionImage ? (
//               <Image
//                 source={{ uri: questionImage }}
//                 style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Text style={{ color: colors.text }}>පින්තූරයක් තෝරන්න</Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {questionType === "voice" && (
//           <View>
//             <TouchableOpacity
//               style={[
//                 styles.voiceBtn,
//                 {
//                   backgroundColor: recorderStateQ.isRecording
//                     ? "#ef4444"
//                     : colors.primary,
//                 },
//               ]}
//               onPress={() => handleVoiceToggle("question")}
//             >
//               <Ionicons
//                 name={recorderStateQ.isRecording ? "stop-circle" : "mic"}
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                 {recorderStateQ.isRecording
//                   ? "රෙකෝඩ් වෙමින්..."
//                   : "හඬ යළි පටිගත කරන්න"}
//               </Text>
//             </TouchableOpacity>

//             {questionVoiceUri && !recorderStateQ.isRecording && (
//               <View style={styles.previewContainer}>
//                 <View style={styles.voiceRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.playBtn,
//                       { backgroundColor: colors.primary },
//                     ]}
//                     onPress={() => handlePlayQ(questionVoiceUri)}
//                   >
//                     <Ionicons
//                       name={isQPlaying ? "pause" : "play"}
//                       size={18}
//                       color="#fff"
//                     />
//                   </TouchableOpacity>
//                   <Text style={{ color: colors.text, fontSize: 12 }}>
//                     ප්‍රශ්න හඬ පෙරදසුන
//                   </Text>
//                 </View>

//                 <Slider
//                   style={styles.slider}
//                   minimumValue={0}
//                   maximumValue={qDuration || 100}
//                   value={qPosition}
//                   onSlidingComplete={async (val) => {
//                     if (qPlayer) await qPlayer.seekTo(val);
//                   }}
//                   minimumTrackTintColor={colors.primary}
//                   maximumTrackTintColor="#ccc"
//                   thumbTintColor={colors.primary}
//                 />
//                 <View style={styles.timeRow}>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(qPosition)}
//                   </Text>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(qDuration)}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* Answer Edit Box */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           පිළිතුර වෙනස් කරන්න
//         </Text>
//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Text
//                 style={{
//                   color: answerType === type ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             multiline
//             value={answerText}
//             onChangeText={setAnswerText}
//           />
//         )}

//         {answerType === "image" && (
//           <TouchableOpacity
//             style={[styles.uploadBox, { borderColor: colors.tint }]}
//             onPress={() => pickImage("answer")}
//           >
//             {answerImage ? (
//               <Image
//                 source={{ uri: answerImage }}
//                 style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Text style={{ color: colors.text }}>
//                 පිළිතුරු පින්තූරයක් තෝරන්න
//               </Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {answerType === "voice" && (
//           <View>
//             <TouchableOpacity
//               style={[
//                 styles.voiceBtn,
//                 {
//                   backgroundColor: recorderStateA.isRecording
//                     ? "#ef4444"
//                     : colors.primary,
//                 },
//               ]}
//               onPress={() => handleVoiceToggle("answer")}
//             >
//               <Ionicons
//                 name={recorderStateA.isRecording ? "stop-circle" : "mic"}
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                 {recorderStateA.isRecording
//                   ? "රෙකෝඩ් වෙමින්..."
//                   : "පිළිතුරු හඬ යළි පටිගත කරන්න"}
//               </Text>
//             </TouchableOpacity>

//             {answerVoiceUri && !recorderStateA.isRecording && (
//               <View style={styles.previewContainer}>
//                 <View style={styles.voiceRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.playBtn,
//                       { backgroundColor: colors.primary },
//                     ]}
//                     onPress={() => handlePlayA(answerVoiceUri)}
//                   >
//                     <Ionicons
//                       name={isAPlaying ? "pause" : "play"}
//                       size={18}
//                       color="#fff"
//                     />
//                   </TouchableOpacity>
//                   <Text style={{ color: colors.text, fontSize: 12 }}>
//                     පිළිතුරු හඬ පෙරදසුන
//                   </Text>
//                 </View>

//                 <Slider
//                   style={styles.slider}
//                   minimumValue={0}
//                   maximumValue={aDuration || 100}
//                   value={aPosition}
//                   onSlidingComplete={async (val) => {
//                     if (aPlayer) await aPlayer.seekTo(val);
//                   }}
//                   minimumTrackTintColor={colors.primary}
//                   maximumTrackTintColor="#ccc"
//                   thumbTintColor={colors.primary}
//                 />
//                 <View style={styles.timeRow}>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(aPosition)}
//                   </Text>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(aDuration)}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       <TouchableOpacity
//         style={[styles.saveBtn, { backgroundColor: colors.primary }]}
//         onPress={handleUpdate}
//       >
//         <Text style={styles.saveBtnText}>වෙනස්කම් සුරකින්න (Save Changes)</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold" },
//   card: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
//   label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
//   rowWrap: { flexDirection: "row", gap: 8 },
//   chip: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
//   typeSelector: { flexDirection: "row", gap: 6, marginBottom: 10 },
//   typeBtn: {
//     flex: 1,
//     paddingVertical: 6,
//     alignItems: "center",
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     height: 70,
//     textAlignVertical: "top",
//   },
//   uploadBox: {
//     height: 90,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   voiceBtn: {
//     height: 44,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },
//   previewContainer: {
//     marginTop: 10,
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: "rgba(0,0,0,0.03)",
//   },
//   voiceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 4,
//   },
//   playBtn: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   slider: { width: "100%", height: 25 },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 2,
//   },
//   saveBtn: {
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   saveBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
// });

// import { useLanguage } from "@/context/LanguageContext";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function EditCardScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const cardId = params.id;
//   const { t } = useLanguage();

//   const [subjectsList, setSubjectsList] = useState<any[]>([]);
//   const [lessonsList, setLessonsList] = useState<any[]>([]);

//   const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
//     null,
//   );
//   const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

//   const [questionContent, setQuestionContent] = useState("");
//   const [answerContent, setAnswerContent] = useState("");
//   const [questionType, setQuestionType] = useState("text");

//   useEffect(() => {
//     loadSubjectsAndCardData();
//   }, [cardId]);

//   // Subjects සහ Card එකේ පවතින දත්ත ඩේටාබේස් එකෙන් ලබා ගැනීම
//   const loadSubjectsAndCardData = async () => {
//     try {
//       const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
//       setSubjectsList(subs || []);

//       if (cardId) {
//         const cardRes: any = await db.getAllAsync(
//           "SELECT * FROM flashcards WHERE id = ?;",
//           [cardId as string],
//         );
//         if (cardRes && cardRes.length > 0) {
//           const card = cardRes[0];
//           setQuestionContent(card.questionContent || "");
//           setAnswerContent(card.answerContent || "");
//           setQuestionType(card.questionType || "text");
//           setSelectedSubjectId(card.subject_id || null);
//           setSelectedLessonId(card.lesson_id || null);

//           if (card.subject_id) {
//             loadLessons(card.subject_id);
//           }
//         }
//       }
//     } catch (error) {
//       console.log("Error loading edit card data:", error);
//     }
//   };

//   // අදාළ Subject එකට අයිති Lessons ඩේටාබේස් එකෙන් ලබා ගැනීම
//   const loadLessons = async (subId: number) => {
//     try {
//       const less: any = await db.getAllAsync(
//         "SELECT * FROM lessons WHERE subject_id = ?;",
//         [subId],
//       );
//       setLessonsList(less || []);
//     } catch (error) {
//       console.log("Error loading lessons for edit:", error);
//     }
//   };

//   // කාඩ්පත යාවත්කාලීන කිරීම (Update Database)
//   const handleUpdateCard = async () => {
//     if (!selectedSubjectId || !selectedLessonId) {
//       Alert.alert(t("common", "error"), t("createCard", "chooseSubandLesson"));
//       return;
//     }

//     try {
//       await db.runAsync(
//         `UPDATE flashcards SET subject_id = ?, lesson_id = ?, questionContent = ?, answerContent = ? WHERE id = ?;`,
//         [
//           selectedSubjectId,
//           selectedLessonId,
//           questionContent,
//           answerContent,
//           Number(cardId),
//         ],
//       );

//       Alert.alert(
//         t("common", "successful") + " ✅",
//         t("createCard", "cardUpdated"),
//         [{ text: t("common", "ok"), onPress: () => router.back() }],
//       );
//     } catch (error) {
//       console.log("Error updating card:", error);
//       Alert.alert(t("common", "error"), t("createCard", "failedToSave"));
//     }
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Top Header */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.topTitle, { color: colors.text }]}>
//           {t("createCard", "editCardTitle")}
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <View style={styles.formContainer}>
//         {/* Subject Selection */}
//         <Text style={[styles.label, { color: colors.text }]}>
//           {t("homepage", "selectSubject")}
//         </Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.chipScroll}
//         >
//           {subjectsList.map((subj) => (
//             <TouchableOpacity
//               key={subj.id}
//               style={[
//                 styles.chip,
//                 {
//                   backgroundColor: colors.cardBackground,
//                   borderColor: colors.tint + "30",
//                 },
//                 selectedSubjectId === subj.id && {
//                   backgroundColor: colors.primary,
//                   borderColor: colors.primary,
//                 },
//               ]}
//               onPress={() => {
//                 setSelectedSubjectId(subj.id);
//                 setSelectedLessonId(null); // විෂය වෙනස් කළ විට පාඩම රීසෙට් කරයි
//                 loadLessons(subj.id);
//               }}
//             >
//               <Text
//                 style={[
//                   styles.chipText,
//                   {
//                     color: selectedSubjectId === subj.id ? "#fff" : colors.text,
//                   },
//                 ]}
//               >
//                 {subj.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Lesson Selection */}
//         {selectedSubjectId !== null && lessonsList.length > 0 && (
//           <View style={{ marginTop: 10 }}>
//             <Text style={[styles.label, { color: colors.text }]}>
//               {t("homepage", "selectLesson")}
//             </Text>
//             <View style={styles.lessonsGridContainer}>
//               {lessonsList.map((les) => (
//                 <TouchableOpacity
//                   key={les.id}
//                   style={[
//                     styles.lessonChipGrid,
//                     selectedLessonId === les.id && {
//                       backgroundColor: colors.primary,
//                       borderColor: colors.primary,
//                     },
//                   ]}
//                   onPress={() => setSelectedLessonId(les.id)}
//                 >
//                   <Text
//                     style={[
//                       styles.lessonChipText,
//                       {
//                         color:
//                           selectedLessonId === les.id ? "#ffffff" : colors.text,
//                       },
//                     ]}
//                   >
//                     {les.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             {/* <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.chipScroll}
//             >
//               {lessonsList.map((les) => (
//                 <TouchableOpacity
//                   key={les.id}
//                   style={[
//                     styles.chip,
//                     {
//                       backgroundColor: colors.cardBackground,
//                       borderColor: colors.tint + "30",
//                     },
//                     selectedLessonId === les.id && {
//                       backgroundColor: colors.primary,
//                       borderColor: colors.primary,
//                     },
//                   ]}
//                   onPress={() => setSelectedLessonId(les.id)}
//                 >
//                   <Text
//                     style={[
//                       styles.chipText,
//                       {
//                         color:
//                           selectedLessonId === les.id ? "#fff" : colors.text,
//                       },
//                     ]}
//                   >
//                     {les.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView> */}
//           </View>
//         )}

//         {/* Question Input */}
//         <Text style={[styles.label, { color: colors.text, marginTop: 10 }]}>
//           {t("cardDetail", "questionLabel")}
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             {
//               backgroundColor: colors.cardBackground,
//               color: colors.text,
//               borderColor: colors.tint + "30",
//             },
//           ]}
//           placeholder={t("createCard", "questionPlaceholder")}
//           placeholderTextColor={colors.tint}
//           multiline
//           value={questionContent}
//           onChangeText={setQuestionContent}
//         />

//         {/* Answer Input */}
//         <Text style={[styles.label, { color: colors.text }]}>
//           {t("cardDetail", "answerLabel")}
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             styles.textArea,
//             {
//               backgroundColor: colors.cardBackground,
//               color: colors.text,
//               borderColor: colors.tint + "30",
//             },
//           ]}
//           placeholder={t("createCard", "answerPlaceholder")}
//           placeholderTextColor={colors.tint}
//           multiline
//           value={answerContent}
//           onChangeText={setAnswerContent}
//         />

//         {/* Update Button */}
//         <TouchableOpacity
//           style={[styles.updateButton, { backgroundColor: colors.primary }]}
//           onPress={handleUpdateCard}
//         >
//           <Text style={styles.updateButtonText}>
//             {t("createCard", "updateButtonText")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   lessonsGridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginTop: 6,
//   },
//   lessonChipGrid: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     marginBottom: 4,
//   },
//   lessonChipText: { fontSize: 12, fontWeight: "600" },
//   container: { flex: 1, padding: 20, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   backBtn: { padding: 4 },
//   topTitle: { fontSize: 18, fontWeight: "bold" },
//   formContainer: { gap: 12, paddingBottom: 40 },
//   label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
//   chipScroll: { flexDirection: "row", marginBottom: 6 },
//   chip: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginRight: 8,
//   },
//   chipText: { fontSize: 13, fontWeight: "600" },
//   input: {
//     padding: 14,
//     borderRadius: 14,
//     borderWidth: 1,
//     fontSize: 15,
//   },
//   textArea: { height: 100, textAlignVertical: "top" },
//   updateButton: {
//     marginTop: 20,
//     padding: 16,
//     borderRadius: 16,
//     alignItems: "center",
//     elevation: 3,
//   },
//   updateButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import {
//   createAudioPlayer,
//   RecordingPresets,
//   setAudioModeAsync,
//   useAudioRecorder,
//   useAudioRecorderState,
// } from "expo-audio";
// import * as FileSystem from "expo-file-system/legacy";
// import * as ImagePicker from "expo-image-picker";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useLanguage } from "../context/LanguageContext"; // Translation සඳහා එකතු කරන ලදී
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function EditCardScreen() {
//   const { colors } = useTheme();
//   const { t } = useLanguage(); // Translation function එක ලබා ගැනීම
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");

//   // Database එකෙන් ලබාගන්නා Subjects සහ Lessons ලැයිස්තු සඳහා states
//   const [subjectsList, setSubjectsList] = useState<string[]>([]);
//   const [lessonsList, setLessonsList] = useState<string[]>([]);

//   const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);

//   const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);

//   // Question Player States
//   const [qPlayer, setQPlayer] = useState<any>(null);
//   const [isQPlaying, setIsQPlaying] = useState(false);
//   const [qPosition, setQPosition] = useState(0);
//   const [qDuration, setQDuration] = useState(0);

//   // Answer Player States
//   const [aPlayer, setAPlayer] = useState<any>(null);
//   const [isAPlaying, setIsAPlaying] = useState(false);
//   const [aPosition, setAPosition] = useState(0);
//   const [aDuration, setADuration] = useState(0);

//   const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateQ = useAudioRecorderState(audioRecorderQ);

//   const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateA = useAudioRecorderState(audioRecorderA);

//   useEffect(() => {
//     loadCardData();
//     fetchSubjectsFromDB(); // ඩේටාබේස් එකෙන් විෂයයන් ලබාගැනීම
//     (async () => {
//       await setAudioModeAsync({
//         playsInSilentMode: true,
//         allowsRecording: true,
//       });
//     })();
//   }, [cardId]);

//   // විෂය වෙනස් වන විට අදාළ පාඩම් ඩේටාබේස් එකෙන් ලබාගැනීම
//   useEffect(() => {
//     if (subject) {
//       fetchLessonsFromDB(subject);
//     } else {
//       setLessonsList([]);
//     }
//   }, [subject]);

//   // 1. ඩේටාබේස් එකෙන් subjects ටික fetch කරගැනීම
//   const fetchSubjectsFromDB = async () => {
//     try {
//       const res: any = await db.getAllAsync(
//         "SELECT DISTINCT subject FROM flashcards WHERE subject IS NOT NULL AND subject != '';",
//       );
//       const subs = res.map((item: any) => item.subject);
//       setSubjectsList(subs);
//     } catch (error) {
//       console.log("Fetch subjects error:", error);
//     }
//   };

//   // 2. අදාළ subject එකට අදාළ lessons ටික fetch කරගැනීම
//   const fetchLessonsFromDB = async (selectedSubject: string) => {
//     try {
//       const res: any = await db.getAllAsync(
//         "SELECT DISTINCT lesson FROM flashcards WHERE subject = ? AND lesson IS NOT NULL AND lesson != '';",
//         [selectedSubject],
//       );
//       const less = res.map((item: any) => item.lesson);
//       setLessonsList(less);
//     } catch (error) {
//       console.log("Fetch lessons error:", error);
//     }
//   };

//   // Question Player Listener
//   useEffect(() => {
//     if (!qPlayer) return;
//     const subscription = qPlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setQPosition(status.currentTime || 0);
//           setQDuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsQPlaying(false);
//             setQPosition(0);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [qPlayer]);

//   // Answer Player Listener
//   useEffect(() => {
//     if (!aPlayer) return;
//     const subscription = aPlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setAPosition(status.currentTime || 0);
//           setADuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsAPlaying(false);
//             setAPosition(0);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [aPlayer]);

//   const loadCardData = async () => {
//     try {
//       const res: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE id = ?;",
//         [cardId as string],
//       );
//       if (res.length > 0) {
//         const item = res[0];
//         setSubject(item.subject);
//         setLesson(item.lesson);
//         setQuestionType(item.questionType);
//         setAnswerType(item.answerType);

//         if (item.questionType === "text") setQuestionText(item.questionContent);
//         else if (item.questionType === "image")
//           setQuestionImage(item.questionContent);
//         else if (item.questionType === "voice")
//           setQuestionVoiceUri(item.questionContent);

//         if (item.answerType === "text") setAnswerText(item.answerContent);
//         else if (item.answerType === "image")
//           setAnswerImage(item.answerContent);
//         else if (item.answerType === "voice")
//           setAnswerVoiceUri(item.answerContent);
//       }
//     } catch (error) {
//       console.log("Load error:", error);
//     }
//   };

//   const pickImage = async (target: "question" | "answer") => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       quality: 0.8,
//     });
//     if (!result.canceled) {
//       if (target === "question") setQuestionImage(result.assets[0].uri);
//       else setAnswerImage(result.assets[0].uri);
//     }
//   };

//   const handleVoiceToggle = async (target: "question" | "answer") => {
//     try {
//       if (target === "question") {
//         if (recorderStateQ.isRecording) {
//           const result = await audioRecorderQ.stop();
//           const uri = result?.uri || audioRecorderQ.uri;
//           setQuestionVoiceUri(uri);
//         } else {
//           await audioRecorderQ.prepareToRecordAsync();
//           audioRecorderQ.record();
//         }
//       } else {
//         if (recorderStateA.isRecording) {
//           const result = await audioRecorderA.stop();
//           const uri = result?.uri || audioRecorderA.uri;
//           setAnswerVoiceUri(uri);
//         } else {
//           await audioRecorderA.prepareToRecordAsync();
//           audioRecorderA.record();
//         }
//       }
//     } catch (err) {
//       console.log("Recording toggle error", err);
//     }
//   };

//   const handlePlayQ = async (uri: string) => {
//     try {
//       if (!uri) return;
//       if (aPlayer) aPlayer.pause();
//       setIsAPlaying(false);

//       if (qPlayer && isQPlaying) {
//         qPlayer.pause();
//         setIsQPlaying(false);
//         return;
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       setQPlayer(soundPlayer);
//       soundPlayer.play();
//       setIsQPlaying(true);
//     } catch (err) {
//       console.log("Q play error:", err);
//     }
//   };

//   const handlePlayA = async (uri: string) => {
//     try {
//       if (!uri) return;
//       if (qPlayer) qPlayer.pause();
//       setIsQPlaying(false);

//       if (aPlayer && isAPlaying) {
//         aPlayer.pause();
//         setIsAPlaying(false);
//         return;
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       setAPlayer(soundPlayer);
//       soundPlayer.play();
//       setIsAPlaying(true);
//     } catch (err) {
//       console.log("A play error:", err);
//     }
//   };

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const handleUpdate = async () => {
//     if (!subject || !lesson) {
//       Alert.alert(
//         t("common", "error") || "දෝෂයකි",
//         t("editCard", "selectSubjectLesson") || "කරුණාකර විෂය සහ පාඩම තෝරන්න.",
//       );
//       return;
//     }

//     try {
//       let qContent =
//         questionType === "text"
//           ? questionText
//           : questionType === "image"
//             ? questionImage || ""
//             : questionVoiceUri || "";
//       let aContent =
//         answerType === "text"
//           ? answerText
//           : answerType === "image"
//             ? answerImage || ""
//             : answerVoiceUri || "";

//       if (
//         (questionType === "voice" || questionType === "image") &&
//         qContent &&
//         !qContent.includes(FileSystem.documentDirectory!)
//       ) {
//         const filename = qContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({ from: qContent, to: permanentUri });
//         qContent = permanentUri;
//       }

//       if (
//         (answerType === "voice" || answerType === "image") &&
//         aContent &&
//         !aContent.includes(FileSystem.documentDirectory!)
//       ) {
//         const filename = aContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({ from: aContent, to: permanentUri });
//         aContent = permanentUri;
//       }

//       await db.runAsync(
//         `UPDATE flashcards SET subject = ?, lesson = ?, questionType = ?, questionContent = ?, answerType = ?, answerContent = ? WHERE id = ?;`,
//         [
//           subject,
//           lesson,
//           questionType,
//           qContent,
//           answerType,
//           aContent,
//           cardId as string,
//         ],
//       );

//       Alert.alert(
//         t("common", "success") || "සාර්ථකයි! 🎉",
//         t("editCard", "updateSuccess") || "කාඩ් එක යාවත්කාලීන කරන ලදී.",
//       );
//       router.back();
//     } catch (error) {
//       console.log("Update error:", error);
//       Alert.alert(
//         t("common", "error") || "දෝෂයකි",
//         t("editCard", "updateError") || "යාවත්කාලීන කිරීම අසාර්ථක විය.",
//       );
//     }
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
//     >
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: colors.text }]}>
//           {t("editCard", "title") || "කාඩ් එක සංස්කරණය (Edit Card)"}
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Subject selection - DB එකෙන් fetch කළ Subjects පෙන්වීම */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>
//           {t("editCard", "selectSubject") || "විෂය තෝරන්න"}
//         </Text>
//         <View style={styles.rowWrap}>
//           {subjectsList.map((subj) => (
//             <TouchableOpacity
//               key={subj}
//               style={[
//                 styles.chip,
//                 subject === subj && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => {
//                 setSubject(subj);
//                 setLesson("");
//               }}
//             >
//               <Text
//                 style={{
//                   color: subject === subj ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {subj}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {subject !== "" && (
//           <>
//             <Text style={[styles.label, { color: colors.text, marginTop: 12 }]}>
//               {t("editCard", "selectLesson") || "පාඩම තෝරන්න"}
//             </Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {lessonsList.map((les) => (
//                 <TouchableOpacity
//                   key={les}
//                   style={[
//                     styles.chip,
//                     lesson === les && { backgroundColor: colors.primary },
//                     { marginRight: 8 },
//                   ]}
//                   onPress={() => setLesson(les)}
//                 >
//                   <Text
//                     style={{
//                       color: lesson === les ? "#fff" : colors.text,
//                       fontSize: 12,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {les}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </>
//         )}
//       </View>

//       {/* Question Edit Box */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           {t("editCard", "editQuestion") || "ප්‍රශ්නය වෙනස් කරන්න"}
//         </Text>
//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Text
//                 style={{
//                   color: questionType === type ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             multiline
//             value={questionText}
//             onChangeText={setQuestionText}
//           />
//         )}

//         {questionType === "image" && (
//           <TouchableOpacity
//             style={[styles.uploadBox, { borderColor: colors.tint }]}
//             onPress={() => pickImage("question")}
//           >
//             {questionImage ? (
//               <Image
//                 source={{ uri: questionImage }}
//                 style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Text style={{ color: colors.text }}>
//                 {t("editCard", "selectImage") || "පින්තූරයක් තෝරන්න"}
//               </Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {questionType === "voice" && (
//           <View>
//             <TouchableOpacity
//               style={[
//                 styles.voiceBtn,
//                 {
//                   backgroundColor: recorderStateQ.isRecording
//                     ? "#ef4444"
//                     : colors.primary,
//                 },
//               ]}
//               onPress={() => handleVoiceToggle("question")}
//             >
//               <Ionicons
//                 name={recorderStateQ.isRecording ? "stop-circle" : "mic"}
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                 {recorderStateQ.isRecording
//                   ? t("editCard", "recording") || "රෙකෝඩ් වෙමින්..."
//                   : t("editCard", "rerecordVoice") || "හඬ යළි පටිගත කරන්න"}
//               </Text>
//             </TouchableOpacity>

//             {questionVoiceUri && !recorderStateQ.isRecording && (
//               <View style={styles.previewContainer}>
//                 <View style={styles.voiceRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.playBtn,
//                       { backgroundColor: colors.primary },
//                     ]}
//                     onPress={() => handlePlayQ(questionVoiceUri)}
//                   >
//                     <Ionicons
//                       name={isQPlaying ? "pause" : "play"}
//                       size={18}
//                       color="#fff"
//                     />
//                   </TouchableOpacity>
//                   <Text style={{ color: colors.text, fontSize: 12 }}>
//                     {t("editCard", "questionVoicePreview") ||
//                       "ප්‍රශ්න හඬ පෙරදසුන"}
//                   </Text>
//                 </View>

//                 <Slider
//                   style={styles.slider}
//                   minimumValue={0}
//                   maximumValue={qDuration || 100}
//                   value={qPosition}
//                   onSlidingComplete={async (val) => {
//                     if (qPlayer) await qPlayer.seekTo(val);
//                   }}
//                   minimumTrackTintColor={colors.primary}
//                   maximumTrackTintColor="#ccc"
//                   thumbTintColor={colors.primary}
//                 />
//                 <View style={styles.timeRow}>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(qPosition)}
//                   </Text>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(qDuration)}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* Answer Edit Box */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           {t("editCard", "editAnswer") || "පිළිතුර වෙනස් කරන්න"}
//         </Text>
//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeBtn,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Text
//                 style={{
//                   color: answerType === type ? "#fff" : colors.text,
//                   fontSize: 12,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.input,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             multiline
//             value={answerText}
//             onChangeText={setAnswerText}
//           />
//         )}

//         {answerType === "image" && (
//           <TouchableOpacity
//             style={[styles.uploadBox, { borderColor: colors.tint }]}
//             onPress={() => pickImage("answer")}
//           >
//             {answerImage ? (
//               <Image
//                 source={{ uri: answerImage }}
//                 style={{ width: "100%", height: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Text style={{ color: colors.text }}>
//                 {t("editCard", "selectAnswerImage") ||
//                   "පිළිතුරු පින්තූරයක් තෝරන්න"}
//               </Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {answerType === "voice" && (
//           <View>
//             <TouchableOpacity
//               style={[
//                 styles.voiceBtn,
//                 {
//                   backgroundColor: recorderStateA.isRecording
//                     ? "#ef4444"
//                     : colors.primary,
//                 },
//               ]}
//               onPress={() => handleVoiceToggle("answer")}
//             >
//               <Ionicons
//                 name={recorderStateA.isRecording ? "stop-circle" : "mic"}
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                 {recorderStateA.isRecording
//                   ? t("editCard", "recording") || "රෙකෝඩ් වෙමින්..."
//                   : t("editCard", "rerecordAnswerVoice") ||
//                     "පිළිතුරු හඬ යළි පටිගත කරන්න"}
//               </Text>
//             </TouchableOpacity>

//             {answerVoiceUri && !recorderStateA.isRecording && (
//               <View style={styles.previewContainer}>
//                 <View style={styles.voiceRow}>
//                   <TouchableOpacity
//                     style={[
//                       styles.playBtn,
//                       { backgroundColor: colors.primary },
//                     ]}
//                     onPress={() => handlePlayA(answerVoiceUri)}
//                   >
//                     <Ionicons
//                       name={isAPlaying ? "pause" : "play"}
//                       size={18}
//                       color="#fff"
//                     />
//                   </TouchableOpacity>
//                   <Text style={{ color: colors.text, fontSize: 12 }}>
//                     {t("editCard", "answerVoicePreview") ||
//                       "පිළිතුරු හඬ පෙරදසුන"}
//                   </Text>
//                 </View>

//                 <Slider
//                   style={styles.slider}
//                   minimumValue={0}
//                   maximumValue={aDuration || 100}
//                   value={aPosition}
//                   onSlidingComplete={async (val) => {
//                     if (aPlayer) await aPlayer.seekTo(val);
//                   }}
//                   minimumTrackTintColor={colors.primary}
//                   maximumTrackTintColor="#ccc"
//                   thumbTintColor={colors.primary}
//                 />
//                 <View style={styles.timeRow}>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(aPosition)}
//                   </Text>
//                   <Text style={{ color: colors.text, fontSize: 10 }}>
//                     {formatTime(aDuration)}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       <TouchableOpacity
//         style={[styles.saveBtn, { backgroundColor: colors.primary }]}
//         onPress={handleUpdate}
//       >
//         <Text style={styles.saveBtnText}>
//           {t("editCard", "saveChanges") || "වෙනස්කම් සුරකින්න (Save Changes)"}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold" },
//   card: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
//   label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
//   rowWrap: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
//   chip: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
//   typeSelector: { flexDirection: "row", gap: 6, marginBottom: 10 },
//   typeBtn: {
//     flex: 1,
//     paddingVertical: 6,
//     alignItems: "center",
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     height: 70,
//     textAlignVertical: "top",
//   },
//   uploadBox: {
//     height: 90,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   voiceBtn: {
//     height: 44,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },
//   previewContainer: {
//     marginTop: 10,
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: "rgba(0,0,0,0.03)",
//   },
//   voiceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 4,
//   },
//   playBtn: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   slider: { width: "100%", height: 25 },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 2,
//   },
//   saveBtn: {
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   saveBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
// });

import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
  createAudioPlayer,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const db = SQLite.openDatabaseSync("flashcards.db");

export default function EditCardScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const params = useLocalSearchParams();
  const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [subjectId, setSubjectId] = useState<any>(null);
  const [lessonId, setLessonId] = useState<any>(null);

  // Subjects සහ Lessons ලැයිස්තු සඳහා states (ID සහ නම සමඟ)
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [lessonsList, setLessonsList] = useState<any[]>([]);

  const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
    "text",
  );
  const [questionText, setQuestionText] = useState("");
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);

  const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
    "text",
  );
  const [answerText, setAnswerText] = useState("");
  const [answerImage, setAnswerImage] = useState<string | null>(null);
  const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);

  // Question Player States
  const [qPlayer, setQPlayer] = useState<any>(null);
  const [isQPlaying, setIsQPlaying] = useState(false);
  const [qPosition, setQPosition] = useState(0);
  const [qDuration, setQDuration] = useState(0);

  // Answer Player States
  const [aPlayer, setAPlayer] = useState<any>(null);
  const [isAPlaying, setIsAPlaying] = useState(false);
  const [aPosition, setAPosition] = useState(0);
  const [aDuration, setADuration] = useState(0);

  const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStateQ = useAudioRecorderState(audioRecorderQ);

  const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStateA = useAudioRecorderState(audioRecorderA);

  useEffect(() => {
    loadCardData();
    fetchSubjectsFromDB();
    (async () => {
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, [cardId]);

  // Subject එක වෙනස් වන විට අදාළ Lessons ලබාගැනීම
  useEffect(() => {
    if (subjectId) {
      fetchLessonsFromDB(subjectId);
    } else {
      setLessonsList([]);
    }
  }, [subjectId]);

  // Subjects ලබාගැනීම (ඔබේ DB එකේ subjects ටේබල් එකක් ඇතැයි ধরে ගනිමින්, නැතහොත් flashcards වලින් DISTINCT කරයි)
  // const fetchSubjectsFromDB = async () => {
  //   try {
  //     // ඔබ සතුව subjects ටේබල් එකක් තිබේ නම්: SELECT * FROM subjects
  //     // නැතහොත් flashcards වල IDs සඳහා:
  //     const res: any = await db.getAllAsync(
  //       "SELECT DISTINCT subject_id FROM flashcards WHERE subject_id IS NOT NULL;",
  //     );
  //     setSubjectsList(res);
  //   } catch (error) {
  //     console.log("Fetch subjects error:", error);
  //   }
  // };

  // const fetchLessonsFromDB = async (selectedSubjectId: any) => {
  //   try {
  //     const res: any = await db.getAllAsync(
  //       "SELECT DISTINCT lesson_id FROM flashcards WHERE subject_id = ? AND lesson_id IS NOT NULL;",
  //       [selectedSubjectId],
  //     );
  //     setLessonsList(res);
  //   } catch (error) {
  //     console.log("Fetch lessons error:", error);
  //   }
  // };
  // 1. subjects ටේබල් එකෙන් IDs සහ Names ලබා ගැනීම
  const fetchSubjectsFromDB = async () => {
    try {
      const res: any = await db.getAllAsync("SELECT * FROM subjects;");
      setSubjectsList(res); // මෙහි සෑම item එකකම id සහ name (හෝ subject) තිබිය යුතුය
    } catch (error) {
      console.log("Fetch subjects error:", error);
    }
  };

  // 2. අදාළ subject_id එකට අදාළ lessons ටේබල් එකෙන් ලබා ගැනීම
  const fetchLessonsFromDB = async (selectedSubjectId: any) => {
    try {
      const res: any = await db.getAllAsync(
        "SELECT * FROM lessons WHERE subject_id = ?;",
        [selectedSubjectId],
      );
      setLessonsList(res); // මෙහි සෑම lesson item එකකම id සහ name තිබිය යුතුය
    } catch (error) {
      console.log("Fetch lessons error:", error);
    }
  };

  // Question Player Listener
  useEffect(() => {
    if (!qPlayer) return;
    const subscription = qPlayer.addListener(
      "playbackStatusUpdate",
      (status: any) => {
        if (status.isLoaded) {
          setQPosition(status.currentTime || 0);
          setQDuration(status.duration || 0);
          if (status.didJustFinish) {
            setIsQPlaying(false);
            setQPosition(0);
          }
        }
      },
    );
    return () => subscription.remove();
  }, [qPlayer]);

  // Answer Player Listener
  useEffect(() => {
    if (!aPlayer) return;
    const subscription = aPlayer.addListener(
      "playbackStatusUpdate",
      (status: any) => {
        if (status.isLoaded) {
          setAPosition(status.currentTime || 0);
          setADuration(status.duration || 0);
          if (status.didJustFinish) {
            setIsAPlaying(false);
            setAPosition(0);
          }
        }
      },
    );
    return () => subscription.remove();
  }, [aPlayer]);

  const loadCardData = async () => {
    try {
      const res: any = await db.getAllAsync(
        "SELECT * FROM flashcards WHERE id = ?;",
        [cardId as string],
      );
      if (res.length > 0) {
        const item = res[0];
        setSubjectId(item.subject_id);
        setLessonId(item.lesson_id);
        setQuestionType(item.questionType);
        setAnswerType(item.answerType);

        if (item.questionType === "text") setQuestionText(item.questionContent);
        else if (item.questionType === "image")
          setQuestionImage(item.questionContent);
        else if (item.questionType === "voice")
          setQuestionVoiceUri(item.questionContent);

        if (item.answerType === "text") setAnswerText(item.answerContent);
        else if (item.answerType === "image")
          setAnswerImage(item.answerContent);
        else if (item.answerType === "voice")
          setAnswerVoiceUri(item.answerContent);
      }
    } catch (error) {
      console.log("Load error:", error);
    }
  };

  const pickImage = async (target: "question" | "answer") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      if (target === "question") setQuestionImage(result.assets[0].uri);
      else setAnswerImage(result.assets[0].uri);
    }
  };

  const handleVoiceToggle = async (target: "question" | "answer") => {
    try {
      if (target === "question") {
        if (recorderStateQ.isRecording) {
          const result = await audioRecorderQ.stop();
          const uri = result?.uri || audioRecorderQ.uri;
          setQuestionVoiceUri(uri);
        } else {
          await audioRecorderQ.prepareToRecordAsync();
          audioRecorderQ.record();
        }
      } else {
        if (recorderStateA.isRecording) {
          const result = await audioRecorderA.stop();
          const uri = result?.uri || audioRecorderA.uri;
          setAnswerVoiceUri(uri);
        } else {
          await audioRecorderA.prepareToRecordAsync();
          audioRecorderA.record();
        }
      }
    } catch (err) {
      console.log("Recording toggle error", err);
    }
  };

  const handlePlayQ = async (uri: string) => {
    try {
      if (!uri) return;
      if (aPlayer) aPlayer.pause();
      setIsAPlaying(false);

      if (qPlayer && isQPlaying) {
        qPlayer.pause();
        setIsQPlaying(false);
        return;
      }

      const soundPlayer = createAudioPlayer({ uri });
      setQPlayer(soundPlayer);
      soundPlayer.play();
      setIsQPlaying(true);
    } catch (err) {
      console.log("Q play error:", err);
    }
  };

  const handlePlayA = async (uri: string) => {
    try {
      if (!uri) return;
      if (qPlayer) qPlayer.pause();
      setIsQPlaying(false);

      if (aPlayer && isAPlaying) {
        aPlayer.pause();
        setIsAPlaying(false);
        return;
      }

      const soundPlayer = createAudioPlayer({ uri });
      setAPlayer(soundPlayer);
      soundPlayer.play();
      setIsAPlaying(true);
    } catch (err) {
      console.log("A play error:", err);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleUpdate = async () => {
    if (!subjectId || !lessonId) {
      Alert.alert(
        t("common", "error") || "දෝෂයකි",
        t("editCard", "selectSubjectLesson") || "කරුණාකර විෂය සහ පාඩම තෝරන්න.",
      );
      return;
    }

    try {
      let qContent =
        questionType === "text"
          ? questionText
          : questionType === "image"
            ? questionImage || ""
            : questionVoiceUri || "";
      let aContent =
        answerType === "text"
          ? answerText
          : answerType === "image"
            ? answerImage || ""
            : answerVoiceUri || "";

      if (
        (questionType === "voice" || questionType === "image") &&
        qContent &&
        !qContent.includes(FileSystem.documentDirectory!)
      ) {
        const filename = qContent.split("/").pop();
        const permanentUri = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({ from: qContent, to: permanentUri });
        qContent = permanentUri;
      }

      if (
        (answerType === "voice" || answerType === "image") &&
        aContent &&
        !aContent.includes(FileSystem.documentDirectory!)
      ) {
        const filename = aContent.split("/").pop();
        const permanentUri = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({ from: aContent, to: permanentUri });
        aContent = permanentUri;
      }

      await db.runAsync(
        `UPDATE flashcards SET subject_id = ?, lesson_id = ?, questionType = ?, questionContent = ?, answerType = ?, answerContent = ? WHERE id = ?;`,
        [
          subjectId,
          lessonId,
          questionType,
          qContent,
          answerType,
          aContent,
          cardId as string,
        ],
      );

      Alert.alert(
        t("common", "success") || "සාර්ථකයි! 🎉",
        t("editCard", "updateSuccess") || "කාඩ් එක යාවත්කාලීන කරන ලදී.",
      );
      router.back();
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert(
        t("common", "error") || "දෝෂයකි",
        t("editCard", "updateError") || "යාවත්කාලීන කිරීම අසාර්ථක විය.",
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("createCard", "editCardTitle")}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Subject selection */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.label, { color: colors.text }]}>
          {t("homepage", "selectSubject")}
        </Text>
        <View style={styles.rowWrap}>
          {subjectsList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.chip,
                subjectId === item.id && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => {
                setSubjectId(item.id);
                setLessonId(null);
              }}
            >
              <Text
                style={{
                  color: subjectId === item.id ? "#fff" : colors.text,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {/* විෂයේ නම වෙනුවට ID එක හෝ Name එක පෙන්වීම */}
                {item.name || `Subject ${item.id}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {subjectId !== null && (
          <>
            <Text style={[styles.label, { color: colors.text, marginTop: 12 }]}>
              {t("homepage", "selectLesson")}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {lessonsList.map((lesItem) => (
                <TouchableOpacity
                  key={lesItem.id}
                  style={[
                    styles.chip,
                    lessonId === lesItem.id && {
                      backgroundColor: colors.primary,
                    },
                    { marginRight: 8 },
                  ]}
                  onPress={() => setLessonId(lesItem.id)}
                >
                  <Text
                    style={{
                      color: lessonId === lesItem.id ? "#fff" : colors.text,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {lesItem.name || `Lesson ${lesItem.id}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/* Question Edit Box */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {t("cardDetail", "questionLabel")}
        </Text>
        <View style={styles.typeSelector}>
          {(["text", "image", "voice"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeBtn,
                questionType === type && { backgroundColor: colors.primary },
              ]}
              onPress={() => setQuestionType(type)}
            >
              <Text
                style={{
                  color: questionType === type ? "#fff" : colors.text,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {questionType === "text" && (
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.tint },
            ]}
            multiline
            value={questionText}
            onChangeText={setQuestionText}
          />
        )}

        {questionType === "image" && (
          <TouchableOpacity
            style={[styles.uploadBox, { borderColor: colors.tint }]}
            onPress={() => pickImage("question")}
          >
            {questionImage ? (
              <Image
                source={{ uri: questionImage }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
              />
            ) : (
              <Text style={{ color: colors.text }}>
                {t("editCard", "selectImage") || "පින්තූරයක් තෝරන්න"}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {questionType === "voice" && (
          <View>
            <TouchableOpacity
              style={[
                styles.voiceBtn,
                {
                  backgroundColor: recorderStateQ.isRecording
                    ? "#ef4444"
                    : colors.primary,
                },
              ]}
              onPress={() => handleVoiceToggle("question")}
            >
              <Ionicons
                name={recorderStateQ.isRecording ? "stop-circle" : "mic"}
                size={20}
                color="#fff"
              />
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {recorderStateQ.isRecording
                  ? t("editCard", "recording") || "රෙකෝඩ් වෙමින්..."
                  : t("editCard", "rerecordVoice") || "හඬ යළි පටිගත කරන්න"}
              </Text>
            </TouchableOpacity>

            {questionVoiceUri && !recorderStateQ.isRecording && (
              <View style={styles.previewContainer}>
                <View style={styles.voiceRow}>
                  <TouchableOpacity
                    style={[
                      styles.playBtn,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => handlePlayQ(questionVoiceUri)}
                  >
                    <Ionicons
                      name={isQPlaying ? "pause" : "play"}
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <Text style={{ color: colors.text, fontSize: 12 }}>
                    {t("editCard", "questionVoicePreview") ||
                      "ප්‍රශ්න හඬ පෙරදසුන"}
                  </Text>
                </View>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={qDuration || 100}
                  value={qPosition}
                  onSlidingComplete={async (val) => {
                    if (qPlayer) await qPlayer.seekTo(val);
                  }}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor="#ccc"
                  thumbTintColor={colors.primary}
                />
                <View style={styles.timeRow}>
                  <Text style={{ color: colors.text, fontSize: 10 }}>
                    {formatTime(qPosition)}
                  </Text>
                  <Text style={{ color: colors.text, fontSize: 10 }}>
                    {formatTime(qDuration)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Answer Edit Box */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {t("cardDetail", "answerLabel")}
        </Text>
        <View style={styles.typeSelector}>
          {(["text", "image", "voice"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeBtn,
                answerType === type && { backgroundColor: colors.primary },
              ]}
              onPress={() => setAnswerType(type)}
            >
              <Text
                style={{
                  color: answerType === type ? "#fff" : colors.text,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {answerType === "text" && (
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.tint },
            ]}
            multiline
            value={answerText}
            onChangeText={setAnswerText}
          />
        )}

        {answerType === "image" && (
          <TouchableOpacity
            style={[styles.uploadBox, { borderColor: colors.tint }]}
            onPress={() => pickImage("answer")}
          >
            {answerImage ? (
              <Image
                source={{ uri: answerImage }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
              />
            ) : (
              <Text style={{ color: colors.text }}>
                {t("editCard", "selectAnswerImage") ||
                  "පිළිතුරු පින්තූරයක් තෝරන්න"}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {answerType === "voice" && (
          <View>
            <TouchableOpacity
              style={[
                styles.voiceBtn,
                {
                  backgroundColor: recorderStateA.isRecording
                    ? "#ef4444"
                    : colors.primary,
                },
              ]}
              onPress={() => handleVoiceToggle("answer")}
            >
              <Ionicons
                name={recorderStateA.isRecording ? "stop-circle" : "mic"}
                size={20}
                color="#fff"
              />
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {recorderStateA.isRecording
                  ? t("editCard", "recording") || "රෙකෝඩ් වෙමින්..."
                  : t("editCard", "rerecordAnswerVoice") ||
                    "පිළිතුරු හඬ යළි පටිගත කරන්න"}
              </Text>
            </TouchableOpacity>

            {answerVoiceUri && !recorderStateA.isRecording && (
              <View style={styles.previewContainer}>
                <View style={styles.voiceRow}>
                  <TouchableOpacity
                    style={[
                      styles.playBtn,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => handlePlayA(answerVoiceUri)}
                  >
                    <Ionicons
                      name={isAPlaying ? "pause" : "play"}
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <Text style={{ color: colors.text, fontSize: 12 }}>
                    {t("editCard", "answerVoicePreview") ||
                      "පිළිතුරු හඬ පෙරදසුන"}
                  </Text>
                </View>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={aDuration || 100}
                  value={aPosition}
                  onSlidingComplete={async (val) => {
                    if (aPlayer) await aPlayer.seekTo(val);
                  }}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor="#ccc"
                  thumbTintColor={colors.primary}
                />
                <View style={styles.timeRow}>
                  <Text style={{ color: colors.text, fontSize: 10 }}>
                    {formatTime(aPosition)}
                  </Text>
                  <Text style={{ color: colors.text, fontSize: 10 }}>
                    {formatTime(aDuration)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: colors.primary }]}
        onPress={handleUpdate}
      >
        <Text style={styles.saveBtnText}>{t("editProfile", "saveButton")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  card: { padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
  label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
  rowWrap: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  typeSelector: { flexDirection: "row", gap: 6, marginBottom: 10 },
  typeBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 70,
    textAlignVertical: "top",
  },
  uploadBox: {
    height: 90,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  voiceBtn: {
    height: 44,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  previewContainer: {
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  voiceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  playBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { width: "100%", height: 25 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  saveBtn: {
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
