const KEY = "english1000.life.web.v1";

const phases = [
  { start: 1, end: 34, level: "Level 1 / A1", phase: "Dreaming English Beginner", resource: "Dreaming English Beginner", url: "https://www.youtube.com/results?search_query=Dreaming+English+Beginner" },
  { start: 35, end: 84, level: "Level 2 / A1+", phase: "Dreaming English Intermediate", resource: "Dreaming English Intermediate", url: "https://www.youtube.com/results?search_query=Dreaming+English+Intermediate" },
  { start: 85, end: 150, level: "Level 3 / A2", phase: "Bluey Season 1", resource: "Bluey Season 1", url: "https://www.disneyplus.com/search?q=Bluey" },
  { start: 151, end: 205, level: "Level 4 / A2+", phase: "Peppa Pig", resource: "Peppa Pig", url: "https://www.youtube.com/results?search_query=Peppa+Pig+English" },
  { start: 206, end: 275, level: "Level 5 / B1", phase: "TED-Ed", resource: "TED-Ed easy topics", url: "https://ed.ted.com/lessons" },
  { start: 276, end: 334, level: "Level 6 / B1+", phase: "Modern Family", resource: "Modern Family selected episodes", url: "https://www.hulu.com/search?q=Modern+Family" }
];

const starterHints = {
  i: ["我", "I study English today."],
  you: ["你；你们", "You can do this."],
  he: ["他", "He is busy today."],
  she: ["她", "She is happy."],
  go: ["去", "I go home after work."],
  come: ["来", "Can you come tomorrow?"],
  want: ["想要", "I want to learn useful English."],
  like: ["喜欢", "I like this lesson."],
  good: ["好的；不错的", "Today is a good day."],
  today: ["今天", "Today I studied English."],
  appointment: ["预约", "I'd like to schedule an appointment."],
  maintenance: ["保养；维护", "I need regular maintenance for my car."],
  insurance: ["保险", "I need to bring my insurance card."],
  clinic: ["诊所", "I need to call the clinic."],
  document: ["文件；材料", "What documents do I need?"],
  problem: ["问题", "There is a problem."],
  repeat: ["重复", "Could you repeat that?"],
  confirm: ["确认", "Let me confirm the time."],
  understand: ["理解；听懂", "I can understand the main idea."],
  listen: ["听", "I listen to English every day."],
  learn: ["学习", "I learn English by listening."],
  important: ["重要的", "This word is important."],
  useful: ["有用的", "This sentence is useful."],
  practice: ["练习", "I practice English every day."],
  speak: ["说；讲话", "I want to speak English."],
  write: ["写", "I write a short journal."],
  watch: ["观看", "I watch one video today."],
  question: ["问题", "I have a question."],
  answer: ["回答；答案", "I know the answer."],
  work: ["工作", "I work today."],
  home: ["家", "I drove home."],
  tired: ["累的", "I am tired, but I will continue."],
  money: ["钱", "I spent money today."],
  food: ["食物", "I bought food."],
  gas: ["汽油", "I paid for gas."],
  grocery: ["食品杂货", "I bought groceries."],
  lunch: ["午餐", "I had lunch at work."],
  squat: ["深蹲", "I did squats today."],
  pushup: ["俯卧撑", "I did pushups today."],
  stretch: ["拉伸", "I stretched for ten minutes."]
};

const coreWordPlan = [
  ["i", "you", "he", "she", "go", "come", "want", "like", "good", "today"],
  ["my", "your", "name", "live", "work", "study", "home", "tired", "happy", "now"],
  ["car", "appointment", "maintenance", "oil", "tire", "service", "tomorrow", "morning", "afternoon", "possible"],
  ["water", "beef", "rice", "potato", "egg", "vegetable", "order", "have", "please", "check"],
  ["where", "find", "aisle", "milk", "bread", "price", "bag", "receipt", "card", "cash"],
  ["start", "finish", "drive", "walk", "call", "message", "boss", "customer", "break", "later"],
  ["doctor", "available", "week", "pain", "insurance", "clinic", "repeat", "slowly", "confirm", "hold"],
  ["bank", "account", "deposit", "transfer", "money", "fee", "balance", "license", "document", "form"]
];

const phrasePlan = [
  {
    title: "自我介绍",
    items: [
      "My name is Jacob.",
      "I live in the United States.",
      "I study English every day.",
      "I am a beginner, but I can keep going."
    ]
  },
  {
    title: "听不懂时",
    items: [
      "Sorry, could you repeat that?",
      "Could you say that again a little more slowly?",
      "I understand the main idea.",
      "I don't know this word yet."
    ]
  },
  {
    title: "汽车保养",
    items: [
      "Hi, I'd like to schedule a maintenance appointment.",
      "It's for my Kia Carnival.",
      "Just regular maintenance.",
      "Is it covered under warranty?"
    ]
  },
  {
    title: "餐馆点餐",
    items: [
      "Can I have water, please?",
      "I'd like beef and vegetables.",
      "No rice, please.",
      "Can I get the check?"
    ]
  },
  {
    title: "超市购物",
    items: [
      "Where can I find olive oil?",
      "Which aisle is it in?",
      "Can I pay by card?",
      "Can I get a receipt?"
    ]
  },
  {
    title: "工作生活",
    items: [
      "I worked today.",
      "I helped a customer.",
      "I took a short break.",
      "I am tired, but I will continue."
    ]
  },
  {
    title: "预约看病",
    items: [
      "I'd like to make an appointment.",
      "Do you have anything available this week?",
      "I have pain in my tooth.",
      "Can you confirm the time?"
    ]
  },
  {
    title: "银行 DMV",
    items: [
      "I'd like to open an account.",
      "Is there a fee?",
      "I'm here for my driver's license.",
      "What documents do I need?"
    ]
  }
];

const phraseMeanings = {
  "My name is Jacob.": "我叫 Jacob。",
  "I live in the United States.": "我住在美国。",
  "I study English every day.": "我每天学英语。",
  "I am a beginner, but I can keep going.": "我是初学者，但我能坚持下去。",
  "Sorry, could you repeat that?": "不好意思，你可以再说一遍吗？",
  "Could you say that again a little more slowly?": "你可以再慢一点说一遍吗？",
  "I understand the main idea.": "我听懂了大意。",
  "I don't know this word yet.": "我还不认识这个词。",
  "Hi, I'd like to schedule a maintenance appointment.": "你好，我想预约一次车辆保养。",
  "It's for my Kia Carnival.": "是我的 Kia Carnival。",
  "Just regular maintenance.": "只是常规保养。",
  "Is it covered under warranty?": "这个在保修范围内吗？",
  "Can I have water, please?": "可以给我一杯水吗？",
  "I'd like beef and vegetables.": "我想要牛肉和蔬菜。",
  "No rice, please.": "不要米饭，谢谢。",
  "Can I get the check?": "可以给我账单吗？",
  "Where can I find olive oil?": "橄榄油在哪里？",
  "Which aisle is it in?": "它在哪条过道？",
  "Can I pay by card?": "我可以刷卡吗？",
  "Can I get a receipt?": "可以给我收据吗？",
  "I worked today.": "我今天工作了。",
  "I helped a customer.": "我帮助了一位顾客。",
  "I took a short break.": "我休息了一小会儿。",
  "I am tired, but I will continue.": "我很累，但我会继续。",
  "I'd like to make an appointment.": "我想预约。",
  "Do you have anything available this week?": "这周有空位吗？",
  "I have pain in my tooth.": "我的牙疼。",
  "Can you confirm the time?": "你能确认一下时间吗？",
  "I'd like to open an account.": "我想开一个账户。",
  "Is there a fee?": "有费用吗？",
  "I'm here for my driver's license.": "我是来办驾照的。",
  "What documents do I need?": "我需要什么文件？"
};

function lookupWordHint(word) {
  const webHint = window.BASIC_WORD_HINTS && window.BASIC_WORD_HINTS[word];
  if (webHint) return [webHint.meaning, webHint.sentence];
  return starterHints[word] || ["待补中文", `I learned the word "${word}" today.`];
}

