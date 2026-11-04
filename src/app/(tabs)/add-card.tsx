// // import { Ionicons } from "@expo/vector-icons";
// // import * as ImagePicker from "expo-image-picker";
// // import { useState } from "react";
// // import {
// //     Alert,
// //     Image,
// //     ScrollView,
// //     StyleSheet,
// //     Switch,
// //     Text,
// //     TextInput,
// //     TouchableOpacity,
// //     View,
// // } from "react-native";
// // import { useTheme } from "../context/ThemeContext";

// // export default function AddCardScreen() {
// //   const { colors } = useTheme();

// //   // මූලික ස්ටේට් (Basic States)
// //   const [subject, setSubject] = useState("");
// //   const [lesson, setLesson] = useState("");
// //   const [isReminderEnabled, setIsReminderEnabled] = useState(false);

// //   // ප්‍රශ්නය සඳහා (Question States)
// //   const [questionType, setQuestionType] = useState<
// //     "text" | "image" | "voice" | "drawing"
// //   >("text");
// //   const [questionText, setQuestionText] = useState("");
// //   const [questionImage, setQuestionImage] = useState<string | null>(null);
// //   const [isRecordingQ, setIsRecordingQ] = useState(false);
// //   const [questionVoice, setQuestionVoice] = useState(false);
// //   const [questionDrawing, setQuestionDrawing] = useState(false);

// //   // පිළිතුර සඳහා (Answer States)
// //   const [answerType, setAnswerType] = useState<
// //     "text" | "image" | "voice" | "drawing"
// //   >("text");
// //   const [answerText, setAnswerText] = useState("");
// //   const [answerImage, setAnswerImage] = useState<string | null>(null);
// //   const [isRecordingA, setIsRecordingA] = useState(false);
// //   const [answerVoice, setAnswerVoice] = useState(false);
// //   const [answerDrawing, setAnswerDrawing] = useState(false);

// //   // පින්තූරයක් තෝරාගැනීමේ פונක්ශනය (Image Picker Function)
// //   const pickImage = async (target: "question" | "answer") => {
// //     let result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       quality: 0.8,
// //     });

// //     if (!result.canceled) {
// //       if (target === "question") {
// //         setQuestionImage(result.assets[0].uri);
// //       } else {
// //         setAnswerImage(result.assets[0].uri);
// //       }
// //     }
// //   };

// //   // හඬ පටිගත කිරීමේ සිමියුලේෂන් (Voice Recording Handler)
// //   const handleVoiceRecord = (target: "question" | "answer") => {
// //     if (target === "question") {
// //       setIsRecordingQ(!isRecordingQ);
// //       setQuestionVoice(true);
// //     } else {
// //       setIsRecordingA(!isRecordingA);
// //       setAnswerVoice(true);
// //     }
// //   };

// //   // ඇඳීම් (Drawing) හැසිරවීම
// //   const handleDrawing = (target: "question" | "answer") => {
// //     Alert.alert("Drawing Canvas", "චිත්‍ර අඳින පහසුකම මෙහි විවෘත වේ.");
// //     if (target === "question") {
// //       setQuestionDrawing(true);
// //     } else {
// //       setAnswerDrawing(true);
// //     }
// //   };

// //   const handleSaveCard = () => {
// //     if (!subject || !lesson) {
// //       Alert.alert("දෝෂයකි", "කරුණාකර විෂය සහ පාඩමේ නම ඇතුළත් කරන්න.");
// //       return;
// //     }

// //     console.log({
// //       subject,
// //       lesson,
// //       question: {
// //         type: questionType,
// //         text: questionText,
// //         image: questionImage,
// //         voice: questionVoice,
// //         drawing: questionDrawing,
// //       },
// //       answer: {
// //         type: answerType,
// //         text: answerText,
// //         image: answerImage,
// //         voice: answerVoice,
// //         drawing: answerDrawing,
// //       },
// //       reminder: isReminderEnabled,
// //     });

// //     Alert.alert("සාර්ථකයි! 🎉", "නව ෆ්ලෑෂ් කාඩ් එක සාර්ථකව සුරකින ලදී.");
// //   };

// //   return (
// //     <ScrollView
// //       style={[styles.container, { backgroundColor: colors.background }]}
// //       contentContainerStyle={styles.contentContainer}
// //     >
// //       <Text style={[styles.headerTitle, { color: colors.text }]}>
// //         නව ෆ්ලෑෂ් කාඩ් එකක් එක් කරන්න
// //       </Text>

// //       {/* විෂය සහ පාඩම */}
// //       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
// //         <Text style={[styles.label, { color: colors.text }]}>
// //           විෂය (Subject)
// //         </Text>
// //         <TextInput
// //           style={[
// //             styles.input,
// //             { color: colors.text, borderColor: colors.tint },
// //           ]}
// //           placeholder="උදා: Physics / ගණිතය"
// //           placeholderTextColor="#9ca3af"
// //           value={subject}
// //           onChangeText={setSubject}
// //         />

// //         <Text style={[styles.label, { color: colors.text }]}>
// //           පාඩමේ නම (Lesson Name)
// //         </Text>
// //         <TextInput
// //           style={[
// //             styles.input,
// //             { color: colors.text, borderColor: colors.tint },
// //           ]}
// //           placeholder="උදා: යාන්ත්‍ර විද්‍යාව"
// //           placeholderTextColor="#9ca3af"
// //           value={lesson}
// //           onChangeText={setLesson}
// //         />
// //       </View>

// //       {/* ප්‍රශ්නය (Question Section) */}
// //       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
// //         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
// //           ප්‍රශ්නය (Question)
// //         </Text>

// //         <View style={styles.typeSelector}>
// //           {(["text", "image", "voice", "drawing"] as const).map((type) => (
// //             <TouchableOpacity
// //               key={type}
// //               style={[
// //                 styles.typeButton,
// //                 questionType === type && { backgroundColor: colors.primary },
// //               ]}
// //               onPress={() => setQuestionType(type)}
// //             >
// //               <Ionicons
// //                 name={
// //                   type === "text"
// //                     ? "text"
// //                     : type === "image"
// //                       ? "image"
// //                       : type === "voice"
// //                         ? "mic"
// //                         : "brush"
// //                 }
// //                 size={16}
// //                 color={questionType === type ? "#ffffff" : colors.text}
// //               />
// //               <Text
// //                 style={[
// //                   styles.typeButtonText,
// //                   { color: questionType === type ? "#ffffff" : colors.text },
// //                 ]}
// //               >
// //                 {type === "text"
// //                   ? "පෙළ"
// //                   : type === "image"
// //                     ? "පින්තූර"
// //                     : type === "voice"
// //                       ? "ශබ්ද"
// //                       : "ඇඳීම්"}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {questionType === "text" && (
// //           <TextInput
// //             style={[
// //               styles.textArea,
// //               { color: colors.text, borderColor: colors.tint },
// //             ]}
// //             placeholder="ප්‍රශ්නය ഇവിടെ ලියන්න..."
// //             placeholderTextColor="#9ca3af"
// //             multiline
// //             value={questionText}
// //             onChangeText={setQuestionText}
// //           />
// //         )}

// //         {questionType === "image" && (
// //           <TouchableOpacity
// //             style={[styles.uploadBox, { borderColor: colors.tint }]}
// //             onPress={() => pickImage("question")}
// //           >
// //             {questionImage ? (
// //               <Image
// //                 source={{ uri: questionImage }}
// //                 style={styles.previewImage}
// //               />
// //             ) : (
// //               <>
// //                 <Ionicons
// //                   name="image-outline"
// //                   size={30}
// //                   color={colors.primary}
// //                 />
// //                 <Text style={{ color: colors.text, marginTop: 5 }}>
// //                   ගැලරියෙන් පින්තූරයක් තෝරන්න
// //                 </Text>
// //               </>
// //             )}
// //           </TouchableOpacity>
// //         )}

// //         {questionType === "voice" && (
// //           <TouchableOpacity
// //             style={[
// //               styles.actionBox,
// //               { backgroundColor: isRecordingQ ? "#ef4444" : colors.primary },
// //             ]}
// //             onPress={() => handleVoiceRecord("question")}
// //           >
// //             <Ionicons
// //               name={isRecordingQ ? "stop-circle" : "mic"}
// //               size={24}
// //               color="#ffffff"
// //             />
// //             <Text style={styles.actionBoxText}>
// //               {isRecordingQ
// //                 ? "පටිගත කිරීම නවත්වන්න (Stop)"
// //                 : questionVoice
// //                   ? "හඬ පටිගත කර ඇත ✓ (다시 녹음)"
// //                   : "හඬ පටිගත කිරීම අරඹන්න"}
// //             </Text>
// //           </TouchableOpacity>
// //         )}

// //         {questionType === "drawing" && (
// //           <TouchableOpacity
// //             style={[styles.uploadBox, { borderColor: colors.tint }]}
// //             onPress={() => handleDrawing("question")}
// //           >
// //             <Ionicons name="brush-outline" size={30} color={colors.primary} />
// //             <Text style={{ color: colors.text, marginTop: 5 }}>
// //               {questionDrawing
// //                 ? "චිත්‍රය ඇඳ අවසන්ය ✓"
// //                 : "චිත්‍රයක් ඇඳීමට ක්ලික් කරන්න"}
// //             </Text>
// //           </TouchableOpacity>
// //         )}
// //       </View>

// //       {/* පිළිතුර (Answer Section) */}
// //       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
// //         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
// //           පිළිතුර (Answer)
// //         </Text>

// //         <View style={styles.typeSelector}>
// //           {(["text", "image", "voice", "drawing"] as const).map((type) => (
// //             <TouchableOpacity
// //               key={type}
// //               style={[
// //                 styles.typeButton,
// //                 answerType === type && { backgroundColor: colors.primary },
// //               ]}
// //               onPress={() => setAnswerType(type)}
// //             >
// //               <Ionicons
// //                 name={
// //                   type === "text"
// //                     ? "text"
// //                     : type === "image"
// //                       ? "image"
// //                       : type === "voice"
// //                         ? "mic"
// //                         : "brush"
// //                 }
// //                 size={16}
// //                 color={answerType === type ? "#ffffff" : colors.text}
// //               />
// //               <Text
// //                 style={[
// //                   styles.typeButtonText,
// //                   { color: answerType === type ? "#ffffff" : colors.text },
// //                 ]}
// //               >
// //                 {type === "text"
// //                   ? "පෙළ"
// //                   : type === "image"
// //                     ? "පින්තූර"
// //                     : type === "voice"
// //                       ? "ශබ්ද"
// //                       : "ඇඳීම්"}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {answerType === "text" && (
// //           <TextInput
// //             style={[
// //               styles.textArea,
// //               { color: colors.text, borderColor: colors.tint },
// //             ]}
// //             placeholder="පිළිතුර ഇവിടെ ලියන්න..."
// //             placeholderTextColor="#9ca3af"
// //             multiline
// //             value={answerText}
// //             onChangeText={setAnswerText}
// //           />
// //         )}

// //         {answerType === "image" && (
// //           <TouchableOpacity
// //             style={[styles.uploadBox, { borderColor: colors.tint }]}
// //             onPress={() => pickImage("answer")}
// //           >
// //             {answerImage ? (
// //               <Image
// //                 source={{ uri: answerImage }}
// //                 style={styles.previewImage}
// //               />
// //             ) : (
// //               <>
// //                 <Ionicons
// //                   name="image-outline"
// //                   size={30}
// //                   color={colors.primary}
// //                 />
// //                 <Text style={{ color: colors.text, marginTop: 5 }}>
// //                   පිළිතුරු පින්තූරයක් තෝරන්න
// //                 </Text>
// //               </>
// //             )}
// //           </TouchableOpacity>
// //         )}

// //         {answerType === "voice" && (
// //           <TouchableOpacity
// //             style={[
// //               styles.actionBox,
// //               { backgroundColor: isRecordingA ? "#ef4444" : colors.primary },
// //             ]}
// //             onPress={() => handleVoiceRecord("answer")}
// //           >
// //             <Ionicons
// //               name={isRecordingA ? "stop-circle" : "mic"}
// //               size={24}
// //               color="#ffffff"
// //             />
// //             <Text style={styles.actionBoxText}>
// //               {isRecordingA
// //                 ? "પටිගත කිරීම නවත්වන්න (Stop)"
// //                 : answerVoice
// //                   ? "හඬ පටිගත කර ඇත ✓"
// //                   : "පිළිතුරු හඬ පටිගත කරන්න"}
// //             </Text>
// //           </TouchableOpacity>
// //         )}

// //         {answerType === "drawing" && (
// //           <TouchableOpacity
// //             style={[styles.uploadBox, { borderColor: colors.tint }]}
// //             onPress={() => handleDrawing("answer")}
// //           >
// //             <Ionicons name="brush-outline" size={30} color={colors.primary} />
// //             <Text style={{ color: colors.text, marginTop: 5 }}>
// //               {answerDrawing
// //                 ? "චිත්‍රය ඇඳ අවසන්ය ✓"
// //                 : "පිළිතුරු චිත්‍රයක් ඇඳීමට ක්ලික් කරන්න"}
// //             </Text>
// //           </TouchableOpacity>
// //         )}
// //       </View>

