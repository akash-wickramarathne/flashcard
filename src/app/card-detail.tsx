// // // import { Ionicons } from "@expo/vector-icons";
// // // import { createAudioPlayer } from "expo-audio";
// // // import { useLocalSearchParams, useRouter } from "expo-router";
// // // import * as SQLite from "expo-sqlite";
// // // import { useEffect, useState } from "react";
// // // import {
// // //     Image,
// // //     ScrollView,
// // //     StyleSheet,
// // //     Text,
// // //     TouchableOpacity,
// // //     View,
// // // } from "react-native";
// // // import { useTheme } from "../context/ThemeContext";

// // // const db = SQLite.openDatabaseSync("flashcards.db");

// // // export default function CardDetailScreen() {
// // //   //   const { colors } = useTheme();
// // //   //   const router = useRouter();
// // //   //   const params = useLocalSearchParams();
// // //   //   // මෙතැනදී cardId එක අනිවාර්යයෙන්ම string එකක් හෝ හිස් නම් undefined බවට පත් කරමු
// // //   //   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

// // //   //   const [card, setCard] = useState<any>(null);
// // //   //   const [showAnswer, setShowAnswer] = useState(false);
// // //   //   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
// // //   //   const [isPlaying, setIsPlaying] = useState(false);
// // //   //   const [player, setPlayer] = useState<any>(null);

// // //   //   useEffect(() => {
// // //   //     fetchCardDetails();
// // //   //   }, [cardId]);

// // //   //   const fetchCardDetails = async () => {
// // //   //     if (!cardId) return;
// // //   //     try {
// // //   //       // මෙතැනදි 'as string' දීමෙන් TypeScript එරර් එක සම්පූර්ණයෙන්ම යයි
// // //   //       const result = await db.getAllAsync(
// // //   //         "SELECT * FROM flashcards WHERE id = ?;",
// // //   //         [cardId as string],
// // //   //       );
// // //   //       if (result.length > 0) {
// // //   //         setCard(result[0]);
// // //   //       }
// // //   //     } catch (error) {
// // //   //       console.log("Error fetching card detail:", error);
// // //   //     }
// // //   //   };
// // //   const { colors } = useTheme();
// // //   const router = useRouter();
// // //   const params = useLocalSearchParams();

// // //   // params.id එක array එකක් හෝ string එකක් විය හැකි බැවින් එය ආරක්ෂිතව ලබා ගැනීම
// // //   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

// // //   const [card, setCard] = useState<any>(null);
// // //   const [showAnswer, setShowAnswer] = useState(false);
// // //   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const [player, setPlayer] = useState<any>(null);

// // //   useEffect(() => {
// // //     if (cardId) {
// // //       fetchCardDetails();
// // //     }
// // //   }, [cardId]);

// // //   const fetchCardDetails = async () => {
// // //     try {
// // //       // id එක හරියටම string එකක් ලෙස පාස් කිරීම
// // //       const result: any = await db.getAllAsync(
// // //         "SELECT * FROM flashcards WHERE id = ?;",
// // //         [cardId as string],
// // //       );
// // //       if (result && result.length > 0) {
// // //         setCard(result[0]);
// // //       } else {
// // //         console.log("Card not found for id:", cardId);
// // //       }
// // //     } catch (error) {
// // //       console.log("Error fetching card detail:", error);
// // //     }
// // //   };

// // //   // Play audio with speed control
// // //   const handlePlayVoice = async (uri: string) => {
// // //     try {
// // //       if (isPlaying && player) {
// // //         player.pause();
// // //         setIsPlaying(false);
// // //         return;
// // //       }

// // //       const soundPlayer = createAudioPlayer({ uri });
// // //       soundPlayer.setPlaybackRate(playbackSpeed);
// // //       setPlayer(soundPlayer);
// // //       setIsPlaying(true);
// // //       soundPlayer.play();
// // //     } catch (err) {
// // //       console.log("Audio play error:", err);
// // //     }
// // //   };

// // //   const changeSpeed = () => {
// // //     const speeds = [1.0, 1.5, 2.0];
// // //     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
// // //     const newSpeed = speeds[nextIndex];
// // //     setPlaybackSpeed(newSpeed);
// // //     if (player) {
// // //       player.setPlaybackRate(newSpeed);
// // //     }
// // //   };

// // //   // Render question/answer based on type
// // //   const renderDetailContent = (
// // //     type: string,
// // //     content: string,
// // //     label: string,
// // //   ) => {
// // //     return (
// // //       <View
// // //         style={[
// // //           styles.contentBox,
// // //           {
// // //             backgroundColor: colors.cardBackground,
// // //             borderColor: colors.tint + "30",
// // //           },
// // //         ]}
// // //       >
// // //         <Text style={[styles.contentLabel, { color: colors.primary }]}>
// // //           {label}
// // //         </Text>
// // //         {type === "text" && (
// // //           <Text style={[styles.mainText, { color: colors.text }]}>
// // //             {content}
// // //           </Text>
// // //         )}
// // //         {type === "image" && (
// // //           <View style={styles.imageWrapper}>
// // //             <Image source={{ uri: content }} style={styles.imgStyle} />
// // //           </View>
// // //         )}
// // //         {type === "voice" && (
// // //           <View style={styles.voiceRow}>
// // //             <TouchableOpacity
// // //               style={[styles.playBtn, { backgroundColor: colors.primary }]}
// // //               onPress={() => handlePlayVoice(content)}
// // //             >
// // //               <Ionicons
// // //                 name={isPlaying ? "pause" : "play"}
// // //                 size={22}
// // //                 color="#fff"
// // //               />
// // //             </TouchableOpacity>
// // //             <TouchableOpacity
// // //               style={[styles.speedBtn, { borderColor: colors.primary }]}
// // //               onPress={changeSpeed}
// // //             >
// // //               <Text
// // //                 style={{
// // //                   color: colors.primary,
// // //                   fontWeight: "bold",
// // //                   fontSize: 12,
// // //                 }}
// // //               >
// // //                 {playbackSpeed}x
// // //               </Text>
// // //             </TouchableOpacity>
// // //             <Text style={{ color: colors.text, fontSize: 13 }}>
// // //               පටිගත කළ හඬක් ඇත
// // //             </Text>
// // //           </View>
// // //         )}
// // //       </View>
// // //     );
// // //   };

// // //   if (!card) {
// // //     return (
// // //       <View
// // //         style={[
// // //           styles.container,
// // //           {
// // //             backgroundColor: colors.background,
// // //             justifyContent: "center",
// // //             alignItems: "center",
// // //           },
// // //         ]}
// // //       >
// // //         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <View style={[styles.container, { backgroundColor: colors.background }]}>
// // //       {/* Top Navigation Bar */}
// // //       <View style={styles.topBar}>
// // //         <TouchableOpacity
// // //           onPress={() => router.back()}
// // //           style={styles.iconButton}
// // //         >
// // //           <Ionicons name="arrow-back" size={24} color={colors.text} />
// // //         </TouchableOpacity>
// // //         <Text style={[styles.topTitle, { color: colors.text }]}>
// // //           {card.subject} - {card.lesson}
// // //         </Text>
// // //         <TouchableOpacity
// // //           onPress={() => router.push(`/edit-card?id=${card.id}`)}
// // //           style={styles.iconButton}
// // //         >
// // //           <Ionicons name="create-outline" size={22} color={colors.primary} />
// // //         </TouchableOpacity>
// // //       </View>

// // //       <ScrollView contentContainerStyle={styles.scrollContent}>
// // //         {/* Question */}
// // //         {renderDetailContent(
// // //           card.questionType,
// // //           card.questionContent,
// // //           "ප්‍රශ්නය (Question)",
// // //         )}

// // //         {/* Answer Toggle Section */}
// // //         {!showAnswer ? (
// // //           <TouchableOpacity
// // //             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
// // //             onPress={() => setShowAnswer(true)}
// // //           >
// // //             <Ionicons name="eye-outline" size={18} color="#fff" />
// // //             <Text style={styles.showAnswerText}>
// // //               පිළිතුර පෙන්වන්න (Show Answer)
// // //             </Text>
// // //           </TouchableOpacity>
// // //         ) : (
// // //           <View>
// // //             {renderDetailContent(
// // //               card.answerType,
// // //               card.answerContent,
// // //               "පිළිතුර (Answer)",
// // //             )}

// // //             <TouchableOpacity
// // //               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
// // //               onPress={() => setShowAnswer(false)}
// // //             >
// // //               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
// // //                 පිළිතුර සඟවන්න (Hide Answer)
// // //               </Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         )}
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, paddingTop: 40 },
// // //   topBar: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     paddingHorizontal: 16,
// // //     paddingBottom: 12,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "#e5e7eb",
// // //   },
// // //   topTitle: { fontSize: 16, fontWeight: "bold" },
// // //   iconButton: { padding: 6 },
// // //   scrollContent: { padding: 16, paddingBottom: 40 },
// // //   contentBox: {
// // //     padding: 16,
// // //     borderRadius: 12,
// // //     borderWidth: 1,
// // //     marginBottom: 16,
// // //     elevation: 2,
// // //   },
// // //   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
// // //   mainText: { fontSize: 16, lineHeight: 22 },
// // //   imageWrapper: {
// // //     height: 180,
// // //     borderRadius: 8,
// // //     overflow: "hidden",
// // //     backgroundColor: "#eee",
// // //   },
// // //   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
// // //   voiceRow: { flexDirection: "row", alignItems: "center", gap: 12 },
// // //   playBtn: {
// // //     width: 42,
// // //     height: 42,
// // //     borderRadius: 21,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   speedBtn: {
// // //     paddingHorizontal: 10,
// // //     paddingVertical: 6,
// // //     borderRadius: 6,
// // //     borderWidth: 1,
// // //   },
// // //   showAnswerBtn: {
// // //     flexDirection: "row",
// // //     height: 48,
// // //     borderRadius: 10,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     gap: 8,
// // //     marginTop: 10,
// // //   },
// // //   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
// // //   hideAnswerBtn: {
// // //     height: 42,
// // //     borderRadius: 10,
// // //     borderWidth: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginTop: 10,
// // //   },
// // // });

// // import { Ionicons } from "@expo/vector-icons";
// // import { createAudioPlayer } from "expo-audio";
// // import { useLocalSearchParams, useRouter } from "expo-router";
// // import * as SQLite from "expo-sqlite";
// // import { useEffect, useState } from "react";
// // import {
// //     Image,
// //     ScrollView,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View,
// // } from "react-native";
// // import { useTheme } from "../context/ThemeContext";

// // const db = SQLite.openDatabaseSync("flashcards.db");

// // export default function CardDetailScreen() {
// //   const { colors } = useTheme();
// //   const router = useRouter();
// //   const params = useLocalSearchParams();

// //   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;
// //   console.log("👉 Received cardId in DetailScreen:", cardId);

// //   const [card, setCard] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [showAnswer, setShowAnswer] = useState(false);
// //   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [player, setPlayer] = useState<any>(null);

