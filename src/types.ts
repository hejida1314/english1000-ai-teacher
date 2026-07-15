export type ProgressState = {
  currentDay: number;
  completedTaskIds: string[];
  completedDays: number[];
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