// //       {/* රිමයින්ඩර් (Reminder Toggle) */}
// //       <View
// //         style={[
// //           styles.card,
// //           styles.rowCard,
// //           { backgroundColor: colors.cardBackground },
// //         ]}
// //       >
// //         <View style={{ flex: 1, marginRight: 10 }}>
// //           <Text style={[styles.label, { color: colors.text, marginBottom: 0 }]}>
// //             මතක් කිරීමක් (Reminder) අවශ්‍යද?
// //           </Text>
// //           <Text style={{ fontSize: 11, color: colors.tint, marginTop: 2 }}>
// //             මෙම කාඩ් එක ප්‍රගුණ කිරීමට නොටිෆිකේෂන් ලබා ගන්න
// //           </Text>
// //         </View>
// //         <Switch
// //           trackColor={{ false: "#767577", true: colors.primary }}
// //           thumbColor={isReminderEnabled ? "#ffffff" : "#f4f3f4"}
// //           onValueChange={setIsReminderEnabled}
// //           value={isReminderEnabled}
// //         />
// //       </View>

// //       {/* Save Button */}
// //       <TouchableOpacity
// //         style={[styles.saveButton, { backgroundColor: colors.primary }]}
// //         onPress={handleSaveCard}
// //       >
// //         <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
// //         <Text style={styles.saveButtonText}>කාඩ් එක සුරකින්න (Save Card)</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //   },
// //   contentContainer: {
// //     paddingBottom: 100,
// //     paddingTop: 40,
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     marginBottom: 16,
// //     textAlign: "center",
// //   },
// //   card: {
// //     padding: 16,
// //     borderRadius: 12,
// //     marginBottom: 16,
// //     elevation: 2,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //   },
// //   rowCard: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },
// //   label: {
// //     fontSize: 13,
// //     fontWeight: "600",
// //     marginBottom: 6,
// //   },
// //   sectionTitle: {
// //     fontSize: 15,
// //     fontWeight: "bold",
// //     marginBottom: 10,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 12,
// //     height: 42,
// //     marginBottom: 12,
// //     fontSize: 13,
// //   },
// //   textArea: {
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     padding: 12,
// //     height: 80,
// //     textAlignVertical: "top",
// //     fontSize: 13,
// //   },
// //   typeSelector: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 12,
// //   },
// //   typeButton: {
// //     flex: 1,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 6,
// //     marginHorizontal: 2,
// //     borderRadius: 6,
// //     borderWidth: 1,
// //     borderColor: "#e5e7eb",
// //   },
// //   typeButtonText: {
// //     fontSize: 10,
// //     fontWeight: "600",
// //     marginLeft: 3,
// //   },
// //   uploadBox: {
// //     height: 100,
// //     borderWidth: 1,
// //     borderStyle: "dashed",
// //     borderRadius: 8,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     overflow: "hidden",
// //   },
// //   previewImage: {
// //     width: "100%",
// //     height: "100%",
// //     resizeMode: "cover",
// //   },
// //   actionBox: {
// //     height: 50,
// //     borderRadius: 8,
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: 8,
// //   },
// //   actionBoxText: {
// //     color: "#ffffff",
// //     fontSize: 13,
// //     fontWeight: "bold",
// //   },
// //   saveButton: {
// //     flexDirection: "row",
// //     height: 48,
// //     borderRadius: 12,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: 8,
// //     marginTop: 10,
// //     marginBottom: 20,
// //     elevation: 3,
// //   },
// //   saveButtonText: {
// //     color: "#ffffff",
// //     fontSize: 15,
// //     fontWeight: "bold",
// //   },
// // });

// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import {
//     Alert,
//     Dimensions,
//     Image,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// export default function AddCardScreen() {
//   const { colors } = useTheme();

//   // මූලික ස්ටේට්
//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);

//   // ප්‍රශ්නය සඳහා States
//   const [questionType, setQuestionType] = useState<
//     "text" | "image" | "voice" | "drawing"
//   >("text");
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);

//   // Voice States (Question)
//   const [isRecordingQ, setIsRecordingQ] = useState(false);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);
//   const [isPlayingQ, setIsPlayingQ] = useState(false);

//   // Drawing States (Question)
//   const [questionDrawingModal, setQuestionDrawingModal] = useState(false);
//   const [questionDrawingUri, setQuestionDrawingUri] = useState<string | null>(
//     null,
//   );

//   // පිළිතුර සඳහා States
//   const [answerType, setAnswerType] = useState<
//     "text" | "image" | "voice" | "drawing"
//   >("text");
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);

//   // Voice States (Answer)
//   const [isRecordingA, setIsRecordingA] = useState(false);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);
//   const [isPlayingA, setIsPlayingA] = useState(false);

//   // Drawing States (Answer)
//   const [answerDrawingModal, setAnswerDrawingModal] = useState(false);
//   const [answerDrawingUri, setAnswerDrawingUri] = useState<string | null>(null);

//   // 1. Image Picker Function
//   const pickImage = async (target: "question" | "answer") => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       if (target === "question") {
//         setQuestionImage(result.assets[0].uri);
//       } else {
//         setAnswerImage(result.assets[0].uri);
//       }
//     }
//   };

//   // 2. Voice Recording Simulation & Controls
//   const toggleVoiceRecord = (target: "question" | "answer") => {
//     if (target === "question") {
//       if (isRecordingQ) {
//         setIsRecordingQ(false);
//         setQuestionVoiceUri("mock_audio_path_q.mp3"); // රෙකෝඩ් වී අවසන් වූ පසු ඌරි සැකසීම
//       } else {
//         setIsRecordingQ(true);
//       }
//     } else {
//       if (isRecordingA) {
//         setIsRecordingA(false);
//         setAnswerVoiceUri("mock_audio_path_a.mp3");
//       } else {
//         setIsRecordingA(true);
//       }
//     }
//   };

//   const deleteVoice = (target: "question" | "answer") => {
//     if (target === "question") {
//       setQuestionVoiceUri(null);
//       setIsPlayingQ(false);
//     } else {
//       setAnswerVoiceUri(null);
//       setIsPlayingA(false);
//     }
//   };

//   // 3. Drawing / Annotation Mock Save (Done button)
//   const handleSaveDrawing = (target: "question" | "answer") => {
//     // සැබෑ ඇඳීම් කෑන්වස් එකකින් රූපයක් ඩ්‍රෝ කරගත් පසු ලැබෙන URI එක මෙතැනට ලබා දිය හැක.
//     // දැනට උදාහරණයක් ලෙස ප්‍රිවිව් එකක් පෙන්වීමට ඩමී රූපයක් හෝ සේව් කරමු.
//     const mockDrawingUri =
//       "https://via.placeholder.com/300x200.png?text=Drawn+Annotation";

//     if (target === "question") {
//       setQuestionDrawingUri(mockDrawingUri);
//       setQuestionDrawingModal(false);
//     } else {
//       setAnswerDrawingUri(mockDrawingUri);
//       setAnswerDrawingModal(false);
//     }
//   };

//   const handleSaveCard = () => {
//     if (!subject || !lesson) {
//       Alert.alert("דෝෂයකි", "කරුණාකර විෂය සහ පාඩමේ නම ඇතුළත් කරන්න.");
//       return;
//     }
//     Alert.alert("සාර්ථකයි! 🎉", "නව ෆ්ලෑෂ් කාඩ් එක සාර්ථකව සුරකින ලදී.");
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={styles.contentContainer}
//     >
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         නව ෆ්ලෑෂ් කාඩ් එකක් එක් කරන්න
//       </Text>

//       {/* විෂය සහ පාඩම */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>
//           විෂය (Subject)
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             { color: colors.text, borderColor: colors.tint },
//           ]}
//           placeholder="උදා: Physics / ගණිතය"
//           placeholderTextColor="#9ca3af"
//           value={subject}
//           onChangeText={setSubject}
//         />

//         <Text style={[styles.label, { color: colors.text }]}>
//           පාඩමේ නම (Lesson Name)
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             { color: colors.text, borderColor: colors.tint },
//           ]}
//           placeholder="උදා: යාන්ත්‍ර විද්‍යාව"
//           placeholderTextColor="#9ca3af"
//           value={lesson}
//           onChangeText={setLesson}
//         />
//       </View>

//       {/* --- ප්‍රශ්නය (Question Section) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           ප්‍රශ්නය (Question)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice", "drawing"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text"
//                     ? "text"
//                     : type === "image"
//                       ? "image"
//                       : type === "voice"
//                         ? "mic"
//                         : "brush"
//                 }
//                 size={16}
//                 color={questionType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: questionType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text"
//                   ? "පෙළ"
//                   : type === "image"
//                     ? "පින්තූර"
//                     : type === "voice"
//                       ? "ශබ්ද"
//                       : "ඇඳීම්"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="ප්‍රශ්නය ഇവിടെ ලියන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: questionImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setQuestionImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   ගැලරියෙන් පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {questionType === "voice" && (
//           <View>
//             {!questionVoiceUri ? (
//               <TouchableOpacity
//                 style={[
//                   styles.actionBox,
//                   {
//                     backgroundColor: isRecordingQ ? "#ef4444" : colors.primary,
//                   },
//                 ]}
//                 onPress={() => toggleVoiceRecord("question")}
//               >
//                 <Ionicons
//                   name={isRecordingQ ? "stop-circle" : "mic"}
//                   size={22}
//                   color="#ffffff"
//                 />
//                 <Text style={styles.actionBoxText}>
//                   {isRecordingQ
//                     ? "රෙකෝඩ් වීම නවත්වන්න (Stop)"
//                     : "හඬ පටිගත කිරීම අරඹන්න"}
//                 </Text>
//               </TouchableOpacity>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => setIsPlayingQ(!isPlayingQ)}>
//                   <Ionicons
//                     name={isPlayingQ ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   හඬ පටිගත කර ඇත (Voice Recorded)
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("question")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}

//         {questionType === "drawing" && (
//           <View>
//             {!questionDrawingUri ? (
//               <TouchableOpacity
//                 style={[styles.uploadBox, { borderColor: colors.tint }]}
//                 onPress={() => setQuestionDrawingModal(true)}
//               >
//                 <Ionicons
//                   name="brush-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   චිත්‍රයක් / සටහනක් ඇඳීමට ක්ලික් කරන්න
//                 </Text>
//               </TouchableOpacity>
//             ) : (
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: questionDrawingUri }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setQuestionDrawingUri(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* --- පිළිතුර (Answer Section) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           පිළිතුර (Answer)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice", "drawing"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text"
//                     ? "text"
//                     : type === "image"
//                       ? "image"
//                       : type === "voice"
//                         ? "mic"
//                         : "brush"
//                 }
//                 size={16}
//                 color={answerType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: answerType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text"
//                   ? "පෙළ"
//                   : type === "image"
//                     ? "පින්තූර"
//                     : type === "voice"
//                       ? "ශබ්ද"
//                       : "ඇඳීම්"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="පිළිතුර ഇവിടെ ලියන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: answerImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setAnswerImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   පිළිතුරු පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {answerType === "voice" && (
//           <View>
//             {!answerVoiceUri ? (
//               <TouchableOpacity
//                 style={[
//                   styles.actionBox,
//                   {
//                     backgroundColor: isRecordingA ? "#ef4444" : colors.primary,
//                   },
//                 ]}
//                 onPress={() => toggleVoiceRecord("answer")}
//               >
//                 <Ionicons
//                   name={isRecordingA ? "stop-circle" : "mic"}
//                   size={22}
//                   color="#ffffff"
//                 />
//                 <Text style={styles.actionBoxText}>
//                   {isRecordingA
//                     ? "රෙකෝඩ් වීම නවත්වන්න (Stop)"
//                     : "පිළිතුරු හඬ පටිගත කරන්න"}
//                 </Text>
//               </TouchableOpacity>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => setIsPlayingA(!isPlayingA)}>
//                   <Ionicons
//                     name={isPlayingA ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   පිළිතුරු හඬ පටිගත කර ඇත
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("answer")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}

//         {answerType === "drawing" && (
//           <View>
//             {!answerDrawingUri ? (
//               <TouchableOpacity
//                 style={[styles.uploadBox, { borderColor: colors.tint }]}
//                 onPress={() => setAnswerDrawingModal(true)}
//               >
//                 <Ionicons
//                   name="brush-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   පිළිතුරු සටහනක් ඇඳීමට ක්ලික් කරන්න
//                 </Text>
//               </TouchableOpacity>
//             ) : (
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: answerDrawingUri }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setAnswerDrawingUri(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* --- DRAWING MODAL (LARGE CANVAS AREA) --- */}
//       <Modal
//         visible={questionDrawingModal || answerDrawingModal}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.modalOverlay}>
//           <View
//             style={[
//               styles.modalContent,
//               { backgroundColor: colors.cardBackground },
//             ]}
//           >
//             <View style={styles.modalHeader}>
//               <Text style={[styles.sectionTitle, { color: colors.text }]}>
//                 චිත්‍ර ඇඳීමේ කෑන්වස් එක (Drawing Board)
//               </Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   setQuestionDrawingModal(false);
//                   setAnswerDrawingModal(false);
//                 }}
//               >
//                 <Ionicons name="close" size={24} color={colors.text} />
//               </TouchableOpacity>
//             </View>