// //   useEffect(() => {
// //     if (cardId) {
// //       fetchCardDetails();
// //     } else {
// //       console.log("❌ Card ID is undefined or null!");
// //       setLoading(false);
// //     }
// //   }, [cardId]);

// //   const fetchCardDetails = async () => {
// //     try {
// //       const result: any = await db.getAllAsync(
// //         "SELECT * FROM flashcards WHERE id = ?;",
// //         [cardId as string],
// //       );
// //       console.log("📦 Database query result:", result);

// //       if (result && result.length > 0) {
// //         setCard(result[0]);
// //       } else {
// //         console.log("⚠️ No card found for id:", cardId);
// //       }
// //     } catch (error) {
// //       console.log("❌ Error fetching card detail:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePlayVoice = async (uri: string) => {
// //     try {
// //       if (isPlaying && player) {
// //         player.pause();
// //         setIsPlaying(false);
// //         return;
// //       }

// //       const soundPlayer = createAudioPlayer({ uri });
// //       soundPlayer.setPlaybackRate(playbackSpeed);
// //       setPlayer(soundPlayer);
// //       setIsPlaying(true);
// //       soundPlayer.play();
// //     } catch (err) {
// //       console.log("Audio play error:", err);
// //     }
// //   };

// //   const changeSpeed = () => {
// //     const speeds = [1.0, 1.5, 2.0];
// //     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
// //     const newSpeed = speeds[nextIndex];
// //     setPlaybackSpeed(newSpeed);
// //     if (player) {
// //       player.setPlaybackRate(newSpeed);
// //     }
// //   };

// //   const renderDetailContent = (
// //     type: string,
// //     content: string,
// //     label: string,
// //   ) => {
// //     return (
// //       <View
// //         style={[
// //           styles.contentBox,
// //           {
// //             backgroundColor: colors.cardBackground,
// //             borderColor: colors.tint + "30",
// //           },
// //         ]}
// //       >
// //         <Text style={[styles.contentLabel, { color: colors.primary }]}>
// //           {label}
// //         </Text>
// //         {type === "text" && (
// //           <Text style={[styles.mainText, { color: colors.text }]}>
// //             {content}
// //           </Text>
// //         )}
// //         {type === "image" && (
// //           <View style={styles.imageWrapper}>
// //             {content ? (
// //               <Image source={{ uri: content }} style={styles.imgStyle} />
// //             ) : (
// //               <Text style={{ color: colors.text }}>පින්තූරයක් නැත</Text>
// //             )}
// //           </View>
// //         )}
// //         {type === "voice" && (
// //           <View style={styles.voiceRow}>
// //             <TouchableOpacity
// //               style={[styles.playBtn, { backgroundColor: colors.primary }]}
// //               onPress={() => handlePlayVoice(content)}
// //             >
// //               <Ionicons
// //                 name={isPlaying ? "pause" : "play"}
// //                 size={22}
// //                 color="#fff"
// //               />
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={[styles.speedBtn, { borderColor: colors.primary }]}
// //               onPress={changeSpeed}
// //             >
// //               <Text
// //                 style={{
// //                   color: colors.primary,
// //                   fontWeight: "bold",
// //                   fontSize: 12,
// //                 }}
// //               >
// //                 {playbackSpeed}x
// //               </Text>
// //             </TouchableOpacity>
// //             <Text style={{ color: colors.text, fontSize: 13 }}>
// //               පටිගත කළ හඬක් ඇත
// //             </Text>
// //           </View>
// //         )}
// //       </View>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <View
// //         style={[
// //           styles.container,
// //           {
// //             backgroundColor: colors.background,
// //             justifyContent: "center",
// //             alignItems: "center",
// //           },
// //         ]}
// //       >
// //         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
// //       </View>
// //     );
// //   }

// //   if (!card) {
// //     return (
// //       <View
// //         style={[
// //           styles.container,
// //           {
// //             backgroundColor: colors.background,
// //             justifyContent: "center",
// //             alignItems: "center",
// //             padding: 20,
// //           },
// //         ]}
// //       >
// //         <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
// //           කාඩ් එක සොයා ගැනීමට නොහැකි විය.
// //         </Text>
// //         <TouchableOpacity
// //           style={{
// //             padding: 10,
// //             backgroundColor: colors.primary,
// //             borderRadius: 8,
// //           }}
// //           onPress={() => router.back()}
// //         >
// //           <Text style={{ color: "#fff", fontWeight: "bold" }}>ආපසු යන්න</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={[styles.container, { backgroundColor: colors.background }]}>
// //       {/* Top Navigation Bar */}
// //       <View style={styles.topBar}>
// //         <TouchableOpacity
// //           onPress={() => router.back()}
// //           style={styles.iconButton}
// //         >
// //           <Ionicons name="arrow-back" size={24} color={colors.text} />
// //         </TouchableOpacity>
// //         <Text style={[styles.topTitle, { color: colors.text }]}>
// //           {card.subject} - {card.lesson}
// //         </Text>
// //         <TouchableOpacity
// //           onPress={() =>
// //             router.push({ pathname: "/edit-card", params: { id: card.id } })
// //           }
// //           style={styles.iconButton}
// //         >
// //           <Ionicons name="create-outline" size={22} color={colors.primary} />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView contentContainerStyle={styles.scrollContent}>
// //         {renderDetailContent(
// //           card.questionType,
// //           card.questionContent,
// //           "ප්‍රශ්නය (Question)",
// //         )}

// //         {!showAnswer ? (
// //           <TouchableOpacity
// //             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
// //             onPress={() => setShowAnswer(true)}
// //           >
// //             <Ionicons name="eye-outline" size={18} color="#fff" />
// //             <Text style={styles.showAnswerText}>
// //               පිළිතුර පෙන්වන්න (Show Answer)
// //             </Text>
// //           </TouchableOpacity>
// //         ) : (
// //           <View>
// //             {renderDetailContent(
// //               card.answerType,
// //               card.answerContent,
// //               "පිළිතුර (Answer)",
// //             )}

// //             <TouchableOpacity
// //               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
// //               onPress={() => setShowAnswer(false)}
// //             >
// //               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
// //                 පිළිතුර සඟවන්න (Hide Answer)
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, paddingTop: 40 },
// //   topBar: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //     paddingBottom: 12,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#e5e7eb",
// //   },
// //   topTitle: { fontSize: 16, fontWeight: "bold" },
// //   iconButton: { padding: 6 },
// //   scrollContent: { padding: 16, paddingBottom: 40 },
// //   contentBox: {
// //     padding: 16,
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     marginBottom: 16,
// //     elevation: 2,
// //   },
// //   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
// //   mainText: { fontSize: 16, lineHeight: 22 },
// //   imageWrapper: {
// //     height: 180,
// //     borderRadius: 8,
// //     overflow: "hidden",
// //     backgroundColor: "#eee",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
// //   voiceRow: { flexDirection: "row", alignItems: "center", gap: 12 },
// //   playBtn: {
// //     width: 42,
// //     height: 42,
// //     borderRadius: 21,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   speedBtn: {
// //     paddingHorizontal: 10,
// //     paddingVertical: 6,
// //     borderRadius: 6,
// //     borderWidth: 1,
// //   },
// //   showAnswerBtn: {
// //     flexDirection: "row",
// //     height: 48,
// //     borderRadius: 10,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: 8,
// //     marginTop: 10,
// //   },
// //   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
// //   hideAnswerBtn: {
// //     height: 42,
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginTop: 10,
// //   },
// // });

// import { Ionicons } from "@expo/vector-icons";
// import { createAudioPlayer } from "expo-audio";
// import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function CardDetailScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const navigation = useNavigation();
//   const params = useLocalSearchParams();

//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [card, setCard] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [player, setPlayer] = useState<any>(null);

//   const fetchCardDetails = async () => {
//     try {
//       const result: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE id = ?;",
//         [Number(cardId)],
//       );
//       if (result && result.length > 0) {
//         setCard(result[0]);
//       }
//     } catch (error) {
//       console.log("Error fetching card detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- මෙන්න මෙතැනට Focus Listener එක එකතු කර ඇත ---
//   useEffect(() => {
//     if (cardId) {
//       fetchCardDetails();
//     }

//     if (navigation) {
//       const unsubscribe = navigation.addListener("focus", () => {
//         if (cardId) {
//           fetchCardDetails();
//         }
//       });
//       return unsubscribe;
//     }
//   }, [cardId, navigation]);

//   const handlePlayVoice = async (uri: string) => {
//     try {
//       if (isPlaying && player) {
//         player.pause();
//         setIsPlaying(false);
//         return;
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       soundPlayer.setPlaybackRate(playbackSpeed);
//       setPlayer(soundPlayer);
//       setIsPlaying(true);
//       soundPlayer.play();
//     } catch (err) {
//       console.log("Audio play error:", err);
//     }
//   };

//   const changeSpeed = () => {
//     const speeds = [1.0, 1.5, 2.0];
//     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
//     const newSpeed = speeds[nextIndex];
//     setPlaybackSpeed(newSpeed);
//     if (player) {
//       player.setPlaybackRate(newSpeed);
//     }
//   };

//   const renderDetailContent = (
//     type: string,
//     content: string,
//     label: string,
//   ) => {
//     return (
//       <View
//         style={[
//           styles.contentBox,
//           {
//             backgroundColor: colors.cardBackground,
//             borderColor: colors.tint + "30",
//           },
//         ]}
//       >
//         <Text style={[styles.contentLabel, { color: colors.primary }]}>
//           {label}
//         </Text>
//         {type === "text" && (
//           <Text style={[styles.mainText, { color: colors.text }]}>
//             {content}
//           </Text>
//         )}
//         {type === "image" && (
//           <View style={styles.imageWrapper}>
//             <Image source={{ uri: content }} style={styles.imgStyle} />
//           </View>
//         )}
//         {type === "voice" && (
//           <View style={styles.voiceRow}>
//             <TouchableOpacity
//               style={[styles.playBtn, { backgroundColor: colors.primary }]}
//               onPress={() => handlePlayVoice(content)}
//             >
//               <Ionicons
//                 name={isPlaying ? "pause" : "play"}
//                 size={22}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.speedBtn, { borderColor: colors.primary }]}
//               onPress={changeSpeed}
//             >
//               <Text
//                 style={{
//                   color: colors.primary,
//                   fontWeight: "bold",
//                   fontSize: 12,
//                 }}
//               >
//                 {playbackSpeed}x
//               </Text>
//             </TouchableOpacity>
//             <Text style={{ color: colors.text, fontSize: 13 }}>
//               පටිගත කළ හඬක් ඇත
//             </Text>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
//       </View>
//     );
//   }

//   if (!card) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 20,
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
//           කාඩ් එක සොයා ගැනීමට නොහැකි විය.
//         </Text>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             backgroundColor: colors.primary,
//             borderRadius: 8,
//           }}
//           onPress={() => router.back()}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>ආපසු යන්න</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Top Navigation Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.iconButton}
//         >
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.topTitle, { color: colors.text }]}>
//           {card.subject} - {card.lesson}
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             router.push({ pathname: "/edit-card", params: { id: card.id } })
//           }
//           style={styles.iconButton}
//         >
//           <Ionicons name="create-outline" size={22} color={colors.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {renderDetailContent(
//           card.questionType,
//           card.questionContent,
//           "ප්‍රශ්නය (Question)",
//         )}

