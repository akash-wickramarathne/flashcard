// // import { Ionicons } from "@expo/vector-icons";
// // import { useNavigation, useRouter } from "expo-router";
// // import * as SQLite from "expo-sqlite";
// // import { useEffect, useState } from "react";
// // import {
// //   FlatList,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import { useTheme } from "../../context/ThemeContext";

// // const db = SQLite.openDatabaseSync("flashcards.db");

// // export default function BrowseScreen() {
// //   const { colors } = useTheme();
// //   const router = useRouter();
// //   const navigation = useNavigation();

// //   const [subjectsList, setSubjectsList] = useState<any[]>([]);
// //   const [lessonsList, setLessonsList] = useState<any[]>([]);

// //   const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
// //     null,
// //   );
// //   const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

// //   const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
// //   const [selectedLessonName, setSelectedLessonName] = useState<string>("");

// //   const [cards, setCards] = useState<any[]>([]);
// //   const [totalCardsCount, setTotalCardsCount] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     loadInitialData();
// //     if (navigation) {
// //       const unsubscribe = navigation.addListener("focus", () => {
// //         loadInitialData();
// //       });
// //       return unsubscribe;
// //     }
// //   }, [navigation]);

// //   // විෂයයන් සහ මුළු කාඩ්පත් ගණන ලෝඩ් කිරීම
// //   const loadInitialData = async () => {
// //     try {
// //       // මුළු කාඩ්පත් ගණන ලබා ගැනීම
// //       const countRes: any = await db.getAllAsync(
// //         "SELECT COUNT(*) as count FROM flashcards;",
// //       );
// //       if (countRes && countRes.length > 0) {
// //         setTotalCardsCount(countRes[0].count);
// //       }

// //       // විෂයයන් ලෝඩ් කිරීම
// //       const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
// //       setSubjectsList(subs || []);

// //       if (subs && subs.length > 0) {
// //         // පළමු විෂය පෙරනිමියෙන් තෝරා ගැනීම
// //         if (!selectedSubjectId) {
// //           setSelectedSubjectId(subs[0].id);
// //           setSelectedSubjectName(subs[0].name);
// //           loadLessonsForSubject(subs[0].id);
// //         } else {
// //           // දැනටමත් තෝරා ඇති විෂය පවතී නම් එහි පාඩම් ලෝඩ් කරන්න
// //           loadLessonsForSubject(selectedSubjectId);
// //         }
// //       } else {
// //         setSubjectsList([]);
// //         setLessonsList([]);
// //         setCards([]);
// //       }
// //     } catch (err) {
// //       console.log("Error loading initial data:", err);
// //     }
// //   };

// //   // අදාළ විෂයට ඇති පාඩම් ලෝඩ් කිරීම
// //   const loadLessonsForSubject = async (subId: number) => {
// //     try {
// //       const less: any = await db.getAllAsync(
// //         "SELECT * FROM lessons WHERE subject_id = ?;",
// //         [subId],
// //       );
// //       setLessonsList(less || []);

// //       if (less && less.length > 0) {
// //         // පළමු පාඩම පෙරනිමියෙන් තෝරන්න (හෝ පැවති පාඩම තබාගන්න)
// //         setSelectedLessonId(less[0].id);
// //         setSelectedLessonName(less[0].name);
// //         fetchCards(subId, less[0].id);
// //       } else {
// //         setSelectedLessonId(null);
// //         setSelectedLessonName("");
// //         setCards([]);
// //       }
// //     } catch (err) {
// //       console.log("Error loading lessons:", err);
// //     }
// //   };

// //   // ඩේටාබේස් එකෙන් අදාළ විෂය සහ පාඩමට අදාළ කාඩ්ස් ෆෙච් කිරීම
// //   const fetchCards = async (subId: number, lesId: number) => {
// //     try {
// //       setLoading(true);
// //       const result: any = await db.getAllAsync(
// //         "SELECT * FROM flashcards WHERE subject_id = ? AND lesson_id = ?;",
// //         [subId, lesId],
// //       );
// //       setCards(result || []);
// //     } catch (error) {
// //       console.log("Error fetching filtered cards:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={[styles.container, { backgroundColor: colors.background }]}>
// //       {/* Top Header with Total Cards Count Badge */}
// //       <View style={styles.header}>
// //         <Text style={[styles.headerTitle, { color: colors.text }]}>
// //           කාඩ්පත් ලැයිස්තුව (Browse)
// //         </Text>
// //         <View
// //           style={[
// //             styles.totalBadge,
// //             {
// //               backgroundColor: colors.primary + "20",
// //               borderColor: colors.primary,
// //             },
// //           ]}
// //         >
// //           <Ionicons name="albums-outline" size={13} color={colors.primary} />
// //           <Text style={[styles.totalBadgeText, { color: colors.primary }]}>
// //             මුළු කාඩ්: {totalCardsCount}
// //           </Text>
// //         </View>
// //       </View>

