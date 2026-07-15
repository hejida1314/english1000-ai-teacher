export type TaskKind =
  | "input"
  | "intensive"
  | "shadowing"
  | "vocabulary"
  | "grammar"
  | "output"
  | "review"
  | "checkpoint";

export type DailyTask = {
  id: string;
  kind: TaskKind;
  title: string;
  minutes: number;
  detail: string;
  action?: string;
};

export type CourseDay = {
  day: number;
  totalHours: number;
  level: string;
  phase: string;
  focus: string;
  resourceUrl: string;
  isReview: boolean;
  checkpoint?: string;
  tasks: DailyTask[];
  aiPrompt: string;
};

type Phase = {
  start: number;
  end: number;
  level: string;
  phase: string;
  primary: string;
  secondary: string;
  grammar: string[];
  output: string[];
};

const phases: Phase[] = [
  {
    start: 1,
    end: 34,
    level: "第一阶段 / A1",
    phase: "Dreaming English Beginner",
    primary: "Dreaming English Beginner",
    secondary: "80集按顺序，先建立英语耳朵，不查词、不硬背",
    grammar: ["be动词：I am / You are / He is", "一般现在时：I work / I study", "一般疑问句：Are you...? / Do you...?", "人称代词：I / you / he / she / we"],
    output: ["30秒自我介绍", "描述今天做了什么", "介绍家人", "说说你的工作"]
  },
  {
    start: 35,
    end: 84,
    level: "第二阶段 / A1+",
    phase: "Dreaming English Intermediate",
    primary: "Dreaming English Intermediate",
    secondary: "中级可理解输入，继续建立听力，不急着看美剧",
    grammar: ["there is / there are", "can / can't", "want to", "一般过去时基础"],
    output: ["描述昨天发生什么", "问一个简单问题", "购物英语", "天气和时间"]
  },
  {
    start: 85,
    end: 150,
    level: "第三阶段 / A2",
    phase: "Bluey Season 1",
    primary: "Bluey Season 1 in order",
    secondary: "家庭生活英语，英文字幕为主，逐步减少依赖字幕",
    grammar: ["一般过去时", "现在进行时", "going to 将来时", "because 说明原因"],
    output: ["餐馆点餐", "超市询问", "预约医生", "预约汽车保养"]
  },
  {
    start: 151,
    end: 205,
    level: "第四阶段 / A2+",
    phase: "Peppa Pig",
    primary: "Peppa Pig in order",
    secondary: "补生活词汇和简单剧情表达，不长期停留在儿童内容",
    grammar: ["比较级", "should / have to", "现在完成时入门", "if 条件句"],
    output: ["解释一个问题", "预约时间", "日常寒暄", "打电话"]
  },
  {
    start: 206,
    end: 275,
    level: "第五阶段 / B1",
    phase: "TED-Ed",
    primary: "TED-Ed easy topics",
    secondary: "选择你感兴趣的话题：科技、历史、AI、NBA、美股",
    grammar: ["定语从句", "被动语态", "转述别人说的话", "观点衔接"],
    output: ["总结一个视频", "表达观点", "复述一个片段", "比较两个选择"]
  },
  {
    start: 276,
    end: 334,
    level: "第六阶段 / B1+",
    phase: "Modern Family",
    primary: "Modern Family selected episodes",
    secondary: "真实语速和自然表达，开始接近美剧和真实YouTube",
    grammar: ["常见短语动词", "条件句", "委婉表达", "讲故事结构"],
    output: ["录一段YouTube草稿", "讨论新闻", "工作对话", "长一点的观点表达"]
  }
];

const lifeWordTopics = [
  "家庭和日常",
  "工作",
  "食物",
  "购物",
  "汽车保养",
  "看医生",
  "银行",
  "DMV",
  "天气",
  "时间和预约",
  "情绪",
  "电话",
  "餐馆",
  "问路",
  "科技",
  "金钱",
  "体育",
  "旅行"
];

function getPhase(day: number): Phase {
  return phases.find((phase) => day >= phase.start && day <= phase.end) ?? phases[phases.length - 1];
}

function rotate<T>(items: T[], index: number): T {
  return items[index % items.length];
}

function resourceLabel(phase: Phase, day: number): string {
  if (phase.phase === "Dreaming English Beginner") {
    return `Dreaming English Beginner 第 ${((day - 1) % 80) + 1} 集`;
  }
  if (phase.phase === "Dreaming English Intermediate") {
    return `Dreaming English Intermediate 第 ${((day - 35) % 80) + 1} 集`;
  }
  if (phase.phase === "Bluey Season 1") {
    return `Bluey 第一季第 ${((day - 85) % 52) + 1} 集`;
  }
  if (phase.phase === "Peppa Pig") {
    return `Peppa Pig 第 ${((day - 151) % 52) + 1} 集`;
  }
  if (phase.phase === "TED-Ed") {
    return `TED-Ed 兴趣话题第 ${((day - 206) % 70) + 1} 个`;
  }
  return `Modern Family 精选第 ${((day - 276) % 24) + 1} 集`;
}

