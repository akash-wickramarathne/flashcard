// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false, // උඩ තියෙන Default Header එක අක්‍රීය කිරීමට
//         tabBarStyle: {
//           backgroundColor: "#1e1e1e", // ඩාර්ක් මෝඩ් බැක්ග්‍රවුන්ඩ් එකක් සඳහා
//           borderTopWidth: 0,
//           elevation: 10,
//           height: 60,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         tabBarActiveTintColor: "#4f46e5", // Select වුණාම පේන පාට (Purple/Blue)
//         tabBarInactiveTintColor: "#9ca3af", // සාමාන්‍ය පාට (Gray)
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "මුල් පිටුව",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "home" : "home-outline"}
//               size={size}
//               color={color as string}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="add-card"
//         options={{
//           title: "කාඩ් එකතු කරන්න",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "add-circle" : "add-circle-outline"}
//               size={size}
//               color={color as string}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="browse"
//         options={{
//           title: "ලැයිස්තුව",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "list" : "list-outline"}
//               size={size}
//               color={color as string}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "සැකසුම්",
//           tabBarIcon: ({ color, size, focused }) => (
//             <Ionicons
//               name={focused ? "settings" : "settings-outline"}
//               size={size}
//               color={color as string}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// import { Tabs } from "expo-router";
// import CustomTabBar from "../components/CustomTabBar";

// export default function RootLayout() {
//   return (
//     <Tabs
//       tabBar={(props) => <CustomTabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen name="index" options={{ title: "මුල් පිටුව" }} />
//       <Tabs.Screen name="add-card" options={{ title: "කාඩ් එකතු කරන්න" }} />
//       <Tabs.Screen name="browse" options={{ title: "ලැයිස්තුව" }} />
//       <Tabs.Screen name="settings" options={{ title: "සැකසුම්" }} />
//     </Tabs>
//   );
// }

// import { Tabs } from "expo-router";
// import CustomTabBar from "../components/CustomTabBar";
// import { ThemeProvider } from "../context/ThemeContext";

// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <Tabs
//         tabBar={(props) => <CustomTabBar {...props} />}
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Tabs.Screen name="index" options={{ title: "මුල් පිටුව" }} />
//         <Tabs.Screen name="add-card" options={{ title: "කාඩ් එකතු කරන්න" }} />
//         <Tabs.Screen name="browse" options={{ title: "ලැයිස්තුව" }} />
//         <Tabs.Screen name="settings" options={{ title: "සැකසුම්" }} />

//         <Tabs.Screen name="card-detail" />
//         <Tabs.Screen name="edit-card" />
//       </Tabs>
//     </ThemeProvider>
//   );
// }

// import { LanguageProvider } from "@/context/LanguageContext";
// import { Stack } from "expo-router";
// import { ThemeProvider } from "../context/ThemeContext";

// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         <Stack screenOptions={{ headerShown: false }}>
//           {/* ටැබ්ස් ගෘප් එක */}
//           <Stack.Screen name="(tabs)" />

//           {/* ටැබ්ස් වලිනුත් ඉස්මතු වී පෙන්විය යුතු ඩීටේල්ස් සහ එඩිට් ස්ක්‍රීන්ස් */}
//           <Stack.Screen name="card-detail" />
//           <Stack.Screen name="edit-card" />
//           <Stack.Screen name="edit-subjects" />
//           <Stack.Screen name="edit-profile" />
//         </Stack>
//       </LanguageProvider>
//     </ThemeProvider>
//   );
// }

// import { LanguageProvider } from "@/context/LanguageContext";
// import { Stack } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { Animated, StyleSheet, Text, View } from "react-native";
// import { ThemeProvider, useTheme } from "../context/ThemeContext";

// // Welcome / Splash Screen එක (Theme එකට ගැලපෙන UI එක සමඟ)
// function WelcomeScreen({ onFinish }: { onFinish: () => void }) {
//   const { colors } = useTheme(); // Current theme එකේ colors ලබා ගැනීම
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current; // පොඩි zoom effect එකක් සඳහා

//   useEffect(() => {
//     // Fade-in සහ Zoom-in Animation එක
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         friction: 4,
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // තත්පර 1.5ක් තිරයේ පෙන්වා තබා fade-out වීම
//       setTimeout(() => {
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 800,
//           useNativeDriver: true,
//         }).start(() => {
//           onFinish();
//         });
//       }, 1500);
//     });
//   }, []);

