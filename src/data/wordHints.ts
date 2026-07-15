import { basicWordHints } from "./basicWordHints";
import { curatedWordHints } from "./curatedWordHints";

export type WordHint = {
  meaning: string;
  sentence: string;
};

const hints: Record<string, WordHint> = {
  i: { meaning: "我", sentence: "I study English today." },
  you: { meaning: "你；你们", sentence: "You are my teacher." },
  he: { meaning: "他", sentence: "He is busy today." },
  she: { meaning: "她", sentence: "She is happy." },
  go: { meaning: "去", sentence: "I go home after work." },
  come: { meaning: "来", sentence: "Can you come tomorrow?" },
  want: { meaning: "想要", sentence: "I want to learn useful English." },
  like: { meaning: "喜欢", sentence: "I like this lesson." },
  good: { meaning: "好的；不错的", sentence: "Today is a good day." },
  today: { meaning: "今天", sentence: "Today I studied English." },

  my: { meaning: "我的", sentence: "My name is Jacob." },
  your: { meaning: "你的；你们的", sentence: "What is your name?" },
  name: { meaning: "名字", sentence: "My name is Jacob." },
  live: { meaning: "居住；生活", sentence: "I live in the United States." },
  work: { meaning: "工作", sentence: "I work today." },
  study: { meaning: "学习", sentence: "I study English every day." },
  home: { meaning: "家", sentence: "I drove home." },
  tired: { meaning: "累的", sentence: "I am tired, but I will continue." },
  happy: { meaning: "开心的", sentence: "I am happy today." },
  now: { meaning: "现在", sentence: "I am studying now." },

  car: { meaning: "汽车", sentence: "It's for my car." },
  appointment: { meaning: "预约", sentence: "I'd like to schedule a maintenance appointment." },
  maintenance: { meaning: "保养；维护", sentence: "I need regular maintenance for my car." },
  oil: { meaning: "油；机油", sentence: "I need an oil change." },
  tire: { meaning: "轮胎", sentence: "Do I need a tire rotation?" },
  service: { meaning: "服务；维修保养", sentence: "I need service for my car." },
  tomorrow: { meaning: "明天", sentence: "Tomorrow morning, if possible." },
  morning: { meaning: "早上；上午", sentence: "Tomorrow morning works for me." },
  afternoon: { meaning: "下午", sentence: "Any time after two in the afternoon is fine." },
  possible: { meaning: "可能的；可以的", sentence: "Tomorrow morning, if possible." },

  water: { meaning: "水", sentence: "Can I have water, please?" },
  beef: { meaning: "牛肉", sentence: "I'd like beef and vegetables." },
  rice: { meaning: "米饭", sentence: "No rice, please." },
  potato: { meaning: "土豆", sentence: "I ate potatoes today." },
  egg: { meaning: "鸡蛋", sentence: "I ate beef, eggs, and vegetables." },
  vegetable: { meaning: "蔬菜", sentence: "I'd like vegetables." },
  order: { meaning: "点餐；订单", sentence: "I would like to order food." },
  have: { meaning: "有；吃；喝", sentence: "Can I have water, please?" },
  please: { meaning: "请", sentence: "Can I have water, please?" },
  check: { meaning: "账单；检查", sentence: "Can I get the check?" },

  where: { meaning: "哪里", sentence: "Where can I find olive oil?" },
  find: { meaning: "找到", sentence: "Where can I find milk?" },
  aisle: { meaning: "货架通道", sentence: "Which aisle is it in?" },
  milk: { meaning: "牛奶", sentence: "Where can I find milk?" },
  bread: { meaning: "面包", sentence: "Where can I find bread?" },
  price: { meaning: "价格", sentence: "What is the price?" },
  bag: { meaning: "袋子", sentence: "Can I have a bag?" },
  receipt: { meaning: "收据；小票", sentence: "Can I get a receipt?" },
  card: { meaning: "卡", sentence: "Can I pay by card?" },
  cash: { meaning: "现金", sentence: "Can I pay with cash?" },

  start: { meaning: "开始", sentence: "I start work in the morning." },
  finish: { meaning: "完成；结束", sentence: "I finished Day 6." },
  drive: { meaning: "开车", sentence: "I drive home after work." },
  walk: { meaning: "走路", sentence: "I walked a lot today." },
  call: { meaning: "打电话", sentence: "I called my friend." },
  message: { meaning: "消息；发消息", sentence: "I sent a message." },
  boss: { meaning: "老板", sentence: "My boss called me." },
  customer: { meaning: "顾客", sentence: "I helped a customer." },
  break: { meaning: "休息", sentence: "I took a short break." },
  later: { meaning: "稍后；以后", sentence: "I will study later." },

  doctor: { meaning: "医生", sentence: "I need to see a doctor." },
  available: { meaning: "有空的；可用的", sentence: "Do you have anything available this week?" },
  week: { meaning: "星期；一周", sentence: "I need to go this week." },
  pain: { meaning: "疼痛", sentence: "I have pain in my tooth." },
  insurance: { meaning: "保险", sentence: "I need to bring my insurance card." },
  clinic: { meaning: "诊所", sentence: "I need to call the clinic." },

  bank: { meaning: "银行", sentence: "I need to go to the bank." },
  account: { meaning: "账户", sentence: "I'd like to open an account." },
  deposit: { meaning: "存入；存款", sentence: "Can I deposit cash?" },
  transfer: { meaning: "转账；转移", sentence: "Can I transfer money?" },
  money: { meaning: "钱", sentence: "Can I transfer money?" },
  fee: { meaning: "费用", sentence: "Is there a fee?" },
  balance: { meaning: "余额", sentence: "Can I check my balance?" },

  dmv: { meaning: "车管所", sentence: "I have an appointment at the DMV." },
  license: { meaning: "驾照；许可证", sentence: "I'm here for my driver's license." },
  document: { meaning: "文件；材料", sentence: "What documents do I need?" },
  registration: { meaning: "登记；车辆注册", sentence: "I'm here for my registration." },
  wait: { meaning: "等待", sentence: "Where should I wait?" },
  line: { meaning: "队伍；排队", sentence: "Is this the right line?" },
  number: { meaning: "号码", sentence: "What is my number?" },
  form: { meaning: "表格", sentence: "What form do I need?" },
  next: { meaning: "下一个；接下来", sentence: "What is the next step?" },

  phone: { meaning: "电话；手机", sentence: "I am on the phone." },
  repeat: { meaning: "重复", sentence: "Could you repeat that?" },
  slowly: { meaning: "慢慢地", sentence: "Could you speak a little more slowly?" },
  confirm: { meaning: "确认", sentence: "Let me confirm the time." },
  hold: { meaning: "等待；别挂电话", sentence: "Can you hold for a moment?" },
  again: { meaning: "再一次", sentence: "Could you say that again?" },

  problem: { meaning: "问题", sentence: "There is a problem." },
  fix: { meaning: "修理；解决", sentence: "Can you fix it?" },
  wrong: { meaning: "错误的；有问题的", sentence: "There is something wrong." },
  try: { meaning: "尝试", sentence: "I will try again." },
  should: { meaning: "应该", sentence: "What should I do?" },

  learn: { meaning: "学习", sentence: "I learn English by listening." },
  listening: { meaning: "听；听力", sentence: "Listening is important for English." },
  understand: { meaning: "理解；听懂", sentence: "I can understand the main idea." },
  beginner: { meaning: "初学者；初级的", sentence: "This video is for beginners." },
  intermediate: { meaning: "中级的", sentence: "This is an intermediate lesson." },
  english: { meaning: "英语；英文", sentence: "I study English every day." },
  language: { meaning: "语言", sentence: "English is a useful language." },
  video: { meaning: "视频", sentence: "I watched an English video." },
  subtitle: { meaning: "字幕", sentence: "I used English subtitles today." },
  lesson: { meaning: "课程；一课", sentence: "This lesson is useful." },
  part: { meaning: "部分；第几部分", sentence: "This is part one." },
  way: { meaning: "方法；道路", sentence: "This is a good way to learn." },
  best: { meaning: "最好的", sentence: "This is the best way for me." },
  idea: { meaning: "想法；主意", sentence: "I understand the main idea." },
  main: { meaning: "主要的", sentence: "I understand the main idea." },
  important: { meaning: "重要的", sentence: "This word is important." },
  useful: { meaning: "有用的", sentence: "This sentence is useful." },
  remember: { meaning: "记得；记住", sentence: "I remember this word." },
  forget: { meaning: "忘记", sentence: "I forget this word sometimes." },
  practice: { meaning: "练习", sentence: "I practice English every day." },
  speak: { meaning: "说；讲话", sentence: "I want to speak English." },
  hear: { meaning: "听见", sentence: "I can hear the sentence." },
  listen: { meaning: "听", sentence: "I listen to English every day." },
  read: { meaning: "读；阅读", sentence: "I read a short sentence." },
  write: { meaning: "写", sentence: "I write a short journal." },
  watch: { meaning: "观看", sentence: "I watch one video today." },
  see: { meaning: "看见；明白", sentence: "I see the picture." },
  look: { meaning: "看；看起来", sentence: "Look at the picture." },
  say: { meaning: "说", sentence: "Could you say that again?" },
  tell: { meaning: "告诉", sentence: "Please tell me the answer." },
  ask: { meaning: "问；请求", sentence: "I ask a question." },
  answer: { meaning: "回答；答案", sentence: "I know the answer." },
  question: { meaning: "问题", sentence: "I have a question." },
  think: { meaning: "想；认为", sentence: "I think this is useful." },
  know: { meaning: "知道；认识", sentence: "I know this word." },
  feel: { meaning: "感觉", sentence: "I feel good today." },
  keep: { meaning: "保持；继续", sentence: "Keep going." },
  continue: { meaning: "继续", sentence: "I will continue tomorrow." },
  use: { meaning: "使用；用", sentence: "I use English at work." },
  make: { meaning: "做；制作；使得", sentence: "I make time to study." },
  take: { meaning: "拿；花费；乘坐", sentence: "Take a short break." },
  get: { meaning: "得到；变得；到达", sentence: "I get better every day." },
  give: { meaning: "给", sentence: "Please give me a minute." },
  help: { meaning: "帮助", sentence: "Can you help me?" },
  need: { meaning: "需要", sentence: "I need more practice." },

  nation: { meaning: "国家；民族", sentence: "Every nation has a history." },
  national: { meaning: "国家的；全国的", sentence: "This is a national park." },
  natural: { meaning: "自然的；天然的", sentence: "Natural English takes time." },
  nature: { meaning: "自然；大自然", sentence: "Nature is beautiful." },
  country: { meaning: "国家；乡村", sentence: "I live in this country." },
  state: { meaning: "州；状态", sentence: "I live in this state." },
  city: { meaning: "城市", sentence: "This city is busy." },
  world: { meaning: "世界", sentence: "English opens the world." },
  place: { meaning: "地方", sentence: "This is a good place." },
  people: { meaning: "人们", sentence: "Many people learn English." },
  person: { meaning: "人；个人", sentence: "He is a nice person." },
  family: { meaning: "家庭；家人", sentence: "My family is important to me." },
  friend: { meaning: "朋友", sentence: "My friend speaks English." },
  child: { meaning: "孩子", sentence: "The child is learning." },
  children: { meaning: "孩子们", sentence: "Children learn by listening." },
  teacher: { meaning: "老师", sentence: "The teacher speaks slowly." },
  student: { meaning: "学生", sentence: "I am an English student." },
  school: { meaning: "学校", sentence: "The child goes to school." },

  time: { meaning: "时间；次数", sentence: "I need more time." },
  day: { meaning: "一天；白天", sentence: "Today is a good day." },
  year: { meaning: "年", sentence: "I will study for one year." },
  first: { meaning: "第一；首先", sentence: "This is my first lesson." },
  last: { meaning: "最后的；上一个", sentence: "Last week was busy." },
  before: { meaning: "在……之前", sentence: "I study before work." },
  after: { meaning: "在……之后", sentence: "I study after work." },
  during: { meaning: "在……期间", sentence: "I listen during my break." },
  always: { meaning: "总是", sentence: "I always review." },
  usually: { meaning: "通常", sentence: "I usually study at night." },
  sometimes: { meaning: "有时候", sentence: "Sometimes I feel tired." },
  never: { meaning: "从不", sentence: "Never give up." },
  maybe: { meaning: "也许；可能", sentence: "Maybe I can try again." },
  really: { meaning: "真的；非常", sentence: "This is really useful." },

  new: { meaning: "新的", sentence: "This is a new word." },
  old: { meaning: "旧的；年老的", sentence: "This is an old video." },
  big: { meaning: "大的", sentence: "This is a big step." },
  small: { meaning: "小的", sentence: "Start with a small task." },
  little: { meaning: "小的；一点", sentence: "I understand a little." },
  long: { meaning: "长的；长时间", sentence: "This video is long." },
  short: { meaning: "短的", sentence: "Write a short sentence." },
  easy: { meaning: "容易的", sentence: "This lesson is easy." },
  hard: { meaning: "困难的；努力的", sentence: "English is hard, but I continue." },
  different: { meaning: "不同的", sentence: "This word is different." },
  same: { meaning: "相同的", sentence: "It is the same word." },
  right: { meaning: "正确的；右边", sentence: "That is the right answer." },
  left: { meaning: "左边；离开", sentence: "Turn left here." },
  inside: { meaning: "在里面", sentence: "The word is inside the sentence." },
  outside: { meaning: "在外面", sentence: "I walked outside today." },

  food: { meaning: "食物", sentence: "I bought food today." },
  meal: { meaning: "一餐；饭", sentence: "This meal is healthy." },
  breakfast: { meaning: "早餐", sentence: "I ate breakfast." },
  lunch: { meaning: "午餐", sentence: "I had lunch at work." },
  dinner: { meaning: "晚餐", sentence: "I cooked dinner." },
  buy: { meaning: "买", sentence: "I need to buy food." },
  sell: { meaning: "卖", sentence: "They sell vegetables here." },
  pay: { meaning: "付款；支付", sentence: "Can I pay by card?" },
  spend: { meaning: "花费；度过", sentence: "I spent ten dollars." },
  cost: { meaning: "花费；价格", sentence: "How much does it cost?" }
};

