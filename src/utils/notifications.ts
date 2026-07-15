import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function requestNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  let status = current.status;
  if (status !== "granted") {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("daily-study", {
      name: "Daily study",
      importance: Notifications.AndroidImportance.HIGH
    });
  }

  return status === "granted";
}

export async function scheduleDailyStudyReminder(hour: number, minute: number): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "English1000: today's lesson is ready",
      body: "Tap once and continue the first unfinished task.",
      data: { route: "today" }
    },
    trigger: {
      hour,
      minute,
      repeats: true,
      channelId: "daily-study"
    }
  });
}

export async function scheduleTestNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "English1000 test reminder",
      body: "This is what your daily reminder will look like.",
      data: { route: "today" }
    },
    trigger: { seconds: 3, channelId: "daily-study" }
  });
}