//         {!showAnswer ? (
//           <TouchableOpacity
//             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
//             onPress={() => setShowAnswer(true)}
//           >
//             <Ionicons name="eye-outline" size={18} color="#fff" />
//             <Text style={styles.showAnswerText}>
//               පිළිතුර පෙන්වන්න (Show Answer)
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <View>
//             {renderDetailContent(
//               card.answerType,
//               card.answerContent,
//               "පිළිතුර (Answer)",
//             )}

//             <TouchableOpacity
//               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
//               onPress={() => setShowAnswer(false)}
//             >
//               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
//                 පිළිතුර සඟවන්න (Hide Answer)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   topTitle: { fontSize: 16, fontWeight: "bold" },
//   iconButton: { padding: 6 },
//   scrollContent: { padding: 16, paddingBottom: 40 },
//   contentBox: {
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
//   mainText: { fontSize: 16, lineHeight: 22 },
//   imageWrapper: {
//     height: 180,
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#eee",
//   },
//   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
//   voiceRow: { flexDirection: "row", alignItems: "center", gap: 12 },
//   playBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   speedBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//   },
//   showAnswerBtn: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//   },
//   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
//   hideAnswerBtn: {
//     height: 42,
//     borderRadius: 10,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
// });

// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { createAudioPlayer } from "expo-audio";
// import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function CardDetailScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const navigation = useNavigation();
//   const params = useLocalSearchParams();

//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [card, setCard] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

//   // Audio playback states with target tracking (question vs answer)
//   const [activePlayer, setActivePlayer] = useState<any>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playingTarget, setPlayingTarget] = useState<
//     "question" | "answer" | null
//   >(null);

//   useEffect(() => {
//     if (cardId) fetchCardDetails();
//     if (navigation) {
//       const unsubscribe = navigation.addListener("focus", () => {
//         if (cardId) fetchCardDetails();
//       });
//       return unsubscribe;
//     }
//   }, [cardId, navigation]);

//   useEffect(() => {
//     if (!activePlayer) return;
//     const subscription = activePlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setPosition(status.currentTime || 0);
//           setDuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsPlaying(false);
//             setPosition(0);
//             setPlayingTarget(null);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [activePlayer]);

//   const fetchCardDetails = async () => {
//     try {
//       const result: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE id = ?;",
//         [Number(cardId)],
//       );
//       if (result && result.length > 0) {
//         setCard(result[0]);
//       }
//     } catch (error) {
//       console.log("Error fetching card detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlayVoice = async (
//     uri: string,
//     target: "question" | "answer",
//   ) => {
//     try {
//       // යම් හෙයකින් දැනටත් මේ ටාගට් එකම ප්ලේ වෙමින් පවතී නම් එය පෝස් කරන්න
//       if (activePlayer && isPlaying && playingTarget === target) {
//         activePlayer.pause();
//         setIsPlaying(false);
//         return;
//       }

//       // වෙනත් ප්ලේයර් එකක් ක්‍රියාත්මක නම් එය නවත්වන්න
//       if (activePlayer) {
//         activePlayer.pause();
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       soundPlayer.setPlaybackRate(playbackSpeed);
//       setActivePlayer(soundPlayer);
//       setPlayingTarget(target);
//       soundPlayer.play();
//       setIsPlaying(true);
//     } catch (err) {
//       console.log("Audio play error:", err);
//     }
//   };

//   const handleSeek = async (value: number) => {
//     if (activePlayer) {
//       await activePlayer.seekTo(value);
//       setPosition(value);
//     }
//   };

//   const changeSpeed = () => {
//     const speeds = [1.0, 1.5, 2.0];
//     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
//     const newSpeed = speeds[nextIndex];
//     setPlaybackSpeed(newSpeed);
//     if (activePlayer) {
//       activePlayer.setPlaybackRate(newSpeed);
//     }
//   };

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const renderDetailContent = (
//     type: string,
//     content: string,
//     label: string,
//     target: "question" | "answer",
//   ) => {
//     const isThisPlaying = isPlaying && playingTarget === target;

//     return (
//       <View
//         style={[
//           styles.contentBox,
//           {
//             backgroundColor: colors.cardBackground,
//             borderColor: colors.tint + "30",
//           },
//         ]}
//       >
//         <Text style={[styles.contentLabel, { color: colors.primary }]}>
//           {label}
//         </Text>
//         {type === "text" && (
//           <Text style={[styles.mainText, { color: colors.text }]}>
//             {content}
//           </Text>
//         )}
//         {type === "image" && (
//           <View style={styles.imageWrapper}>
//             <Image source={{ uri: content }} style={styles.imgStyle} />
//           </View>
//         )}
//         {type === "voice" && (
//           <View style={styles.voiceContainer}>
//             <View style={styles.voiceRow}>
//               <TouchableOpacity
//                 style={[styles.playBtn, { backgroundColor: colors.primary }]}
//                 onPress={() => handlePlayVoice(content, target)}
//               >
//                 <Ionicons
//                   name={isThisPlaying ? "pause" : "play"}
//                   size={22}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.speedBtn, { borderColor: colors.primary }]}
//                 onPress={changeSpeed}
//               >
//                 <Text
//                   style={{
//                     color: colors.primary,
//                     fontWeight: "bold",
//                     fontSize: 12,
//                   }}
//                 >
//                   {playbackSpeed}x
//                 </Text>
//               </TouchableOpacity>
//               <Text style={{ color: colors.text, fontSize: 13 }}>
//                 පටිගත කළ හඬක් ඇත
//               </Text>
//             </View>

//             {/* Timeline Slider - Active only for the corresponding target */}
//             <View style={styles.sliderContainer}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={playingTarget === target ? duration : 100}
//                 value={playingTarget === target ? position : 0}
//                 onSlidingComplete={handleSeek}
//                 minimumTrackTintColor={colors.primary}
//                 maximumTrackTintColor="#ccc"
//                 thumbTintColor={colors.primary}
//               />
//               <View style={styles.timeRow}>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(position) : "00:00"}
//                 </Text>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(duration) : "00:00"}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
//       </View>
//     );
//   }

//   if (!card) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 20,
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
//           කාඩ් එක සොයා ගැනීමට නොහැකි විය.
//         </Text>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             backgroundColor: colors.primary,
//             borderRadius: 8,
//           }}
//           onPress={() => router.back()}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>ආපසු යන්න</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <View style={styles.topBar}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.iconButton}
//         >
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.topTitle, { color: colors.text }]}>
//           {card.subject} - {card.lesson}
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             router.push({ pathname: "/edit-card", params: { id: card.id } })
//           }
//           style={styles.iconButton}
//         >
//           <Ionicons name="create-outline" size={22} color={colors.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Question Section with Target 'question' */}
//         {renderDetailContent(
//           card.questionType,
//           card.questionContent,
//           "ප්‍රශ්නය (Question)",
//           "question",
//         )}

//         {!showAnswer ? (
//           <TouchableOpacity
//             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
//             onPress={() => setShowAnswer(true)}
//           >
//             <Ionicons name="eye-outline" size={18} color="#fff" />
//             <Text style={styles.showAnswerText}>
//               පිළිතුර පෙන්වන්න (Show Answer)
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <View>
//             {/* Answer Section with Target 'answer' */}
//             {renderDetailContent(
//               card.answerType,
//               card.answerContent,
//               "පිළිතුර (Answer)",
//               "answer",
//             )}

//             <TouchableOpacity
//               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
//               onPress={() => setShowAnswer(false)}
//             >
//               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
//                 පිළිතුර සඟවන්න (Hide Answer)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   topTitle: { fontSize: 16, fontWeight: "bold" },
//   iconButton: { padding: 6 },
//   scrollContent: { padding: 16, paddingBottom: 40 },
//   contentBox: {
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
//   mainText: { fontSize: 16, lineHeight: 22 },
//   imageWrapper: {
//     height: 180,
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#eee",
//   },
//   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
//   voiceContainer: { marginTop: 4 },
//   voiceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },
//   playBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   speedBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//   },
//   sliderContainer: { width: "100%", marginTop: 4 },
//   slider: { width: "100%", height: 30 },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 4,
//   },
//   showAnswerBtn: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//   },
//   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
//   hideAnswerBtn: {
//     height: 42,
//     borderRadius: 10,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
// });

// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { createAudioPlayer } from "expo-audio";
// import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Dimensions,
//     Image,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");
// const { width, height } = Dimensions.get("window");

// export default function CardDetailScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const navigation = useNavigation();
//   const params = useLocalSearchParams();

//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [card, setCard] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

//   // Audio playback states with target tracking (question vs answer)
//   const [activePlayer, setActivePlayer] = useState<any>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playingTarget, setPlayingTarget] = useState<
//     "question" | "answer" | null
//   >(null);

//   // Fullscreen Image States
//   const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (cardId) fetchCardDetails();
//     if (navigation) {
//       const unsubscribe = navigation.addListener("focus", () => {
//         if (cardId) fetchCardDetails();
//       });
//       return unsubscribe;
//     }
//   }, [cardId, navigation]);

//   useEffect(() => {
//     if (!activePlayer) return;
//     const subscription = activePlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setPosition(status.currentTime || 0);
//           setDuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsPlaying(false);
//             setPosition(0);
//             setPlayingTarget(null);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [activePlayer]);

//   const fetchCardDetails = async () => {
//     try {
//       const result: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE id = ?;",
//         [Number(cardId)],
//       );
//       if (result && result.length > 0) {
//         setCard(result[0]);
//       }
//     } catch (error) {
//       console.log("Error fetching card detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlayVoice = async (
//     uri: string,
//     target: "question" | "answer",
//   ) => {
//     try {
//       if (activePlayer && isPlaying && playingTarget === target) {
//         activePlayer.pause();
//         setIsPlaying(false);
//         return;
//       }

//       if (activePlayer) {
//         activePlayer.pause();
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       soundPlayer.setPlaybackRate(playbackSpeed);
//       setActivePlayer(soundPlayer);
//       setPlayingTarget(target);
//       soundPlayer.play();
//       setIsPlaying(true);
//     } catch (err) {
//       console.log("Audio play error:", err);
//     }
//   };

//   const handleSeek = async (value: number) => {
//     if (activePlayer) {
//       await activePlayer.seekTo(value);
//       setPosition(value);
//     }
//   };