//             {/* මෙතැනදී ලොකු කෑන්වස් එකක් හෝ ඇඳීමේ අවකාශයක් පෙන්වයි */}
//             <View style={[styles.largeCanvasBox, { borderColor: colors.tint }]}>
//               <Ionicons name="brush" size={48} color={colors.primary} />
//               <Text
//                 style={{
//                   color: colors.text,
//                   marginTop: 10,
//                   textAlign: "center",
//                 }}
//               >
//                 මෙහි ඔබේ ඇඟිල්ලෙන් අඳින්න / සටහන් කරන්න.{"\n"}(Large space for
//                 drawing/annotating)
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={[
//                 styles.saveButton,
//                 { backgroundColor: colors.primary, marginTop: 15 },
//               ]}
//               onPress={() =>
//                 handleSaveDrawing(questionDrawingModal ? "question" : "answer")
//               }
//             >
//               <Text style={styles.saveButtonText}>අඳ අවසන් (Done)</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* රිමයින්ඩර් (Reminder Toggle) */}
//       <View
//         style={[
//           styles.card,
//           styles.rowCard,
//           { backgroundColor: colors.cardBackground },
//         ]}
//       >
//         <View style={{ flex: 1, marginRight: 10 }}>
//           <Text style={[styles.label, { color: colors.text, marginBottom: 0 }]}>
//             මතක් කිරීමක් (Reminder) අවශ්‍යද?
//           </Text>
//           <Text style={{ fontSize: 11, color: colors.tint, marginTop: 2 }}>
//             මෙම කාඩ් එක ප්‍රගුණ කිරීමට නොටිෆිකේෂන් ලබා ගන්න
//           </Text>
//         </View>
//         <Switch
//           trackColor={{ false: "#767577", true: colors.primary }}
//           thumbColor={isReminderEnabled ? "#ffffff" : "#f4f3f4"}
//           onValueChange={setIsReminderEnabled}
//           value={isReminderEnabled}
//         />
//       </View>

//       {/* Save Card Button */}
//       <TouchableOpacity
//         style={[styles.saveButton, { backgroundColor: colors.primary }]}
//         onPress={handleSaveCard}
//       >
//         <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
//         <Text style={styles.saveButtonText}>කාඩ් එක සුරකින්න (Save Card)</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   contentContainer: {
//     paddingBottom: 100,
//     paddingTop: 40,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   rowCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 42,
//     marginBottom: 12,
//     fontSize: 13,
//   },
//   textArea: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     height: 80,
//     textAlignVertical: "top",
//     fontSize: 13,
//   },
//   typeSelector: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   typeButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 6,
//     marginHorizontal: 2,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   typeButtonText: {
//     fontSize: 10,
//     fontWeight: "600",
//     marginLeft: 3,
//   },
//   uploadBox: {
//     height: 100,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   previewContainer: {
//     width: "100%",
//     height: 120,
//     borderRadius: 8,
//     overflow: "hidden",
//     position: "relative",
//   },
//   previewImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   deleteImageIcon: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   actionBox: {
//     height: 45,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },
//   actionBoxText: {
//     color: "#ffffff",
//     fontSize: 13,
//     fontWeight: "bold",
//   },
//   voicePlayerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   deleteBtn: {
//     padding: 6,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: SCREEN_WIDTH * 0.9,
//     padding: 20,
//     borderRadius: 16,
//     elevation: 5,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   largeCanvasBox: {
//     height: 300,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.02)",
//   },
//   saveButton: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   saveButtonText: {
//     color: "#ffffff",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
// });

// import { Ionicons } from "@expo/vector-icons";
// import { Audio } from "expo-av";
// import * as ImagePicker from "expo-image-picker";
// import { useEffect, useRef, useState } from "react";
// import {
//     Alert,
//     Animated,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// export default function AddCardScreen() {
//   const { colors } = useTheme();

//   // Basic Info States
//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);

//   // --- QUESTION STATES ---
//   const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);

//   // Real Voice States (Question)
//   const [questionVoiceRecorded, setQuestionVoiceRecorded] = useState(false);
//   const [isPlayingQ, setIsPlayingQ] = useState(false);
//   const [isRecordingQ, setIsRecordingQ] = useState(false);
//   const [recordingTimeQ, setRecordingTimeQ] = useState(0);
//   const [recordingQ, setRecordingQ] = useState<Audio.Recording | null>(null);
//   const [soundQ, setSoundQ] = useState<Audio.Sound | null>(null);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);

//   // --- ANSWER STATES ---
//   const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);

//   // Real Voice States (Answer)
//   const [answerVoiceRecorded, setAnswerVoiceRecorded] = useState(false);
//   const [isPlayingA, setIsPlayingA] = useState(false);
//   const [isRecordingA, setIsRecordingA] = useState(false);
//   const [recordingTimeA, setRecordingTimeA] = useState(0);
//   const [recordingA, setRecordingA] = useState<Audio.Recording | null>(null);
//   const [soundA, setSoundA] = useState<Audio.Sound | null>(null);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);

//   // Animation for Recording Pulse Effect
//   const pulseAnim = useRef(new Animated.Value(1)).current;

//   // Sound Wave Animations
//   const waveAnim1 = useRef(new Animated.Value(8)).current;
//   const waveAnim2 = useRef(new Animated.Value(15)).current;
//   const waveAnim3 = useRef(new Animated.Value(22)).current;
//   const waveAnim4 = useRef(new Animated.Value(12)).current;

//   useEffect(() => {
//     (async () => {
//       try {
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//         await Audio.requestPermissionsAsync();
//       } catch (err) {
//         console.log("Permission error:", err);
//       }
//     })();
//   }, []);

//   // Pulse & Sound Wave Animation Effect when Recording
//   useEffect(() => {
//     let pulseLoop: Animated.CompositeAnimation | null = null;
//     let waveLoop: Animated.CompositeAnimation | null = null;

//     if (isRecordingQ || isRecordingA) {
//       // Pulse Animation
//       pulseLoop = Animated.loop(
//         Animated.sequence([
//           Animated.timing(pulseAnim, {
//             toValue: 1.15,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//           Animated.timing(pulseAnim, {
//             toValue: 1,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//         ]),
//       );
//       pulseLoop.start();

//       // Sound Wave Equalizer Animation
//       waveLoop = Animated.loop(
//         Animated.parallel([
//           Animated.sequence([
//             Animated.timing(waveAnim1, {
//               toValue: 28,
//               duration: 200,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim1, {
//               toValue: 6,
//               duration: 200,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim2, {
//               toValue: 32,
//               duration: 150,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim2, {
//               toValue: 10,
//               duration: 250,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim3, {
//               toValue: 36,
//               duration: 220,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim3, {
//               toValue: 8,
//               duration: 180,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim4, {
//               toValue: 25,
//               duration: 180,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim4, {
//               toValue: 12,
//               duration: 220,
//               useNativeDriver: false,
//             }),
//           ]),
//         ]),
//       );
//       waveLoop.start();
//     } else {
//       pulseAnim.setValue(1);
//       waveAnim1.setValue(8);
//       waveAnim2.setValue(15);
//       waveAnim3.setValue(22);
//       waveAnim4.setValue(12);
//     }

//     return () => {
//       if (pulseLoop) pulseLoop.stop();
//       if (waveLoop) waveLoop.stop();
//     };
//   }, [isRecordingQ, isRecordingA]);

//   // Timer Effect for Recording Duration
//   useEffect(() => {
//     let interval: any = null;
//     if (isRecordingQ) {
//       setRecordingTimeQ(0);
//       interval = setInterval(() => setRecordingTimeQ((prev) => prev + 1), 1000);
//     } else if (isRecordingA) {
//       setRecordingTimeA(0);
//       interval = setInterval(() => setRecordingTimeA((prev) => prev + 1), 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecordingQ, isRecordingA]);

//   // 1. IMAGE PICKER
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

//   // 2. REAL VOICE RECORDING LOGIC (Expo AV)
//   const handleVoiceToggle = async (target: "question" | "answer") => {
//     try {
//       if (target === "question") {
//         if (isRecordingQ) {
//           setIsRecordingQ(false);
//           if (recordingQ) {
//             await recordingQ.stopAndUnloadAsync();
//             const uri = recordingQ.getURI();
//             setQuestionVoiceUri(uri);
//             setRecordingQ(null);
//             setQuestionVoiceRecorded(true);
//           }
//         } else {
//           await Audio.setAudioModeAsync({
//             allowsRecordingIOS: true,
//             playsInSilentModeIOS: true,
//           });
//           const { recording } = await Audio.Recording.createAsync(
//             Audio.RecordingOptionsPresets.HIGH_QUALITY,
//           );
//           setRecordingQ(recording);
//           setIsRecordingQ(true);
//         }
//       } else {
//         if (isRecordingA) {
//           setIsRecordingA(false);
//           if (recordingA) {
//             await recordingA.stopAndUnloadAsync();
//             const uri = recordingA.getURI();
//             setAnswerVoiceUri(uri);
//             setRecordingA(null);
//             setAnswerVoiceRecorded(true);
//           }
//         } else {
//           await Audio.setAudioModeAsync({
//             allowsRecordingIOS: true,
//             playsInSilentModeIOS: true,
//           });
//           const { recording } = await Audio.Recording.createAsync(
//             Audio.RecordingOptionsPresets.HIGH_QUALITY,
//           );
//           setRecordingA(recording);
//           setIsRecordingA(true);
//         }
//       }
//     } catch (err) {
//       console.log("Failed to start/stop recording", err);
//     }
//   };

//   // 3. PLAY VOICE
//   const handlePlayVoice = async (target: "question" | "answer") => {
//     try {
//       const uri = target === "question" ? questionVoiceUri : answerVoiceUri;
//       if (!uri) return;

//       if (target === "question") {
//         if (isPlayingQ) {
//           if (soundQ) await soundQ.stopAsync();
//           setIsPlayingQ(false);
//         } else {
//           const { sound } = await Audio.Sound.createAsync({ uri });
//           setSoundQ(sound);
//           setIsPlayingQ(true);
//           await sound.playAsync();
//           sound.setOnPlaybackStatusUpdate((status) => {
//             if (status.isLoaded && status.didJustFinish) {
//               setIsPlayingQ(false);
//             }
//           });
//         }
//       } else {
//         if (isPlayingA) {
//           if (soundA) await soundA.stopAsync();
//           setIsPlayingA(false);
//         } else {
//           const { sound } = await Audio.Sound.createAsync({ uri });
//           setSoundA(sound);
//           setIsPlayingA(true);
//           await sound.playAsync();
//           sound.setOnPlaybackStatusUpdate((status) => {
//             if (status.isLoaded && status.didJustFinish) {
//               setIsPlayingA(false);
//             }
//           });
//         }
//       }
//     } catch (err) {
//       console.log("Failed to play sound", err);
//     }
//   };

//   const deleteVoice = (target: "question" | "answer") => {
//     if (target === "question") {
//       setQuestionVoiceUri(null);
//       setQuestionVoiceRecorded(false);
//       setIsPlayingQ(false);
//     } else {
//       setAnswerVoiceUri(null);
//       setAnswerVoiceRecorded(false);
//       setIsPlayingA(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleSaveCard = () => {
//     if (!subject || !lesson) {
//       Alert.alert("දෝෂයකි", "කරුණාකර විෂය සහ පාඩමේ නම ඇතුළත් කරන්න.");
//       return;
//     }
//     Alert.alert("සාර්ථකයි! 🎉", "නව ෆ්ලෑෂ් කාඩ් එක සාර්ථකව සුරකින ලදී.");
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={styles.contentContainer}
//     >
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         නව ෆ්ලෑෂ් කාඩ් එකක් එක් කරන්න
//       </Text>

//       {/* විෂය සහ පාඩම */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>
//           විෂය (Subject)
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             { color: colors.text, borderColor: colors.tint },
//           ]}
//           placeholder="උදා: Physics / ගණිතය"
//           placeholderTextColor="#9ca3af"
//           value={subject}
//           onChangeText={setSubject}
//         />

//         <Text style={[styles.label, { color: colors.text }]}>
//           පාඩමේ නම (Lesson Name)
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             { color: colors.text, borderColor: colors.tint },
//           ]}
//           placeholder="උදා: යාන්ත්‍ර විද්‍යාව"
//           placeholderTextColor="#9ca3af"
//           value={lesson}
//           onChangeText={setLesson}
//         />
//       </View>

//       {/* --- 1. ප්‍රශ්නය (QUESTION SECTION) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           ප්‍රශ්නය (Question)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text" ? "text" : type === "image" ? "image" : "mic"
//                 }
//                 size={16}
//                 color={questionType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: questionType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text" ? "පෙළ" : type === "image" ? "පින්තූර" : "හඬ"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="ප්‍රශ්නය මෙහි ටයිප් කරන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: questionImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setQuestionImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   ගැලරියෙන් පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {/* VOICE RECORDING SECTION (Question) */}
//         {questionType === "voice" && (
//           <View>
//             {!questionVoiceRecorded ? (
//               <View style={styles.voiceWrapper}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionBox,
//                     {
//                       backgroundColor: isRecordingQ
//                         ? "#ef4444"
//                         : colors.primary,
//                     },
//                   ]}
//                   onPress={() => handleVoiceToggle("question")}
//                 >
//                   <Animated.View
//                     style={{
//                       transform: [{ scale: isRecordingQ ? pulseAnim : 1 }],
//                     }}
//                   >
//                     <Ionicons
//                       name={isRecordingQ ? "stop-circle" : "mic"}
//                       size={22}
//                       color="#ffffff"
//                     />
//                   </Animated.View>

//                   <Text style={styles.actionBoxText}>
//                     {isRecordingQ
//                       ? `රෙකෝඩ් වෙමින් පවතී... (${formatTime(recordingTimeQ)})`
//                       : "හඬ පටිගත කිරීම අරඹන්න (Record)"}
//                   </Text>

//                   {/* Sound Wave Visualizer while Recording */}
//                   {isRecordingQ && (
//                     <View style={styles.waveContainer}>
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim1 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim2 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim3 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim4 }]}
//                       />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => handlePlayVoice("question")}>
//                   <Ionicons
//                     name={isPlayingQ ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   {isPlayingQ
//                     ? "වාදනය වෙමින් පවතී..."
//                     : "ප්‍රශ්න හඬ පටිගත කර ඇත ✓"}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("question")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* --- 2. පිළිතුර (ANSWER SECTION) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           පිළිතුර (Answer)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text" ? "text" : type === "image" ? "image" : "mic"
//                 }
//                 size={16}
//                 color={answerType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: answerType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text" ? "පෙළ" : type === "image" ? "පින්තූර" : "හඬ"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="පිළිතුර මෙහි ටයිප් කරන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: answerImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setAnswerImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   පිළිතුරු පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {/* VOICE RECORDING SECTION (Answer) */}
//         {answerType === "voice" && (
//           <View>
//             {!answerVoiceRecorded ? (
//               <View style={styles.voiceWrapper}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionBox,
//                     {
//                       backgroundColor: isRecordingA
//                         ? "#ef4444"
//                         : colors.primary,
//                     },
//                   ]}
//                   onPress={() => handleVoiceToggle("answer")}
//                 >
//                   <Animated.View
//                     style={{
//                       transform: [{ scale: isRecordingA ? pulseAnim : 1 }],
//                     }}
//                   >
//                     <Ionicons
//                       name={isRecordingA ? "stop-circle" : "mic"}
//                       size={22}
//                       color="#ffffff"
//                     />
//                   </Animated.View>

