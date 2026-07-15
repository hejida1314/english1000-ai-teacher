export type InterfaceLanguage = "zh" | "en";

export type ProgressState = {
  currentDay: number;
  completedTaskIds: string[];
  completedDays: number[];
  taskUnderstanding: Record<string, number>;
  reminderHour: number;
  reminderMinute: number;
  notificationsEnabled: boolean;
  interfaceLanguage: InterfaceLanguage;
  lastOpenedAt?: string;
};

export type WordCard = {
  id: string;
  word: string;
  meaning: string;
  sentence: string;
  ease: number;
  dueAt: string;
  createdAt: string;
};

export type ExpenseEntry = {
  id: string;
  amount: number;
  category: string;
  note: string;
  createdAt: string;
};

export type LifeLog = {
  date: string;
  workoutCompletedIds: string[];
  expenses: ExpenseEntry[];
  journal: string;
  mood?: string;
  updatedAt: string;
};