// //       {/* Subject Selection Chips */}
// //       <View style={styles.sectionContainer}>
// //         <Text style={[styles.label, { color: colors.text }]}>විෂය තෝරන්න:</Text>
// //         <ScrollView
// //           horizontal
// //           showsHorizontalScrollIndicator={false}
// //           style={styles.chipScroll}
// //         >
// //           {subjectsList.map((subj) => (
// //             <TouchableOpacity
// //               key={subj.id}
// //               style={[
// //                 styles.chip,
// //                 { borderColor: colors.primary },
// //                 selectedSubjectId === subj.id && {
// //                   backgroundColor: colors.primary,
// //                 },
// //               ]}
// //               onPress={() => {
// //                 setSelectedSubjectId(subj.id);
// //                 setSelectedSubjectName(subj.name);
// //                 loadLessonsForSubject(subj.id);
// //               }}
// //             >
// //               <Text
// //                 style={{
// //                   color: selectedSubjectId === subj.id ? "#fff" : colors.text,
// //                   fontWeight: "bold",
// //                   fontSize: 12,
// //                 }}
// //               >
// //                 {subj.name}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>
// //       </View>

// //       {/* Lesson Selection Chips */}
// //       {selectedSubjectId !== null && lessonsList.length > 0 && (
// //         <View style={styles.sectionContainer}>
// //           <Text style={[styles.label, { color: colors.text }]}>
// //             පාඩම තෝරන්න:
// //           </Text>
// //           {/* <ScrollView
// //             horizontal
// //             showsHorizontalScrollIndicator={false}
// //             style={styles.chipScroll}
// //           >
// //             {lessonsList.map((les) => (
// //               <TouchableOpacity
// //                 key={les.id}
// //                 style={[
// //                   styles.chip,
// //                   { borderColor: colors.primary },
// //                   selectedLessonId === les.id && {
// //                     backgroundColor: colors.primary,
// //                   },
// //                 ]}
// //                 onPress={() => {
// //                   setSelectedLessonId(les.id);
// //                   setSelectedLessonName(les.name);
// //                   fetchCards(selectedSubjectId, les.id);
// //                 }}
// //               >
// //                 <Text
// //                   style={{
// //                     color: selectedLessonId === les.id ? "#fff" : colors.text,
// //                     fontWeight: "bold",
// //                     fontSize: 12,
// //                   }}
// //                 >
// //                   {les.name}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </ScrollView> */}
// //           <View style={styles.lessonsGridContainer}>
// //             {lessonsList.map((les) => (
// //               <TouchableOpacity
// //                 key={les.id}
// //                 style={[
// //                   styles.lessonChipGrid,
// //                   selectedLessonId === les.id && {
// //                     backgroundColor: colors.primary,
// //                     borderColor: colors.primary,
// //                   },
// //                 ]}
// //                 onPress={() => setSelectedLessonId(les.id)}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.lessonChipText,
// //                     {
// //                       color:
// //                         selectedLessonId === les.id ? "#ffffff" : colors.text,
// //                     },
// //                   ]}
// //                 >
// //                   {les.name}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         </View>
// //       )}

// //       {/* Cards List */}
// //       <View style={styles.listContainer}>
// //         <Text style={[styles.subTitle, { color: colors.primary }]}>
// //           {selectedSubjectName || "විෂය"} - {selectedLessonName || "පාඩම"}{" "}
// //           (කාඩ්පත් {cards.length} ක් ඇත)
// //         </Text>

