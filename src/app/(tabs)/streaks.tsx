// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
// import { checkAndUpdateStreak, StreakData } from "../../utils/streakManager";

// const { width } = Dimensions.get("window");

// const MILESTONES = [1, 3, 7, 14, 20, 30, 50, 75, 100];

// export default function StreakScreen() {
//   const [streakData, setStreakData] = useState<StreakData>({
//     currentStreak: 0,
//     lastActiveDate: "",
//     completedDates: [],
//   });

//   useEffect(() => {
//     loadStreak();
//   }, []);

//   const loadStreak = async () => {
//     const data = await checkAndUpdateStreak();
//     setStreakData(data);
//   };

//   return (
//     <View style={styles.container}>
//       {/* උඩම තියෙන Streak Counter Card එක */}
//       <View style={styles.streakHeaderCard}>
//         <View style={styles.fireCircle}>
//           <Text style={styles.fireEmoji}>🔥</Text>
//         </View>
//         <Text style={styles.streakCountNumber}>{streakData.currentStreak}</Text>
//         <Text style={styles.streakTitle}>දින වල අඛණ්ඩ Streak එකක්!</Text>
//         <Text style={styles.streakSubText}>
//           {streakData.currentStreak > 0
//             ? "නියමයි! අදත් දවස සාර්ථක කරගන්න දිගටම කරන්න."
//             : "අද දවසේ පළමු Flashcard එක සම්පූර්ණ කර ඔබේ Streak එක අරඹන්න!"}
//         </Text>
//       </View>

//       {/* ඩුයින්ගෝ විදිහට හොරිසන්ටල් ස්කොල් වෙන Timeline එක */}
//       <Text style={styles.sectionTitle}>🏆 ඔබේ මයිල්ස්ටෝන්ස් (Milestones)</Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.timelineContainer}
//       >
//         {MILESTONES.map((targetDays, index) => {
//           const isCompleted = streakData.currentStreak >= targetDays;
//           const isCurrentTarget =
//             streakData.currentStreak < targetDays &&
//             (index === 0 || streakData.currentStreak >= MILESTONES[index - 1]);

//           return (
//             <View key={targetDays} style={styles.milestoneItem}>
//               <View
//                 style={[
//                   styles.milestoneNode,
//                   isCompleted
//                     ? styles.completedNode
//                     : isCurrentTarget
//                       ? styles.currentNode
//                       : styles.lockedNode,
//                 ]}
//               >
//                 {isCompleted ? (
//                   <Ionicons name="checkmark" size={24} color="#fff" />
//                 ) : isCurrentTarget ? (
//                   <MaterialCommunityIcons name="fire" size={26} color="#fff" />
//                 ) : (
//                   <Ionicons name="lock-closed" size={20} color="#94a3b8" />
//                 )}
//               </View>
//               <Text
//                 style={[
//                   styles.milestoneText,
//                   isCompleted && styles.completedText,
//                 ]}
//               >
//                 දින {targetDays}
//               </Text>
//               <Text style={styles.milestoneStatus}>
//                 {isCompleted
//                   ? "සාර්ථකයි!"
//                   : isCurrentTarget
//                     ? "ඉලක්කය"
//                     : "අගුළු දමා ඇත"}
//               </Text>
//             </View>
//           );
//         })}
//       </ScrollView>

//       {/* දිනපතා ස්ටේටස් විස්තරය */}
//       <View style={styles.infoCard}>
//         <Ionicons
//           name="information-circle-outline"
//           style={styles.infoIcon}
//           size={22}
//           color="#f59e0b"
//         />
//         <Text style={styles.infoText}>
//           මතක තබා ගන්න: සෑම දිනකම රාත්‍රී 11:00 ට පෙර අවම වශයෙන් එක් ෆ්ලෑෂ් කාඩ්
//           එකක්වත් සම්පූර්ණ කළහොත් පමණක් ඔබේ ස්ට්‍රීක් එක ඉදිරියට යනු ඇත.
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     padding: 16,
//   },
//   streakHeaderCard: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 24,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#f1f5f9",
//   },
//   fireCircle: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#fff7ed",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     borderWidth: 2,
//     borderColor: "#ffedd5",
//   },
//   fireEmoji: {
//     fontSize: 36,
//   },
//   streakCountNumber: {
//     fontSize: 38,
//     fontWeight: "900",
//     color: "#ea580c",
//     marginBottom: 4,
//   },
//   streakTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1e293b",
//     marginBottom: 6,
//   },
//   streakSubText: {
//     fontSize: 13,
//     color: "#64748b",
//     textAlign: "center",
//     paddingHorizontal: 10,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#334155",
//     marginBottom: 12,
//     marginLeft: 4,
//   },
//   timelineContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 4,
//     gap: 16,
//   },
//   milestoneItem: {
//     alignItems: "center",
//     width: 95,
//   },
//   milestoneNode: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   completedNode: {
//     backgroundColor: "#22c55e", // Green for done
//   },
//   currentNode: {
//     backgroundColor: "#f97316", // Orange for current active target
//     borderWidth: 3,
//     borderColor: "#ffedd5",
//   },
//   lockedNode: {
//     backgroundColor: "#e2e8f0", // Gray for locked
//   },
//   milestoneText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#475569",
//   },
//   completedText: {
//     color: "#22c55e",
//   },
//   milestoneStatus: {
//     fontSize: 11,
//     color: "#94a3b8",
//     marginTop: 2,
//   },
//   infoCard: {
//     flexDirection: "row",
//     backgroundColor: "#fffbeb",
//     borderRadius: 14,
//     padding: 16,
//     alignItems: "center",
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#fef3c7",
//   },
//   infoIcon: {
//     marginRight: 12,
//   },
//   infoText: {
//     flex: 1,
//     fontSize: 12,
//     color: "#92400e",
//     lineHeight: 18,
//   },
// });

// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Notifications from "expo-notifications";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { checkAndUpdateStreak, StreakData } from "../../utils/streakManager";

// const { width } = Dimensions.get("window");
// const MILESTONES = [1, 3, 7, 14, 20, 30, 50, 75, 100];

// export default function StreakScreen() {
//   const [streakData, setStreakData] = useState<StreakData>({
//     currentStreak: 0,
//     lastActiveDate: "",
//     completedDates: [],
//   });

//   useEffect(() => {
//     loadStreak();
//     requestNotificationPermission();
//   }, []);

//   const loadStreak = async () => {
//     // streakManager එක මඟින් ස්ට්‍රීක් එක චෙක් කර ඩේටා ලබා ගැනීම
//     const data = await checkAndUpdateStreak();
//     if (data) {
//       setStreakData(data);
//     }
//   };

//   // 🔔 නොටිෆිකේෂන් පර්මිෂන් ලබා ගැනීම
//   const requestNotificationPermission = async () => {
//     const { status } = await Notifications.requestPermissionsAsync();
//     if (status !== "granted") {
//       console.log("Notification permissions not granted!");
//     }
//   };

//   // 🚀 ටෙස්ට් නොටිෆිකේෂන් එකක් යැවීම
//   const sendTestNotification = async () => {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "🔥 Streak Reminder!",
//           body: "අද දවසේ ඔබේ Flashcard එක සම්පූර්ණ කර Streak එක රැකගන්න!",
//           sound: true,
//         },
//         trigger: null,
//       });
//       Alert.alert("සාර්ථකයි! 🎉", "ටෙස්ට් නොටිෆිකේෂන් එක යවන ලදී.");
//     } catch (error) {
//       console.log("Notification error:", error);
//       Alert.alert("දෝෂයක්!", "නොටිෆිකේෂන් එක යැවීමට නොහැකි විය.");
//     }
//   };

//   // 🛠️ ටෙස්ට් කිරීමට Streak එක +1කින් වැඩි කිරීම
//   const addTestStreak = async () => {
//     try {
//       const newStreak = streakData.currentStreak + 1;
//       const todayStr = new Date().toISOString().split("T")[0];

//       const updatedData: StreakData = {
//         currentStreak: newStreak,
//         lastActiveDate: todayStr,
//         completedDates: [...(streakData.completedDates || []), todayStr],
//       };

//       // streakManager භාවිතා කරන ප්‍රධාන AsyncStorage key එකට (සාමාන්‍යයෙන් 'streak_data' හෝ සමාන එකකට) සේව් කිරීම
//       await AsyncStorage.setItem("streak_data", JSON.stringify(updatedData));

//       // UI එක ක්ෂණිකව අප්ඩේට් කිරීම
//       setStreakData(updatedData);
//     } catch (error) {
//       console.log("Error adding test streak:", error);
//     }
//   };

//   // 🛠️ Streak එක Reset (0) කිරීම
//   const resetTestStreak = async () => {
//     try {
//       const resetData: StreakData = {
//         currentStreak: 0,
//         lastActiveDate: "",
//         completedDates: [],
//       };

//       await AsyncStorage.setItem("streak_data", JSON.stringify(resetData));
//       setStreakData(resetData);
//     } catch (error) {
//       console.log("Error resetting streak:", error);
//     }
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: 30 }}
//     >
//       {/* උඩම තියෙන Streak Counter Card එක */}
//       <View style={styles.streakHeaderCard}>
//         <View style={styles.fireCircle}>
//           <Text style={styles.fireEmoji}>🔥</Text>
//         </View>
//         <Text style={styles.streakCountNumber}>{streakData.currentStreak}</Text>
//         <Text style={styles.streakTitle}>දින වල අඛණ්ඩ Streak එකක්!</Text>
//         <Text style={styles.streakSubText}>
//           {streakData.currentStreak > 0
//             ? "නියමයි! අදත් දවස සාර්ථක කරගන්න දිගටම කරන්න."
//             : "අද දවසේ පළමු Flashcard එක සම්පූර්ණ කර ඔබේ Streak එක අරඹන්න!"}
//         </Text>