function getDailyWords(day = state.currentDay) {
  return coreWordPlan[(day - 1) % coreWordPlan.length];
}

function getDailyPhrases(day = state.currentDay) {
  return phrasePlan[(day - 1) % phrasePlan.length];
}

const defaultState = {
  currentDay: 1,
  completedTasks: {},
  studyMinutes: {},
  studySeconds: {},
  understanding: {},
  timer: { running: false, startedAt: "", taskId: "", taskTitle: "", bankedSeconds: 0 },
  player: { index: 0, hideEnglish: false, hideChinese: false, rate: 0.82, dictation: "" },
  words: [],
  lifeLogs: {},
  quick: "",
  sync: {
    token: "",
    gistId: "",
    lastSyncAt: "",
    lastSyncDevice: "",
    lastCloudUpdatedAt: "",
    auto: true
  },
  tab: "home"
};

let state = loadState();
let syncTimer = null;
let syncBusy = false;
let timerTicker = null;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...defaultState };
  }
}

function saveState(options = {}) {
  const { markDirty = true, autoSync = true } = options;
  const now = new Date().toISOString();
  if (markDirty) state.localUpdatedAt = now;
  localStorage.setItem(KEY, JSON.stringify({ ...state, savedAt: now }));
  if (markDirty && autoSync) scheduleAutoUpload();
}

function getSyncState() {
  if (!state.sync) state.sync = {};
  state.sync = {
    token: "",
    gistId: "",
    lastSyncAt: "",
    lastSyncDevice: "",
    lastCloudUpdatedAt: "",
    auto: true,
    ...state.sync
  };
  return state.sync;
}

function publicStateForSync() {
  const { tab, sync, ...rest } = state;
  return rest;
}

function mergeSyncedState(remoteState) {
  const localSync = getSyncState();
  state = {
    ...defaultState,
    ...remoteState,
    sync: localSync,
    tab: state.tab || "home"
  };
  saveState({ markDirty: false, autoSync: false });
}

function getPhase(day) {
  return phases.find((item) => day >= item.start && day <= item.end) || phases[phases.length - 1];
}

function getCourseDay(day) {
  const phase = getPhase(day);
  const isReview = day % 7 === 0;
  const episode = phase.phase.includes("Beginner")
    ? ((day - 1) % 80) + 1
    : phase.phase.includes("Intermediate")
      ? ((day - 35) % 80) + 1
      : phase.phase.includes("Bluey")
        ? ((day - 85) % 52) + 1
        : phase.phase.includes("Peppa")
          ? ((day - 151) % 52) + 1
          : phase.phase.includes("TED")
            ? ((day - 206) % 70) + 1
            : ((day - 276) % 24) + 1;

  const mainTitle = isReview ? "本周复习，不学新材料" : `${phase.resource} 第 ${episode} 集`;
  const tasks = isReview
    ? [
        ["review", "复习本周输入", 50, "重看最简单和最难的片段。"],
        ["words", "复习生词本", 30, "先复习到期词，不加太多新词。"],
        ["speak", "本周口语复盘", 35, "用英语说 2 分钟本周做了什么。"],
        ["journal", "本周英文日记", 25, "写 5 到 10 句，短句就行。"],
        ["ai", "AI 老师小测", 40, "复制复盘提示给 AI，让它测你。"]
      ]
    : [
        ["input", mainTitle, 45, "第一遍不暂停、不查词，只靠画面理解大意。"],
        ["intensive", "第二遍精听", 35, "开英文字幕重看，挑一小段反复听。"],
        ["shadow", "跟读模仿", 20, "挑 3 到 5 句，模仿节奏和语气。"],
        ["words", "今日 10 词", 20, "只记录高频、生活里真会用的词。"],
        ["grammar", "语法 15 分钟", 15, "今天只看一个语法点，不刷题。"],
        ["output", "输出和日记", 45, "口语 20 分钟，日记 5 到 10 句。"]
      ];
  return { day, phase, mainTitle, tasks: tasks.map(([id, title, minutes, detail]) => ({ id: `d${day}-${id}`, title, minutes, detail })) };
}

function getTodayLog() {
  const key = todayKey();
  if (!state.lifeLogs[key]) {
    state.lifeLogs[key] = { expenses: [], workout: [], journal: "", mood: "" };
  }
  return state.lifeLogs[key];
}

function completedForDay(day) {
  const ids = new Set(state.completedTasks[day] || []);
  return getCourseDay(day).tasks.filter((task) => ids.has(task.id));
}

function totalStudyToday() {
  return Math.floor(totalStudySecondsToday() / 60);
}

function activeTimerSeconds() {
  const timer = state.timer || {};
  const banked = Number(timer.bankedSeconds || 0);
  if (!timer.running || !timer.startedAt) return banked;
  return banked + Math.max(0, Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000));
}

function totalStudySecondsToday() {
  const fromSeconds = Number(state.studySeconds?.[todayKey()] || 0);
  const fromOldMinutes = Number(state.studyMinutes?.[todayKey()] || 0) * 60;
  return Math.max(fromSeconds, fromOldMinutes) + activeTimerSeconds();
}

function understandingKey(day = state.currentDay) {
  return `d${day}`;
}

function getUnderstanding(day = state.currentDay) {
  if (!state.understanding) state.understanding = {};
  return Number(state.understanding[understandingKey(day)] || 0);
}

function setUnderstanding(value) {
  if (!state.understanding) state.understanding = {};
  state.understanding[understandingKey()] = Number(value);
  saveState();
  render();
}

function understandingAdvice(value) {
  if (value >= 80) return "可以升级：下次少看字幕，更多靠耳朵和画面理解。";
  if (value >= 60) return "正合适：继续当前难度，不急着换美剧。";
  if (value >= 40) return "能继续：先保留画面理解，不要停下来查太多词。";
  return "还没评分：看完第一遍后，按真实感觉选 40%、60% 或 80%。";
}

function getDailySupport(course) {
  const dailyPhrases = getDailyPhrases(course.day);
  const words = getDailyWords(course.day);
  const subtitleRule = course.day < 85
    ? "第一遍不看字幕，第二遍英文字幕。不要开中文字幕。"
    : course.day < 206
      ? "英文字幕为主，听懂的片段关字幕复听。"
      : "先英文字幕，再挑 5 分钟无字幕复听。";
  return {
    subtitleRule,
    earlyFinish: "今天提前完成，不直接冲下一天。先复习到期词、跟读今日句子、补一段英文日记。连续性比贪多重要。",
    words,
    phrases: dailyPhrases.items,
    aiPrompt: `我是 Jacob，正在执行 English1000 Life。今天是 Day ${course.day}，阶段是 ${course.phase.phase}，材料是 ${course.mainTitle}。请用简单英语测试我：1）问我今天视频大意；2）抽查这10个词：${words.join(", ")}；3）让我跟读这几句：${dailyPhrases.items.join(" / ")}；4）最后用中文告诉我明天是否该升级、保持、还是降难度。`
  };
}

function todayPortableText() {
  const course = getCourseDay(state.currentDay);
  const support = getDailySupport(course);
  return [
    `English1000 Life Day ${course.day}`,
    `阶段：${course.phase.level} / ${course.phase.phase}`,
    `材料：${course.mainTitle}`,
    "",
    "今日任务：",
    ...course.tasks.map((task, index) => `${index + 1}. ${task.title}（${task.minutes}分钟）- ${task.detail}`),
    "",
    `今日10词：${support.words.join(", ")}`,
    "",
    "今日句子：",
    ...support.phrases.map((item) => `- ${item}`),
    "",
    "AI老师提示：",
    support.aiPrompt
  ].join("\n");
}