//                   <Text style={styles.actionBoxText}>
//                     {isRecordingA
//                       ? `රෙකෝඩ් වෙමින් පවතී... (${formatTime(recordingTimeA)})`
//                       : "පිළිතුරු හඬ පටිගත කරන්න (Record)"}
//                   </Text>

//                   {/* Sound Wave Visualizer while Recording */}
//                   {isRecordingA && (
//                     <View style={styles.waveContainer}>
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim1 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim2 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim3 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim4 }]}
//                       />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => handlePlayVoice("answer")}>
//                   <Ionicons
//                     name={isPlayingA ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   {isPlayingA
//                     ? "වාදනය වෙමින් පවතී..."
//                     : "පිළිතුරු හඬ පටිගත කර ඇත ✓"}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("answer")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* Reminder Toggle */}
//       <View
//         style={[
//           styles.card,
//           styles.rowCard,
//           { backgroundColor: colors.cardBackground },
//         ]}
//       >
//         <View style={{ flex: 1, marginRight: 10 }}>
//           <Text style={[styles.label, { color: colors.text, marginBottom: 0 }]}>
//             මතක් කිරීමක් (Reminder) අවශ්‍යද?
//           </Text>
//           <Text style={{ fontSize: 11, color: colors.tint, marginTop: 2 }}>
//             මෙම කාඩ් එක පුනරාවර්තනය කිරීමට නොටිෆිකේෂන් ලබා ගන්න
//           </Text>
//         </View>
//         <Switch
//           trackColor={{ false: "#767577", true: colors.primary }}
//           thumbColor={isReminderEnabled ? "#ffffff" : "#f4f3f4"}
//           onValueChange={setIsReminderEnabled}
//           value={isReminderEnabled}
//         />
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity
//         style={[styles.saveButton, { backgroundColor: colors.primary }]}
//         onPress={handleSaveCard}
//       >
//         <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
//         <Text style={styles.saveButtonText}>කාඩ් එක සුරකින්න (Save Card)</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   contentContainer: { paddingBottom: 100, paddingTop: 40 },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   rowCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   label: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
//   sectionTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 42,
//     marginBottom: 12,
//     fontSize: 13,
//   },
//   textArea: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     height: 80,
//     textAlignVertical: "top",
//     fontSize: 13,
//   },
//   typeSelector: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   typeButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 6,
//     marginHorizontal: 2,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   typeButtonText: { fontSize: 11, fontWeight: "600", marginLeft: 4 },
//   uploadBox: {
//     height: 100,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   previewContainer: {
//     width: "100%",
//     height: 120,
//     borderRadius: 8,
//     overflow: "hidden",
//     position: "relative",
//   },
//   previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
//   deleteImageIcon: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   voiceWrapper: { width: "100%" },
//   actionBox: {
//     height: 48,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     gap: 8,
//   },
//   actionBoxText: {
//     color: "#ffffff",
//     fontSize: 13,
//     fontWeight: "bold",
//     flexShrink: 1,
//   },
//   waveContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     height: 30,
//     gap: 3,
//     marginLeft: 4,
//   },
//   waveBar: { width: 3, backgroundColor: "#ffffff", borderRadius: 2 },
//   voicePlayerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   deleteBtn: { padding: 6 },
//   saveButton: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   saveButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
// });

// import { Ionicons } from "@expo/vector-icons";
// import {
//     AudioModule,
//     createAudioPlayer,
//     RecordingPresets,
//     setAudioModeAsync,
//     useAudioRecorder,
//     useAudioRecorderState,
// } from "expo-audio";
// import * as ImagePicker from "expo-image-picker";
// import { useEffect, useRef, useState } from "react";
// import {
//     Alert,
//     Animated,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// export default function AddCardScreen() {
//   const { colors } = useTheme();

//   // Basic Info States
//   const [subject, setSubject] = useState("");
//   const [lesson, setLesson] = useState("");
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);

//   // --- QUESTION STATES ---
//   const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);

//   // Question Voice States (expo-audio)
//   const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateQ = useAudioRecorderState(audioRecorderQ);
//   const [questionVoiceRecorded, setQuestionVoiceRecorded] = useState(false);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);
//   const [isPlayingQ, setIsPlayingQ] = useState(false);
//   const [soundPlayerQ, setSoundPlayerQ] = useState<any>(null);

//   // --- ANSWER STATES ---
//   const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);

//   // Answer Voice States (expo-audio)
//   const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateA = useAudioRecorderState(audioRecorderA);
//   const [answerVoiceRecorded, setAnswerVoiceRecorded] = useState(false);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);
//   const [isPlayingA, setIsPlayingA] = useState(false);
//   const [soundPlayerA, setSoundPlayerA] = useState<any>(null);

//   // Animation for Recording Pulse Effect
//   const pulseAnim = useRef(new Animated.Value(1)).current;

//   // Sound Wave Animations
//   const waveAnim1 = useRef(new Animated.Value(8)).current;
//   const waveAnim2 = useRef(new Animated.Value(15)).current;
//   const waveAnim3 = useRef(new Animated.Value(22)).current;
//   const waveAnim4 = useRef(new Animated.Value(12)).current;

//   useEffect(() => {
//     (async () => {
//       try {
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//         const perm = await AudioModule.requestRecordingPermissionsAsync();
//         if (!perm.granted) {
//           console.log("Microphone permission not granted!");
//         }
//         await setAudioModeAsync({
//           playsInSilentMode: true,
//           allowsRecording: true,
//         });
//       } catch (err) {
//         console.log("Permission error:", err);
//       }
//     })();
//   }, []);

//   const isRecordingQ = recorderStateQ.isRecording;
//   const isRecordingA = recorderStateA.isRecording;

//   // Pulse & Sound Wave Animation Effect when Recording
//   useEffect(() => {
//     let pulseLoop: Animated.CompositeAnimation | null = null;
//     let waveLoop: Animated.CompositeAnimation | null = null;

//     if (isRecordingQ || isRecordingA) {
//       pulseLoop = Animated.loop(
//         Animated.sequence([
//           Animated.timing(pulseAnim, {
//             toValue: 1.15,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//           Animated.timing(pulseAnim, {
//             toValue: 1,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//         ]),
//       );
//       pulseLoop.start();

//       waveLoop = Animated.loop(
//         Animated.parallel([
//           Animated.sequence([
//             Animated.timing(waveAnim1, {
//               toValue: 28,
//               duration: 200,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim1, {
//               toValue: 6,
//               duration: 200,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim2, {
//               toValue: 32,
//               duration: 150,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim2, {
//               toValue: 10,
//               duration: 250,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim3, {
//               toValue: 36,
//               duration: 220,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim3, {
//               toValue: 8,
//               duration: 180,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim4, {
//               toValue: 25,
//               duration: 180,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim4, {
//               toValue: 12,
//               duration: 220,
//               useNativeDriver: false,
//             }),
//           ]),
//         ]),
//       );
//       waveLoop.start();
//     } else {
//       pulseAnim.setValue(1);
//       waveAnim1.setValue(8);
//       waveAnim2.setValue(15);
//       waveAnim3.setValue(22);
//       waveAnim4.setValue(12);
//     }

//     return () => {
//       if (pulseLoop) pulseLoop.stop();
//       if (waveLoop) waveLoop.stop();
//     };
//   }, [isRecordingQ, isRecordingA]);

//   // 1. IMAGE PICKER
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

//   // 2. VOICE RECORDING TOGGLE (expo-audio)
//   const handleVoiceToggle = async (target: "question" | "answer") => {
//     try {
//       if (target === "question") {
//         if (isRecordingQ) {
//           await audioRecorderQ.stop();
//           setQuestionVoiceUri(audioRecorderQ.uri);
//           setQuestionVoiceRecorded(true);
//         } else {
//           await audioRecorderQ.prepareToRecordAsync();
//           audioRecorderQ.record();
//         }
//       } else {
//         if (isRecordingA) {
//           await audioRecorderA.stop();
//           setAnswerVoiceUri(audioRecorderA.uri);
//           setAnswerVoiceRecorded(true);
//         } else {
//           await audioRecorderA.prepareToRecordAsync();
//           audioRecorderA.record();
//         }
//       }
//     } catch (err) {
//       console.log("Failed to toggle recording", err);
//     }
//   };

//   // 3. PLAY VOICE
//   const handlePlayVoice = async (target: "question" | "answer") => {
//     try {
//       const uri = target === "question" ? questionVoiceUri : answerVoiceUri;
//       if (!uri) return;

//       if (target === "question") {
//         if (isPlayingQ) {
//           if (soundPlayerQ) soundPlayerQ.pause();
//           setIsPlayingQ(false);
//         } else {
//           const player = createAudioPlayer({ uri });
//           setSoundPlayerQ(player);
//           setIsPlayingQ(true);
//           player.play();
//         }
//       } else {
//         if (isPlayingA) {
//           if (soundPlayerA) soundPlayerA.pause();
//           setIsPlayingA(false);
//         } else {
//           const player = createAudioPlayer({ uri });
//           setSoundPlayerA(player);
//           setIsPlayingA(true);
//           player.play();
//         }
//       }
//     } catch (err) {
//       console.log("Failed to play sound", err);
//     }
//   };

//   const deleteVoice = (target: "question" | "answer") => {
//     if (target === "question") {
//       setQuestionVoiceUri(null);
//       setQuestionVoiceRecorded(false);
//       setIsPlayingQ(false);
//       if (soundPlayerQ) soundPlayerQ.release();
//     } else {
//       setAnswerVoiceUri(null);
//       setAnswerVoiceRecorded(false);
//       setIsPlayingA(false);
//       if (soundPlayerA) soundPlayerA.release();
//     }
//   };

//   const handleSaveCard = () => {
//     if (!subject || !lesson) {
//       Alert.alert("දෝෂයකි", "කරුණාකර විෂය සහ පාඩමේ නම ඇතුළත් කරන්න.");
//       return;
//     }
//     Alert.alert("සාර්ථකයි! 🎉", "නව ෆ්ලෑෂ් කාඩ් එක සාර්ථකව සුරකින ලදී.");
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={styles.contentContainer}
//     >
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         නව ෆ්ලෑෂ් කාඩ් එකක් එක් කරන්න
//       </Text>

//       {/* විෂය සහ පාඩම */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>
//           විෂය (Subject)
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             { color: colors.text, borderColor: colors.tint },
//           ]}
//           placeholder="උදා: Physics / ගණිතය"
//           placeholderTextColor="#9ca3af"
//           value={subject}
//           onChangeText={setSubject}
//         />

//         <Text style={[styles.label, { color: colors.text }]}>
//           පාඩමේ නම (Lesson Name)
//         </Text>
//         <TextInput
//           style={[
//             styles.input,
//             { color: colors.text, borderColor: colors.tint },
//           ]}
//           placeholder="උදා: යාන්ත්‍ර විද්‍යාව"
//           placeholderTextColor="#9ca3af"
//           value={lesson}
//           onChangeText={setLesson}
//         />
//       </View>

