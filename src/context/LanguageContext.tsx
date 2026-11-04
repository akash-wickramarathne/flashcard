// // context/LanguageContext.tsx
// import React, { createContext, useContext, useState } from "react";
// import { translations } from "../constants/translations";

// interface LanguageContextType {
//   locale: string;
//   setLocale: (lang: string) => void;
//   t: (section: string, key: string) => string; // සෙක්ෂන් එකත් ලබා දෙන ලෙස වෙනස් කර ඇත
// }

// const LanguageContext = createContext<LanguageContextType>({
//   locale: "en",
//   setLocale: () => {},
//   t: (section, key) => key,
// });

// export const LanguageProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [locale, setLocale] = useState<string>("en");

//   // උදාහරණයක් ලෙස: t('homepage', 'welcome') ලෙස පාවිච්චි කළ හැක
//   const t = (section: string, key: string) => {
//     try {
//       if (translations[locale]?.[section]?.[key]) {
//         return translations[locale][section][key];
//       }
//       // භාෂාවෙන් නැත්නම් English වලින් ලබා දෙයි
//       if (translations["en"][section]?.[key]) {
//         return translations["en"][section][key];
//       }
//       return key;
//     } catch (err) {
//       return key;
//     }
//   };

//   return (
//     <LanguageContext.Provider value={{ locale, setLocale, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => useContext(LanguageContext);

// context/LanguageContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../constants/translations";

interface LanguageContextType {
  locale: string;
  setLocale: (lang: string) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (section, key) => key,
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState<string>("en");

  // ඇප් එක ඕන් වන විට සේව් කර ඇති භාෂාව ලෝඩ් කරගැනීම
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("user_language");
        if (savedLang) {
          setLocale(savedLang);
        }
      } catch (error) {
        console.log("Failed to load language", error);
      }
    };
    loadSavedLanguage();
  }, []);

  // භාෂාව වෙනස් කර AsyncStorage එකේ සේව් කිරීම
  const changeLanguage = async (lang: string) => {
    setLocale(lang);
    try {
      await AsyncStorage.setItem("user_language", lang);
    } catch (error) {
      console.log("Failed to save language", error);
    }
  };

  // t ෆන්ක්ෂන් එක
  const t = (section: string, key: string) => {
    try {
      if (translations[locale]?.[section]?.[key]) {
        return translations[locale][section][key];
      }
      if (translations["en"][section]?.[key]) {
        return translations["en"][section][key];
      }
      return key;
    } catch (err) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
