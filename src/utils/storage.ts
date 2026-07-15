import AsyncStorage from "@react-native-async-storage/async-storage";
import { LifeLog, ProgressState, WordCard } from "../types";

const PROGRESS_KEY = "english1000.progress.v1";
const WORDS_KEY = "english1000.words.v1";
const LIFE_LOGS_KEY = "english1000.lifeLogs.v1";

export const DEFAULT_PROGRESS: ProgressState = {
  currentDay: 1,
  completedTaskIds: [],
  completedDays: [],
  taskUnderstanding: {},
  reminderHour: 20,
  reminderMinute: 0,
  notificationsEnabled: false,
  interfaceLanguage: "zh"
};

export async function loadProgress(): Promise<ProgressState> {
  const raw = await AsyncStorage.getItem(PROGRESS_KEY);
  if (!raw) {
    return DEFAULT_PROGRESS;
  }
  return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
}

export async function saveProgress(progress: ProgressState): Promise<void> {
  await AsyncStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({ ...progress, lastOpenedAt: new Date().toISOString() })
  );
}

export async function loadWords(): Promise<WordCard[]> {
  const raw = await AsyncStorage.getItem(WORDS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveWords(words: WordCard[]): Promise<void> {
  await AsyncStorage.setItem(WORDS_KEY, JSON.stringify(words));
}

export async function loadLifeLogs(): Promise<LifeLog[]> {
  const raw = await AsyncStorage.getItem(LIFE_LOGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveLifeLogs(logs: LifeLog[]): Promise<void> {
  await AsyncStorage.setItem(LIFE_LOGS_KEY, JSON.stringify(logs));
}

export async function exportBackup(): Promise<string> {
  const [progress, words, lifeLogs] = await Promise.all([loadProgress(), loadWords(), loadLifeLogs()]);
  return JSON.stringify(
    {
      app: "English1000 AI Teacher",
      version: 2,
      exportedAt: new Date().toISOString(),
      progress,
      words,
      lifeLogs
    },
    null,
    2
  );
}

export async function importBackup(backupJson: string): Promise<void> {
  const backup = JSON.parse(backupJson);
  if (!backup.progress || !Array.isArray(backup.words)) {
    throw new Error("Invalid backup file");
  }
  await saveProgress({ ...DEFAULT_PROGRESS, ...backup.progress });
  await saveWords(backup.words);
  if (Array.isArray(backup.lifeLogs)) {
    await saveLifeLogs(backup.lifeLogs);
  }
}