//   const changeSpeed = () => {
//     const speeds = [1.0, 1.5, 2.0];
//     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
//     const newSpeed = speeds[nextIndex];
//     setPlaybackSpeed(newSpeed);
//     if (activePlayer) {
//       activePlayer.setPlaybackRate(newSpeed);
//     }
//   };

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const renderDetailContent = (
//     type: string,
//     content: string,
//     label: string,
//     target: "question" | "answer",
//   ) => {
//     const isThisPlaying = isPlaying && playingTarget === target;

//     return (
//       <View
//         style={[
//           styles.contentBox,
//           {
//             backgroundColor: colors.cardBackground,
//             borderColor: colors.tint + "30",
//           },
//         ]}
//       >
//         <Text style={[styles.contentLabel, { color: colors.primary }]}>
//           {label}
//         </Text>
//         {type === "text" && (
//           <Text style={[styles.mainText, { color: colors.text }]}>
//             {content}
//           </Text>
//         )}
//         {type === "image" && (
//           <TouchableOpacity
//             style={styles.imageWrapper}
//             activeOpacity={0.9}
//             onPress={() => setFullscreenImage(content)}
//           >
//             <Image source={{ uri: content }} style={styles.imgStyle} />
//             <View style={styles.zoomHint}>
//               <Ionicons name="expand" size={16} color="#fff" />
//             </View>
//           </TouchableOpacity>
//         )}
//         {type === "voice" && (
//           <View style={styles.voiceContainer}>
//             <View style={styles.voiceRow}>
//               <TouchableOpacity
//                 style={[styles.playBtn, { backgroundColor: colors.primary }]}
//                 onPress={() => handlePlayVoice(content, target)}
//               >
//                 <Ionicons
//                   name={isThisPlaying ? "pause" : "play"}
//                   size={22}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.speedBtn, { borderColor: colors.primary }]}
//                 onPress={changeSpeed}
//               >
//                 <Text
//                   style={{
//                     color: colors.primary,
//                     fontWeight: "bold",
//                     fontSize: 12,
//                   }}
//                 >
//                   {playbackSpeed}x
//                 </Text>
//               </TouchableOpacity>
//               <Text style={{ color: colors.text, fontSize: 13 }}>
//                 පටිගත කළ හඬක් ඇත
//               </Text>
//             </View>

//             {/* Timeline Slider - Active only for the corresponding target */}
//             <View style={styles.sliderContainer}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={playingTarget === target ? duration : 100}
//                 value={playingTarget === target ? position : 0}
//                 onSlidingComplete={handleSeek}
//                 minimumTrackTintColor={colors.primary}
//                 maximumTrackTintColor="#ccc"
//                 thumbTintColor={colors.primary}
//               />
//               <View style={styles.timeRow}>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(position) : "00:00"}
//                 </Text>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(duration) : "00:00"}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
//       </View>
//     );
//   }

//   if (!card) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 20,
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
//           කාඩ් එක සොයා ගැනීමට නොහැකි විය.
//         </Text>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             backgroundColor: colors.primary,
//             borderRadius: 8,
//           }}
//           onPress={() => router.back()}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>ආපසු යන්න</Text>
//         </TouchableOpacity>
//         /
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <View style={styles.topBar}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.iconButton}
//         >
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text style={[styles.topTitle, { color: colors.text }]}>
//           {card.subject} - {card.lesson}
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             router.push({ pathname: "/edit-card", params: { id: card.id } })
//           }
//           style={styles.iconButton}
//         >
//           <Ionicons name="create-outline" size={22} color={colors.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Question Section with Target 'question' */}
//         {renderDetailContent(
//           card.questionType,
//           card.questionContent,
//           "ප්‍රශ්නය (Question)",
//           "question",
//         )}

//         {!showAnswer ? (
//           <TouchableOpacity
//             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
//             onPress={() => setShowAnswer(true)}
//           >
//             <Ionicons name="eye-outline" size={18} color="#fff" />
//             <Text style={styles.showAnswerText}>
//               පිළිතුර පෙන්වන්න (Show Answer)
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <View>
//             {/* Answer Section with Target 'answer' */}
//             {renderDetailContent(
//               card.answerType,
//               card.answerContent,
//               "පිළිතුර (Answer)",
//               "answer",
//             )}

//             <TouchableOpacity
//               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
//               onPress={() => setShowAnswer(false)}
//             >
//               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
//                 පිළිතුර සඟවන්න (Hide Answer)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {/* Fullscreen Image Modal */}
//       <Modal
//         visible={fullscreenImage !== null}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setFullscreenImage(null)}
//       >
//         <View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.closeBtn}
//             onPress={() => setFullscreenImage(null)}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//           {fullscreenImage && (
//             <Image
//               source={{ uri: fullscreenImage }}
//               style={styles.fullscreenImage}
//               resizeMode="contain"
//             />
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   topTitle: { fontSize: 16, fontWeight: "bold" },
//   iconButton: { padding: 6 },
//   scrollContent: { padding: 16, paddingBottom: 40 },
//   contentBox: {
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
//   mainText: { fontSize: 16, lineHeight: 22 },
//   imageWrapper: {
//     height: 180,
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#eee",
//     position: "relative",
//   },
//   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
//   zoomHint: {
//     position: "absolute",
//     right: 8,
//     bottom: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   voiceContainer: { marginTop: 4 },
//   voiceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },
//   playBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   speedBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//   },
//   sliderContainer: { width: "100%", marginTop: 4 },
//   slider: { width: "100%", height: 30 },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 4,
//   },
//   showAnswerBtn: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//   },
//   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
//   hideAnswerBtn: {
//     height: 42,
//     borderRadius: 10,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   closeBtn: {
//     position: "absolute",
//     top: 40,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     padding: 8,
//     borderRadius: 20,
//   },
//   fullscreenImage: { width: width, height: height * 0.8 },
// });

// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { createAudioPlayer } from "expo-audio";
// import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Alert,
//     Dimensions,
//     Image,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");
// const { width, height } = Dimensions.get("window");

// export default function CardDetailScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const navigation = useNavigation();
//   const params = useLocalSearchParams();

//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   const [card, setCard] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

//   // Reminder State
//   const [selectedReminder, setSelectedReminder] = useState<string | null>(null);

//   // Audio playback states
//   const [activePlayer, setActivePlayer] = useState<any>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playingTarget, setPlayingTarget] = useState<
//     "question" | "answer" | null
//   >(null);

//   // Fullscreen Image States
//   const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (cardId) fetchCardDetails(Number(cardId));
//     if (navigation) {
//       const unsubscribe = navigation.addListener("focus", () => {
//         if (cardId) fetchCardDetails(Number(cardId));
//       });
//       return unsubscribe;
//     }
//   }, [cardId, navigation]);

//   useEffect(() => {
//     if (!activePlayer) return;
//     const subscription = activePlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setPosition(status.currentTime || 0);
//           setDuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsPlaying(false);
//             setPosition(0);
//             setPlayingTarget(null);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [activePlayer]);

//   const fetchCardDetails = async (id: number) => {
//     try {
//       setLoading(true);
//       // JOIN query මඟින් subject සහ lesson වල නම් ලබා ගැනීම
//       const result: any = await db.getAllAsync(
//         `
//         SELECT
//           f.*,
//           s.name as subject_name,
//           l.name as lesson_name
//         FROM flashcards f
//         LEFT JOIN subjects s ON f.subject_id = s.id
//         LEFT JOIN lessons l ON f.lesson_id = l.id
//         WHERE f.id = ?;
//       `,
//         [id],
//       );

//       if (result && result.length > 0) {
//         const item = result[0];
//         setCard(item);
//         if (item.reminderEnabled === 1) {
//           setSelectedReminder(item.reminderDays);
//         } else {
//           setSelectedReminder(null);
//         }
//       }
//     } catch (error) {
//       console.log("Error fetching card detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlayVoice = async (
//     uri: string,
//     target: "question" | "answer",
//   ) => {
//     try {
//       if (activePlayer && isPlaying && playingTarget === target) {
//         activePlayer.pause();
//         setIsPlaying(false);
//         return;
//       }

//       if (activePlayer) {
//         activePlayer.pause();
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       soundPlayer.setPlaybackRate(playbackSpeed);
//       setActivePlayer(soundPlayer);
//       setPlayingTarget(target);
//       soundPlayer.play();
//       setIsPlaying(true);
//     } catch (err) {
//       console.log("Audio play error:", err);
//     }
//   };

//   const handleSeek = async (value: number) => {
//     if (activePlayer) {
//       await activePlayer.seekTo(value);
//       setPosition(value);
//     }
//   };

//   const changeSpeed = () => {
//     const speeds = [1.0, 1.5, 2.0];
//     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
//     const newSpeed = speeds[nextIndex];
//     setPlaybackSpeed(newSpeed);
//     if (activePlayer) {
//       activePlayer.setPlaybackRate(newSpeed);
//     }
//   };

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   // Done බොත්තම එබූ විට ක්‍රියාත්මක වන කොටස
//   const handleDone = async () => {
//     try {
//       const reminderEnabled = selectedReminder ? 1 : 0;
//       const reminderDays = selectedReminder || "None";

//       // අද දිනට හෝ තෝරාගත් දින ගණනට අදාළ දිනය (Timestamp / Date calculation) ගණනය කර සේව් කිරීම
//       // මෙහිදී පහසුව සඳහා reminderDays අගය ඩේටාබේස් එකේ අප්ඩේට් කරයි
//       await db.runAsync(
//         `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ? WHERE id = ?;`,
//         [reminderEnabled, reminderDays, card.id],
//       );

//       // මීළඟට අද මතක් කළ යුතු (Reminder ඇති) වෙනත් කාඩ් එකක් තිබේදැයි සෙවීම
//       const nextCards: any = await db.getAllAsync(
//         `
//         SELECT id FROM flashcards WHERE id != ? ORDER BY id ASC;
//       `,
//         [card.id],
//       );

//       if (nextCards && nextCards.length > 0) {
//         // මීළඟ කාඩ් එකට යන්න
//         const nextId = nextCards[0].id;
//         router.replace({ pathname: "/card-detail", params: { id: nextId } });
//       } else {
//         Alert.alert("සුභ පැතුම්! 🎉", "අද සඳහා සියලුම කාඩ්ස් අවසන් කර ඇත.");
//         router.back();
//       }
//     } catch (err) {
//       console.log("Done action error:", err);
//     }
//   };

//   const renderDetailContent = (
//     type: string,
//     content: string,
//     label: string,
//     target: "question" | "answer",
//   ) => {
//     const isThisPlaying = isPlaying && playingTarget === target;

//     return (
//       <View
//         style={[
//           styles.contentBox,
//           {
//             backgroundColor: colors.cardBackground,
//             borderColor: colors.tint + "30",
//           },
//         ]}
//       >
//         <Text style={[styles.contentLabel, { color: colors.primary }]}>
//           {label}
//         </Text>
//         {type === "text" && (
//           <Text style={[styles.mainText, { color: colors.text }]}>
//             {content}
//           </Text>
//         )}
//         {type === "image" && (
//           <TouchableOpacity
//             style={styles.imageWrapper}
//             activeOpacity={0.9}
//             onPress={() => setFullscreenImage(content)}
//           >
//             <Image source={{ uri: content }} style={styles.imgStyle} />
//             <View style={styles.zoomHint}>
//               <Ionicons name="expand" size={16} color="#fff" />
//             </View>
//           </TouchableOpacity>
//         )}
//         {type === "voice" && (
//           <View style={styles.voiceContainer}>
//             <View style={styles.voiceRow}>
//               <TouchableOpacity
//                 style={[styles.playBtn, { backgroundColor: colors.primary }]}
//                 onPress={() => handlePlayVoice(content, target)}
//               >
//                 <Ionicons
//                   name={isThisPlaying ? "pause" : "play"}
//                   size={22}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.speedBtn, { borderColor: colors.primary }]}
//                 onPress={changeSpeed}
//               >
//                 <Text
//                   style={{
//                     color: colors.primary,
//                     fontWeight: "bold",
//                     fontSize: 12,
//                   }}
//                 >
//                   {playbackSpeed}x
//                 </Text>
//               </TouchableOpacity>
//               <Text style={{ color: colors.text, fontSize: 13 }}>
//                 පටිගත කළ හඬක් ඇත
//               </Text>
//             </View>

