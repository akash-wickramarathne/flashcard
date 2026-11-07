import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const STREAK_KEY = "@user_streak_data";

export interface StreakData {
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedDates: string[]; // List of completed dates
}

// နေ့စဉ် စစ်ဆေးပြီး streak update කිරීම
export const checkAndUpdateStreak = async (): Promise<StreakData> => {
  try {
    const data = await AsyncStorage.getItem(STREAK_KEY);
    const today = new Date().toISOString().split("T")[0];

    let streakData: StreakData = data
      ? JSON.parse(data)
      : {
          currentStreak: 0,
          lastActiveDate: "",
          completedDates: [],
        };

    if (streakData.lastActiveDate === today) {
      return streakData; // අදටත් කරලා ඉවරයි
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];

    if (streakData.lastActiveDate === yStr) {
      // ඊයේ කරලා තියෙනවා නම් streak එක එහෙමම තියෙනවා (අද කාඩ් එකක් කළාම වැඩි වෙයි)
    } else if (
      streakData.lastActiveDate !== "" &&
      streakData.lastActiveDate !== today
    ) {
      // දවස් ගණනක් මගහැරිලා නම් streak එක බින්දුවට වැටෙනවා
      streakData.currentStreak = 0;
    }

    return streakData;
  } catch (error) {
    console.error("Streak load error:", error);
    return { currentStreak: 0, lastActiveDate: "", completedDates: [] };
  }
};

// කාඩ් එකක් සම්පූර්ණ කළ විට කෝල් කිරීමට
export const recordCardCompletion = async (): Promise<StreakData> => {
  const today = new Date().toISOString().split("T")[0];
  let streakData = await checkAndUpdateStreak();

  if (!streakData.completedDates.includes(today)) {
    streakData.completedDates.push(today);
    streakData.lastActiveDate = today;
    streakData.currentStreak += 1;
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
  }

  return streakData;
};

// රෑ 11 ට නොටිෆිකේෂන් එකක් සෙට් කිරීම
// export const scheduleStreakReminder = async () => {
//   await Notifications.cancelAllScheduledNotificationsAsync();

//   // දිනපතා රෑ 11:00 ට (23:00) රිමොයින්ඩ් කිරීමට
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "🔥 Streak එක බේරාගන්න!",
//       body: "අදට තවමත් කිසිදු Flashcard එකක් කළේ නැහැ. ඔබේ ස්ට්‍රීක් එක රැකගන්න දැන්ම එකක් කරන්න!",
//       sound: true,
//     },
//     trigger: {
//       hour: 23,
//       minute: 0,
//       repeats: true,
//     },
//   });
// };

export const scheduleStreakReminder = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  // දිනපතා රෑ 11:00 ට (23:00) රිමොයින්ඩ් කිරීමට
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔥 Streak එක බේරාගන්න!",
      body: "අදට තවමත් කිසිදු Flashcard එකක් කළේ නැහැ. ඔබේ ස්ට්‍රීක් එක රැකගන්න දැන්ම එකක් කරන්න!",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY, // 🌟 මෙතැන 'type' එක එකතු කරන්න
      hour: 23,
      minute: 0,
    },
  });
};
