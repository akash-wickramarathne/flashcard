import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler"; // 🌟 1. GestureHandlerRootView මෙතැනින් ඉම්පෝට් කරගන්න
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_ROUTES = ["index", "add-card", "browse", "streaks", "settings"];

export default function SwipeableNavigator({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentIndex = () => {
    if (pathname === "/" || pathname === "/index") return 0;
    const currentName = pathname.replace("/", "");
    const index = TAB_ROUTES.indexOf(currentName);
    return index !== -1 ? index : 0;
  };

  const currentIndex = getCurrentIndex();
  const translateX = useSharedValue(0);

  //   const navigateToTab = (newIndex: number) => {
  //     if (newIndex >= 0 && newIndex < TAB_ROUTES.length) {
  //       const targetRoute = TAB_ROUTES[newIndex];
  //       const path = targetRoute === "index" ? "/" : `/${targetRoute}`;
  //       router.replace(path as any);
  //     }
  //   };
  const navigateToTab = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < TAB_ROUTES.length) {
      const targetRoute = TAB_ROUTES[newIndex];
      const path = targetRoute === "index" ? "/" : `/${targetRoute}`;

      // 🌟 router.replace වෙනුවට router.navigate පාවිච්චි කරන්න
      router.navigate(path as any);
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const threshold = SCREEN_WIDTH * 0.25;

      if (
        event.translationX < -threshold &&
        currentIndex < TAB_ROUTES.length - 1
      ) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          translateX.value = 0;
          runOnJS(navigateToTab)(currentIndex + 1);
        });
      } else if (event.translationX > threshold && currentIndex > 0) {
        translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
          translateX.value = 0;
          runOnJS(navigateToTab)(currentIndex - 1);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    flex: 1,
  }));

  return (
    /* 🌟 2. මුළු කන්ටේනර් එකම GestureHandlerRootView එකෙන් මෙලෙස රැප් කරන්න */
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
