export type ProgressState = {
  currentDay: number;
  completedTaskIds: string[];
  completedDays: number[];
  taskUnderstanding: Record<string, number>;
  reminderHour: number;
  reminderMinute: number;
  notificationsEnabled: boolean;
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
