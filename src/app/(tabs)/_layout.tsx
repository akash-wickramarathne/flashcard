// import { Tabs } from "expo-router";
// import CustomTabBar from "../../components/CustomTabBar"; // මෙහි dots (..) දෙකක් තිබිය යුතුය!

// export default function TabLayout() {
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
//       <Tabs.Screen name="streaks" options={{ title: "Streak" }} />
//     </Tabs>
//   );
// }

// import { Tabs } from "expo-router";
// import CustomTabBar from "../../components/CustomTabBar";
// import SwipeableNavigator from "../../components/SwipeableNavigator"; // 🌟 SwipeableNavigator එක මෙතැනට ඉම්පෝට් කර ඇත

// export default function TabLayout() {
//   return (
//     /* 🌟 මෙන්න මෙහෙම මුළු Tabs එකම SwipeableNavigator එක ඇතුළට දාලා රැප් කරන්න ඕනේ */
//     <SwipeableNavigator>
//       <Tabs
//         tabBar={(props) => <CustomTabBar {...props} />}
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Tabs.Screen name="index" options={{ title: "මුල් පිටුව" }} />
//         <Tabs.Screen name="add-card" options={{ title: "කාඩ් එකතු කරන්න" }} />
//         <Tabs.Screen name="browse" options={{ title: "ලැයිස්තුව" }} />
//         <Tabs.Screen name="streaks" options={{ title: "Streak" }} />
//         <Tabs.Screen name="settings" options={{ title: "සැකසුම්" }} />
//       </Tabs>
//     </SwipeableNavigator>
//   );
// }

// import { Tabs } from "expo-router";
// import CustomTabBar from "../../components/CustomTabBar";
// import SwipeableNavigator from "../../components/SwipeableNavigator";

// export default function TabLayout() {
//   return (
//     <SwipeableNavigator>
//       <Tabs
//         // CustomTabBar eka me thanata dena wita eya fix wela thiyenawa
//         tabBar={(props) => <CustomTabBar {...props} />}
//         screenOptions={{
//           headerShown: false,
//           // Background white wena eka wathura transparent color set kirima
//           sceneStyle: { backgroundColor: "transparent" },
//         }}
//       >
//         <Tabs.Screen name="index" options={{ title: "මුල් පිටුව" }} />
//         <Tabs.Screen name="add-card" options={{ title: "කාඩ් එකතු කරන්න" }} />
//         <Tabs.Screen name="browse" options={{ title: "ලැයිස්තුව" }} />
//         <Tabs.Screen name="streaks" options={{ title: "Streak" }} />
//         <Tabs.Screen name="settings" options={{ title: "සැකසුම්" }} />
//       </Tabs>
//     </SwipeableNavigator>
//   );
// }

// import { Tabs, usePathname, useRouter } from "expo-router";
// import { useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import PagerView from "react-native-pager-view";
// import CustomTabBar from "../../components/CustomTabBar";

// // ස්ක්‍රීන්ස් වල රූට්ස් අනුපිළිවෙල
// const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

// export default function TabLayout() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pagerRef = useRef<PagerView>(null);

//   // වත්මන් පේජ් එකේ ඉන්ඩෙක්ස් එක සෙවීම
//   const getCurrentIndex = () => {
//     if (pathname === "/" || pathname === "/index") return 0;
//     const currentName = pathname.replace("/", "");
//     const index = TAB_ROUTES.indexOf(currentName);
//     return index !== -1 ? index : 0;
//   };

//   const currentIndex = getCurrentIndex();

//   return (
//     <View style={styles.container}>
//       {/* 🌟 PagerView මඟින් WhatsApp එකේ වගේ නේටිව්, කිසිදු ඩේ එකක් නැති ස්වයිප් එක ලැබෙයි */}
//       <PagerView
//         ref={pagerRef}
//         style={styles.pager}
//         initialPage={currentIndex}
//         onPageSelected={(e) => {
//           const nextIndex = e.nativeEvent.position;
//           const targetRoute = TAB_ROUTES[nextIndex];
//           const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
//           if (path !== pathname) {
//             router.navigate(path as any);
//           }
//         }}
//       >
//         <View key="0" style={styles.page}>
//           {/* මෙතැනට index ස්ක්‍රීන් එක හෝ ටැබ් කන්ටෙන්ට් එක වැටේ */}
//         </View>
//         <View key="1" style={styles.page}>
//           {/* add-card */}
//         </View>
//         <View key="2" style={styles.page}>
//           {/* browse */}
//         </View>
//         <View key="3" style={styles.page}>
//           {/* streaks */}
//         </View>
//         <View key="4" style={styles.page}>
//           {/* settings */}
//         </View>
//       </PagerView>