//         {/* 🛠️ ටෙස්ට් බටන්ස් (Testing Controls) */}
//         <View style={styles.testButtonsContainer}>
//           <TouchableOpacity
//             style={styles.testBtnPrimary}
//             onPress={addTestStreak}
//           >
//             <Text style={styles.testBtnText}>+ Streak 1ක් එකතු කරන්න</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.testBtnDanger}
//             onPress={resetTestStreak}
//           >
//             <Text style={styles.testBtnText}>Reset (0)</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 🔔 ටෙස්ට් නොටිෆිකේෂන් බටන් එක */}
//         <TouchableOpacity
//           style={styles.testNotificationBtn}
//           onPress={sendTestNotification}
//         >
//           <Ionicons
//             name="notifications-outline"
//             size={18}
//             color="#fff"
//             style={{ marginRight: 6 }}
//           />
//           <Text style={styles.testNotificationText}>
//             Test Notification එකක් එවන්න
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* ඩුයින්ගෝ විදිහට හොරිසන්ටල් ස්කොල් වෙන Timeline එක */}
//       <Text style={styles.sectionTitle}>🏆 ඔබේ මයිල්ස්ටෝන්ස් (Milestones)</Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.timelineContainer}
//       >
//         {MILESTONES.map((targetDays, index) => {
//           const isCompleted = streakData.currentStreak >= targetDays;
//           const isCurrentTarget =
//             streakData.currentStreak < targetDays &&
//             (index === 0 || streakData.currentStreak >= MILESTONES[index - 1]);

//           return (
//             <View key={targetDays} style={styles.milestoneItem}>
//               <View
//                 style={[
//                   styles.milestoneNode,
//                   isCompleted
//                     ? styles.completedNode
//                     : isCurrentTarget
//                       ? styles.currentNode
//                       : styles.lockedNode,
//                 ]}
//               >
//                 {isCompleted ? (
//                   <Ionicons name="checkmark" size={24} color="#fff" />
//                 ) : isCurrentTarget ? (
//                   <MaterialCommunityIcons name="fire" size={26} color="#fff" />
//                 ) : (
//                   <Ionicons name="lock-closed" size={20} color="#94a3b8" />
//                 )}
//               </View>
//               <Text
//                 style={[
//                   styles.milestoneText,
//                   isCompleted && styles.completedText,
//                 ]}
//               >
//                 දින {targetDays}
//               </Text>
//               <Text style={styles.milestoneStatus}>
//                 {isCompleted
//                   ? "සාර්ථකයි!"
//                   : isCurrentTarget
//                     ? "ඉලක්කය"
//                     : "අගුළු දමා ඇත"}
//               </Text>
//             </View>
//           );
//         })}
//       </ScrollView>

//       {/* දිනපතා ස්ටේටස් විස්තරය */}
//       <View style={styles.infoCard}>
//         <Ionicons
//           name="information-circle-outline"
//           style={styles.infoIcon}
//           size={22}
//           color="#f59e0b"
//         />
//         <Text style={styles.infoText}>
//           මතක තබා ගන්න: සෑම දිනකම රාත්‍රී 11:00 ට පෙර අවම වශයෙන් එක් ෆ්ලෑෂ් කාඩ්
//           එකක්වත් සම්පූර්ණ කළහොත් පමණක් ඔබේ ස්ට්‍රීක් එක ඉදිරියට යනු ඇත.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     padding: 16,
//   },
//   streakHeaderCard: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 24,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#f1f5f9",
//   },
//   fireCircle: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#fff7ed",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     borderWidth: 2,
//     borderColor: "#ffedd5",
//   },
//   fireEmoji: {
//     fontSize: 36,
//   },
//   streakCountNumber: {
//     fontSize: 38,
//     fontWeight: "900",
//     color: "#ea580c",
//     marginBottom: 4,
//   },
//   streakTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1e293b",
//     marginBottom: 6,
//   },
//   streakSubText: {
//     fontSize: 13,
//     color: "#64748b",
//     textAlign: "center",
//     paddingHorizontal: 10,
//     marginBottom: 14,
//   },
//   testButtonsContainer: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 10,
//   },
//   testBtnPrimary: {
//     backgroundColor: "#ea580c",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   testBtnDanger: {
//     backgroundColor: "#ef4444",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   testBtnText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   testNotificationBtn: {
//     flexDirection: "row",
//     backgroundColor: "#3b82f6",
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 4,
//   },
//   testNotificationText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "bold",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#334155",
//     marginBottom: 12,
//     marginLeft: 4,
//   },
//   timelineContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 4,
//     gap: 16,
//   },
//   milestoneItem: {
//     alignItems: "center",
//     width: 95,
//   },
//   milestoneNode: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   completedNode: {
//     backgroundColor: "#22c55e",
//   },
//   currentNode: {
//     backgroundColor: "#f97316",
//     borderWidth: 3,
//     borderColor: "#ffedd5",
//   },
//   lockedNode: {
//     backgroundColor: "#e2e8f0",
//   },
//   milestoneText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#475569",
//   },
//   completedText: {
//     color: "#22c55e",
//   },
//   milestoneStatus: {
//     fontSize: 11,
//     color: "#94a3b8",
//     marginTop: 2,
//   },
//   infoCard: {
//     flexDirection: "row",
//     backgroundColor: "#fffbeb",
//     borderRadius: 14,
//     padding: 16,
//     alignItems: "center",
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#fef3c7",
//   },
//   infoIcon: {
//     marginRight: 12,
//   },
//   infoText: {
//     flex: 1,
//     fontSize: 12,
//     color: "#92400e",
//     lineHeight: 18,
//   },
// });

// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import DateTimePicker from "@react-native-community/datetimepicker"; // 🌟 Time Picker එක ඉම්පෝට් කිරීම
// import * as Notifications from "expo-notifications";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Dimensions,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { scheduleCustomReminderNotification } from "../../utils/backgroundNotification";

// const { width } = Dimensions.get("window");
// const MILESTONES = [1, 3, 7, 14, 20, 30, 50, 75, 100];

// export default function StreakScreen() {
//   const [currentStreak, setCurrentStreak] = useState<number>(0);

//   // 🌟 රීමින්ඩර් වෙලාව සඳහා State (സ്ഥිර පෙරනිමි වෙලාව: රාත්‍රී 8:00 හෝ උදේ 4:00)

//   const [reminderTime, setReminderTime] = useState<Date>(
//     new Date(new Date().setHours(22, 0, 0, 0)),
//   );
//   const [showPicker, setShowPicker] = useState<boolean>(false);

//   useEffect(() => {
//     loadStreakAndReminder();
//     requestNotificationPermission();
//   }, []);

//   const loadStreakAndReminder = async () => {
//     try {
//       // 1. Streak එක ලෝඩ් කරගැනීම
//       const storedStreak = await AsyncStorage.getItem("streakCount");
//       const streakNum = storedStreak !== null ? parseInt(storedStreak, 10) : 0;
//       setCurrentStreak(streakNum);

//       // 2. සේව් කරපු රීමින්ඩර් වෙලාව ලෝඩ් කරගැනීම
//       const savedTime = await AsyncStorage.getItem("reminderTime");
//       if (savedTime) {
//         const timeObj = new Date(savedTime);
//         setReminderTime(timeObj);
//         // එම වෙලාවට නොටිෆිකේෂන් එක ෂෙඩියුල් කිරීම
//         scheduleCustomReminderNotification(
//           timeObj.getHours(),
//           timeObj.getMinutes(),
//         );
//       } else {
//         // 🌟 කිසිවක් සේව් කර නැත්නම් ඩිෆෝල්ට් එකෙන් රාත්‍රී 10:00 (22:00) සෙට් කිරීම
//         const defaultTime = new Date();
//         defaultTime.setHours(22, 0, 0, 0);
//         setReminderTime(defaultTime);

//         await AsyncStorage.setItem("reminderTime", defaultTime.toISOString());
//         scheduleCustomReminderNotification(22, 0);
//       }
//     } catch (error) {
//       console.log("Error loading data:", error);
//     }
//   };

//   const requestNotificationPermission = async () => {
//     const { status } = await Notifications.requestPermissionsAsync();
//     if (status !== "granted") {
//       console.log("Notification permissions not granted!");
//     }
//   };

//   // 🌟 යූසර් වෙනත් වෙලාවක් තෝරාගත් විට ක්‍රියාත්මක වේ
//   const onTimeChange = async (event: any, selectedDate?: Date) => {
//     setShowPicker(Platform.OS === "ios"); // Android වල ොපිඅර් එක ක්ලෝස් වීමට
//     if (selectedDate) {
//       setReminderTime(selectedDate);

//       const hours = selectedDate.getHours();
//       const minutes = selectedDate.getMinutes();

//       // AsyncStorage එකේ වෙලාව සේව් කිරීම
//       await AsyncStorage.setItem("reminderTime", selectedDate.toISOString());