// //         {cards.length === 0 ? (
// //           <View style={styles.emptyContainer}>
// //             <Ionicons
// //               name="documents-outline"
// //               size={48}
// //               color={colors.text + "50"}
// //             />
// //             <Text style={[styles.emptyText, { color: colors.text }]}>
// //               මෙම පාඩමට තවම කාඩ් එකතු කර නැත.
// //             </Text>
// //           </View>
// //         ) : (
// //           <FlatList
// //             data={cards}
// //             keyExtractor={(item) => item.id.toString()}
// //             renderItem={({ item, index }) => (
// //               <TouchableOpacity
// //                 style={[
// //                   styles.cardItem,
// //                   {
// //                     backgroundColor: colors.cardBackground,
// //                     borderColor: colors.tint + "30",
// //                   },
// //                 ]}
// //                 activeOpacity={0.8}
// //                 onPress={() =>
// //                   router.push({
// //                     pathname: "/card-detail",
// //                     params: { id: item.id },
// //                   })
// //                 }
// //               >
// //                 <View style={styles.cardHeaderRow}>
// //                   <Text style={[styles.cardIndex, { color: colors.primary }]}>
// //                     #{index + 1}
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       styles.cardTypeBadge,
// //                       { color: colors.text + "80" },
// //                     ]}
// //                   >
// //                     ප්‍රශ්න වර්ගය: {item.questionType}
// //                   </Text>
// //                 </View>

// //                 <Text
// //                   style={[styles.cardContentPreview, { color: colors.text }]}
// //                   numberOfLines={2}
// //                 >
// //                   {item.questionType === "text"
// //                     ? item.questionContent
// //                     : item.questionType === "image"
// //                       ? "[පින්තූර ප්‍රශ්නයකි]"
// //                       : "[ශ්‍රව්‍ය ප්‍රශ්නයකි]"}
// //                 </Text>
// //               </TouchableOpacity>
// //             )}
// //             contentContainerStyle={{ paddingBottom: 30 }}
// //           />
// //         )}
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   lessonsGridContainer: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     gap: 8,
// //     marginTop: 6,
// //   },
// //   lessonChipGrid: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     borderRadius: 8,
// //     borderWidth: 1,
// //     borderColor: "#e5e7eb",
// //     marginBottom: 4,
// //   },
// //   lessonChipText: { fontSize: 12, fontWeight: "600" },
// //   container: { flex: 1, paddingTop: 40 },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 16,
// //     paddingBottom: 12,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ffffff10",
// //   },
// //   headerTitle: { fontSize: 18, fontWeight: "bold" },
// //   totalBadge: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 4,
// //     paddingHorizontal: 10,
// //     paddingVertical: 4,
// //     borderRadius: 12,
// //     borderWidth: 1,
// //   },
// //   totalBadgeText: { fontSize: 11, fontWeight: "bold" },
// //   sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
// //   label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
// //   chipScroll: { flexDirection: "row" },
// //   chip: {
// //     paddingVertical: 6,
// //     paddingHorizontal: 14,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     marginRight: 8,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   listContainer: { flex: 1, paddingHorizontal: 16, marginTop: 16 },
// //   subTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
// //   emptyContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingBottom: 50,
// //   },
// //   emptyText: { marginTop: 10, fontSize: 14 },
// //   cardItem: {
// //     padding: 14,
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     marginBottom: 10,
// //     elevation: 2,
// //   },
// //   cardHeaderRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 6,
// //   },
// //   cardIndex: { fontSize: 12, fontWeight: "bold" },
// //   cardTypeBadge: { fontSize: 11 },
// //   cardContentPreview: { fontSize: 15, lineHeight: 20 },
// // });
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import {
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useTheme } from "../../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function BrowseScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const navigation = useNavigation();

//   const [subjectsList, setSubjectsList] = useState<any[]>([]);
//   const [lessonsList, setLessonsList] = useState<any[]>([]);

//   const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
//     null,
//   );
//   const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

//   const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
//   const [selectedLessonName, setSelectedLessonName] = useState<string>("");

//   const [cards, setCards] = useState<any[]>([]);
//   const [totalCardsCount, setTotalCardsCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadInitialData(true); // මුල් වරට ලෝඩ් කරන විට true දෙන්න
//     if (navigation) {
//       const unsubscribe = navigation.addListener("focus", () => {
//         // ෆෝකස් වන විට මුළු කාඩ් ගණන සහ කාඩ්ස් පමණක් අප්ඩේට් කරන්න (පැවති තේරීම් මකා නොදමා)
//         refreshDataOnly();
//       });
//       return unsubscribe;
//     }
//   }, [navigation]);

//   // මුල් වරට විෂයයන් සහ ඩේටා ලෝඩ් කිරීම
//   const loadInitialData = async (isFirstLoad = false) => {
//     try {
//       const countRes: any = await db.getAllAsync(
//         "SELECT COUNT(*) as count FROM flashcards;",
//       );
//       if (countRes && countRes.length > 0) {
//         setTotalCardsCount(countRes[0].count);
//       }

//       const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
//       setSubjectsList(subs || []);