//             <View style={styles.sliderContainer}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={playingTarget === target ? duration : 100}
//                 value={playingTarget === target ? position : 0}
//                 onSlidingComplete={handleSeek}
//                 minimumTrackTintColor={colors.primary}
//                 maximumTrackTintColor="#ccc"
//                 thumbTintColor={colors.primary}
//               />
//               <View style={styles.timeRow}>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(position) : "00:00"}
//                 </Text>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(duration) : "00:00"}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
//       </View>
//     );
//   }

//   if (!card) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 20,
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
//           කාඩ් එක සොයා ගැනීමට නොහැකි විය.
//         </Text>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             backgroundColor: colors.primary,
//             borderRadius: 8,
//           }}
//           onPress={() => router.back()}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>ආපසු යන්න</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Top Bar with Subject & Lesson Name */}
//       <View style={styles.topBar}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.iconButton}
//         >
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text
//           style={[styles.topTitle, { color: colors.text }]}
//           numberOfLines={1}
//         >
//           {card.subject_name || "විෂය නැත"} - {card.lesson_name || "පාඩම නැත"}
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             router.push({ pathname: "/edit-card", params: { id: card.id } })
//           }
//           style={styles.iconButton}
//         >
//           <Ionicons name="create-outline" size={22} color={colors.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Question Section */}
//         {renderDetailContent(
//           card.questionType,
//           card.questionContent,
//           "ප්‍රශ්නය (Question)",
//           "question",
//         )}

//         {!showAnswer ? (
//           <TouchableOpacity
//             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
//             onPress={() => setShowAnswer(true)}
//           >
//             <Ionicons name="eye-outline" size={18} color="#fff" />
//             <Text style={styles.showAnswerText}>
//               පිළිතුර පෙන්වන්න (Show Answer)
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <View>
//             {renderDetailContent(
//               card.answerType,
//               card.answerContent,
//               "පිළිතුර (Answer)",
//               "answer",
//             )}

//             <TouchableOpacity
//               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
//               onPress={() => setShowAnswer(false)}
//             >
//               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
//                 පිළිතුර සඟවන්න (Hide Answer)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Reminder Interval Selection (Today, 3, 7, 14, 30 days) */}
//         <View
//           style={[
//             styles.reminderCard,
//             {
//               backgroundColor: colors.cardBackground,
//               borderColor: colors.tint + "30",
//             },
//           ]}
//         >
//           <Text style={[styles.reminderLabel, { color: colors.text }]}>
//             මතක් කළ යුතු කාලය තෝරන්න:
//           </Text>
//           <View style={styles.reminderChipsRow}>
//             {[
//               { label: "අද (Today)", value: "today" },
//               { label: "දින 3", value: "3 days" },
//               { label: "දින 7", value: "7 days" },
//               { label: "දින 14", value: "14 days" },
//               { label: "දින 30", value: "30 days" },
//             ].map((item) => (
//               <TouchableOpacity
//                 key={item.value}
//                 style={[
//                   styles.reminderChip,
//                   { borderColor: colors.primary },
//                   selectedReminder === item.value && {
//                     backgroundColor: colors.primary,
//                   },
//                 ]}
//                 onPress={() =>
//                   setSelectedReminder(
//                     item.value === selectedReminder ? null : item.value,
//                   )
//                 }
//               >
//                 <Text
//                   style={{
//                     color:
//                       selectedReminder === item.value ? "#fff" : colors.text,
//                     fontSize: 11,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Done Button */}
//         <TouchableOpacity
//           style={[styles.doneButton, { backgroundColor: colors.primary }]}
//           onPress={handleDone}
//         >
//           <Ionicons name="checkmark-done" size={20} color="#fff" />
//           <Text style={styles.doneButtonText}>Done (ඊළඟ කාඩ් එකට යන්න)</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Fullscreen Image Modal */}
//       <Modal
//         visible={fullscreenImage !== null}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setFullscreenImage(null)}
//       >
//         <View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.closeBtn}
//             onPress={() => setFullscreenImage(null)}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//           {fullscreenImage && (
//             <Image
//               source={{ uri: fullscreenImage }}
//               style={styles.fullscreenImage}
//               resizeMode="contain"
//             />
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   topTitle: {
//     fontSize: 15,
//     fontWeight: "bold",
//     flex: 1,
//     textAlign: "center",
//     marginHorizontal: 8,
//   },
//   iconButton: { padding: 6 },
//   scrollContent: { padding: 16, paddingBottom: 40 },
//   contentBox: {
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
//   mainText: { fontSize: 16, lineHeight: 22 },
//   imageWrapper: {
//     height: 180,
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#eee",
//     position: "relative",
//   },
//   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
//   zoomHint: {
//     position: "absolute",
//     right: 8,
//     bottom: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   voiceContainer: { marginTop: 4 },
//   voiceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },
//   playBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   speedBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//   },
//   sliderContainer: { width: "100%", marginTop: 4 },
//   slider: { width: "100%", height: 30 },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 4,
//   },
//   showAnswerBtn: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//   },
//   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
//   hideAnswerBtn: {
//     height: 42,
//     borderRadius: 10,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   reminderCard: {
//     padding: 14,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginTop: 16,
//     marginBottom: 12,
//   },
//   reminderLabel: { fontSize: 12, fontWeight: "bold", marginBottom: 8 },
//   reminderChipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
//   reminderChip: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//   },
//   doneButton: {
//     flexDirection: "row",
//     height: 50,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 6,
//   },
//   doneButtonText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   closeBtn: {
//     position: "absolute",
//     top: 40,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     padding: 8,
//     borderRadius: 20,
//   },
//   fullscreenImage: { width: width, height: height * 0.8 },
// });

// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { createAudioPlayer } from "expo-audio";
// import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//     Alert,
//     Dimensions,
//     Image,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { useTheme } from "../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");
// const { width, height } = Dimensions.get("window");

// export default function CardDetailScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const navigation = useNavigation();
//   const params = useLocalSearchParams();

//   const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

//   // Browse Screen එකෙන් එවන ලද IDs ලැයිස්තුව සහ වත්මන් ඉන්ඩෙක්ස් එක ලබා ගැනීම
//   const cardIdsParam = Array.isArray(params.cardIds)
//     ? params.cardIds[0]
//     : params.cardIds;
//   const currentIndexParam = Array.isArray(params.currentIndex)
//     ? params.currentIndex[0]
//     : params.currentIndex;

//   const cardIds: number[] = cardIdsParam ? JSON.parse(cardIdsParam) : [];
//   const currentIndex: number =
//     currentIndexParam !== undefined ? Number(currentIndexParam) : -1;

//   const [card, setCard] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

//   // Reminder State
//   const [selectedReminder, setSelectedReminder] = useState<string | null>(null);

//   // Audio playback states
//   const [activePlayer, setActivePlayer] = useState<any>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playingTarget, setPlayingTarget] = useState<
//     "question" | "answer" | null
//   >(null);

//   // Fullscreen Image States
//   const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (cardId) fetchCardDetails(Number(cardId));
//   }, [cardId]);

//   useEffect(() => {
//     if (!activePlayer) return;
//     const subscription = activePlayer.addListener(
//       "playbackStatusUpdate",
//       (status: any) => {
//         if (status.isLoaded) {
//           setPosition(status.currentTime || 0);
//           setDuration(status.duration || 0);
//           if (status.didJustFinish) {
//             setIsPlaying(false);
//             setPosition(0);
//             setPlayingTarget(null);
//           }
//         }
//       },
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, [activePlayer]);

//   const fetchCardDetails = async (id: number) => {
//     try {
//       setLoading(true);
//       const result: any = await db.getAllAsync(
//         `
//         SELECT
//           f.*,
//           s.name as subject_name,
//           l.name as lesson_name
//         FROM flashcards f
//         LEFT JOIN subjects s ON f.subject_id = s.id
//         LEFT JOIN lessons l ON f.lesson_id = l.id
//         WHERE f.id = ?;
//       `,
//         [id],
//       );

//       if (result && result.length > 0) {
//         const item = result[0];
//         setCard(item);
//         if (item.reminderEnabled === 1) {
//           setSelectedReminder(item.reminderDays);
//         } else {
//           setSelectedReminder(null);
//         }
//       }
//     } catch (error) {
//       console.log("Error fetching card detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlayVoice = async (
//     uri: string,
//     target: "question" | "answer",
//   ) => {
//     try {
//       if (activePlayer && isPlaying && playingTarget === target) {
//         activePlayer.pause();
//         setIsPlaying(false);
//         return;
//       }

//       if (activePlayer) {
//         activePlayer.pause();
//       }

//       const soundPlayer = createAudioPlayer({ uri });
//       soundPlayer.setPlaybackRate(playbackSpeed);
//       setActivePlayer(soundPlayer);
//       setPlayingTarget(target);
//       soundPlayer.play();
//       setIsPlaying(true);
//     } catch (err) {
//       console.log("Audio play error:", err);
//     }
//   };

//   const handleSeek = async (value: number) => {
//     if (activePlayer) {
//       await activePlayer.seekTo(value);
//       setPosition(value);
//     }
//   };

//   const changeSpeed = () => {
//     const speeds = [1.0, 1.5, 2.0];
//     const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
//     const newSpeed = speeds[nextIndex];
//     setPlaybackSpeed(newSpeed);
//     if (activePlayer) {
//       activePlayer.setPlaybackRate(newSpeed);
//     }
//   };

//   const formatTime = (millis: number) => {
//     const totalSeconds = Math.floor(millis / 1000);
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   // Done බොත්තම එබූ විට
//   const handleDone = async () => {
//     try {
//       const reminderEnabled = selectedReminder ? 1 : 0;
//       const reminderDays = selectedReminder || "None";

//       // ඩේටාබේස් එකේ රිමයින්ඩර් තොරතුරු අප්ඩේට් කිරීම
//       await db.runAsync(
//         `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ? WHERE id = ?;`,
//         [reminderEnabled, reminderDays, card.id],
//       );