//       // අදාළ අලුත් වෙලාවට නොටිෆිකේෂන් එක ෂෙඩියුල් කිරීම
//       await scheduleCustomReminderNotification(hours, minutes);

//       const timeString = selectedDate.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       Alert.alert(
//         "සාර්ථකයි! ⏰",
//         `දිනපතා මතක් කිරීමේ වෙලාව ${timeString} ලෙස වෙනස් කරන ලදී.`,
//       );
//     }
//   };

//   const sendTestNotification = async () => {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "🔥 Streak Reminder!",
//           body: "අද දවසේ ඔබේ Flashcard එක සම්පූර්ණ කර Streak එක රැකගන්න!",
//           sound: true,
//         },
//         trigger: null,
//       });
//       Alert.alert("සාර්ථකයි! 🎉", "ටෙස්ට් නොටිෆිකේෂන් එක යවන ලදී.");
//     } catch (error) {
//       console.log("Notification error:", error);
//     }
//   };

//   const addTestStreak = async () => {
//     try {
//       const newStreak = currentStreak + 1;
//       const todayStr = new Date().toISOString().split("T")[0];

//       await AsyncStorage.setItem("streakCount", newStreak.toString());
//       await AsyncStorage.setItem("lastStreakDate", todayStr);

//       setCurrentStreak(newStreak);
//     } catch (error) {
//       console.log("Error adding test streak:", error);
//     }
//   };

//   const resetTestStreak = async () => {
//     try {
//       await AsyncStorage.setItem("streakCount", "0");
//       await AsyncStorage.removeItem("lastStreakDate");
//       setCurrentStreak(0);
//     } catch (error) {
//       console.log("Error resetting streak:", error);
//     }
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: 30 }}
//     >
//       {/* උඩම තියෙන Streak Counter Card එක */}
//       <View style={styles.streakHeaderCard}>
//         <View style={styles.fireCircle}>
//           <Text style={styles.fireEmoji}>🔥</Text>
//         </View>
//         <Text style={styles.streakCountNumber}>{currentStreak}</Text>
//         <Text style={styles.streakTitle}>දින වල අඛණ්ඩ Streak එකක්!</Text>
//         <Text style={styles.streakSubText}>
//           {currentStreak > 0
//             ? "නියමයි! අදත් දවස සාර්ථක කරගන්න දිගටම කරන්න."
//             : "අද දවසේ පළමු Flashcard එක සම්පූර්ණ කර ඔබේ Streak එක අරඹන්න!"}
//         </Text>

//         {/* ⏰ කාලවේලා (Reminder Time) තෝරන කොටස */}
//         <View style={styles.reminderCardSection}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.reminderLabel}>දිනපතා මතක් කිරීමේ වෙලාව:</Text>
//             <Text style={styles.reminderSubText}>
//               අද දවසේ ෆ්ලෑෂ් කාඩ් කර නැත්නම් මෙම වෙලාවට නොටිෆිකේෂන් එකක් එනු ඇත.
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={styles.timePickerButton}
//             onPress={() => setShowPicker(true)}
//           >
//             <Ionicons
//               name="time-outline"
//               size={18}
//               color="#ea580c"
//               style={{ marginRight: 6 }}
//             />
//             <Text style={styles.timePickerButtonText}>
//               {reminderTime.toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* DateTimePicker Componenet */}
//         {showPicker && (
//           <DateTimePicker
//             value={reminderTime}
//             mode="time"
//             is24Hour={false}
//             display="default"
//             onChange={onTimeChange}
//           />
//         )}

//         {/* 🛠️ ටෙස්ට් බටන්ස් */}
//         <View style={styles.testButtonsContainer}>
//           <TouchableOpacity
//             style={styles.testBtnPrimary}
//             onPress={addTestStreak}
//           >
//             <Text style={styles.testBtnText}>+ Streak 1ක් එකතු කරන්න</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.testBtnDanger}
//             onPress={resetTestStreak}
//           >
//             <Text style={styles.testBtnText}>Reset (0)</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 🔔 ටෙස්ට් නොටිෆිකේෂන් බටන් එක */}
//         <TouchableOpacity
//           style={styles.testNotificationBtn}
//           onPress={sendTestNotification}
//         >
//           <Ionicons
//             name="notifications-outline"
//             size={18}
//             color="#fff"
//             style={{ marginRight: 6 }}
//           />
//           <Text style={styles.testNotificationText}>
//             Test Notification එකක් එවන්න
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* මයිල්ස්ටෝන්ස් (Milestones) ලැයිස්තුව */}
//       <Text style={styles.sectionTitle}>🏆 ඔබේ මයිල්ස්ටෝන්ස් (Milestones)</Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.timelineContainer}
//       >
//         {MILESTONES.map((targetDays, index) => {
//           const isCompleted = currentStreak >= targetDays;
//           const isCurrentTarget =
//             currentStreak < targetDays &&
//             (index === 0 || currentStreak >= MILESTONES[index - 1]);