//       {/* --- 1. ප්‍රශ්නය (QUESTION SECTION) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           ප්‍රශ්නය (Question)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text" ? "text" : type === "image" ? "image" : "mic"
//                 }
//                 size={16}
//                 color={questionType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: questionType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text" ? "පෙළ" : type === "image" ? "පින්තූර" : "හඬ"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="ප්‍රශ්නය මෙහි ටයිප් කරන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: questionImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setQuestionImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   ගැලරියෙන් පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {/* VOICE RECORDING SECTION (Question) */}
//         {questionType === "voice" && (
//           <View>
//             {!questionVoiceRecorded ? (
//               <View style={styles.voiceWrapper}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionBox,
//                     {
//                       backgroundColor: isRecordingQ
//                         ? "#ef4444"
//                         : colors.primary,
//                     },
//                   ]}
//                   onPress={() => handleVoiceToggle("question")}
//                 >
//                   <Animated.View
//                     style={{
//                       transform: [{ scale: isRecordingQ ? pulseAnim : 1 }],
//                     }}
//                   >
//                     <Ionicons
//                       name={isRecordingQ ? "stop-circle" : "mic"}
//                       size={22}
//                       color="#ffffff"
//                     />
//                   </Animated.View>

//                   <Text style={styles.actionBoxText}>
//                     {isRecordingQ
//                       ? "රෙකෝඩ් වෙමින් පවතී..."
//                       : "හඬ පටිගත කිරීම අරඹන්න (Record)"}
//                   </Text>

//                   {/* Sound Wave Visualizer while Recording */}
//                   {isRecordingQ && (
//                     <View style={styles.waveContainer}>
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim1 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim2 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim3 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim4 }]}
//                       />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => handlePlayVoice("question")}>
//                   <Ionicons
//                     name={isPlayingQ ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   {isPlayingQ
//                     ? "වාදනය වෙමින් පවතී..."
//                     : "ප්‍රශ්න හඬ පටිගත කර ඇත ✓"}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("question")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* --- 2. පිළිතුර (ANSWER SECTION) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           පිළිතුර (Answer)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text" ? "text" : type === "image" ? "image" : "mic"
//                 }
//                 size={16}
//                 color={answerType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: answerType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text" ? "පෙළ" : type === "image" ? "පින්තූර" : "හඬ"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="පිළිතුර මෙහි ටයිප් කරන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: answerImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setAnswerImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   පිළිතුරු පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {/* VOICE RECORDING SECTION (Answer) */}
//         {answerType === "voice" && (
//           <View>
//             {!answerVoiceRecorded ? (
//               <View style={styles.voiceWrapper}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionBox,
//                     {
//                       backgroundColor: isRecordingA
//                         ? "#ef4444"
//                         : colors.primary,
//                     },
//                   ]}
//                   onPress={() => handleVoiceToggle("answer")}
//                 >
//                   <Animated.View
//                     style={{
//                       transform: [{ scale: isRecordingA ? pulseAnim : 1 }],
//                     }}
//                   >
//                     <Ionicons
//                       name={isRecordingA ? "stop-circle" : "mic"}
//                       size={22}
//                       color="#ffffff"
//                     />
//                   </Animated.View>

//                   <Text style={styles.actionBoxText}>
//                     {isRecordingA
//                       ? "රෙකෝඩ් වෙමින් පවතී..."
//                       : "පිළිතුරු හඬ පටිගත කරන්න (Record)"}
//                   </Text>

//                   {/* Sound Wave Visualizer while Recording */}
//                   {isRecordingA && (
//                     <View style={styles.waveContainer}>
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim1 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim2 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim3 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim4 }]}
//                       />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => handlePlayVoice("answer")}>
//                   <Ionicons
//                     name={isPlayingA ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   {isPlayingA
//                     ? "වාදනය වෙමින් පවතී..."
//                     : "පිළිතුරු හඬ පටිගත කර ඇත ✓"}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("answer")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* Reminder Toggle */}
//       <View
//         style={[
//           styles.card,
//           styles.rowCard,
//           { backgroundColor: colors.cardBackground },
//         ]}
//       >
//         <View style={{ flex: 1, marginRight: 10 }}>
//           <Text style={[styles.label, { color: colors.text, marginBottom: 0 }]}>
//             මතක් කිරීමක් (Reminder) අවශ්‍යද?
//           </Text>
//           <Text style={{ fontSize: 11, color: colors.tint, marginTop: 2 }}>
//             මෙම කාඩ් එක පුනරාවර්තනය කිරීමට නොටිෆිකේෂන් ලබා ගන්න
//           </Text>
//         </View>
//         <Switch
//           trackColor={{ false: "#767577", true: colors.primary }}
//           thumbColor={isReminderEnabled ? "#ffffff" : "#f4f3f4"}
//           onValueChange={setIsReminderEnabled}
//           value={isReminderEnabled}
//         />
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity
//         style={[styles.saveButton, { backgroundColor: colors.primary }]}
//         onPress={handleSaveCard}
//       >
//         <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
//         <Text style={styles.saveButtonText}>කාඩ් එක සුරකින්න (Save Card)</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   contentContainer: { paddingBottom: 100, paddingTop: 40 },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   rowCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   label: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
//   sectionTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 42,
//     marginBottom: 12,
//     fontSize: 13,
//   },
//   textArea: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     height: 80,
//     textAlignVertical: "top",
//     fontSize: 13,
//   },
//   typeSelector: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   typeButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 6,
//     marginHorizontal: 2,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   typeButtonText: { fontSize: 11, fontWeight: "600", marginLeft: 4 },
//   uploadBox: {
//     height: 100,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   previewContainer: {
//     width: "100%",
//     height: 120,
//     borderRadius: 8,
//     overflow: "hidden",
//     position: "relative",
//   },
//   previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
//   deleteImageIcon: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   voiceWrapper: { width: "100%" },
//   actionBox: {
//     height: 48,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     gap: 8,
//   },
//   actionBoxText: {
//     color: "#ffffff",
//     fontSize: 13,
//     fontWeight: "bold",
//     flexShrink: 1,
//   },
//   waveContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     height: 30,
//     gap: 3,
//     marginLeft: 4,
//   },
//   waveBar: { width: 3, backgroundColor: "#ffffff", borderRadius: 2 },
//   voicePlayerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   deleteBtn: { padding: 6 },
//   saveButton: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   saveButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
// });

// import { Ionicons } from "@expo/vector-icons";
// import {
//   AudioModule,
//   createAudioPlayer,
//   RecordingPresets,
//   setAudioModeAsync,
//   useAudioRecorder,
//   useAudioRecorderState,
// } from "expo-audio";
// import * as FileSystem from "expo-file-system/legacy";
// import * as ImagePicker from "expo-image-picker";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useTheme } from "../../context/ThemeContext";

// import * as FileSystem from "expo-file-system/legacy";

// Open SQLite Database
// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function AddCardScreen() {
//   const { colors } = useTheme();

//   // Basic Info States
//   const [subject, setSubject] = useState<string>("");
//   const [lesson, setLesson] = useState<string>("");
//   const [isReminderEnabled, setIsReminderEnabled] = useState(false);
//   const [reminderDays, setReminderDays] = useState("3 days");

//   // --- QUESTION STATES ---
//   const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [questionText, setQuestionText] = useState("");
//   const [questionImage, setQuestionImage] = useState<string | null>(null);

//   // Question Voice States (expo-audio)
//   const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateQ = useAudioRecorderState(audioRecorderQ);
//   const [questionVoiceRecorded, setQuestionVoiceRecorded] = useState(false);
//   const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);
//   const [isPlayingQ, setIsPlayingQ] = useState(false);
//   const [soundPlayerQ, setSoundPlayerQ] = useState<any>(null);

//   // --- ANSWER STATES ---
//   const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
//     "text",
//   );
//   const [answerText, setAnswerText] = useState("");
//   const [answerImage, setAnswerImage] = useState<string | null>(null);

//   // Answer Voice States (expo-audio)
//   const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const recorderStateA = useAudioRecorderState(audioRecorderA);
//   const [answerVoiceRecorded, setAnswerVoiceRecorded] = useState(false);
//   const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);
//   const [isPlayingA, setIsPlayingA] = useState(false);
//   const [soundPlayerA, setSoundPlayerA] = useState<any>(null);

//   // Animation for Recording Pulse Effect
//   const pulseAnim = useRef(new Animated.Value(1)).current;

//   // Sound Wave Animations
//   const waveAnim1 = useRef(new Animated.Value(8)).current;
//   const waveAnim2 = useRef(new Animated.Value(15)).current;
//   const waveAnim3 = useRef(new Animated.Value(22)).current;
//   const waveAnim4 = useRef(new Animated.Value(12)).current;

//   // Initialize SQLite Table on Load
//   useEffect(() => {
//     (async () => {
//       try {
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//         const perm = await AudioModule.requestRecordingPermissionsAsync();
//         if (!perm.granted) {
//           console.log("Microphone permission not granted!");
//         }
//         await setAudioModeAsync({
//           playsInSilentMode: true,
//           allowsRecording: true,
//         });

