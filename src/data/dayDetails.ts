import { TaskKind } from "./course";

export type TaskSupport = {
  title: string;
  items: string[];
};

const firstWeekSupport: Record<number, Partial<Record<TaskKind, TaskSupport>>> = {
  1: {
    input: {
      title: "怎么完成这一遍",
      items: [
        "打开 Dreaming English Beginner 第1集。",
        "第一遍不暂停、不查词、不记笔记，只靠画面理解。",
        "结束后只问自己：大概讲什么？我听懂40%、60%还是80%？"
      ]
    },
    intensive: {
      title: "第二遍规则",
      items: [
        "开英文字幕，不开中文字幕。",
        "遇到反复出现的词才记下来。",
        "听不懂的句子最多重复3遍，别卡死。"
      ]
    },
    shadowing: {
      title: "跟读模板",
      items: [
        "Hello.",
        "My name is Jacob.",
        "I study English today.",
        "I am learning slowly.",
        "I can do this."
      ]
    },
    vocabulary: {
      title: "Day 1 今日10词",
      items: ["I", "you", "he", "she", "go", "come", "want", "like", "good", "today"]
    },
    grammar: {
      title: "Day 1 语法：be动词",
      items: ["I am tired.", "You are good.", "He is busy.", "She is happy.", "Today is good."]
    },
    output: {
      title: "30秒口语 + 5句日记",
      items: [
        "Hello. My name is Jacob.",
        "I live in the United States.",
        "Today I studied English.",
        "I watched Dreaming English.",
        "I am tired, but I am happy."
      ]
    }
  },
  2: {
    input: {
      title: "今天目标：介绍自己",
      items: [
        "继续 Dreaming English Beginner 第2集。",
        "先听懂剧情，不追求每个词。",
        "听完后用中文说出这一集大概内容，再进入第二遍。"
      ]
    },
    intensive: {
      title: "精听重点",
      items: [
        "留意 I am / You are / My name is 这种简单句。",
        "只精听5分钟，不要整集逐句暂停。",
        "把最容易开口的3句收藏。"
      ]
    },
    shadowing: {
      title: "跟读模板",
      items: [
        "My name is Jacob.",
        "I live in Alabama.",
        "I work today.",
        "I study English every day.",
        "I am a beginner."
      ]
    },
    vocabulary: {
      title: "Day 2 今日10词",
      items: ["my", "your", "name", "live", "work", "study", "home", "tired", "happy", "now"]
    },
    grammar: {
      title: "Day 2 语法：I am / You are",
      items: [
        "I am Jacob.",
        "I am at home.",
        "You are my teacher.",
        "My name is Jacob.",
        "I am tired now."
      ]
    },
    output: {
      title: "今天说这段",
      items: [
        "My name is Jacob.",
        "I live in the United States.",
        "I work today.",
        "I study English at night.",
        "I am tired, but I will continue."
      ]
    }
  },
  3: {
    input: {
      title: "今天目标：车子保养英语",
      items: [
        "Dreaming 继续按顺序看一集。",
        "看完后切到美国生活任务：预约车辆保养。",
        "今天不追求说长句，只要能说出预约目的。"
      ]
    },
    intensive: {
      title: "精听重点",
      items: [
        "听到 appointment / service / tomorrow 这类词时停一下。",
        "把 I would like to... 当成整块来记。",
        "今天只练一个真实场景：预约保养。"
      ]
    },
    shadowing: {
      title: "Kia保养跟读",
      items: [
        "Hi, I'd like to schedule a maintenance appointment.",
        "It's for my Kia Carnival.",
        "Just regular maintenance.",
        "Is it covered under warranty?",
        "Thank you."
      ]
    },
    vocabulary: {
      title: "Day 3 今日10词",
      items: ["car", "appointment", "oil", "tire", "service", "tomorrow", "morning", "afternoon", "possible", "thank you"]
    },
    grammar: {
      title: "Day 3 语法：I'd like to...",
      items: [
        "I'd like to schedule an appointment.",
        "I'd like to come tomorrow.",
        "It's for my car.",
        "Is it covered?",
        "Could you repeat that?"
      ]
    },
    output: {
      title: "真实任务脚本",
      items: [
        "Hi, I'd like to schedule a maintenance appointment.",
        "It's for my Kia Carnival.",
        "Tomorrow morning, if possible.",
        "Just regular maintenance.",
        "Could you say that again a little more slowly?"
      ]
    }
  },
  4: {
    input: {
      title: "今天目标：点餐不慌",
      items: [
        "Dreaming Beginner 按顺序继续。",
        "第二段学习放到餐馆场景。",
        "今天练会 Can I have... 和 I'd like..."
      ]
    },
    intensive: {
      title: "精听重点",
      items: [
        "听英语时留意 want / have / please。",
        "看到食物词不用全背，只背自己常吃的。",
        "把点餐句练到不用想。"
      ]
    },
    shadowing: {
      title: "点餐跟读",
      items: [
        "Can I have a water, please?",
        "I'd like beef and vegetables.",
        "No rice, please.",
        "Can I get the check?",
        "Thank you."
      ]
    },
    vocabulary: {
      title: "Day 4 今日10词",
      items: ["water", "beef", "rice", "potato", "egg", "vegetable", "order", "have", "please", "check"]
    },
    grammar: {
      title: "Day 4 语法：Can I have...",
      items: [
        "Can I have water?",
        "Can I have beef?",
        "I'd like potatoes.",
        "No rice, please.",
        "Can I get the check?"
      ]
    },
    output: {
      title: "今天说这段",
      items: [
        "Hi, can I have water, please?",
        "I'd like beef, eggs, and vegetables.",
        "No rice, please.",
        "Can I get the check?",
        "Thank you."
      ]
    }
  },
  5: {
    input: {
      title: "今天目标：超市问路",
      items: [
        "Dreaming Beginner 继续一集。",
        "真实任务：去 Walmart / 超市问一个位置。",
        "今天只要敢问一句就算赢。"
      ]
    },
    intensive: {
      title: "精听重点",
      items: [
        "重点练 Where can I find...?",
        "听不懂对方回答时，用 Could you repeat that?",
        "别追求完美，先把问题问出去。"
      ]
    },
    shadowing: {
      title: "超市跟读",
      items: [
        "Excuse me.",
        "Where can I find olive oil?",
        "Which aisle is it in?",
        "Could you repeat that?",
        "Thank you."
      ]
    },
    vocabulary: {
      title: "Day 5 今日10词",
      items: ["where", "find", "aisle", "milk", "bread", "price", "bag", "receipt", "card", "cash"]
    },
    grammar: {
      title: "Day 5 语法：Where can I...",
      items: [
        "Where can I find milk?",
        "Where can I find bread?",
        "Which aisle is it in?",
        "Can I pay by card?",
        "Can I get a receipt?"
      ]
    },
    output: {
      title: "真实任务脚本",
      items: [
        "Excuse me.",
        "Where can I find olive oil?",
        "Which aisle is it in?",
        "Sorry, could you repeat that?",
        "Thank you."
      ]
    }
  },
  6: {
    input: {
      title: "今天目标：描述一天",
      items: [
        "Dreaming Beginner 继续。",
        "今天开始把工作、开车、走路、学习连成一段。",
        "不需要复杂语法，只要能说清楚今天做了什么。"
      ]
    },
    intensive: {
      title: "精听重点",
      items: [
        "听到过去发生的动作时停一下。",
        "重点记 worked / drove / walked / studied。",
        "今天输出要用过去式，但错了也没关系。"
      ]
    },
    shadowing: {
      title: "一天生活跟读",
      items: [
        "I worked today.",
        "I drove home.",
        "I walked a lot.",
        "I studied English.",
        "I will continue tomorrow."
      ]
    },
    vocabulary: {
      title: "Day 6 今日10词",
      items: ["start", "finish", "drive", "walk", "call", "message", "boss", "customer", "break", "later"]
    },
    grammar: {
      title: "Day 6 语法：一般过去时入门",
      items: [
        "I worked today.",
        "I studied English.",
        "I walked after work.",
        "I called my friend.",
        "I finished Day 6."
      ]
    },
    output: {
      title: "今天说这段",
      items: [
        "Today I worked.",
        "I drove home.",
        "I ate beef, eggs, and potatoes.",
        "I watched Dreaming English.",
        "I finished Day 6."
      ]
    }
  },
  7: {
    review: {
      title: "第一周复习日",
      items: [
        "不要加新视频，先复习 Day 1 到 Day 6。",
        "重听最难的一集10分钟。",
        "把本周最常用的20个词读一遍。",
        "录一段60秒英语：介绍自己、工作、吃饭、车子保养、超市问路。"
      ]
    },
    checkpoint: {
      title: "AI老师测试",
      items: [
        "复制提示词给AI：我完成English1000第一周，请用简单英语测试我。",
        "让AI问你5个问题：name / work / food / car / grocery。",
        "回答不出来就让AI给你最简单的答案模板。",
        "记录下周最需要加强的一个场景。"
      ]
    },
    output: {
      title: "第一周总结模板",
      items: [
        "My name is Jacob.",
        "I live in the United States.",
        "This week I studied English.",
        "I learned car, food, and grocery English.",
        "Next week I will continue."
      ]
    }
  }
};