//   return (
//     <View
//       style={[styles.welcomeContainer, { backgroundColor: colors.background }]}
//     >
//       <Animated.View
//         style={[
//           styles.contentContainer,
//           {
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//             borderColor: colors.border,
//             backgroundColor: colors.card || colors.background,
//           },
//         ]}
//       >
//         <Text style={[styles.title, { color: colors.primary }]}>
//           Flashcard Builder 🚀
//         </Text>
//         <Text style={[styles.subtitle, { color: colors.text }]}>
//           Smart learning, sharper memory...
//         </Text>
//       </Animated.View>
//     </View>
//   );
// }

// export default function RootLayout() {
//   const [showWelcome, setShowWelcome] = useState(true);

//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         {showWelcome ? (
//           <WelcomeScreen onFinish={() => setShowWelcome(false)} />
//         ) : (
//           <Stack screenOptions={{ headerShown: false }}>
//             {/* ටැබ්ස් ගෘප් එක */}
//             <Stack.Screen name="(tabs)" />

//             {/* ටැබ්ස් වලිනුත් ඉස්මතු වී පෙන්විය යුතු ඩීටේල්ස් සහ එඩිට් ස්ක්‍රීන්ස් */}
//             <Stack.Screen name="card-detail" />
//             <Stack.Screen name="edit-card" />
//             <Stack.Screen name="edit-subjects" />
//             <Stack.Screen name="edit-profile" />
//           </Stack>
//         )}
//       </LanguageProvider>
//     </ThemeProvider>
//   );
// }

// const styles = StyleSheet.create({
//   welcomeContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentContainer: {
//     alignItems: "center",
//     padding: 30,
//     borderRadius: 24,
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: "center",
//     opacity: 0.8,
//   },
// });

import { LanguageProvider } from "@/context/LanguageContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { ThemeProvider } from "../context/ThemeContext";

// // Welcome Screen
// function WelcomeScreen({ onFinish }: { onFinish: () => void }) {
//   const { colors } = useTheme();

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;

//   useEffect(() => {
//     let timer: ReturnType<typeof setTimeout>;

//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         friction: 4,
//         useNativeDriver: true,
//       }),
//     ]).start(({ finished }) => {
//       if (finished) {
//         timer = setTimeout(() => {
//           Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 800,
//             useNativeDriver: true,
//           }).start(({ finished: fadeFinished }) => {
//             if (fadeFinished) {
//               onFinish();
//             }
//           });
//         }, 1500);
//       }
//     });

//     return () => {
//       clearTimeout(timer);
//       fadeAnim.stopAnimation();
//       scaleAnim.stopAnimation();
//     };
//   }, []);

//   return (
//     <View
//       style={[styles.welcomeContainer, { backgroundColor: colors.background }]}
//     >
//       <Animated.View
//         style={[
//           styles.contentContainer,
//           {
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//             borderColor: colors.border,
//             backgroundColor: colors.card || colors.background,
//           },
//         ]}
//       >
//         <Text style={[styles.title, { color: colors.primary }]}>
//           Flashcard Builder 🚀
//         </Text>

//         <Text style={[styles.subtitle, { color: colors.text }]}>
//           Smart learning, sharper memory...
//         </Text>
//       </Animated.View>
//     </View>
//   );
// }

// Root Layout
export default function RootLayout() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    // <ThemeProvider>
    //   <LanguageProvider>
    //     <View style={styles.rootContainer}>
    //       {/* Main Expo Router Navigator - Always Mounted */}
    //       <Stack screenOptions={{ headerShown: false }}>
    //         <Stack.Screen name="(tabs)" />

    //         <Stack.Screen name="card-detail" />
    //         <Stack.Screen name="edit-card" />
    //         <Stack.Screen name="edit-subjects" />
    //         <Stack.Screen name="edit-profile" />
    //       </Stack>

    //       {/* Welcome Screen Overlay */}
    //       {showWelcome && (
    //         <WelcomeScreen onFinish={() => setShowWelcome(false)} />
    //       )}
    //     </View>
    //   </LanguageProvider>
    // </ThemeProvider>
    <ThemeProvider>
      <LanguageProvider>
        <>
          {/* Main Expo Router Navigator */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="card-detail" />
            <Stack.Screen name="edit-card" />
            <Stack.Screen name="edit-subjects" />
            <Stack.Screen name="edit-profile" />
          </Stack>

          {/* Welcome Screen Overlay */}
          {/* {showWelcome && (
            <WelcomeScreen onFinish={() => setShowWelcome(false)} />
          )} */}
        </>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  // welcomeContainer: {
  //   ...StyleSheet.absoluteFillObject,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   zIndex: 999,
  //   elevation: 999,
  // },

  contentContainer: {
    alignItems: "center",
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },
});
