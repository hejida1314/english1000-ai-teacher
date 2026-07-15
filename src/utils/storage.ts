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

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asNumberArray(value: unknown): number[] {
  return Array.isArray(value)
    ? value.filter((item): item is number => typeof item === "number" && Number.isFinite(item))
    : [];
}

function normalizeProgress(value: Partial<ProgressState> | null | undefined): ProgressState {
  const progress = value ?? {};
  const timer = progress.timerState;
  const timerState = timer
    && typeof timer.taskId === "string"
    && typeof timer.remainingSeconds === "number"
    && Number.isFinite(timer.remainingSeconds)
    && timer.remainingSeconds >= 0
    && typeof timer.running === "boolean"
    && typeof timer.updatedAt === "string"
      ? {
          taskId: timer.taskId,
          remainingSeconds: Math.max(0, Math.floor(timer.remainingSeconds)),
          running: timer.running,
          updatedAt: timer.updatedAt
        }
      : undefined;

  return {
    ...DEFAULT_PROGRESS,
    ...progress,
    currentDay: Number.isFinite(progress.currentDay) ? Math.max(1, Math.floor(progress.currentDay || 1)) : DEFAULT_PROGRESS.currentDay,
    completedTaskIds: asStringArray(progress.completedTaskIds),
    completedDays: asNumberArray(progress.completedDays),
    taskUnderstanding: progress.taskUnderstanding && typeof progress.taskUnderstanding === "object" ? progress.taskUnderstanding : {},
    reminderHour: Number.isFinite(progress.reminderHour) ? Math.max(0, Math.min(23, Math.floor(progress.reminderHour || 0))) : DEFAULT_PROGRESS.reminderHour,
    reminderMinute: Number.isFinite(progress.reminderMinute) ? Math.max(0, Math.min(59, Math.floor(progress.reminderMinute || 0))) : DEFAULT_PROGRESS.reminderMinute,
    notificationsEnabled: typeof progress.notificationsEnabled === "boolean" ? progress.notificationsEnabled : DEFAULT_PROGRESS.notificationsEnabled,
    interfaceLanguage: progress.interfaceLanguage === "en" ? "en" : "zh",
    timerState
  };
}

function normalizeWords(value: unknown): WordCard[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is WordCard => (
    !!item
    && typeof item === "object"
    && typeof item.word === "string"
    && typeof item.meaning === "string"
    && typeof item.sentence === "string"
    && typeof item.dueAt === "string"
    && typeof item.createdAt === "string"
  ));
}

function normalizeLifeLogs(value: unknown): LifeLog[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((item): item is Partial<LifeLog> => !!item && typeof item === "object" && typeof item.date === "string")
    .map((item) => ({
      date: item.date || new Date().toISOString().slice(0, 10),
      workoutCompletedIds: asStringArray(item.workoutCompletedIds),
      expenses: Array.isArray(item.expenses)
        ? item.expenses.filter((expense) => (
            !!expense
            && typeof expense === "object"
            && typeof expense.amount === "number"
            && Number.isFinite(expense.amount)
          )).map((expense) => ({
            id: typeof expense.id === "string" ? expense.id : `${Date.now()}`,
            amount: expense.amount,
            category: typeof expense.category === "string" ? expense.category : "other",
            note: typeof expense.note === "string" ? expense.note : "",
            createdAt: typeof expense.createdAt === "string" ? expense.createdAt : new Date().toISOString()
          }))
        : [],
      journal: typeof item.journal === "string" ? item.journal : "",
      mood: typeof item.mood === "string" ? item.mood : undefined,
      updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : new Date().toISOString()
    }));
}

export async function loadProgress(): Promise<ProgressState> {
  const raw = await AsyncStorage.getItem(PROGRESS_KEY);
  return normalizeProgress(safeJsonParse<Partial<ProgressState> | null>(raw, null));
}

export async function saveProgress(progress: ProgressState): Promise<void> {
  await AsyncStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({ ...progress, lastOpenedAt: new Date().toISOString() })
  );
}

export async function loadWords(): Promise<WordCard[]> {
  const raw = await AsyncStorage.getItem(WORDS_KEY);
  return normalizeWords(safeJsonParse<unknown>(raw, []));
}

export async function saveWords(words: WordCard[]): Promise<void> {
  await AsyncStorage.setItem(WORDS_KEY, JSON.stringify(words));
}

export async function loadLifeLogs(): Promise<LifeLog[]> {
  const raw = await AsyncStorage.getItem(LIFE_LOGS_KEY);
  return normalizeLifeLogs(safeJsonParse<unknown>(raw, []));
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
  await saveProgress(normalizeProgress(backup.progress));
  await saveWords(normalizeWords(backup.words));
  if (Array.isArray(backup.lifeLogs)) {
    await saveLifeLogs(normalizeLifeLogs(backup.lifeLogs));
  }
}
