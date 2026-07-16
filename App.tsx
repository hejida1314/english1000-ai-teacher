import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  AppState,
  Linking,
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
  Dumbbell,
  Headphones,
  Home,
  ListChecks,
  NotebookPen,
  Play,
  RotateCcw,
  Settings,
  Volume2,
  WalletCards
} from "lucide-react-native";

import { COURSE_DAYS, ROADMAP, buildCourseDay } from "./src/data/course";
import { getTaskSupport } from "./src/data/dayDetails";
import { getSentencesForDay } from "./src/data/sampleSentences";
import { getWordHint } from "./src/data/wordHints";
import { InterfaceLanguage, LifeLog, ProgressState, WordCard } from "./src/types";
import { DEFAULT_PROGRESS, exportBackup, importBackup, loadLifeLogs, loadProgress, loadWords, saveLifeLogs, saveProgress, saveWords } from "./src/utils/storage";
import { requestNotificationPermission, scheduleDailyStudyReminder, scheduleTestNotification } from "./src/utils/notifications";
import { createWordCard, isDue, reviewWord } from "./src/utils/words";

type Tab = "home" | "today" | "player" | "words" | "ai" | "life" | "roadmap" | "settings";
type LifeMode = "health" | "money" | "journal";
type TFunc = (key: TranslationKey, values?: Record<string, string | number>) => string;

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