//       // Browse ලැයිස්තුව හරහා පැමිණියේ නම්, ඊළඟ කාඩ් එකට යන්න
//       if (cardIds.length > 0 && currentIndex !== -1) {
//         const nextIndex = currentIndex + 1;
//         if (nextIndex < cardIds.length) {
//           // තව කාඩ් ඉතිරි නම් ඊළඟ කාඩ් එකට යන්න
//           const nextCardId = cardIds[nextIndex];
//           router.replace({
//             pathname: "/card-detail",
//             params: {
//               id: nextCardId,
//               cardIds: JSON.stringify(cardIds),
//               currentIndex: nextIndex,
//             },
//           });
//         } else {
//           // ලැයිස්තුව සම්පූර්ණයෙන්ම අවසන් නම් Alert එක පෙන්වන්න
//           Alert.alert(
//             "සුභ පැතුම්! 🎉",
//             "මෙම පාඩමේ සියලුම කාඩ්පත් සමාලෝචනය කර අවසන්!",
//             [{ text: "හොඳයි", onPress: () => router.back() }],
//           );
//         }
//       } else {
//         // Browse එකෙන් නොපැමිණියේ නම් සාමාන්‍ය පරිදි ආපසු යන්න
//         router.back();
//       }
//     } catch (err) {
//       console.log("Done action error:", err);
//     }
//   };

//   const renderDetailContent = (
//     type: string,
//     content: string,
//     label: string,
//     target: "question" | "answer",
//   ) => {
//     const isThisPlaying = isPlaying && playingTarget === target;

//     return (
//       <View
//         style={[
//           styles.contentBox,
//           {
//             backgroundColor: colors.cardBackground,
//             borderColor: colors.tint + "30",
//           },
//         ]}
//       >
//         <Text style={[styles.contentLabel, { color: colors.primary }]}>
//           {label}
//         </Text>
//         {type === "text" && (
//           <Text style={[styles.mainText, { color: colors.text }]}>
//             {content}
//           </Text>
//         )}
//         {type === "image" && (
//           <TouchableOpacity
//             style={styles.imageWrapper}
//             activeOpacity={0.9}
//             onPress={() => setFullscreenImage(content)}
//           >
//             <Image source={{ uri: content }} style={styles.imgStyle} />
//             <View style={styles.zoomHint}>
//               <Ionicons name="expand" size={16} color="#fff" />
//             </View>
//           </TouchableOpacity>
//         )}
//         {type === "voice" && (
//           <View style={styles.voiceContainer}>
//             <View style={styles.voiceRow}>
//               <TouchableOpacity
//                 style={[styles.playBtn, { backgroundColor: colors.primary }]}
//                 onPress={() => handlePlayVoice(content, target)}
//               >
//                 <Ionicons
//                   name={isThisPlaying ? "pause" : "play"}
//                   size={22}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.speedBtn, { borderColor: colors.primary }]}
//                 onPress={changeSpeed}
//               >
//                 <Text
//                   style={{
//                     color: colors.primary,
//                     fontWeight: "bold",
//                     fontSize: 12,
//                   }}
//                 >
//                   {playbackSpeed}x
//                 </Text>
//               </TouchableOpacity>
//               <Text style={{ color: colors.text, fontSize: 13 }}>
//                 පටිගත කළ හඬක් ඇත
//               </Text>
//             </View>

//             <View style={styles.sliderContainer}>
//               <Slider
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={playingTarget === target ? duration : 100}
//                 value={playingTarget === target ? position : 0}
//                 onSlidingComplete={handleSeek}
//                 minimumTrackTintColor={colors.primary}
//                 maximumTrackTintColor="#ccc"
//                 thumbTintColor={colors.primary}
//               />
//               <View style={styles.timeRow}>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(position) : "00:00"}
//                 </Text>
//                 <Text style={{ color: colors.text, fontSize: 11 }}>
//                   {playingTarget === target ? formatTime(duration) : "00:00"}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text }}>පූරණය වෙමින් පවතී...</Text>
//       </View>
//     );
//   }

//   if (!card) {
//     return (
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 20,
//           },
//         ]}
//       >
//         <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
//           කාඩ් එක සොයා ගැනීමට නොහැකි විය.
//         </Text>
//         <TouchableOpacity
//           style={{
//             padding: 10,
//             backgroundColor: colors.primary,
//             borderRadius: 8,
//           }}
//           onPress={() => router.back()}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>ආපසු යන්න</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Top Bar with Subject & Lesson Name */}
//       <View style={styles.topBar}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.iconButton}
//         >
//           <Ionicons name="arrow-back" size={24} color={colors.text} />
//         </TouchableOpacity>
//         <Text
//           style={[styles.topTitle, { color: colors.text }]}
//           numberOfLines={1}
//         >
//           {card.subject_name || "විෂය නැත"} - {card.lesson_name || "පාඩම නැත"}
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             router.push({ pathname: "/edit-card", params: { id: card.id } })
//           }
//           style={styles.iconButton}
//         >
//           <Ionicons name="create-outline" size={22} color={colors.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Question Section */}
//         {renderDetailContent(
//           card.questionType,
//           card.questionContent,
//           "ප්‍රශ්නය (Question)",
//           "question",
//         )}

//         {!showAnswer ? (
//           <TouchableOpacity
//             style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
//             onPress={() => setShowAnswer(true)}
//           >
//             <Ionicons name="eye-outline" size={18} color="#fff" />
//             <Text style={styles.showAnswerText}>
//               පිළිතුර පෙන්වන්න (Show Answer)
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <View>
//             {renderDetailContent(
//               card.answerType,
//               card.answerContent,
//               "පිළිතුර (Answer)",
//               "answer",
//             )}

