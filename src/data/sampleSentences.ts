export type StudySentence = {
  id: string;
  english: string;
  chinese: string;
};

const daySentences: Record<number, StudySentence[]> = {
  1: [
    { id: "d1-1", english: "Hello.", chinese: "你好。" },
    { id: "d1-2", english: "My name is Jacob.", chinese: "我的名字是 Jacob。" },
    { id: "d1-3", english: "I study English today.", chinese: "我今天学习英语。" },
    { id: "d1-4", english: "I am learning slowly.", chinese: "我正在慢慢学习。" },
    { id: "d1-5", english: "I can do this.", chinese: "我能做到。" }
  ],
  2: [
    { id: "d2-1", english: "My name is Jacob.", chinese: "我的名字是 Jacob。" },
    { id: "d2-2", english: "I live in Alabama.", chinese: "我住在阿拉巴马。" },
    { id: "d2-3", english: "I work today.", chinese: "我今天工作。" },
    { id: "d2-4", english: "I study English every day.", chinese: "我每天学习英语。" },
    { id: "d2-5", english: "I am a beginner.", chinese: "我是初学者。" }
  ],
  3: [
    { id: "d3-1", english: "Hi, I'd like to schedule a maintenance appointment.", chinese: "你好，我想预约一次车辆保养。" },
    { id: "d3-2", english: "It's for my Kia Carnival.", chinese: "是我的 Kia Carnival。" },
    { id: "d3-3", english: "Just regular maintenance.", chinese: "只是常规保养。" },
    { id: "d3-4", english: "Is it covered under warranty?", chinese: "这个在保修范围内吗？" },
    { id: "d3-5", english: "Could you say that again a little more slowly?", chinese: "你可以再慢一点说一遍吗？" }
  ],
  4: [
    { id: "d4-1", english: "Can I have water, please?", chinese: "可以给我一杯水吗？" },
    { id: "d4-2", english: "I'd like beef and vegetables.", chinese: "我想要牛肉和蔬菜。" },
    { id: "d4-3", english: "No rice, please.", chinese: "不要米饭，谢谢。" },
    { id: "d4-4", english: "Can I get the check?", chinese: "可以给我账单吗？" },
    { id: "d4-5", english: "Thank you.", chinese: "谢谢。" }
  ],
  5: [
    { id: "d5-1", english: "Excuse me.", chinese: "不好意思。" },
    { id: "d5-2", english: "Where can I find olive oil?", chinese: "橄榄油在哪里可以找到？" },
    { id: "d5-3", english: "Which aisle is it in?", chinese: "它在哪个货架通道？" },
    { id: "d5-4", english: "Sorry, could you repeat that?", chinese: "不好意思，可以再说一遍吗？" },
    { id: "d5-5", english: "Thank you.", chinese: "谢谢。" }
  ],
  6: [
    { id: "d6-1", english: "I worked today.", chinese: "我今天工作了。" },
    { id: "d6-2", english: "I drove home.", chinese: "我开车回家了。" },
    { id: "d6-3", english: "I walked a lot.", chinese: "我走了很多路。" },
    { id: "d6-4", english: "I studied English.", chinese: "我学习了英语。" },
    { id: "d6-5", english: "I will continue tomorrow.", chinese: "我明天会继续。" }
  ],
  7: [
    { id: "d7-1", english: "My name is Jacob.", chinese: "我的名字是 Jacob。" },
    { id: "d7-2", english: "I live in the United States.", chinese: "我住在美国。" },
    { id: "d7-3", english: "This week I studied English.", chinese: "这周我学习了英语。" },
    { id: "d7-4", english: "I learned car, food, and grocery English.", chinese: "我学习了汽车、食物和超市英语。" },
    { id: "d7-5", english: "Next week I will continue.", chinese: "下周我会继续。" }
  ],
  8: [
    { id: "d8-1", english: "Hi, I'd like to make an appointment.", chinese: "你好，我想预约。" },
    { id: "d8-2", english: "I need to see a doctor.", chinese: "我需要看医生。" },
    { id: "d8-3", english: "Do you have anything available this week?", chinese: "这周有空的时间吗？" },
    { id: "d8-4", english: "Morning is better for me.", chinese: "上午对我更合适。" },
    { id: "d8-5", english: "I need to bring my insurance card.", chinese: "我需要带保险卡。" }
  ],
  9: [
    { id: "d9-1", english: "I'd like to open an account.", chinese: "我想开一个账户。" },
    { id: "d9-2", english: "I need help with my card.", chinese: "我的卡需要帮忙处理。" },
    { id: "d9-3", english: "Can I deposit cash?", chinese: "我可以存现金吗？" },
    { id: "d9-4", english: "Can I transfer money?", chinese: "我可以转账吗？" },
    { id: "d9-5", english: "Is there a fee?", chinese: "有手续费吗？" }
  ],
  10: [
    { id: "d10-1", english: "I have an appointment.", chinese: "我有预约。" },
    { id: "d10-2", english: "I'm here for my driver's license.", chinese: "我是来办驾照的。" },
    { id: "d10-3", english: "What documents do I need?", chinese: "我需要什么文件？" },
    { id: "d10-4", english: "Where should I wait?", chinese: "我应该在哪里等？" },
    { id: "d10-5", english: "What is the next step?", chinese: "下一步是什么？" }
  ],
  11: [
    { id: "d11-1", english: "Hi, this is Jacob.", chinese: "你好，我是 Jacob。" },
    { id: "d11-2", english: "I'm calling about my appointment.", chinese: "我打电话是关于我的预约。" },
    { id: "d11-3", english: "Could you repeat that?", chinese: "可以再说一遍吗？" },
    { id: "d11-4", english: "Could you speak a little more slowly?", chinese: "可以说慢一点吗？" },
    { id: "d11-5", english: "Let me confirm the time.", chinese: "让我确认一下时间。" }
  ],
  12: [
    { id: "d12-1", english: "I can do that.", chinese: "我可以做那个。" },
    { id: "d12-2", english: "I will check it.", chinese: "我会检查一下。" },
    { id: "d12-3", english: "I'll call you back.", chinese: "我会给你回电话。" },
    { id: "d12-4", english: "Can you send me a message?", chinese: "你可以给我发消息吗？" },
    { id: "d12-5", english: "I need a little more time.", chinese: "我需要多一点时间。" }
  ],
  13: [
    { id: "d13-1", english: "There is a problem.", chinese: "有一个问题。" },
    { id: "d13-2", english: "It doesn't work.", chinese: "它不能用。" },
    { id: "d13-3", english: "I don't know what happened.", chinese: "我不知道发生了什么。" },
    { id: "d13-4", english: "Can you take a look?", chinese: "你可以看一下吗？" },
    { id: "d13-5", english: "What should I do?", chinese: "我应该怎么办？" }
  ],
  14: [
    { id: "d14-1", english: "This week I practiced real-life English.", chinese: "这周我练习了真实生活英语。" },
    { id: "d14-2", english: "I practiced doctor, bank, DMV, phone, and work English.", chinese: "我练习了医生、银行、DMV、电话和工作英语。" },
    { id: "d14-3", english: "I can ask simple questions.", chinese: "我可以问简单的问题。" },
    { id: "d14-4", english: "I still need to speak more slowly and clearly.", chinese: "我还需要说得更慢、更清楚。" },
    { id: "d14-5", english: "Next week I will continue.", chinese: "下周我会继续。" }
  ]
};

const fallbackSentences: StudySentence[] = [
  {
    id: "fallback-1",
    english: "I watched today's lesson and understood the main idea.",
    chinese: "我看了今天的课程，并听懂了大概意思。"
  },
  {
    id: "fallback-2",
    english: "I don't need perfect English. I need useful English.",
    chinese: "我不需要完美英语，我需要有用的英语。"
  },
  {
    id: "fallback-3",
    english: "Could you say that again a little more slowly?",
    chinese: "你可以再慢一点说一遍吗？"
  }
];

export function getSentencesForDay(day: number): StudySentence[] {
  return daySentences[day] ?? fallbackSentences;
}