//       if (subs && subs.length > 0) {
//         if (isFirstLoad || selectedSubjectId === null) {
//           const firstSub = subs[0];
//           setSelectedSubjectId(firstSub.id);
//           setSelectedSubjectName(firstSub.name);
//           await loadLessonsForSubject(firstSub.id, true);
//         } else {
//           // දැනට තෝරා ඇති විෂය සහ පාඩම තිබේ නම් ඒවා පදනම් කරගෙන කාඩ්ස් රීෆ්‍රෙෂ් කරන්න
//           if (selectedLessonId !== null) {
//             fetchCards(selectedSubjectId, selectedLessonId);
//           }
//         }
//       } else {
//         setSubjectsList([]);
//         setLessonsList([]);
//         setCards([]);
//       }
//     } catch (err) {
//       console.log("Error loading initial data:", err);
//     }
//   };

//   // ආපසු Back වී එන විට තේරීම් නැවත වෙනස් නොකර ඩේටා පමණක් රීෆ්‍රෙෂ් කිරීමට
//   const refreshDataOnly = async () => {
//     try {
//       const countRes: any = await db.getAllAsync(
//         "SELECT COUNT(*) as count FROM flashcards;",
//       );
//       if (countRes && countRes.length > 0) {
//         setTotalCardsCount(countRes[0].count);
//       }

//       const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
//       setSubjectsList(subs || []);

//       if (selectedSubjectId !== null && selectedLessonId !== null) {
//         fetchCards(selectedSubjectId, selectedLessonId);
//       }
//     } catch (err) {
//       console.log("Error refreshing data:", err);
//     }
//   };

//   // අදාළ විෂයට ඇති පාඩම් ලෝඩ් කිරීම
//   const loadLessonsForSubject = async (subId: number, isFirstLoad = false) => {
//     try {
//       const less: any = await db.getAllAsync(
//         "SELECT * FROM lessons WHERE subject_id = ?;",
//         [subId],
//       );
//       setLessonsList(less || []);

//       if (less && less.length > 0) {
//         if (isFirstLoad || !less.some((l: any) => l.id === selectedLessonId)) {
//           setSelectedLessonId(less[0].id);
//           setSelectedLessonName(less[0].name);
//           fetchCards(subId, less[0].id);
//         }
//       } else {
//         setSelectedLessonId(null);
//         setSelectedLessonName("");
//         setCards([]);
//       }
//     } catch (err) {
//       console.log("Error loading lessons:", err);
//     }
//   };

//   // ඩේටාබේස් එකෙන් අදාළ විෂය සහ පාඩමට අදාළ කාඩ්ස් ෆෙච් කිරීම
//   const fetchCards = async (subId: number, lesId: number) => {
//     try {
//       setLoading(true);
//       const result: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE subject_id = ? AND lesson_id = ?;",
//         [subId, lesId],
//       );
//       setCards(result || []);
//     } catch (error) {
//       console.log("Error fetching filtered cards:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Top Header with Total Cards Count Badge */}
//       <View style={styles.header}>
//         <Text style={[styles.headerTitle, { color: colors.text }]}>
//           කාඩ්පත් ලැයිස්තුව (Browse)
//         </Text>
//         <View
//           style={[
//             styles.totalBadge,
//             {
//               backgroundColor: colors.primary + "20",
//               borderColor: colors.primary,
//             },
//           ]}
//         >
//           <Ionicons name="albums-outline" size={13} color={colors.primary} />
//           <Text style={[styles.totalBadgeText, { color: colors.primary }]}>
//             මුළු කාඩ්: {totalCardsCount}
//           </Text>
//         </View>
//       </View>

//       {/* Subject Selection Chips */}
//       <View style={styles.sectionContainer}>
//         <Text style={[styles.label, { color: colors.text }]}>විෂය තෝරන්න:</Text>
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
//                 { borderColor: colors.primary },
//                 selectedSubjectId === subj.id && {
//                   backgroundColor: colors.primary,
//                 },
//               ]}
//               onPress={() => {
//                 setSelectedSubjectId(subj.id);
//                 setSelectedSubjectName(subj.name);
//                 loadLessonsForSubject(subj.id, true);
//               }}
//             >
//               <Text
//                 style={{
//                   color: selectedSubjectId === subj.id ? "#fff" : colors.text,
//                   fontWeight: "bold",
//                   fontSize: 12,
//                 }}
//               >
//                 {subj.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Lesson Selection Chips */}
//       {selectedSubjectId !== null && lessonsList.length > 0 && (
//         <View style={styles.sectionContainer}>
//           <Text style={[styles.label, { color: colors.text }]}>
//             පාඩම තෝරන්න:
//           </Text>
//           <View style={styles.lessonsGridContainer}>
//             {lessonsList.map((les) => (
//               <TouchableOpacity
//                 key={les.id}
//                 style={[
//                   styles.lessonChipGrid,
//                   { borderColor: colors.primary + "50" },
//                   selectedLessonId === les.id && {
//                     backgroundColor: colors.primary,
//                     borderColor: colors.primary,
//                   },
//                 ]}
//                 onPress={() => {
//                   setSelectedLessonId(les.id);
//                   setSelectedLessonName(les.name);
//                   if (selectedSubjectId) {
//                     fetchCards(selectedSubjectId, les.id);
//                   }
//                 }}
//               >
//                 <Text
//                   style={[
//                     styles.lessonChipText,
//                     {
//                       color:
//                         selectedLessonId === les.id ? "#ffffff" : colors.text,
//                     },
//                   ]}
//                 >
//                   {les.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       )}

