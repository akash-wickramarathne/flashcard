// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as BackgroundFetch from "expo-background-fetch";
// import * as Notifications from "expo-notifications";
// import * as TaskManager from "expo-task-manager";

// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND_NOTIFICATION_TASK";

// // 1. බැක්ග්‍රවුඩ් එකේදී ක්‍රියාත්මක වන ටාස්ක් එක නිර්මාණය කිරීම
// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
//   try {
//     const todayStr = new Date().toISOString().split("T")[0];
//     const lastActiveDate = await AsyncStorage.getItem("lastStreakDate");

//     // අද දවසේ තවම ස්ට්‍රීක් එක කම්ප්ලීට් කර නැත්නම් පමණක් නොටිෆිකේෂන් එක යවයි
//     if (lastActiveDate !== todayStr) {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "🔥 Streak එක බේරාගන්න!",
//           body: "අද දවසේ තවම ඔබ කිසිදු ෆ්ලෑෂ් කාඩ් එකක් සම්පූර්ණ කළේ නැහැ. ඉක්මනින් ඇප් එකට පැමිණ Streak එක රැකගන්න!",
//           sound: true,
//         },
//         trigger: null, // ක්ෂණිකව යැවීම
//       });
//     }

//     return BackgroundFetch.BackgroundFetchResult.NewData;
//   } catch (error) {
//     console.log("Background task error:", error);
//     return BackgroundFetch.BackgroundFetchResult.Failed;
//   }
// });

// // 2. බැක්ග්‍රවුඩ් ටාස්ක් එක රෙজিস্টර් කිරීම
// export async function registerBackgroundNotificationAsync() {
//   try {
//     await BackgroundFetch.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK, {
//       minimumInterval: 60 * 60, // පැයකට වරක් බැක්ග්‍රවුඩ් එකෙන් චෙක් කරයි (තත්පර වලින්)
//       stopOnTerminate: false, // ඇප් එක සම්පූර්ණයෙන්ම වැසුවත් දිගටම වැඩ කරයි
//       startOnBoot: true, // ෆෝන් එක රීස්ටාර්ට් කළත් නැවත වැඩ කිරීමට පටන් ගනී
//     });
//     console.log("Background notification task registered successfully!");
//   } catch (error) {
//     console.log("Error registering background task:", error);
//   }
// }

import * as Notifications from "expo-notifications";

/**
 * 🌟 දිනපතා මතක් කිරීමේ වෙලාව ෂෙඩියුල් කරන නිවැරදි කළ ෆන්ක්ෂන් එක
 */
export async function scheduleCustomReminderNotification(
  hour: number = 22,
  minute: number = 0,
) {
  try {
    // 1. කලින් සෙට් කරපු ඩේලි රීමින්ඩර්ස් සියල්ල අයින් කිරීම (අලුත් වෙලාව සෙට් කිරීමට පෙර)
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 2. අද දවසේ ස්ට්‍රීක් එක කරලා තිබුණත් නැතත්, Daily ට්‍රිගර් එකක් හරහා
    // සෑම දිනකම නියමිත වෙලාවට නොටිෆිකේෂන් එක පැමිණීමට සැලැස්වීම
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔥 Streak Reminder!",
        body: "අද දවසේ Streak එක තවම සම්පූර්ණ කළේ නැහැ. ඉක්මනින් Flashcard එකක් කරලා Streak එක රැකගන්න!",
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hour,
        minute: minute,
      },
    });

    console.log(
      `⏰ Daily reminder successfully scheduled for ${hour}:${minute < 10 ? "0" : ""}${minute}`,
    );
  } catch (error) {
    console.log("Error scheduling notification:", error);
  }
}
