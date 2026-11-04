// export const themes = {
//   light: {
//     background: "#f3f4f6",
//     cardBackground: "#ffffff",
//     text: "#1f2937",
//     primary: "#6366f1",
//     tint: "#9ca3af",
//   },
//   dark: {
//     background: "#121212",
//     cardBackground: "#1e1e1e",
//     text: "#ffffff",
//     primary: "#4f46e5",
//     tint: "#9ca3af",
//   },
// };
// /**
//  * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
//  * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
//  */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  // light: {
  //   text: '#000000',
  //   background: '#ffffff',
  //   backgroundElement: '#F0F0F3',
  //   backgroundSelected: '#E0E1E6',
  //   textSecondary: '#60646C',
  // },
  // dark: {
  //   text: '#ffffff',
  //   background: '#000000',
  //   backgroundElement: '#212225',
  //   backgroundSelected: '#2E3135',
  //   textSecondary: '#B0B4BA',
  // },
  light: {
    background: "#f3f4f6",
    cardBackground: "#ffffff",
    text: "#1f2937",
    primary: "#6366f1",
    tint: "#9ca3af",
  },
  dark: {
    background: "#121212",
    cardBackground: "#1e1e1e",
    text: "#ffffff",
    primary: "#4f46e5",
    tint: "#9ca3af",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
