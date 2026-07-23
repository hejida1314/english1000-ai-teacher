const KEY = "english1000.life.web.v1";

const APP_VERSION = "2026.07.22-daily-auto-sync-1";

const phases = [
  { start: 1, end: 34, level: "Level 1 / A1", phase: "Dreaming English Beginner", resource: "Dreaming English Beginner", url: "https://www.youtube.com/results?search_query=Dreaming+English+Beginner" },
  { start: 35, end: 84, level: "Level 2 / A1+", phase: "Dreaming English Intermediate", resource: "Dreaming English Intermediate", url: "https://www.youtube.com/results?search_query=Dreaming+English+Intermediate" },
  { start: 85, end: 150, level: "Level 3 / A2", phase: "Bluey Season 1", resource: "Bluey Season 1", url: "https://www.disneyplus.com/search?q=Bluey" },
  { start: 151, end: 205, level: "Level 4 / A2+", phase: "Peppa Pig", resource: "Peppa Pig", url: "https://www.youtube.com/results?search_query=Peppa+Pig+English" },
  { start: 206, end: 275, level: "Level 5 / B1", phase: "TED-Ed", resource: "TED-Ed easy topics", url: "https://ed.ted.com/lessons" },
  { start: 276, end: 334, level: "Level 6 / B1+", phase: "Modern Family", resource: "Modern Family selected episodes", url: "https://www.hulu.com/search?q=Modern+Family" }
];