//       {/* Cards List */}
//       <View style={styles.listContainer}>
//         <Text style={[styles.subTitle, { color: colors.primary }]}>
//           {selectedSubjectName || "විෂය"} - {selectedLessonName || "පාඩම"}{" "}
//           (කාඩ්පත් {cards.length} ක් ඇත)
//         </Text>

//         {cards.length === 0 ? (
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="documents-outline"
//               size={48}
//               color={colors.text + "50"}
//             />
//             <Text style={[styles.emptyText, { color: colors.text }]}>
//               මෙම පාඩමට තවම කාඩ් එකතු කර නැත.
//             </Text>
//           </View>
//         ) : (
//           // <FlatList
//           //   data={cards}
//           //   keyExtractor={(item) => item.id.toString()}
//           //   renderItem={({ item, index }) => (
//           //     <TouchableOpacity
//           //       style={[
//           //         styles.cardItem,
//           //         {
//           //           backgroundColor: colors.cardBackground,
//           //           borderColor: colors.tint + "30",
//           //         },
//           //       ]}
//           //       activeOpacity={0.8}
//           //       onPress={() =>
//           //         router.push({
//           //           pathname: "/card-detail",
//           //           params: { id: item.id },
//           //         })
//           //       }
//           //     >
//           <FlatList
//             data={cards}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item, index }) => (
//               <TouchableOpacity
//                 style={[
//                   styles.cardItem,
//                   {
//                     backgroundColor: colors.cardBackground,
//                     borderColor: colors.tint + "30",
//                   },
//                 ]}
//                 activeOpacity={0.8}
//                 onPress={() => {
//                   // මේ ලැයිස්තුවේ ඇති සියලුම කාඩ්ස් වල ID ටික array එකක් ලෙස ලබා ගැනීම
//                   const allCardIds = cards.map((c) => c.id);
//                   router.push({
//                     pathname: "/card-detail",
//                     params: {
//                       id: item.id,
//                       cardIds: JSON.stringify(allCardIds), // IDs ටික යැවීම
//                       currentIndex: index, // වත්මන් ඉන්ඩෙක්ස් එක යැවීම
//                     },
//                   });
//                 }}
//               >
//                 <View style={styles.cardHeaderRow}>
//                   <Text style={[styles.cardIndex, { color: colors.primary }]}>
//                     #{index + 1}
//                   </Text>
//                   <Text
//                     style={[
//                       styles.cardTypeBadge,
//                       { color: colors.text + "80" },
//                     ]}
//                   >
//                     ප්‍රශ්න වර්ගය: {item.questionType}
//                   </Text>
//                 </View>

//                 <Text
//                   style={[styles.cardContentPreview, { color: colors.text }]}
//                   numberOfLines={2}
//                 >
//                   {item.questionType === "text"
//                     ? item.questionContent
//                     : item.questionType === "image"
//                       ? "[පින්තූර ප්‍රශ්නයකි]"
//                       : "[ශ්‍රව්‍ය ප්‍රශ්නයකි]"}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             contentContainerStyle={{ paddingBottom: 30 }}
//           />
//         )}
//       </View>
//     </View>
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
//     marginBottom: 4,
//   },
//   lessonChipText: { fontSize: 12, fontWeight: "600" },
//   container: { flex: 1, paddingTop: 40 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ffffff10",
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold" },
//   totalBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     borderWidth: 1,
//   },
//   totalBadgeText: { fontSize: 11, fontWeight: "bold" },
//   sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
//   label: { fontSize: 13, fontWeight: "bold", marginBottom: 6 },
//   chipScroll: { flexDirection: "row" },
//   chip: {
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     borderWidth: 1,
//     marginRight: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listContainer: { flex: 1, paddingHorizontal: 16, marginTop: 16 },
//   subTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: 50,
//   },
//   emptyText: { marginTop: 10, fontSize: 14 },
//   cardItem: {
//     padding: 14,
//     borderRadius: 10,
//     borderWidth: 1,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },
//   cardIndex: { fontSize: 12, fontWeight: "bold" },
//   cardTypeBadge: { fontSize: 11 },
//   cardContentPreview: { fontSize: 15, lineHeight: 20 },
// });

// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect, useRouter } from "expo-router";
// import * as SQLite from "expo-sqlite";
// import { useCallback, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useTheme } from "../../context/ThemeContext";

// const db = SQLite.openDatabaseSync("flashcards.db");

// export default function TodayScreen() {
//   const { colors } = useTheme();
//   const router = useRouter();
//   const [todayCards, setTodayCards] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // පේජ් එකට ඇතුළු වන සෑම විටම අද දිනට අදාළ කාඩ්පත් ලෝඩ් කරගැනීම
//   useFocusEffect(
//     useCallback(() => {
//       fetchTodayCards();
//     }, []),
//   );

//   const fetchTodayCards = async () => {
//     try {
//       setLoading(true);
//       // reminderEnabled = 1 ඇති සහ අද දිනට මතක් කළ යුතු කාඩ්පත් ලබා ගැනීම
//       const results: any = await db.getAllAsync(
//         "SELECT * FROM flashcards WHERE reminderEnabled = -1;",
//       );
//       // const results: any = await db.getAllAsync("SELECT * FROM flashcards ");
//       setTodayCards(results || []);
//       console.log("Fetched today reminder cards:", results);
//     } catch (error) {
//       console.log("Error fetching today reminder cards:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header Banner */}
//       <View style={[styles.headerCard, { backgroundColor: colors.primary }]}>
//         <View>
//           <Text style={styles.headerSmall}>Today's Revision 📅</Text>
//           <Text style={styles.headerTitle}>අද මතක් කළ යුතු කාඩ්</Text>
//         </View>
//         <View style={styles.badgePill}>
//           <Ionicons
//             name="notifications-outline"
//             size={16}
//             color={colors.primary}
//           />
//           <Text style={[styles.badgeText, { color: colors.primary }]}>
//             {todayCards.length} Cards
//           </Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         <View style={styles.listContainer}>
//           {todayCards.length === 0 ? (
//             <View
//               style={[
//                 styles.emptyContainer,
//                 {
//                   backgroundColor: colors.cardBackground,
//                   borderColor: colors.tint + "20",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name="checkmark-circle-outline"
//                 size={54}
//                 color={colors.primary}
//               />
//               <Text style={[styles.emptyTitle, { color: colors.text }]}>
//                 සියලුම කාඩ්පත් පුනරීක්ෂණය කර අවසන්!
//               </Text>
//               <Text style={[styles.emptySub, { color: colors.tint }]}>
//                 අද දිනට මතක් කිරීමට තවදුරටත් කාඩ්පත් නොමැත.
//               </Text>
//             </View>
//           ) : (
//             todayCards.map((item, index) => (
//               <TouchableOpacity
//                 key={item.id}
//                 style={[
//                   styles.cardItem,
//                   {
//                     backgroundColor: colors.cardBackground,
//                     borderColor: colors.tint + "20",
//                   },
//                 ]}
//                 activeOpacity={0.9}
//                 onPress={() => {
//                   const allCardIds = todayCards.map((c) => c.id);
//                   router.push({
//                     pathname: "/card-detail",
//                     params: {
//                       id: item.id,
//                       cardIds: JSON.stringify(allCardIds),
//                       currentIndex: index,
//                     },
//                   });
//                 }}
//               >
//                 <View style={styles.cardHeaderRow}>
//                   <View
//                     style={[
//                       styles.indexBadge,
//                       { backgroundColor: colors.primary + "15" },
//                     ]}
//                   >
//                     <Text style={[styles.cardIndex, { color: colors.primary }]}>
//                       කාඩ් අංකය #{index + 1}
//                     </Text>
//                   </View>
//                   <View
//                     style={[
//                       styles.reminderPill,
//                       { backgroundColor: colors.primary + "20" },
//                     ]}
//                   >
//                     <Ionicons
//                       name="time-outline"
//                       size={12}
//                       color={colors.primary}
//                     />
//                     <Text
//                       style={[styles.reminderText, { color: colors.primary }]}
//                     >
//                       දින {item.reminderDays || 1} කින්
//                     </Text>
//                   </View>
//                 </View>

