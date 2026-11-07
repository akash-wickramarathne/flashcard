import React, { useEffect } from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export default function AnimatedWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const translateX = useSharedValue(30); // աջ සිට වම් පැත්තට හෝ මඳක් පසෙකින් ස්ලයිඩ් වීමට
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 350,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 300,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
      flex: 1,
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