const grammarLessons = [
  { title: "be 动词：am / is / are", pattern: "I am / You are / He is", examples: ["I am tired.", "You are right.", "He is at work."], task: "用 I am / You are / He is 各说一句今天的事。" },
  { title: "一般现在时：每天、经常发生", pattern: "I work / She works", examples: ["I work today.", "She watches English.", "He likes this video."], task: "说3句你平时会做的事。" },
  { title: "一般过去时：已经发生", pattern: "I worked / I watched / I went", examples: ["I watched a video.", "I went home.", "I studied English."], task: "用过去式说昨天发生的3件事。" },
  { title: "现在进行时：正在发生", pattern: "I am watching / She is talking", examples: ["I am watching YouTube.", "She is talking slowly.", "They are eating."], task: "描述你现在正在做什么。" },
  { title: "一般将来：准备、将要", pattern: "I will / I am going to", examples: ["I will study tonight.", "I am going to call Kia.", "I will do squats."], task: "说3句你明天要做的事。" },
  { title: "have / has：有、吃、经历", pattern: "I have / He has", examples: ["I have a question.", "She has time.", "I had lunch."], task: "用 have 说3句生活句。" },
  { title: "want to：想做某事", pattern: "I want to + 动词", examples: ["I want to learn English.", "I want to sleep.", "I want to tell a story."], task: "说3句你想做的事。" },
  { title: "need to：需要做某事", pattern: "I need to + 动词", examples: ["I need to make an appointment.", "I need to practice.", "I need to pay."], task: "说3句你今天需要做的事。" },
  { title: "can / can't：能不能", pattern: "I can / I can't", examples: ["I can understand this.", "I can't hear it clearly.", "Can you repeat that?"], task: "说2句能做的事，1句不能做的事。" },
  { title: "should：应该", pattern: "I should + 动词", examples: ["I should sleep earlier.", "You should repeat it.", "I should not rush."], task: "给自己3个建议。" },
  { title: "there is / there are：有", pattern: "There is one / There are many", examples: ["There is a problem.", "There are many words.", "There is a video."], task: "描述你身边有的3样东西。" },
  { title: "this / that / these / those：这个那个", pattern: "this is / that is / these are", examples: ["This is useful.", "That is hard.", "These words are common."], task: "指着东西说3句。" },
  { title: "a / an / the：一个 vs 特指", pattern: "a car / an apple / the car", examples: ["I have a car.", "This is an appointment.", "The video is short."], task: "找今天视频里3个 a/an/the。" },
  { title: "复数：一个变多个", pattern: "word / words", examples: ["I learned ten words.", "These sentences are useful.", "I have two questions."], task: "说5个复数名词。" },
  { title: "比较级：更...", pattern: "longer / better / easier", examples: ["This is way longer.", "English is getting better.", "This lesson is easier."], task: "用 better / longer / easier 各说一句。" },
  { title: "because：因为", pattern: "I do it because...", examples: ["I study because I need English.", "I am tired because I worked.", "I like it because it is useful."], task: "用 because 解释3件事。" },
  { title: "and / but / so：连接句子", pattern: "A and B / A but B / A so B", examples: ["I am tired, but I study.", "I work and walk.", "I was hungry, so I ate."], task: "用 and、but、so 各造一句。" },
  { title: "疑问句：Do you...?", pattern: "Do you want...? / Does he...?", examples: ["Do you understand?", "Do you want coffee?", "Does she speak English?"], task: "问自己3个 Do you 问题。" },
  { title: "疑问词：what / where / when", pattern: "What is...? / Where is...?", examples: ["What does it mean?", "Where can I find it?", "When do you open?"], task: "写3个你在美国会问的问题。" },
  { title: "how long：多久", pattern: "How long have you...?", examples: ["How long have you studied English?", "How long does it take?", "How long is the video?"], task: "用 how long 问3句。" },
  { title: "would like：礼貌想要", pattern: "I'd like to...", examples: ["I'd like to schedule an appointment.", "I'd like some water.", "I'd like to ask a question."], task: "练3句去店里能用的话。" },
  { title: "could you：礼貌请求", pattern: "Could you + 动词?", examples: ["Could you repeat that?", "Could you say it slowly?", "Could you help me?"], task: "练3句听不懂时能用的话。" },
  { title: "have to：不得不、必须", pattern: "I have to + 动词", examples: ["I have to work.", "I have to pay.", "I have to leave now."], task: "说3句今天必须做的事。" },
  { title: "before / after：之前之后", pattern: "before work / after dinner", examples: ["I study before work.", "I walk after dinner.", "I watched it before bed."], task: "用 before / after 各说两句。" },
  { title: "in / on / at：时间地点", pattern: "in Alabama / on Monday / at 8", examples: ["I live in Alabama.", "I work on Monday.", "I start at eight."], task: "用 in、on、at 各说一句。" },
  { title: "too / also / as well：也", pattern: "I also... / me too / as well", examples: ["I study English too.", "I also need practice.", "Hand gestures as well."], task: "用 also / too / as well 各说一句。" },
  { title: "现在完成：have done", pattern: "I have watched / I have learned", examples: ["I have watched this video.", "I have learned ten words.", "I have done my workout."], task: "说3句今天已经完成的事。" },
  { title: "复盘日：只找语法，不刷题", pattern: "看见就认识", examples: ["找 be 动词。", "找过去式。", "找 because。"], task: "回看今天视频，找3个你认识的语法点。" }
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

const verifiedWordHints = {
  the: ["这个；那个；特指某个东西", "The car is ready."],
  be: ["是；成为；存在", "I want to be better."],
  of: ["...的；属于", "This is a cup of water."],
  and: ["和；并且", "I study English and exercise."],
  in: ["在...里面；在...期间", "I live in the United States."],
  to: ["到；向；为了", "I go to work."],
  have: ["有；吃；经历", "I have time today."],
  it: ["它；这件事", "It is important."],
  he: ["他", "He is busy today."],
  for: ["为了；给；持续", "This lesson is for me."],
  that: ["那个；那件事", "That is a good idea."],
  not: ["不；没有", "I am not tired."],
  you: ["你；你们", "You can do this."],
  with: ["和...一起；用", "I study with my phone."],
  on: ["在...上；开启；关于", "The video is on YouTube."],
  do: ["做；完成", "I do one lesson today."],
  they: ["他们；它们", "They speak English."],
  say: ["说；表示", "Could you say that again?"],
  by: ["通过；被；在旁边", "I pay by card."],
  this: ["这个；这件事", "This word is useful."],
  she: ["她", "She speaks slowly."],
  at: ["在；向；以某时间", "I start at eight."],
  but: ["但是", "I am tired, but I continue."],
  we: ["我们", "We can practice today."],
  his: ["他的", "His car is new."],
  from: ["从；来自", "I am from China."],
  which: ["哪一个；哪个", "Which one is better?"],
  or: ["或者；还是", "Tea or coffee?"],
  will: ["将会；愿意", "I will study tonight."],
  as: ["作为；像；当...时", "I work as usual."],
  what: ["什么", "What does it mean?"],
  would: ["会；想要；用于礼貌表达", "I would like some water."],
  go: ["去；走", "I go home after work."],
  can: ["能；可以", "I can understand this."],
  their: ["他们的", "Their house is near here."],
  there: ["那里；有", "There is a problem."],
  who: ["谁", "Who is calling?"],
  all: ["全部；所有", "All the tasks are done."],
  get: ["得到；到达；变得", "I get home at six."],
  if: ["如果；是否", "If possible, I want tomorrow."],
  her: ["她；她的", "I helped her today."],
  make: ["做；制造；让", "I make dinner at home."],
  my: ["我的", "My English is improving."],
  one: ["一；一个", "I watched one video."],
  about: ["关于；大约", "This lesson is about work."],
  see: ["看见；明白", "I see the word again."],
  know: ["知道；认识", "I know this word."],
  so: ["所以；这么", "I was tired, so I rested."],
  up: ["向上；起来；完成", "I wake up early."],
  time: ["时间；次数", "I need more time."],
  take: ["拿；花费；乘坐", "It takes ten minutes."],
  some: ["一些", "I need some water."],
  when: ["什么时候；当...时", "When can I come in?"],
  year: ["年", "This is my English year."],
  could: ["可以；能够；用于礼貌请求", "Could you repeat that?"],
  think: ["想；认为", "I think this is useful."],
  into: ["进入；变成", "Put it into the bag."],
  its: ["它的", "The app saves its data."],
  them: ["他们；它们", "I can understand them."],
  then: ["然后；那时", "I listen, then repeat."],
  me: ["我；给我", "Please help me."],
  out: ["出去；外面", "I go out for work."],
  people: ["人们", "People speak fast."],
  come: ["来；到来", "Can you come tomorrow?"],
  just: ["只是；刚刚", "I just need regular maintenance."],
  your: ["你的；你们的", "What is your name?"],
  now: ["现在", "I am studying now."],
  no: ["不；没有", "No rice, please."],
  him: ["他；给他", "I called him today."],
  other: ["其他的；另一个", "Do you have another time?"],
  only: ["只；仅仅", "I only need an oil change."],
  give: ["给", "Can you give me a receipt?"],
  good: ["好的；不错的", "Today is a good day."],
  than: ["比", "This is easier than yesterday."],
  like: ["喜欢；像", "I like this lesson."],
  more: ["更多；更", "I need more practice."],
  how: ["怎样；多么", "How do I say this?"],
  also: ["也；而且", "I also practiced speaking."],
  any: ["任何；一些", "Do you have any questions?"],
  our: ["我们的", "Our plan is simple."],
  first: ["第一；首先", "First, I listen."],
  very: ["非常", "This is very useful."],
  new: ["新的", "I learned a new word."],
  look: ["看；看起来", "Look at the picture."],
  may: ["可能；可以", "May I ask a question?"],
  want: ["想要", "I want to learn useful English."],
  way: ["方式；道路", "This is a good way."],
  well: ["好地；健康的", "I did well today."],
  should: ["应该", "I should review today."],
  use: ["使用；用途", "I use English at work."],
  because: ["因为", "I study because I live here."],
  day: ["天；日子", "Today is Day 1."],
  man: ["男人；人", "The man speaks slowly."],
  find: ["找到；发现", "Where can I find olive oil?"],
  here: ["这里", "I am here for my appointment."],
  after: ["在...之后", "I study after work."],
  thing: ["事情；东西", "This thing is useful."],
  between: ["在...之间", "I study between work and dinner."],
  many: ["许多", "I know many words."],
  down: ["向下；下来；记录下来", "Write it down."],
  today: ["今天", "Today I studied English."],
  appointment: ["预约", "I'd like to schedule an appointment."],
  maintenance: ["保养；维护", "I need regular maintenance for my car."],
  insurance: ["保险", "I need to bring my insurance card."],
  clinic: ["诊所", "I need to call the clinic."],
  document: ["文件；材料", "What documents do I need?"],
  problem: ["问题", "There is a problem."],
  repeat: ["重复；再说一遍", "Could you repeat that?"],
  confirm: ["确认", "Let me confirm the time."],
  oil: ["油；机油", "I need an oil change."],
  tire: ["轮胎", "Do I need a tire rotation?"],
  service: ["服务；保养", "I need service for my car."],
  warranty: ["保修", "Is it covered under warranty?"],
  available: ["可用的；有空的", "Do you have anything available today?"],
  license: ["驾照；许可证", "I'm here for my driver's license."],
  deposit: ["押金；存款", "I paid the deposit."],
  account: ["账户", "I'd like to open an account."],
  fee: ["费用", "Is there a fee?"],
  balance: ["余额；平衡", "What is my balance?"],
  grocery: ["食品杂货", "I bought groceries."],
  receipt: ["收据", "Can I get a receipt?"],
  aisle: ["过道；货架通道", "Which aisle is it in?"],
  card: ["卡", "Can I pay by card?"],
  cash: ["现金", "I paid in cash."]
};

const badMeaningMarkers = [
  "DOS", "批处理", "信息论", "输入终端", "智能终端", "内捕获", "地址转换器", "异常传输",
  "自动订票", "后端", "总线允许", "自治系统", "高级系统", "辅助存储器", "作废字符"
];

function cleanMeaningCandidate(meaning) {
  const raw = String(meaning || "").trim();
  if (!raw) return "待补中文";
  const parts = raw.split(/[；;]/).map((part) => part.trim()).filter(Boolean);
  const kept = parts.filter((part) => !badMeaningMarkers.some((marker) => part.includes(marker)));
  const clean = (kept[0] || parts[0] || raw).replace(/\s+/g, " ").trim();
  return clean.length > 42 ? `${clean.slice(0, 42)}...` : clean;
}

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
  const key = normalizeWord(String(word || ""));
  if (verifiedWordHints[key]) return [...verifiedWordHints[key], "验证核心"];
  const webHint = window.BASIC_WORD_HINTS && window.BASIC_WORD_HINTS[key];
  if (webHint) return [cleanMeaningCandidate(webHint.meaning), webHint.sentence, "高频候选"];
  if (starterHints[key]) return [...starterHints[key], "生活常用"];
  return ["待补中文", `I learned the word "${key || word}" today.`, "自定义"];
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
  customSentences: {},
  resourceLinks: {},
  aiAnswers: {},
  language: "zh",
  wordQuery: "",
  words: [],
  lifeLogs: {},
  quick: "",
  sync: {
    token: "",
    gistId: "",
    lastSyncAt: "",
    lastSyncDevice: "",
    lastCloudUpdatedAt: "",
    lastDailyUploadDate: "",
    lastAutoUploadAt: "",
    lastAutoUploadError: "",
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

function localDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    lastDailyUploadDate: "",
    lastAutoUploadAt: "",
    lastAutoUploadError: "",
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

function getGrammarLesson(day = state.currentDay) {
  return grammarLessons[(Math.max(1, day) - 1) % grammarLessons.length];
}

function getCourseDay(day) {
  const phase = getPhase(day);
  const isReview = day % 7 === 0;
  const grammar = getGrammarLesson(day);
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
        ["grammar", `语法：${grammar.title}`, 15, `${grammar.pattern}。${grammar.task}`],
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

function lifeTotals(days = 7) {
  const cursor = new Date();
  let spending = 0;
  let workouts = 0;
  let journals = 0;
  for (let i = 0; i < days; i += 1) {
    const key = cursor.toISOString().slice(0, 10);
    const log = state.lifeLogs?.[key];
    if (log) {
      spending += (log.expenses || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);
      workouts += (log.workout || []).length;
      if (String(log.journal || "").trim()) journals += 1;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return { spending, workouts, journals };
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
  const elapsed = Math.max(0, Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000));
  return banked + Math.min(elapsed, 4 * 3600);
}

function totalStudySecondsToday() {
  const fromSeconds = Number(state.studySeconds?.[todayKey()] || 0);
  const fromOldMinutes = Number(state.studyMinutes?.[todayKey()] || 0) * 60;
  return Math.max(fromSeconds, fromOldMinutes) + activeTimerSeconds();
}

function totalStudySecondsAll() {
  const secondsMap = state.studySeconds || {};
  const minuteMap = state.studyMinutes || {};
  const keys = new Set([...Object.keys(secondsMap), ...Object.keys(minuteMap)]);
  return Array.from(keys).reduce((sum, key) => {
    const seconds = Number(secondsMap[key] || 0);
    const oldSeconds = Number(minuteMap[key] || 0) * 60;
    return sum + Math.max(seconds, oldSeconds);
  }, 0) + activeTimerSeconds();
}

function studyStreakDays() {
  const secondsMap = state.studySeconds || {};
  const minuteMap = state.studyMinutes || {};
  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < 366; i += 1) {
    const key = cursor.toISOString().slice(0, 10);
    const seconds = Math.max(Number(secondsMap[key] || 0), Number(minuteMap[key] || 0) * 60);
    if (seconds < 60) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
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
  const grammar = getGrammarLesson(course.day);
  const subtitleRule = course.day < 85
    ? "第一遍不看字幕，第二遍英文字幕。不要开中文字幕。"
    : course.day < 206
      ? "英文字幕为主，听懂的片段关字幕复听。"
      : "先英文字幕，再挑 5 分钟无字幕复听。";
  return {
    subtitleRule,
    earlyFinish: "今天提前完成，不直接冲下一天。先复习到期词、跟读今日句子、补一段英文日记。连续性比贪多重要。",
    grammar,
    words,
    phrases: dailyPhrases.items,
    aiPrompt: `我是 Jacob，正在执行 English1000 Life。今天是 Day ${course.day}，阶段是 ${course.phase.phase}，材料是 ${course.mainTitle}。今日语法是：${grammar.title}（${grammar.pattern}）。请用简单英语测试我：1）问我今天视频大意；2）抽查这10个词：${words.join(", ")}；3）让我跟读这几句：${dailyPhrases.items.join(" / ")}；4）用今日语法让我造3句；5）最后用中文告诉我明天是否该升级、保持、还是降难度。`
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
    `今日语法：${support.grammar.title}`,
    `结构：${support.grammar.pattern}`,
    `例句：${support.grammar.examples.join(" / ")}`,
    `任务：${support.grammar.task}`,
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
      source: hint[2],
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

function addBaseWordsBalanced() {
  const source = Object.keys(window.BASIC_WORD_HINTS || starterHints).slice(0, 3500);
  const existing = new Set(state.words.map((item) => item.word));
  const fresh = [];
  source.forEach((word, index) => {
    if (existing.has(word)) return;
    const hint = lookupWordHint(word);
    const dayOffset = Math.floor(index / 20);
    fresh.push({
      id: `${Date.now()}-${word}`,
      word,
      meaning: hint[0],
      sentence: hint[1],
      source: hint[2],
      ease: 2,
      createdAt: new Date().toISOString(),
      dueAt: new Date(Date.now() + dayOffset * 86400000).toISOString()
    });
    existing.add(word);
  });
  state.words = [...fresh, ...state.words];
  saveState();
  return fresh.length;
}

function spreadWordReviews() {
  const ordered = [...state.words].sort((a, b) => (a.word || "").localeCompare(b.word || ""));
  state.words = ordered.map((word, index) => ({
    ...word,
    dueAt: new Date(Date.now() + Math.floor(index / 20) * 86400000).toISOString()
  }));
  saveState();
  return state.words.length;
}

function repairLocalData() {
  const seen = new Set();
  state.words = (state.words || []).filter((word) => {
    const key = normalizeWord(word.word || "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    const hint = lookupWordHint(key);
    word.word = key;
    if (!word.meaning || word.meaning === "待补中文" || hint[2] === "验证核心") word.meaning = hint[0];
    if (badMeaningMarkers.some((marker) => String(word.meaning || "").includes(marker))) word.meaning = cleanMeaningCandidate(word.meaning);
    if (!word.sentence) word.sentence = hint[1];
    if (!word.source || hint[2] === "验证核心") word.source = hint[2];
    if (!word.createdAt) word.createdAt = new Date().toISOString();
    if (!word.dueAt) word.dueAt = new Date().toISOString();
    return true;
  });
  if (!state.completedTasks || typeof state.completedTasks !== "object") state.completedTasks = {};
  if (!state.lifeLogs || typeof state.lifeLogs !== "object") state.lifeLogs = {};
  if (!state.studySeconds || typeof state.studySeconds !== "object") state.studySeconds = {};
  if (!state.resourceLinks || typeof state.resourceLinks !== "object") state.resourceLinks = {};
  if (!state.aiAnswers || typeof state.aiAnswers !== "object") state.aiAnswers = {};
  saveState();
  return state.words.length;
}

function renderWordImportPreview(text) {
  const words = extractWords(text).slice(0, 24);
  if (!words.length) {
    return `<p class="install-tip">输入英文后，这里会先显示中文预览。</p>`;
  }
  const existing = new Set((state.words || []).map((item) => normalizeWord(item.word || "")));
  return `
    <div class="preview-grid">
      ${words.map((word) => {
        const hint = lookupWordHint(word);
        const known = hint[0] !== "待补中文";
        const already = existing.has(word);
        const status = already ? "已在生词本" : known ? "可加入" : "词库未收录，也可先保存";
        const klass = already ? "exists" : known ? "" : "unknown";
        return `
          <span class="preview-chip ${klass}">
            <strong>${escapeHtml(word)}</strong>
            <em>${escapeHtml(hint[0])}</em>
            <small>${status}</small>
          </span>
        `;
      }).join("")}
    </div>
  `;
}

function wordImportSummary(text) {
  const words = extractWords(text);
  const existing = new Set((state.words || []).map((item) => normalizeWord(item.word || "")));
  const newWords = words.filter((word) => !existing.has(word));
  const already = words.filter((word) => existing.has(word));
  return { total: words.length, newWords: newWords.length, already: already.length };
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

function isEnglishUi() {
  return state.language === "en";
}

function ui(zh, en) {
  return isEnglishUi() ? en : zh;
}

function customSentenceKey(day = state.currentDay) {
  return `d${day}`;
}

function resourceKey(day = state.currentDay) {
  return `d${day}`;
}

function getResourceUrl(course = getCourseDay(state.currentDay)) {
  return state.resourceLinks?.[resourceKey(course.day)] || course.phase.url;
}

function parseSentences(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((item) => item.trim())
    .filter((item) => /[a-zA-Z]/.test(item) && item.length >= 6)
    .slice(0, 80);
}

function getPlayerSentences(day = state.currentDay) {
  const custom = state.customSentences?.[customSentenceKey(day)];
  return custom?.length ? custom : getDailyPhrases(day).items;
}

function getPlayerSentence() {
  const phrases = getPlayerSentences();
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

function aiAnswerKey(day = state.currentDay) {
  return `d${day}`;
}

function getAiAnswers(day = state.currentDay) {
  if (!state.aiAnswers) state.aiAnswers = {};
  if (!state.aiAnswers[aiAnswerKey(day)]) state.aiAnswers[aiAnswerKey(day)] = {};
  return state.aiAnswers[aiAnswerKey(day)];
}

function getAiQuestions(course = getCourseDay(state.currentDay), support = getDailySupport(course)) {
  return [
    {
      id: "summary",
      title: "视频大意",
      question: `What is ${course.mainTitle} mainly about?`
    },
    {
      id: "words",
      title: "今日10词",
      question: `Use three of these words in simple sentences: ${support.words.join(", ")}.`
    },
    {
      id: "phrases",
      title: "今日句子",
      question: `Pick one useful sentence from today and explain when you can use it.`
    },
    {
      id: "life",
      title: "真实生活",
      question: "What did you do today? Answer in 3 simple English sentences."
    }
  ];
}

function aiReviewPrompt(course = getCourseDay(state.currentDay), support = getDailySupport(course)) {
  const answers = getAiAnswers(course.day);
  const questions = getAiQuestions(course, support);
  return [
    `我是 Jacob，正在执行 English1000 Life。今天是 Day ${course.day}，阶段是 ${course.phase.phase}，材料是 ${course.mainTitle}。`,
    "请你当我的英语老师，按下面要求纠正我：",
    "1. 先用中文告诉我每个回答哪里不自然。",
    "2. 再给我一个更简单、更自然的英文版本。",
    "3. 最后问我一个追问，逼我继续用英文回答。",
    "",
    "今日问题和我的回答：",
    ...questions.map((item, index) => [
      `${index + 1}. ${item.question}`,
      `我的回答：${answers[item.id] || "（还没写）"}`
    ].join("\n")),
    "",
    `今日10词：${support.words.join(", ")}`,
    "今日句子：",
    ...support.phrases.map((item) => `- ${item}`)
  ].join("\n");
}

function sentenceSimilarity(a, b) {
  const left = extractWords(a);
  const right = new Set(extractWords(b));
  if (!left.length) return 0;
  const matched = left.filter((word) => right.has(word)).length;
  return Math.round((matched / left.length) * 100);
}

function dictationAnalysis(target, answer) {
  const targetWords = extractWords(target);
  const answerWords = extractWords(answer);
  const targetSet = new Set(targetWords);
  const answerSet = new Set(answerWords);
  const matched = targetWords.filter((word) => answerSet.has(word));
  const missing = targetWords.filter((word) => !answerSet.has(word));
  const extra = answerWords.filter((word) => !targetSet.has(word));
  const score = targetWords.length ? Math.round((matched.length / targetWords.length) * 100) : 0;
  return { targetWords, answerWords, matched, missing, extra, score };
}

function renderDictationComparison(sentence, answer) {
  if (!String(answer || "").trim()) {
    return `<p class="install-tip">先听两遍，再写。不会写完整也没事，写关键词也算训练。</p>`;
  }
  const result = dictationAnalysis(sentence, answer);
  return `
    <div class="compare-box">
      <p class="install-tip"><strong>匹配度约 ${result.score}%。</strong> 先看漏词，再回去听一遍。</p>
      <div class="compare-group">
        <strong>听对的词</strong>
        <div class="pill-row">${(result.matched.length ? result.matched : ["暂无"]).map((word) => `<span class="word-mini good">${escapeHtml(word)}</span>`).join("")}</div>
      </div>
      <div class="compare-group">
        <strong>漏掉的词</strong>
        <div class="pill-row">${(result.missing.length ? result.missing : ["没有明显漏词"]).map((word) => `<span class="word-mini bad">${escapeHtml(word)}</span>`).join("")}</div>
      </div>
      ${result.extra.length ? `
        <div class="compare-group">
          <strong>多写的词</strong>
          <div class="pill-row">${result.extra.map((word) => `<span class="word-mini warn">${escapeHtml(word)}</span>`).join("")}</div>
        </div>
      ` : ""}
      <details>
        <summary>查看原句</summary>
        <p class="body">${escapeHtml(sentence)}</p>
      </details>
    </div>
  `;
}

function parseTimeMinutes(text) {
  const raw = String(text || "").trim();
  const hour = raw.match(/(\d+(?:\.\d+)?)\s*(小时|个小时|hour|hours|hr|hrs|h)\b/i);
  if (hour) return Math.round(Number(hour[1]) * 60);
  const minute = raw.match(/(\d+(?:\.\d+)?)\s*(分钟|分|min|mins|minute|minutes|m)\b/i);
  if (minute) return Math.round(Number(minute[1]));
  return 0;
}

function looksLikeExpense(text) {
  const raw = String(text || "").toLowerCase();
  if (/(\d+)\s*(分钟|分|min|minute|hour|小时|个小时)/i.test(raw)) return false;
  return /(\$|usd|花了|花费|消费|spent|spend|lunch|coffee|gas|grocery|parking|receipt|meal|food|beef|cost)/i.test(raw);
}

function looksLikeWorkout(text) {
  return /(深蹲|俯卧撑|拉伸|走路|步行|训练|健身|平板|卷腹|弓步|squat|pushup|push-up|stretch|walk|plank|workout)/i.test(text);
}

function addWorkoutNote(text) {
  const log = getTodayLog();
  const item = String(text || "").trim();
  if (item && !log.workout.includes(item)) log.workout.push(item);
  saveState();
}

function smartSave(text) {
  const trimmed = text.trim();
  if (!trimmed) return "先输入内容。";
  const minutes = parseTimeMinutes(trimmed);
  if (minutes > 0 && !looksLikeExpense(trimmed)) {
    addStudySeconds(minutes * 60, { renderAfter: false });
    return `已补记学习 ${minutes} 分钟`;
  }
  if (looksLikeWorkout(trimmed)) {
    addWorkoutNote(trimmed);
    return "已记录到健康训练。";
  }
  const amount = looksLikeExpense(trimmed) ? trimmed.match(/(?:\$|usd\s*)?\s*(\d+(?:\.\d{1,2})?)/i) : null;
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

function addStudySeconds(seconds, options = {}) {
  const { renderAfter = true } = options;
  const key = todayKey();
  if (!state.studySeconds) state.studySeconds = {};
  state.studySeconds[key] = (state.studySeconds[key] || 0) + Math.max(0, Math.round(seconds));
  state.studyMinutes[key] = Math.floor(state.studySeconds[key] / 60);
  saveState();
  if (renderAfter) render();
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

async function forceRefreshApp() {
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.update()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.includes("english1000-life")).map((key) => caches.delete(key)));
    }
  } catch {
    // Refresh should still continue even if a browser blocks cache access.
  }
  window.location.reload();
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

function rememberUploadSuccess(label) {
  const sync = getSyncState();
  const now = new Date().toISOString();
  sync.lastSyncAt = now;
  sync.lastSyncDevice = label;
  sync.lastCloudUpdatedAt = state.localUpdatedAt || now;
  sync.lastAutoUploadAt = now;
  sync.lastAutoUploadError = "";
  if (label.includes("daily")) sync.lastDailyUploadDate = localDayKey();
}

async function createCloudSync(label = "uploaded") {
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
  rememberUploadSuccess(label);
  saveState({ markDirty: false, autoSync: false });
  return gist.id;
}

async function uploadCloudSync(label = "uploaded") {
  const sync = getSyncState();
  if (!sync.gistId.trim()) return createCloudSync(label);
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
  rememberUploadSuccess(label);
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

function scheduleAutoUpload(delay = 3000, label = "auto uploaded") {
  if (!canCloudSync() || syncBusy) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    if (!canCloudSync() || syncBusy) return;
    try {
      syncBusy = true;
      await uploadCloudSync(label);
      updateSyncBadge("已自动同步");
    } catch (error) {
      getSyncState().lastAutoUploadError = error.message || "auto upload failed";
      saveState({ markDirty: false, autoSync: false });
      updateSyncBadge("自动同步失败，稍后再试");
    } finally {
      syncBusy = false;
    }
  }, delay);
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
      await uploadCloudSync("auto uploaded");
      updateSyncBadge("已自动上传本机最新数据");
    } else if (sync.lastDailyUploadDate !== localDayKey()) {
      await uploadCloudSync("daily auto uploaded");
      updateSyncBadge("今天已自动上传一次");
    } else {
      updateSyncBadge("本机和云端已经一致");
    }
  } catch (error) {
    getSyncState().lastAutoUploadError = error.message || "auto sync failed";
    saveState({ markDirty: false, autoSync: false });
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

function nextBestAction(course, log) {
  const percent = dayPercent(course);
  const minutes = totalStudyToday();
  const wordsDue = dueWords().length;
  const wordsDueToday = Math.min(wordsDue, 20);
  if (percent < 100) return ["继续英语主线", "先把今日任务做完，别去乱找新材料。", "today"];
  if (wordsDue > 0) return ["复习20个到期词", "词很多没关系，今天最多20个。", "words"];
  if (!log.workout.length) return ["做10分钟保底训练", "深蹲、俯卧撑、拉伸，完成就算赢。", "life"];
  if (!log.journal.trim()) return ["写5句日记", "用短句记录今天，不追求文采。", "life"];
  if (minutes < 180) return ["补一点精听", "提前完成不冲下一天，回精听复习句子。", "player"];
  return ["今天可以收工", "英语、单词、训练、日记都稳了。", "home"];
}

function renderHome() {
  const course = getCourseDay(state.currentDay);
  const log = getTodayLog();
  const percent = dayPercent(course);
  const wordsDue = dueWords().length;
  const wordsDueToday = Math.min(wordsDue, 20);
  const workoutDone = log.workout.length > 0;
  const journalDone = !!log.journal.trim();
  const [actionTitle, actionDetail, actionTab] = nextBestAction(course, log);
  const totalHours = Math.floor(totalStudySecondsAll() / 3600);
  const remainingHours = Math.max(0, 1000 - totalHours);
  const streak = studyStreakDays();
  const todayMinutes = totalStudyToday();
  const remainingToday = Math.max(0, 180 - todayMinutes);
  const todaySpending = log.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const closeout = [
    ["英语主线", percent >= 100, "today"],
    ["到期单词", wordsDue === 0, "words"],
    ["健康训练", workoutDone, "life"],
    ["今日记事", journalDone, "life"]
  ];
  const systems = [
    ["学习", percent >= 100 ? "已完成" : `${percent}%`, `还差 ${remainingToday} 分钟 / 今日复习 ${wordsDueToday} 词`, "today", percent >= 100],
    ["健康", workoutDone ? "已训练" : "待训练", workoutDone ? `${log.workout.length} 项完成` : "先做10分钟保底", "life", workoutDone],
    ["记录", journalDone ? "已记录" : "待记录", `$${todaySpending.toFixed(0)} / 日记${journalDone ? "已写" : "未写"}`, "life", journalDone]
  ];
  return `
    <section class="hero">
      <p class="kicker">English1000 Life</p>
      <h1>Day ${course.day}</h1>
      <p class="body">${course.phase.level} / ${course.phase.phase}</p>
      <h3>${course.mainTitle}</h3>
      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
      <p class="small">今日完成 ${percent}% / 已学 ${todayMinutes} 分钟 / 还差 ${remainingToday} 分钟 / 今日先复习 ${wordsDueToday} 词</p>
      <div class="button-row">
        <button class="primary" data-tab="today">一键继续今天</button>
        <button class="secondary" data-open="${escapeHtml(getResourceUrl(course))}">打开学习资源</button>
      </div>
    </section>
    <section class="card notice">
      <h2>下一步只做这个</h2>
      <p class="body"><strong>${actionTitle}</strong><br>${actionDetail}</p>
      <button class="primary full" data-tab="${actionTab}">去做这一项</button>
    </section>
    <section class="card">
      <h2>三大系统</h2>
      <p class="body">学习、健康、记录。每天只看这三个灯，不再到处找。</p>
      <div class="system-grid">
        ${systems.map(([label, value, detail, tab, done]) => `
          <button class="system-card ${done ? "done" : ""}" data-tab="${tab}">
            <span>${label}</span>
            <strong>${value}</strong>
            <em>${detail}</em>
          </button>
        `).join("")}
      </div>
    </section>
    <section class="card success">
      <h2>今日收工判断</h2>
      <p class="body">下面都变绿，今天就算稳了。</p>
      ${closeout.map(([label, done, tab]) => `
        <button class="row" data-tab="${tab}">
          <span class="check ${done ? "done" : ""}">${done ? "&#10003;" : ""}</span>
          <span class="row-main"><strong>${label}</strong></span>
          <span class="status ${done ? "done" : ""}">${done ? "已完成" : "待完成"}</span>
        </button>
      `).join("")}
    </section>
    <section class="card">
      <h2>万能速记</h2>
      <p class="body">单词、花费、日记都先扔这里，点智能保存。</p>
      <textarea id="quick" placeholder="appointment, maintenance / 45分钟英语 / $12 lunch / 今天练了深蹲">${escapeHtml(state.quick || "")}</textarea>
      <div class="pill-row">
        ${["45分钟英语", "$12 lunch", "深蹲20个", "今天状态不错，继续坚持。", "appointment maintenance insurance"].map((text) => `
          <button class="pill" data-quick-template="${escapeHtml(text)}">${escapeHtml(text)}</button>
        `).join("")}
      </div>
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
      <div class="metric"><div class="metric-value">${todayMinutes}</div><div class="metric-label">今日分钟</div></div>
      <div class="metric"><div class="metric-value">${totalHours}</div><div class="metric-label">累计小时</div></div>
      <div class="metric"><div class="metric-value">${streak}</div><div class="metric-label">连续天数</div></div>
      <div class="metric"><div class="metric-value">${remainingHours}</div><div class="metric-label">剩余小时</div></div>
      <div class="metric"><div class="metric-value">${state.words.length}</div><div class="metric-label">生词</div></div>
      <div class="metric"><div class="metric-value">$${log.expenses.reduce((sum, item) => sum + item.amount, 0).toFixed(0)}</div><div class="metric-label">今日花费</div></div>
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
        <button class="primary" data-open="${escapeHtml(getResourceUrl(course))}">打开学习资源</button>
      </div>
    </section>
    <section class="card">
      <h2>今天的视频链接</h2>
      <p class="body">把今天真正看的 YouTube / TED / 课程链接贴这里。以后点“打开学习资源”就直达。</p>
      <input id="resourceLink" value="${escapeHtml(state.resourceLinks?.[resourceKey(course.day)] || "")}" placeholder="https://www.youtube.com/..." />
      <div class="button-row">
        <button class="primary" id="saveResourceLink">保存链接</button>
        <button class="secondary" data-open="${escapeHtml(getResourceUrl(course))}">打开当前链接</button>
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
          <span class="check ${ids.has(task.id) ? "done" : ""}">${ids.has(task.id) ? "&#10003;" : ""}</span>
          <span class="row-main"><strong>${task.title}</strong><br><span class="small">${task.detail}</span></span>
          <span class="status ${ids.has(task.id) ? "done" : ""}">${task.minutes}m</span>
        </button>
      `).join("")}
      <div class="timer-box">
        <p class="small">当前计时：${timerTask}</p>
        <div class="timer-time" id="timerTime">${formatDuration(activeTimerSeconds())}</div>
        <p class="small">今天累计：<span id="timerTotal">${Math.floor(totalStudySecondsToday() / 60)}</span> 分钟。切到 YouTube 会继续算；单次最多算4小时，防止忘关。</p>
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
      <div class="quick-time">
        <input id="manualMinutes" type="number" inputmode="numeric" min="1" max="300" placeholder="补记分钟，例如 18" />
        <button class="secondary" id="manualMinutesAdd">补记时间</button>
      </div>
    </section>
    <section class="card grammar-card">
      <p class="kicker">语法 15 分钟</p>
      <h2>${support.grammar.title}</h2>
      <p class="body"><strong>结构：</strong>${support.grammar.pattern}</p>
      <div class="phrase-list">
        ${support.grammar.examples.map((example) => `
          <div class="phrase-card">
            <span>${escapeHtml(example)}</span>
            <button class="secondary" data-copy="${escapeHtml(example)}">复制</button>
          </div>
        `).join("")}
      </div>
      <p class="install-tip"><strong>今天只做：</strong>${support.grammar.task}</p>
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
  const query = (state.wordQuery || "").trim().toLowerCase();
  const filtered = state.words.filter((word) => {
    if (!query) return true;
    return [word.word, word.meaning, word.sentence].join(" ").toLowerCase().includes(query);
  });
  const reviewSource = query ? filtered : due;
  const reviewList = reviewSource.slice(0, 20);
  return `
    <section class="card">
      <h1>生词本</h1>
      <p class="body">不是只背单词。每天先看验证核心词，再听常用句，最后复习到期生词。</p>
      <textarea id="wordImport" placeholder="listen, understand, repeat 或粘贴一段英文字幕"></textarea>
      <div id="wordPreview">${renderWordImportPreview("")}</div>
      <div class="button-row">
        <button class="primary" id="importWords">一键导入生词</button>
        <button class="secondary" id="seedWords">加入3500高频候选词</button>
      </div>
    </section>
    <section class="card warning">
      <h2>词库依据</h2>
      <p class="body">我刚核对过：当前 3500 词不是乱造，排序来自 ECDICT 的 BNC / FRQ / Oxford / Collins 等频率字段，前排词也符合 Oxford 3000、NGSL、SUBTLEX 这类高频词思路。</p>
      <p class="body"><strong>但中文释义以前不够干净。</strong> 所以现在改成：验证核心词优先显示干净中文；其他词先标为高频候选，后续继续清洗。</p>
    </section>
    <section class="card">
      <h2>复习队列</h2>
      <p class="body">今天只推最多20个。词再多也分批来，不把你压死。</p>
      <input id="wordSearch" value="${state.wordQuery || ""}" placeholder="搜索英文 / 中文 / 例句" />
      <div class="button-row">
        <button class="secondary" id="spreadWords">整理复习队列</button>
        <button class="secondary" id="clearWordSearch">清空搜索</button>
      </div>
      <p class="install-tip">总词数 ${state.words.length} / 到期 ${due.length} / 当前显示 ${reviewList.length}${query ? ` / 搜索结果 ${filtered.length}` : ""}</p>
    </section>
    <section class="card success">
      <h2>今日高频词</h2>
      <p class="body">Day ${state.currentDay} 先拿这 10 个。会用，比背多更重要。</p>
      <div class="word-grid">
        ${dailyWords.map((word) => {
          const hint = lookupWordHint(word);
          return `<button class="word-chip" data-say="${escapeHtml(word)}"><strong>${escapeHtml(word)}</strong><span>${escapeHtml(hint[0])}</span></button>`;
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
      <h2>${query ? "搜索结果" : "今天先复习"}：${query ? filtered.length : `${reviewList.length}/${due.length}`}</h2>
      <div class="word-list">
        ${(reviewList.length ? reviewList : state.words.slice(0, 20)).map((word) => `
          <div class="word-card">
            <div class="word-head">
              <div class="word-title">${escapeHtml(word.word)}</div>
              <button class="ghost" data-say="${escapeHtml(word.word)}">发音</button>
            </div>
            <span class="source-badge ${word.source === "验证核心" ? "verified" : ""}">${escapeHtml(word.source || "高频候选")}</span>
            <p class="body">${escapeHtml(word.meaning)}</p>
            <p class="small">${escapeHtml(word.sentence)}</p>
            <div class="button-row">
              <button class="secondary" data-review="${word.id}" data-level="again">忘了</button>
              <button class="secondary" data-review="${word.id}" data-level="hard">困难</button>
              <button class="primary" data-review="${word.id}" data-level="ok">会了</button>
              <button class="secondary" data-review="${word.id}" data-level="easy">很熟</button>
              <button class="danger" data-delete-word="${word.id}">删除</button>
            </div>
          </div>
        `).join("") || `<p class="body">还没有生词。先导入基础词，或者从视频字幕粘贴。</p>`}
      </div>
      ${!query && due.length > 20 ? `<p class="install-tip">还有 ${due.length - 20} 个到期词，明天继续。别一次刷爆。</p>` : ""}
    </section>
  `;
}

function renderPlayer() {
  const course = getCourseDay(state.currentDay);
  const player = playerState();
  const sentence = getPlayerSentence();
  const keyWords = extractWords(sentence.english).slice(0, 6);
  const customCount = getPlayerSentences().length;
  const usingCustom = Boolean(state.customSentences?.[customSentenceKey()]?.length);
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
      <h2>导入视频字幕</h2>
      <p class="body">从 YouTube 复制字幕、标题、评论或笔记，粘贴进来。App 会切成句子，直接用于精听。</p>
      <textarea id="sentenceImport" placeholder="Paste English subtitles here. Example: I want to learn English. This is useful."></textarea>
      <div class="button-row">
        <button class="primary" id="importSentences">导入到精听</button>
        <button class="secondary" id="clearSentences">恢复今日默认句</button>
      </div>
      <p class="install-tip">${usingCustom ? `当前使用你导入的 ${customCount} 句。` : `当前使用系统今日 ${customCount} 句。`}</p>
    </section>
    <section class="card">
      <h2>听写检查</h2>
      <textarea id="dictationBox" placeholder="听完后，把你听到的英文打在这里。">${player.dictation || ""}</textarea>
      <div class="button-row">
        <button class="primary" id="checkDictation">检查听写</button>
        <button class="secondary" id="clearDictation">清空</button>
      </div>
      ${renderDictationComparison(sentence.english, player.dictation)}
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
  const answers = getAiAnswers(course.day);
  const questions = getAiQuestions(course, support);
  return `
    <section class="card">
      <p class="kicker">AI老师</p>
      <h1>Day ${course.day} 测试</h1>
      <p class="body">先在这里回答，再复制给 ChatGPT 纠正。这样 AI 老师才不是摆设。</p>
    </section>
    <section class="card success">
      <h2>App 内小测</h2>
      <p class="body">不用写复杂句。短句也可以，关键是开口和输出。</p>
      ${questions.map((item, index) => `
        <div class="ai-question">
          <p class="kicker">${index + 1}. ${escapeHtml(item.title)}</p>
          <h3>${escapeHtml(item.question)}</h3>
          <textarea class="ai-answer" data-ai-answer="${escapeHtml(item.id)}" placeholder="用英文回答，简单句就行。">${escapeHtml(answers[item.id] || "")}</textarea>
        </div>
      `).join("")}
      <div class="button-row">
        <button class="primary" id="saveAiAnswers">保存我的回答</button>
        <button class="secondary" id="copyAiReview">复制给AI纠正</button>
      </div>
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
  const todaySpending = log.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const week = lifeTotals(7);
  const lifeChecks = [
    ["训练", log.workout.length > 0, "做了就算，不追求练爆。"],
    ["记账", log.expenses.length > 0, "今天有消费就随手记一笔。"],
    ["日记", !!log.journal.trim(), "5句也可以，重点是不断。"]
  ];
  const lifeScore = Math.round((lifeChecks.filter((item) => item[1]).length / lifeChecks.length) * 100);
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
    <section class="card notice">
      <h2>今天生活分：${lifeScore}</h2>
      <p class="body">不用完美。三个小动作完成两个，今天就不算乱。</p>
      ${lifeChecks.map(([label, done, detail]) => `
        <div class="row">
          <span class="check ${done ? "done" : ""}">${done ? "&#10003;" : ""}</span>
          <span class="row-main"><strong>${label}</strong><br><span class="small">${detail}</span></span>
          <span class="status ${done ? "done" : ""}">${done ? "已完成" : "待完成"}</span>
        </div>
      `).join("")}
    </section>
    <section class="grid">
      <div class="metric"><div class="metric-value">$${todaySpending.toFixed(0)}</div><div class="metric-label">今日花费</div></div>
      <div class="metric"><div class="metric-value">${log.workout.length}</div><div class="metric-label">今日训练</div></div>
      <div class="metric"><div class="metric-value">$${week.spending.toFixed(0)}</div><div class="metric-label">7天花费</div></div>
      <div class="metric"><div class="metric-value">${week.journals}/7</div><div class="metric-label">7天日记</div></div>
    </section>
    <section class="card">
      <h2>懒人模板</h2>
      <p class="body">忙的时候点一个模板，先把基本盘保住。</p>
      <div class="plan-grid">
        <button class="plan-card" data-life-template="workday">
          <strong>上班日低配</strong>
          <span>走路完成 / 午餐记账 / 写一句状态</span>
        </button>
        <button class="plan-card" data-life-template="rest">
          <strong>休息日标准</strong>
          <span>10分钟保底训练 / 买菜记账 / 明天计划</span>
        </button>
        <button class="plan-card" data-life-template="tired">
          <strong>状态差保命</strong>
          <span>拉伸10分钟 / 不加任务 / 早点睡</span>
        </button>
        <button class="plan-card" data-life-template="reset">
          <strong>重新收拾</strong>
          <span>补记一笔 / 写三问 / 明天只做一件事</span>
        </button>
      </div>
    </section>
    <section class="card">
      <h2>健康训练</h2>
      <p class="body">最低标准也算。今天先别追求完美。</p>
      <div class="plan-grid">
        ${workoutPlans.map(([title, detail]) => `
          <button class="plan-card" data-workout="${escapeHtml(`${title}：${detail}`)}">
            <strong>${log.workout.some((item) => item.startsWith(title)) ? "&#10003; " : ""}${escapeHtml(title)}</strong>
            <span>${escapeHtml(detail)}</span>
          </button>
        `).join("")}
      </div>
      <div class="pill-row">
        ${["深蹲 20 个", "俯卧撑 10 个", "平板支撑 30 秒", "拉伸 10 分钟", "走路完成"].map((item) => `
          <button class="pill" data-workout="${escapeHtml(item)}">${log.workout.includes(item) ? "&#10003; " : ""}${escapeHtml(item)}</button>
        `).join("")}
      </div>
    </section>
    <section class="card">
      <h2>记账</h2>
      <div class="pill-row">
        ${[[12, "lunch"], [5, "coffee"], [40, "gas"], [35, "grocery"], [8, "parking"], [15, "car wash"], [20, "medicine"], [60, "restaurant"]].map(([amount, note]) => `
          <button class="pill" data-expense="${amount}" data-note="${escapeHtml(note)}">$${amount} ${escapeHtml(note)}</button>
        `).join("")}
      </div>
      <div class="money-form">
        <input id="expenseAmount" type="number" inputmode="decimal" placeholder="金额，例如 12.5" />
        <input id="expenseNote" placeholder="类别/备注，例如 lunch" />
        <button class="primary" id="addExpense">记一笔</button>
      </div>
      <div class="money-list">
        ${log.expenses.map((item) => `
          <div class="entry">
            <strong>$${Number(item.amount || 0).toFixed(2)}</strong> ${escapeHtml(item.note)}
            <button class="ghost mini-action" data-delete-expense="${escapeHtml(item.id)}">删除</button>
            <br><span class="small">${new Date(item.createdAt).toLocaleTimeString()}</span>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="card">
      <h2>日记</h2>
      <p class="body">先点一个状态，再写几句。状态会影响明天安排强度。</p>
      <div class="pill-row">
        ${["很好", "正常", "累", "压力大", "睡眠差"].map((mood) => `
          <button class="${log.mood === mood ? "primary" : "pill"}" data-mood="${escapeHtml(mood)}">${escapeHtml(mood)}</button>
        `).join("")}
      </div>
      <div class="pill-row">
        ${journalLines.map((line) => `<button class="pill" data-journal-line="${line}">${line}</button>`).join("")}
      </div>
      <textarea id="journal" placeholder="今天做了什么？身体怎么样？明天最重要一件事？">${escapeHtml(log.journal || "")}</textarea>
      <div class="button-row">
        <button class="primary" id="saveJournal">保存日记</button>
        <button class="secondary" id="templateJournal">三问模板</button>
      </div>
    </section>
  `;
}

function renderSettings() {
  const sync = getSyncState();
  const localAt = state.localUpdatedAt || state.savedAt || "";
  const cloudAt = sync.lastCloudUpdatedAt || "";
  const todayUploaded = sync.lastDailyUploadDate === localDayKey();
  const dailySummary = sync.auto
    ? todayUploaded
      ? "今天已自动上传过一次。"
      : "今天还没自动上传；打开、切回前台或修改数据后会自动尝试。"
    : "自动同步已关闭。";
  const hasLocalChanges = Boolean(localAt && (!cloudAt || localAt > cloudAt));
  const syncSummary = sync.gistId
    ? hasLocalChanges
      ? "本机有新改动，建议点“上传本机数据”。"
      : "本机和云端看起来是同步的。"
    : "还没有创建云同步。先填 Token，然后点创建。";
  return `
    <section class="card success">
      <h1>当前版本</h1>
      <p class="body">${APP_VERSION}</p>
      <p class="small">如果手机还是旧页面，点下面按钮清缓存并重新加载。</p>
      <div class="button-row">
        <button class="primary" id="forceRefresh">强制更新网页</button>
        <button class="secondary" id="copyVersion">复制版本信息</button>
      </div>
    </section>
    <section class="card">
      <h1>${ui("界面语言", "Interface Language")}</h1>
      <p class="body">${ui("先做中英切换基础。后面每个模块会继续补完整英文文案。", "This is the foundation. More screens will get full English text over time.")}</p>
      <div class="button-row">
        <button class="${state.language === "zh" ? "primary" : "secondary"}" data-lang="zh">中文</button>
        <button class="${state.language === "en" ? "primary" : "secondary"}" data-lang="en">English</button>
      </div>
    </section>
    <section class="card notice">
      <h1>${ui("网页/PWA 版本", "Web / PWA Version")}</h1>
      <p class="body">${ui("这个版本的数据保存在本机浏览器。发布到 GitHub Pages 后，手机打开一次，就可以添加到主屏幕。离线能力需要浏览器首次缓存成功。", "Your data is saved in this browser. After opening it once from GitHub Pages, you can add it to your Home Screen. Offline mode works after the browser caches it once.")}</p>
      <p class="small">${ui("iPhone：Safari 打开网址，点分享，选择“添加到主屏幕”。", "iPhone: open the site in Safari, tap Share, then Add to Home Screen.")}</p>
    </section>
    <section class="card">
      <h2>云同步</h2>
      <p class="body">手机和 Windows 要同步，就用 GitHub Gist 存一份私人数据。第一次填 Token 后点创建；之后开启懒人自动同步，打开、切回前台、修改数据后都会自动同步。</p>
      <div class="sync-id-box">
        <div class="small">同步判断</div>
        <strong>${syncSummary}</strong>
        <span class="small">自动同步：${sync.auto ? "已开启" : "已关闭"} / 每日上传：${dailySummary} / 本机更新：${localAt ? new Date(localAt).toLocaleString() : "暂无"} / 云端记录：${cloudAt ? new Date(cloudAt).toLocaleString() : "暂无"}</span>
        ${sync.lastAutoUploadError ? `<span class="small danger-text">上次自动同步失败：${escapeHtml(sync.lastAutoUploadError)}</span>` : ""}
      </div>
      <label class="field-label" for="githubToken">GitHub Token</label>
      <input id="githubToken" type="password" value="${escapeHtml(sync.token || "")}" placeholder="只保存到本机，不会提交到 GitHub 仓库" />
      <label class="field-label" for="gistId">Gist ID</label>
      <input id="gistId" value="${escapeHtml(sync.gistId || "")}" placeholder="第一次可留空，点创建云同步后自动生成" />
      ${sync.gistId ? `
        <div class="sync-id-box">
          <div class="small">当前 Gist ID</div>
          <strong>${escapeHtml(sync.gistId)}</strong>
          <button class="ghost" id="copyGistId">复制 Gist ID</button>
        </div>
      ` : `
        <div class="sync-id-box">
          <div class="small">还没有 Gist ID。第一次创建时留空，然后点“创建云同步”。</div>
        </div>
      `}
      <label class="toggle-row">
        <input id="autoSync" type="checkbox" ${sync.auto ? "checked" : ""} />
        <span>懒人自动同步：打开/切回时自动检查，修改后自动上传；每天至少自动上传一次</span>
      </label>
      <div class="button-row">
        <button class="primary" id="createSync">创建云同步</button>
        <button class="secondary" id="uploadSync">上传本机数据</button>
        <button class="secondary" id="downloadSync">下载云端数据</button>
        <button class="secondary" id="testAutoSync">测试自动同步</button>
      </div>
      <p class="install-tip" id="syncStatus">${sync.lastSyncAt ? `上次同步：${new Date(sync.lastSyncAt).toLocaleString()} / ${sync.lastSyncDevice}` : "还没有同步。"}</p>
      <p class="small">Token 权限只需要 gist。不要给我看 Token，自己填到这里就行。</p>
    </section>
    <section class="card">
      <h2>声音测试</h2>
      <p class="body">如果单词发音没声音，先点这里。手机要确认没有静音，浏览器允许播放声音。</p>
      <button class="primary full" id="testVoice">测试发音：I can keep going.</button>
    </section>
    <section class="card">
      <h2>数据备份</h2>
      <p class="body">换手机、清浏览器缓存前，先复制备份。</p>
      <div class="button-row">
        <button class="primary" id="copyBackup">复制备份</button>
        <button class="secondary" id="restoreBackup">恢复备份</button>
        <button class="secondary" id="repairData">数据体检</button>
      </div>
      <textarea id="backupText" placeholder="恢复时把备份文字粘贴到这里"></textarea>
      <p class="install-tip">体检会去重单词、补中文、补例句、修复缺失字段。</p>
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
  const navItems = [
    ["home", ui("首页", "Home")],
    ["today", ui("今日", "Today")],
    ["player", ui("精听", "Listen")],
    ["words", ui("单词", "Words")],
    ["life", ui("生活", "Life")],
    ["ai", "AI"],
    ["roadmap", ui("路线", "Plan")]
  ];
  app.innerHTML = `
    <main class="app">
      <div class="topbar">
        <div>
          <p class="kicker">Local-first PWA</p>
          <strong>English1000 Life</strong>
        </div>
        <button class="secondary" data-tab="settings">${ui("设置", "Settings")}</button>
      </div>
      ${state.tab === "today" ? renderToday() : state.tab === "player" ? renderPlayer() : state.tab === "words" ? renderWords() : state.tab === "life" ? renderLife() : state.tab === "ai" ? renderAiTeacher() : state.tab === "roadmap" ? renderRoadmap() : state.tab === "settings" ? renderSettings() : renderHome()}
    </main>
    <nav class="tabs">
      ${navItems.map(([tab, label]) => `<button class="tab ${state.tab === tab ? "active" : ""}" data-tab="${tab}">${label}</button>`).join("")}
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

function pickEnglishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => /^en[-_]/i.test(voice.lang))
    || voices.find((voice) => /English/i.test(voice.name))
    || null;
}

function speakEnglish(text, rate = 0.82, retry = true) {
  const clean = String(text || "").trim();
  if (!clean) return;
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    alert("这个浏览器不支持发音。请用 Safari、Chrome 或 Edge 打开。");
    return;
  }
  window.speechSynthesis.cancel();
  const voice = pickEnglishVoice();
  if (!voice && retry) {
    window.speechSynthesis.onvoiceschanged = () => speakEnglish(clean, rate, false);
    setTimeout(() => speakEnglish(clean, rate, false), 250);
    return;
  }
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  if (voice) utterance.voice = voice;
  utterance.onerror = () => updateSyncBadge("发音失败：请确认手机没有静音，或换 Safari/Chrome 打开");
  setTimeout(() => window.speechSynthesis.speak(utterance), 30);
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((el) => el.addEventListener("click", () => setTab(el.dataset.tab)));
  document.querySelectorAll("[data-lang]").forEach((el) => el.addEventListener("click", () => {
    state.language = el.dataset.lang === "en" ? "en" : "zh";
    saveState();
    render();
  }));
  document.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => window.open(el.dataset.open, "_blank", "noopener")));
  document.querySelectorAll("[data-task]").forEach((el) => el.addEventListener("click", () => toggleTask(el.dataset.task)));
  document.querySelectorAll("[data-minutes]").forEach((el) => el.addEventListener("click", () => addStudyMinutes(Number(el.dataset.minutes))));
  const manualMinutesAdd = document.querySelector("#manualMinutesAdd");
  if (manualMinutesAdd) manualMinutesAdd.addEventListener("click", () => {
    const minutes = Math.max(0, Math.min(300, Number(document.querySelector("#manualMinutes")?.value || 0)));
    if (!minutes) return alert("先填分钟数。");
    addStudyMinutes(minutes);
  });
  const saveResourceLink = document.querySelector("#saveResourceLink");
  if (saveResourceLink) saveResourceLink.addEventListener("click", () => {
    const input = document.querySelector("#resourceLink");
    const value = String(input?.value || "").trim();
    if (value && !/^https?:\/\//i.test(value)) {
      alert("链接要以 http:// 或 https:// 开头。");
      return;
    }
    if (!state.resourceLinks) state.resourceLinks = {};
    if (value) state.resourceLinks[resourceKey()] = value;
    else delete state.resourceLinks[resourceKey()];
    saveState();
    alert(value ? "今天的学习链接已保存。" : "今天的自定义链接已清空。");
    render();
  });
  document.querySelectorAll("[data-understanding]").forEach((el) => el.addEventListener("click", () => setUnderstanding(Number(el.dataset.understanding))));
  document.querySelectorAll("[data-review]").forEach((el) => el.addEventListener("click", () => reviewWord(el.dataset.review, el.dataset.level)));
  document.querySelectorAll("[data-delete-word]").forEach((el) => el.addEventListener("click", () => {
    if (!confirm("确定删除这个生词？")) return;
    state.words = state.words.filter((word) => word.id !== el.dataset.deleteWord);
    saveState();
    render();
  }));
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
    const total = getPlayerSentences().length;
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
  document.querySelectorAll("[data-quick-template]").forEach((el) => el.addEventListener("click", () => {
    state.quick = el.dataset.quickTemplate || "";
    saveState();
    render();
  }));
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
    const text = document.querySelector("#wordImport").value;
    const summary = wordImportSummary(text);
    const count = addWordsFromText(text);
    alert(`识别 ${summary.total} 个词；新增 ${count} 个；已存在 ${summary.already} 个。`);
    render();
  });
  const seedWords = document.querySelector("#seedWords");
  if (seedWords) seedWords.addEventListener("click", () => {
    const count = addBaseWordsBalanced();
    alert(`已加入 ${count} 个高频候选词，并按每天20个排队复习。核心词会优先显示干净释义。`);
    render();
  });
  const spreadWords = document.querySelector("#spreadWords");
  if (spreadWords) spreadWords.addEventListener("click", () => {
    const count = spreadWordReviews();
    alert(`已整理 ${count} 个词。以后每天最多推20个。`);
    render();
  });
  const wordSearch = document.querySelector("#wordSearch");
  if (wordSearch) wordSearch.addEventListener("input", () => {
    state.wordQuery = wordSearch.value;
    saveState({ autoSync: false });
    render();
  });
  const clearWordSearch = document.querySelector("#clearWordSearch");
  if (clearWordSearch) clearWordSearch.addEventListener("click", () => {
    state.wordQuery = "";
    saveState({ autoSync: false });
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
  const forceRefresh = document.querySelector("#forceRefresh");
  if (forceRefresh) forceRefresh.addEventListener("click", forceRefreshApp);
  const copyVersion = document.querySelector("#copyVersion");
  if (copyVersion) copyVersion.addEventListener("click", () => copyText(`English1000 Life ${APP_VERSION}\n${location.href}`, "版本信息已复制"));
  const testVoice = document.querySelector("#testVoice");
  if (testVoice) testVoice.addEventListener("click", () => speakEnglish("I can keep going.", 0.82));
  const copyAiPromptPage = document.querySelector("#copyAiPromptPage");
  if (copyAiPromptPage) copyAiPromptPage.addEventListener("click", () => copyText(getDailySupport(getCourseDay(state.currentDay)).aiPrompt, "AI测试提示已复制"));
  document.querySelectorAll("[data-copy-ai]").forEach((el) => el.addEventListener("click", () => copyText(el.dataset.copyAi, "训练提示已复制")));
  document.querySelectorAll("[data-ai-answer]").forEach((el) => el.addEventListener("input", () => {
    getAiAnswers()[el.dataset.aiAnswer] = el.value;
    saveState();
  }));
  const saveAiAnswers = document.querySelector("#saveAiAnswers");
  if (saveAiAnswers) saveAiAnswers.addEventListener("click", () => {
    document.querySelectorAll("[data-ai-answer]").forEach((el) => {
      getAiAnswers()[el.dataset.aiAnswer] = el.value;
    });
    saveState();
    alert("AI小测回答已保存。");
  });
  const copyAiReview = document.querySelector("#copyAiReview");
  if (copyAiReview) copyAiReview.addEventListener("click", () => {
    document.querySelectorAll("[data-ai-answer]").forEach((el) => {
      getAiAnswers()[el.dataset.aiAnswer] = el.value;
    });
    saveState();
    copyText(aiReviewPrompt(), "已复制：把它发给 ChatGPT 纠正你。");
  });
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
  const importSentences = document.querySelector("#importSentences");
  if (importSentences) importSentences.addEventListener("click", () => {
    const text = document.querySelector("#sentenceImport").value;
    const sentences = parseSentences(text);
    if (!sentences.length) {
      alert("没有识别到英文句子。复制字幕或英文段落再试。");
      return;
    }
    if (!state.customSentences) state.customSentences = {};
    state.customSentences[customSentenceKey()] = sentences;
    const player = playerState();
    player.index = 0;
    player.dictation = "";
    addWordsFromText(sentences.join(" "));
    saveState();
    alert(`已导入 ${sentences.length} 句，并自动提取关键词进生词本。`);
    render();
  });
  const clearSentences = document.querySelector("#clearSentences");
  if (clearSentences) clearSentences.addEventListener("click", () => {
    if (state.customSentences) delete state.customSentences[customSentenceKey()];
    const player = playerState();
    player.index = 0;
    player.dictation = "";
    saveState();
    render();
  });
  document.querySelectorAll("[data-workout]").forEach((el) => el.addEventListener("click", () => {
    const log = getTodayLog();
    log.workout.includes(el.dataset.workout)
      ? log.workout = log.workout.filter((item) => item !== el.dataset.workout)
      : log.workout.push(el.dataset.workout);
    saveState();
    render();
  }));
  document.querySelectorAll("[data-life-template]").forEach((el) => el.addEventListener("click", () => {
    const log = getTodayLog();
    const addWorkout = (item) => {
      if (!log.workout.includes(item)) log.workout.push(item);
    };
    const addJournal = (line) => {
      if (!String(log.journal || "").includes(line)) {
        log.journal = log.journal ? `${log.journal}\n${line}` : line;
      }
    };
    if (el.dataset.lifeTemplate === "workday") {
      addWorkout("走路完成");
      addJournal("今天完成：上班日低配，先保住基本盘。");
    }
    if (el.dataset.lifeTemplate === "rest") {
      addWorkout("10分钟保底：深蹲 20个 / 俯卧撑 10个 / 拉伸 3分钟");
      log.expenses.unshift({ id: `${Date.now()}`, amount: 35, note: "grocery", createdAt: new Date().toISOString() });
      addJournal("明天最重要一件事：");
    }
    if (el.dataset.lifeTemplate === "tired") {
      addWorkout("恢复日：走路 20分钟 / 拉伸 10分钟 / 早睡");
      log.mood = "累";
      addJournal("身体状态：累，今天降低强度，早点睡。");
    }
    if (el.dataset.lifeTemplate === "reset") {
      addJournal("今天完成：\n身体状态：\n明天最重要一件事：");
    }
    saveState();
    render();
  }));
  document.querySelectorAll("[data-expense]").forEach((el) => el.addEventListener("click", () => {
    const log = getTodayLog();
    log.expenses.unshift({ id: `${Date.now()}`, amount: Number(el.dataset.expense), note: el.dataset.note, createdAt: new Date().toISOString() });
    saveState();
    render();
  }));
  document.querySelectorAll("[data-delete-expense]").forEach((el) => el.addEventListener("click", () => {
    const log = getTodayLog();
    log.expenses = log.expenses.filter((item) => item.id !== el.dataset.deleteExpense);
    saveState();
    render();
  }));
  document.querySelectorAll("[data-mood]").forEach((el) => el.addEventListener("click", () => {
    getTodayLog().mood = el.dataset.mood;
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
  const repairData = document.querySelector("#repairData");
  if (repairData) repairData.addEventListener("click", () => {
    const count = repairLocalData();
    alert(`数据体检完成。当前有效单词 ${count} 个。`);
    render();
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
  const testAutoSync = document.querySelector("#testAutoSync");
  if (testAutoSync) testAutoSync.addEventListener("click", async () => {
    try {
      setSyncStatus("正在测试自动同步...");
      await uploadCloudSync("daily auto uploaded");
      render();
      alert("自动同步测试完成。以后打开、切回前台、修改数据后都会自动尝试同步。");
    } catch (error) {
      setSyncStatus(`自动同步测试失败：${error.message}`);
    }
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

if (state.vocabAuditVersion !== "2026.07.19-vocab-audit-1") {
  repairLocalData();
  state.vocabAuditVersion = "2026.07.19-vocab-audit-1";
  saveState({ autoSync: false });
}

if (state.reviewSpreadVersion !== "2026.07.19-review-spread-1") {
  if (state.words.length > 100 && dueWords().length > 60) spreadWordReviews();
  state.reviewSpreadVersion = "2026.07.19-review-spread-1";
  saveState({ autoSync: false });
}

render();
setTimeout(autoSyncOnStart, 800);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    autoSyncOnStart();
  } else {
    scheduleAutoUpload(250, "auto uploaded before background");
  }
});

window.addEventListener("online", () => {
  autoSyncOnStart();
});
