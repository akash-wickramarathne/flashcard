// // import React, { createContext, useContext, useState } from "react";
// // import { themes } from "../constants/themes";

// // const ThemeContext = createContext({
// //   theme: "light",
// //   colors: themes.light,
// //   toggleTheme: () => {},
// // });

// // export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

// //   const toggleTheme = () => {
// //     setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
// //   };

// //   const colors = themes[themeMode];

// //   return (
// //     <ThemeContext.Provider value={{ theme: themeMode, colors, toggleTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };

// // export const useTheme = () => useContext(ThemeContext);

// import React, { createContext, useContext, useState } from "react";
// import { Colors, Fonts, Spacing } from "../constants/themes"; // ඔයාගේ පාර (path) නිවැරදිව දෙන්න

// type ThemeType = "light" | "dark";

// interface ThemeContextType {
//   theme: ThemeType;
//   colors: typeof Colors.light;
//   spacing: typeof Spacing;
//   fonts: typeof Fonts;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType>({
//   theme: "light",
//   colors: Colors.light,
//   spacing: Spacing,
//   fonts: Fonts,
//   toggleTheme: () => {},
// });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [themeMode, setThemeMode] = useState<ThemeType>("light");

//   const toggleTheme = () => {
//     setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // මෙතැනදී as any දාලා TypeScript එකේ strict type checking එක මඟහරවා ගන්න පුළුවන්
//   const value = {
//     theme: themeMode,
//     colors: Colors[themeMode] as any,
//     spacing: Spacing,
//     fonts: Fonts,
//     toggleTheme,
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Colors, Fonts, Spacing } from "../constants/themes"; // ඔයාගේ පාර (path) නිවැරදිව දෙන්න

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof Colors.light;
  spacing: typeof Spacing;
  fonts: typeof Fonts;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: Colors.light,
  spacing: Spacing,
  fonts: Fonts,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeType>("light");

  // ඇප් එක ඕන් වන විට ස්ටෝරේජ් එකේ සේව් කර ඇති තේම් එක ලෝඩ් කරගැනීම
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("user_theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.log("Failed to load theme", error);
      }
    };
    loadSavedTheme();
  }, []);

  // තේම් එක මාරු කර ස්ටෝරේජ් එකේ සේව් කිරීම
  const toggleTheme = async () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    try {
      await AsyncStorage.setItem("user_theme", newTheme);
    } catch (error) {
      console.log("Failed to save theme", error);
    }
  };

  // මෙතැනදී as any දාලා TypeScript එකේ strict type checking එක මඟහරවා ගන්න පුළුවන්
  const value = {
    theme: themeMode,
    colors: Colors[themeMode] as any,
    spacing: Spacing,
    fonts: Fonts,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