//             <TouchableOpacity
//               style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
//               onPress={() => setShowAnswer(false)}
//             >
//               <Text style={{ color: colors.primary, fontWeight: "bold" }}>
//                 පිළිතුර සඟවන්න (Hide Answer)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Reminder Interval Selection */}
//         <View
//           style={[
//             styles.reminderCard,
//             {
//               backgroundColor: colors.cardBackground,
//               borderColor: colors.tint + "30",
//             },
//           ]}
//         >
//           <Text style={[styles.reminderLabel, { color: colors.text }]}>
//             මතක් කළ යුතු කාලය තෝරන්න:
//           </Text>
//           <View style={styles.reminderChipsRow}>
//             {[
//               { label: "අද (Today)", value: "today" },
//               { label: "දින 3", value: "3 days" },
//               { label: "දින 7", value: "7 days" },
//               { label: "දින 14", value: "14 days" },
//               { label: "දින 30", value: "30 days" },
//             ].map((item) => (
//               <TouchableOpacity
//                 key={item.value}
//                 style={[
//                   styles.reminderChip,
//                   { borderColor: colors.primary },
//                   selectedReminder === item.value && {
//                     backgroundColor: colors.primary,
//                   },
//                 ]}
//                 onPress={() =>
//                   setSelectedReminder(
//                     item.value === selectedReminder ? null : item.value,
//                   )
//                 }
//               >
//                 <Text
//                   style={{
//                     color:
//                       selectedReminder === item.value ? "#fff" : colors.text,
//                     fontSize: 11,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Done Button */}
//         <TouchableOpacity
//           style={[styles.doneButton, { backgroundColor: colors.primary }]}
//           onPress={handleDone}
//         >
//           <Ionicons name="checkmark-done" size={20} color="#fff" />
//           <Text style={styles.doneButtonText}>Done (ඊළඟ කාඩ් එකට යන්න)</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Fullscreen Image Modal */}
//       <Modal
//         visible={fullscreenImage !== null}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setFullscreenImage(null)}
//       >
//         <View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.closeBtn}
//             onPress={() => setFullscreenImage(null)}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//           {fullscreenImage && (
//             <Image
//               source={{ uri: fullscreenImage }}
//               style={styles.fullscreenImage}
//               resizeMode="contain"
//             />
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 40 },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   topTitle: {
//     fontSize: 15,
//     fontWeight: "bold",
//     flex: 1,
//     textAlign: "center",
//     marginHorizontal: 8,
//   },
//   iconButton: { padding: 6 },
//   scrollContent: { padding: 16, paddingBottom: 40 },
//   contentBox: {
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
//   mainText: { fontSize: 16, lineHeight: 22 },
//   imageWrapper: {
//     height: 180,
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#eee",
//     position: "relative",
//   },
//   imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
//   zoomHint: {
//     position: "absolute",
//     right: 8,
//     bottom: 8,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     padding: 6,
//     borderRadius: 20,
//   },
//   voiceContainer: { marginTop: 4 },
//   voiceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },
//   playBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   speedBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//   },
//   sliderContainer: { width: "100%", marginTop: 4 },
//   slider: { width: "100%", height: 30 },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 4,
//   },
//   showAnswerBtn: {
//     flexDirection: "row",
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 10,
//   },
//   showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
//   hideAnswerBtn: {
//     height: 42,
//     borderRadius: 10,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   reminderCard: {
//     padding: 14,
//     borderRadius: 12,
//     borderWidth: 1,
//     marginTop: 16,
//     marginBottom: 12,
//   },
//   reminderLabel: { fontSize: 12, fontWeight: "bold", marginBottom: 8 },
//   reminderChipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
//   reminderChip: {
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//   },
//   doneButton: {
//     flexDirection: "row",
//     height: 50,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     marginTop: 6,
//   },
//   doneButtonText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   closeBtn: {
//     position: "absolute",
//     top: 40,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     padding: 8,
//     borderRadius: 20,
//   },
//   fullscreenImage: { width: width, height: height * 0.8 },
// });

import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { createAudioPlayer } from "expo-audio";
import * as FileSystem from "expo-file-system";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const db = SQLite.openDatabaseSync("flashcards.db");
const { width, height } = Dimensions.get("window");

export default function CardDetailScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { t } = useLanguage();

  const cardId = Array.isArray(params.id) ? params.id[0] : params.id;

  const cardIdsParam = Array.isArray(params.cardIds)
    ? params.cardIds[0]
    : params.cardIds;
  const currentIndexParam = Array.isArray(params.currentIndex)
    ? params.currentIndex[0]
    : params.currentIndex;

  const cardIds: number[] = cardIdsParam ? JSON.parse(cardIdsParam) : [];
  const currentIndex: number =
    currentIndexParam !== undefined ? Number(currentIndexParam) : -1;

  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Reminder State
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);

  // Audio playback states
  const [activePlayer, setActivePlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playingTarget, setPlayingTarget] = useState<
    "question" | "answer" | null
  >(null);

  // Fullscreen Image States
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    if (cardId) fetchCardDetails(Number(cardId));
  }, [cardId]);
  // 🌟 2. useEffect වෙනුවට useFocusEffect පාවිච්චි කිරීම
  useFocusEffect(
    useCallback(() => {
      fetchCardDetails(Number(cardId));
    }, []),
  );

  useEffect(() => {
    if (!activePlayer) return;
    const subscription = activePlayer.addListener(
      "playbackStatusUpdate",
      (status: any) => {
        if (status.isLoaded) {
          setPosition(status.currentTime || 0);
          setDuration(status.duration || 0);
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
            setPlayingTarget(null);
          }
        }
      },
    );
    return () => {
      subscription.remove();
    };
  }, [activePlayer]);

  useEffect(() => {
    return () => {
      try {
        // QPlayer එක අයින් කිරීම
        if (activePlayer) {
          if (typeof activePlayer.release === "function") {
            activePlayer.release();
          } else if (typeof activePlayer.pause === "function") {
            activePlayer.pause();
          }
        }
      } catch (error) {
        console.log("Audio cleanup error:", error);
      }
    };
  }, [activePlayer]);

  const fetchCardDetails = async (id: number) => {
    try {
      setLoading(true);
      setShowAnswer(false); // නව කාඩ් එකකට යද්දී පිළිතුර සැඟවූ තත්ත්වයට පත් කරන්න
      const result: any = await db.getAllAsync(
        `
        SELECT 
          f.*, 
          s.name as subject_name, 
          l.name as lesson_name 
        FROM flashcards f
        LEFT JOIN subjects s ON f.subject_id = s.id
        LEFT JOIN lessons l ON f.lesson_id = l.id
        WHERE f.id = ?;
      `,
        [id],
      );

      if (result && result.length > 0) {
        const item = result[0];
        setCard(item);
        if (item.reminderEnabled === 1) {
          setSelectedReminder(item.reminderDays);
        } else {
          setSelectedReminder(null);
        }
      }
    } catch (error) {
      console.log("Error fetching card detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayVoice = async (
    uri: string,
    target: "question" | "answer",
  ) => {
    try {
      if (activePlayer && isPlaying && playingTarget === target) {
        activePlayer.pause();
        setIsPlaying(false);
        return;
      }

      if (activePlayer) {
        activePlayer.pause();
      }

      const soundPlayer = createAudioPlayer({ uri });
      soundPlayer.setPlaybackRate(playbackSpeed);
      setActivePlayer(soundPlayer);
      setPlayingTarget(target);
      soundPlayer.play();
      setIsPlaying(true);
    } catch (err) {
      console.log("Audio play error:", err);
    }
  };

  const handleSeek = async (value: number) => {
    if (activePlayer) {
      await activePlayer.seekTo(value);
      setPosition(value);
    }
  };

  const changeSpeed = () => {
    const speeds = [1.0, 1.5, 2.0];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackSpeed(newSpeed);
    if (activePlayer) {
      activePlayer.setPlaybackRate(newSpeed);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  useEffect(() => {
    console.log(duration);
  }, [duration]);

  //   const handleDone = async () => {
  //     try {
  //       const reminderEnabled = selectedReminder ? 1 : 0;
  //       const reminderDays = selectedReminder || "None";

  //       await db.runAsync(
  //         `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ? WHERE id = ?;`,
  //         [reminderEnabled, reminderDays, card.id],
  //       );

  //       if (cardIds.length > 0 && currentIndex !== -1) {
  //         const nextIndex = currentIndex + 1;
  //         if (nextIndex < cardIds.length) {
  //           const nextCardId = cardIds[nextIndex];
  //           router.replace({
  //             pathname: "/card-detail",
  //             params: {
  //               id: nextCardId,
  //               cardIds: JSON.stringify(cardIds),
  //               currentIndex: nextIndex,
  //             },
  //           });
  //         } else {
  //           Alert.alert(
  //             "සුභ පැතුම්! 🎉",
  //             "මෙම පාඩමේ සියලුම කාඩ්පත් සමාලෝචනය කර අවසන්!",
  //             [{ text: "හොඳයි", onPress: () => router.back() }],
  //           );
  //         }
  //       } else {
  //         router.back();
  //       }
  //     } catch (err) {
  //       console.log("Done action error:", err);
  //     }
  //   };

  //   const handleDone = async () => {
  //     try {
  //       const reminderEnabled = selectedReminder ? 1 : 0;
  //       const reminderDays = selectedReminder || "None";

  //       // 1. දින ගණනක් තෝරා ඇත්නම්, අද දිනට එම දින ගණන එකතු කර අනාගත දිනය (Future Date) සකස් කිරීම
  //       let reminderNextDate = null;
  //       if (selectedReminder && !isNaN(Number(selectedReminder))) {
  //         const targetDate = new Date();
  //         targetDate.setDate(targetDate.getDate() + Number(selectedReminder));
  //         reminderNextDate = targetDate.toISOString().split("T")[0]; // "YYYY-MM-DD" ආකෘතියට
  //       }

  //       // 2. ඩේටාබේස් එක update කිරීම (reminderNextDate එක සමඟ)
  //       await db.runAsync(
  //         `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ?, reminderNextDate = ? WHERE id = ?;`,
  //         [reminderEnabled, reminderDays, reminderNextDate, card.id],
  //       );

  //       // 3. ඊළඟ කාඩ්පතට යාම හෝ අවසන් කිරීම
  //       if (cardIds.length > 0 && currentIndex !== -1) {
  //         const nextIndex = currentIndex + 1;
  //         if (nextIndex < cardIds.length) {
  //           const nextCardId = cardIds[nextIndex];
  //           router.replace({
  //             pathname: "/card-detail",
  //             params: {
  //               id: nextCardId,
  //               cardIds: JSON.stringify(cardIds),
  //               currentIndex: nextIndex,
  //             },
  //           });
  //         } else {
  //           Alert.alert(
  //             "සුභ පැතුම්! 🎉",
  //             "මෙම පාඩමේ සියලුම කාඩ්පත් සමාලෝචනය කර අවසන්!",
  //             [{ text: "හොඳයි", onPress: () => router.back() }],
  //           );
  //         }
  //       } else {
  //         router.back();
  //       }
  //     } catch (err) {
  //       console.log("Done action error:", err);
  //     }
  //   };
  //   const handleDone = async () => {
  //     try {
  //       const reminderEnabled = selectedReminder ? 1 : 0;
  //       const reminderDays = selectedReminder || "None";

  //       // 1. දින ගණනක් තෝරා ඇත්නම්, අද දිනට එම දින ගණන එකතු කර අනාගත දිනය (Future Date) සකස් කිරීම
  //       let reminderNextDate = null;
  //       if (selectedReminder && !isNaN(Number(selectedReminder))) {
  //         const targetDate = new Date();
  //         targetDate.setDate(targetDate.getDate() + Number(selectedReminder));
  //         reminderNextDate = targetDate.toISOString().split("T")[0]; // "YYYY-MM-DD" ආකෘතියට
  //       }

  //       console.log("Updating card with reminderNextDate:", reminderNextDate);

  //       // 2. ඩේටාබේස් එක update කිරීම (reminderNextDate එක සමඟ)
  //       await db.runAsync(
  //         `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ?, reminderNextDate = ? WHERE id = ?;`,
  //         [reminderEnabled, reminderDays, reminderNextDate, card.id],
  //       );

  //       // 3. ඊළඟ කාඩ්පතට යාම හෝ අවසන් කිරීම
  //       if (cardIds.length > 0 && currentIndex !== -1) {
  //         const nextIndex = currentIndex + 1;
  //         if (nextIndex < cardIds.length) {
  //           const nextCardId = cardIds[nextIndex];
  //           router.replace({
  //             pathname: "/card-detail",
  //             params: {
  //               id: nextCardId,
  //               cardIds: JSON.stringify(cardIds),
  //               currentIndex: nextIndex,
  //             },
  //           });
  //         } else {
  //           Alert.alert(
  //             "සුභ පැතුම්! 🎉",
  //             "මෙම පාඩමේ සියලුම කාඩ්පත් සමාලෝචනය කර අවසන්!",
  //             [{ text: "හොඳයි", onPress: () => router.back() }],
  //           );
  //         }
  //       } else {
  //         router.back();
  //       }
  //     } catch (err) {
  //       console.log("Done action error:", err);
  //     }
  //   };
  // const handleDone = async () => {
  //   try {
  //     const reminderEnabled = selectedReminder !== null ? 1 : 0;
  //     const reminderDays =
  //       selectedReminder !== null ? String(selectedReminder) : "None";

  //     // 1. තෝරාගත් රීමින්ඩර් අගය (value) අනුව නිවැරදි දිනය ගණනය කිරීම
  //     let reminderNextDate = null;
  //     if (selectedReminder !== null) {
  //       const targetDate = new Date();
  //       // console.log("Current date:", targetDate.toISOString());

  //       if (selectedReminder === -1) {
  //         // "අද (Today)" තෝරා ඇත නම්, අද දිනයම ලබා දීම
  //         reminderNextDate = targetDate.toISOString().split("T")[0];
  //       } else if (typeof selectedReminder === "number") {
  //         // දින 3, 7, 14, 30 වැනි අංකයක් නම්, වත්මන් දිනයට එම දින ගණන එකතු කිරීම
  //         targetDate.setDate(targetDate.getDate() + selectedReminder);
  //         reminderNextDate = targetDate.toISOString().split("T")[0]; // "YYYY-MM-DD" ආකෘතියට
  //       }
  //     }

  //     console.log("Calculated reminderNextDate:", reminderNextDate); // ඩීබග් කර බැලීමට

  //     // 2. ඩේටාබේස් එක update කිරීම
  //     await db.runAsync(
  //       `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ?, reminderNextDate = ? WHERE id = ?;`,
  //       [reminderEnabled, reminderDays, reminderNextDate, card.id],
  //     );

  //     // 3. ඊළඟ කාඩ්පතට යාම හෝ අවසන් කිරීම
  //     if (cardIds.length > 0 && currentIndex !== -1) {
  //       const nextIndex = currentIndex + 1;
  //       if (nextIndex < cardIds.length) {
  //         const nextCardId = cardIds[nextIndex];
  //         router.replace({
  //           pathname: "/card-detail",
  //           params: {
  //             id: nextCardId,
  //             cardIds: JSON.stringify(cardIds),
  //             currentIndex: nextIndex,
  //           },
  //         });
  //       } else {
  //         // Alert.alert(
  //         //   "සුභ පැතුම්! 🎉",
  //         //   "මෙම පාඩමේ සියලුම කාඩ්පත් සමාලෝචනය කර අවසන්!",
  //         //   [{ text: "හොඳයි", onPress: () => router.back() }],
  //         // );
  //         router.back();
  //       }
  //     } else {
  //       router.back();
  //     }
  //   } catch (err) {
  //     console.log("Done action error:", err);
  //   }
  // };

  const handleDone = async () => {
    try {
      const reminderEnabled = selectedReminder !== null ? 1 : 0;
      const reminderDays =
        selectedReminder !== null ? String(selectedReminder) : "None";
      const now = new Date().toISOString();

      // 1. තෝරාගත් රීමින්ඩර් අගය (value) අනුව නිවැරදි දිනය ගණනය කිරීම
      let reminderNextDate = null;
      if (selectedReminder !== null) {
        const targetDate = new Date();

        if (selectedReminder === -1) {
          reminderNextDate = targetDate.toISOString().split("T")[0];
        } else if (typeof selectedReminder === "number") {
          targetDate.setDate(targetDate.getDate() + selectedReminder);
          reminderNextDate = targetDate.toISOString().split("T")[0];
        }
      }

      // 2. ඩේටාබේස් එක update කිරීම
      await db.runAsync(
        `UPDATE flashcards SET reminderEnabled = ?, reminderDays = ?, reminderNextDate = ?, last_reviewed = ? WHERE id = ?;`,
        [reminderEnabled, reminderDays, reminderNextDate, now, card.id],
      );

      // 🌟 3. Streak එක පරීක්ෂා කර Update කිරීම
      const todayStr = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
      const lastStreakDate = await AsyncStorage.getItem("lastStreakDate");

      if (lastStreakDate !== todayStr) {
        // අද දිනය සඳහා තවම Streak එක ලබාගෙන නැත
        const currentStreakRaw = await AsyncStorage.getItem("streakCount");
        const currentStreak = currentStreakRaw
          ? parseInt(currentStreakRaw, 10)
          : 0;
        const newStreak = currentStreak + 1;

        // අලුත් Streak count එක සහ අද දිනය සේව් කිරීම
        await AsyncStorage.setItem("streakCount", newStreak.toString());
        await AsyncStorage.setItem("lastStreakDate", todayStr);

        console.log(`🎉 Streak Updated! New Streak: ${newStreak}`);
      }

      // 4. ඊළඟ කාඩ්පතට යාම හෝ අවසන් කිරීම
      if (cardIds.length > 0 && currentIndex !== -1) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < cardIds.length) {
          const nextCardId = cardIds[nextIndex];
          router.replace({
            pathname: "/card-detail",
            params: {
              id: nextCardId,
              cardIds: JSON.stringify(cardIds),
              currentIndex: nextIndex,
            },
          });
        } else {
          router.back();
        }
      } else {
        router.back();
      }
    } catch (err) {
      console.log("Done action error:", err);
    }
  };
  const renderDetailContent = (
    type: string,
    content: string,
    label: string,
    target: "question" | "answer",
  ) => {
    const isThisPlaying = isPlaying && playingTarget === target;

    return (
      <View
        style={[
          styles.contentBox,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.tint + "30",
          },
        ]}
      >
        <Text style={[styles.contentLabel, { color: colors.primary }]}>
          {label}
        </Text>
        {type === "text" && (
          <Text style={[styles.mainText, { color: colors.text }]}>
            {content}
          </Text>
        )}
        {type === "image" && (
          <TouchableOpacity
            style={styles.imageWrapper}
            activeOpacity={0.9}
            onPress={() => setFullscreenImage(content)}
          >
            <Image source={{ uri: content }} style={styles.imgStyle} />
            <View style={styles.zoomHint}>
              <Ionicons name="expand" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        )}
        {type === "voice" && (
          <View style={styles.voiceContainer}>
            <View style={styles.voiceRow}>
              <TouchableOpacity
                style={[styles.playBtn, { backgroundColor: colors.primary }]}
                onPress={() => handlePlayVoice(content, target)}
              >
                <Ionicons
                  name={isThisPlaying ? "pause" : "play"}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.speedBtn, { borderColor: colors.primary }]}
                onPress={changeSpeed}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {playbackSpeed}x
                </Text>
              </TouchableOpacity>
              {/* <Text style={{ color: colors.text, fontSize: 13 }}>
                පටිගත කළ හඬක් ඇත
              </Text> */}
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={playingTarget === target ? duration : 100}
                value={playingTarget === target ? position : 0}
                onSlidingComplete={handleSeek}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor="#ccc"
                thumbTintColor={colors.primary}
              />
              {/* <View style={styles.timeRow}>
                <Text style={{ color: colors.text, fontSize: 11 }}>
                  {playingTarget === target ? formatTime(position) : "00:00"}
                </Text>
                <Text style={{ color: colors.text, fontSize: 11 }}>
                  {playingTarget === target ? formatTime(duration) : "00:00"}
                </Text>
              </View> */}
              <View style={styles.timeRow}>
                {/* 1. Current Position එක (ප්ලේ වෙද්දී විතරක් වෙනස් වේ, නැත්නම් 00:00 පෙන්වයි) */}
                <Text style={{ color: colors.text, fontSize: 11 }}>
                  {playingTarget === target
                    ? formatTime(position * 1000)
                    : "00:00"}
                </Text>

                {/* 2. Total Duration එක (playingTarget එක නැතත්, duration එක තියෙන තාක් සැබෑ කාලය පෙන්වයි) */}
                <Text style={{ color: colors.text, fontSize: 11 }}>
                  {duration ? formatTime(duration * 1000) : "00:00"}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  //   const handleDeleteCard = () => {
  //     Alert.alert(
  //       "කාඩ්පත මකා දමන්නද?",
  //       "මෙම ක්‍රියාව ආපසු හැරවිය නොහැක. ඔබට මෙම කාඩ්පත මැකීමට අවශ්‍යද?",
  //       [
  //         { text: "අවලංගු කරන්න", style: "cancel" },
  //         {
  //           text: "මකා දමන්න",
  //           style: "destructive",
  //           onPress: async () => {
  //             try {
  //               if (!card) return; // මෙතැන currentCard වෙනුවට card දමන්න

  //               // ඩේටාබේස් එකෙන් ඩിലීට් කිරීම
  //               await db.runAsync("DELETE FROM flashcards WHERE id = ?;", [
  //                 card.id,
  //               ]);

  //               Alert.alert("සාර්ථකයි! 🗑️", "කාඩ්පත සාර්ථකව මකා දමන ලදී.", [
  //                 { text: "හොඳයි", onPress: () => router.back() },
  //               ]);
  //             } catch (error) {
  //               console.log("Error deleting card:", error);
  //               Alert.alert("දෝෂයක් ඇති විය", "කාඩ්පත මකා දැමීම අසාර්ථක විය.");
  //             }
  //           },
  //         },
  //       ],
  //     );
  //   };

  const handleDeleteCard = () => {
    Alert.alert(t("cardDetail", "askDelete"), "", [
      { text: t("common", "cancel"), style: "cancel" },
      {
        text: t("common", "delete"),
        style: "destructive",
        onPress: async () => {
          try {
            if (!card) return;

            // 1. questionContent එකේ Voice හෝ Image ෆයිල් එකක් ඇත්නම් ඩිවයිස් එකෙන් මැකීම
            if (
              card.questionContent &&
              card.questionContent.startsWith("file://")
            ) {
              try {
                await FileSystem.deleteAsync(card.questionContent, {
                  idempotent: true,
                });
              } catch (e) {
                console.log("Error deleting question file:", e);
              }
            }

            // 2. answerContent එකේ Voice හෝ Image ෆයිල් එකක් ඇත්නම් ඩිවයිස් එකෙන් මැකීම
            if (
              card.answerContent &&
              card.answerContent.startsWith("file://")
            ) {
              try {
                await FileSystem.deleteAsync(card.answerContent, {
                  idempotent: true,
                });
              } catch (e) {
                console.log("Error deleting answer file:", e);
              }
            }

            // 3. ඩේටාබේස් එකෙන් කාඩ්පත ඩිලීට් කිරීම
            await db.runAsync("DELETE FROM flashcards WHERE id = ?;", [
              card.id,
            ]);

            Alert.alert(`${t("common", "successful")} 🗑️`, "", [
              { text: t("common", "ok"), onPress: () => router.back() },
            ]);
          } catch (error) {
            console.log("Error deleting card:", error);
            Alert.alert(
              t("common", "error"),
              t("cardDetail", "failedToDelete"),
            );
          }
        },
      },
    ]);
  };
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: colors.text }}></Text>
      </View>
    );
  }

  if (!card) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          },
        ]}
      >
        <Text style={{ color: colors.text, fontSize: 16, marginBottom: 15 }}>
          {t("cardDetail", "cardNotFound")}
        </Text>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: colors.primary,
            borderRadius: 8,
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {t("cardDetail", "goBack")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar with Subject & Lesson Name */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text
          style={[styles.topTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {card.subject_name || t("cardDetail", "noSubjects")} -{" "}
          {card.lesson_name || t("cardDetail", "noLessons")}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/edit-card", params: { id: card.id } })
          }
          style={styles.iconButton}
        >
          <Ionicons name="create-outline" size={22} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteCard} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={18} color="#ff5252" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Question Section */}
        {renderDetailContent(
          card.questionType,
          card.questionContent,
          t("cardDetail", "questionLabel"),
          "question",
        )}

        {!showAnswer ? (
          <TouchableOpacity
            style={[styles.showAnswerBtn, { backgroundColor: colors.primary }]}
            onPress={() => setShowAnswer(true)}
          >
            <Ionicons name="eye-outline" size={18} color="#fff" />
            <Text style={styles.showAnswerText}>
              {t("cardDetail", "showAnswer")}
            </Text>
          </TouchableOpacity>
        ) : (
          <View>
            {renderDetailContent(
              card.answerType,
              card.answerContent,
              t("cardDetail", "answerLabel"),
              "answer",
            )}

            <TouchableOpacity
              style={[styles.hideAnswerBtn, { borderColor: colors.primary }]}
              onPress={() => setShowAnswer(false)}
            >
              <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                {t("cardDetail", "hideAnswer")}
              </Text>
            </TouchableOpacity>

            {/* Reminder Interval Selection - Shown only when answer is visible */}
            <View
              style={[
                styles.reminderCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.tint + "30",
                },
              ]}
            >
              <Text style={[styles.reminderLabel, { color: colors.text }]}>
                {t("cardDetail", "reminderLabel")}
              </Text>
              <View style={styles.reminderChipsRow}>
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
                      styles.reminderChip,
                      { borderColor: colors.primary },
                      selectedReminder === item.value && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() =>
                      setSelectedReminder(
                        item.value === selectedReminder ? null : item.value,
                      )
                    }
                  >
                    <Text
                      style={{
                        color:
                          selectedReminder === item.value
                            ? "#fff"
                            : colors.text,
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Done Button - Shown only when answer is visible */}
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: colors.primary }]}
              onPress={handleDone}
            >
              <Ionicons name="checkmark-done" size={20} color="#fff" />
              <Text style={styles.doneButtonText}>
                {t("cardDetail", "doneButton")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Fullscreen Image Modal */}
      <Modal
        visible={fullscreenImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullscreenImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setFullscreenImage(null)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {fullscreenImage && (
            <Image
              source={{ uri: fullscreenImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  topTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  iconButton: { padding: 6 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  contentBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
  },
  contentLabel: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  mainText: { fontSize: 16, lineHeight: 22 },
  imageWrapper: {
    height: 180,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },
  imgStyle: { width: "100%", height: "100%", resizeMode: "cover" },
  zoomHint: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 20,
  },
  voiceContainer: { marginTop: 4 },
  voiceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  playBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  speedBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  sliderContainer: { width: "100%", marginTop: 4 },
  slider: { width: "100%", height: 30 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  showAnswerBtn: {
    flexDirection: "row",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  showAnswerText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  hideAnswerBtn: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  reminderCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 12,
  },
  reminderLabel: { fontSize: 12, fontWeight: "bold", marginBottom: 8 },
  reminderChipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  reminderChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  doneButton: {
    flexDirection: "row",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  doneButtonText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },
  fullscreenImage: { width: width, height: height * 0.8 },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 1,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
