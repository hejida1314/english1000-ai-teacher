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
  should: { meaning: "应该", sentence: "What should I do?" }
};

export function getWordHint(word: string): WordHint | undefined {
  return hints[word.trim().toLowerCase()];
}