//                 <Text
//                   style={[styles.cardContentPreview, { color: colors.text }]}
//                   numberOfLines={2}
//                 >
//                   {item.questionType === "text"
//                     ? item.questionContent
//                     : item.questionType === "image"
//                       ? "[පින්තූර ප්‍රශ්නයකි]"
//                       : "[ශ්‍රව්‍ය හඬ පටිගත කිරීමකි]"}
//                 </Text>
//               </TouchableOpacity>
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 45 },
//   headerCard: {
//     marginHorizontal: 16,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//   },
//   headerSmall: { color: "#fff", fontSize: 12, opacity: 0.9, fontWeight: "600" },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 2,
//   },
//   badgePill: {
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 14,
//   },
//   badgeText: { fontSize: 12, fontWeight: "bold" },
//   listContainer: { paddingHorizontal: 16, marginTop: 20 },
//   emptyContainer: {
//     padding: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   emptyTitle: {
//     marginTop: 14,
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   emptySub: { marginTop: 6, fontSize: 13, textAlign: "center", opacity: 0.8 },
//   cardItem: {
//     padding: 16,
//     borderRadius: 16,
//     borderWidth: 1,
//     marginBottom: 14,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   indexBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//   },
//   cardIndex: { fontSize: 11, fontWeight: "bold" },
//   reminderPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 6,
//   },
//   reminderText: { fontSize: 10, fontWeight: "bold" },
//   cardContentPreview: { fontSize: 15, lineHeight: 22, fontWeight: "500" },
// });

import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

const db = SQLite.openDatabaseSync("flashcards.db");

