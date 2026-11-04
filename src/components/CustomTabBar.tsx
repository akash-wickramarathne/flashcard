// import { Ionicons } from "@expo/vector-icons";
// import { usePathname, useRouter } from "expo-router";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Animated, {
//     useAnimatedStyle,
//     withSpring,
// } from "react-native-reanimated";

// export default function CustomTabBar({ state, descriptors }: any) {
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <View style={styles.wrapperContainer}>
//       <View style={styles.tabContainer}>
//         {state.routes.map((route: any, index: number) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//                 ? options.title
//                 : route.name;

//           // Expo Router වල Path එක හෝ Index එක පදනම් කරගෙන Active Tab එක තීරණය කිරීම
//           const isFocused = state.index === index;

//           const onPress = () => {
//             if (!isFocused) {
//               // Expo Router හරහා අදාළ පිටුවට යාම (උදාහරණයක් ලෙස: '/', '/add-card', ආදී වශයෙන්)
//               const routePath = route.name === "index" ? "/" : `/${route.name}`;
//               router.push(routePath as any);
//             }
//           };

//           // අයිකොන් තෝරාගැනීම
//           let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
//           if (route.name === "index") {
//             iconName = isFocused ? "home" : "home-outline";
//           } else if (route.name === "add-card") {
//             iconName = isFocused ? "add-circle" : "add-circle-outline";
//           } else if (route.name === "browse") {
//             iconName = isFocused ? "list" : "list-outline";
//           } else if (route.name === "settings") {
//             iconName = isFocused ? "settings" : "settings-outline";
//           }

//           // Animated pill indicator style එක
//           const animatedStyle = useAnimatedStyle(() => {
//             return {
//               transform: [
//                 {
//                   scale: withSpring(isFocused ? 1 : 0.8, { damping: 12 }),
//                 },
//               ],
//             };
//           });

//           return (
//             <TouchableOpacity
//               key={route.key}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               onPress={onPress}
//               style={styles.tabItem}
//             >
//               {isFocused ? (
//                 <Animated.View style={[styles.activeIndicator, animatedStyle]}>
//                   <Ionicons name={iconName} size={22} color="#ffffff" />
//                 </Animated.View>
//               ) : (
//                 <Ionicons name={iconName} size={22} color="#9ca3af" />
//               )}

//               {!isFocused && (
//                 <Text style={styles.tabText}>{label as string}</Text>
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapperContainer: {
//     position: "absolute",
//     bottom: 25,
//     left: 20,
//     right: 20,
//     alignItems: "center",
//   },
//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#ffffff",
//     height: 65,
//     borderRadius: 35,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     width: "100%",
//     maxWidth: 400,
//   },
//   tabItem: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//   },
//   activeIndicator: {
//     width: 45,
//     height: 45,
//     backgroundColor: "#6366f1",
//     borderRadius: 22.5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   tabText: {
//     fontSize: 10,
//     marginTop: 2,
//     color: "#9ca3af",
//     textAlign: "center",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { useLanguage } from "../context/LanguageContext"; // ඔබේ ෆෝල්ඩර් පේත් එකට අනුව මෙය වෙනස් කරගන්න

export default function CustomTabBar({ state, descriptors }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme(); // ඩිවයිස් එකේ/ඇප් එකේ Dark/Light මෝඩ් එක හඳුනා ගැනීමට
  const isDarkMode = colorScheme === "dark";

  const { t } = useLanguage(); // භාෂාව වෙනස් කිරීම සඳහා ට්‍රාන්ස්ලේෂන් හෝක් එක

  return (
    <View style={styles.wrapperContainer}>
      <View
        style={[
          styles.tabContainer,
          { backgroundColor: isDarkMode ? "#1f2937" : "#ffffff" }, // ඩාර්ක් මෝඩ් එකට පසුබිම් පාට මාරු වීම
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          // 2. භාෂාවට අනුව Tab Labels වෙනස් කර ගැනීම
          // route.name මත පදනම්ව translations.ts එකෙන් අදාළ වචනය ලබා දීම
          let label = route.name;
          if (route.name === "index") {
            label = t("buttom", "homepage"); // අවශ්‍ය නම් වෙනස් කරගත හැක
          } else if (route.name === "add-card") {
            label = t("buttom", "addCard");
          } else if (route.name === "browse") {
            label = t("buttom", "todayCards");
          } else if (route.name === "settings") {
            label = t("buttom", "settings");
          }

          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              const routePath = route.name === "index" ? "/" : `/${route.name}`;
              router.push(routePath as any);
            }
          };

          // අයිකොන් තෝරාගැනීම
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "index") {
            iconName = isFocused ? "home" : "home-outline";
          } else if (route.name === "add-card") {
            iconName = isFocused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "browse") {
            // iconName = isFocused ? "list" : "list-outline";
            iconName = isFocused ? "notifications" : "notifications-outline";
          } else if (route.name === "settings") {
            iconName = isFocused ? "settings" : "settings-outline";
          }

          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [
                {
                  scale: withSpring(isFocused ? 1 : 0.8, { damping: 12 }),
                },
              ],
            };
          });

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabItem}
            >
              {isFocused ? (
                <Animated.View style={[styles.activeIndicator, animatedStyle]}>
                  <Ionicons name={iconName} size={22} color="#ffffff" />
                </Animated.View>
              ) : (
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
              )}

              {!isFocused && (
                <Text
                  style={[
                    styles.tabText,
                    { color: isDarkMode ? "#9ca3af" : "#6b7280" }, // ඩාර්ක් මෝඩ් එකේදී අකුරු වල පාට වෙනස් වීම
                  ]}
                >
                  {label as string}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    height: 65,
    borderRadius: 35,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    maxWidth: 400,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeIndicator: {
    width: 45,
    height: 45,
    backgroundColor: "#6366f1",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
});
