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
import { getTaskSupport } from "./src/data/dayDetails";
import { SAMPLE_SENTENCES } from "./src/data/sampleSentences";
import { getWordHint } from "./src/data/wordHints";
import { ProgressState, WordCard } from "./src/types";
import { DEFAULT_PROGRESS, exportBackup, importBackup, loadProgress, loadWords, saveProgress, saveWords } from "./src/utils/storage";
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
  soft: "#F3EFE5",
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
  const completedMinutesToday = day.tasks
    .filter((task) => progress.completedTaskIds.includes(task.id))
    .reduce((sum, task) => sum + task.minutes, 0);
  const totalCompletedMinutes = progress.completedDays.length * 180 + completedMinutesToday;
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
      Alert.alert("已经完成", "你已经走完334天计划。");
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

  async function jumpToDay(dayNumber: number) {
    const nextDay = Math.min(COURSE_DAYS.length, Math.max(1, dayNumber));
    await updateProgress({ ...progress, currentDay: nextDay, completedTaskIds: [] });
    setTab("today");
  }

  async function restoreFromBackup(backupJson: string) {
    await importBackup(backupJson);
    const [restoredProgress, restoredWords] = await Promise.all([loadProgress(), loadWords()]);
    setProgress(restoredProgress);
    setWords(restoredWords);
    setTab("home");
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
              completedTaskIds={progress.completedTaskIds}
              onContinue={() => setTab("today")}
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
              onJumpToDay={jumpToDay}
              onRestoreBackup={restoreFromBackup}
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
  completedTaskIds,
  onContinue,
  onOpenSettings,
  onOpenRoadmap
}: {
  day: ReturnType<typeof buildCourseDay>;
  progress: ProgressState;
  todayPercent: number;
  totalCompletedMinutes: number;
  dueWords: number;
  completedTaskIds: string[];
  onContinue: () => void;
  onOpenSettings: () => void;
  onOpenRoadmap: () => void;
}) {
  const remainingTasks = day.tasks.length - Math.round((todayPercent / 100) * day.tasks.length);
  const firstUnfinished = day.tasks.find((task) => !completedTaskIds.includes(task.id)) ?? day.tasks[0];

  return (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>English1000 AI 老师</Text>
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

        <View style={styles.todayBox}>
          <Text style={styles.todayBoxLabel}>今天先做</Text>
          <Text style={styles.todayBoxTitle}>{firstUnfinished?.title}</Text>
          <Text style={styles.todayBoxText}>{firstUnfinished?.detail}</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${todayPercent}%` }]} />
        </View>
        <Text style={styles.muted}>今日完成 {todayPercent}% · 还剩 {remainingTasks} 项</Text>

        <Pressable style={styles.primaryButton} onPress={onContinue}>
          <Play size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>一键继续今天学习</Text>
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
  const support = activeTask ? getTaskSupport(day.day, activeTask.kind) : undefined;
  const [timerTaskId, setTimerTaskId] = useState<string | undefined>();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerActive = !!activeTask && timerTaskId === activeTask.id && remainingSeconds > 0;
  const remainingMinutes = day.tasks
    .filter((task) => !completedTaskIds.includes(task.id))
    .reduce((sum, task) => sum + task.minutes, 0);
  const helper =
    activeTask?.kind === "intensive" || activeTask?.kind === "shadowing"
      ? { label: "打开精听", onPress: onOpenPlayer }
      : activeTask?.kind === "vocabulary"
        ? { label: "打开单词本", onPress: onOpenWords }
        : activeTask?.kind === "checkpoint"
          ? { label: "打开AI老师", onPress: onOpenAi }
          : undefined;

  useEffect(() => {
    if (!timerRunning || remainingSeconds <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds((value) => {
        if (value <= 1) {
          clearInterval(timer);
          setTimerRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerRunning, remainingSeconds]);

  useEffect(() => {
    setTimerRunning(false);
    setRemainingSeconds(0);
    setTimerTaskId(undefined);
  }, [activeTask?.id]);

  function startTimer() {
    if (!activeTask) {
      return;
    }
    setTimerTaskId(activeTask.id);
    setRemainingSeconds(activeTask.minutes * 60);
    setTimerRunning(true);
  }

  function pauseTimer() {
    setTimerRunning(false);
  }

  function finishActiveTask() {
    if (!activeTask) {
      return;
    }
    setTimerRunning(false);
    setRemainingSeconds(0);
    setTimerTaskId(undefined);
    onToggleTask(activeTask.id);
  }

  return (
    <View>
      <Text style={styles.kicker}>今日任务</Text>
      <Text style={styles.title}>Day {day.day}</Text>
      <Text style={styles.body}>{day.isReview ? "复习日：今天不学新材料，只巩固。" : day.focus}</Text>
      <Text style={styles.note}>今天还剩大约 {remainingMinutes} 分钟</Text>
      {day.checkpoint && <Text style={styles.warning}>{day.checkpoint}</Text>}

      <View style={styles.flowCard}>
        {allDone ? (
          <>
            <Text style={styles.stepBadge}>今天完成</Text>
            <Text style={styles.flowTitle}>今天的任务都做完了</Text>
            <Text style={styles.flowText}>可以结束学习，也可以进入下一天提前看看明天内容。</Text>
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
            {support && (
              <View style={styles.supportBox}>
                <Text style={styles.supportTitle}>{support.title}</Text>
                {support.items.map((item, index) => (
                  <Text key={`${activeTask.id}-${index}`} style={styles.supportItem}>
                    {index + 1}. {item}
                  </Text>
                ))}
              </View>
            )}
            <View style={styles.flowMetaRow}>
              <Text style={styles.flowMeta}>预计 {activeTask.minutes} 分钟</Text>
              <Text style={styles.flowMeta}>已完成 {completedCount}/{day.tasks.length}</Text>
            </View>
            <View style={styles.timerPanel}>
              <Text style={styles.timerText}>{timerActive ? formatDuration(remainingSeconds) : `${activeTask.minutes}:00`}</Text>
              <Text style={styles.timerHint}>
                {timerRunning ? "正在计时，专心做这一项。" : remainingSeconds === 0 && timerTaskId === activeTask.id ? "时间到了，可以完成这一步。" : "点开始，不用再看钟。"}
              </Text>
              <View style={styles.rowWrap}>
                <Pill label={timerRunning ? "暂停计时" : timerActive ? "继续计时" : "开始计时"} onPress={timerRunning ? pauseTimer : startTimer} />
                {timerActive && <Pill label="重置" onPress={startTimer} />}
              </View>
            </View>
            <Pressable style={styles.primaryButton} onPress={finishActiveTask}>
              <CheckCircle2 size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>完成这一步，自动到下一步</Text>
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

  return (
    <View>
      <Text style={styles.kicker}>精听播放器</Text>
      <Text style={styles.title}>一句一句练</Text>
      <View style={styles.card}>
        <Text style={styles.note}>当前句 {index + 1} / {SAMPLE_SENTENCES.length}</Text>
        {!hideEnglish && <Text style={styles.bigSentence}>{sentence.english}</Text>}
        {!hideChinese && <Text style={styles.body}>{sentence.chinese}</Text>}
        <Pressable style={styles.primaryButton} onPress={speak}>
          <Volume2 size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>播放原句</Text>
        </Pressable>
        <View style={styles.rowWrap}>
          <Pill label="上一句" onPress={() => setIndex((index + SAMPLE_SENTENCES.length - 1) % SAMPLE_SENTENCES.length)} />
          <Pill label="下一句" onPress={() => setIndex((index + 1) % SAMPLE_SENTENCES.length)} />
          <Pill label={hideEnglish ? "显示英文" : "隐藏英文"} onPress={() => setHideEnglish(!hideEnglish)} />
          <Pill label={hideChinese ? "显示中文" : "隐藏中文"} onPress={() => setHideChinese(!hideChinese)} />
          <Pill label={`速度 ${rate.toFixed(2)}`} onPress={() => setRate(rate >= 1 ? 0.7 : Number((rate + 0.15).toFixed(2)))} />
        </View>
      </View>
    </View>
  );
}

function WordsScreen({ words, onUpdate }: { words: WordCard[]; onUpdate: (words: WordCard[]) => void }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const dueWords = words.filter(isDue);
  const hint = getWordHint(word);
  const quickWords = [
    "appointment",
    "maintenance",
    "insurance",
    "clinic",
    "account",
    "deposit",
    "license",
    "document",
    "repeat",
    "confirm",
    "problem",
    "customer"
  ];

  function updateWord(nextWord: string) {
    setWord(nextWord);
    const nextHint = getWordHint(nextWord);
    if (nextHint) {
      setMeaning(nextHint.meaning);
      setSentence(nextHint.sentence);
    }
  }

  async function addWord() {
    if (!word.trim()) {
      Alert.alert("先输入单词", "单词不能为空。");
      return;
    }
    const normalized = word.trim().toLowerCase();
    if (words.some((item) => item.word.trim().toLowerCase() === normalized)) {
      Alert.alert("已经在生词本里", "这个词已经保存过了，直接去复习就行。");
      return;
    }
    const nextHint = getWordHint(word);
    await onUpdate([
      createWordCard(
        word,
        meaning || nextHint?.meaning || "待补充",
        sentence || nextHint?.sentence || "来自今天课程"
      ),
      ...words
    ]);
    setWord("");
    setMeaning("");
    setSentence("");
  }

  async function grade(card: WordCard, score: "forgot" | "hard" | "know" | "easy") {
    await onUpdate(words.map((item) => item.id === card.id ? reviewWord(item, score) : item));
  }

  return (
    <View>
      <Text style={styles.kicker}>生词本</Text>
      <Text style={styles.title}>只记真会用的词</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} value={word} onChangeText={updateWord} placeholder="只输入英文，例如 appointment" autoCapitalize="none" />
        <TextInput style={styles.input} value={meaning} onChangeText={setMeaning} placeholder="中文意思会自动补，可以修改" />
        <TextInput style={styles.input} value={sentence} onChangeText={setSentence} placeholder="例句会自动补，可以修改" />
        {hint && (
          <Text style={styles.note}>已自动匹配：{hint.meaning} / {hint.sentence}</Text>
        )}
        {!hint && !!word.trim() && (
          <Text style={styles.note}>词库暂时没有这个词，也可以直接保存，之后再补中文。</Text>
        )}
        <Pressable style={styles.primaryButtonSmall} onPress={addWord}>
          <Text style={styles.primaryButtonText}>加入生词本</Text>
        </Pressable>
        <Text style={styles.quickLabel}>生活高频快捷词</Text>
        <View style={styles.rowWrap}>
          {quickWords.map((item) => (
            <Pill key={item} label={item} onPress={() => updateWord(item)} />
          ))}
        </View>
      </View>
      <Text style={styles.sectionTitle}>今天要复习：{dueWords.length}</Text>
      {(dueWords.length ? dueWords : words.slice(0, 6)).map((card) => (
        <View key={card.id} style={styles.card}>
          <Text style={styles.taskTitle}>{card.word}</Text>
          <Text style={styles.body}>{card.meaning}</Text>
          <Text style={styles.note}>{card.sentence}</Text>
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
  async function copyPrompt() {
    await Clipboard.setStringAsync(prompt);
    Alert.alert("已复制", "把提示词发给ChatGPT，就能开始今天的AI老师测试。");
  }

  return (
    <View>
      <Text style={styles.kicker}>AI老师</Text>
      <Text style={styles.title}>今天这样测试</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{prompt}</Text>
        <Pressable style={styles.primaryButton} onPress={copyPrompt}>
          <Brain size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>复制AI提示词</Text>
        </Pressable>
      </View>
    </View>
  );
}

function RoadmapScreen() {
  return (
    <View>
      <Text style={styles.kicker}>1000小时路线</Text>
      <Text style={styles.title}>只走一条主线</Text>
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

function SettingsScreen({
  progress,
  onUpdate,
  onJumpToDay,
  onRestoreBackup
}: {
  progress: ProgressState;
  onUpdate: (progress: ProgressState) => void;
  onJumpToDay: (day: number) => void;
  onRestoreBackup: (backupJson: string) => Promise<void>;
}) {
  const [dayText, setDayText] = useState(String(progress.currentDay));
  const [backupText, setBackupText] = useState("");

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
    await Clipboard.setStringAsync(backup);
    Alert.alert("备份已复制", "把这段文字保存到安全的地方，以后可以恢复进度。");
  }

  async function restoreBackup() {
    if (!backupText.trim()) {
      Alert.alert("先粘贴备份", "把之前复制的备份文字粘贴进来。");
      return;
    }
    try {
      await onRestoreBackup(backupText);
      setBackupText("");
      Alert.alert("恢复成功", "进度和生词本已经恢复。");
    } catch {
      Alert.alert("恢复失败", "备份文字格式不对。请确认复制的是完整备份。");
    }
  }

  function jump() {
    const parsed = Number(dayText);
    if (!Number.isFinite(parsed)) {
      Alert.alert("请输入数字", "例如 1、7、34、85。");
      return;
    }
    onJumpToDay(parsed);
  }

  return (
    <View>
      <Text style={styles.kicker}>设置</Text>
      <Text style={styles.title}>懒人模式</Text>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>每日提醒</Text>
        <Text style={styles.body}>选一个固定时间。以后点通知，直接继续今天第一个没完成的任务。</Text>
        <View style={styles.rowWrap}>
          <Pill label="8:00" onPress={() => enableNotifications(8, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="15:00" onPress={() => enableNotifications(15, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="20:00" onPress={() => enableNotifications(20, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="22:00" onPress={() => enableNotifications(22, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="3秒测试" onPress={scheduleTestNotification} />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>跳到某一天</Text>
        <Text style={styles.body}>测试课程时用。正式学习时不要乱跳，按顺序走。</Text>
        <View style={styles.inlineForm}>
          <TextInput style={[styles.input, styles.dayInput]} value={dayText} onChangeText={setDayText} keyboardType="number-pad" />
          <Pressable style={styles.primaryButtonSmall} onPress={jump}>
            <Text style={styles.primaryButtonText}>跳转</Text>
          </Pressable>
        </View>
        <View style={styles.rowWrap}>
          <Pill label="Day 1" onPress={() => onJumpToDay(1)} />
          <Pill label="Day 7" onPress={() => onJumpToDay(7)} />
          <Pill label="Day 35" onPress={() => onJumpToDay(35)} />
          <Pill label="Day 85" onPress={() => onJumpToDay(85)} />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>本地备份</Text>
        <Text style={styles.body}>把本地进度和生词复制成文字。以后换手机或换版本，也能保住你的数据。</Text>
        <Pressable style={styles.primaryButtonSmall} onPress={copyBackup}>
          <Text style={styles.primaryButtonText}>复制备份</Text>
        </Pressable>
        <Text style={styles.quickLabel}>恢复备份</Text>
        <TextInput
          style={[styles.input, styles.backupInput]}
          value={backupText}
          onChangeText={setBackupText}
          placeholder="把备份文字粘贴到这里"
          multiline
        />
        <Pressable style={styles.secondaryWideButton} onPress={restoreBackup}>
          <Text style={styles.secondaryButtonText}>从备份恢复</Text>
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

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${pad(seconds)}`;
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
    backgroundColor: theme.soft,
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
    gap: 8,
    paddingHorizontal: 16
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
    color: theme.danger,
    fontWeight: "800",
    marginBottom: 12
  },
  flowCard: {
    backgroundColor: theme.primaryDark,
    borderRadius: 8,
    padding: 18,
    marginVertical: 16
  },
  stepBadge: {
    color: "#D9F0E9",
    fontWeight: "800",
    marginBottom: 8
  },
  flowTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8
  },
  flowText: {
    color: "#E5F2EE",
    lineHeight: 22
  },
  flowAction: {
    color: "#FFE5C7",
    fontWeight: "800",
    marginTop: 10,
    lineHeight: 22
  },
  supportBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 14
  },
  supportTitle: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 8
  },
  supportItem: {
    color: "#EDF7F4",
    lineHeight: 23,
    marginBottom: 4
  },
  flowMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14
  },
  flowMeta: {
    color: "#CFE7DF",
    fontWeight: "700"
  },
  flowSecondaryButton: {
    marginTop: 10,
    minHeight: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  flowSecondaryButtonText: {
    color: "#fff",
    fontWeight: "800"
  },
  timerPanel: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 14
  },
  timerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800"
  },
  timerHint: {
    color: "#DCEDE8",
    lineHeight: 20,
    marginTop: 4
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    color: theme.ink,
    fontSize: 20,
    fontWeight: "800"
  },
  taskCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.line,
    marginBottom: 10
  },
  taskCardDone: {
    backgroundColor: "#EEF6F3",
    borderColor: "#BBD8D0"
  },
  taskTop: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  taskIcon: {
    width: 28,
    alignItems: "center"
  },
  taskMain: {
    flex: 1
  },
  taskTitle: {
    color: theme.ink,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6
  },
  taskDetail: {
    color: theme.muted,
    lineHeight: 21
  },
  taskAction: {
    color: theme.primaryDark,
    fontWeight: "800",
    marginTop: 6,
    lineHeight: 21
  },
  minutes: {
    color: theme.warm,
    fontWeight: "800"
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    marginBottom: 18
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.line,
    marginBottom: 12
  },
  note: {
    color: theme.warm,
    fontWeight: "700",
    lineHeight: 21,
    marginBottom: 8
  },
  quickLabel: {
    color: theme.ink,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 2
  },
  bigSentence: {
    color: theme.ink,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 10
  },
  input: {
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.line,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    color: theme.ink
  },
  inlineForm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4
  },
  dayInput: {
    width: 100,
    marginBottom: 0
  },
  backupInput: {
    minHeight: 110,
    textAlignVertical: "top",
    marginTop: 8
  },
  nav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 76,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.line,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "20%"
  },
  navLabel: {
    color: theme.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  navLabelActive: {
    color: theme.primary
  },
  pill: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: theme.soft,
    borderColor: theme.line,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    minHeight: 38
  },
  pillText: {
    color: theme.primaryDark,
    fontWeight: "800"
  }
});