//       {/* 🌟 පහළින් ස්ථාවරව පවතින Custom Bottom Bar එක */}
//       <Tabs
//         tabBar={(props) => <CustomTabBar {...props} />}
//         screenOptions={{ headerShown: false }}
//       >
//         <Tabs.Screen name="index" />
//         <Tabs.Screen name="add-card" />
//         <Tabs.Screen name="browse" />
//         <Tabs.Screen name="streaks" />
//         <Tabs.Screen name="settings" />
//       </Tabs>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   pager: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
// });

// import { usePathname, useRouter } from "expo-router";
// import { useEffect, useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import PagerView from "react-native-pager-view";
// import CustomTabBar from "../../components/CustomTabBar";

// // 🌟 ඔබේ ස්ක්‍රීන්ස් ටික මෙතැනට ඉම්පෝට් කරගන්න (ෆෝල්ඩර් ස්ට્રක්චර් එක අනුව පාත් එක වෙනස් වන්න පුළුවන්)
// import AddCardScreen from "./add-card";
// import BrowseScreen from "./browse";
// import IndexScreen from "./index";
// import SettingsScreen from "./settings";
// import StreaksScreen from "./streaks";

// const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

// export default function TabLayout() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pagerRef = useRef<PagerView>(null);

//   const getCurrentIndex = () => {
//     if (pathname === "/" || pathname === "/index") return 0;
//     const currentName = pathname.replace("/", "");
//     const index = TAB_ROUTES.indexOf(currentName);
//     return index !== -1 ? index : 0;
//   };

//   const currentIndex = getCurrentIndex();

//   // බෝටම් බාර් එකෙන් ක්ලික් කරද්දී PagerView එක අදාළ පිටුවට ස්ලයිඩ් වීම සඳහා
//   useEffect(() => {
//     pagerRef.current?.setPage(currentIndex);
//   }, [currentIndex]);

//   return (
//     <View style={styles.container}>
//       {/* 🌟 PagerView එක ඇතුළේ සියලුම ස්ක්‍රීන්ස් පෙර-ලෝඩ් (Pre-load) වී ඇත */}
//       <PagerView
//         ref={pagerRef}
//         style={styles.pager}
//         initialPage={currentIndex}
//         onPageSelected={(e) => {
//           const nextIndex = e.nativeEvent.position;
//           const targetRoute = TAB_ROUTES[nextIndex];
//           const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
//           if (path !== pathname) {
//             router.navigate(path as any);
//           }
//         }}
//       >
//         <View key="0" style={styles.page}>
//           <IndexScreen />
//         </View>
//         <View key="1" style={styles.page}>
//           <AddCardScreen />
//         </View>
//         <View key="2" style={styles.page}>
//           <BrowseScreen />
//         </View>
//         <View key="3" style={styles.page}>
//           <StreaksScreen />
//         </View>
//         <View key="4" style={styles.page}>
//           <SettingsScreen />
//         </View>
//       </PagerView>

//       {/* 🌟 පහළින් ස්ථාවරව පවතින Custom Bottom Bar එක */}
//       <CustomTabBar
//         state={
//           {
//             index: currentIndex,
//             routes: TAB_ROUTES.map((name) => ({ key: name, name })),
//             stale: false,
//             type: "tab",
//             history: [],
//           } as any
//         }
//         navigation={
//           {
//             navigate: (name: string) => {
//               const idx = TAB_ROUTES.indexOf(name);
//               if (idx !== -1) {
//                 pagerRef.current?.setPage(idx);
//               }
//             },
//             emit: () => ({ defaultPrevented: false }),
//           } as any
//         }
//         descriptors={{}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a", // ඇප් එකේ ඩාර්ක් බැක්ග්‍රাউন্ড එක
//   },
//   pager: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
// });

// import { usePathname, useRouter } from "expo-router";
// import { useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import PagerView from "react-native-pager-view";
// import CustomTabBar from "../../components/CustomTabBar";

// import AddCardScreen from "./add-card";
// import BrowseScreen from "./browse";
// import IndexScreen from "./index";
// import SettingsScreen from "./settings";
// import StreaksScreen from "./streaks";

// const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

// export default function TabLayout() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pagerRef = useRef<PagerView>(null);

//   const getCurrentIndex = () => {
//     if (pathname === "/" || pathname === "/index") return 0;
//     const currentName = pathname.replace("/", "");
//     const index = TAB_ROUTES.indexOf(currentName);
//     return index !== -1 ? index : 0;
//   };