//         // Create Table
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS flashcards (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             subject TEXT,
//             lesson TEXT,
//             questionType TEXT,
//             questionContent TEXT,
//             answerType TEXT,
//             answerContent TEXT,
//             reminderEnabled INTEGER,
//             reminderDays TEXT
//           );
//         `);
//       } catch (err) {
//         console.log("Init error:", err);
//       }
//     })();
//   }, []);

//   const isRecordingQ = recorderStateQ.isRecording;
//   const isRecordingA = recorderStateA.isRecording;

//   // Pulse & Sound Wave Animation Effect when Recording
//   useEffect(() => {
//     let pulseLoop: Animated.CompositeAnimation | null = null;
//     let waveLoop: Animated.CompositeAnimation | null = null;

//     if (isRecordingQ || isRecordingA) {
//       pulseLoop = Animated.loop(
//         Animated.sequence([
//           Animated.timing(pulseAnim, {
//             toValue: 1.15,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//           Animated.timing(pulseAnim, {
//             toValue: 1,
//             duration: 500,
//             useNativeDriver: true,
//           }),
//         ]),
//       );
//       pulseLoop.start();

//       waveLoop = Animated.loop(
//         Animated.parallel([
//           Animated.sequence([
//             Animated.timing(waveAnim1, {
//               toValue: 28,
//               duration: 200,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim1, {
//               toValue: 6,
//               duration: 200,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim2, {
//               toValue: 32,
//               duration: 150,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim2, {
//               toValue: 10,
//               duration: 250,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim3, {
//               toValue: 36,
//               duration: 220,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim3, {
//               toValue: 8,
//               duration: 180,
//               useNativeDriver: false,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(waveAnim4, {
//               toValue: 25,
//               duration: 180,
//               useNativeDriver: false,
//             }),
//             Animated.timing(waveAnim4, {
//               toValue: 12,
//               duration: 220,
//               useNativeDriver: false,
//             }),
//           ]),
//         ]),
//       );
//       waveLoop.start();
//     } else {
//       pulseAnim.setValue(1);
//       waveAnim1.setValue(8);
//       waveAnim2.setValue(15);
//       waveAnim3.setValue(22);
//       waveAnim4.setValue(12);
//     }

//     return () => {
//       if (pulseLoop) pulseLoop.stop();
//       if (waveLoop) waveLoop.stop();
//     };
//   }, [isRecordingQ, isRecordingA]);

//   // Dynamic Lessons Generator based on Subject
//   const getLessonsList = () => {
//     if (subject === "Chemistry") {
//       return Array.from({ length: 10 }, (_, i) => `පාඩම ${i + 1}`);
//     } else if (subject === "Physics") {
//       return Array.from({ length: 9 }, (_, i) => `පාඩම ${i + 1}`);
//     } else if (subject === "Combined Maths") {
//       return Array.from({ length: 10 }, (_, i) => `පාඩම ${i + 1}`);
//     }
//     return [];
//   };

//   // Image Picker
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

//   // Voice Recording Toggle
//   const handleVoiceToggle = async (target: "question" | "answer") => {
//     try {
//       if (target === "question") {
//         if (isRecordingQ) {
//           await audioRecorderQ.stop();
//           setQuestionVoiceUri(audioRecorderQ.uri);
//           setQuestionVoiceRecorded(true);
//         } else {
//           await audioRecorderQ.prepareToRecordAsync();
//           audioRecorderQ.record();
//         }
//       } else {
//         if (isRecordingA) {
//           await audioRecorderA.stop();
//           setAnswerVoiceUri(audioRecorderA.uri);
//           setAnswerVoiceRecorded(true);
//         } else {
//           await audioRecorderA.prepareToRecordAsync();
//           audioRecorderA.record();
//         }
//       }
//     } catch (err) {
//       console.log("Failed to toggle recording", err);
//     }
//   };

//   // Play Voice
//   const handlePlayVoice = async (target: "question" | "answer") => {
//     try {
//       const uri = target === "question" ? questionVoiceUri : answerVoiceUri;
//       if (!uri) return;

//       if (target === "question") {
//         if (isPlayingQ) {
//           if (soundPlayerQ) soundPlayerQ.pause();
//           setIsPlayingQ(false);
//         } else {
//           const player = createAudioPlayer({ uri });
//           setSoundPlayerQ(player);
//           setIsPlayingQ(true);
//           player.play();
//         }
//       } else {
//         if (isPlayingA) {
//           if (soundPlayerA) soundPlayerA.pause();
//           setIsPlayingA(false);
//         } else {
//           const player = createAudioPlayer({ uri });
//           setSoundPlayerA(player);
//           setIsPlayingA(true);
//           player.play();
//         }
//       }
//     } catch (err) {
//       console.log("Failed to play sound", err);
//     }
//   };

//   const deleteVoice = (target: "question" | "answer") => {
//     if (target === "question") {
//       setQuestionVoiceUri(null);
//       setQuestionVoiceRecorded(false);
//       setIsPlayingQ(false);
//       if (soundPlayerQ) soundPlayerQ.release();
//     } else {
//       setAnswerVoiceUri(null);
//       setAnswerVoiceRecorded(false);
//       setIsPlayingA(false);
//       if (soundPlayerA) soundPlayerA.release();
//     }
//   };

//   const handleSaveCard = async () => {
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

//       // 1. ප්‍රශ්නය Voice හෝ Image නම් එය ස්ථිර Document Directory එකට කොපි කිරීම
//       if ((questionType === "voice" || questionType === "image") && qContent) {
//         const filename = qContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({
//           from: qContent,
//           to: permanentUri,
//         });
//         qContent = permanentUri;
//       }

//       // 2. පිළිතුර Voice හෝ Image නම් එය ස්ථිර Document Directory එකට කොපි කිරීම
//       if ((answerType === "voice" || answerType === "image") && aContent) {
//         const filename = aContent.split("/").pop();
//         const permanentUri = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({
//           from: aContent,
//           to: permanentUri,
//         });
//         aContent = permanentUri;
//       }

//       // 3. SQLite ඩේටාබේස් එකේ සේව් කිරීම
//       await db.runAsync(
//         `INSERT INTO flashcards (subject, lesson, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
//         [
//           subject,
//           lesson,
//           questionType,
//           qContent,
//           answerType,
//           aContent,
//           isReminderEnabled ? 1 : 0,
//           isReminderEnabled ? reminderDays : "None",
//         ],
//       );

//       Alert.alert(
//         "සාර්ථකයි! 🎉",
//         "නව ෆ්ලෑෂ් කාඩ් එක ඩේටාබේස් එකේ සාර්ථකව සුරකින ලදී.",
//       );

//       // Reset form
//       setSubject("");
//       setLesson("");
//       setQuestionText("");
//       setQuestionImage(null);
//       setQuestionVoiceUri(null);
//       setQuestionVoiceRecorded(false);
//       setAnswerText("");
//       setAnswerImage(null);
//       setAnswerVoiceUri(null);
//       setAnswerVoiceRecorded(false);
//       setIsReminderEnabled(false);
//     } catch (error) {
//       console.log("Database save error:", error);
//       Alert.alert("දෝෂයකි", "කාඩ් එක ඩේටාබේස් එකේ සුරැකීමේදී දෝෂයක් ඇති විය.");
//     }
//   };

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       contentContainerStyle={styles.contentContainer}
//     >
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         නව ෆ්ලෑෂ් කාඩ් එකක් එක් කරන්න
//       </Text>

//       {/* --- විෂය තේරීම (Subject Selection) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.label, { color: colors.text }]}>
//           විෂය තෝරන්න (Select Subject)
//         </Text>
//         <View style={styles.subjectContainer}>
//           {["Chemistry", "Physics", "Combined Maths"].map((subj) => (
//             <TouchableOpacity
//               key={subj}
//               style={[
//                 styles.subjectButton,
//                 subject === subj && {
//                   backgroundColor: colors.primary,
//                   borderColor: colors.primary,
//                 },
//               ]}
//               onPress={() => {
//                 setSubject(subj);
//                 setLesson(""); // Reset lesson when subject changes
//               }}
//             >
//               <Text
//                 style={[
//                   styles.subjectButtonText,
//                   { color: subject === subj ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {subj === "Chemistry"
//                   ? "Chemistry (රසායන විද්‍යාව)"
//                   : subj === "Physics"
//                     ? "Physics (භෞතික විද්‍යාව)"
//                     : "Combined Maths (සංයුක්ත ගණිතය)"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* --- පාඩම තේරීම (Lesson Selection) --- */}
//         {subject !== "" && (
//           <>
//             <Text style={[styles.label, { color: colors.text, marginTop: 14 }]}>
//               පාඩම තෝරන්න (Select Lesson)
//             </Text>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.lessonScroll}
//             >
//               {getLessonsList().map((lesName) => (
//                 <TouchableOpacity
//                   key={lesName}
//                   style={[
//                     styles.lessonChip,
//                     lesson === lesName && {
//                       backgroundColor: colors.primary,
//                       borderColor: colors.primary,
//                     },
//                   ]}
//                   onPress={() => setLesson(lesName)}
//                 >
//                   <Text
//                     style={[
//                       styles.lessonChipText,
//                       { color: lesson === lesName ? "#ffffff" : colors.text },
//                     ]}
//                   >
//                     {lesName}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </>
//         )}
//       </View>

//       {/* --- 1. ප්‍රශ්නය (QUESTION SECTION) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           ප්‍රශ්නය (Question)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 questionType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setQuestionType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text" ? "text" : type === "image" ? "image" : "mic"
//                 }
//                 size={16}
//                 color={questionType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: questionType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text" ? "පෙළ" : type === "image" ? "පින්තූර" : "හඬ"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {questionType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="ප්‍රශ්නය මෙහි ටයිප් කරන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: questionImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setQuestionImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   ගැලරියෙන් පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {questionType === "voice" && (
//           <View>
//             {!questionVoiceRecorded ? (
//               <View style={styles.voiceWrapper}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionBox,
//                     {
//                       backgroundColor: isRecordingQ
//                         ? "#ef4444"
//                         : colors.primary,
//                     },
//                   ]}
//                   onPress={() => handleVoiceToggle("question")}
//                 >
//                   <Animated.View
//                     style={{
//                       transform: [{ scale: isRecordingQ ? pulseAnim : 1 }],
//                     }}
//                   >
//                     <Ionicons
//                       name={isRecordingQ ? "stop-circle" : "mic"}
//                       size={22}
//                       color="#ffffff"
//                     />
//                   </Animated.View>

//                   <Text style={styles.actionBoxText}>
//                     {isRecordingQ
//                       ? "රෙකෝඩ් වෙමින් පවතී..."
//                       : "හඬ පටිගත කිරීම අරඹන්න (Record)"}
//                   </Text>

//                   {isRecordingQ && (
//                     <View style={styles.waveContainer}>
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim1 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim2 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim3 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim4 }]}
//                       />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => handlePlayVoice("question")}>
//                   <Ionicons
//                     name={isPlayingQ ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   {isPlayingQ
//                     ? "වාදනය වෙමින් පවතී..."
//                     : "ප්‍රශ්න හඬ පටිගත කර ඇත ✓"}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("question")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* --- 2. පිළිතුර (ANSWER SECTION) --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <Text style={[styles.sectionTitle, { color: colors.primary }]}>
//           පිළිතුර (Answer)
//         </Text>

//         <View style={styles.typeSelector}>
//           {(["text", "image", "voice"] as const).map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.typeButton,
//                 answerType === type && { backgroundColor: colors.primary },
//               ]}
//               onPress={() => setAnswerType(type)}
//             >
//               <Ionicons
//                 name={
//                   type === "text" ? "text" : type === "image" ? "image" : "mic"
//                 }
//                 size={16}
//                 color={answerType === type ? "#ffffff" : colors.text}
//               />
//               <Text
//                 style={[
//                   styles.typeButtonText,
//                   { color: answerType === type ? "#ffffff" : colors.text },
//                 ]}
//               >
//                 {type === "text" ? "පෙළ" : type === "image" ? "පින්තූර" : "හඬ"}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {answerType === "text" && (
//           <TextInput
//             style={[
//               styles.textArea,
//               { color: colors.text, borderColor: colors.tint },
//             ]}
//             placeholder="පිළිතුර මෙහි ටයිප් කරන්න..."
//             placeholderTextColor="#9ca3af"
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
//               <View style={styles.previewContainer}>
//                 <Image
//                   source={{ uri: answerImage }}
//                   style={styles.previewImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.deleteImageIcon}
//                   onPress={() => setAnswerImage(null)}
//                 >
//                   <Ionicons name="trash" size={18} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <>
//                 <Ionicons
//                   name="image-outline"
//                   size={30}
//                   color={colors.primary}
//                 />
//                 <Text style={{ color: colors.text, marginTop: 5 }}>
//                   පිළිතුරු පින්තූරයක් තෝරන්න
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         )}

//         {answerType === "voice" && (
//           <View>
//             {!answerVoiceRecorded ? (
//               <View style={styles.voiceWrapper}>
//                 <TouchableOpacity
//                   style={[
//                     styles.actionBox,
//                     {
//                       backgroundColor: isRecordingA
//                         ? "#ef4444"
//                         : colors.primary,
//                     },
//                   ]}
//                   onPress={() => handleVoiceToggle("answer")}
//                 >
//                   <Animated.View
//                     style={{
//                       transform: [{ scale: isRecordingA ? pulseAnim : 1 }],
//                     }}
//                   >
//                     <Ionicons
//                       name={isRecordingA ? "stop-circle" : "mic"}
//                       size={22}
//                       color="#ffffff"
//                     />
//                   </Animated.View>

//                   <Text style={styles.actionBoxText}>
//                     {isRecordingA
//                       ? "රෙකෝඩ් වෙමින් පවතී..."
//                       : "පිළිතුරු හඬ පටිගත කරන්න (Record)"}
//                   </Text>

//                   {isRecordingA && (
//                     <View style={styles.waveContainer}>
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim1 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim2 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim3 }]}
//                       />
//                       <Animated.View
//                         style={[styles.waveBar, { height: waveAnim4 }]}
//                       />
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View
//                 style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
//               >
//                 <TouchableOpacity onPress={() => handlePlayVoice("answer")}>
//                   <Ionicons
//                     name={isPlayingA ? "pause-circle" : "play-circle"}
//                     size={32}
//                     color={colors.primary}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{ color: colors.text, fontWeight: "500" }}>
//                   {isPlayingA
//                     ? "වාදනය වෙමින් පවතී..."
//                     : "පිළිතුරු හඬ පටිගත කර ඇත ✓"}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => deleteVoice("answer")}
//                   style={styles.deleteBtn}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>

//       {/* --- Reminder Toggle & Interval Choice --- */}
//       <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
//         <View style={styles.rowCard}>
//           <View style={{ flex: 1, marginRight: 10 }}>
//             <Text
//               style={[styles.label, { color: colors.text, marginBottom: 0 }]}
//             >
//               මතක් කිරීමක් (Reminder) අවශ්‍යද?
//             </Text>
//             <Text style={{ fontSize: 11, color: colors.tint, marginTop: 2 }}>
//               මෙම කාඩ් එක පුනරාවර්තනය කිරීමට නොටිෆිකේෂන් ලබා ගන්න
//             </Text>
//           </View>
//           <Switch
//             trackColor={{ false: "#767577", true: colors.primary }}
//             thumbColor={isReminderEnabled ? "#ffffff" : "#f4f3f4"}
//             onValueChange={setIsReminderEnabled}
//             value={isReminderEnabled}
//           />
//         </View>

//         {isReminderEnabled && (
//           <View style={{ marginTop: 14 }}>
//             <Text style={[styles.label, { color: colors.text }]}>
//               මතක් කළ යුතු කාල පරතරය (Reminder Interval):
//             </Text>
//             <View style={styles.intervalContainer}>
//               {["3 days", "7 days", "14 days", "1 month"].map((interval) => (
//                 <TouchableOpacity
//                   key={interval}
//                   style={[
//                     styles.intervalButton,
//                     reminderDays === interval && {
//                       backgroundColor: colors.primary,
//                       borderColor: colors.primary,
//                     },
//                   ]}
//                   onPress={() => setReminderDays(interval)}
//                 >
//                   <Text
//                     style={[
//                       styles.intervalText,
//                       {
//                         color:
//                           reminderDays === interval ? "#ffffff" : colors.text,
//                       },
//                     ]}
//                   >
//                     {interval === "3 days"
//                       ? "දින 3යි"
//                       : interval === "7 days"
//                         ? "දින 7යි"
//                         : interval === "14 days"
//                           ? "දින 14යි"
//                           : "මාස 1යි"}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         )}
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity
//         style={[styles.saveButton, { backgroundColor: colors.primary }]}
//         onPress={handleSaveCard}
//       >
//         <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
//         <Text style={styles.saveButtonText}>කාඩ් එක සුරකින්න (Save Card)</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   contentContainer: { paddingBottom: 100, paddingTop: 40 },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   rowCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   label: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
//   sectionTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
//   subjectContainer: { gap: 8 },
//   subjectButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     marginBottom: 6,
//   },
//   subjectButtonText: { fontSize: 13, fontWeight: "600", textAlign: "center" },
//   lessonScroll: { flexDirection: "row", marginTop: 4 },
//   lessonChip: {
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     marginRight: 8,
//   },
//   lessonChipText: { fontSize: 12, fontWeight: "600" },
//   intervalContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 6,
//   },
//   intervalButton: {
//     flex: 1,
//     paddingVertical: 8,
//     marginHorizontal: 3,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     alignItems: "center",
//   },
//   intervalText: { fontSize: 11, fontWeight: "600" },
//   textArea: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     height: 80,
//     textAlignVertical: "top",
//     fontSize: 13,
//   },
//   typeSelector: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   typeButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 6,
//     marginHorizontal: 2,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   typeButtonText: { fontSize: 11, fontWeight: "600", marginLeft: 4 },
//   uploadBox: {
//     height: 100,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   previewContainer: {
//     width: "100%",
//     height: 120,
//     borderRadius: 8,
//     overflow: "hidden",
//     position: "relative",
//   },
//   previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
//   deleteImageIcon: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   voiceWrapper: { width: "100%" },
//   actionBox: {
//     height: 48,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     gap: 8,
//   },
//   actionBoxText: {
//     color: "#ffffff",
//     fontSize: 13,
//     fontWeight: "bold",
//     flexShrink: 1,
//   },
//   waveContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     height: 30,
//     gap: 3,
//     marginLeft: 4,
//   },
//   waveBar: { width: 3, backgroundColor: "#ffffff", borderRadius: 2 },
//   voicePlayerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   deleteBtn: { padding: 6 },
//   saveButton: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   saveButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
// });