const translations = {
  zh: {
    loading: "正在读取本地进度...",
    appName: "English1000 AI 老师",
    todayFirst: "今天先做",
    todayProgress: "今日完成 {percent}% · 还剩 {count} 项",
    continueToday: "一键继续今天学习",
    roadmapCta: "查看全年路线",
    todaySnapshotTitle: "今日总览",
    snapshotEnglish: "英语",
    snapshotEnglishMinutes: "{done}/180m",
    snapshotWorkout: "训练",
    snapshotSpending: "花费",
    snapshotMood: "状态",
    snapshotWorkoutValue: "{done}/5",
    snapshotMoodEmpty: "未记",
    nextActionTitle: "下一步",
    nextActionEnglish: "先完成今天英语主线。",
    nextActionWords: "今天有到期单词，先复习一下。",
    nextActionWorkout: "英语完成后，做最小力量训练。",
    nextActionJournal: "睡前写两句，明天更清楚。",
    nextActionDone: "今天核心任务都稳了，可以收工。",
    openNextAction: "直接去做",
    quickCaptureTitle: "万能速记",
    quickCaptureBody: "看到单词、花了钱、想到事情，先丢这里。点智能保存，App 先帮你判断。",
    quickCapturePlaceholder: "例如：appointment, maintenance / $12 lunch / 今天练了深蹲",
    smartSave: "智能保存",
    smartSaveEmptyTitle: "先输入内容",
    smartSaveEmptyBody: "粘贴单词、金额或一句日记，再点智能保存。",
    saveAsWords: "存生词",
    saveAsExpense: "记账",
    saveAsJournal: "写日记",
    quickCaptureSavedTitle: "已记录",
    quickCaptureWordsSaved: "新增 {count} 个生词，跳过 {skipped} 个重复。",
    quickCaptureExpenseSaved: "已记账：${amount}",
    quickCaptureJournalSaved: "已追加到今天日记。",
    quickCaptureNeedAmount: "记账需要一个金额，例如 $12 lunch。",
    lifeSystemTitle: "生活操作台",
    lifeSystemBody: "一个首页管今天，四个模块管长期。不要每天找 App。",
    commandCenterTitle: "今日操作台",
    commandCenterBody: "今天只盯四件事：学英语、动一下、记一笔、写两句。少切 App，少做选择。",
    commandEnglishTitle: "英语主线",
    commandEnglishBody: "先完成今天第一个未完成任务。",
    commandHealthTitle: "健康训练",
    commandHealthBody: "最低标准也算：深蹲、核心或拉伸。",
    commandMoneyTitle: "今日记账",
    commandMoneyBody: "花了钱就记一笔，没花不用硬记。",
    commandJournalTitle: "今日记事",
    commandJournalBody: "睡前写两句，明天更清楚。",
    commandDone: "已完成",
    commandNotDone: "未完成",
    commandNoSpend: "暂无花费",
    moduleStudyTitle: "学习",
    moduleStudyBody: "英语主线、精听、生词、AI测试。",
    moduleHealthTitle: "健康",
    moduleHealthBody: "深蹲、推拉、核心、走路拉伸。",
    moduleMoneyTitle: "记账",
    moduleMoneyBody: "只记真实花费，先把钱看见。",
    moduleJournalTitle: "记事",
    moduleJournalBody: "今天做了什么、身体状态、明天提醒。",
    streak: "连续完成",
    weekPercent: "本周完成率",
    completedDays: "已完成天数",
    completedHours: "累计小时",
    remainingHours: "剩余小时",
    dueWords: "待复习单词",
    reminderTime: "提醒时间",
    daysUnit: "{count}天",
    todayTasks: "今日任务",
    reviewDayBody: "复习日：今天不学新材料，只巩固。",
    remainingMinutes: "今天还剩大约 {minutes} 分钟",
    actualStudyToday: "今天已学 {done} 分钟，还差 {left} 分钟",
    portableCardTitle: "上班随身卡",
    portableCardBody: "一键复制今天任务、句子、单词和AI提示词。路上或上班时，即使 Expo Go 不稳定，也能照着学。",
    copyPortableCard: "复制今天随身卡",
    portableCardCopiedTitle: "随身卡已复制",
    portableCardCopiedBody: "可以粘到微信、备忘录或短信里，上班也能照着学。",
    todayDoneBadge: "今天完成",
    allDoneTitle: "今天的任务都做完了",
    allDoneText: "可以结束学习，也可以进入下一天提前看看明天内容。",
    earlyFinishTitle: "提前完成建议",
    earlyFinishBody: "默认选择：轻复习10到20分钟，然后收工。只有精神很好时，才预习下一天。",
    reviewPlayerCta: "复听今天句子",
    reviewWordsCta: "复习到期单词",
    previewNextDayCta: "状态很好，预习下一天",
    copyDailyReview: "复制今日复盘给AI老师",
    nextDay: "进入下一天",
    stepCount: "第 {current} 步 / 共 {total} 步",
    openResource: "打开学习资源",
    resourceNote: "外部平台播放，App只记录学习任务",
    addTodayWords: "一键加入今日10词",
    estimatedMinutes: "预计 {minutes} 分钟",
    completedCount: "已完成 {done}/{total}",
    understanding: "理解度：{value}",
    notRecorded: "未记录",
    understandingHint: "大概估一下就行，用来判断材料难不难。",
    understandingAdviceLow: "结论：材料太难。不要硬冲，重听同一段10分钟，明天还用这个难度。",
    understandingAdviceMid: "结论：难度刚好。继续下一步，今天不用追求每句都懂。",
    understandingAdviceHigh: "结论：可以升级。下一次少看字幕，更多靠耳朵和画面理解。",
    timerRunning: "正在计时，专心做这一项。",
    timerDone: "时间到了，可以完成这一步。",
    timerIdle: "点开始，不用再看钟。",
    pauseTimer: "暂停计时",
    resumeTimer: "继续计时",
    startTimer: "开始计时",
    rescueTimer: "10分钟保底",
    reset: "重置",
    finishStep: "完成这一步，自动到下一步",
    fullChecklist: "完整清单",
    previousDay: "前一天",
    nextDayShort: "下一天",
    openPlayer: "打开精听",
    openWords: "打开单词本",
    openAi: "打开AI老师",
    linkErrorTitle: "打不开链接",
    linkErrorBody: "这个设备暂时无法打开该资源链接。",
    reviewCopiedTitle: "复盘提示词已复制",
    reviewCopiedBody: "发给AI老师，就能做今天的收尾测试。",
    wordsAlreadyAddedTitle: "已经加入过了",
    wordsAlreadyAddedBody: "今天这些词已经在生词本里。",
    wordsAddedTitle: "已加入生词本",
    wordsAddedBody: "新增 {count} 个词，重复的自动跳过。",
    playerKicker: "精听播放器",
    playerTitle: "Day {day} 句子精听",
    currentSentence: "{phase} · 当前句 {current} / {total}",
    playSentence: "播放原句",
    playThree: "读3遍",
    aiExplainSentence: "AI解释这句",
    previousSentence: "上一句",
    nextSentence: "下一句",
    showEnglish: "显示英文",
    hideEnglish: "隐藏英文",
    showChinese: "显示中文",
    hideChinese: "隐藏中文",
    speed: "速度 {rate}",
    dictationTitle: "轻量听写",
    dictationBody: "先点“播放原句”，再凭记忆写下来。不要求满分，只看有没有抓住主干。",
    dictationPlaceholder: "听到什么就写什么",
    checkDictation: "检查听写",
    clear: "清空",
    similarity: "相似度：{score}%",
    originalSentence: "原句：{sentence}",
    yourAnswer: "你写的：{answer}",
    keywordsTitle: "这句值得存的词",
    keywordsBody: "点一下就加入生词本，已存在的词会提醒你。",
    sentencePromptCopiedTitle: "已复制",
    sentencePromptCopiedBody: "发给AI老师，让它解释这句并给你替换练习。",
    wordbookKicker: "生词本",
    wordbookTitle: "只记真会用的词",
    wordPlaceholder: "只输入英文，例如 appointment",
    meaningPlaceholder: "中文意思会自动补，可以修改",
    sentencePlaceholder: "例句会自动补，可以修改",
    hintMatched: "已自动匹配：{meaning} / {sentence}",
    noHint: "词库暂时没有这个词，也可以直接保存，之后再补中文。",
    addWord: "加入生词本",
    bulkImportTitle: "批量导入",
    bulkImportBody: "看视频时，把字幕、评论、笔记里的重要英文词粘到这里。逗号、空格、换行都可以。",
    bulkImportPlaceholder: "例如：listen, understand, repeat\n或者直接粘贴一段英文字幕",
    pasteClipboard: "粘贴剪贴板",
    importWords: "一键导入生词",
    bulkImportSuccessTitle: "已导入",
    bulkImportSuccessBody: "新增 {count} 个生词，跳过 {skipped} 个重复词。",
    bulkImportEmptyTitle: "没有找到英文词",
    bulkImportEmptyBody: "请粘贴英文单词或英文字幕。",
    clipboardEmptyTitle: "剪贴板是空的",
    clipboardEmptyBody: "先从截图、字幕或网页里复制英文，再回到这里粘贴。",
    quickWords: "生活高频快捷词",
    dueReview: "今天要复习：{count}",
    speakWord: "读单词",
    speakSentence: "读例句",
    forgot: "忘了",
    hard: "困难",
    know: "会了",
    easy: "很熟",
    enterWordTitle: "先输入单词",
    enterWordBody: "单词不能为空。",
    duplicateWordTitle: "已经在生词本里",
    duplicateWordBody: "这个词已经保存过了，直接去复习就行。",
    duplicateSentenceWordBody: "{word} 已经保存过了。",
    pendingMeaning: "待补充",
    fromTodayCourse: "来自今天课程",
    aiKicker: "AI老师",
    aiTitle: "今天这样测试",
    copyAiPrompt: "复制AI提示词",
    aiPromptCopiedBody: "把提示词发给ChatGPT，就能开始今天的AI老师测试。",
    lifeKicker: "生活管理",
    lifeTitle: "今天别散掉",
    lifeBody: "英语、力量、花钱、日记放在一页。目标不是完美，是每天不失控。",
    lifeModeHealth: "健康",
    lifeModeMoney: "记账",
    lifeModeJournal: "记事",
    workoutTitle: "力量训练",
    workoutBody: "先做最小可执行量。休息日也可以只完成深蹲和拉伸。",
    workoutPlanTitle: "今日推荐",
    workoutPlanBody: "不用每天想练什么。按今天计划做；很累就点保底。",
    workoutPlanDone: "完成今日推荐",
    workoutRescue: "10分钟保底",
    workoutRescueBody: "状态差也不归零：深蹲一组 + 走路/拉伸10分钟。",
    workoutRecommended: "推荐",
    workoutPlanLower: "下肢 + 核心",
    workoutPlanUpper: "推拉 + 核心",
    workoutPlanRecovery: "恢复日",
    workoutPlanFull: "全身轻量",
    workoutPlanLowerBody: "深蹲为主，核心收尾。适合不去健身房也能做。",
    workoutPlanUpperBody: "推和拉各一点，避免只练一个方向。",
    workoutPlanRecoveryBody: "走路、拉伸、核心轻量。目标是不断线。",
    workoutPlanFullBody: "全身都碰一下，不追求练爆，追求完成。",
    expenseTitle: "记账",
    expenseBody: "只记今天真实花出去的钱，先别追求复杂分类。",
    expenseAmountPlaceholder: "金额，例如 12.5",
    expenseCategoryPlaceholder: "分类，例如 food / gas",
    expenseNotePlaceholder: "备注，例如 lunch",
    expenseQuickAmount: "快捷金额",
    expenseQuickCategory: "快捷分类",
    expensePresetsTitle: "一键常用消费",
    expensePresetsBody: "常见消费直接点，不用每次输入。",
    recentExpenses: "今天最近几笔",
    addExpense: "添加花费",
    todayExpense: "今日花费：${amount}",
    journalTitle: "日记",
    journalBody: "写几句就行：今天做了什么、花了什么、身体状态、英语完成没有。",
    moodTitle: "今天状态",
    moodGood: "好",
    moodOkay: "一般",
    moodTired: "累",
    moodBad: "差",
    journalPlaceholder: "今天记录...",
    journalTemplateTitle: "睡前30秒模板",
    journalTemplateBody: "不想写长篇，就回答三句。重点是留下记录，不是写作文。",
    insertJournalTemplate: "插入三问模板",
    journalQuickLinesTitle: "快速句子",
    journalPromptDone: "今天完成：",
    journalPromptBody: "身体状态：",
    journalPromptTomorrow: "明天最重要：",
    journalQuickEnglishDone: "英语完成了。",
    journalQuickWorkoutDone: "训练完成了。",
    journalQuickTired: "今天很累，保底完成。",
    journalQuickTomorrowContinue: "明天继续，不换计划。",
    saveJournal: "保存日记",
    lifeSavedTitle: "已保存",
    lifeSavedBody: "今天的生活记录已经保存在本地。",
    weeklyWorkoutTitle: "7天训练",
    weeklyWorkoutBody: "有点就算赢，不追求每天完美。",
    monthlySpendingTitle: "本月花费",
    monthlySpendingBody: "先看钱花到哪里，再决定要不要控制。",
    recentJournalTitle: "最近记录",
    recentJournalEmpty: "还没有日记，今天写两句就够。",
    noExpenseYet: "本月还没有记账。",
    invalidExpenseTitle: "金额不对",
    invalidExpenseBody: "请输入数字，例如 8、12.5、30。",
    roadmapKicker: "1000小时路线",
    roadmapTitle: "只走一条主线",
    openStageResource: "打开阶段资源",
    settingsKicker: "设置",
    settingsTitle: "懒人模式",
    languageTitle: "界面语言",
    languageBody: "中文适合现在执行，English 适合后期沉浸。切换后会自动保存。",
    chinese: "中文",
    english: "English",
    dailyReminder: "每日提醒",
    reminderBody: "选一个固定时间。以后点通知，直接继续今天第一个没完成的任务。",
    test3Seconds: "3秒测试",
    jumpTitle: "跳到某一天",
    jumpBody: "测试课程时用。正式学习时不要乱跳，按顺序走。",
    jump: "跳转",
    localBackup: "本地备份",
    backupBody: "把本地进度和生词复制成文字。以后换手机或换版本，也能保住你的数据。",
    homeBackupTitle: "数据别丢",
    homeBackupBody: "英语、生词、训练、记账、日记都在本地。每隔几天复制一次备份，换手机也能恢复。",
    closeoutTitle: "今日收工判断",
    closeoutBody: "别靠感觉。下面都变绿，今天就算稳了。",
    closeoutReady: "可以收工",
    closeoutNeedWork: "还差一点",
    closeoutEnglish: "英语主线",
    closeoutWords: "到期单词",
    closeoutHealth: "健康训练",
    closeoutJournal: "今日记事",
    closeoutDone: "已完成",
    closeoutTodo: "待完成",
    runModeTitle: "运行方式",
    runModeExpo: "当前：Expo Go 测试版",
    runModeBody: "手机能打开，是因为电脑正在运行开发服务器。黑窗口关掉、电脑睡眠或换网络，手机就会打不开。",
    runModeStandalone: "以后做独立安装版后，才可以像普通 App 一样离开电脑使用。",
    copyBackup: "复制备份",
    restoreBackupTitle: "恢复备份",
    backupPlaceholder: "把备份文字粘贴到这里",
    restoreFromBackup: "从备份恢复",
    permissionTitle: "需要权限",
    permissionBody: "通知没有开启。",
    reminderSetTitle: "提醒已设置",
    reminderSetBody: "每天 {time} 提醒学习。",
    backupCopiedTitle: "备份已复制",
    backupCopiedBody: "把这段文字保存到安全的地方，以后可以恢复进度。",
    pasteBackupTitle: "先粘贴备份",
    pasteBackupBody: "把之前复制的备份文字粘贴进来。",
    restoreSuccessTitle: "恢复成功",
    restoreSuccessBody: "进度和生词本已经恢复。",
    restoreFailTitle: "恢复失败",
    restoreFailBody: "备份文字格式不对。请确认复制的是完整备份。",
    enterNumberTitle: "请输入数字",
    enterNumberBody: "例如 1、7、34、85。",
    navHome: "首页",
    navToday: "今日",
    navPlayer: "精听",
    navWords: "单词",
    navLife: "生活",
    navAi: "AI",
    completedPlanTitle: "已经完成",
    completedPlanBody: "你已经走完334天计划。"
  },
  en: {
    loading: "Loading local progress...",
    appName: "English1000 AI Teacher",
    todayFirst: "Start here",
    todayProgress: "{percent}% done today · {count} tasks left",
    continueToday: "Continue today's study",
    roadmapCta: "View full roadmap",
    todaySnapshotTitle: "Today Snapshot",
    snapshotEnglish: "English",
    snapshotEnglishMinutes: "{done}/180m",
    snapshotWorkout: "Workout",
    snapshotSpending: "Spent",
    snapshotMood: "Mood",
    snapshotWorkoutValue: "{done}/5",
    snapshotMoodEmpty: "None",
    nextActionTitle: "Next Action",
    nextActionEnglish: "Finish today's English main path first.",
    nextActionWords: "Some words are due. Review them first.",
    nextActionWorkout: "After English, do the smallest strength session.",
    nextActionJournal: "Write two lines before bed. Tomorrow gets clearer.",
    nextActionDone: "Core tasks are steady today. You can stop.",
    openNextAction: "Do this now",
    quickCaptureTitle: "Quick Capture",
    quickCaptureBody: "Words, spending, and notes all start here. Tap Smart Save and the app will guess first.",
    quickCapturePlaceholder: "Example: appointment, maintenance / $12 lunch / squats done today",
    smartSave: "Smart save",
    smartSaveEmptyTitle: "Add something first",
    smartSaveEmptyBody: "Paste words, an amount, or a journal line, then tap Smart Save.",
    saveAsWords: "Save words",
    saveAsExpense: "Expense",
    saveAsJournal: "Journal",
    quickCaptureSavedTitle: "Saved",
    quickCaptureWordsSaved: "Added {count} words. Skipped {skipped} duplicates.",
    quickCaptureExpenseSaved: "Expense saved: ${amount}",
    quickCaptureJournalSaved: "Added to today's journal.",
    quickCaptureNeedAmount: "Expense needs an amount, e.g. $12 lunch.",
    lifeSystemTitle: "Life Dashboard",
    lifeSystemBody: "One home screen for today, four modules for the long run. Stop hunting for apps.",
    commandCenterTitle: "Today Command Center",
    commandCenterBody: "Track only four things today: English, movement, money, and notes. Fewer apps, fewer decisions.",
    commandEnglishTitle: "English path",
    commandEnglishBody: "Finish the first unfinished task today.",
    commandHealthTitle: "Health training",
    commandHealthBody: "Minimum counts: squats, core, or stretching.",
    commandMoneyTitle: "Money log",
    commandMoneyBody: "Record spending when it happens. No spending is fine.",
    commandJournalTitle: "Daily note",
    commandJournalBody: "Write two lines before bed.",
    commandDone: "Done",
    commandNotDone: "Not done",
    commandNoSpend: "No spend",
    moduleStudyTitle: "Study",
    moduleStudyBody: "English roadmap, listening, words, AI test.",
    moduleHealthTitle: "Health",
    moduleHealthBody: "Squats, push/pull, core, walking and stretching.",
    moduleMoneyTitle: "Money",
    moduleMoneyBody: "Record real spending first. Make money visible.",
    moduleJournalTitle: "Notes",
    moduleJournalBody: "What happened, body status, and tomorrow reminders.",
    streak: "Streak",
    weekPercent: "Week progress",
    completedDays: "Days done",
    completedHours: "Hours done",
    remainingHours: "Hours left",
    dueWords: "Words due",
    reminderTime: "Reminder",
    daysUnit: "{count} days",
    todayTasks: "Today's Tasks",
    reviewDayBody: "Review day: no new material, only reinforcement.",
    remainingMinutes: "About {minutes} minutes left today",
    actualStudyToday: "Studied {done} min today. {left} min left.",
    portableCardTitle: "Workday Pocket Card",
    portableCardBody: "Copy today's tasks, sentences, words, and AI prompt. If Expo Go is unstable away from your computer, you can still study from Notes or WeChat.",
    copyPortableCard: "Copy today's pocket card",
    portableCardCopiedTitle: "Pocket card copied",
    portableCardCopiedBody: "Paste it into Notes, WeChat, or Messages and study at work.",
    todayDoneBadge: "Done today",
    allDoneTitle: "All tasks are done",
    allDoneText: "You can stop here or move to the next day.",
    earlyFinishTitle: "Early Finish Advice",
    earlyFinishBody: "Default choice: do 10 to 20 minutes of light review, then stop. Preview the next day only if you still feel fresh.",
    reviewPlayerCta: "Review today's sentences",
    reviewWordsCta: "Review due words",
    previewNextDayCta: "I feel fresh, preview next day",
    copyDailyReview: "Copy review prompt for AI Teacher",
    nextDay: "Go to next day",
    stepCount: "Step {current} of {total}",
    openResource: "Open study resource",
    resourceNote: "Played on an external platform. The app only tracks your task.",
    addTodayWords: "Add today's 10 words",
    estimatedMinutes: "About {minutes} min",
    completedCount: "{done}/{total} done",
    understanding: "Understanding: {value}",
    notRecorded: "Not recorded",
    understandingHint: "A rough estimate is enough. It helps judge difficulty.",
    understandingAdviceLow: "Decision: too hard. Do not force it. Replay the same clip for 10 minutes and keep this level tomorrow.",
    understandingAdviceMid: "Decision: good difficulty. Continue to the next step. You do not need every sentence today.",
    understandingAdviceHigh: "Decision: ready to level up. Next time, use fewer subtitles and rely more on listening and visuals.",
    timerRunning: "Timer running. Focus on this task.",
    timerDone: "Time is up. You can finish this step.",
    timerIdle: "Press start. No need to watch the clock.",
    pauseTimer: "Pause timer",
    resumeTimer: "Resume timer",
    startTimer: "Start timer",
    rescueTimer: "10-min minimum",
    reset: "Reset",
    finishStep: "Finish this step and continue",
    fullChecklist: "Full Checklist",
    previousDay: "Previous day",
    nextDayShort: "Next day",
    openPlayer: "Open player",
    openWords: "Open wordbook",
    openAi: "Open AI Teacher",
    linkErrorTitle: "Cannot open link",
    linkErrorBody: "This device cannot open the resource link right now.",
    reviewCopiedTitle: "Review prompt copied",
    reviewCopiedBody: "Send it to AI Teacher for today's final check.",
    wordsAlreadyAddedTitle: "Already added",
    wordsAlreadyAddedBody: "Today's words are already in your wordbook.",
    wordsAddedTitle: "Added to wordbook",
    wordsAddedBody: "Added {count} new words. Duplicates were skipped.",
    playerKicker: "Listening Player",
    playerTitle: "Day {day} Sentence Listening",
    currentSentence: "{phase} · Sentence {current} / {total}",
    playSentence: "Play sentence",
    playThree: "Play 3 times",
    aiExplainSentence: "AI explain this sentence",
    previousSentence: "Previous",
    nextSentence: "Next",
    showEnglish: "Show English",
    hideEnglish: "Hide English",
    showChinese: "Show Chinese",
    hideChinese: "Hide Chinese",
    speed: "Speed {rate}",
    dictationTitle: "Light Dictation",
    dictationBody: "Play the sentence, then write from memory. You only need the main structure.",
    dictationPlaceholder: "Write what you hear",
    checkDictation: "Check dictation",
    clear: "Clear",
    similarity: "Similarity: {score}%",
    originalSentence: "Original: {sentence}",
    yourAnswer: "Yours: {answer}",
    keywordsTitle: "Useful words from this sentence",
    keywordsBody: "Tap a word to add it to your wordbook. Existing words will be detected.",
    sentencePromptCopiedTitle: "Copied",
    sentencePromptCopiedBody: "Send it to AI Teacher for explanation and substitution practice.",
    wordbookKicker: "Wordbook",
    wordbookTitle: "Only save words you can use",
    wordPlaceholder: "Type English only, e.g. appointment",
    meaningPlaceholder: "Chinese meaning auto-fills. You can edit it.",
    sentencePlaceholder: "Example sentence auto-fills. You can edit it.",
    hintMatched: "Auto matched: {meaning} / {sentence}",
    noHint: "This word is not in the hint bank yet. You can still save it and add meaning later.",
    addWord: "Add to wordbook",
    bulkImportTitle: "Bulk Import",
    bulkImportBody: "While watching videos, paste useful words, notes, comments, or subtitles here. Commas, spaces, and new lines all work.",
    bulkImportPlaceholder: "Example: listen, understand, repeat\nOr paste a short English subtitle line",
    pasteClipboard: "Paste clipboard",
    importWords: "Import words",
    bulkImportSuccessTitle: "Imported",
    bulkImportSuccessBody: "Added {count} words. Skipped {skipped} duplicates.",
    bulkImportEmptyTitle: "No English words found",
    bulkImportEmptyBody: "Paste English words or English subtitles first.",
    clipboardEmptyTitle: "Clipboard is empty",
    clipboardEmptyBody: "Copy English from a screenshot, subtitle, or webpage first, then paste it here.",
    quickWords: "Common life words",
    dueReview: "Due today: {count}",
    speakWord: "Read word",
    speakSentence: "Read sentence",
    forgot: "Forgot",
    hard: "Hard",
    know: "Know",
    easy: "Easy",
    enterWordTitle: "Enter a word first",
    enterWordBody: "The word cannot be empty.",
    duplicateWordTitle: "Already in wordbook",
    duplicateWordBody: "This word is already saved. Go review it.",
    duplicateSentenceWordBody: "{word} is already saved.",
    pendingMeaning: "To fill in",
    fromTodayCourse: "From today's course",
    aiKicker: "AI Teacher",
    aiTitle: "Test yourself today",
    copyAiPrompt: "Copy AI prompt",
    aiPromptCopiedBody: "Send the prompt to ChatGPT to start today's AI Teacher test.",
    lifeKicker: "Life Manager",
    lifeTitle: "Keep Today Together",
    lifeBody: "English, strength, spending, and journal in one place. The goal is not perfection; it is staying in control.",
    lifeModeHealth: "Health",
    lifeModeMoney: "Money",
    lifeModeJournal: "Notes",
    workoutTitle: "Strength Training",
    workoutBody: "Start with the smallest useful amount. On tired days, just do squats and stretching.",
    workoutPlanTitle: "Today's recommendation",
    workoutPlanBody: "Do not decide from scratch every day. Follow the plan, or use rescue mode when tired.",
    workoutPlanDone: "Complete today's plan",
    workoutRescue: "10-minute rescue",
    workoutRescueBody: "Bad days still count: one squat set plus 10 minutes of walking/stretching.",
    workoutRecommended: "Recommended",
    workoutPlanLower: "Lower body + core",
    workoutPlanUpper: "Push/pull + core",
    workoutPlanRecovery: "Recovery day",
    workoutPlanFull: "Light full body",
    workoutPlanLowerBody: "Squat first, core at the end. Works even without a gym.",
    workoutPlanUpperBody: "A little push and a little pull, so training stays balanced.",
    workoutPlanRecoveryBody: "Walk, stretch, and keep core light. The goal is no broken chain.",
    workoutPlanFullBody: "Touch the whole body. Do not chase exhaustion; chase completion.",
    expenseTitle: "Spending",
    expenseBody: "Record real money spent today. Keep categories simple first.",
    expenseAmountPlaceholder: "Amount, e.g. 12.5",
    expenseCategoryPlaceholder: "Category, e.g. food / gas",
    expenseNotePlaceholder: "Note, e.g. lunch",
    expenseQuickAmount: "Quick amount",
    expenseQuickCategory: "Quick category",
    expensePresetsTitle: "One-tap spending",
    expensePresetsBody: "Tap common expenses instead of typing every time.",
    recentExpenses: "Recent today",
    addExpense: "Add expense",
    todayExpense: "Spent today: ${amount}",
    journalTitle: "Journal",
    journalBody: "Write a few lines: what you did, what you spent, body status, and whether English was done.",
    moodTitle: "Mood",
    moodGood: "Good",
    moodOkay: "Okay",
    moodTired: "Tired",
    moodBad: "Bad",
    journalPlaceholder: "Today's note...",
    journalTemplateTitle: "30-second night template",
    journalTemplateBody: "When you do not want a long note, answer three lines. The goal is a record, not an essay.",
    insertJournalTemplate: "Insert 3-question template",
    journalQuickLinesTitle: "Quick lines",
    journalPromptDone: "Done today:",
    journalPromptBody: "Body status:",
    journalPromptTomorrow: "Most important tomorrow:",
    journalQuickEnglishDone: "English done.",
    journalQuickWorkoutDone: "Workout done.",
    journalQuickTired: "Tired today. Rescue mode still counts.",
    journalQuickTomorrowContinue: "Continue tomorrow. Do not change the plan.",
    saveJournal: "Save journal",
    lifeSavedTitle: "Saved",
    lifeSavedBody: "Today's life log has been saved locally.",
    weeklyWorkoutTitle: "7-day workout",
    weeklyWorkoutBody: "Any effort counts. Do not chase perfect days.",
    monthlySpendingTitle: "This month",
    monthlySpendingBody: "See where money went first, then decide what to control.",
    recentJournalTitle: "Recent notes",
    recentJournalEmpty: "No journal yet. Two lines today is enough.",
    noExpenseYet: "No spending recorded this month.",
    invalidExpenseTitle: "Invalid amount",
    invalidExpenseBody: "Enter a number, e.g. 8, 12.5, 30.",
    roadmapKicker: "1000-Hour Roadmap",
    roadmapTitle: "One main path only",
    openStageResource: "Open stage resource",
    settingsKicker: "Settings",
    settingsTitle: "Lazy Mode",
    languageTitle: "Interface Language",
    languageBody: "Chinese is easier for execution now. English is better for immersion later. The choice is saved automatically.",
    chinese: "中文",
    english: "English",
    dailyReminder: "Daily reminder",
    reminderBody: "Pick a fixed time. Tap the notification to continue the first unfinished task.",
    test3Seconds: "3-sec test",
    jumpTitle: "Jump to a day",
    jumpBody: "Use this for testing. For real study, follow the order.",
    jump: "Jump",
    localBackup: "Local backup",
    backupBody: "Copy your local progress and wordbook as text, so you can restore later.",
    homeBackupTitle: "Do not lose your data",
    homeBackupBody: "English, words, workouts, spending, and notes are local. Copy a backup every few days so you can restore later.",
    closeoutTitle: "Daily closeout",
    closeoutBody: "Do not rely on feeling. When these are green, today is solid.",
    closeoutReady: "Ready to stop",
    closeoutNeedWork: "Still needs work",
    closeoutEnglish: "English route",
    closeoutWords: "Due words",
    closeoutHealth: "Health training",
    closeoutJournal: "Daily note",
    closeoutDone: "Done",
    closeoutTodo: "To do",
    runModeTitle: "Run mode",
    runModeExpo: "Current: Expo Go test build",
    runModeBody: "Your phone opens the app because your computer is running the development server. If that window closes, the computer sleeps, or the network changes, the phone cannot open it.",
    runModeStandalone: "After we make a standalone build, it can run like a normal app without the computer.",
    copyBackup: "Copy backup",
    restoreBackupTitle: "Restore backup",
    backupPlaceholder: "Paste backup text here",
    restoreFromBackup: "Restore from backup",
    permissionTitle: "Permission needed",
    permissionBody: "Notifications are not enabled.",
    reminderSetTitle: "Reminder set",
    reminderSetBody: "Study reminder set for {time} every day.",
    backupCopiedTitle: "Backup copied",
    backupCopiedBody: "Save this text somewhere safe. You can restore progress later.",
    pasteBackupTitle: "Paste backup first",
    pasteBackupBody: "Paste the backup text you copied before.",
    restoreSuccessTitle: "Restore complete",
    restoreSuccessBody: "Progress and wordbook have been restored.",
    restoreFailTitle: "Restore failed",
    restoreFailBody: "Backup format is wrong. Make sure the full backup was copied.",
    enterNumberTitle: "Enter a number",
    enterNumberBody: "For example: 1, 7, 34, 85.",
    navHome: "Home",
    navToday: "Today",
    navPlayer: "Listen",
    navWords: "Words",
    navLife: "Life",
    navAi: "AI",
    completedPlanTitle: "Plan complete",
    completedPlanBody: "You have finished the 334-day plan."
  }
} as const;