//   const currentIndex = getCurrentIndex();

//   return (
//     <View style={styles.container}>
//       {/* 🌟 PagerView මඟින් ස්වයිප් කිරීම පාලනය වේ */}
//       <PagerView
//         ref={pagerRef}
//         style={styles.pager}
//         initialPage={currentIndex}
//         onPageSelected={(e) => {
//           const nextIndex = e.nativeEvent.position;
//           const targetRoute = TAB_ROUTES[nextIndex];
//           const path = targetRoute === "index" ? "/" : `/${targetRoute}`;

//           if (path !== pathname) {
//             router.replace(path as any);
//           }
//         }}
//       >
//         <View key="0" style={styles.page}>
//           <IndexScreen />
//         </View>
//         <View key="1" style={styles.page}>
//           <AddCardScreen />
//         </View>
//         <View key="2" style={styles.page}>
//           <BrowseScreen />
//         </View>
//         <View key="3" style={styles.page}>
//           <StreaksScreen />
//         </View>
//         <View key="4" style={styles.page}>
//           <SettingsScreen />
//         </View>
//       </PagerView>

//       {/* 🌟 පහළින් ස්ථාවරව පවතින Custom Bottom Bar එක */}
//       <CustomTabBar
//         state={
//           {
//             index: currentIndex,
//             routes: TAB_ROUTES.map((name) => ({ key: name, name })),
//             stale: false,
//             type: "tab",
//             history: [],
//           } as any
//         }
//         navigation={
//           {
//             navigate: (name: string) => {
//               const idx = TAB_ROUTES.indexOf(name);
//               if (idx !== -1) {
//                 // බෝටම් බාර් එක ක්ලික් කළ විට පමණක් පේජ් එක මාරු වේ (ලූප් වීම වළකී)
//                 pagerRef.current?.setPage(idx);
//               }
//             },
//             emit: () => ({ defaultPrevented: false }),
//           } as any
//         }
//         descriptors={{}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//   },
//   pager: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
// });

// import { usePathname, useRouter } from "expo-router";
// import { useRef, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import PagerView from "react-native-pager-view";
// import CustomTabBar from "../../components/CustomTabBar";

// import AddCardScreen from "./add-card";
// import BrowseScreen from "./browse";
// import IndexScreen from "./index";
// import SettingsScreen from "./settings";
// import StreaksScreen from "./streaks";

// const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

// export default function TabLayout() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pagerRef = useRef<PagerView>(null);

//   const getCurrentIndex = () => {
//     if (pathname === "/" || pathname === "/index") return 0;
//     const currentName = pathname.replace("/", "");
//     const index = TAB_ROUTES.indexOf(currentName);
//     return index !== -1 ? index : 0;
//   };

//   const serverIndex = getCurrentIndex();
//   // 🌟 ලෝකල් ස්ටේට් එකක් මඟින් බෝටම් බාර් එකේ ඇක්ටිව් ඉන්ඩෙක්ස් එක ක්ෂණිකව පාලනය කරයි
//   const [activeIndex, setActiveIndex] = useState(serverIndex);

//   return (
//     <View style={styles.container}>
//       <PagerView
//         ref={pagerRef}
//         style={styles.pager}
//         initialPage={serverIndex}
//         // 🌟 onPageSelected වෙනුවට onPageScroll පාවිච්චි කරද්දී ස්වයිප් කරද්දිම ක්ෂණිකව මාරු වේ
//         onPageSelected={(e) => {
//           const nextIndex = e.nativeEvent.position;
//           setActiveIndex(nextIndex); // ක්ෂණිකව බෝටම් බාර් එක අප්ඩේට් වේ

//           const targetRoute = TAB_ROUTES[nextIndex];
//           const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
//           if (path !== pathname) {
//             router.replace(path as any);
//           }
//         }}
//       >
//         <View key="0" style={styles.page}>
//           <IndexScreen />
//         </View>
//         <View key="1" style={styles.page}>
//           <AddCardScreen />
//         </View>
//         <View key="2" style={styles.page}>
//           <BrowseScreen />
//         </View>
//         <View key="3" style={styles.page}>
//           <StreaksScreen />
//         </View>
//         <View key="4" style={styles.page}>
//           <SettingsScreen />
//         </View>
//       </PagerView>