export function getWordHint(word: string): WordHint | undefined {
  const normalized = word.trim().toLowerCase();
  const direct = hints[normalized] || curatedWordHints[normalized] || basicWordHints[normalized];
  if (direct) {
    return direct;
  }
  const base =
    normalized.endsWith("ing")
      ? normalized.slice(0, -3)
      : normalized.endsWith("ed")
        ? normalized.slice(0, -2)
        : normalized.endsWith("s")
          ? normalized.slice(0, -1)
          : normalized;
  const candidates = new Set([
    base,
    normalized.endsWith("ies") ? `${normalized.slice(0, -3)}y` : "",
    normalized.endsWith("ied") ? `${normalized.slice(0, -3)}y` : "",
    normalized.endsWith("ing") ? normalized.slice(0, -3) : "",
    normalized.endsWith("ing") ? `${normalized.slice(0, -3)}e` : "",
    normalized.endsWith("ed") ? normalized.slice(0, -2) : "",
    normalized.endsWith("ed") ? `${normalized.slice(0, -1)}` : "",
    normalized.endsWith("s") ? normalized.slice(0, -1) : ""
  ].filter(Boolean));

  for (const candidate of candidates) {
    const hint = hints[candidate] || curatedWordHints[candidate] || basicWordHints[candidate];
    if (hint) {
      return hint;
    }
  }

  return undefined;
}
