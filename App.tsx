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
      Alert.alert("完成", "你已经完成334天计划。");
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
          <Text style={styles.muted}>正在读取本地进度...</Text>
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
              onOpenPlayer={() => setTab("player")}
              onOpenWords={() => setTab("words")}
              onOpenAi={() => setTab("ai")}
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
  const remainingTasks = day.tasks.length - Math.round((todayPercent / 100) * day.tasks.length);
  const firstTask = day.tasks[0];

  return (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>English1000 AI老师</Text>
          <Text style={styles.title}>第 {day.day} 天</Text>
        </View>
        <Pressable style={styles.iconButton} onPress={onOpenSettings}>
          <Settings size={22} color={theme.primaryDark} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>{day.level}</Text>
        <Text style={styles.heroTitle}>{day.phase}</Text>
        <Text style={styles.heroText}>{day.focus}</Text>
        <View style={styles.todayBox}>
          <Text style={styles.todayBoxLabel}>今天先做</Text>
          <Text style={styles.todayBoxTitle}>{firstTask.title}</Text>
          <Text style={styles.todayBoxText}>{firstTask.detail}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${todayPercent}%` }]} />
        </View>
        <Text style={styles.muted}>今日完成 {todayPercent}% · 还剩 {remainingTasks} 项</Text>
        <Pressable style={styles.primaryButton} onPress={onContinue}>
          <Play size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>开始今天学习</Text>
        </Pressable>
        <Pressable style={styles.secondaryWideButton} onPress={onOpenRoadmap}>
          <Text style={styles.secondaryButtonText}>查看全年路线</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        <Metric label="已完成天数" value={`${progress.completedDays.length}`} />
        <Metric label="累计分钟" value={`${totalCompletedMinutes}`} />
        <Metric label="待复习单词" value={`${dueWords}`} />
        <Metric label="提醒时间" value={`${pad(progress.reminderHour)}:${pad(progress.reminderMinute)}`} />
      </View>
    </View>
  );
}

function TodayScreen({
  day,
  completedTaskIds,
  onToggleTask,
  onNextDay,
  onPreviousDay,
  onOpenPlayer,
  onOpenWords,
  onOpenAi
}: {
  day: ReturnType<typeof buildCourseDay>;
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
  onNextDay: () => void;
  onPreviousDay: () => void;
  onOpenPlayer: () => void;
  onOpenWords: () => void;
  onOpenAi: () => void;
}) {
  const completedCount = day.tasks.filter((task) => completedTaskIds.includes(task.id)).length;
  const activeIndex = day.tasks.findIndex((task) => !completedTaskIds.includes(task.id));
  const activeTask = activeIndex >= 0 ? day.tasks[activeIndex] : undefined;
  const allDone = !activeTask;
  const helper =
    activeTask?.kind === "intensive" || activeTask?.kind === "shadowing"
      ? { label: "打开精听", onPress: onOpenPlayer }
      : activeTask?.kind === "vocabulary"
        ? { label: "打开单词本", onPress: onOpenWords }
        : activeTask?.kind === "checkpoint"
          ? { label: "打开AI老师", onPress: onOpenAi }
          : undefined;

  return (
    <View>
      <Text style={styles.kicker}>今日任务</Text>
      <Text style={styles.title}>第 {day.day} 天</Text>
      <Text style={styles.body}>{day.isReview ? "复习日：今天不学新材料，只巩固。" : day.focus}</Text>
      {day.checkpoint && <Text style={styles.warning}>{day.checkpoint}</Text>}

      <View style={styles.flowCard}>
        {allDone ? (
          <>
            <Text style={styles.stepBadge}>今天完成</Text>
            <Text style={styles.flowTitle}>今天的任务都做完了</Text>
            <Text style={styles.flowText}>可以结束学习，也可以点下一天提前看明天内容。</Text>
            <Pressable style={styles.primaryButton} onPress={onNextDay}>
              <Text style={styles.primaryButtonText}>进入下一天</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.stepBadge}>第 {activeIndex + 1} 步 / 共 {day.tasks.length} 步</Text>
            <Text style={styles.flowTitle}>{activeTask.title}</Text>
            <Text style={styles.flowText}>{activeTask.detail}</Text>
            {!!activeTask.action && <Text style={styles.flowAction}>{activeTask.action}</Text>}
            <View style={styles.flowMetaRow}>
              <Text style={styles.flowMeta}>预计 {activeTask.minutes} 分钟</Text>
              <Text style={styles.flowMeta}>已完成 {completedCount}/{day.tasks.length}</Text>
            </View>
            <Pressable style={styles.primaryButton} onPress={() => onToggleTask(activeTask.id)}>
              <CheckCircle2 size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>完成这一步</Text>
            </Pressable>
            {helper && (
              <Pressable style={styles.flowSecondaryButton} onPress={helper.onPress}>
                <Text style={styles.flowSecondaryButtonText}>{helper.label}</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>完整清单</Text>
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
                {!!task.action && <Text style={styles.taskAction}>{task.action}</Text>}
              </View>
              <Text style={styles.minutes}>{task.minutes}m</Text>
            </View>
          </Pressable>
        );
      })}

      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={onPreviousDay}>
          <Text style={styles.secondaryButtonText}>前一天</Text>
        </Pressable>
        <Pressable style={styles.primaryButtonSmall} onPress={onNextDay}>
          <Text style={styles.primaryButtonText}>下一天</Text>
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
      <Text style={styles.kicker}>精听播放器</Text>
      <Text style={styles.title}>单句循环</Text>
      <View style={styles.playerCard}>
        {!hideEnglish && <Text style={styles.sentence}>{sentence.english}</Text>}
        {!hideChinese && <Text style={styles.translation}>{sentence.chinese}</Text>}
      </View>
      <View style={styles.rowWrap}>
        <Pill label="朗读" onPress={speak} icon={<Volume2 size={18} color={theme.primaryDark} />} />
        <Pill label="循环3遍" onPress={() => loop(3)} icon={<RotateCcw size={18} color={theme.primaryDark} />} />
        <Pill label="循环5遍" onPress={() => loop(5)} icon={<RotateCcw size={18} color={theme.primaryDark} />} />
        <Pill label={hideEnglish ? "显示英文" : "隐藏英文"} onPress={() => setHideEnglish(!hideEnglish)} />
        <Pill label={hideChinese ? "显示中文" : "隐藏中文"} onPress={() => setHideChinese(!hideChinese)} />
        <Pill label={rate === 0.7 ? "0.85x" : rate === 0.85 ? "1.0x" : "0.7x"} onPress={() => setRate(rate === 0.7 ? 0.85 : rate === 0.85 ? 1 : 0.7)} />
      </View>
      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={() => setIndex(Math.max(0, index - 1))}>
          <Text style={styles.secondaryButtonText}>上一句</Text>
        </Pressable>
        <Pressable style={styles.primaryButtonSmall} onPress={() => setIndex((index + 1) % SAMPLE_SENTENCES.length)}>
          <Text style={styles.primaryButtonText}>下一句</Text>
        </Pressable>
      </View>
      <Text style={styles.note}>下一版会支持导入真实字幕。现在先用它练单句循环、隐藏字幕和跟读节奏。</Text>
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
      Alert.alert("信息不完整", "请至少填写英文单词和中文意思。");
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
      <Text style={styles.kicker}>生词本</Text>
      <Text style={styles.title}>今天复习 {due.length} 个</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} value={word} onChangeText={setWord} placeholder="英文单词" />
        <TextInput style={styles.input} value={meaning} onChangeText={setMeaning} placeholder="中文意思" />
        <TextInput style={styles.input} value={sentence} onChangeText={setSentence} placeholder="来自哪一句" />
        <Pressable style={styles.primaryButtonSmall} onPress={addWord}>
          <Text style={styles.primaryButtonText}>加入生词本</Text>
        </Pressable>
      </View>
      {due.map((card) => (
        <View key={card.id} style={styles.card}>
          <Text style={styles.taskTitle}>{card.word}</Text>
          <Text style={styles.body}>{card.meaning}</Text>
          {!!card.sentence && <Text style={styles.note}>{card.sentence}</Text>}
          <View style={styles.rowWrap}>
            <Pill label="忘了" onPress={() => grade(card, "forgot")} />
            <Pill label="困难" onPress={() => grade(card, "hard")} />
            <Pill label="会了" onPress={() => grade(card, "know")} />
            <Pill label="很熟" onPress={() => grade(card, "easy")} />
          </View>
        </View>
      ))}
    </View>
  );
}

function AiScreen({ prompt }: { prompt: string }) {
  function copyPrompt() {
    Clipboard.setStringAsync(prompt);
    Alert.alert("已复制", "把它发给ChatGPT，就能开始今天的小测。");
  }

  return (
    <View>
      <Text style={styles.kicker}>AI老师</Text>
      <Text style={styles.title}>今日小测提示词</Text>
      <View style={styles.card}>
        <Text style={styles.prompt}>{prompt}</Text>
      </View>
      <Pressable style={styles.primaryButton} onPress={copyPrompt}>
        <Brain size={20} color="#fff" />
        <Text style={styles.primaryButtonText}>复制提示词</Text>
      </Pressable>
      <Text style={styles.note}>核心计划离线可用。AI老师负责测试、纠错和调整节奏。</Text>
    </View>
  );
}

function RoadmapScreen() {
  return (
    <View>
      <Text style={styles.kicker}>全年路线</Text>
      <Text style={styles.title}>1000小时路线</Text>
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
      Alert.alert("需要权限", "通知没有开启。");
      return;
    }
    await scheduleDailyStudyReminder(hour, minute);
    await onUpdate({ ...progress, reminderHour: hour, reminderMinute: minute, notificationsEnabled: true });
    Alert.alert("提醒已设置", `每天 ${pad(hour)}:${pad(minute)} 提醒学习。`);
  }

  async function copyBackup() {
    const backup = await exportBackup();
    Clipboard.setStringAsync(backup);
    Alert.alert("备份已复制", "把这段文字保存到安全的地方。");
  }

  return (
    <View>
      <Text style={styles.kicker}>设置</Text>
      <Text style={styles.title}>懒人模式</Text>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>每日提醒</Text>
        <Text style={styles.body}>选一个固定时间。不要每天重新决定。</Text>
        <View style={styles.rowWrap}>
          <Pill label="8:00" onPress={() => enableNotifications(8, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="15:00" onPress={() => enableNotifications(15, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="20:00" onPress={() => enableNotifications(20, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="22:00" onPress={() => enableNotifications(22, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="3秒测试" onPress={scheduleTestNotification} />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>本地备份</Text>
        <Text style={styles.body}>把本地进度和生词复制成文字。以后换手机或版本也能恢复。</Text>
        <Pressable style={styles.primaryButtonSmall} onPress={copyBackup}>
          <Text style={styles.primaryButtonText}>复制备份</Text>
        </Pressable>
      </View>
    </View>
  );
}

function BottomNav({ tab, onChange }: { tab: Tab; onChange: (tab: Tab) => void }) {
  const items: Array<{ tab: Tab; label: string; icon: React.ReactNode }> = [
    { tab: "home", label: "首页", icon: <Home size={20} color={tab === "home" ? theme.primary : theme.muted} /> },
    { tab: "today", label: "今日", icon: <ListChecks size={20} color={tab === "today" ? theme.primary : theme.muted} /> },
    { tab: "player", label: "精听", icon: <Headphones size={20} color={tab === "player" ? theme.primary : theme.muted} /> },
    { tab: "words", label: "单词", icon: <BookOpen size={20} color={tab === "words" ? theme.primary : theme.muted} /> },
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
  todayBox: {
    backgroundColor: "#F3EFE5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E4D8C7",
    padding: 14,
    marginBottom: 16
  },
  todayBoxLabel: {
    color: theme.warm,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6
  },
  todayBoxTitle: {
    color: theme.ink,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6
  },
  todayBoxText: {
    color: theme.muted,
    lineHeight: 21
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
  flowCard: {
    backgroundColor: theme.primaryDark,
    borderRadius: 8,
    padding: 18,
    marginBottom: 16
  },
  stepBadge: {
    color: "#CFE6DE",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8
  },
  flowTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
    marginBottom: 10
  },
  flowText: {
    color: "#E5F2EE",
    fontSize: 16,
    lineHeight: 24
  },
  flowAction: {
    color: "#FFFFFF",
    fontWeight: "800",
    lineHeight: 22,
    marginTop: 10
  },
  flowMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 14
  },
  flowMeta: {
    color: "#CFE6DE",
    fontWeight: "700"
  },
  flowSecondaryButton: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CFE6DE",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  flowSecondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800"
  },
  sectionTitle: {
    color: theme.ink,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 2
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
  taskAction: {
    color: theme.primaryDark,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8
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