export default function TodayScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [todayCards, setTodayCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // පේජ් එකට ඇතුළු වන සෑම විටම අද දිනට අදාළ කාඩ්පත් ලෝඩ් කරගැනීම
  useFocusEffect(
    useCallback(() => {
      fetchTodayCards();
    }, []),
  );

  const fetchTodayCards = async () => {
    try {
      setLoading(true);

      // 1. වත්මන් දිනය ලබා ගැනීම ("YYYY-MM-DD" ආකෘතියෙන්)
      const todayStr = new Date().toISOString().split("T")[0];

      // 2. reminderNextDate එක අද දිනට සමාන හෝ අදට වඩා පැරණි (miss වුණු) කාඩ්පත් ලබා ගැනීම
      // const results: any = await db.getAllAsync(
      //   "SELECT * FROM flashcards WHERE reminderEnabled = 1 AND reminderNextDate <= ?;",
      //   [todayStr],
      // );
      const results: any = await db.getAllAsync(
        "SELECT * FROM flashcards WHERE reminderNextDate = ?;",
        [todayStr],
      );

      setTodayCards(results || []);
    } catch (error) {
      console.log("Error fetching today reminder cards:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Banner */}
      <View style={[styles.headerCard, { backgroundColor: colors.primary }]}>
        <View>
          {/* <Text style={styles.headerSmall}>
            {" "}
            {t("todayCards", "header")} 📅
          </Text> */}
          <Text style={styles.headerTitle}> {t("todayCards", "title")} 📅</Text>
        </View>
        <View style={styles.badgePill}>
          <Ionicons
            name="notifications-outline"
            size={16}
            color={colors.primary}
          />
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {todayCards.length} {t("homepage", "totalCards")}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.listContainer}>
          {todayCards.length === 0 ? (
            <View
              style={[
                styles.emptyContainer,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.tint + "20",
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={54}
                color={colors.primary}
              />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                {t("todayCards", "alreadyDone")}
              </Text>
              <Text style={[styles.emptySub, { color: colors.tint }]}>
                {t("todayCards", "noCardsMessage")}
              </Text>
            </View>
          ) : (
            todayCards.map((item, index) => (
              // <TouchableOpacity
              //   key={item.id}
              //   style={[
              //     styles.cardItem,
              //     {
              //       backgroundColor: colors.cardBackground,
              //       borderColor: colors.tint + "20",
              //     },
              //   ]}
              //   activeOpacity={0.9}
              //   onPress={() => {
              //     const allCardIds = todayCards.map((c) => c.id);
              //     router.push({
              //       pathname: "/card-detail",
              //       params: {
              //         id: item.id,
              //         cardIds: JSON.stringify(allCardIds),
              //         currentIndex: index,
              //       },
              //     });
              //   }}
              // >
              //   <View style={styles.cardHeaderRow}>
              //     <View
              //       style={[
              //         styles.indexBadge,
              //         { backgroundColor: colors.primary + "15" },
              //       ]}
              //     >
              //       <Text style={[styles.cardIndex, { color: colors.primary }]}>
              //         {t("common", "card")} #{index + 1}
              //       </Text>
              //     </View>
              //     <View
              //       style={[
              //         styles.reminderPill,
              //         { backgroundColor: colors.primary + "20" },
              //       ]}
              //     >
              //       <Ionicons
              //         name="time-outline"
              //         size={12}
              //         color={colors.primary}
              //       />
              //       <Text
              //         style={[styles.reminderText, { color: colors.primary }]}
              //       >
              //         {item.reminderDays === "-1" || item.reminderDays === -1
              //           ? "අද දින"
              //           : `දින ${item.reminderDays} කින්`}
              //       </Text>
              //     </View>
              //   </View>

              //   <Text
              //     style={[styles.cardContentPreview, { color: colors.text }]}
              //     numberOfLines={2}
              //   >
              //     {item.questionType === "text"
              //       ? item.questionContent
              //       : item.questionType === "image"
              //         ? "[පින්තූර ප්‍රශ්නයකි]"
              //         : "[ශ්‍රව්‍ය හඬ පටිගත කිරීමකි]"}
              //   </Text>
              // </TouchableOpacity>
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.cardItem,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.tint + "20",
                  },
                ]}
                activeOpacity={0.85}
                onPress={() => {
                  const allCardIds = todayCards.map((c) => c.id);
                  router.push({
                    pathname: "/card-detail",
                    params: {
                      id: item.id,
                      cardIds: JSON.stringify(allCardIds),
                      currentIndex: index,
                    },
                  });
                }}
              >
                {/* 🌟 වම් පැත්තේ ලස්සන අයිකන් හෝ මීඩියා ප්‍රිව്യൂ බොක්ස් එක */}
                <View
                  style={[
                    styles.cardLeftIndicator,
                    { backgroundColor: colors.primary + "12" },
                  ]}
                >
                  <Ionicons
                    name={
                      item.questionType === "image"
                        ? "image-outline"
                        : item.questionType === "voice"
                          ? "mic-outline"
                          : "book-outline"
                    }
                    size={22}
                    color={colors.primary}
                  />
                </View>

                {/* මැද සහ දකුණු පැත්තේ ප්‍රශ්න විස්තර */}
                <View style={styles.cardInfoSection}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={[styles.cardIndex, { color: colors.primary }]}>
                      Flashcard #{index + 1}
                    </Text>
                    <View
                      style={[
                        styles.typePill,
                        { backgroundColor: colors.primary + "15" },
                      ]}
                    >
                      <Text
                        style={[styles.typeText, { color: colors.primary }]}
                      >
                        {item.questionType}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[styles.cardContentPreview, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {item.questionType === "text"
                      ? item.questionContent
                        ? item.questionContent
                        : t("common", "emppty")
                      : item.questionType === "image"
                        ? "🖼️ Image Question"
                        : "🎙️ Voice Note"}
                  </Text>
                </View>

                {/* දකුණු පැත්තෙන් ඇතුළට යාමට උදව් වන කුඩා ඊතල අයිකන් එක */}
                <View style={styles.cardArrowBox}>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.tint}
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 45 },
  headerCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerSmall: { color: "#fff", fontSize: 12, opacity: 0.9, fontWeight: "600" },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  badgePill: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  badgeText: { fontSize: 12, fontWeight: "bold" },
  listContainer: { paddingHorizontal: 16, marginTop: 20 },
  emptyContainer: {
    padding: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyTitle: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptySub: { marginTop: 6, fontSize: 13, textAlign: "center", opacity: 0.8 },
  // cardItem: {
  //   padding: 16,
  //   borderRadius: 16,
  //   borderWidth: 1,
  //   marginBottom: 14,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.05,
  //   shadowRadius: 4,
  // },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  cardLeftIndicator: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfoSection: {
    flex: 1,
    justifyContent: "center",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardIndex: { fontSize: 11, fontWeight: "bold", letterSpacing: 0.5 },
  typePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: { fontSize: 9, fontWeight: "bold", textTransform: "uppercase" },
  // cardHeaderRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 8,
  // },
  indexBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  // cardIndex: { fontSize: 11, fontWeight: "bold" },
  reminderPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  reminderText: { fontSize: 10, fontWeight: "bold" },
  cardContentPreview: { fontSize: 15, lineHeight: 22, fontWeight: "500" },
});