function formatDuration(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const mm = String(Math.floor(safe / 60)).padStart(2, "0");
  const ss = String(safe % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function dueWords() {
  const now = Date.now();
  return state.words.filter((word) => !word.dueAt || new Date(word.dueAt).getTime() <= now);
}

function normalizeWord(word) {
  return word.trim().toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, "");
}

function extractWords(text) {
  return Array.from(new Set((text.match(/[a-zA-Z][a-zA-Z'-]{1,}/g) || []).map(normalizeWord).filter(Boolean)));
}

function addWordsFromText(text) {
  const existing = new Set(state.words.map((item) => item.word));
  const fresh = [];
  extractWords(text).forEach((word) => {
    if (existing.has(word)) return;
    const hint = lookupWordHint(word);
    fresh.push({
      id: `${Date.now()}-${word}`,
      word,
      meaning: hint[0],
      sentence: hint[1],
      ease: 2,
      createdAt: new Date().toISOString(),
      dueAt: new Date().toISOString()
    });
    existing.add(word);
  });
  state.words = [...fresh, ...state.words];
  saveState();
  return fresh.length;
}

function addDailyWords() {
  return addWordsFromText(getDailyWords().join(" "));
}

function renderWordImportPreview(text) {
  const words = extractWords(text).slice(0, 24);
  if (!words.length) {
    return `<p class="install-tip">输入英文后，这里会先显示中文预览。</p>`;
  }
  return `
    <div class="preview-grid">
      ${words.map((word) => {
        const hint = lookupWordHint(word);
        const known = hint[0] !== "待补中文";
        return `<span class="preview-chip ${known ? "" : "unknown"}"><strong>${word}</strong><em>${hint[0]}</em></span>`;
      }).join("")}
    </div>
  `;
}

function playerState() {
  if (!state.player) state.player = {};
  state.player = {
    index: 0,
    hideEnglish: false,
    hideChinese: false,
    rate: 0.82,
    dictation: "",
    ...state.player
  };
  return state.player;
}

function getPlayerSentence() {
  const phrases = getDailyPhrases().items;
  const player = playerState();
  const index = Math.max(0, Math.min(phrases.length - 1, Number(player.index || 0)));
  player.index = index;
  const english = phrases[index] || phrases[0] || "";
  return {
    index,
    total: phrases.length,
    english,
    chinese: phraseMeanings[english] || "先听懂大意，再用自己的中文解释。"
  };
}

function sentenceSimilarity(a, b) {
  const left = extractWords(a);
  const right = new Set(extractWords(b));
  if (!left.length) return 0;
  const matched = left.filter((word) => right.has(word)).length;
  return Math.round((matched / left.length) * 100);
}

function smartSave(text) {
  const trimmed = text.trim();
  if (!trimmed) return "先输入内容。";
  const amount = trimmed.match(/(?:\$|usd\s*)?\s*(\d+(?:\.\d{1,2})?)/i);
  const hasChinese = /[\u3400-\u9fff]/.test(trimmed);
  if (amount) {
    const log = getTodayLog();
    log.expenses.unshift({
      id: `${Date.now()}`,
      amount: Number(amount[1]),
      note: trimmed.replace(amount[0], "").trim() || "spending",
      createdAt: new Date().toISOString()
    });
    saveState();
    return `已记账 $${Number(amount[1]).toFixed(2)}`;
  }
  if (!hasChinese && extractWords(trimmed).length) {
    return `已加入 ${addWordsFromText(trimmed)} 个生词`;
  }
  const log = getTodayLog();
  log.journal = log.journal ? `${log.journal}\n${trimmed}` : trimmed;
  saveState();
  return "已追加到今天日记。";
}

function setTab(tab) {
  state.tab = tab;
  saveState();
  render();
}

function toggleTask(taskId) {
  const day = state.currentDay;
  const ids = new Set(state.completedTasks[day] || []);
  ids.has(taskId) ? ids.delete(taskId) : ids.add(taskId);
  state.completedTasks[day] = Array.from(ids);
  saveState();
  render();
}

function addStudyMinutes(minutes) {
  addStudySeconds(minutes * 60);
}

function addStudySeconds(seconds) {
  const key = todayKey();
  if (!state.studySeconds) state.studySeconds = {};
  state.studySeconds[key] = (state.studySeconds[key] || 0) + Math.max(0, Math.round(seconds));
  state.studyMinutes[key] = Math.floor(state.studySeconds[key] / 60);
  saveState();
  render();
}

async function copyText(text, message = "已复制") {
  try {
    await navigator.clipboard.writeText(text);
    alert(message);
  } catch {
    const box = document.createElement("textarea");
    box.value = text;
    document.body.appendChild(box);
    box.select();
    document.execCommand("copy");
    box.remove();
    alert(message);
  }
}

function startTimer(task) {
  const current = state.timer || {};
  state.timer = {
    running: true,
    startedAt: new Date().toISOString(),
    taskId: task.id,
    taskTitle: task.title,
    bankedSeconds: current.taskId === task.id ? Number(current.bankedSeconds || 0) : 0
  };
  saveState();
  render();
}

function pauseTimer() {
  if (!state.timer) return;
  state.timer = { ...state.timer, running: false, startedAt: "", bankedSeconds: activeTimerSeconds() };
  saveState();
  render();
}

function resetTimer() {
  state.timer = { running: false, startedAt: "", taskId: "", taskTitle: "", bankedSeconds: 0 };
  saveState();
  render();
}

function finishTimer() {
  const seconds = activeTimerSeconds();
  const taskId = state.timer?.taskId;
  if (seconds > 0) addStudySeconds(seconds);
  if (taskId) {
    const day = state.currentDay;
    const ids = new Set(state.completedTasks[day] || []);
    ids.add(taskId);
    state.completedTasks[day] = Array.from(ids);
  }
  state.timer = { running: false, startedAt: "", taskId: "", taskTitle: "", bankedSeconds: 0 };
  saveState();
  render();
}

function reviewWord(id, level) {
  const days = level === "easy" ? 7 : level === "ok" ? 3 : level === "hard" ? 1 : 0;
  state.words = state.words.map((word) => {
    if (word.id !== id) return word;
    return { ...word, dueAt: new Date(Date.now() + days * 86400000).toISOString(), ease: level === "again" ? 1 : level === "hard" ? 2 : level === "ok" ? 3 : 4 };
  });
  saveState();
  render();
}

function exportBackup() {
  const text = JSON.stringify({ app: "English1000 Life Web", version: 1, exportedAt: new Date().toISOString(), state }, null, 2);
  navigator.clipboard?.writeText(text);
  return text;
}

function importBackup(text) {
  const data = JSON.parse(text);
  if (!data.state) throw new Error("bad backup");
  state = { ...defaultState, ...data.state };
  saveState({ autoSync: false });
}

async function githubRequest(path, options = {}) {
  const sync = getSyncState();
  if (!sync.token.trim()) throw new Error("missing_token");
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      "accept": "application/vnd.github+json",
      "authorization": `Bearer ${sync.token.trim()}`,
      "content-type": "application/json",
      "x-github-api-version": "2022-11-28",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`github_${response.status}_${text.slice(0, 120)}`);
  }
  return response.status === 204 ? null : response.json();
}

function syncPayload() {
  return JSON.stringify({
    app: "English1000 Life",
    version: 1,
    device: navigator.userAgent,
    updatedAt: state.localUpdatedAt || new Date().toISOString(),
    state: publicStateForSync()
  }, null, 2);
}

async function createCloudSync() {
  const sync = getSyncState();
  const gist = await githubRequest("/gists", {
    method: "POST",
    body: JSON.stringify({
      description: "English1000 Life sync data",
      public: false,
      files: {
        "english1000-life.json": {
          content: syncPayload()
        }
      }
    })
  });
  sync.gistId = gist.id;
  sync.lastSyncAt = new Date().toISOString();
  sync.lastSyncDevice = "uploaded";
  sync.lastCloudUpdatedAt = state.localUpdatedAt || sync.lastSyncAt;
  saveState({ markDirty: false, autoSync: false });
  return gist.id;
}

async function uploadCloudSync() {
  const sync = getSyncState();
  if (!sync.gistId.trim()) return createCloudSync();
  await githubRequest(`/gists/${sync.gistId.trim()}`, {
    method: "PATCH",
    body: JSON.stringify({
      files: {
        "english1000-life.json": {
          content: syncPayload()
        }
      }
    })
  });
  sync.lastSyncAt = new Date().toISOString();
  sync.lastSyncDevice = "uploaded";
  sync.lastCloudUpdatedAt = state.localUpdatedAt || sync.lastSyncAt;
  saveState({ markDirty: false, autoSync: false });
  return sync.gistId;
}

async function downloadCloudSync() {
  const sync = getSyncState();
  if (!sync.gistId.trim()) throw new Error("missing_gist");
  const gist = await githubRequest(`/gists/${sync.gistId.trim()}`);
  const file = gist.files && gist.files["english1000-life.json"];
  if (!file) throw new Error("missing_file");
  const data = JSON.parse(file.content);
  if (!data.state) throw new Error("bad_cloud_data");
  mergeSyncedState(data.state);
  getSyncState().lastSyncAt = new Date().toISOString();
  getSyncState().lastSyncDevice = "downloaded";
  getSyncState().lastCloudUpdatedAt = data.updatedAt || getSyncState().lastSyncAt;
  saveState({ markDirty: false, autoSync: false });
}

function canCloudSync() {
  const sync = getSyncState();
  return !!(sync.auto && sync.token.trim() && sync.gistId.trim() && navigator.onLine);
}

function scheduleAutoUpload() {
  if (!canCloudSync() || syncBusy) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    if (!canCloudSync() || syncBusy) return;
    try {
      syncBusy = true;
      await uploadCloudSync();
      updateSyncBadge("已自动同步");
    } catch (error) {
      updateSyncBadge("自动同步失败，稍后再试");
    } finally {
      syncBusy = false;
    }
  }, 3000);
}

async function autoSyncOnStart() {
  if (!canCloudSync() || syncBusy) return;
  try {
    syncBusy = true;
    const sync = getSyncState();
    const gist = await githubRequest(`/gists/${sync.gistId.trim()}`);
    const file = gist.files && gist.files["english1000-life.json"];
    if (!file) return;
    const data = JSON.parse(file.content);
    const remoteAt = data.updatedAt || "";
    const localAt = state.localUpdatedAt || "";
    if (remoteAt && (!localAt || remoteAt > localAt)) {
      mergeSyncedState(data.state);
      getSyncState().lastSyncAt = new Date().toISOString();
      getSyncState().lastSyncDevice = "auto downloaded";
      getSyncState().lastCloudUpdatedAt = remoteAt;
      saveState({ markDirty: false, autoSync: false });
      render();
      updateSyncBadge("已自动下载云端最新数据");
    } else if (localAt && localAt > (sync.lastCloudUpdatedAt || "")) {
      await uploadCloudSync();
      updateSyncBadge("已自动上传本机最新数据");
    }
  } catch {
    updateSyncBadge("自动同步暂时失败");
  } finally {
    syncBusy = false;
  }
}

function updateSyncBadge(text) {
  const target = document.querySelector("#syncBadge") || document.querySelector("#syncStatus");
  if (target) target.textContent = text;
}

function dayPercent(course) {
  const done = completedForDay(course.day).length;
  return Math.round((done / course.tasks.length) * 100);
}

function renderHome() {
  const course = getCourseDay(state.currentDay);
  const log = getTodayLog();
  const percent = dayPercent(course);
  const wordsDue = dueWords().length;
  const workoutDone = log.workout.length > 0;
  const journalDone = !!log.journal.trim();
  const closeout = [
    ["英语主线", percent >= 100, "today"],
    ["到期单词", wordsDue === 0, "words"],
    ["健康训练", workoutDone, "life"],
    ["今日记事", journalDone, "life"]
  ];
  return `
    <section class="hero">
      <p class="kicker">English1000 Life</p>
      <h1>Day ${course.day}</h1>
      <p class="body">${course.phase.level} / ${course.phase.phase}</p>
      <h3>${course.mainTitle}</h3>
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
      <p class="small">今日完成 ${percent}% / 已学 ${totalStudyToday()} 分钟 / 到期词 ${wordsDue}</p>
      <div class="button-row">
        <button class="primary" data-tab="today">一键继续今天</button>
        <button class="secondary" data-open="${course.phase.url}">打开学习资源</button>
      </div>
    </section>
    <section class="card success">
      <h2>今日收工判断</h2>
      <p class="body">下面都变绿，今天就算稳了。</p>
      ${closeout.map(([label, done, tab]) => `
        <button class="row" data-tab="${tab}">
          <span class="check ${done ? "done" : ""}">${done ? "✓" : ""}</span>
          <span class="row-main"><strong>${label}</strong></span>
          <span class="status ${done ? "done" : ""}">${done ? "已完成" : "待完成"}</span>
        </button>
      `).join("")}
    </section>
    <section class="card">
      <h2>万能速记</h2>
      <p class="body">单词、花费、日记都先扔这里，点智能保存。</p>
      <textarea id="quick" placeholder="appointment, maintenance / $12 lunch / 今天练了深蹲">${state.quick || ""}</textarea>
      <div class="button-row">
        <button class="primary" id="smartSave">智能保存</button>
        <button class="secondary" id="pasteQuick">粘贴</button>
      </div>
      <p class="install-tip" id="quickResult"></p>
    </section>
    <section class="card">
      <h2>一键带走今天</h2>
      <p class="body">把今天任务、10词、句子和AI提示一次复制。去上班、吃饭、换设备，都不用重新找。</p>
      <div class="button-row">
        <button class="primary" id="copyTodayPack">复制今天学习包</button>
        <button class="secondary" data-tab="roadmap">查看1000小时路线</button>
      </div>
    </section>
    <section class="grid">
      <div class="metric"><div class="metric-value">${totalStudyToday()}</div><div class="metric-label">今日分钟</div></div>
      <div class="metric"><div class="metric-value">${state.words.length}</div><div class="metric-label">生词</div></div>
      <div class="metric"><div class="metric-value">$${log.expenses.reduce((sum, item) => sum + item.amount, 0).toFixed(0)}</div><div class="metric-label">今日花费</div></div>
      <div class="metric"><div class="metric-value">${log.workout.length}</div><div class="metric-label">训练项</div></div>
    </section>
  `;
}

function renderToday() {
  const course = getCourseDay(state.currentDay);
  const ids = new Set(state.completedTasks[state.currentDay] || []);
  const activeTask = course.tasks.find((task) => !ids.has(task.id)) || course.tasks[0];
  const timer = state.timer || {};
  const running = Boolean(timer.running);
  const timerTask = timer.taskTitle || activeTask.title;
  const support = getDailySupport(course);
  const understanding = getUnderstanding(course.day);
  return `
    <section class="card">
      <p class="kicker">${course.phase.level}</p>
      <h1>Day ${course.day}</h1>
      <p class="body">${course.phase.phase}</p>
      <div class="button-row">
        <button class="secondary" id="prevDay">前一天</button>
        <button class="secondary" id="nextDay">下一天</button>
        <button class="primary" data-open="${course.phase.url}">打开学习资源</button>
      </div>
    </section>
    <section class="card success">
      <h2>今天怎么学</h2>
      <ul class="clean-list">
        <li>${support.subtitleRule}</li>
        <li>第一遍只判断大意，第二遍才精听。不要一边看一边查词。</li>
        <li>提前完成：${support.earlyFinish}</li>
      </ul>
    </section>
    <section class="card">
      <h2>今日任务</h2>
      ${course.tasks.map((task) => `
        <button class="row" data-task="${task.id}">
          <span class="check ${ids.has(task.id) ? "done" : ""}">${ids.has(task.id) ? "✓" : ""}</span>
          <span class="row-main"><strong>${task.title}</strong><br><span class="small">${task.detail}</span></span>
          <span class="status ${ids.has(task.id) ? "done" : ""}">${task.minutes}m</span>
        </button>
      `).join("")}
      <div class="timer-box">
        <p class="small">当前计时：${timerTask}</p>
        <div class="timer-time" id="timerTime">${formatDuration(activeTimerSeconds())}</div>
        <p class="small">今天累计：<span id="timerTotal">${Math.floor(totalStudySecondsToday() / 60)}</span> 分钟。切到 YouTube 也会按开始时间继续算。</p>
        <div class="button-row">
          <button class="primary" id="timerStart" data-task-id="${activeTask.id}">${running ? "继续计时中" : "开始计时"}</button>
          <button class="secondary" id="timerPause">暂停</button>
          <button class="secondary" id="timerReset">重置</button>
        </div>
        <button class="primary full" id="timerFinish">完成这一项并累计时间</button>
      </div>
      <div class="button-row">
        <button class="primary" data-minutes="10">记录 10 分钟</button>
        <button class="secondary" data-minutes="25">记录 25 分钟</button>
        <button class="secondary" data-minutes="45">记录 45 分钟</button>
      </div>
    </section>
    <section class="card">
      <h2>理解度判断</h2>
      <p class="body">看完第一遍就估一下，用来判断材料难不难。</p>
      <div class="score-row">
        ${[40, 60, 80].map((value) => `<button class="${understanding === value ? "primary" : "secondary"}" data-understanding="${value}">${value}%</button>`).join("")}
      </div>
      <p class="install-tip"><strong>结论：</strong>${understandingAdvice(understanding)}</p>
    </section>
    <section class="card">
      <h2>今日AI老师</h2>
      <p class="body">学完后复制这段给 ChatGPT，它就按今天内容测你。</p>
      <textarea readonly>${support.aiPrompt}</textarea>
      <button class="primary full" id="copyAiPrompt">复制AI测试提示</button>
    </section>
  `;
}

function renderWords() {
  const due = dueWords();
  const dailyWords = getDailyWords();
  const dailyPhrases = getDailyPhrases();
  return `
    <section class="card">
      <h1>生词本</h1>
      <p class="body">不是只背单词。每天先看高频词，再听常用句，最后复习到期生词。</p>
      <textarea id="wordImport" placeholder="listen, understand, repeat 或粘贴一段英文字幕"></textarea>
      <div id="wordPreview">${renderWordImportPreview("")}</div>
      <div class="button-row">
        <button class="primary" id="importWords">一键导入生词</button>
        <button class="secondary" id="seedWords">加入3500基础词</button>
      </div>
    </section>
    <section class="card success">
      <h2>今日高频词</h2>
      <p class="body">Day ${state.currentDay} 先拿这 10 个。会用，比背多更重要。</p>
      <div class="word-grid">
        ${dailyWords.map((word) => {
          const hint = lookupWordHint(word);
          return `<button class="word-chip" data-say="${word}"><strong>${word}</strong><span>${hint[0]}</span></button>`;
        }).join("")}
      </div>
      <button class="primary full" id="addDailyWords">加入今日10词到生词本</button>
    </section>
    <section class="card">
      <h2>今日常用句：${dailyPhrases.title}</h2>
      <p class="body">句子才是你以后开口用的东西。点“读句子”，跟着模仿。</p>
      <div class="phrase-list">
        ${dailyPhrases.items.map((item) => `
          <div class="phrase-card">
            <p>${item}</p>
            <button class="ghost" data-say="${item}">读句子</button>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="card">
      <h2>今天要复习：${due.length}</h2>
      <div class="word-list">
        ${(due.length ? due : state.words.slice(0, 20)).map((word) => `
          <div class="word-card">
            <div class="word-head">
              <div class="word-title">${word.word}</div>
              <button class="ghost" data-say="${word.word}">发音</button>
            </div>
            <p class="body">${word.meaning}</p>
            <p class="small">${word.sentence}</p>
            <div class="button-row">
              <button class="secondary" data-review="${word.id}" data-level="again">忘了</button>
              <button class="secondary" data-review="${word.id}" data-level="hard">困难</button>
              <button class="primary" data-review="${word.id}" data-level="ok">会了</button>
              <button class="secondary" data-review="${word.id}" data-level="easy">很熟</button>
            </div>
          </div>
        `).join("") || `<p class="body">还没有生词。先导入基础词，或者从视频字幕粘贴。</p>`}
      </div>
    </section>
  `;
}

function renderPlayer() {
  const course = getCourseDay(state.currentDay);
  const player = playerState();
  const sentence = getPlayerSentence();
  const dictationScore = player.dictation ? sentenceSimilarity(sentence.english, player.dictation) : 0;
  const keyWords = extractWords(sentence.english).slice(0, 6);
  return `
    <section class="card">
      <p class="kicker">精听播放器</p>
      <h1>Day ${course.day} 句子训练</h1>
      <p class="body">先听，再跟读，再听写。不要一边看一边查词。</p>
    </section>
    <section class="player-card">
      <div class="player-count">第 ${sentence.index + 1} / ${sentence.total} 句</div>
      <div class="sentence-box ${player.hideEnglish ? "muted-box" : ""}">
        ${player.hideEnglish ? "英文已隐藏，先靠耳朵。" : sentence.english}
      </div>
      <div class="sentence-box chinese ${player.hideChinese ? "muted-box" : ""}">
        ${player.hideChinese ? "中文已隐藏，自己想意思。" : sentence.chinese}
      </div>
      <div class="button-row">
        <button class="primary" data-player-say="${sentence.english}">播放原句</button>
        <button class="secondary" id="repeatThree">读3遍</button>
      </div>
      <div class="button-row">
        <button class="secondary" data-player-move="-1">上一句</button>
        <button class="secondary" data-player-move="1">下一句</button>
      </div>
      <div class="button-row">
        <button class="ghost" id="toggleEnglish">${player.hideEnglish ? "显示英文" : "隐藏英文"}</button>
        <button class="ghost" id="toggleChinese">${player.hideChinese ? "显示中文" : "隐藏中文"}</button>
        <button class="ghost" id="cycleRate">语速 ${player.rate.toFixed(2)}x</button>
      </div>
    </section>
    <section class="card">
      <h2>听写检查</h2>
      <textarea id="dictationBox" placeholder="听完后，把你听到的英文打在这里。">${player.dictation || ""}</textarea>
      <div class="button-row">
        <button class="primary" id="checkDictation">检查听写</button>
        <button class="secondary" id="clearDictation">清空</button>
      </div>
      <p class="install-tip">${player.dictation ? `匹配度约 ${dictationScore}%。这个分数只看关键词，不追求完美。` : "先听两遍，再写。不会写完整也没事，写关键词也算训练。"}</p>
    </section>
    <section class="card">
      <h2>这句值得学的词</h2>
      <div class="pill-row">
        ${keyWords.map((word) => {
          const hint = lookupWordHint(word);
          return `<button class="pill" data-add-one-word="${word}">${word} · ${hint[0]}</button>`;
        }).join("")}
      </div>
      <div class="button-row">
        <button class="primary" id="addSentenceWords">把这句关键词加入生词本</button>
        <button class="secondary" id="copySentenceAi">复制这句给AI解释</button>
      </div>
    </section>
  `;
}

function renderAiTeacher() {
  const course = getCourseDay(state.currentDay);
  const support = getDailySupport(course);
  const phrases = support.phrases.map((item) => `- ${item}`).join("\n");
  const prompt = support.aiPrompt;
  return `
    <section class="card">
      <p class="kicker">AI老师</p>
      <h1>Day ${course.day} 测试</h1>
      <p class="body">把提示词复制给 ChatGPT，让它按今天内容测你。不要重新解释背景。</p>
    </section>
    <section class="card">
      <h2>今日完整测试提示</h2>
      <textarea readonly>${prompt}</textarea>
      <button class="primary full" id="copyAiPromptPage">复制完整测试</button>
    </section>
    <section class="card">
      <h2>快速训练</h2>
      <div class="button-row">
        <button class="secondary" data-copy-ai="请用简单英语问我5个关于 Day ${course.day} 视频大意的问题。每次只问一个，等我回答后再纠正。">视频大意问答</button>
        <button class="secondary" data-copy-ai="请用这10个词给我做口语训练：${support.words.join(", ")}。每次给我一个中文场景，让我用英文回答。">10词口语训练</button>
        <button class="secondary" data-copy-ai="请带我跟读这几句英语，先一句一句读，再纠正我的自然表达：\n${phrases}">今日句子跟读</button>
        <button class="secondary" data-copy-ai="我会写5句英文日记，请你用中文指出错误，再给我一个更自然但简单的英文版本。">日记纠错</button>
      </div>
    </section>
    <section class="card notice">
      <h2>今天提前完成怎么办</h2>
      <p class="body">${support.earlyFinish}</p>
      <button class="secondary full" data-tab="player">去精听复习今天句子</button>
    </section>
  `;
}

function renderRoadmap() {
  const current = getPhase(state.currentDay);
  return `
    <section class="card">
      <p class="kicker">1000小时路线</p>
      <h1>只按一条主线走</h1>
      <p class="body">不要再来回换教材。每个阶段都有进入、退出和复习标准。</p>
    </section>
    ${phases.map((phase, index) => {
      const active = phase.phase === current.phase;
      const done = state.currentDay > phase.end;
      return `
        <section class="card ${active ? "success" : ""}">
          <p class="kicker">第 ${index + 1} 阶段 / Day ${phase.start}-${phase.end}</p>
          <h2>${phase.phase}</h2>
          <p class="body">${phase.resource}</p>
          <ul class="clean-list">
            <li>${index === 0 ? "建立耳朵，不查词，不急着说。" : index === 1 ? "继续可理解输入，开始增加生活句子。" : index === 2 ? "进入真实家庭生活英语，英文字幕为主。" : index === 3 ? "用儿童生活场景补词汇，不要死磕每一句。" : index === 4 ? "接触成人兴趣内容，训练说明类英语。" : "进入真人语速，为YouTube和美国生活做准备。"}</li>
            <li>状态：${done ? "已完成" : active ? "当前阶段" : "后面再做，不提前跳。"}</li>
          </ul>
          <div class="button-row">
            <button class="secondary" data-open="${phase.url}">打开资源</button>
          </div>
        </section>
      `;
    }).join("")}
  `;
}

function renderLife() {
  const log = getTodayLog();
  const workoutPlans = [
    ["下肢+核心", "深蹲 3组 / 弓步 2组 / 平板 2组"],
    ["推拉+核心", "俯卧撑 3组 / 划船动作 3组 / 卷腹 2组"],
    ["恢复日", "走路 20分钟 / 拉伸 10分钟 / 早睡"],
    ["10分钟保底", "深蹲 20个 / 俯卧撑 10个 / 拉伸 3分钟"]
  ];
  const journalLines = ["今天完成：", "身体状态：", "花钱最多的一项：", "明天最重要一件事：", "今天一句英文："];
  return `
    <section class="card">
      <h1>生活管理</h1>
      <p class="body">只管今天：训练、记账、日记。不要复杂。</p>
    </section>
    <section class="card">
      <h2>健康训练</h2>
      <p class="body">最低标准也算。今天先别追求完美。</p>
      <div class="plan-grid">
        ${workoutPlans.map(([title, detail]) => `
          <button class="plan-card" data-workout="${title}：${detail}">
            <strong>${log.workout.some((item) => item.startsWith(title)) ? "✓ " : ""}${title}</strong>
            <span>${detail}</span>
          </button>
        `).join("")}
      </div>
      <div class="pill-row">
        ${["深蹲 20 个", "俯卧撑 10 个", "平板支撑 30 秒", "拉伸 10 分钟", "走路完成"].map((item) => `
          <button class="pill" data-workout="${item}">${log.workout.includes(item) ? "✓ " : ""}${item}</button>
        `).join("")}
      </div>
    </section>
    <section class="card">
      <h2>记账</h2>
      <div class="pill-row">
        ${[[12, "lunch"], [5, "coffee"], [40, "gas"], [35, "grocery"], [8, "parking"], [15, "car wash"]].map(([amount, note]) => `
          <button class="pill" data-expense="${amount}" data-note="${note}">$${amount} ${note}</button>
        `).join("")}
      </div>
      <div class="money-form">
        <input id="expenseAmount" type="number" inputmode="decimal" placeholder="金额，例如 12.5" />
        <input id="expenseNote" placeholder="类别/备注，例如 lunch" />
        <button class="primary" id="addExpense">记一笔</button>
      </div>
      <div class="money-list">
        ${log.expenses.map((item) => `<div class="entry"><strong>$${item.amount.toFixed(2)}</strong> ${item.note}<br><span class="small">${new Date(item.createdAt).toLocaleTimeString()}</span></div>`).join("")}
      </div>
    </section>
    <section class="card">
      <h2>日记</h2>
      <div class="pill-row">
        ${journalLines.map((line) => `<button class="pill" data-journal-line="${line}">${line}</button>`).join("")}
      </div>
      <textarea id="journal" placeholder="今天做了什么？身体怎么样？明天最重要一件事？">${log.journal || ""}</textarea>
      <div class="button-row">
        <button class="primary" id="saveJournal">保存日记</button>
        <button class="secondary" id="templateJournal">三问模板</button>
      </div>
    </section>
  `;
}

function renderSettings() {
  const sync = getSyncState();
  return `
    <section class="card notice">
      <h1>网页/PWA 版本</h1>
      <p class="body">这个版本的数据保存在本机浏览器。发布到 GitHub Pages 后，手机打开一次，就可以添加到主屏幕。离线能力需要浏览器首次缓存成功。</p>
      <p class="small">iPhone：Safari 打开网址，点分享，选择“添加到主屏幕”。</p>
    </section>
    <section class="card">
      <h2>云同步</h2>
      <p class="body">手机和 Windows 要同步，就用 GitHub Gist 存一份私人数据。第一次填 Token 后点创建；以后手机上传，电脑下载。</p>
      <label class="field-label" for="githubToken">GitHub Token</label>
      <input id="githubToken" type="password" value="${sync.token || ""}" placeholder="只保存到本机，不会提交到 GitHub 仓库" />
      <label class="field-label" for="gistId">Gist ID</label>
      <input id="gistId" value="${sync.gistId || ""}" placeholder="第一次可留空，点创建云同步后自动生成" />
      ${sync.gistId ? `
        <div class="sync-id-box">
          <div class="small">当前 Gist ID</div>
          <strong>${sync.gistId}</strong>
          <button class="ghost" id="copyGistId">复制 Gist ID</button>
        </div>
      ` : `
        <div class="sync-id-box">
          <div class="small">还没有 Gist ID。第一次创建时留空，然后点“创建云同步”。</div>
        </div>
      `}
      <label class="toggle-row">
        <input id="autoSync" type="checkbox" ${sync.auto ? "checked" : ""} />
        <span>自动同步：打开时自动下载，修改后自动上传</span>
      </label>
      <div class="button-row">
        <button class="primary" id="createSync">创建云同步</button>
        <button class="secondary" id="uploadSync">上传本机数据</button>
        <button class="secondary" id="downloadSync">下载云端数据</button>
      </div>
      <p class="install-tip" id="syncStatus">${sync.lastSyncAt ? `上次同步：${new Date(sync.lastSyncAt).toLocaleString()} / ${sync.lastSyncDevice}` : "还没有同步。"}</p>
      <p class="small">Token 权限只需要 gist。不要给我看 Token，自己填到这里就行。</p>
    </section>
    <section class="card">
      <h2>数据备份</h2>
      <p class="body">换手机、清浏览器缓存前，先复制备份。</p>
      <div class="button-row">
        <button class="primary" id="copyBackup">复制备份</button>
        <button class="secondary" id="restoreBackup">恢复备份</button>
      </div>
      <textarea id="backupText" placeholder="恢复时把备份文字粘贴到这里"></textarea>
    </section>
    <section class="card">
      <h2>跳转 Day</h2>
      <input id="jumpDay" type="number" min="1" max="334" value="${state.currentDay}" />
      <div class="button-row">
        <button class="primary" id="jumpButton">跳转</button>
        <button class="danger" id="clearLocal">清空本网页数据</button>
      </div>
    </section>
  `;
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <main class="app">
      <div class="topbar">
        <div>
          <p class="kicker">Local-first PWA</p>
          <strong>English1000 Life</strong>
        </div>
        <button class="secondary" data-tab="settings">设置</button>
      </div>
      ${state.tab === "today" ? renderToday() : state.tab === "player" ? renderPlayer() : state.tab === "words" ? renderWords() : state.tab === "life" ? renderLife() : state.tab === "ai" ? renderAiTeacher() : state.tab === "roadmap" ? renderRoadmap() : state.tab === "settings" ? renderSettings() : renderHome()}
    </main>
    <nav class="tabs">
      ${[
        ["home", "首页"],
        ["today", "今日"],
        ["player", "精听"],
        ["words", "单词"],
        ["life", "生活"],
        ["ai", "AI"],
        ["roadmap", "路线"]
      ].map(([tab, label]) => `<button class="tab ${state.tab === tab ? "active" : ""}" data-tab="${tab}">${label}</button>`).join("")}
    </nav>
  `;
  bindEvents();
  refreshTimerTicker();
}

function refreshTimerTicker() {
  if (timerTicker) {
    clearInterval(timerTicker);
    timerTicker = null;
  }
  const update = () => {
    const time = document.querySelector("#timerTime");
    const total = document.querySelector("#timerTotal");
    if (time) time.textContent = formatDuration(activeTimerSeconds());
    if (total) total.textContent = String(Math.floor(totalStudySecondsToday() / 60));
  };
  update();
  if (state.timer?.running) timerTicker = setInterval(update, 1000);
}

function speakEnglish(text, rate = 0.82) {
  const clean = String(text || "").trim();
  if (!clean) return;
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    alert("这个浏览器不支持发音。请用 Safari、Chrome 或 Edge 打开。");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => /^en[-_]/i.test(voice.lang)) || voices.find((voice) => /English/i.test(voice.name));
  if (englishVoice) utterance.voice = englishVoice;
  setTimeout(() => window.speechSynthesis.speak(utterance), 30);
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((el) => el.addEventListener("click", () => setTab(el.dataset.tab)));
  document.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => window.open(el.dataset.open, "_blank", "noopener")));
  document.querySelectorAll("[data-task]").forEach((el) => el.addEventListener("click", () => toggleTask(el.dataset.task)));
  document.querySelectorAll("[data-minutes]").forEach((el) => el.addEventListener("click", () => addStudyMinutes(Number(el.dataset.minutes))));
  document.querySelectorAll("[data-understanding]").forEach((el) => el.addEventListener("click", () => setUnderstanding(Number(el.dataset.understanding))));
  document.querySelectorAll("[data-review]").forEach((el) => el.addEventListener("click", () => reviewWord(el.dataset.review, el.dataset.level)));
  document.querySelectorAll("[data-say]").forEach((el) => el.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    speakEnglish(el.dataset.say);
  }));
  document.querySelectorAll("[data-player-say]").forEach((el) => el.addEventListener("click", () => {
    speakEnglish(el.dataset.playerSay, playerState().rate);
  }));
  document.querySelectorAll("[data-player-move]").forEach((el) => el.addEventListener("click", () => {
    const player = playerState();
    const total = getDailyPhrases().items.length;
    player.index = Math.max(0, Math.min(total - 1, Number(player.index || 0) + Number(el.dataset.playerMove)));
    player.dictation = "";
    saveState();
    render();
  }));
  document.querySelectorAll("[data-add-one-word]").forEach((el) => el.addEventListener("click", () => {
    const count = addWordsFromText(el.dataset.addOneWord);
    alert(count ? "已加入生词本" : "这个词已经在生词本里");
    render();
  }));

  const quick = document.querySelector("#quick");
  if (quick) quick.addEventListener("input", () => { state.quick = quick.value; saveState(); });
  const smart = document.querySelector("#smartSave");
  if (smart) smart.addEventListener("click", () => {
    const result = smartSave(document.querySelector("#quick").value);
    state.quick = "";
    saveState();
    render();
    const target = document.querySelector("#quickResult");
    if (target) target.textContent = result;
  });
  const paste = document.querySelector("#pasteQuick");
  if (paste) paste.addEventListener("click", async () => {
    const text = await navigator.clipboard.readText();
    state.quick = text;
    saveState();
    render();
  });
  const importWords = document.querySelector("#importWords");
  const wordImportBox = document.querySelector("#wordImport");
  if (wordImportBox) wordImportBox.addEventListener("input", () => {
    const preview = document.querySelector("#wordPreview");
    if (preview) preview.innerHTML = renderWordImportPreview(wordImportBox.value);
  });
  if (importWords) importWords.addEventListener("click", () => {
    const count = addWordsFromText(document.querySelector("#wordImport").value);
    alert(`已加入 ${count} 个生词`);
    render();
  });
  const seedWords = document.querySelector("#seedWords");
  if (seedWords) seedWords.addEventListener("click", () => {
    const allWords = Object.keys(window.BASIC_WORD_HINTS || starterHints);
    const count = addWordsFromText(allWords.slice(0, 3500).join(" "));
    alert(`已加入 ${count} 个基础词`);
    render();
  });
  const addDailyWordsButton = document.querySelector("#addDailyWords");
  if (addDailyWordsButton) addDailyWordsButton.addEventListener("click", () => {
    const count = addDailyWords();
    alert(`已加入 ${count} 个今日高频词`);
    render();
  });
  const timerStart = document.querySelector("#timerStart");
  if (timerStart) timerStart.addEventListener("click", () => {
    const course = getCourseDay(state.currentDay);
    const task = course.tasks.find((item) => item.id === timerStart.dataset.taskId) || course.tasks[0];
    startTimer(task);
  });
  const timerPause = document.querySelector("#timerPause");
  if (timerPause) timerPause.addEventListener("click", pauseTimer);
  const timerReset = document.querySelector("#timerReset");
  if (timerReset) timerReset.addEventListener("click", resetTimer);
  const timerFinish = document.querySelector("#timerFinish");
  if (timerFinish) timerFinish.addEventListener("click", finishTimer);
  const copyAiPrompt = document.querySelector("#copyAiPrompt");
  if (copyAiPrompt) copyAiPrompt.addEventListener("click", () => copyText(getDailySupport(getCourseDay(state.currentDay)).aiPrompt, "AI测试提示已复制"));
  const copyTodayPack = document.querySelector("#copyTodayPack");
  if (copyTodayPack) copyTodayPack.addEventListener("click", () => copyText(todayPortableText(), "今天学习包已复制"));
  const copyAiPromptPage = document.querySelector("#copyAiPromptPage");
  if (copyAiPromptPage) copyAiPromptPage.addEventListener("click", () => copyText(getDailySupport(getCourseDay(state.currentDay)).aiPrompt, "AI测试提示已复制"));
  document.querySelectorAll("[data-copy-ai]").forEach((el) => el.addEventListener("click", () => copyText(el.dataset.copyAi, "训练提示已复制")));
  const repeatThree = document.querySelector("#repeatThree");
  if (repeatThree) repeatThree.addEventListener("click", () => {
    const { english } = getPlayerSentence();
    const rate = playerState().rate;
    [0, 1800, 3600].forEach((delay) => setTimeout(() => speakEnglish(english, rate), delay));
  });
  const toggleEnglish = document.querySelector("#toggleEnglish");
  if (toggleEnglish) toggleEnglish.addEventListener("click", () => {
    const player = playerState();
    player.hideEnglish = !player.hideEnglish;
    saveState();
    render();
  });
  const toggleChinese = document.querySelector("#toggleChinese");
  if (toggleChinese) toggleChinese.addEventListener("click", () => {
    const player = playerState();
    player.hideChinese = !player.hideChinese;
    saveState();
    render();
  });
  const cycleRate = document.querySelector("#cycleRate");
  if (cycleRate) cycleRate.addEventListener("click", () => {
    const player = playerState();
    const rates = [0.7, 0.82, 1, 1.15];
    const current = rates.findIndex((rate) => Math.abs(rate - Number(player.rate || 0.82)) < 0.01);
    player.rate = rates[(current + 1) % rates.length];
    saveState();
    render();
  });
  const dictationBox = document.querySelector("#dictationBox");
  if (dictationBox) dictationBox.addEventListener("input", () => {
    playerState().dictation = dictationBox.value;
    saveState();
  });
  const checkDictation = document.querySelector("#checkDictation");
  if (checkDictation) checkDictation.addEventListener("click", () => {
    playerState().dictation = document.querySelector("#dictationBox").value;
    saveState();
    render();
  });
  const clearDictation = document.querySelector("#clearDictation");
  if (clearDictation) clearDictation.addEventListener("click", () => {
    playerState().dictation = "";
    saveState();
    render();
  });
  const addSentenceWords = document.querySelector("#addSentenceWords");
  if (addSentenceWords) addSentenceWords.addEventListener("click", () => {
    const { english } = getPlayerSentence();
    const count = addWordsFromText(english);
    alert(`已加入 ${count} 个关键词`);
    render();
  });
  const copySentenceAi = document.querySelector("#copySentenceAi");
  if (copySentenceAi) copySentenceAi.addEventListener("click", () => {
    const sentence = getPlayerSentence();
    copyText(`请用简单中文解释这句英文，告诉我什么时候用，并给3个美国生活例句：\n${sentence.english}`, "这句AI解释提示已复制");
  });
  document.querySelectorAll("[data-workout]").forEach((el) => el.addEventListener("click", () => {
    const log = getTodayLog();
    log.workout.includes(el.dataset.workout)
      ? log.workout = log.workout.filter((item) => item !== el.dataset.workout)
      : log.workout.push(el.dataset.workout);
    saveState();
    render();
  }));
  document.querySelectorAll("[data-expense]").forEach((el) => el.addEventListener("click", () => {
    const log = getTodayLog();
    log.expenses.unshift({ id: `${Date.now()}`, amount: Number(el.dataset.expense), note: el.dataset.note, createdAt: new Date().toISOString() });
    saveState();
    render();
  }));
  const addExpense = document.querySelector("#addExpense");
  if (addExpense) addExpense.addEventListener("click", () => {
    const amount = Number(document.querySelector("#expenseAmount").value || 0);
    const note = document.querySelector("#expenseNote").value.trim() || "spending";
    if (!amount) {
      alert("先输入金额");
      return;
    }
    getTodayLog().expenses.unshift({ id: `${Date.now()}`, amount, note, createdAt: new Date().toISOString() });
    saveState();
    render();
  });
  document.querySelectorAll("[data-journal-line]").forEach((el) => el.addEventListener("click", () => {
    const box = document.querySelector("#journal");
    box.value = `${box.value ? `${box.value}\n` : ""}${el.dataset.journalLine} `;
    box.focus();
  }));
  const saveJournal = document.querySelector("#saveJournal");
  if (saveJournal) saveJournal.addEventListener("click", () => {
    getTodayLog().journal = document.querySelector("#journal").value;
    saveState();
    alert("日记已保存");
  });
  const templateJournal = document.querySelector("#templateJournal");
  if (templateJournal) templateJournal.addEventListener("click", () => {
    const box = document.querySelector("#journal");
    box.value = `${box.value ? `${box.value}\n` : ""}今天完成：\n身体状态：\n明天最重要一件事：`;
    box.focus();
  });
  const prevDay = document.querySelector("#prevDay");
  if (prevDay) prevDay.addEventListener("click", () => { state.currentDay = Math.max(1, state.currentDay - 1); saveState(); render(); });
  const nextDay = document.querySelector("#nextDay");
  if (nextDay) nextDay.addEventListener("click", () => { state.currentDay = Math.min(334, state.currentDay + 1); saveState(); render(); });
  const copyBackup = document.querySelector("#copyBackup");
  if (copyBackup) copyBackup.addEventListener("click", () => { exportBackup(); alert("备份已复制"); });
  const restoreBackup = document.querySelector("#restoreBackup");
  if (restoreBackup) restoreBackup.addEventListener("click", () => {
    try {
      importBackup(document.querySelector("#backupText").value);
      alert("恢复成功");
      render();
    } catch {
      alert("恢复失败，备份文字不对。");
    }
  });
  const jumpButton = document.querySelector("#jumpButton");
  if (jumpButton) jumpButton.addEventListener("click", () => {
    state.currentDay = Math.max(1, Math.min(334, Number(document.querySelector("#jumpDay").value) || 1));
    saveState();
    render();
  });
  const clearLocal = document.querySelector("#clearLocal");
  if (clearLocal) clearLocal.addEventListener("click", () => {
    if (confirm("确定清空本网页数据？先确认已经复制备份。")) {
      localStorage.removeItem(KEY);
      state = loadState();
      render();
    }
  });

  const githubToken = document.querySelector("#githubToken");
  if (githubToken) githubToken.addEventListener("input", () => {
    getSyncState().token = githubToken.value.trim();
    saveState({ markDirty: false, autoSync: false });
  });
  const gistId = document.querySelector("#gistId");
  if (gistId) gistId.addEventListener("input", () => {
    getSyncState().gistId = gistId.value.trim();
    saveState({ markDirty: false, autoSync: false });
  });
  const copyGistId = document.querySelector("#copyGistId");
  if (copyGistId) copyGistId.addEventListener("click", async () => {
    const id = getSyncState().gistId || "";
    if (!id) return;
    await navigator.clipboard?.writeText(id);
    alert("Gist ID 已复制");
  });
  const autoSync = document.querySelector("#autoSync");
  if (autoSync) autoSync.addEventListener("change", () => {
    getSyncState().auto = autoSync.checked;
    saveState({ markDirty: false, autoSync: false });
    if (autoSync.checked) autoSyncOnStart();
  });
  const setSyncStatus = (text) => {
    const target = document.querySelector("#syncStatus");
    if (target) target.textContent = text;
  };
  const createSync = document.querySelector("#createSync");
  if (createSync) createSync.addEventListener("click", async () => {
    try {
      setSyncStatus("正在创建云同步...");
      const id = await createCloudSync();
      await navigator.clipboard?.writeText(id);
      render();
      alert(`云同步已创建，Gist ID 已复制：${id}`);
    } catch (error) {
      setSyncStatus(`创建失败：${error.message}`);
    }
  });
  const uploadSync = document.querySelector("#uploadSync");
  if (uploadSync) uploadSync.addEventListener("click", async () => {
    try {
      setSyncStatus("正在上传本机数据...");
      const id = await uploadCloudSync();
      render();
      alert(`已上传到云端。Gist ID: ${id}`);
    } catch (error) {
      setSyncStatus(`上传失败：${error.message}`);
    }
  });
  const downloadSync = document.querySelector("#downloadSync");
  if (downloadSync) downloadSync.addEventListener("click", async () => {
    if (!confirm("下载云端数据会覆盖本机当前数据。确定继续？")) return;
    try {
      setSyncStatus("正在下载云端数据...");
      await downloadCloudSync();
      render();
      alert("已下载云端数据。");
    } catch (error) {
      setSyncStatus(`下载失败：${error.message}`);
    }
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
setTimeout(autoSyncOnStart, 800);