function resourceUrl(phase: Phase, day: number): string {
  const query = encodeURIComponent(resourceLabel(phase, day));

  if (phase.phase === "Dreaming English Beginner" || phase.phase === "Dreaming English Intermediate") {
    return `https://www.youtube.com/results?search_query=${query}`;
  }

  if (phase.phase === "Bluey Season 1") {
    return `https://www.disneyplus.com/search?q=${encodeURIComponent("Bluey")}`;
  }

  if (phase.phase === "Peppa Pig") {
    return `https://www.youtube.com/results?search_query=${query}`;
  }

  if (phase.phase === "TED-Ed") {
    return "https://ed.ted.com/lessons";
  }

  return `https://www.hulu.com/search?q=${encodeURIComponent("Modern Family")}`;
}

export function buildCourseDay(day: number): CourseDay {
  const phase = getPhase(day);
  const isReview = day % 7 === 0;
  const totalHours = day * 3;
  const checkpoint = totalHours % 99 === 0 ? `${Math.round(totalHours / 100) * 100}小时自测` : undefined;
  const grammar = rotate(phase.grammar, day);
  const output = rotate(phase.output, day);
  const wordTopic = rotate(lifeWordTopics, day);
  const resource = resourceLabel(phase, day);
  const url = resourceUrl(phase, day);

  const tasks: DailyTask[] = isReview
    ? [
        {
          id: `d${day}-review-input`,
          kind: "review",
          title: "复习本周输入",
          minutes: 50,
          detail: "重看本周最简单和最难的片段。今天不学新内容。",
          action: "只复习，不加新材料。"
        },
        {
          id: `d${day}-review-words`,
          kind: "vocabulary",
          title: "复习生词本",
          minutes: 30,
          detail: "用“忘了 / 困难 / 会了 / 很熟”给单词打分。",
          action: "优先复习到期单词。"
        },
        {
          id: `d${day}-review-speaking`,
          kind: "output",
          title: "本周口语复盘",
          minutes: 35,
          detail: "用简单英语录2分钟，说说这周学了什么。说错没关系。",
          action: "录音，不要只在脑子里想。"
        },
        {
          id: `d${day}-review-writing`,
          kind: "review",
          title: "本周英文日记",
          minutes: 25,
          detail: "写5到10句，记录本周生活和学习。",
          action: "短句即可，别追求高级。"
        },
        {
          id: `d${day}-review-ai`,
          kind: "checkpoint",
          title: "AI老师小测",
          minutes: 40,
          detail: "复制今天的AI提示词，让AI测试你并调整下周任务。",
          action: "复制提示词，发给AI。"
        }
      ]
    : [
        {
          id: `d${day}-input-primary`,
          kind: "input",
          title: resource,
          minutes: 45,
          detail: "第一遍不暂停、不查词，靠画面理解大意。",
          action: "完成后估计理解度：40%、60%还是80%。"
        },
        {
          id: `d${day}-intensive`,
          kind: "intensive",
          title: "第二遍精听",
          minutes: 35,
          detail: "开英文字幕重看，挑一小段反复听。不要开中文字幕。",
          action: "只处理最常出现的词，生僻词放过。"
        },
        {
          id: `d${day}-shadowing`,
          kind: "shadowing",
          title: "跟读模仿",
          minutes: 20,
          detail: "挑3到5句有用句子，模仿节奏和语气。",
          action: "不用背，像演员一样模仿。"
        },
        {
          id: `d${day}-vocab`,
          kind: "vocabulary",
          title: `今日10词：${wordTopic}`,
          minutes: 20,
          detail: "只记今天视频里反复出现、生活里真会用的词。",
          action: "最多10个，不许贪多。"
        },
        {
          id: `d${day}-grammar`,
          kind: "grammar",
          title: `语法15分钟：${grammar}`,
          minutes: 20,
          detail: "今天只学一个语法点，并在视频里找例子。",
          action: "会认出来就行，不刷题。"
        },
        {
          id: `d${day}-output`,
          kind: "output",
          title: `输出练习：${output}`,
          minutes: 40,
          detail: "先开口说，再写5到10句。清楚比完美重要。",
          action: "录30秒到2分钟，保留给以后对比。"
        }
      ];

  return {
    day,
    totalHours,
    level: phase.level,
    phase: phase.phase,
    focus: `${phase.primary}：${phase.secondary}`,
    resourceUrl: url,
    isReview,
    checkpoint,
    tasks,
    aiPrompt: [
      `我完成了 English1000 第 ${day} 天。`,
      `阶段：${phase.level}。课程：${phase.phase}。`,
      `今天内容：${resource}。语法：${grammar}。输出：${output}。`,
      day <= 7 ? "这是第一周训练，请优先测试：自我介绍、车子保养、点餐、超市问路、描述一天。" : "",
      "请用简单英语测试我，温和纠正我的中式英语，并告诉我明天怎么调整。"
    ].filter(Boolean).join("\n")
  };
}

export const COURSE_DAYS = Array.from({ length: 334 }, (_, index) => buildCourseDay(index + 1));

export const ROADMAP = phases.map((phase) => ({
  label: phase.level,
  days: `${phase.start}-${phase.end}`,
  title: phase.phase,
  focus: `${phase.primary} + ${phase.secondary}`,
  exit: phase.end < 276 ? "不用中文字幕能理解60%到70%，再进入下一阶段。" : "用真实英语内容完成复盘，开始录自己的英文表达。"
}));