//       {/* 🌟 Custom Bottom Bar එකට අපේ activeIndex එක ලබා දීම */}
//       <CustomTabBar
//         state={
//           {
//             index: activeIndex, // 🌟 මෙහි serverIndex වෙනුවට activeIndex දීමෙන් ඩිම් වීම සම්පූර්ණයෙන්ම නතර වේ
//             routes: TAB_ROUTES.map((name) => ({ key: name, name })),
//             stale: false,
//             type: "tab",
//             history: [],
//           } as any
//         }
//         navigation={
//           {
//             navigate: (name: string) => {
//               const idx = TAB_ROUTES.indexOf(name);
//               if (idx !== -1) {
//                 setActiveIndex(idx);
//                 pagerRef.current?.setPage(idx);
//               }
//             },
//             emit: () => ({ defaultPrevented: false }),
//           } as any
//         }
//         descriptors={{}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//   },
//   pager: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
// });

// import { usePathname, useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import PagerView from "react-native-pager-view";
// import CustomTabBar from "../../components/CustomTabBar";

// import AddCardScreen from "./add-card";
// import BrowseScreen from "./browse";
// import IndexScreen from "./index";
// import SettingsScreen from "./settings";
// import StreaksScreen from "./streaks";

// const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

// export default function TabLayout() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pagerRef = useRef<PagerView>(null);

//   const getCurrentIndex = () => {
//     if (pathname === "/" || pathname === "/index") return 0;
//     const currentName = pathname.replace("/", "");
//     const index = TAB_ROUTES.indexOf(currentName);
//     return index !== -1 ? index : 0;
//   };

//   const serverIndex = getCurrentIndex();
//   const [activeIndex, setActiveIndex] = useState(serverIndex);

//   // වෙනත් ක්‍රමයකින් රවුට් එක වෙනස් වුවහොත් (උදා: ඩීප් ලਿੰක්ස්) එය සිංහලෙන් කියාදීම සඳහා
//   useEffect(() => {
//     if (serverIndex !== activeIndex) {
//       setActiveIndex(serverIndex);
//       pagerRef.current?.setPage(serverIndex);
//     }
//   }, [serverIndex]);

//   return (
//     <View style={styles.container}>
//       {/* 🌟 PagerView මඟින් ඉතා ස්මූත් ලෙස ස්වයිප් කිරීම පාලනය වේ */}
//       <PagerView
//         ref={pagerRef}
//         style={styles.pager}
//         initialPage={serverIndex}
//         onPageSelected={(e) => {
//           const nextIndex = e.nativeEvent.position;
//           // ස්වයිප් කරද්දී බෝටම් බාර් එක ක්ෂණිකව අප්ඩේට් වේ (ලූප් වීම වළක්වා ගැනීමට router.replace ඉවත් කර ඇත)
//           setActiveIndex(nextIndex);
//         }}
//       >
//         <View key="0" style={styles.page}>
//           <IndexScreen />
//         </View>
//         <View key="1" style={styles.page}>
//           <AddCardScreen />
//         </View>
//         <View key="2" style={styles.page}>
//           <BrowseScreen />
//         </View>
//         <View key="3" style={styles.page}>
//           <StreaksScreen />
//         </View>
//         <View key="4" style={styles.page}>
//           <SettingsScreen />
//         </View>
//       </PagerView>

//       {/* 🌟 පහළින් ස්ථාවරව පවතින Custom Bottom Bar එක */}
//       <CustomTabBar
//         state={
//           {
//             index: activeIndex,
//             routes: TAB_ROUTES.map((name) => ({ key: name, name })),
//             stale: false,
//             type: "tab",
//             history: [],
//           } as any
//         }
//         navigation={
//           {
//             navigate: (name: string) => {
//               const idx = TAB_ROUTES.indexOf(name);
//               if (idx !== -1) {
//                 setActiveIndex(idx);
//                 pagerRef.current?.setPage(idx);

//                 // බෝටම් බාර් එක ක්ලික් කළ විට පමණක් රවුට් එක අප්ඩේට් වේ
//                 const targetRoute = TAB_ROUTES[idx];
//                 const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
//                 router.replace(path as any);
//               }
//             },
//             emit: () => ({ defaultPrevented: false }),
//           } as any
//         }
//         descriptors={{}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//   },
//   pager: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
// });

// import { usePathname, useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import PagerView from "react-native-pager-view";
// import CustomTabBar from "../../components/CustomTabBar";

// import AddCardScreen from "./add-card";
// import BrowseScreen from "./browse";
// import IndexScreen from "./index";
// import SettingsScreen from "./settings";
// import StreaksScreen from "./streaks";

// const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

// export default function TabLayout() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pagerRef = useRef<PagerView>(null);

//   const getCurrentIndex = () => {
//     if (pathname === "/" || pathname === "/index") return 0;
//     const currentName = pathname.replace("/", "");
//     const index = TAB_ROUTES.indexOf(currentName);
//     return index !== -1 ? index : 0;
//   };

