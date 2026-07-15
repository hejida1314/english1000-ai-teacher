import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function requestNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  let granted = (current as { granted?: boolean }).granted === true;
  if (!granted) {
    const requested = await Notifications.requestPermissionsAsync();
    granted = (requested as { granted?: boolean }).granted === true;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("daily-study", {
      name: "Daily study",
      importance: Notifications.AndroidImportance.HIGH
    });
  }

  return granted;
}

export async function scheduleDailyStudyReminder(hour: number, minute: number): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "English1000：今天该学英语了",
      body: "点一下，直接继续第一个没完成的任务。",
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
      title: "English1000 测试提醒",
      body: "以后每天就这样提醒你，不用自己想学什么。",
      data: { route: "today" }
    },
    trigger: { seconds: 3, channelId: "daily-study" }
  });
}