type TranslationKey = keyof typeof translations.zh;

function createTranslator(language: InterfaceLanguage): TFunc {
  return (key, values = {}) => {
    const template = translations[language][key] || translations.zh[key];
    let text = String(template);
    Object.entries(values).forEach(([name, value]) => {
      text = text.replace(new RegExp(`\\{${name}\\}`, "g"), String(value));
    });
    return text;
  };
}

function buildPortableCardText(day: ReturnType<typeof buildCourseDay>) {
  const sentences = getSentencesForDay(day.day).slice(0, 5);
  const vocabularySupport = day.tasks
    .map((task) => getTaskSupport(day.day, task.kind))
    .find((item) => item?.items?.length);

  return [
    `English1000 Day ${day.day}`,
    `${day.level} / ${day.phase}`,
    "",
    "TODAY'S TASKS",
    ...day.tasks.map((task, index) => `${index + 1}. ${task.title} (${task.minutes}m) - ${task.detail}`),
    "",
    "LISTENING SENTENCES",
    ...sentences.map((sentence, index) => `${index + 1}. ${sentence.english} / ${sentence.chinese}`),
    "",
    "WORDS / PHRASES",
    ...(vocabularySupport?.items || []).slice(0, 10).map((item, index) => `${index + 1}. ${item}`),
    "",
    "AI TEACHER PROMPT",
    day.aiPrompt
  ].join("\n");
}

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [words, setWords] = useState<WordCard[]>([]);
  const [lifeLogs, setLifeLogs] = useState<LifeLog[]>([]);
  const [tab, setTab] = useState<Tab>("home");
  const [lifeMode, setLifeMode] = useState<LifeMode>("health");
  const [ready, setReady] = useState(false);
  const language = progress.interfaceLanguage || "zh";
  const t = useMemo(() => createTranslator(language), [language]);

  useEffect(() => {
    Promise.all([loadProgress(), loadWords(), loadLifeLogs()]).then(([storedProgress, storedWords, storedLifeLogs]) => {
      setProgress(storedProgress);
      setWords(storedWords);
      setLifeLogs(storedLifeLogs);
      setReady(true);
    });
  }, []);

  const day = useMemo(() => buildCourseDay(progress.currentDay), [progress.currentDay]);
  const completedToday = day.tasks.filter((task) => progress.completedTaskIds.includes(task.id)).length;
  const todayPercent = Math.round((completedToday / day.tasks.length) * 100);
  const completedMinutesToday = day.tasks
    .filter((task) => progress.completedTaskIds.includes(task.id))
    .reduce((sum, task) => sum + task.minutes, 0);
  const currentDayCompleted = progress.completedDays.includes(day.day);
  const completedFullDays = progress.completedDays.filter((completedDay) => completedDay !== day.day).length;
  const totalCompletedMinutes = completedFullDays * 180 + (currentDayCompleted ? 180 : completedMinutesToday);
  const totalCompletedHours = Math.floor(totalCompletedMinutes / 60);
  const remainingCourseHours = Math.max(0, COURSE_DAYS.length * 3 - totalCompletedHours);
  const todayStudySeconds = Math.floor(progress.studySecondsByDate?.[todayKey()] ?? 0);
  const todayStudyMinutes = Math.floor(todayStudySeconds / 60);
  const todayStudyLeftMinutes = Math.max(0, 180 - todayStudyMinutes);
  const dueWords = words.filter(isDue);

  async function updateProgress(next: ProgressState) {
    setProgress(next);
    await saveProgress(next);
  }

  async function updateWords(next: WordCard[]) {
    setWords(next);
    await saveWords(next);
  }

  async function updateLifeLogs(next: LifeLog[]) {
    setLifeLogs(next);
    await saveLifeLogs(next);
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
    await updateProgress({ ...progress, completedTaskIds, completedDays, timerState: undefined });
  }

  async function rateTaskUnderstanding(taskId: string, percent: number) {
    await updateProgress({
      ...progress,
      taskUnderstanding: {
        ...(progress.taskUnderstanding || {}),
        [taskId]: percent
      }
    });
  }

  const updateTimerState = useCallback(async (timerState: ProgressState["timerState"]) => {
    await updateProgress({ ...progress, timerState });
  }, [progress]);

  const commitStudyTime = useCallback(async (seconds: number, timerState: ProgressState["timerState"]) => {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const date = todayKey();
    const currentSeconds = progress.studySecondsByDate?.[date] ?? 0;
    const nextSeconds = Math.min(12 * 60 * 60, currentSeconds + safeSeconds);
    await updateProgress({
      ...progress,
      timerState,
      studySecondsByDate: {
        ...(progress.studySecondsByDate || {}),
        [date]: nextSeconds
      }
    });
  }, [progress]);

  async function goNextDay() {
    if (progress.currentDay >= COURSE_DAYS.length) {
      Alert.alert(t("completedPlanTitle"), t("completedPlanBody"));
      return;
    }
    await updateProgress({ ...progress, currentDay: progress.currentDay + 1, completedTaskIds: [], timerState: undefined });
    setTab("today");
  }

  async function goPreviousDay() {
    if (progress.currentDay <= 1) {
      return;
    }
    await updateProgress({ ...progress, currentDay: progress.currentDay - 1, completedTaskIds: [], timerState: undefined });
    setTab("today");
  }

  async function jumpToDay(dayNumber: number) {
    const nextDay = Math.min(COURSE_DAYS.length, Math.max(1, dayNumber));
    await updateProgress({ ...progress, currentDay: nextDay, completedTaskIds: [], timerState: undefined });
    setTab("today");
  }

  async function restoreFromBackup(backupJson: string) {
    await importBackup(backupJson);
    const [restoredProgress, restoredWords, restoredLifeLogs] = await Promise.all([loadProgress(), loadWords(), loadLifeLogs()]);
    setProgress(restoredProgress);
    setWords(restoredWords);
    setLifeLogs(restoredLifeLogs);
    setTab("home");
  }

  function openLife(mode: LifeMode = "health") {
    setLifeMode(mode);
    setTab("life");
  }

  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <Text style={styles.title}>English1000</Text>
          <Text style={styles.muted}>{t("loading")}</Text>
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
              totalCompletedHours={totalCompletedHours}
              remainingCourseHours={remainingCourseHours}
              todayStudyMinutes={todayStudyMinutes}
              dueWords={dueWords.length}
              completedTaskIds={progress.completedTaskIds}
              words={words}
              lifeLogs={lifeLogs}
              onUpdateWords={updateWords}
              onUpdateLifeLogs={updateLifeLogs}
              onContinue={() => setTab("today")}
              onOpenSettings={() => setTab("settings")}
              onOpenRoadmap={() => setTab("roadmap")}
              onOpenLife={openLife}
              onOpenWords={() => setTab("words")}
              t={t}
            />
          )}
          {tab === "today" && (
            <TodayScreen
              day={day}
              words={words}
              completedTaskIds={progress.completedTaskIds}
              taskUnderstanding={progress.taskUnderstanding || {}}
              timerState={progress.timerState}
              todayStudyMinutes={todayStudyMinutes}
              todayStudyLeftMinutes={todayStudyLeftMinutes}
              onToggleTask={toggleTask}
              onRateTaskUnderstanding={rateTaskUnderstanding}
              onUpdateTimerState={updateTimerState}
              onCommitStudyTime={commitStudyTime}
              onUpdateWords={updateWords}
              onNextDay={goNextDay}
              onPreviousDay={goPreviousDay}
              onOpenPlayer={() => setTab("player")}
              onOpenWords={() => setTab("words")}
              onOpenAi={() => setTab("ai")}
              t={t}
            />
          )}
          {tab === "player" && <PlayerScreen dayNumber={day.day} phase={day.phase} words={words} onUpdateWords={updateWords} t={t} />}
          {tab === "words" && <WordsScreen words={words} onUpdate={updateWords} t={t} />}
          {tab === "ai" && <AiScreen prompt={day.aiPrompt} t={t} />}
          {tab === "life" && <LifeScreen logs={lifeLogs} onUpdate={updateLifeLogs} language={language} initialMode={lifeMode} t={t} />}
          {tab === "roadmap" && <RoadmapScreen t={t} />}
          {tab === "settings" && (
            <SettingsScreen
              progress={progress}
              onUpdate={updateProgress}
              onJumpToDay={jumpToDay}
              onRestoreBackup={restoreFromBackup}
              t={t}
            />
          )}
        </ScrollView>
        <BottomNav tab={tab} onChange={setTab} t={t} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function HomeScreen({
  day,
  progress,
  todayPercent,
  totalCompletedHours,
  remainingCourseHours,
  todayStudyMinutes,
  dueWords,
  completedTaskIds,
  words,
  lifeLogs,
  onUpdateWords,
  onUpdateLifeLogs,
  onContinue,
  onOpenSettings,
  onOpenRoadmap,
  onOpenLife,
  onOpenWords,
  t
}: {
  day: ReturnType<typeof buildCourseDay>;
  progress: ProgressState;
  todayPercent: number;
  totalCompletedHours: number;
  remainingCourseHours: number;
  todayStudyMinutes: number;
  dueWords: number;
  completedTaskIds: string[];
  words: WordCard[];
  lifeLogs: LifeLog[];
  onUpdateWords: (words: WordCard[]) => Promise<void>;
  onUpdateLifeLogs: (logs: LifeLog[]) => Promise<void>;
  onContinue: () => void;
  onOpenSettings: () => void;
  onOpenRoadmap: () => void;
  onOpenLife: (mode?: LifeMode) => void;
  onOpenWords: () => void;
  t: TFunc;
}) {
  const [quickCapture, setQuickCapture] = useState("");
  const remainingTasks = day.tasks.length - Math.round((todayPercent / 100) * day.tasks.length);
  const firstUnfinished = day.tasks.find((task) => !completedTaskIds.includes(task.id)) ?? day.tasks[0];
  const streak = calculateCourseStreak(progress.completedDays, day.day);
  const weekStart = Math.floor((day.day - 1) / 7) * 7 + 1;
  const weekDays = Array.from({ length: 7 }, (_, index) => weekStart + index).filter((value) => value <= COURSE_DAYS.length);
  const completedThisWeek = weekDays.filter((value) => progress.completedDays.includes(value)).length;
  const weekPercent = Math.round((completedThisWeek / weekDays.length) * 100);
  const todayLog = lifeLogs.find((item) => item.date === todayKey());
  const spentToday = todayLog?.expenses.reduce((sum, item) => sum + item.amount, 0) ?? 0;
  const workoutDoneToday = (todayLog?.workoutCompletedIds.length ?? 0) > 0;
  const journalDoneToday = (todayLog?.journal.trim().length ?? 0) > 0;
  const moodLabels: Record<string, string> = {
    good: t("moodGood"),
    okay: t("moodOkay"),
    tired: t("moodTired"),
    bad: t("moodBad")
  };
  const nextAction = todayPercent < 100
    ? { title: t("moduleStudyTitle"), body: t("nextActionEnglish"), onPress: onContinue, icon: <BookOpen size={20} color={theme.primaryDark} /> }
    : dueWords > 0
      ? { title: t("navWords"), body: t("nextActionWords"), onPress: onOpenWords, icon: <BookOpen size={20} color={theme.primaryDark} /> }
      : !workoutDoneToday
        ? { title: t("moduleHealthTitle"), body: t("nextActionWorkout"), onPress: () => onOpenLife("health"), icon: <Dumbbell size={20} color={theme.primaryDark} /> }
        : !journalDoneToday
          ? { title: t("moduleJournalTitle"), body: t("nextActionJournal"), onPress: () => onOpenLife("journal"), icon: <NotebookPen size={20} color={theme.primaryDark} /> }
          : { title: t("todayDoneBadge"), body: t("nextActionDone"), onPress: onOpenRoadmap, icon: <CheckCircle2 size={20} color={theme.primaryDark} /> };
  const closeoutRows = [
    { label: t("closeoutEnglish"), done: todayPercent >= 100, onPress: onContinue },
    { label: t("closeoutWords"), done: dueWords === 0, onPress: onOpenWords },
    { label: t("closeoutHealth"), done: workoutDoneToday, onPress: () => onOpenLife("health") },
    { label: t("closeoutJournal"), done: journalDoneToday, onPress: () => onOpenLife("journal") }
  ];
  const closeoutReady = closeoutRows.every((item) => item.done);

  async function pasteQuickCapture() {
    const text = await Clipboard.getStringAsync();
    if (!text.trim()) {
      Alert.alert(t("clipboardEmptyTitle"), t("clipboardEmptyBody"));
      return;
    }
    setQuickCapture(text);
  }

  async function saveQuickWords() {
    const candidates = extractImportWords(quickCapture);
    if (!candidates.length) {
      Alert.alert(t("bulkImportEmptyTitle"), t("bulkImportEmptyBody"));
      return;
    }
    const existing = new Set(words.map((item) => item.word.trim().toLowerCase()));
    const freshWords: WordCard[] = [];
    let skipped = 0;
    candidates.forEach((candidate) => {
      const normalized = candidate.toLowerCase();
      if (existing.has(normalized)) {
        skipped += 1;
        return;
      }
      existing.add(normalized);
      const hint = getWordHint(candidate);
      freshWords.push(createWordCard(candidate, hint?.meaning || t("pendingMeaning"), hint?.sentence || t("fromTodayCourse")));
    });
    if (freshWords.length) {
      await onUpdateWords([...freshWords, ...words]);
    }
    setQuickCapture("");
    Alert.alert(t("quickCaptureSavedTitle"), t("quickCaptureWordsSaved", { count: freshWords.length, skipped }));
  }

  async function saveQuickExpense() {
    const parsed = quickCapture.match(/(?:\$|usd\s*)?\s*(\d+(?:\.\d{1,2})?)/i);
    if (!parsed) {
      Alert.alert(t("invalidExpenseTitle"), t("quickCaptureNeedAmount"));
      return;
    }
    const amount = Math.round(Number(parsed[1]) * 100) / 100;
    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert(t("invalidExpenseTitle"), t("quickCaptureNeedAmount"));
      return;
    }
    const today = todayKey();
    const currentLog = lifeLogs.find((item) => item.date === today) ?? createEmptyLifeLog(today);
    const note = quickCapture.replace(parsed[0], "").trim();
    const expense = {
      id: `${Date.now()}`,
      amount,
      category: detectExpenseCategory(note),
      note,
      createdAt: new Date().toISOString()
    };
    const nextLog = { ...currentLog, expenses: [expense, ...currentLog.expenses], updatedAt: new Date().toISOString() };
    await onUpdateLifeLogs(upsertLifeLog(lifeLogs, nextLog));
    setQuickCapture("");
    Alert.alert(t("quickCaptureSavedTitle"), t("quickCaptureExpenseSaved", { amount: amount.toFixed(2) }));
  }

  async function saveQuickJournal() {
    const text = quickCapture.trim();
    if (!text) {
      return;
    }
    const today = todayKey();
    const currentLog = lifeLogs.find((item) => item.date === today) ?? createEmptyLifeLog(today);
    const journal = currentLog.journal.trim()
      ? `${currentLog.journal.trim()}\n${text}`
      : text;
    await onUpdateLifeLogs(upsertLifeLog(lifeLogs, { ...currentLog, journal, updatedAt: new Date().toISOString() }));
    setQuickCapture("");
    Alert.alert(t("quickCaptureSavedTitle"), t("quickCaptureJournalSaved"));
  }

  async function smartSaveQuickCapture() {
    const text = quickCapture.trim();
    if (!text) {
      Alert.alert(t("smartSaveEmptyTitle"), t("smartSaveEmptyBody"));
      return;
    }
    if (/(?:\$|usd\s*)?\s*\d+(?:\.\d{1,2})?/i.test(text)) {
      await saveQuickExpense();
      return;
    }
    const wordsFound = extractImportWords(text);
    const hasChinese = /[\u3400-\u9fff]/.test(text);
    if (!hasChinese && wordsFound.length > 0) {
      await saveQuickWords();
      return;
    }
    await saveQuickJournal();
  }

  async function copyPortableCard() {
    await Clipboard.setStringAsync(buildPortableCardText(day));
    Alert.alert(t("portableCardCopiedTitle"), t("portableCardCopiedBody"));
  }

  async function copyHomeBackup() {
    const backup = await exportBackup();
    await Clipboard.setStringAsync(backup);
    Alert.alert(t("backupCopiedTitle"), t("backupCopiedBody"));
  }

  return (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>{t("appName")}</Text>
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
          <Text style={styles.todayBoxLabel}>{t("todayFirst")}</Text>
          <Text style={styles.todayBoxTitle}>{firstUnfinished?.title}</Text>
          <Text style={styles.todayBoxText}>{firstUnfinished?.detail}</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${todayPercent}%` }]} />
        </View>
        <Text style={styles.muted}>{t("todayProgress", { percent: todayPercent, count: remainingTasks })}</Text>

        <Pressable style={styles.primaryButton} onPress={onContinue}>
          <Play size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>{t("continueToday")}</Text>
        </Pressable>
        <Pressable style={styles.secondaryWideButton} onPress={onOpenRoadmap}>
          <Text style={styles.secondaryButtonText}>{t("roadmapCta")}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.nextActionCard} onPress={nextAction.onPress}>
        <View style={styles.nextActionIcon}>{nextAction.icon}</View>
        <View style={styles.nextActionCopy}>
          <Text style={styles.nextActionLabel}>{t("nextActionTitle")}</Text>
          <Text style={styles.nextActionTitle}>{nextAction.title}</Text>
          <Text style={styles.nextActionBody}>{nextAction.body}</Text>
        </View>
        <View style={styles.nextActionButton}>
          <Text style={styles.nextActionButtonText}>{t("openNextAction")}</Text>
        </View>
      </Pressable>

      <View style={styles.commandCard}>
        <Text style={styles.sectionTitle}>{t("commandCenterTitle")}</Text>
        <Text style={styles.body}>{t("commandCenterBody")}</Text>
        <CommandRow
          icon={<BookOpen size={20} color={todayPercent >= 100 ? theme.primaryDark : theme.warm} />}
          title={t("commandEnglishTitle")}
          body={t("commandEnglishBody")}
          value={`${todayStudyMinutes}/180m · ${todayPercent}%`}
          done={todayPercent >= 100}
          onPress={onContinue}
        />
        <CommandRow
          icon={<Dumbbell size={20} color={workoutDoneToday ? theme.primaryDark : theme.warm} />}
          title={t("commandHealthTitle")}
          body={t("commandHealthBody")}
          value={workoutDoneToday ? t("commandDone") : t("commandNotDone")}
          done={workoutDoneToday}
          onPress={() => onOpenLife("health")}
        />
        <CommandRow
          icon={<WalletCards size={20} color={spentToday > 0 ? theme.primaryDark : theme.warm} />}
          title={t("commandMoneyTitle")}
          body={t("commandMoneyBody")}
          value={spentToday > 0 ? `$${spentToday.toFixed(2)}` : t("commandNoSpend")}
          done={spentToday > 0}
          onPress={() => onOpenLife("money")}
        />
        <CommandRow
          icon={<NotebookPen size={20} color={journalDoneToday ? theme.primaryDark : theme.warm} />}
          title={t("commandJournalTitle")}
          body={t("commandJournalBody")}
          value={journalDoneToday ? t("commandDone") : t("commandNotDone")}
          done={journalDoneToday}
          onPress={() => onOpenLife("journal")}
        />
      </View>

      <View style={styles.closeoutCard}>
        <View style={styles.closeoutHeader}>
          <View>
            <Text style={styles.sectionTitle}>{t("closeoutTitle")}</Text>
            <Text style={styles.body}>{t("closeoutBody")}</Text>
          </View>
          <View style={[styles.closeoutBadge, closeoutReady && styles.closeoutBadgeDone]}>
            <Text style={[styles.closeoutBadgeText, closeoutReady && styles.closeoutBadgeTextDone]}>
              {closeoutReady ? t("closeoutReady") : t("closeoutNeedWork")}
            </Text>
          </View>
        </View>
        {closeoutRows.map((item) => (
          <Pressable key={item.label} style={styles.closeoutRow} onPress={item.onPress}>
            {item.done ? <CheckCircle2 size={20} color={theme.primaryDark} /> : <Clock3 size={20} color={theme.warm} />}
            <Text style={styles.closeoutRowText}>{item.label}</Text>
            <Text style={[styles.closeoutRowStatus, item.done && styles.closeoutRowStatusDone]}>
              {item.done ? t("closeoutDone") : t("closeoutTodo")}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.quickCaptureCard}>
        <Text style={styles.sectionTitle}>{t("quickCaptureTitle")}</Text>
        <Text style={styles.body}>{t("quickCaptureBody")}</Text>
        <TextInput
          style={[styles.input, styles.quickCaptureInput]}
          value={quickCapture}
          onChangeText={setQuickCapture}
          placeholder={t("quickCapturePlaceholder")}
          multiline
        />
        <View style={styles.quickCaptureActions}>
          <Pressable style={styles.captureButtonPrimary} onPress={smartSaveQuickCapture}>
            <Text style={styles.captureButtonPrimaryText}>{t("smartSave")}</Text>
          </Pressable>
          <Pressable style={styles.captureButton} onPress={pasteQuickCapture}>
            <Text style={styles.captureButtonText}>{t("pasteClipboard")}</Text>
          </Pressable>
          <Pressable style={styles.captureButton} onPress={saveQuickWords}>
            <Text style={styles.captureButtonText}>{t("saveAsWords")}</Text>
          </Pressable>
          <Pressable style={styles.captureButton} onPress={saveQuickExpense}>
            <Text style={styles.captureButtonText}>{t("saveAsExpense")}</Text>
          </Pressable>
          <Pressable style={styles.captureButton} onPress={saveQuickJournal}>
            <Text style={styles.captureButtonText}>{t("saveAsJournal")}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.portableCard}>
        <Text style={styles.taskTitle}>{t("portableCardTitle")}</Text>
        <Text style={styles.body}>{t("portableCardBody")}</Text>
        <Pressable style={styles.primaryButtonSmall} onPress={copyPortableCard}>
          <Text style={styles.primaryButtonText}>{t("copyPortableCard")}</Text>
        </Pressable>
      </View>

      <View style={styles.snapshotCard}>
        <Text style={styles.sectionTitle}>{t("todaySnapshotTitle")}</Text>
        <View style={styles.snapshotGrid}>
          <SnapshotItem label={t("snapshotEnglish")} value={t("snapshotEnglishMinutes", { done: todayStudyMinutes })} />
          <SnapshotItem label={t("snapshotWorkout")} value={t("snapshotWorkoutValue", { done: todayLog?.workoutCompletedIds.length ?? 0 })} />
          <SnapshotItem label={t("snapshotSpending")} value={`$${spentToday.toFixed(2)}`} />
          <SnapshotItem label={t("snapshotMood")} value={todayLog?.mood ? moodLabels[todayLog.mood] || todayLog.mood : t("snapshotMoodEmpty")} />
        </View>
      </View>

      <View style={styles.backupReminderCard}>
        <Text style={styles.taskTitle}>{t("homeBackupTitle")}</Text>
        <Text style={styles.body}>{t("homeBackupBody")}</Text>
        <Pressable style={styles.secondaryWideButton} onPress={copyHomeBackup}>
          <Text style={styles.secondaryButtonText}>{t("copyBackup")}</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        <Metric label={t("streak")} value={t("daysUnit", { count: streak })} />
        <Metric label={t("weekPercent")} value={`${weekPercent}%`} />
        <Metric label={t("completedDays")} value={`${progress.completedDays.length}`} />
        <Metric label={t("completedHours")} value={`${totalCompletedHours}`} />
        <Metric label={t("remainingHours")} value={`${remainingCourseHours}`} />
        <Metric label={t("dueWords")} value={`${dueWords}`} />
        <Metric label={t("reminderTime")} value={`${pad(progress.reminderHour)}:${pad(progress.reminderMinute)}`} />
      </View>

      <View style={styles.moduleSection}>
        <Text style={styles.sectionTitle}>{t("lifeSystemTitle")}</Text>
        <Text style={styles.body}>{t("lifeSystemBody")}</Text>
        <View style={styles.moduleGrid}>
          <ModuleCard icon={<BookOpen size={22} color={theme.primaryDark} />} title={t("moduleStudyTitle")} body={t("moduleStudyBody")} onPress={onContinue} />
          <ModuleCard icon={<Dumbbell size={22} color={theme.primaryDark} />} title={t("moduleHealthTitle")} body={t("moduleHealthBody")} onPress={() => onOpenLife("health")} />
          <ModuleCard icon={<WalletCards size={22} color={theme.primaryDark} />} title={t("moduleMoneyTitle")} body={t("moduleMoneyBody")} onPress={() => onOpenLife("money")} />
          <ModuleCard icon={<NotebookPen size={22} color={theme.primaryDark} />} title={t("moduleJournalTitle")} body={t("moduleJournalBody")} onPress={() => onOpenLife("journal")} />
        </View>
        <Pressable style={styles.secondaryWideButton} onPress={onOpenWords}>
          <Text style={styles.secondaryButtonText}>{t("navWords")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function TodayScreen({
  day,
  words,
  completedTaskIds,
  taskUnderstanding,
  timerState,
  todayStudyMinutes,
  todayStudyLeftMinutes,
  onToggleTask,
  onRateTaskUnderstanding,
  onUpdateTimerState,
  onCommitStudyTime,
  onUpdateWords,
  onNextDay,
  onPreviousDay,
  onOpenPlayer,
  onOpenWords,
  onOpenAi,
  t
}: {
  day: ReturnType<typeof buildCourseDay>;
  words: WordCard[];
  completedTaskIds: string[];
  taskUnderstanding: Record<string, number>;
  timerState?: ProgressState["timerState"];
  todayStudyMinutes: number;
  todayStudyLeftMinutes: number;
  onToggleTask: (taskId: string) => void;
  onRateTaskUnderstanding: (taskId: string, percent: number) => Promise<void>;
  onUpdateTimerState: (timerState: ProgressState["timerState"]) => Promise<void>;
  onCommitStudyTime: (seconds: number, timerState: ProgressState["timerState"]) => Promise<void>;
  onUpdateWords: (words: WordCard[]) => Promise<void>;
  onNextDay: () => void;
  onPreviousDay: () => void;
  onOpenPlayer: () => void;
  onOpenWords: () => void;
  onOpenAi: () => void;
  t: TFunc;
}) {
  const completedCount = day.tasks.filter((task) => completedTaskIds.includes(task.id)).length;
  const activeIndex = day.tasks.findIndex((task) => !completedTaskIds.includes(task.id));
  const activeTask = activeIndex >= 0 ? day.tasks[activeIndex] : undefined;
  const allDone = !activeTask;
  const support = activeTask ? getTaskSupport(day.day, activeTask.kind) : undefined;
  const supportWords = activeTask?.kind === "vocabulary" && support ? support.items : [];
  const activeUnderstanding = activeTask ? taskUnderstanding[activeTask.id] : undefined;
  const [timerTaskId, setTimerTaskId] = useState<string | undefined>();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerActive = !!activeTask && timerTaskId === activeTask.id && remainingSeconds > 0;
  const remainingMinutes = day.tasks
    .filter((task) => !completedTaskIds.includes(task.id))
    .reduce((sum, task) => sum + task.minutes, 0);
  const helper =
    activeTask?.kind === "intensive" || activeTask?.kind === "shadowing"
      ? { label: t("openPlayer"), onPress: onOpenPlayer }
      : activeTask?.kind === "vocabulary"
        ? { label: t("openWords"), onPress: onOpenWords }
        : activeTask?.kind === "checkpoint"
          ? { label: t("openAi"), onPress: onOpenAi }
          : undefined;

  function calculateTimerSettlement() {
    if (!activeTask || timerState?.taskId !== activeTask.id) {
      return { elapsedSeconds: 0, nextSeconds: 0, nextRunning: false };
    }
    const elapsedSeconds = timerState.running
      ? Math.min(
          timerState.remainingSeconds,
          Math.max(0, Math.floor((Date.now() - new Date(timerState.updatedAt).getTime()) / 1000))
        )
      : 0;
    const nextSeconds = Math.max(0, timerState.remainingSeconds - elapsedSeconds);
    return {
      elapsedSeconds,
      nextSeconds,
      nextRunning: timerState.running && nextSeconds > 0
    };
  }

  useEffect(() => {
    if (!timerRunning || remainingSeconds <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds((value) => {
        if (value <= 1) {
          clearInterval(timer);
          setTimerRunning(false);
          if (timerTaskId) {
            const { elapsedSeconds } = calculateTimerSettlement();
            void onCommitStudyTime(elapsedSeconds, {
              taskId: timerTaskId,
              remainingSeconds: 0,
              running: false,
              updatedAt: new Date().toISOString()
            });
          }
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onCommitStudyTime, remainingSeconds, timerRunning, timerTaskId]);

  useEffect(() => {
    if (!activeTask || timerState?.taskId !== activeTask.id) {
      setTimerRunning(false);
      setRemainingSeconds(0);
      setTimerTaskId(undefined);
      return;
    }

    const { nextSeconds: restoredSeconds, nextRunning } = calculateTimerSettlement();
    setTimerTaskId(activeTask.id);
    setRemainingSeconds(restoredSeconds);
    setTimerRunning(nextRunning);

    if (timerState.running && restoredSeconds <= 0) {
      void onCommitStudyTime(timerState.remainingSeconds, {
        taskId: activeTask.id,
        remainingSeconds: 0,
        running: false,
        updatedAt: new Date().toISOString()
      });
    }
  }, [activeTask?.id, onCommitStudyTime, timerState?.remainingSeconds, timerState?.running, timerState?.taskId, timerState?.updatedAt]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active" || !activeTask || timerState?.taskId !== activeTask.id) {
        return;
      }

      const { elapsedSeconds, nextSeconds, nextRunning } = calculateTimerSettlement();
      setTimerTaskId(activeTask.id);
      setRemainingSeconds(nextSeconds);
      setTimerRunning(nextRunning);

      if (timerState.running) {
        void onCommitStudyTime(elapsedSeconds, {
          taskId: activeTask.id,
          remainingSeconds: nextSeconds,
          running: nextRunning,
          updatedAt: new Date().toISOString()
        });
      }
    });

    return () => subscription.remove();
  }, [activeTask?.id, onCommitStudyTime, timerState?.remainingSeconds, timerState?.running, timerState?.taskId, timerState?.updatedAt]);

  async function startTimer() {
    if (!activeTask) {
      return;
    }
    const nextTimer = {
      taskId: activeTask.id,
      remainingSeconds: activeTask.minutes * 60,
      running: true,
      updatedAt: new Date().toISOString()
    };
    setTimerTaskId(activeTask.id);
    setRemainingSeconds(nextTimer.remainingSeconds);
    setTimerRunning(true);
    await onUpdateTimerState(nextTimer);
  }

  async function startRescueTimer() {
    if (!activeTask) {
      return;
    }
    const nextTimer = {
      taskId: activeTask.id,
      remainingSeconds: 10 * 60,
      running: true,
      updatedAt: new Date().toISOString()
    };
    setTimerTaskId(activeTask.id);
    setRemainingSeconds(nextTimer.remainingSeconds);
    setTimerRunning(true);
    await onUpdateTimerState(nextTimer);
  }

  async function pauseTimer() {
    setTimerRunning(false);
    if (activeTask && timerState?.taskId === activeTask.id) {
      const { elapsedSeconds, nextSeconds } = calculateTimerSettlement();
      setRemainingSeconds(nextSeconds);
      await onCommitStudyTime(elapsedSeconds, {
        taskId: activeTask.id,
        remainingSeconds: nextSeconds,
        running: false,
        updatedAt: new Date().toISOString()
      });
    }
  }

  async function resumeTimer() {
    if (timerActive) {
      setTimerRunning(true);
      if (timerTaskId) {
        await onUpdateTimerState({
          taskId: timerTaskId,
          remainingSeconds,
          running: true,
          updatedAt: new Date().toISOString()
        });
      }
    } else {
      await startTimer();
    }
  }

  async function finishActiveTask() {
    if (!activeTask) {
      return;
    }
    setTimerRunning(false);
    setRemainingSeconds(0);
    setTimerTaskId(undefined);
    if (timerState?.taskId === activeTask.id) {
      const { elapsedSeconds } = calculateTimerSettlement();
      await onCommitStudyTime(elapsedSeconds, undefined);
    }
    onToggleTask(activeTask.id);
  }

  async function openStudyResource() {
    const canOpen = await Linking.canOpenURL(day.resourceUrl);
    if (!canOpen) {
      Alert.alert(t("linkErrorTitle"), t("linkErrorBody"));
      return;
    }
    if (activeTask) {
      await resumeTimer();
    }
    await Linking.openURL(day.resourceUrl);
  }

  async function copyDailyReview() {
    const text = [
      `我完成了 English1000 Day ${day.day}。`,
      `阶段：${day.level} / ${day.phase}`,
      `今天完成任务：${day.tasks.map((task) => task.title).join("、")}`,
      "请用简单英语问我5个问题，测试我今天学到的内容，并告诉我明天最该改进什么。"
    ].join("\n");
    await Clipboard.setStringAsync(text);
    Alert.alert(t("reviewCopiedTitle"), t("reviewCopiedBody"));
  }

  async function copyPortableCard() {
    await Clipboard.setStringAsync(buildPortableCardText(day));
    Alert.alert(t("portableCardCopiedTitle"), t("portableCardCopiedBody"));
  }

  async function addTodayWords() {
    if (!supportWords.length) {
      return;
    }
    const existing = new Set(words.map((item) => item.word.trim().toLowerCase()));
    const newCards = supportWords
      .filter((item) => !existing.has(item.trim().toLowerCase()))
      .map((item) => {
        const hint = getWordHint(item);
        return createWordCard(item, hint?.meaning || "待补充", hint?.sentence || "来自今日10词");
      });

    if (!newCards.length) {
      Alert.alert(t("wordsAlreadyAddedTitle"), t("wordsAlreadyAddedBody"));
      return;
    }

    await onUpdateWords([...newCards, ...words]);
    Alert.alert(t("wordsAddedTitle"), t("wordsAddedBody", { count: newCards.length }));
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("todayTasks")}</Text>
      <Text style={styles.title}>Day {day.day}</Text>
      <Text style={styles.body}>{day.isReview ? t("reviewDayBody") : day.focus}</Text>
      <Text style={styles.studyTimeNote}>{t("actualStudyToday", { done: todayStudyMinutes, left: todayStudyLeftMinutes })}</Text>
      <Text style={styles.note}>{t("remainingMinutes", { minutes: remainingMinutes })}</Text>
      {day.checkpoint && <Text style={styles.warning}>{day.checkpoint}</Text>}

      <View style={styles.portableCard}>
        <Text style={styles.taskTitle}>{t("portableCardTitle")}</Text>
        <Text style={styles.body}>{t("portableCardBody")}</Text>
        <Pressable style={styles.primaryButtonSmall} onPress={copyPortableCard}>
          <Text style={styles.primaryButtonText}>{t("copyPortableCard")}</Text>
        </Pressable>
      </View>

      <View style={styles.flowCard}>
        {allDone ? (
          <>
            <Text style={styles.stepBadge}>{t("todayDoneBadge")}</Text>
            <Text style={styles.flowTitle}>{t("allDoneTitle")}</Text>
            <Text style={styles.flowText}>{t("allDoneText")}</Text>
            <View style={styles.earlyFinishBox}>
              <Text style={styles.earlyFinishTitle}>{t("earlyFinishTitle")}</Text>
              <Text style={styles.earlyFinishText}>{t("earlyFinishBody")}</Text>
              <View style={styles.rowWrap}>
                <Pill label={t("reviewPlayerCta")} onPress={onOpenPlayer} />
                <Pill label={t("reviewWordsCta")} onPress={onOpenWords} />
              </View>
            </View>
            <Pressable style={styles.flowSecondaryButton} onPress={copyDailyReview}>
              <Text style={styles.flowSecondaryButtonText}>{t("copyDailyReview")}</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={onNextDay}>
              <Text style={styles.primaryButtonText}>{t("previewNextDayCta")}</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.stepBadge}>{t("stepCount", { current: activeIndex + 1, total: day.tasks.length })}</Text>
            <Text style={styles.flowTitle}>{activeTask.title}</Text>
            <Text style={styles.flowText}>{activeTask.detail}</Text>
            {!!activeTask.action && <Text style={styles.flowAction}>{activeTask.action}</Text>}
            {activeTask.kind === "input" && (
              <Pressable style={styles.resourceButton} onPress={openStudyResource}>
                <Text style={styles.resourceButtonText}>{t("openResource")}</Text>
                <Text style={styles.resourceButtonSubtext}>{t("resourceNote")}</Text>
              </Pressable>
            )}
            {support && (
              <View style={styles.supportBox}>
                <Text style={styles.supportTitle}>{support.title}</Text>
                {support.items.map((item, index) => (
                  <Text key={`${activeTask.id}-${index}`} style={styles.supportItem}>
                    {index + 1}. {item}
                  </Text>
                ))}
                {activeTask.kind === "vocabulary" && (
                  <Pressable style={styles.supportButton} onPress={addTodayWords}>
                    <Text style={styles.supportButtonText}>{t("addTodayWords")}</Text>
                  </Pressable>
                )}
              </View>
            )}
            <View style={styles.flowMetaRow}>
              <Text style={styles.flowMeta}>{t("estimatedMinutes", { minutes: activeTask.minutes })}</Text>
              <Text style={styles.flowMeta}>{t("completedCount", { done: completedCount, total: day.tasks.length })}</Text>
            </View>
            <View style={styles.ratingPanel}>
              <Text style={styles.ratingTitle}>{t("understanding", { value: activeUnderstanding ? `${activeUnderstanding}%` : t("notRecorded") })}</Text>
              <Text style={styles.ratingHint}>{t("understandingHint")}</Text>
              {!!activeUnderstanding && (
                <Text style={styles.ratingAdvice}>{understandingAdvice(activeUnderstanding, t)}</Text>
              )}
              <View style={styles.rowWrap}>
                {[40, 60, 80].map((percent) => (
                  <Pill key={percent} label={`${percent}%`} onPress={() => onRateTaskUnderstanding(activeTask.id, percent)} />
                ))}
              </View>
            </View>
            <View style={styles.timerPanel}>
              <Text style={styles.timerText}>{timerActive ? formatDuration(remainingSeconds) : `${activeTask.minutes}:00`}</Text>
              <Text style={styles.timerHint}>
                {timerRunning ? t("timerRunning") : remainingSeconds === 0 && timerTaskId === activeTask.id ? t("timerDone") : t("timerIdle")}
              </Text>
              <View style={styles.rowWrap}>
                <Pill label={timerRunning ? t("pauseTimer") : timerActive ? t("resumeTimer") : t("startTimer")} onPress={timerRunning ? pauseTimer : resumeTimer} />
                <Pill label={t("rescueTimer")} onPress={startRescueTimer} />
                {timerActive && <Pill label={t("reset")} onPress={startTimer} />}
              </View>
            </View>
            <Pressable style={styles.primaryButton} onPress={finishActiveTask}>
              <CheckCircle2 size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>{t("finishStep")}</Text>
            </Pressable>
            {helper && (
              <Pressable style={styles.flowSecondaryButton} onPress={helper.onPress}>
                <Text style={styles.flowSecondaryButtonText}>{helper.label}</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>{t("fullChecklist")}</Text>
      {day.tasks.map((task) => {
        const done = completedTaskIds.includes(task.id);
        return (
          <Pressable key={task.id} style={[styles.taskCard, done && styles.taskCardDone]} onPress={() => onToggleTask(task.id)}>
            <View style={styles.taskTop}>
              <View style={styles.taskIcon}>
                {done ? <CheckCircle2 size={22} color={theme.primary} /> : <Clock3 size={22} color={theme.warm} />}
              </View>
              <View style={styles.taskMain}>
                <Text style={[styles.taskTitle, done && styles.taskTitleDone]}>{task.title}</Text>
                <Text style={styles.taskDetail}>{task.detail}</Text>
                {!!task.action && <Text style={styles.taskAction}>{task.action}</Text>}
              </View>
              <Text style={[styles.minutes, done && styles.minutesDone]}>{task.minutes}m</Text>
            </View>
          </Pressable>
        );
      })}

      <View style={styles.row}>
        <Pressable style={styles.secondaryButton} onPress={onPreviousDay}>
          <Text style={styles.secondaryButtonText}>{t("previousDay")}</Text>
        </Pressable>
        <Pressable style={styles.primaryButtonSmall} onPress={onNextDay}>
          <Text style={styles.primaryButtonText}>{t("nextDayShort")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PlayerScreen({
  dayNumber,
  phase,
  words,
  onUpdateWords,
  t
}: {
  dayNumber: number;
  phase: string;
  words: WordCard[];
  onUpdateWords: (words: WordCard[]) => Promise<void>;
  t: TFunc;
}) {
  const [index, setIndex] = useState(0);
  const [hideEnglish, setHideEnglish] = useState(false);
  const [hideChinese, setHideChinese] = useState(false);
  const [rate, setRate] = useState(0.85);
  const [dictation, setDictation] = useState("");
  const [dictationChecked, setDictationChecked] = useState(false);
  const sentences = useMemo(() => getSentencesForDay(dayNumber), [dayNumber]);
  const sentence = sentences[index] ?? sentences[0];
  const sentenceWords = useMemo(() => extractUsefulWords(sentence.english), [sentence.english]);
  const dictationScore = scoreDictation(dictation, sentence.english);

  useEffect(() => {
    setIndex(0);
    setDictation("");
    setDictationChecked(false);
  }, [dayNumber]);

  function speak() {
    Speech.stop();
    Speech.speak(sentence.english, { language: "en-US", rate });
  }

  function speakThreeTimes() {
    Speech.stop();
    [0, 1, 2].forEach((_, repeatIndex) => {
      setTimeout(() => {
        Speech.speak(sentence.english, { language: "en-US", rate });
      }, repeatIndex * 1800);
    });
  }

  async function copySentenceCoachPrompt() {
    const prompt = [
      "请做我的英语精听老师。",
      `今天是 English1000 Day ${dayNumber}。`,
      `句子：${sentence.english}`,
      `中文意思：${sentence.chinese}`,
      "请用简单中文解释这句话怎么用，再给我3个替换练习句。"
    ].join("\n");
    await Clipboard.setStringAsync(prompt);
    Alert.alert(t("sentencePromptCopiedTitle"), t("sentencePromptCopiedBody"));
  }

  async function addSentenceWord(word: string) {
    const normalized = word.trim().toLowerCase();
    if (words.some((item) => item.word.trim().toLowerCase() === normalized)) {
      Alert.alert(t("duplicateWordTitle"), t("duplicateSentenceWordBody", { word }));
      return;
    }
    const hint = getWordHint(word);
    await onUpdateWords([
      createWordCard(word, hint?.meaning || t("pendingMeaning"), hint?.sentence || sentence.english),
      ...words
    ]);
    Alert.alert(t("wordsAddedTitle"), word);
  }

  function goToSentence(nextIndex: number) {
    setIndex(nextIndex);
    setDictation("");
    setDictationChecked(false);
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("playerKicker")}</Text>
      <Text style={styles.title}>{t("playerTitle", { day: dayNumber })}</Text>
      <View style={styles.card}>
        <Text style={styles.note}>{t("currentSentence", { phase, current: index + 1, total: sentences.length })}</Text>
        {!hideEnglish && <Text style={styles.bigSentence}>{sentence.english}</Text>}
        {!hideChinese && <Text style={styles.body}>{sentence.chinese}</Text>}
        <Pressable style={styles.primaryButton} onPress={speak}>
          <Volume2 size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>{t("playSentence")}</Text>
        </Pressable>
        <View style={styles.rowWrap}>
          <Pill label={t("playThree")} onPress={speakThreeTimes} />
          <Pill label={t("aiExplainSentence")} onPress={copySentenceCoachPrompt} />
          <Pill label={t("previousSentence")} onPress={() => goToSentence((index + sentences.length - 1) % sentences.length)} />
          <Pill label={t("nextSentence")} onPress={() => goToSentence((index + 1) % sentences.length)} />
          <Pill label={hideEnglish ? t("showEnglish") : t("hideEnglish")} onPress={() => setHideEnglish(!hideEnglish)} />
          <Pill label={hideChinese ? t("showChinese") : t("hideChinese")} onPress={() => setHideChinese(!hideChinese)} />
          <Pill label={t("speed", { rate: rate.toFixed(2) })} onPress={() => setRate(rate >= 1 ? 0.7 : Number((rate + 0.15).toFixed(2)))} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.taskTitle}>{t("dictationTitle")}</Text>
        <Text style={styles.body}>{t("dictationBody")}</Text>
        <TextInput
          style={[styles.input, styles.dictationInput]}
          value={dictation}
          onChangeText={(value) => {
            setDictation(value);
            setDictationChecked(false);
          }}
          placeholder={t("dictationPlaceholder")}
          autoCapitalize="none"
          multiline
        />
        <View style={styles.rowWrap}>
          <Pill label={t("checkDictation")} onPress={() => setDictationChecked(true)} />
          <Pill label={t("clear")} onPress={() => {
            setDictation("");
            setDictationChecked(false);
          }} />
        </View>
        {dictationChecked && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackTitle}>{t("similarity", { score: dictationScore })}</Text>
            <Text style={styles.feedbackText}>{dictationFeedback(dictationScore)}</Text>
            <Text style={styles.feedbackText}>{t("originalSentence", { sentence: sentence.english })}</Text>
            <Text style={styles.feedbackText}>{t("yourAnswer", { answer: dictation || "还没输入" })}</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.taskTitle}>{t("keywordsTitle")}</Text>
        <Text style={styles.body}>{t("keywordsBody")}</Text>
        <View style={styles.rowWrap}>
          {sentenceWords.map((word) => (
            <Pill key={word} label={`+ ${word}`} onPress={() => addSentenceWord(word)} />
          ))}
        </View>
      </View>
    </View>
  );
}

function WordsScreen({ words, onUpdate, t }: { words: WordCard[]; onUpdate: (words: WordCard[]) => void; t: TFunc }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [bulkText, setBulkText] = useState("");
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
      Alert.alert(t("enterWordTitle"), t("enterWordBody"));
      return;
    }
    const normalized = word.trim().toLowerCase();
    if (words.some((item) => item.word.trim().toLowerCase() === normalized)) {
      Alert.alert(t("duplicateWordTitle"), t("duplicateWordBody"));
      return;
    }
    const nextHint = getWordHint(word);
    await onUpdate([
      createWordCard(
        word,
        meaning || nextHint?.meaning || t("pendingMeaning"),
        sentence || nextHint?.sentence || t("fromTodayCourse")
      ),
      ...words
    ]);
    setWord("");
    setMeaning("");
    setSentence("");
  }

  async function importBulkWords() {
    const candidates = extractImportWords(bulkText);
    if (!candidates.length) {
      Alert.alert(t("bulkImportEmptyTitle"), t("bulkImportEmptyBody"));
      return;
    }

    const existing = new Set(words.map((item) => item.word.trim().toLowerCase()));
    const freshWords: WordCard[] = [];
    let skipped = 0;

    candidates.forEach((candidate) => {
      const normalized = candidate.toLowerCase();
      if (existing.has(normalized)) {
        skipped += 1;
        return;
      }
      existing.add(normalized);
      const nextHint = getWordHint(candidate);
      freshWords.push(createWordCard(
        candidate,
        nextHint?.meaning || t("pendingMeaning"),
        nextHint?.sentence || t("fromTodayCourse")
      ));
    });

    if (!freshWords.length) {
      Alert.alert(t("bulkImportSuccessTitle"), t("bulkImportSuccessBody", { count: 0, skipped }));
      setBulkText("");
      return;
    }

    await onUpdate([...freshWords, ...words]);
    setBulkText("");
    Alert.alert(t("bulkImportSuccessTitle"), t("bulkImportSuccessBody", { count: freshWords.length, skipped }));
  }

  async function pasteBulkFromClipboard() {
    const text = await Clipboard.getStringAsync();
    if (!text.trim()) {
      Alert.alert(t("clipboardEmptyTitle"), t("clipboardEmptyBody"));
      return;
    }
    setBulkText(text);
  }

  async function grade(card: WordCard, score: "forgot" | "hard" | "know" | "easy") {
    await onUpdate(words.map((item) => item.id === card.id ? reviewWord(item, score) : item));
  }

  function speakWord(card: WordCard) {
    Speech.stop();
    Speech.speak(card.word, { language: "en-US", rate: 0.85 });
  }

  function speakSentence(card: WordCard) {
    Speech.stop();
    Speech.speak(card.sentence || card.word, { language: "en-US", rate: 0.85 });
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("wordbookKicker")}</Text>
      <Text style={styles.title}>{t("wordbookTitle")}</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} value={word} onChangeText={updateWord} placeholder={t("wordPlaceholder")} autoCapitalize="none" />
        <TextInput style={styles.input} value={meaning} onChangeText={setMeaning} placeholder={t("meaningPlaceholder")} />
        <TextInput style={styles.input} value={sentence} onChangeText={setSentence} placeholder={t("sentencePlaceholder")} />
        {hint && (
          <Text style={styles.note}>{t("hintMatched", { meaning: hint.meaning, sentence: hint.sentence })}</Text>
        )}
        {!hint && !!word.trim() && (
          <Text style={styles.note}>{t("noHint")}</Text>
        )}
        <Pressable style={styles.primaryButtonSmall} onPress={addWord}>
          <Text style={styles.primaryButtonText}>{t("addWord")}</Text>
        </Pressable>
        <Text style={styles.quickLabel}>{t("quickWords")}</Text>
        <View style={styles.rowWrap}>
          {quickWords.map((item) => (
            <Pill key={item} label={item} onPress={() => updateWord(item)} />
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{t("bulkImportTitle")}</Text>
        <Text style={styles.body}>{t("bulkImportBody")}</Text>
        <TextInput
          style={[styles.input, styles.bulkInput]}
          value={bulkText}
          onChangeText={setBulkText}
          placeholder={t("bulkImportPlaceholder")}
          autoCapitalize="none"
          multiline
        />
        <Pressable style={styles.secondaryWideButton} onPress={pasteBulkFromClipboard}>
          <Text style={styles.secondaryButtonText}>{t("pasteClipboard")}</Text>
        </Pressable>
        <Pressable style={[styles.primaryButtonSmall, styles.stackedButton]} onPress={importBulkWords}>
          <Text style={styles.primaryButtonText}>{t("importWords")}</Text>
        </Pressable>
      </View>
      <Text style={styles.sectionTitle}>{t("dueReview", { count: dueWords.length })}</Text>
      {(dueWords.length ? dueWords : words.slice(0, 6)).map((card) => (
        <View key={card.id} style={styles.card}>
          <Text style={styles.taskTitle}>{card.word}</Text>
          <Text style={styles.body}>{card.meaning}</Text>
          <Text style={styles.note}>{card.sentence}</Text>
          <View style={styles.rowWrap}>
            <Pill label={t("speakWord")} onPress={() => speakWord(card)} />
            <Pill label={t("speakSentence")} onPress={() => speakSentence(card)} />
            <Pill label={t("forgot")} onPress={() => grade(card, "forgot")} />
            <Pill label={t("hard")} onPress={() => grade(card, "hard")} />
            <Pill label={t("know")} onPress={() => grade(card, "know")} />
            <Pill label={t("easy")} onPress={() => grade(card, "easy")} />
          </View>
        </View>
      ))}
    </View>
  );
}

function AiScreen({ prompt, t }: { prompt: string; t: TFunc }) {
  async function copyPrompt() {
    await Clipboard.setStringAsync(prompt);
    Alert.alert(t("sentencePromptCopiedTitle"), t("aiPromptCopiedBody"));
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("aiKicker")}</Text>
      <Text style={styles.title}>{t("aiTitle")}</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{prompt}</Text>
        <Pressable style={styles.primaryButton} onPress={copyPrompt}>
          <Brain size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>{t("copyAiPrompt")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const workoutItems = [
  { id: "squat", zh: "\u6df1\u8e72 3\u7ec4", en: "Squats 3 sets" },
  { id: "push", zh: "\u63a8\uff1a\u4fef\u5367\u6491/\u5367\u63a8 3\u7ec4", en: "Push: push-ups/press 3 sets" },
  { id: "pull", zh: "\u62c9\uff1a\u5212\u8239/\u4e0b\u62c9 3\u7ec4", en: "Pull: rows/pulldown 3 sets" },
  { id: "core", zh: "\u6838\u5fc3\uff1a\u5e73\u677f\u652f\u6491", en: "Core: plank" },
  { id: "walk", zh: "\u8d70\u8def/\u62c9\u4f38 10\u5206\u949f", en: "Walk/stretch 10 min" }
];

type WorkoutPlan = {
  id: string;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  itemIds: string[];
};

const workoutPlans: WorkoutPlan[] = [
  {
    id: "lower",
    titleKey: "workoutPlanLower",
    bodyKey: "workoutPlanLowerBody",
    itemIds: ["squat", "core", "walk"]
  },
  {
    id: "upper",
    titleKey: "workoutPlanUpper",
    bodyKey: "workoutPlanUpperBody",
    itemIds: ["push", "pull", "core"]
  },
  {
    id: "recovery",
    titleKey: "workoutPlanRecovery",
    bodyKey: "workoutPlanRecoveryBody",
    itemIds: ["walk", "core"]
  },
  {
    id: "full",
    titleKey: "workoutPlanFull",
    bodyKey: "workoutPlanFullBody",
    itemIds: ["squat", "push", "pull", "walk"]
  }
];

const expensePresets = [
  { amount: 12, category: "food", note: "lunch" },
  { amount: 5, category: "food", note: "coffee" },
  { amount: 40, category: "gas", note: "gas" },
  { amount: 35, category: "grocery", note: "grocery" },
  { amount: 8, category: "car", note: "parking" },
  { amount: 15, category: "car", note: "car wash" }
];

function LifeScreen({
  logs,
  onUpdate,
  language,
  initialMode,
  t
}: {
  logs: LifeLog[];
  onUpdate: (logs: LifeLog[]) => Promise<void>;
  language: InterfaceLanguage;
  initialMode: LifeMode;
  t: TFunc;
}) {
  const today = todayKey();
  const log = logs.find((item) => item.date === today) ?? createEmptyLifeLog(today);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [journal, setJournal] = useState(log.journal);
  const [mode, setMode] = useState<LifeMode>("health");
  const spentToday = log.expenses.reduce((sum, item) => sum + item.amount, 0);
  const expenseCategories = ["food", "gas", "grocery", "car", "health", "other"];
  const moodOptions = [
    { id: "good", label: t("moodGood") },
    { id: "okay", label: t("moodOkay") },
    { id: "tired", label: t("moodTired") },
    { id: "bad", label: t("moodBad") }
  ];
  const logsByDate = new Map(logs.map((item) => [item.date, item]));
  const workoutTrend = recentDateKeys(7).map((item) => ({
    ...item,
    done: (logsByDate.get(item.key)?.workoutCompletedIds.length ?? 0) > 0
  }));
  const workoutDaysThisWeek = workoutTrend.filter((item) => item.done).length;
  const workoutPlan = workoutPlans[new Date().getDay() % workoutPlans.length];
  const workoutPlanDone = workoutPlan.itemIds.every((id) => log.workoutCompletedIds.includes(id));
  const currentMonth = today.slice(0, 7);
  const monthLogs = logs.filter((item) => item.date.startsWith(currentMonth));
  const monthlySpending = monthLogs.reduce((sum, item) => (
    sum + item.expenses.reduce((expenseSum, expense) => expenseSum + expense.amount, 0)
  ), 0);
  const categoryTotals = Array.from(monthLogs
    .flatMap((item) => item.expenses)
    .reduce((map, expense) => {
      const key = expense.category || "general";
      map.set(key, (map.get(key) ?? 0) + expense.amount);
      return map;
    }, new Map<string, number>()))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const recentJournalLogs = logs
    .filter((item) => item.journal.trim().length > 0)
    .slice(0, 3);

  useEffect(() => {
    setJournal(log.journal);
  }, [log.date, log.journal]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  async function saveLog(nextLog: LifeLog) {
    const exists = logs.some((item) => item.date === nextLog.date);
    const nextLogs = exists
      ? logs.map((item) => item.date === nextLog.date ? nextLog : item)
      : [nextLog, ...logs];
    await onUpdate(nextLogs);
  }

  async function toggleWorkout(id: string) {
    const completed = log.workoutCompletedIds.includes(id);
    const workoutCompletedIds = completed
      ? log.workoutCompletedIds.filter((item) => item !== id)
      : [...log.workoutCompletedIds, id];
    await saveLog({ ...log, workoutCompletedIds, updatedAt: new Date().toISOString() });
  }

  async function completeWorkoutPlan(itemIds = workoutPlan.itemIds) {
    const merged = Array.from(new Set([...log.workoutCompletedIds, ...itemIds]));
    await saveLog({ ...log, workoutCompletedIds: merged, updatedAt: new Date().toISOString() });
  }

  async function addExpense() {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      Alert.alert(t("invalidExpenseTitle"), t("invalidExpenseBody"));
      return;
    }
    const expense = {
      id: `${Date.now()}`,
      amount: Math.round(parsed * 100) / 100,
      category: category.trim() || "general",
      note: expenseNote.trim(),
      createdAt: new Date().toISOString()
    };
    await saveLog({ ...log, expenses: [expense, ...log.expenses], updatedAt: new Date().toISOString() });
    setAmount("");
    setCategory("");
    setExpenseNote("");
  }

  async function addExpensePreset(preset: typeof expensePresets[number]) {
    const expense = {
      id: `${Date.now()}`,
      amount: preset.amount,
      category: preset.category,
      note: preset.note,
      createdAt: new Date().toISOString()
    };
    await saveLog({ ...log, expenses: [expense, ...log.expenses], updatedAt: new Date().toISOString() });
  }

  async function saveJournal() {
    await saveLog({ ...log, journal, updatedAt: new Date().toISOString() });
    Alert.alert(t("lifeSavedTitle"), t("lifeSavedBody"));
  }

  function appendJournalLine(line: string) {
    setJournal((current) => current.trim() ? `${current.trim()}\n${line}` : line);
  }

  function insertJournalTemplate() {
    const template = [
      `${t("journalPromptDone")} `,
      `${t("journalPromptBody")} `,
      `${t("journalPromptTomorrow")} `
    ].join("\n");
    setJournal((current) => current.trim() ? `${current.trim()}\n${template}` : template);
  }

  async function setMood(mood: string) {
    await saveLog({ ...log, mood, updatedAt: new Date().toISOString() });
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("lifeKicker")}</Text>
      <Text style={styles.title}>{t("lifeTitle")}</Text>
      <Text style={styles.body}>{t("lifeBody")}</Text>

      <View style={styles.segmentedControl}>
        {([
          ["health", t("lifeModeHealth")],
          ["money", t("lifeModeMoney")],
          ["journal", t("lifeModeJournal")]
        ] as Array<[LifeMode, string]>).map(([nextMode, label]) => (
          <Pressable
            key={nextMode}
            style={[styles.segmentButton, mode === nextMode && styles.segmentButtonActive]}
            onPress={() => setMode(nextMode)}
          >
            <Text style={[styles.segmentText, mode === nextMode && styles.segmentTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.card, mode !== "health" && styles.hidden]}>
        <View style={styles.cardTitleRow}>
          <Dumbbell size={20} color={theme.primaryDark} />
          <Text style={styles.taskTitle}>{t("workoutTitle")}</Text>
        </View>
        <Text style={styles.body}>{t("workoutBody")}</Text>
        <View style={styles.workoutPlanCard}>
          <View style={styles.summaryHeaderRow}>
            <View style={styles.workoutPlanCopy}>
              <Text style={styles.workoutPlanLabel}>{t("workoutPlanTitle")}</Text>
              <Text style={styles.workoutPlanTitle}>{t(workoutPlan.titleKey as TranslationKey)}</Text>
            </View>
            <Text style={[styles.commandStatus, workoutPlanDone && styles.commandStatusDone]}>
              {workoutPlanDone ? t("commandDone") : t("commandNotDone")}
            </Text>
          </View>
          <Text style={styles.summaryBody}>{t(workoutPlan.bodyKey as TranslationKey)}</Text>
          <Text style={styles.note}>{t("workoutPlanBody")}</Text>
          <View style={styles.rowWrap}>
            <Pressable style={styles.captureButtonPrimary} onPress={() => completeWorkoutPlan()}>
              <Text style={styles.captureButtonPrimaryText}>{t("workoutPlanDone")}</Text>
            </Pressable>
            <Pressable style={styles.captureButton} onPress={() => completeWorkoutPlan(["squat", "walk"])}>
              <Text style={styles.captureButtonText}>{t("workoutRescue")}</Text>
            </Pressable>
          </View>
          <Text style={styles.summaryBody}>{t("workoutRescueBody")}</Text>
        </View>
        <View style={styles.summaryBox}>
          <View style={styles.summaryHeaderRow}>
            <Text style={styles.summaryTitle}>{t("weeklyWorkoutTitle")}</Text>
            <Text style={styles.summaryValue}>{workoutDaysThisWeek}/7</Text>
          </View>
          <Text style={styles.summaryBody}>{t("weeklyWorkoutBody")}</Text>
          <View style={styles.trendRow}>
            {workoutTrend.map((item) => (
              <View key={item.key} style={styles.trendItem}>
                <View style={[styles.trendDot, item.done && styles.trendDotDone]} />
                <Text style={styles.trendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        {workoutItems.map((item) => {
          const done = log.workoutCompletedIds.includes(item.id);
          const recommended = workoutPlan.itemIds.includes(item.id);
          return (
            <Pressable key={item.id} style={[styles.lifeChecklistItem, done && styles.lifeChecklistItemDone]} onPress={() => toggleWorkout(item.id)}>
              <CheckCircle2 size={20} color={done ? theme.primary : theme.muted} />
              <Text style={styles.lifeChecklistText}>{language === "zh" ? item.zh : item.en}</Text>
              {recommended && <Text style={styles.recommendedBadge}>{t("workoutRecommended")}</Text>}
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.card, mode !== "money" && styles.hidden]}>
        <View style={styles.cardTitleRow}>
          <WalletCards size={20} color={theme.primaryDark} />
          <Text style={styles.taskTitle}>{t("expenseTitle")}</Text>
        </View>
        <Text style={styles.body}>{t("expenseBody")}</Text>
        <Text style={styles.note}>{t("todayExpense", { amount: spentToday.toFixed(2) })}</Text>
        <View style={styles.expensePresetBox}>
          <Text style={styles.summaryTitle}>{t("expensePresetsTitle")}</Text>
          <Text style={styles.summaryBody}>{t("expensePresetsBody")}</Text>
          <View style={styles.expensePresetGrid}>
            {expensePresets.map((preset) => (
              <Pressable
                key={`${preset.category}-${preset.note}-${preset.amount}`}
                style={styles.expensePresetButton}
                onPress={() => addExpensePreset(preset)}
              >
                <Text style={styles.expensePresetAmount}>${preset.amount}</Text>
                <Text style={styles.expensePresetLabel}>{preset.note}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.summaryBox}>
          <View style={styles.summaryHeaderRow}>
            <Text style={styles.summaryTitle}>{t("monthlySpendingTitle")}</Text>
            <Text style={styles.summaryValue}>${monthlySpending.toFixed(2)}</Text>
          </View>
          <Text style={styles.summaryBody}>{t("monthlySpendingBody")}</Text>
          {categoryTotals.length > 0 ? categoryTotals.map(([name, total]) => (
            <View key={name} style={styles.categoryRow}>
              <Text style={styles.categoryName}>{name}</Text>
              <Text style={styles.categoryAmount}>${total.toFixed(2)}</Text>
            </View>
          )) : (
            <Text style={styles.emptyText}>{t("noExpenseYet")}</Text>
          )}
        </View>
        <View style={styles.inlineForm}>
          <TextInput style={[styles.input, styles.amountInput]} value={amount} onChangeText={setAmount} placeholder={t("expenseAmountPlaceholder")} keyboardType="decimal-pad" />
          <TextInput style={[styles.input, styles.categoryInput]} value={category} onChangeText={setCategory} placeholder={t("expenseCategoryPlaceholder")} autoCapitalize="none" />
        </View>
        <Text style={styles.quickLabel}>{t("expenseQuickAmount")}</Text>
        <View style={styles.rowWrap}>
          {["5", "10", "20", "50"].map((item) => (
            <Pill key={item} label={`$${item}`} onPress={() => setAmount(item)} />
          ))}
        </View>
        <Text style={styles.quickLabel}>{t("expenseQuickCategory")}</Text>
        <View style={styles.rowWrap}>
          {expenseCategories.map((item) => (
            <Pill key={item} label={item} onPress={() => setCategory(item)} />
          ))}
        </View>
        <TextInput style={styles.input} value={expenseNote} onChangeText={setExpenseNote} placeholder={t("expenseNotePlaceholder")} />
        <Pressable style={[styles.primaryButtonSmall, styles.stackedButton]} onPress={addExpense}>
          <Text style={styles.primaryButtonText}>{t("addExpense")}</Text>
        </Pressable>
        <Text style={styles.quickLabel}>{t("recentExpenses")}</Text>
        {log.expenses.slice(0, 4).map((item) => (
          <Text key={item.id} style={styles.expenseLine}>
            ${item.amount.toFixed(2)} · {item.category}{item.note ? ` · ${item.note}` : ""}
          </Text>
        ))}
      </View>

      <View style={[styles.card, mode !== "journal" && styles.hidden]}>
        <View style={styles.cardTitleRow}>
          <NotebookPen size={20} color={theme.primaryDark} />
          <Text style={styles.taskTitle}>{t("journalTitle")}</Text>
        </View>
        <Text style={styles.body}>{t("journalBody")}</Text>
        <Text style={styles.quickLabel}>{t("moodTitle")}</Text>
        <View style={styles.rowWrap}>
          {moodOptions.map((item) => (
            <Pill key={item.id} label={item.label} onPress={() => setMood(item.id)} />
          ))}
        </View>
        {!!log.mood && <Text style={styles.note}>{t("moodTitle")}: {moodOptions.find((item) => item.id === log.mood)?.label || log.mood}</Text>}
        <View style={styles.journalTemplateBox}>
          <Text style={styles.summaryTitle}>{t("journalTemplateTitle")}</Text>
          <Text style={styles.summaryBody}>{t("journalTemplateBody")}</Text>
          <Pressable style={[styles.captureButtonPrimary, styles.stackedButton]} onPress={insertJournalTemplate}>
            <Text style={styles.captureButtonPrimaryText}>{t("insertJournalTemplate")}</Text>
          </Pressable>
        </View>
        <TextInput
          style={[styles.input, styles.journalInput]}
          value={journal}
          onChangeText={setJournal}
          placeholder={t("journalPlaceholder")}
          multiline
        />
        <Text style={styles.quickLabel}>{t("journalQuickLinesTitle")}</Text>
        <View style={styles.rowWrap}>
          {[
            t("journalQuickEnglishDone"),
            t("journalQuickWorkoutDone"),
            t("journalQuickTired"),
            t("journalQuickTomorrowContinue")
          ].map((line) => (
            <Pill key={line} label={line} onPress={() => appendJournalLine(line)} />
          ))}
        </View>
        <Pressable style={styles.secondaryWideButton} onPress={saveJournal}>
          <Text style={styles.secondaryButtonText}>{t("saveJournal")}</Text>
        </Pressable>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>{t("recentJournalTitle")}</Text>
          {recentJournalLogs.length > 0 ? recentJournalLogs.map((item) => (
            <View key={item.date} style={styles.journalPreview}>
              <Text style={styles.journalPreviewDate}>{item.date}</Text>
              <Text style={styles.journalPreviewText} numberOfLines={2}>{item.journal}</Text>
            </View>
          )) : (
            <Text style={styles.emptyText}>{t("recentJournalEmpty")}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

function RoadmapScreen({ t }: { t: TFunc }) {
  async function openRoadmapResource(url: string) {
    await Linking.openURL(url);
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("roadmapKicker")}</Text>
      <Text style={styles.title}>{t("roadmapTitle")}</Text>
      {ROADMAP.map((item) => (
        <View key={item.days} style={styles.card}>
          <Text style={styles.kicker}>{item.label} / Day {item.days}</Text>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.body}>{item.focus}</Text>
          <Text style={styles.note}>{item.exit}</Text>
          <Pressable style={styles.secondaryWideButton} onPress={() => openRoadmapResource(item.resourceUrl)}>
            <Text style={styles.secondaryButtonText}>{t("openStageResource")}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

function SettingsScreen({
  progress,
  onUpdate,
  onJumpToDay,
  onRestoreBackup,
  t
}: {
  progress: ProgressState;
  onUpdate: (progress: ProgressState) => void;
  onJumpToDay: (day: number) => void;
  onRestoreBackup: (backupJson: string) => Promise<void>;
  t: TFunc;
}) {
  const [dayText, setDayText] = useState(String(progress.currentDay));
  const [backupText, setBackupText] = useState("");

  async function enableNotifications(hour: number, minute: number) {
    const ok = await requestNotificationPermission();
    if (!ok) {
      Alert.alert(t("permissionTitle"), t("permissionBody"));
      return;
    }
    await scheduleDailyStudyReminder(hour, minute);
    await onUpdate({ ...progress, reminderHour: hour, reminderMinute: minute, notificationsEnabled: true });
    Alert.alert(t("reminderSetTitle"), t("reminderSetBody", { time: `${pad(hour)}:${pad(minute)}` }));
  }

  async function setInterfaceLanguage(interfaceLanguage: InterfaceLanguage) {
    await onUpdate({ ...progress, interfaceLanguage });
  }

  async function copyBackup() {
    const backup = await exportBackup();
    await Clipboard.setStringAsync(backup);
    Alert.alert(t("backupCopiedTitle"), t("backupCopiedBody"));
  }

  async function restoreBackup() {
    if (!backupText.trim()) {
      Alert.alert(t("pasteBackupTitle"), t("pasteBackupBody"));
      return;
    }
    try {
      await onRestoreBackup(backupText);
      setBackupText("");
      Alert.alert(t("restoreSuccessTitle"), t("restoreSuccessBody"));
    } catch {
      Alert.alert(t("restoreFailTitle"), t("restoreFailBody"));
    }
  }

  function jump() {
    const parsed = Number(dayText);
    if (!Number.isFinite(parsed)) {
      Alert.alert(t("enterNumberTitle"), t("enterNumberBody"));
      return;
    }
    onJumpToDay(parsed);
  }

  return (
    <View>
      <Text style={styles.kicker}>{t("settingsKicker")}</Text>
      <Text style={styles.title}>{t("settingsTitle")}</Text>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{t("languageTitle")}</Text>
        <Text style={styles.body}>{t("languageBody")}</Text>
        <View style={styles.segmentedControl}>
          <Pressable
            style={[styles.segmentButton, (progress.interfaceLanguage || "zh") === "zh" && styles.segmentButtonActive]}
            onPress={() => setInterfaceLanguage("zh")}
          >
            <Text style={[styles.segmentText, (progress.interfaceLanguage || "zh") === "zh" && styles.segmentTextActive]}>{t("chinese")}</Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, progress.interfaceLanguage === "en" && styles.segmentButtonActive]}
            onPress={() => setInterfaceLanguage("en")}
          >
            <Text style={[styles.segmentText, progress.interfaceLanguage === "en" && styles.segmentTextActive]}>{t("english")}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.runModeCard}>
        <Text style={styles.taskTitle}>{t("runModeTitle")}</Text>
        <Text style={styles.kicker}>{t("runModeExpo")}</Text>
        <Text style={styles.body}>{t("runModeBody")}</Text>
        <Text style={styles.note}>{t("runModeStandalone")}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{t("dailyReminder")}</Text>
        <Text style={styles.body}>{t("reminderBody")}</Text>
        <View style={styles.rowWrap}>
          <Pill label="8:00" onPress={() => enableNotifications(8, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="15:00" onPress={() => enableNotifications(15, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="20:00" onPress={() => enableNotifications(20, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label="22:00" onPress={() => enableNotifications(22, 0)} icon={<Bell size={18} color={theme.primaryDark} />} />
          <Pill label={t("test3Seconds")} onPress={scheduleTestNotification} />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{t("jumpTitle")}</Text>
        <Text style={styles.body}>{t("jumpBody")}</Text>
        <View style={styles.inlineForm}>
          <TextInput style={[styles.input, styles.dayInput]} value={dayText} onChangeText={setDayText} keyboardType="number-pad" />
          <Pressable style={styles.primaryButtonSmall} onPress={jump}>
            <Text style={styles.primaryButtonText}>{t("jump")}</Text>
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
        <Text style={styles.taskTitle}>{t("localBackup")}</Text>
        <Text style={styles.body}>{t("backupBody")}</Text>
        <Pressable style={styles.primaryButtonSmall} onPress={copyBackup}>
          <Text style={styles.primaryButtonText}>{t("copyBackup")}</Text>
        </Pressable>
        <Text style={styles.quickLabel}>{t("restoreBackupTitle")}</Text>
        <TextInput
          style={[styles.input, styles.backupInput]}
          value={backupText}
          onChangeText={setBackupText}
          placeholder={t("backupPlaceholder")}
          multiline
        />
        <Pressable style={styles.secondaryWideButton} onPress={restoreBackup}>
          <Text style={styles.secondaryButtonText}>{t("restoreFromBackup")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function BottomNav({ tab, onChange, t }: { tab: Tab; onChange: (tab: Tab) => void; t: TFunc }) {
  const items: Array<{ tab: Tab; label: string; icon: React.ReactNode }> = [
    { tab: "home", label: t("navHome"), icon: <Home size={20} color={tab === "home" ? theme.primary : theme.muted} /> },
    { tab: "today", label: t("navToday"), icon: <ListChecks size={20} color={tab === "today" ? theme.primary : theme.muted} /> },
    { tab: "player", label: t("navPlayer"), icon: <Headphones size={20} color={tab === "player" ? theme.primary : theme.muted} /> },
    { tab: "words", label: t("navWords"), icon: <BookOpen size={20} color={tab === "words" ? theme.primary : theme.muted} /> },
    { tab: "life", label: t("navLife"), icon: <Dumbbell size={20} color={tab === "life" ? theme.primary : theme.muted} /> },
    { tab: "ai", label: t("navAi"), icon: <Brain size={20} color={tab === "ai" ? theme.primary : theme.muted} /> }
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

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.snapshotItem}>
      <Text style={styles.snapshotValue}>{value}</Text>
      <Text style={styles.snapshotLabel}>{label}</Text>
    </View>
  );
}

function CommandRow({
  icon,
  title,
  body,
  value,
  done,
  onPress
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  value: string;
  done: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.commandRow} onPress={onPress}>
      <View style={[styles.commandIcon, done && styles.commandIconDone]}>{icon}</View>
      <View style={styles.commandCopy}>
        <Text style={styles.commandTitle}>{title}</Text>
        <Text style={styles.commandBody}>{body}</Text>
      </View>
      <Text style={[styles.commandStatus, done && styles.commandStatusDone]}>{value}</Text>
    </Pressable>
  );
}

function ModuleCard({ icon, title, body, onPress }: { icon: React.ReactNode; title: string; body: string; onPress: () => void }) {
  return (
    <Pressable style={styles.moduleCard} onPress={onPress}>
      <View style={styles.moduleIcon}>{icon}</View>
      <Text style={styles.moduleTitle}>{title}</Text>
      <Text style={styles.moduleBody}>{body}</Text>
    </Pressable>
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

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function todayKey() {
  return dateKey();
}

function addDays(date: Date, offset: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}

function recentDateKeys(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = addDays(today, index - count + 1);
    return {
      key: dateKey(date),
      label: `${date.getMonth() + 1}/${date.getDate()}`
    };
  });
}

function createEmptyLifeLog(date: string): LifeLog {
  return {
    date,
    workoutCompletedIds: [],
    expenses: [],
    journal: "",
    updatedAt: new Date().toISOString()
  };
}

function upsertLifeLog(logs: LifeLog[], nextLog: LifeLog) {
  return logs.some((item) => item.date === nextLog.date)
    ? logs.map((item) => item.date === nextLog.date ? nextLog : item)
    : [nextLog, ...logs];
}

function detectExpenseCategory(note: string) {
  const text = note.toLowerCase();
  if (/gas|fuel|car|uber|lyft|parking|oil|maintenance/.test(text)) {
    return "car";
  }
  if (/food|lunch|dinner|breakfast|restaurant|coffee|meal|吃|饭|餐/.test(text)) {
    return "food";
  }
  if (/grocery|walmart|costco|market|超市/.test(text)) {
    return "grocery";
  }
  if (/doctor|clinic|medicine|dental|health|医院|药|牙/.test(text)) {
    return "health";
  }
  if (/rent|bill|utility|electric|water|phone|房租|账单/.test(text)) {
    return "bill";
  }
  return "other";
}

function calculateCourseStreak(completedDays: number[], currentDay: number) {
  const completed = new Set(completedDays);
  let cursor = completed.has(currentDay) ? currentDay : currentDay - 1;
  let streak = 0;

  while (cursor >= 1 && completed.has(cursor)) {
    streak += 1;
    cursor -= 1;
  }

  return streak;
}

function normalizeEnglish(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const IMPORT_STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "to",
  "for",
  "my",
  "your",
  "is",
  "it",
  "i",
  "you",
  "he",
  "she",
  "we",
  "they",
  "me",
  "him",
  "her",
  "them",
  "that",
  "this",
  "and",
  "or",
  "but",
  "so",
  "as",
  "at",
  "by",
  "from",
  "with",
  "in",
  "on",
  "of",
  "be",
  "are",
  "was",
  "were"
]);

function extractImportWords(input: string) {
  const matches = input.toLowerCase().match(/[a-z][a-z'-]{1,}/g) ?? [];
  const seen = new Set<string>();
  const words: string[] = [];

  matches.forEach((match) => {
    const cleaned = match.replace(/^'+|'+$/g, "");
    if (cleaned.length < 3 || IMPORT_STOP_WORDS.has(cleaned) || seen.has(cleaned)) {
      return;
    }
    seen.add(cleaned);
    words.push(cleaned);
  });

  return words.slice(0, 50);
}

function scoreDictation(input: string, target: string) {
  const inputWords = normalizeEnglish(input).split(" ").filter(Boolean);
  const targetWords = normalizeEnglish(target).split(" ").filter(Boolean);
  if (!targetWords.length) {
    return 0;
  }
  const matched = targetWords.filter((word, index) => inputWords[index] === word).length;
  const looseMatched = targetWords.filter((word) => inputWords.includes(word)).length;
  return Math.round(((matched + looseMatched) / 2 / targetWords.length) * 100);
}

function dictationFeedback(score: number) {
  if (score >= 80) {
    return "不错，可以进入下一句。";
  }
  if (score >= 60) {
    return "抓住主干了，再读3遍会更稳。";
  }
  if (score > 0) {
    return "别急，先隐藏中文，只听关键词。";
  }
  return "先播放原句，再写你听到的几个词。";
}

function understandingAdvice(percent: number, t: TFunc) {
  if (percent >= 80) {
    return t("understandingAdviceHigh");
  }
  if (percent >= 60) {
    return t("understandingAdviceMid");
  }
  return t("understandingAdviceLow");
}

function extractUsefulWords(sentence: string) {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "to",
    "for",
    "my",
    "is",
    "it",
    "i",
    "you",
    "that",
    "this",
    "and",
    "or",
    "do",
    "can",
    "could",
    "would",
    "like",
    "have",
    "am",
    "are",
    "in",
    "on",
    "of"
  ]);
  const words = normalizeEnglish(sentence)
    .split(" ")
    .filter((word) => word.length > 2 && !stopWords.has(word));
  return Array.from(new Set(words)).slice(0, 8);
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
  stackedButton: {
    marginTop: 10
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
  snapshotCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.line,
    marginTop: 14
  },
  backupReminderCard: {
    backgroundColor: "#F7FBF8",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#C9DDD4",
    marginTop: 12
  },
  snapshotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  snapshotItem: {
    width: "48%",
    minHeight: 72,
    borderRadius: 8,
    backgroundColor: theme.soft,
    borderWidth: 1,
    borderColor: theme.line,
    padding: 12,
    justifyContent: "center"
  },
  snapshotValue: {
    color: theme.ink,
    fontSize: 22,
    fontWeight: "800"
  },
  snapshotLabel: {
    color: theme.muted,
    marginTop: 4,
    fontWeight: "700"
  },
  commandCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D8E2DC",
    marginTop: 12
  },
  commandRow: {
    minHeight: 72,
    borderTopWidth: 1,
    borderTopColor: "#E8E0D4",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  commandIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF5E9",
    borderWidth: 1,
    borderColor: "#E8C7A8"
  },
  commandIconDone: {
    backgroundColor: "#EAF3EF",
    borderColor: "#C9DDD4"
  },
  commandCopy: {
    flex: 1,
    minWidth: 0
  },
  commandTitle: {
    color: theme.ink,
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 3
  },
  commandBody: {
    color: theme.muted,
    lineHeight: 19,
    fontSize: 13
  },
  commandStatus: {
    maxWidth: 96,
    color: theme.warm,
    fontWeight: "900",
    textAlign: "right"
  },
  commandStatusDone: {
    color: theme.primaryDark
  },
  closeoutCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D8E2DC",
    marginTop: 12
  },
  closeoutHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8
  },
  closeoutBadge: {
    marginLeft: "auto",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFF5E9",
    borderWidth: 1,
    borderColor: "#E8C7A8"
  },
  closeoutBadgeDone: {
    backgroundColor: "#EAF3EF",
    borderColor: "#C9DDD4"
  },
  closeoutBadgeText: {
    color: theme.warm,
    fontSize: 12,
    fontWeight: "900"
  },
  closeoutBadgeTextDone: {
    color: theme.primaryDark
  },
  closeoutRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#E8E0D4"
  },
  closeoutRowText: {
    flex: 1,
    color: theme.ink,
    fontWeight: "900"
  },
  closeoutRowStatus: {
    color: theme.warm,
    fontWeight: "900"
  },
  closeoutRowStatusDone: {
    color: theme.primaryDark
  },
  nextActionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EAF3EF",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#C9DDD4",
    marginTop: 12
  },
  nextActionIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDECE6"
  },
  nextActionCopy: {
    flex: 1,
    minWidth: 0
  },
  nextActionLabel: {
    color: theme.primaryDark,
    fontWeight: "900",
    fontSize: 12,
    marginBottom: 2
  },
  nextActionTitle: {
    color: theme.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  nextActionBody: {
    color: theme.muted,
    lineHeight: 19,
    marginTop: 2
  },
  nextActionButton: {
    borderRadius: 8,
    backgroundColor: theme.primary,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  nextActionButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12
  },
  quickCaptureCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D8E2DC",
    marginTop: 12
  },
  quickCaptureInput: {
    minHeight: 86,
    paddingTop: 12,
    textAlignVertical: "top"
  },
  quickCaptureActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  captureButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.line,
    backgroundColor: theme.soft,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  captureButtonText: {
    color: theme.primaryDark,
    fontWeight: "900"
  },
  captureButtonPrimary: {
    borderRadius: 8,
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  captureButtonPrimaryText: {
    color: "#fff",
    fontWeight: "900"
  },
  moduleSection: {
    marginTop: 18
  },
  moduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  moduleCard: {
    width: "48%",
    minHeight: 142,
    borderRadius: 8,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.line,
    padding: 14
  },
  moduleIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: theme.soft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  moduleTitle: {
    color: theme.ink,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6
  },
  moduleBody: {
    color: theme.muted,
    lineHeight: 20,
    fontSize: 13
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
  hidden: {
    display: "none"
  },
  warning: {
    color: theme.danger,
    fontWeight: "800",
    marginBottom: 12
  },
  studyTimeNote: {
    color: theme.primaryDark,
    fontWeight: "900",
    backgroundColor: "#EAF3EF",
    borderWidth: 1,
    borderColor: "#C9DDD4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8
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
  earlyFinishBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 14
  },
  earlyFinishTitle: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 6
  },
  earlyFinishText: {
    color: "#DCEDE8",
    lineHeight: 21
  },
  resourceButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 14
  },
  resourceButtonText: {
    color: theme.primaryDark,
    fontWeight: "800",
    fontSize: 16
  },
  resourceButtonSubtext: {
    color: theme.muted,
    marginTop: 4,
    lineHeight: 19
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
  supportButton: {
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  supportButtonText: {
    color: theme.primaryDark,
    fontWeight: "800"
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
  ratingPanel: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 14
  },
  ratingTitle: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 4
  },
  ratingHint: {
    color: "#DCEDE8",
    lineHeight: 20
  },
  ratingAdvice: {
    color: "#FFE5C7",
    lineHeight: 21,
    fontWeight: "800",
    marginTop: 8
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
  taskTitleDone: {
    color: theme.primaryDark
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
  minutesDone: {
    color: theme.primaryDark
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
  segmentedControl: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: theme.soft,
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: theme.line
  },
  segmentButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  segmentButtonActive: {
    backgroundColor: theme.primary
  },
  segmentText: {
    color: theme.muted,
    fontWeight: "800"
  },
  segmentTextActive: {
    color: "#fff"
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.line,
    marginBottom: 12
  },
  runModeCard: {
    backgroundColor: "#FFF8ED",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8C7A8",
    marginBottom: 12
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8
  },
  lifeChecklistItem: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.line,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  lifeChecklistItemDone: {
    backgroundColor: "#EEF6F3",
    borderColor: "#BBD8D0"
  },
  lifeChecklistText: {
    flex: 1,
    color: theme.ink,
    fontWeight: "800",
    lineHeight: 20
  },
  workoutPlanCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C9DDD4",
    backgroundColor: "#EAF3EF",
    padding: 12,
    marginTop: 10,
    marginBottom: 12
  },
  workoutPlanCopy: {
    flex: 1,
    minWidth: 0
  },
  workoutPlanLabel: {
    color: theme.primaryDark,
    fontWeight: "900",
    fontSize: 12,
    marginBottom: 2
  },
  workoutPlanTitle: {
    color: theme.ink,
    fontWeight: "900",
    fontSize: 18
  },
  recommendedBadge: {
    color: theme.primaryDark,
    fontWeight: "900",
    fontSize: 12,
    backgroundColor: "#DDECE6",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden"
  },
  portableCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D8E2DC",
    marginTop: 12,
    marginBottom: 4
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
  summaryBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2D8C8",
    backgroundColor: "#FBF7EF",
    padding: 12,
    marginTop: 10,
    marginBottom: 12
  },
  summaryHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  summaryTitle: {
    color: theme.ink,
    fontWeight: "900",
    fontSize: 15
  },
  summaryValue: {
    color: theme.primaryDark,
    fontWeight: "900"
  },
  summaryBody: {
    color: theme.muted,
    lineHeight: 20,
    marginTop: 4
  },
  trendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginTop: 12
  },
  trendItem: {
    alignItems: "center",
    flex: 1,
    minWidth: 0
  },
  trendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CFC4B4",
    backgroundColor: theme.surface,
    marginBottom: 4
  },
  trendDotDone: {
    borderColor: theme.primary,
    backgroundColor: theme.primary
  },
  trendLabel: {
    color: theme.muted,
    fontSize: 10,
    fontWeight: "700"
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E7DED0",
    paddingTop: 8,
    marginTop: 8
  },
  categoryName: {
    color: theme.ink,
    fontWeight: "800"
  },
  categoryAmount: {
    color: theme.primaryDark,
    fontWeight: "900"
  },
  expensePresetBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2D8C8",
    backgroundColor: "#FFF8ED",
    padding: 12,
    marginTop: 10,
    marginBottom: 12
  },
  expensePresetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },
  expensePresetButton: {
    width: "48%",
    minHeight: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5C9A8",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center"
  },
  expensePresetAmount: {
    color: theme.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  expensePresetLabel: {
    color: theme.muted,
    fontWeight: "800",
    marginTop: 2
  },
  emptyText: {
    color: theme.muted,
    lineHeight: 20,
    marginTop: 8
  },
  journalPreview: {
    borderTopWidth: 1,
    borderTopColor: "#E7DED0",
    paddingTop: 8,
    marginTop: 8
  },
  journalTemplateBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8E2DC",
    backgroundColor: "#EAF3EF",
    padding: 12,
    marginTop: 10,
    marginBottom: 12
  },
  journalPreviewDate: {
    color: theme.warm,
    fontWeight: "900",
    marginBottom: 2
  },
  journalPreviewText: {
    color: theme.muted,
    lineHeight: 20
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
  amountInput: {
    flex: 0.8,
    marginBottom: 10
  },
  categoryInput: {
    flex: 1.2,
    marginBottom: 10
  },
  expenseLine: {
    color: theme.muted,
    lineHeight: 21,
    marginTop: 4
  },
  journalInput: {
    minHeight: 130,
    paddingTop: 12,
    textAlignVertical: "top"
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
  bulkInput: {
    minHeight: 110,
    paddingTop: 12,
    textAlignVertical: "top"
  },
  dictationInput: {
    minHeight: 86,
    textAlignVertical: "top"
  },
  feedbackBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D5C8B7",
    backgroundColor: theme.soft,
    padding: 12,
    marginTop: 12
  },
  feedbackTitle: {
    color: theme.ink,
    fontWeight: "800",
    marginBottom: 6
  },
  feedbackText: {
    color: theme.muted,
    lineHeight: 21,
    marginBottom: 4
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
    width: "16.66%"
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