//           return (
//             <View key={targetDays} style={styles.milestoneItem}>
//               <View
//                 style={[
//                   styles.milestoneNode,
//                   isCompleted
//                     ? styles.completedNode
//                     : isCurrentTarget
//                       ? styles.currentNode
//                       : styles.lockedNode,
//                 ]}
//               >
//                 {isCompleted ? (
//                   <Ionicons name="checkmark" size={24} color="#fff" />
//                 ) : isCurrentTarget ? (
//                   <MaterialCommunityIcons name="fire" size={26} color="#fff" />
//                 ) : (
//                   <Ionicons name="lock-closed" size={20} color="#94a3b8" />
//                 )}
//               </View>
//               <Text
//                 style={[
//                   styles.milestoneText,
//                   isCompleted && styles.completedText,
//                 ]}
//               >
//                 දින {targetDays}
//               </Text>
//               <Text style={styles.milestoneStatus}>
//                 {isCompleted
//                   ? "සාර්ථකයි!"
//                   : isCurrentTarget
//                     ? "ඉලක්කය"
//                     : "අගුළු දමා ඇත"}
//               </Text>
//             </View>
//           );
//         })}
//       </ScrollView>

//       {/* දිනපතා ස්ටේටස් විස්තරය */}
//       <View style={styles.infoCard}>
//         <Ionicons
//           name="information-circle-outline"
//           style={styles.infoIcon}
//           size={22}
//           color="#f59e0b"
//         />
//         <Text style={styles.infoText}>
//           මතක තබා ගන්න: ඔබ තෝරාගත් වෙලාවට පෙර එදිනට අදාළ ෆ්ලෑෂ් කාඩ් එකක්
//           සම්පූර්ණ කළහොත් මෙම ස්ට්‍රීක් මතක් කිරීම පැමිණෙන්නේ නැත.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     padding: 16,
//   },
//   streakHeaderCard: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 24,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#f1f5f9",
//   },
//   fireCircle: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#fff7ed",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     borderWidth: 2,
//     borderColor: "#ffedd5",
//   },
//   fireEmoji: {
//     fontSize: 36,
//   },
//   streakCountNumber: {
//     fontSize: 38,
//     fontWeight: "900",
//     color: "#ea580c",
//     marginBottom: 4,
//   },
//   streakTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1e293b",
//     marginBottom: 6,
//   },
//   streakSubText: {
//     fontSize: 13,
//     color: "#64748b",
//     textAlign: "center",
//     paddingHorizontal: 10,
//     marginBottom: 16,
//   },
//   reminderCardSection: {
//     flexDirection: "row",
//     backgroundColor: "#f8fafc",
//     borderRadius: 12,
//     padding: 12,
//     alignItems: "center",
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     width: "100%",
//   },
//   reminderLabel: {
//     fontSize: 13,
//     fontWeight: "bold",
//     color: "#334155",
//   },
//   reminderSubText: {
//     fontSize: 11,
//     color: "#64748b",
//     marginTop: 2,
//   },
//   timePickerButton: {
//     flexDirection: "row",
//     backgroundColor: "#fff7ed",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#fed7aa",
//     alignItems: "center",
//   },
//   timePickerButtonText: {
//     color: "#ea580c",
//     fontSize: 13,
//     fontWeight: "bold",
//   },
//   testButtonsContainer: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 10,
//   },
//   testBtnPrimary: {
//     backgroundColor: "#ea580c",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   testBtnDanger: {
//     backgroundColor: "#ef4444",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   testBtnText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   testNotificationBtn: {
//     flexDirection: "row",
//     backgroundColor: "#3b82f6",
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 4,
//   },
//   testNotificationText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "bold",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#334155",
//     marginBottom: 12,
//     marginLeft: 4,
//   },
//   timelineContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 4,
//     gap: 16,
//   },
//   milestoneItem: {
//     alignItems: "center",
//     width: 95,
//   },
//   milestoneNode: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   completedNode: {
//     backgroundColor: "#22c55e",
//   },
//   currentNode: {
//     backgroundColor: "#f97316",
//     borderWidth: 3,
//     borderColor: "#ffedd5",
//   },
//   lockedNode: {
//     backgroundColor: "#e2e8f0",
//   },
//   milestoneText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#475569",
//   },
//   completedText: {
//     color: "#22c55e",
//   },
//   milestoneStatus: {
//     fontSize: 11,
//     color: "#94a3b8",
//     marginTop: 2,
//   },
//   infoCard: {
//     flexDirection: "row",
//     backgroundColor: "#fffbeb",
//     borderRadius: 14,
//     padding: 16,
//     alignItems: "center",
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#fef3c7",
//   },
//   infoIcon: {
//     marginRight: 12,
//   },
//   infoText: {
//     flex: 1,
//     fontSize: 12,
//     color: "#92400e",
//     lineHeight: 18,
//   },
// });

