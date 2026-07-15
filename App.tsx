import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import {
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  Headphones,
  Home,
  ListChecks,
  Play,
  RotateCcw,
  Settings,
  Volume2
} from "lucide-react-native";

import { COURSE_DAYS, ROADMAP, buildCourseDay } from "./src/data/course";
import { SAMPLE_SENTENCES } from "./src/data/sampleSentences";
import { ProgressState, WordCard } from "./src/types";
import { DEFAULT_PROGRESS, exportBackup, loadProgress, loadWords, saveProgress, saveWords } from "./src/utils/storage";
import { requestNotificationPermission, scheduleDailyStudyReminder, scheduleTestNotification } from "./src/utils/notifications";
import { createWordCard, isDue, reviewWord } from "./src/utils/words";

type Tab = "home" | "today" | "player" | "words" | "ai" | "roadmap" | "settings";

const theme = {
  bg: "#F7F2EA",
  surface: "#FFFFFF",
  ink: "#19201E",
  muted: "#66736F",
  primary: "#256D63",
  primaryDark: "#174D46",
  line: "#DDD6C9",
  warm: "#C4743B",
  danger: "#AA3E3E"
};

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [words, setWords] = useState<WordCard[]>([]);
  const [tab, setTab] = useState<Tab>("home");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([loadProgress(), loadWords()]).then(([storedProgress, storedWords]) => {
      setProgress(storedProgress);
      setWords(storedWords);
      setReady(true);
    });
  }, []);

  const day = useMemo(() => buildCourseDay(progress.currentDay), [progress.currentDay]);
  const completedToday = day.tasks.filter((task) => progress.completedTaskIds.includes(task.id)).length;
  const todayPercent = Math.round((completedToday / day.tasks.length) * 100);
  const totalCompletedMinutes = progress.completedDays.length * 180 + day.tasks
    .filter((task) => progress.completedTaskIds.includes(task.id))
    .reduce((sum, task) => sum + task.minutes, 0);
  const dueWords = words.filter(isDue);

  async function updateProgress(next: ProgressState) {
    setProgress(next);
    await saveProgress(next);
  }

  async function updateWords(next: WordCard[]) {
    setWords(next);
    await saveWords(next);
  }

  async function toggleTask(taskId: string) {
    const exists = progress.completedTaskIds.includes(taskId);
    const completedTaskIds = exists
      ? progress.completedTaskIds.filter((id) => id !== taskId)
      : [...progress.completedTaskIds, taskId];
    const allDone = day.tasks.every((task) => completedTaskIds.includes(task.id));
    const completedDays = allDone && !progress.completedDays.includes(day.day)
      ? [...progress.completedDays, day.day]
      : progress.completedDays;
    await updateProgress({ ...progress, completedTaskIds, completedDays });
  }

  async function goNextDay() {
    if (progress.currentDay >= COURSE_DAYS.length) {
      Alert.alert("Done", "You finished the 334-day plan.");
      return;
    }
    await updateProgress({ ...progress, currentDay: progress.currentDay + 1, completedTaskIds: [] });
    setTab("today");
  }

  async function goPreviousDay() {
    if (progress.currentDay <= 1) {
      return;
    }
    await updateProgress({ ...progress, currentDay: progress.currentDay - 1, completedTaskIds: [] });
    setTab("today");
  }

  function continueLearning() {
    setTab("today");
  }

  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <Text style={styles.title}>English1000</Text>
          <Text style={styles.muted}>Loading your local progress...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content}>
          {tab === "home" && (
            <HomeScreen
              day={day}
              progress={progress}
              todayPercent={todayPercent}
              totalCompletedMinutes={totalCompletedMinutes}
              dueWords={dueWords.length}
              onContinue={continueLearning}
              onOpenSettings={() => setTab("settings")}
              onOpenRoadmap={() => setTab("roadmap")}
            />
          )}
          {tab === "today" && (
            <TodayScreen
              day={day}
              completedTaskIds={progress.completedTaskIds}
              onToggleTask={toggleTask}
              onNextDay={goNextDay}
              onPreviousDay={goPreviousDay}
            />
          )}
          {tab === "player" && <PlayerScreen />}
          {tab === "words" && <WordsScreen words={words} onUpdate={updateWords} />}
          {tab === "ai" && <AiScreen prompt={day.aiPrompt} />}
          {tab === "roadmap" && <RoadmapScreen />}
          {tab === "settings" && (
            <SettingsScreen
              progress={progress}
              onUpdate={updateProgress}
            />
          )}
        </ScrollView>
        <BottomNav tab={tab} onChange={setTab} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function HomeScreen({
  day,
  progress,
  todayPercent,
  totalCompletedMinutes,
  dueWords,
  onContinue,
  onOpenSettings,
  onOpenRoadmap
}: {
  day: ReturnType<typeof buildCourseDay>;
  progress: ProgressState;
  todayPercent: number;
  totalCompletedMinutes: number;
  dueWords: number;
  onContinue: () => void;
  onOpenSettings: () => void;
  onOpenRoadmap: () => void;
}) {
  return (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>English1000 AI Teacher</Text>
          <Text style={styles.title}>Day {day.day}</Text>
        </View>
        <Pressable style={styles.iconButton} onPress={onOpenSettings}>
          <Settings size={22} color={theme.primaryDark} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>{day.level}</Text>
        <Text style={styles.heroTitle}>{day.phase}</Text>
        <Text style={styles.heroText}>{day.focus}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${todayPercent}%` }]} />
        </View>
        <Text style={styles.muted}>{todayPercent}% done today</Text>
        <Pressable style={styles.primaryButton} onPress={onContinue}>
          <Play size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>One-tap continue</Text>
        </Pressable>
        <Pressable style={styles.secondaryWideButton} onPress={onOpenRoadmap}>
          <Text style={styles.secondaryButtonText}>View full sequence</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        <Metric label="Finished days" value={`${progress.completedDays.length}`} />
        <Metric label="Study minutes" value={`${totalCompletedMinutes}`} />
        <Metric label="Due words" value={`${dueWords}`} />
        <Metric label="Reminder" value={`${pad(progress.reminderHour)}:${pad(progress.reminderMinute)}`} />
      </View>
    </View>
  );
}

function TodayScreen({
  day,
  completedTaskIds,
  onToggleTask,
  onNextDay,
  onPreviousDay
}: {
  day: ReturnType<typeof buildCourseDay>;
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
  onNextDay: () => void;
  onPreviousDay: () => void;
}) {
  return (
    <View>
      <Text style={styles.kicker}>Today's plan</Text>
      <Text style={styles.title}>Day {day.day}: {day.phase}</Text>
      <Text style={styles.body}>{day.isReview ? "Review day. No new material." : day.focus}</Text>
      {day.checkpoint && <Text style={styles.warning}>{day.checkpoint}</Text>}

      {day.tasks.map((task) => {
        const done = completedTaskIds.includes(task.id);
        return (
          <Pressable key={task.id} style={[styles.taskCard, done && styles.taskCardDone]} onPress={() => onToggleTask(task.id)}>
            <View style={styles.taskTop}>
              <View style={styles.taskIcon}>
                {done ? <CheckCircle2 size={22} color={theme.primary} /> : <Clock3 size={22} color={theme.warm} />}
              </View>
              <View style={styles.taskMain}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDetail}>{task.detail}</Text>
              </View>
              <Text style={styles.minutes}>{task.minutes}m</Text>
            </View>
          </Pressable>
        );
      })}

      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={onPreviousDay}>
          <Text style={styles.secondaryButtonText}>Previous</Text>
        </Pressable>
        <Pressable style={styles.primaryButtonSmall} onPress={onNextDay}>
          <Text style={styles.primaryButtonText}>Next day</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PlayerScreen() {
  const [index, setIndex] = useState(0);
  const [hideEnglish, setHideEnglish] = useState(false);
  const [hideChinese, setHideChinese] = useState(false);
  const [rate, setRate] = useState(0.85);
  const sentence = SAMPLE_SENTENCES[index];

  function speak() {
    Speech.stop();
    Speech.speak(sentence.english, { language: "en-US", rate });
  }

  function loop(times: number) {
    Speech.stop();
    for (let i = 0; i < times; i += 1) {
      setTimeout(() => Speech.speak(sentence.english, { language: "en-US", rate }), i * 2600);
    }
  }

  return (
    <View>
      <Text style={styles.kicker}>Intensive listener</Text>
      <Text style={styles.title}>Sentence loop</Text>
      <View style={styles.playerCard}>
        {!hideEnglish && <Text style={styles.sentence}>{sentence.english}</Text>}
        {!hideChinese && <Text style={styles.translation}>{sentence.chinese}</Text>}
      </View>
      <View style={styles.rowWrap}>
        <Pill label="Speak" onPress={speak} icon={<Volume2 size={18} color={theme.primaryDark} />} />
        <Pill label="Loop 3x" onPress={() => loop(3)} icon={<RotateCcw size={18} color={theme.primaryDark} />} />
        <Pill label="Loop 5x" onPress={() => loop(5)} icon={<RotateCcw size={18} color={theme.primaryDark} />} />
        <Pill label={hideEnglish ? "Show EN" : "Hide EN"} onPress={() => setHideEnglish(!hideEnglish)} />
        <Pill label={hideChinese ? "Show CN" : "Hide CN"} onPress={() => setHideChinese(!hideChinese)} />
        <Pill label={rate === 0.7 ? "0.85x" : rate === 0.85 ? "1.0x" : "0.7x"} onPress={() => setRate(rate === 0.7 ? 0.85 : rate === 0.85 ? 1 : 0.7)} />
      </View>
      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={() => setIndex(Math.max(0, index - 1))}>
          <Text style={styles.secondaryButtonText}>Previous</Text>
        </Pressable>
        <Pressable style={styles.primaryButtonSmall} onPress={() => setIndex((index + 1) % SAMPLE_SENTENCES.length)}>
          <Text style={styles.primaryButtonText}>Next</Text>
        </Pressable>
      </View>
      <Text style={styles.note}>Later we can import real subtitles. This first version proves the lazy listening workflow.</Text>
    </View>
  );
}

function WordsScreen({ words, onUpdate }: { words: WordCard[]; onUpdate: (words: WordCard[]) => void }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const due = words.filter(isDue);

  function addWord() {
    if (!word.trim() || !meaning.trim()) {
      Alert.alert("Missing info", "Add a word and a Chinese meaning.");
      return;
    }
    onUpdate([createWordCard(word, meaning, sentence), ...words]);
    setWord("");
    setMeaning("");
    setSentence("");
  }

  function grade(card: WordCard, value: "forgot" | "hard" | "know" | "easy") {
    onUpdate(words.map((item) => (item.id === card.id ? reviewWord(item, value) : item)));
  }

  return (
    <View>
      <Text style={styles.kicker}>Words</Text>
      <Text style={styles.title}>{due.length} due today</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} value={word} onChangeText={setWord} placeholder="word" />
        <TextInput style={styles.input} value={meaning} onChangeText={setMeaning} placeholder="Chinese meaning" />
        <TextInput style={styles.input} value={sentence} onChangeText={setSentence} placeholder="source sentence" />
        <Pressable style={styles.primaryButtonSmall} onPress={addWord}>
          <Text style={styles.primaryButtonText}>Add word</Text>
        </Pressable>
      </View>
      {due.map((card) => (
        <View key={card.id} style={styles.card}>
          <Text style={styles.taskTitle}>{card.word}</Text>
          <Text style={styles.body}>{card.meaning}</Text>
          {!!card.sentence && <Text style={styles.note}>{card.sentence}</Text>}
          <View style={styles.rowWrap}>
            <Pill label="Forgot" onPress={() => grade(card, "forgot")} />
            <Pill label="Hard" onPress={() => grade(card, "hard")} />
            <Pill label="Know" onPress={() => grade(card, "know")} />
            <Pill label="Easy" onPress={() => grade(card, "easy")} />
          </View>
        </View>
      ))}
    </View>
  );
}

function AiScreen({ prompt }: { prompt: string }) {
  function copyPrompt() {
    Clipboard.setStringAsync(prompt);
    Alert.alert("Copied", "Paste this into ChatGPT or your AI teacher.");
  }

  return (
    <View>
      <Text style={styles.kicker}>AI Teacher</Text>
      <Text style={styles.title}>Daily test prompt</Text>
      <View style={styles.card}>
        <Text style={styles.prompt}>{prompt}</Text>
      </View>
      <Pressable style={styles.primaryButton} onPress={copyPrompt}>
        <Brain size={20} color="#fff" />
        <Text style={styles.primaryButtonText}>Copy prompt</Text>
      </Pressable>
      <Text style={styles.note}>The app stays useful offline. AI is an optional coach layered on top.</Text>
    </View>
  );
}

function RoadmapScreen() {
  return (
    <View>
      <Text style={styles.kicker}>Roadmap</Text>
      <Text style={styles.title}>1000-hour route</Text>
      {ROADMAP.map((item) => (
        <View key={item.days} style={styles.card}>
          <Text style={styles.kicker}>{item.label} / Day {item.days}</Text>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.body}>{item.focus}</Text>
          <Text style={styles.note}>{item.exit}</Text>
        </View>
      ))}
    </View>
  );
}

function SettingsScreen({ progress, onUpdate }: { progress: ProgressState; onUpdate: (progress: ProgressState) => void }) {
  async function enableNotifications(hour: number, minute: number) {
    const ok = await requestNotificationPermission();
    if (!ok) {
      Alert.alert("Permission needed", "Notifications are not enabled.");
      return;
    }
    await scheduleDailyStudyReminder(hour, minute);
    await onUpdate({ ...progress, reminderHour: hour, reminderMinute: minute, notificationsEnabled: true });
    Alert.alert("Reminder set", `Daily reminder: ${pad(hour)}:${pad(minute)}`);
  }

  async function copyBackup() {
    const backup = await exportBackup();
    Clipboard.setStringAsync(backup);
    Alert.alert("Backup copied", "Save this text somewhere safe.");
  }

  return (
    <View>
      <Text style={styles.kicker}>Settings</Text>
      <Text style={styles.title}>Lazy mode controls</Text>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>Daily reminder</Text>
        <Text style={styles.body}>Pick one. Do not overthink it.</Text>
        <View style={styles.rowWrap}>
          <Pill label="8:00" onPress={() => enableNotifications(8, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="15:00" onPress={() => enableNotifications(15, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="20:00" onPress={() => enableNotifications(20, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="22:00" onPress={() => enableNotifications(22, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="Test 3s" onPress={scheduleTestNotification} />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>Backup</Text>
        <Text style={styles.body}>Copy all local progress and words as text. This protects you if the app changes later.</Text>
        <Pressable style={styles.primaryButtonSmall} onPress={copyBackup}>
          <Text style={styles.primaryButtonText}>Copy backup</Text>
        </Pressable>
      </View>
    </View>
  );
}

function BottomNav({ tab, onChange }: { tab: Tab; onChange: (tab: Tab) => void }) {
  const items: Array<{ tab: Tab; label: string; icon: React.ReactNode }> = [
    { tab: "home", label: "Home", icon: <Home size={20} color={tab === "home" ? theme.primary : theme.muted} /> },
    { tab: "today", label: "Today", icon: <ListChecks size={20} color={tab === "today" ? theme.primary : theme.muted} /> },
    { tab: "player", label: "Listen", icon: <Headphones size={20} color={tab === "player" ? theme.primary : theme.muted} /> },
    { tab: "words", label: "Words", icon: <BookOpen size={20} color={tab === "words" ? theme.primary : theme.muted} /> },
    { tab: "ai", label: "AI", icon: <Brain size={20} color={tab === "ai" ? theme.primary : theme.muted} /> }
  ];

  return (
    <View style={styles.nav}>
      {items.map((item) => (
        <Pressable key={item.tab} style={styles.navItem} onPress={() => onChange(item.tab)}>
          {item.icon}
          <Text style={[styles.navLabel, tab === item.tab && styles.navLabelActive]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function Pill({ label, onPress, icon }: { label: string; onPress: () => void; icon?: React.ReactNode }) {
  return (
    <Pressable style={styles.pill} onPress={onPress}>
      {icon}
      <Text style={styles.pillText}>{label}</Text>
    </Pressable>
  );
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: theme.bg
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.bg
  },
  content: {
    padding: 18,
    paddingBottom: 104
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  kicker: {
    color: theme.primary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6
  },
  title: {
    color: theme.ink,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 10
  },
  hero: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.line
  },
  heroLabel: {
    color: theme.warm,
    fontWeight: "800",
    marginBottom: 8
  },
  heroTitle: {
    fontSize: 22,
    color: theme.ink,
    fontWeight: "800",
    marginBottom: 8
  },
  heroText: {
    color: theme.muted,
    lineHeight: 21,
    marginBottom: 16
  },
  progressTrack: {
    height: 10,
    backgroundColor: "#EEE7DC",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 8
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.primary
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: theme.primary,
    borderRadius: 8,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  primaryButtonSmall: {
    backgroundColor: theme.primary,
    borderRadius: 8,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800"
  },
  secondaryButton: {
    borderColor: theme.line,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: theme.surface
  },
  secondaryWideButton: {
    marginTop: 10,
    borderColor: theme.line,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface
  },
  secondaryButtonText: {
    color: theme.primaryDark,
    fontSize: 16,
    fontWeight: "800"
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.surface
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12
  },
  metric: {
    width: "48%",
    minHeight: 82,
    borderRadius: 8,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.line,
    padding: 14,
    justifyContent: "center"
  },
  metricValue: {
    fontSize: 24,
    color: theme.ink,
    fontWeight: "800"
  },
  metricLabel: {
    color: theme.muted,
    marginTop: 4
  },
  muted: {
    color: theme.muted
  },
  body: {
    color: theme.muted,
    lineHeight: 22,
    marginBottom: 12
  },
  warning: {
    color: theme.warm,
    fontWeight: "800",
    marginBottom: 12
  },
  taskCard: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.line,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10
  },
  taskCardDone: {
    borderColor: theme.primary,
    backgroundColor: "#EEF7F4"
  },
  taskTop: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  taskIcon: {
    width: 30,
    alignItems: "center",
    paddingTop: 2
  },
  taskMain: {
    flex: 1
  },
  taskTitle: {
    color: theme.ink,
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 6
  },
  taskDetail: {
    color: theme.muted,
    lineHeight: 20
  },
  minutes: {
    color: theme.primaryDark,
    fontWeight: "800"
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },
  card: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.line,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12
  },
  playerCard: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.line,
    borderRadius: 8,
    minHeight: 190,
    padding: 18,
    justifyContent: "center"
  },
  sentence: {
    fontSize: 25,
    color: theme.ink,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 16
  },
  translation: {
    fontSize: 17,
    color: theme.muted,
    lineHeight: 25
  },
  pill: {
    minHeight: 42,
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: "#EEE7DC",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  pillText: {
    color: theme.primaryDark,
    fontWeight: "800"
  },
  note: {
    color: theme.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8
  },
  input: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.line,
    backgroundColor: "#FBF8F1",
    paddingHorizontal: 12,
    marginBottom: 10,
    color: theme.ink
  },
  prompt: {
    color: theme.ink,
    lineHeight: 22,
    fontFamily: "Courier"
  },
  nav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    borderTopWidth: 1,
    borderTopColor: theme.line,
    backgroundColor: theme.surface,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  navItem: {
    width: "20%",
    alignItems: "center",
    gap: 4
  },
  navLabel: {
    fontSize: 12,
    color: theme.muted,
    fontWeight: "700"
  },
  navLabelActive: {
    color: theme.primary
  }
});