const secondWeekSupport: Record<number, Partial<Record<TaskKind, TaskSupport>>> = {
  8: {
    input: {
      title: "第二周开始：继续Dreaming",
      items: [
        "继续 Dreaming English Beginner，按顺序看下一集。",
        "第一遍还是不暂停，不查词。",
        "从今天开始，每天多加一个真实美国生活场景。"
      ]
    },
    shadowing: {
      title: "看医生预约跟读",
      items: [
        "Hi, I'd like to make an appointment.",
        "I need to see a doctor.",
        "Do you have anything available this week?",
        "What time works?",
        "Thank you."
      ]
    },
    vocabulary: {
      title: "Day 8 今日10词",
      items: ["doctor", "appointment", "available", "week", "pain", "insurance", "clinic", "time", "call", "thank you"]
    },
    grammar: {
      title: "Day 8 语法：I need to...",
      items: [
        "I need to see a doctor.",
        "I need to make an appointment.",
        "I need to call the clinic.",
        "I need to bring my insurance card.",
        "I need to go this week."
      ]
    },
    output: {
      title: "医生预约脚本",
      items: [
        "Hi, I'd like to make an appointment.",
        "I need to see a doctor.",
        "Do you have anything available this week?",
        "Morning is better for me.",
        "Thank you."
      ]
    }
  },
  9: {
    input: {
      title: "今天目标：银行英语",
      items: [
        "Dreaming 继续一集，先完成输入。",
        "真实场景切到银行：账户、卡、付款、转账。",
        "今天只练清楚表达需求。"
      ]
    },
    shadowing: {
      title: "银行跟读",
      items: [
        "I'd like to open an account.",
        "I need help with my card.",
        "Can I deposit cash?",
        "Can I transfer money?",
        "Could you help me with this?"
      ]
    },
    vocabulary: {
      title: "Day 9 今日10词",
      items: ["bank", "account", "card", "deposit", "cash", "transfer", "money", "fee", "balance", "help"]
    },
    grammar: {
      title: "Day 9 语法：Can I...?",
      items: [
        "Can I deposit cash?",
        "Can I transfer money?",
        "Can I check my balance?",
        "Can I use this card?",
        "Can I get help?"
      ]
    },
    output: {
      title: "银行任务脚本",
      items: [
        "Hi, I need help with my card.",
        "Can I check my balance?",
        "Is there a fee?",
        "Could you help me with this?",
        "Thank you."
      ]
    }
  },
  10: {
    input: {
      title: "今天目标：DMV不慌",
      items: [
        "先完成Dreaming输入。",
        "今天真实场景：驾照、登记、预约、排队。",
        "DMV英语不用高级，关键是问清楚下一步。"
      ]
    },
    shadowing: {
      title: "DMV跟读",
      items: [
        "I have an appointment.",
        "I'm here for my driver's license.",
        "What documents do I need?",
        "Where should I wait?",
        "What is the next step?"
      ]
    },
    vocabulary: {
      title: "Day 10 今日10词",
      items: ["DMV", "license", "document", "registration", "appointment", "wait", "line", "number", "form", "next"]
    },
    grammar: {
      title: "Day 10 语法：What do I need...?",
      items: [
        "What documents do I need?",
        "What form do I need?",
        "What is the next step?",
        "Where should I wait?",
        "Do I need an appointment?"
      ]
    },
    output: {
      title: "DMV任务脚本",
      items: [
        "Hi, I have an appointment.",
        "I'm here for my driver's license.",
        "What documents do I need?",
        "Where should I wait?",
        "Thank you."
      ]
    }
  },
  11: {
    input: {
      title: "今天目标：电话英语",
      items: [
        "Dreaming继续一集。",
        "今天练电话开场、听不懂、重复确认。",
        "电话英语最重要的是慢一点、确认一遍。"
      ]
    },
    shadowing: {
      title: "电话跟读",
      items: [
        "Hi, this is Jacob.",
        "I'm calling about my appointment.",
        "Could you repeat that?",
        "Could you speak a little more slowly?",
        "Let me confirm that."
      ]
    },
    vocabulary: {
      title: "Day 11 今日10词",
      items: ["phone", "call", "repeat", "slowly", "confirm", "number", "message", "appointment", "hold", "again"]
    },
    grammar: {
      title: "Day 11 语法：Could you...?",
      items: [
        "Could you repeat that?",
        "Could you speak slowly?",
        "Could you send me a message?",
        "Could you confirm the time?",
        "Could you help me?"
      ]
    },
    output: {
      title: "电话任务脚本",
      items: [
        "Hi, this is Jacob.",
        "I'm calling about my appointment.",
        "Could you repeat that?",
        "Could you speak a little more slowly?",
        "Let me confirm the time."
      ]
    }
  },
  12: {
    input: {
      title: "今天目标：工作沟通",
      items: [
        "Dreaming继续一集。",
        "今天把英语拉回工作：老板、顾客、消息、稍后回复。",
        "先练短句，不追求像美国人一样快。"
      ]
    },
    shadowing: {
      title: "工作跟读",
      items: [
        "I can do that.",
        "I will check it.",
        "I'll call you back.",
        "Can you send me a message?",
        "I need a little more time."
      ]
    },
    vocabulary: {
      title: "Day 12 今日10词",
      items: ["work", "boss", "customer", "message", "check", "call", "time", "later", "problem", "help"]
    },
    grammar: {
      title: "Day 12 语法：will",
      items: [
        "I will check it.",
        "I will call you back.",
        "I will do it later.",
        "I will send a message.",
        "I will ask my boss."
      ]
    },
    output: {
      title: "工作任务脚本",
      items: [
        "I can do that.",
        "I will check it.",
        "I need a little more time.",
        "I'll call you back later.",
        "Thank you."
      ]
    }
  },
  13: {
    input: {
      title: "今天目标：描述问题",
      items: [
        "继续Dreaming输入。",
        "今天练一个核心能力：说清楚哪里有问题。",
        "美国生活里，能描述问题比会背单词更重要。"
      ]
    },
    shadowing: {
      title: "描述问题跟读",
      items: [
        "There is a problem.",
        "It doesn't work.",
        "I don't know what happened.",
        "Can you take a look?",
        "What should I do?"
      ]
    },
    vocabulary: {
      title: "Day 13 今日10词",
      items: ["problem", "work", "happen", "look", "fix", "wrong", "help", "try", "again", "should"]
    },
    grammar: {
      title: "Day 13 语法：There is...",
      items: [
        "There is a problem.",
        "There is a noise.",
        "There is no water.",
        "There is no signal.",
        "There is something wrong."
      ]
    },
    output: {
      title: "问题描述脚本",
      items: [
        "There is a problem.",
        "It doesn't work.",
        "I don't know what happened.",
        "Can you take a look?",
        "What should I do?"
      ]
    }
  },
  14: {
    review: {
      title: "第二周复习日",
      items: [
        "复习 Day 8 到 Day 13，不加新视频。",
        "把医生、银行、DMV、电话、工作五个脚本各读一遍。",
        "挑最怕的一个场景，录音60秒。",
        "记录下周最需要加强的场景。"
      ]
    },
    checkpoint: {
      title: "AI老师第二周测试",
      items: [
        "复制提示词给AI：我完成English1000第二周，请测试美国生活场景。",
        "让AI随机扮演医生前台、银行员工、DMV工作人员、老板。",
        "回答不出来时，让AI给你最简单版本。",
        "最后让AI给你下周建议。"
      ]
    },
    output: {
      title: "第二周总结模板",
      items: [
        "This week I practiced real-life English.",
        "I practiced doctor, bank, DMV, phone, and work English.",
        "I can ask simple questions.",
        "I still need to speak more slowly and clearly.",
        "Next week I will continue."
      ]
    }
  }
};