import { useLanguage } from "@/context/LanguageContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { scheduleCustomReminderNotification } from "../../utils/backgroundNotification";

// 🌟 ඔබේ Colors অবজেক্ট එක (මෙය වෙනත් ෆයිල් එකකින් නම් ඉම්පෝට් කරගන්න, නැතහොත් මෙලෙසම තබන්න)
const Colors = {
  light: {
    background: "#f3f4f6",
    cardBackground: "#ffffff",
    text: "#1f2937",
    textSecondary: "#64748b",
    primary: "#6366f1",
    border: "#e2e8f0",
  },
  dark: {
    background: "#121212",
    cardBackground: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#94a3b8",
    primary: "#4f46e5",
    border: "#2a2a2a",
  },
};

const MILESTONES = [
  1, 3, 7, 14, 20, 30, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
];

export default function StreakScreen() {
  const colorScheme = useColorScheme(); // 'light' හෝ 'dark' ස්වයංක්‍රීයව හඳුනා ගනී
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];
  const { t } = useLanguage();

  const [currentStreak, setCurrentStreak] = useState<number>(0);

  // ඩිෆෝල්ට් වෙලාව රාත්‍රී 10:00 (22:00) ලෙස සැකසීම
  const [reminderTime, setReminderTime] = useState<Date>(
    new Date(new Date().setHours(22, 0, 0, 0)),
  );
  const [showPicker, setShowPicker] = useState<boolean>(false);

  useEffect(() => {
    loadStreakAndReminder();
    requestNotificationPermission();
  }, []);

  const loadStreakAndReminder = async () => {
    try {
      const storedStreak = await AsyncStorage.getItem("streakCount");
      const streakNum = storedStreak !== null ? parseInt(storedStreak, 10) : 0;
      setCurrentStreak(streakNum);

      const savedTime = await AsyncStorage.getItem("reminderTime");
      if (savedTime) {
        const timeObj = new Date(savedTime);
        setReminderTime(timeObj);
        scheduleCustomReminderNotification(
          timeObj.getHours(),
          timeObj.getMinutes(),
        );
      } else {
        const defaultTime = new Date();
        defaultTime.setHours(22, 0, 0, 0);
        setReminderTime(defaultTime);
        await AsyncStorage.setItem("reminderTime", defaultTime.toISOString());
        scheduleCustomReminderNotification(22, 0);
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Notification permissions not granted!");
    }
  };

  const onTimeChange = async (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setReminderTime(selectedDate);
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();

      await AsyncStorage.setItem("reminderTime", selectedDate.toISOString());
      await scheduleCustomReminderNotification(hours, minutes);

      const timeString = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      Alert.alert(
        "සාර්ථකයි! ⏰",
        `දිනපතා මතක් කිරීමේ වෙලාව ${timeString} ලෙස වෙනස් කරන ලදී.`,
      );
    }
  };

  const sendTestNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🔥 Streak Reminder!",
          body: "අද දවසේ ඔබේ Flashcard එක සම්පූර්ණ කර Streak එක රැකගන්න!",
          sound: true,
        },
        trigger: null,
      });
      Alert.alert("සාර්ථකයි! 🎉", "ටෙස්ට් නොටිෆිකේෂන් එක යවන ලදී.");
    } catch (error) {
      console.log("Notification error:", error);
    }
  };

  const addTestStreak = async () => {
    try {
      const newStreak = currentStreak + 1;
      const todayStr = new Date().toISOString().split("T")[0];

      await AsyncStorage.setItem("streakCount", newStreak.toString());
      await AsyncStorage.setItem("lastStreakDate", todayStr);
      setCurrentStreak(newStreak);
    } catch (error) {
      console.log("Error adding test streak:", error);
    }
  };

  const resetTestStreak = async () => {
    try {
      await AsyncStorage.setItem("streakCount", "0");
      await AsyncStorage.removeItem("lastStreakDate");
      setCurrentStreak(0);
    } catch (error) {
      console.log("Error resetting streak:", error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 30, paddingTop: 30 }}
    >
      {/* උඩම තියෙන Streak Counter Card එක */}
      <View
        style={[
          styles.streakHeaderCard,
          { backgroundColor: theme.cardBackground, borderColor: theme.border },
        ]}
      >
        <View style={styles.fireCircle}>
          <Text style={styles.fireEmoji}>🔥</Text>
        </View>
        <Text style={styles.streakCountNumber}>{currentStreak}</Text>
        <Text style={[styles.streakTitle, { color: theme.text }]}>
          {t("streak", "header")}
        </Text>
        <Text style={[styles.streakSubText, { color: theme.textSecondary }]}>
          {currentStreak > 0 ? t("streak", "body1") : t("streak", "body2")}
        </Text>

        {/* 🛠️ ටෙස්ට් බටන්ස් */}
        {/* <View style={styles.testButtonsContainer}>
          <TouchableOpacity
            style={styles.testBtnPrimary}
            onPress={addTestStreak}
          >
            <Text style={styles.testBtnText}>+ Streak 1ක් එකතු කරන්න</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.testBtnDanger}
            onPress={resetTestStreak}
          >
            <Text style={styles.testBtnText}>Reset (0)</Text>
          </TouchableOpacity>
        </View> */}

        {/* 🔔 ටෙස්ට් නොටිෆිකේෂන් බටන් එක */}
        {/* <TouchableOpacity
          style={styles.testNotificationBtn}
          onPress={sendTestNotification}
        >
          <Ionicons
            name="notifications-outline"
            size={18}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.testNotificationText}>
            Test Notification එකක් එවන්න
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* මයිල්ස්ටෝන්ස් (Milestones) ලැයිස්තුව */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        🏆 {t("streak", "milestoneheader")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timelineContainer}
      >
        {MILESTONES.map((targetDays, index) => {
          const isCompleted = currentStreak >= targetDays;
          const isCurrentTarget =
            currentStreak < targetDays &&
            (index === 0 || currentStreak >= MILESTONES[index - 1]);

          return (
            <View key={targetDays} style={styles.milestoneItem}>
              <View
                style={[
                  styles.milestoneNode,
                  isCompleted
                    ? styles.completedNode
                    : isCurrentTarget
                      ? styles.currentNode
                      : [
                          styles.lockedNode,
                          {
                            backgroundColor:
                              colorScheme === "dark" ? "#2a2a2a" : "#e2e8f0",
                          },
                        ],
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={24} color="#fff" />
                ) : isCurrentTarget ? (
                  <MaterialCommunityIcons name="fire" size={26} color="#fff" />
                ) : (
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={theme.textSecondary}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.milestoneText,
                  { color: theme.textSecondary },
                  isCompleted && styles.completedText,
                ]}
              >
                {t("streak", "days")} {targetDays}
              </Text>
              <Text style={styles.milestoneStatus}>
                {isCompleted
                  ? t("streak", "success")
                  : isCurrentTarget
                    ? t("streak", "target")
                    : t("streak", "locked")}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* ⏰ පහළින්ම ඇති Time Picker සහ Reminder Card එක (පරණ warning box එක වෙනුවට) */}
      <View
        style={[
          styles.reminderCardSection,
          { backgroundColor: theme.cardBackground, borderColor: theme.border },
        ]}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.reminderLabel, { color: theme.text }]}>
            {t("streak", "remindtime")}
          </Text>
          <Text
            style={[styles.reminderSubText, { color: theme.textSecondary }]}
          >
            {t("streak", "remindShowText")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons
            name="time-outline"
            size={18}
            color="#ea580c"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.timePickerButtonText}>
            {reminderTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePicker Component */}
      {showPicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  streakHeaderCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
    borderWidth: 1,
  },
  fireCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff7ed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#ffedd5",
  },
  fireEmoji: {
    fontSize: 36,
  },
  streakCountNumber: {
    fontSize: 38,
    fontWeight: "900",
    color: "#ea580c", // 🌟 Orange color for streak
    marginBottom: 4,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  streakSubText: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  testButtonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  testBtnPrimary: {
    backgroundColor: "#ea580c", // Orange accent for streak testing
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  testBtnDanger: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  testBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  testNotificationBtn: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  testNotificationText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 4,
  },
  timelineContainer: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 16,
    marginBottom: 10,
  },
  milestoneItem: {
    alignItems: "center",
    width: 95,
  },
  milestoneNode: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedNode: {
    backgroundColor: "#22c55e",
  },
  currentNode: {
    backgroundColor: "#f97316", // Orange accent
    borderWidth: 3,
    borderColor: "#ffedd5",
  },
  lockedNode: {
    backgroundColor: "#e2e8f0",
  },
  milestoneText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  completedText: {
    color: "#22c55e",
  },
  milestoneStatus: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  reminderCardSection: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
  },
  reminderLabel: {
    fontSize: 13,
    fontWeight: "bold",
  },
  reminderSubText: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 16,
  },
  timePickerButton: {
    flexDirection: "row",
    backgroundColor: "#fff7ed",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fed7aa",
    alignItems: "center",
  },
  timePickerButtonText: {
    color: "#ea580c",
    fontSize: 13,
    fontWeight: "bold",
  },
});