import { Ionicons } from "@expo/vector-icons";
import {
  AudioModule,
  createAudioPlayer,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

import { useLanguage } from "@/context/LanguageContext";
import * as FileSystem from "expo-file-system/legacy";

// Open SQLite Database
const db = SQLite.openDatabaseSync("flashcards.db");

export default function AddCardScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { t } = useLanguage();

  // Basic Info States (ID මත පදනම්ව හැසිරවීම)
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [lessonsList, setLessonsList] = useState<any[]>([]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null,
  );
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  // මෙන්න මේ විදිහට number හෝ null ගත හැකි ලෙස type කරන්න
  const [reminderDays, setReminderDays] = useState<number | null>(null);

  // --- QUESTION STATES ---
  const [questionType, setQuestionType] = useState<"text" | "image" | "voice">(
    "text",
  );
  const [questionText, setQuestionText] = useState("");
  const [questionImage, setQuestionImage] = useState<string | null>(null);

  // Question Voice States
  const audioRecorderQ = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStateQ = useAudioRecorderState(audioRecorderQ);
  const [questionVoiceRecorded, setQuestionVoiceRecorded] = useState(false);
  const [questionVoiceUri, setQuestionVoiceUri] = useState<string | null>(null);
  const [isPlayingQ, setIsPlayingQ] = useState(false);
  const [soundPlayerQ, setSoundPlayerQ] = useState<any>(null);

  // --- ANSWER STATES ---
  const [answerType, setAnswerType] = useState<"text" | "image" | "voice">(
    "text",
  );
  const [answerText, setAnswerText] = useState("");
  const [answerImage, setAnswerImage] = useState<string | null>(null);

  // Answer Voice States
  const audioRecorderA = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderStateA = useAudioRecorderState(audioRecorderA);
  const [answerVoiceRecorded, setAnswerVoiceRecorded] = useState(false);
  const [answerVoiceUri, setAnswerVoiceUri] = useState<string | null>(null);
  const [isPlayingA, setIsPlayingA] = useState(false);
  const [soundPlayerA, setSoundPlayerA] = useState<any>(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim1 = useRef(new Animated.Value(8)).current;
  const waveAnim2 = useRef(new Animated.Value(15)).current;
  const waveAnim3 = useRef(new Animated.Value(22)).current;
  const waveAnim4 = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    initApp();
    if (navigation) {
      const unsubscribe = navigation.addListener("focus", () => {
        loadSubjects();
      });
      return unsubscribe;
    }
  }, [navigation]);

  const initApp = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const perm = await AudioModule.requestRecordingPermissionsAsync();
      if (!perm.granted) {
        console.log("Microphone permission not granted!");
      }
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      // flashcards වගුව තුළ subject_id සහ lesson_id (Foreign Keys) සම්බන්ධ වන සේ සකස් කිරීම
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS flashcards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subject_id INTEGER,
          lesson_id INTEGER,
          questionType TEXT,
          questionContent TEXT,
          answerType TEXT,
          answerContent TEXT,
          reminderEnabled INTEGER,
          reminderDays TEXT,
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (lesson_id) REFERENCES lessons(id)
        );
      `);
      // await db.execAsync(`
      //   CREATE TABLE IF NOT EXISTS flashcards (
      //     id INTEGER PRIMARY KEY AUTOINCREMENT,
      //     subject_id INTEGER,
      //     lesson_id INTEGER,
      //     questionType TEXT,
      //     questionContent TEXT,
      //     answerType TEXT,
      //     answerContent TEXT,
      //     reminderEnabled INTEGER,
      //     reminderDays TEXT,
      //     FOREIGN KEY (subject_id) REFERENCES subjects(id),
      //     FOREIGN KEY (lesson_id) REFERENCES lessons(id)
      //   );
      // `);

      loadSubjects();
    } catch (err) {
      console.log("Init error:", err);
    }
  };

  const loadSubjects = async () => {
    try {
      const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
      setSubjectsList(subs || []);
    } catch (err) {
      console.log("Load subjects error:", err);
    }
  };

  const loadLessonsForSubject = async (subId: number) => {
    try {
      const less: any = await db.getAllAsync(
        "SELECT * FROM lessons WHERE subject_id = ?;",
        [subId],
      );
      setLessonsList(less || []);
    } catch (err) {
      console.log("Load lessons error:", err);
    }
  };

  const isRecordingQ = recorderStateQ.isRecording;
  const isRecordingA = recorderStateA.isRecording;

  useEffect(() => {
    let pulseLoop: Animated.CompositeAnimation | null = null;
    let waveLoop: Animated.CompositeAnimation | null = null;

    if (isRecordingQ || isRecordingA) {
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseLoop.start();

      waveLoop = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(waveAnim1, {
              toValue: 28,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(waveAnim1, {
              toValue: 6,
              duration: 200,
              useNativeDriver: false,
            }),
          ]),
          Animated.sequence([
            Animated.timing(waveAnim2, {
              toValue: 32,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(waveAnim2, {
              toValue: 10,
              duration: 250,
              useNativeDriver: false,
            }),
          ]),
          Animated.sequence([
            Animated.timing(waveAnim3, {
              toValue: 36,
              duration: 220,
              useNativeDriver: false,
            }),
            Animated.timing(waveAnim3, {
              toValue: 8,
              duration: 180,
              useNativeDriver: false,
            }),
          ]),
          Animated.sequence([
            Animated.timing(waveAnim4, {
              toValue: 25,
              duration: 180,
              useNativeDriver: false,
            }),
            Animated.timing(waveAnim4, {
              toValue: 12,
              duration: 220,
              useNativeDriver: false,
            }),
          ]),
        ]),
      );
      waveLoop.start();
    } else {
      pulseAnim.setValue(1);
      waveAnim1.setValue(8);
      waveAnim2.setValue(15);
      waveAnim3.setValue(22);
      waveAnim4.setValue(12);
    }

    return () => {
      if (pulseLoop) pulseLoop.stop();
      if (waveLoop) waveLoop.stop();
    };
  }, [isRecordingQ, isRecordingA]);

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
        if (isRecordingQ) {
          await audioRecorderQ.stop();
          setQuestionVoiceUri(audioRecorderQ.uri);
          setQuestionVoiceRecorded(true);
        } else {
          await audioRecorderQ.prepareToRecordAsync();
          audioRecorderQ.record();
        }
      } else {
        if (isRecordingA) {
          await audioRecorderA.stop();
          setAnswerVoiceUri(audioRecorderA.uri);
          setAnswerVoiceRecorded(true);
        } else {
          await audioRecorderA.prepareToRecordAsync();
          audioRecorderA.record();
        }
      }
    } catch (err) {
      console.log("Failed to toggle recording", err);
    }
  };

  // const handlePlayVoice = async (target: "question" | "answer") => {
  //   try {
  //     const uri = target === "question" ? questionVoiceUri : answerVoiceUri;
  //     if (!uri) return;

  //     if (target === "question") {
  //       if (isPlayingQ) {
  //         if (soundPlayerQ) soundPlayerQ.pause();
  //         setIsPlayingQ(false);
  //       } else {
  //         const player = createAudioPlayer({ uri });
  //         setSoundPlayerQ(player);
  //         setIsPlayingQ(true);
  //         player.play();
  //       }
  //     } else {
  //       if (isPlayingA) {
  //         if (soundPlayerA) soundPlayerA.pause();
  //         setIsPlayingA(false);
  //       } else {
  //         const player = createAudioPlayer({ uri });
  //         setSoundPlayerA(player);
  //         setIsPlayingA(true);
  //         player.play();
  //       }
  //     }
  //   } catch (err) {
  //     console.log("Failed to play sound", err);
  //   }
  // };
  const handlePlayVoice = async (target: "question" | "answer") => {
    try {
      const uri = target === "question" ? questionVoiceUri : answerVoiceUri;
      if (!uri) return;

      if (target === "question") {
        if (isPlayingQ) {
          if (soundPlayerQ) {
            try {
              soundPlayerQ.pause();
            } catch (e) {
              // දැනටමත් රිලීස් වී ඇත්නම් ඉග්නෝර් කරයි
            }
          }
          setIsPlayingQ(false);
        } else {
          // වෙනත් එකක් ප්ලේ වෙනවා නම් නවතා දැමීම
          if (soundPlayerQ) {
            try {
              soundPlayerQ.release?.();
            } catch (e) {}
          }

          const player = createAudioPlayer({ uri });
          setSoundPlayerQ(player);
          setIsPlayingQ(true);
          player.play();

          player.addListener("playbackStatusUpdate", (status: any) => {
            if (status.didJustFinish) {
              setIsPlayingQ(false);
              try {
                player.release?.();
              } catch (e) {}
            }
          });
        }
      } else {
        if (isPlayingA) {
          if (soundPlayerA) {
            try {
              soundPlayerA.pause();
            } catch (e) {}
          }
          setIsPlayingA(false);
        } else {
          if (soundPlayerA) {
            try {
              soundPlayerA.release?.();
            } catch (e) {}
          }

          const player = createAudioPlayer({ uri });
          setSoundPlayerA(player);
          setIsPlayingA(true);
          player.play();

          player.addListener("playbackStatusUpdate", (status: any) => {
            if (status.didJustFinish) {
              setIsPlayingA(false);
              try {
                player.release?.();
              } catch (e) {}
            }
          });
        }
      }
    } catch (err) {
      console.log("Failed to play sound", err);
      if (target === "question") setIsPlayingQ(false);
      if (target === "answer") setIsPlayingA(false);
    }
  };
  const deleteVoice = (target: "question" | "answer") => {
    if (target === "question") {
      setQuestionVoiceUri(null);
      setQuestionVoiceRecorded(false);
      setIsPlayingQ(false);
      if (soundPlayerQ) soundPlayerQ.release();
    } else {
      setAnswerVoiceUri(null);
      setAnswerVoiceRecorded(false);
      setIsPlayingA(false);
      if (soundPlayerA) soundPlayerA.release();
    }
  };

  // කාඩ් එක සේව් කිරීම (සම්බන්ධතා ID සමඟ)
  const handleSaveCard = async () => {
    if (!selectedSubjectId || !selectedLessonId) {
      Alert.alert(t("common", "error"), t("createCard", "chooseSubandLesson"));
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

      if ((questionType === "voice" || questionType === "image") && qContent) {
        const filename = qContent.split("/").pop();
        const permanentUri = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({ from: qContent, to: permanentUri });
        qContent = permanentUri;
      }

      if ((answerType === "voice" || answerType === "image") && aContent) {
        const filename = aContent.split("/").pop();
        const permanentUri = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({ from: aContent, to: permanentUri });
        aContent = permanentUri;
      }

      // දැන් ඩේටාබේස් එකට විෂය සහ පාඩම් නම් වෙනුවට IDs සේව් වේ
      await db.runAsync(
        `INSERT INTO flashcards (subject_id, lesson_id, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          selectedSubjectId,
          selectedLessonId,
          questionType,
          qContent,
          answerType,
          aContent,
          isReminderEnabled ? 1 : 0,
          isReminderEnabled ? reminderDays : "None",
        ],
      );

      Alert.alert(t("common", "successful"), t("createCard", "cardSaved"));

      // Reset form
      // setSelectedSubjectId(null);
      // setSelectedLessonId(null);
      // setLessonsList([]);
      setQuestionText("");
      setQuestionImage(null);
      setQuestionVoiceUri(null);
      setQuestionVoiceRecorded(false);
      setAnswerText("");
      setAnswerImage(null);
      setAnswerVoiceUri(null);
      setAnswerVoiceRecorded(false);
      setIsReminderEnabled(false);
    } catch (error) {
      console.log("Database save error:", error);
      Alert.alert(t("common", "error"), t("createCard", "failedToSave"));
    }
  };

  // const handleSaveCard = async () => {
  //   try {
  //     // 1. රීමින්ඩර් සක්‍රීය කර ඇත්නම් දිනය ගණනය කිරීම
  //     let reminderNextDate = null;
  //     const reminderEnabledVal = isReminderEnabled ? 1 : 0;
  //     const reminderDaysVal =
  //       isReminderEnabled && reminderDays !== null
  //         ? String(reminderDays)
  //         : "None";

  //     if (isReminderEnabled && reminderDays !== null) {
  //       const targetDate = new Date();
  //       if (reminderDays === -1) {
  //         // අද දිනම
  //         reminderNextDate = targetDate.toISOString().split("T")[0];
  //       } else if (typeof reminderDays === "number") {
  //         // දින 3, 7, 14, 30 ආදී ලෙස
  //         targetDate.setDate(targetDate.getDate() + reminderDays);
  //         reminderNextDate = targetDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  //       }
  //     }

  //     // 2. ඩේටාබේස් එකට අලුත් කාඩ්පත ඇතුළත් කිරීම (reminderNextDate සමඟ)
  //     await db.runAsync(
  //       `INSERT INTO flashcards (subject_id, lesson_id, questionType, questionContent, answerType, answerContent, reminderEnabled, reminderDays, reminderNextDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  //       [
  //         selectedSubjectId,
  //         selectedLessonId,
  //         questionType,
  //         questionText,
  //         answerType,
  //         answerText,
  //         reminderEnabledVal,
  //         reminderDaysVal,
  //         reminderNextDate,
  //       ],
  //     );

  //     Alert.alert("සාර්ථකයි! ✅", "කාඩ්පත සාර්ථකව එකතු කරන ලදී.", [
  //       { text: "හොඳයි", onPress: () => router.back() },
  //     ]);
  //   } catch (error) {
  //     console.log("Error saving card:", error);
  //     Alert.alert("දෝෂයක් ඇති විය", "කාඩ්පත සේව් කිරීම අසාර්ථක විය.");
  //   }
  // };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        {t("createCard", "addCardTitle")}
      </Text>

      {/* --- විෂය තේරීම (Subject Selection) --- */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.label, { color: colors.text }]}>
          {t("homepage", "selectSubject")}
        </Text>
        <View style={styles.subjectContainer}>
          {subjectsList.map((subj) => (
            <TouchableOpacity
              key={subj.id}
              style={[
                styles.subjectButton,
                selectedSubjectId === subj.id && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => {
                setSelectedSubjectId(subj.id);
                setSelectedLessonId(null); // Reset lesson
                loadLessonsForSubject(subj.id);
              }}
            >
              <Text
                style={[
                  styles.subjectButtonText,
                  {
                    color:
                      selectedSubjectId === subj.id ? "#ffffff" : colors.text,
                  },
                ]}
              >
                {subj.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- පාඩම තේරීම (Lesson Selection - Multi-line Grid) --- */}
        {selectedSubjectId !== null && (
          <>
            <Text style={[styles.label, { color: colors.text, marginTop: 14 }]}>
              {t("homepage", "selectLesson")}
            </Text>
            <View style={styles.lessonsGridContainer}>
              {lessonsList.map((les) => (
                <TouchableOpacity
                  key={les.id}
                  style={[
                    styles.lessonChipGrid,
                    selectedLessonId === les.id && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedLessonId(les.id)}
                >
                  <Text
                    style={[
                      styles.lessonChipText,
                      {
                        color:
                          selectedLessonId === les.id ? "#ffffff" : colors.text,
                      },
                    ]}
                  >
                    {les.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      {/* --- 1. ප්‍රශ්නය (QUESTION SECTION) --- */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {t("cardDetail", "questionLabel")}
        </Text>

        <View style={styles.typeSelector}>
          {(["text", "image", "voice"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                questionType === type && { backgroundColor: colors.primary },
              ]}
              onPress={() => setQuestionType(type)}
            >
              <Ionicons
                name={
                  type === "text" ? "text" : type === "image" ? "image" : "mic"
                }
                size={16}
                color={questionType === type ? "#ffffff" : colors.text}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  { color: questionType === type ? "#ffffff" : colors.text },
                ]}
              >
                {type === "text"
                  ? t("createCard", "textTypeLabel")
                  : type === "image"
                    ? t("createCard", "imageTypeLabel")
                    : t("createCard", "audioTypeLabel")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {questionType === "text" && (
          <TextInput
            style={[
              styles.textArea,
              { color: colors.text, borderColor: colors.tint },
            ]}
            placeholder={t("cardDetail", "questionPlaceholder")}
            placeholderTextColor="#9ca3af"
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
              <View style={styles.previewContainer}>
                <Image
                  source={{ uri: questionImage }}
                  style={styles.previewImage}
                />
                <TouchableOpacity
                  style={styles.deleteImageIcon}
                  onPress={() => setQuestionImage(null)}
                >
                  <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Ionicons
                  name="image-outline"
                  size={30}
                  color={colors.primary}
                />
                <Text style={{ color: colors.text, marginTop: 5 }}>
                  {t("createCard", "chooseImage")}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {questionType === "voice" && (
          <View>
            {!questionVoiceRecorded ? (
              <View style={styles.voiceWrapper}>
                <TouchableOpacity
                  style={[
                    styles.actionBox,
                    {
                      backgroundColor: isRecordingQ
                        ? "#ef4444"
                        : colors.primary,
                    },
                  ]}
                  onPress={() => handleVoiceToggle("question")}
                >
                  <Animated.View
                    style={{
                      transform: [{ scale: isRecordingQ ? pulseAnim : 1 }],
                    }}
                  >
                    <Ionicons
                      name={isRecordingQ ? "stop-circle" : "mic"}
                      size={22}
                      color="#ffffff"
                    />
                  </Animated.View>

                  <Text style={styles.actionBoxText}>
                    {isRecordingQ
                      ? t("createCard", "recordingInProgress")
                      : t("createCard", "startRecording")}
                  </Text>

                  {isRecordingQ && (
                    <View style={styles.waveContainer}>
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim1 }]}
                      />
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim2 }]}
                      />
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim3 }]}
                      />
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim4 }]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
              >
                <TouchableOpacity onPress={() => handlePlayVoice("question")}>
                  <Ionicons
                    name={isPlayingQ ? "pause-circle" : "play-circle"}
                    size={32}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontWeight: "500" }}>
                  {isPlayingQ
                    ? t("createCard", "playingAudio")
                    : t("createCard", "recordingSaved")}
                </Text>
                <TouchableOpacity
                  onPress={() => deleteVoice("question")}
                  style={styles.deleteBtn}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* --- 2. පිළිතුර (ANSWER SECTION) --- */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {t("cardDetail", "answerLabel")}
        </Text>

        <View style={styles.typeSelector}>
          {(["text", "image", "voice"] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                answerType === type && { backgroundColor: colors.primary },
              ]}
              onPress={() => setAnswerType(type)}
            >
              <Ionicons
                name={
                  type === "text" ? "text" : type === "image" ? "image" : "mic"
                }
                size={16}
                color={answerType === type ? "#ffffff" : colors.text}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  { color: answerType === type ? "#ffffff" : colors.text },
                ]}
              >
                {type === "text"
                  ? t("createCard", "textTypeLabel")
                  : type === "image"
                    ? t("createCard", "imageTypeLabel")
                    : t("createCard", "audioTypeLabel")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {answerType === "text" && (
          <TextInput
            style={[
              styles.textArea,
              { color: colors.text, borderColor: colors.tint },
            ]}
            placeholder={t("createCard", "answerPlaceholder")}
            placeholderTextColor="#9ca3af"
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
              <View style={styles.previewContainer}>
                <Image
                  source={{ uri: answerImage }}
                  style={styles.previewImage}
                />
                <TouchableOpacity
                  style={styles.deleteImageIcon}
                  onPress={() => setAnswerImage(null)}
                >
                  <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Ionicons
                  name="image-outline"
                  size={30}
                  color={colors.primary}
                />
                <Text style={{ color: colors.text, marginTop: 5 }}>
                  {t("createCard", "chooseImage")}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {answerType === "voice" && (
          <View>
            {!answerVoiceRecorded ? (
              <View style={styles.voiceWrapper}>
                <TouchableOpacity
                  style={[
                    styles.actionBox,
                    {
                      backgroundColor: isRecordingA
                        ? "#ef4444"
                        : colors.primary,
                    },
                  ]}
                  onPress={() => handleVoiceToggle("answer")}
                >
                  <Animated.View
                    style={{
                      transform: [{ scale: isRecordingA ? pulseAnim : 1 }],
                    }}
                  >
                    <Ionicons
                      name={isRecordingA ? "stop-circle" : "mic"}
                      size={22}
                      color="#ffffff"
                    />
                  </Animated.View>

                  <Text style={styles.actionBoxText}>
                    {isRecordingA
                      ? t("createCard", "recordingInProgress")
                      : t("createCard", "startRecording")}
                  </Text>

                  {isRecordingA && (
                    <View style={styles.waveContainer}>
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim1 }]}
                      />
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim2 }]}
                      />
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim3 }]}
                      />
                      <Animated.View
                        style={[styles.waveBar, { height: waveAnim4 }]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[styles.voicePlayerBox, { borderColor: colors.tint }]}
              >
                <TouchableOpacity onPress={() => handlePlayVoice("answer")}>
                  <Ionicons
                    name={isPlayingA ? "pause-circle" : "play-circle"}
                    size={32}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontWeight: "500" }}>
                  {isPlayingA
                    ? t("createCard", "playingAudio")
                    : t("createCard", "recordingSaved")}
                </Text>
                <TouchableOpacity
                  onPress={() => deleteVoice("answer")}
                  style={styles.deleteBtn}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* --- Reminder Toggle & Interval Choice --- */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.rowCard}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text
              style={[styles.label, { color: colors.text, marginBottom: 0 }]}
            >
              {t("createCard", "needReminder")}
            </Text>
            <Text style={{ fontSize: 11, color: colors.tint, marginTop: 2 }}>
              {t("createCard", "reminderDescription")}
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={isReminderEnabled ? "#ffffff" : "#f4f3f4"}
            onValueChange={setIsReminderEnabled}
            value={isReminderEnabled}
          />
        </View>

        {/* {isReminderEnabled && (
          <View style={{ marginTop: 14 }}>
            <Text style={[styles.label, { color: colors.text }]}>
              මතක් කළ යුතු කාල පරතරය (Reminder Interval):
            </Text>
            <View style={styles.intervalContainer}>
              {["3 days", "7 days", "14 days", "1 month"].map((interval) => (
                <TouchableOpacity
                  key={interval}
                  style={[
                    styles.intervalButton,
                    reminderDays === interval && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setReminderDays(interval)}
                >
                  <Text
                    style={[
                      styles.intervalText,
                      {
                        color:
                          reminderDays === interval ? "#ffffff" : colors.text,
                      },
                    ]}
                  >
                    {interval === "3 days"
                      ? "දින 3යි"
                      : interval === "7 days"
                        ? "දින 7යි"
                        : interval === "14 days"
                          ? "දින 14යි"
                          : "මාස 1යි"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )} */}
        {isReminderEnabled && (
          <View style={{ marginTop: 14 }}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("createCard", "reminderIntervalLabel")}
            </Text>
            <View style={styles.intervalContainer}>
              {[
                { label: t("cardDetail", "reminderToday"), value: -1 },
                { label: t("cardDetail", "reminder3Days"), value: 3 },
                { label: t("cardDetail", "reminder7Days"), value: 7 },
                { label: t("cardDetail", "reminder14Days"), value: 14 },
                { label: t("cardDetail", "reminder30Days"), value: 30 },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.intervalButton,
                    reminderDays === item.value && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setReminderDays(item.value)}
                >
                  <Text
                    style={[
                      styles.intervalText,
                      {
                        color:
                          reminderDays === item.value ? "#ffffff" : colors.text,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSaveCard}
      >
        <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
        <Text style={styles.saveButtonText}>
          {t("createCard", "saveButtonText")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  contentContainer: { paddingBottom: 100, paddingTop: 40 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
  sectionTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
  subjectContainer: { gap: 8 },
  subjectButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 6,
  },
  subjectButtonText: { fontSize: 13, fontWeight: "600", textAlign: "center" },
  lessonsGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  lessonChipGrid: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 4,
  },
  lessonChipText: { fontSize: 12, fontWeight: "600" },
  intervalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  intervalButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  intervalText: { fontSize: 11, fontWeight: "600" },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    height: 80,
    textAlignVertical: "top",
    fontSize: 13,
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  typeButtonText: { fontSize: 11, fontWeight: "600", marginLeft: 4 },
  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  deleteImageIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 20,
  },
  voiceWrapper: { width: "100%" },
  actionBox: {
    height: 48,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  actionBoxText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    flexShrink: 1,
  },
  waveContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 30,
    gap: 3,
    marginLeft: 4,
  },
  waveBar: {
    width: 3,
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  voicePlayerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  deleteBtn: { padding: 4 },
  saveButton: {
    flexDirection: "row",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  saveButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
});