const genericSupport: Partial<Record<TaskKind, TaskSupport>> = {
  input: {
    title: "输入规则",
    items: ["不暂停", "不查词", "看懂剧情和画面", "结束后估计理解度"]
  },
  intensive: {
    title: "精听规则",
    items: ["只精听一小段", "先英文字幕", "难句循环3遍", "不要开中文字幕"]
  },
  shadowing: {
    title: "跟读规则",
    items: ["每天只挑3到5句", "先模仿节奏", "再模仿发音", "不要追求背下来"]
  },
  vocabulary: {
    title: "记词规则",
    items: ["最多10个", "优先高频词", "必须来自视频或生活", "生僻词先放过"]
  },
  grammar: {
    title: "语法规则",
    items: ["一天只学一个点", "看懂即可", "去视频里找例句", "不刷题"]
  },
  output: {
    title: "输出规则",
    items: ["先说30秒", "再写5句", "允许语法错误", "每周回听一次"]
  },
  review: {
    title: "复习规则",
    items: ["不加新材料", "重看本周内容", "整理最常见错误", "轻松收尾"]
  },
  checkpoint: {
    title: "AI老师规则",
    items: ["复制提示词", "让AI用简单英语问你", "不会就用中文问", "记录明天调整"]
  }
};

export function getTaskSupport(day: number, kind: TaskKind): TaskSupport | undefined {
  return firstWeekSupport[day]?.[kind] ?? secondWeekSupport[day]?.[kind] ?? genericSupport[kind];
}