//   const serverIndex = getCurrentIndex();
//   const [activeIndex, setActiveIndex] = useState(serverIndex);

//   // ඩීප් ලින්ක්ස් (Deep links) හරහා පිටු වෙනස් වුවහොත් පමණක් ක්‍රියාත්මක වේ
//   useEffect(() => {
//     if (serverIndex !== activeIndex) {
//       setActiveIndex(serverIndex);
//       pagerRef.current?.setPage(serverIndex);
//     }
//   }, [serverIndex]);

//   return (
//     <View style={styles.container}>
//       {/* 🌟 PagerView මඟින් කිසිදු ඩිම් වීමක් නැතිව සුමටව ස්වයිප් වේ */}
//       <PagerView
//         ref={pagerRef}
//         style={styles.pager}
//         initialPage={serverIndex}
//         onPageSelected={(e) => {
//           const nextIndex = e.nativeEvent.position;
//           setActiveIndex(nextIndex);

//           // ස්වයිප් කිරීම අවසන් වූ පසු URL එක URL bar එකේ පෙන්වීම සඳහා පමණක් (අවශ්‍ය නම් ඉවත් කළ හැක)
//           const targetRoute = TAB_ROUTES[nextIndex];
//           const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
//           if (pathname !== path) {
//             router.replace(path as any);
//           }
//         }}
//       >
//         <View key="0" style={styles.page}>
//           <IndexScreen />
//         </View>
//         <View key="1" style={styles.page}>
//           <AddCardScreen />
//         </View>
//         <View key="2" style={styles.page}>
//           <BrowseScreen />
//         </View>
//         <View key="3" style={styles.page}>
//           <StreaksScreen />
//         </View>
//         <View key="4" style={styles.page}>
//           <SettingsScreen />
//         </View>
//       </PagerView>

//       {/* 🌟 Custom Bottom Bar එක */}
//       <CustomTabBar
//         state={
//           {
//             index: activeIndex,
//             routes: TAB_ROUTES.map((name) => ({ key: name, name })),
//             stale: false,
//             type: "tab",
//             history: [],
//           } as any
//         }
//         navigation={
//           {
//             navigate: (name: string) => {
//               const idx = TAB_ROUTES.indexOf(name);
//               if (idx !== -1) {
//                 setActiveIndex(idx);
//                 pagerRef.current?.setPage(idx); // ක්ෂණිකව ස්වයිප් වී පිටුව මාරු වේ (White flash නැත)

//                 const targetRoute = TAB_ROUTES[idx];
//                 const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
//                 router.replace(path as any);
//               }
//             },
//             emit: () => ({ defaultPrevented: false }),
//           } as any
//         }
//         descriptors={{}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//   },
//   pager: {
//     flex: 1,
//   },
//   page: {
//     flex: 1,
//   },
// });

import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import CustomTabBar from "../../components/CustomTabBar";

import AddCardScreen from "./add-card";
import BrowseScreen from "./browse";
import IndexScreen from "./index";
import SettingsScreen from "./settings";
import StreaksScreen from "./streaks";

const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

export default function TabLayout() {
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      {/* 🌟 PagerView එක මඟින් කිසිදු රවුටින් රීලෝඩ් කිරීමකින් තොරව සුමටව ස්වයිප් වේ */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => {
          setActiveIndex(e.nativeEvent.position);
        }}
      >
        <View key="0" style={styles.page}>
          <IndexScreen />
        </View>
        <View key="1" style={styles.page}>
          <AddCardScreen />
        </View>
        <View key="2" style={styles.page}>
          <BrowseScreen />
        </View>
        <View key="3" style={styles.page}>
          <StreaksScreen />
        </View>
        <View key="4" style={styles.page}>
          <SettingsScreen />
        </View>
      </PagerView>

      {/* 🌟 Custom Bottom Bar එක */}
      <CustomTabBar
        state={
          {
            index: activeIndex,
            routes: TAB_ROUTES.map((name) => ({ key: name, name })),
            stale: false,
            type: "tab",
            history: [],
          } as any
        }
        navigation={
          {
            navigate: (name: string) => {
              const idx = TAB_ROUTES.indexOf(name);
              if (idx !== -1) {
                setActiveIndex(idx);
                pagerRef.current?.setPage(idx); // ක්ෂණිකව අදාළ පිටුවට පනී (White flash නැත)
              }
            },
            emit: () => ({ defaultPrevented: false }),
          } as any
        }
        descriptors={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});
