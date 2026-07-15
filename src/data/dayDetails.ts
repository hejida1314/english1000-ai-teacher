import { TaskKind } from "./course";

export type TaskSupport = {
  title: string;
  items: string[];
};

const dayOneSupport: Partial<Record<TaskKind, TaskSupport>> = {
  input: {
    title: "怎么完成这一遍",
    items: [
      "打开 Dreaming English Beginner 第1集。",
      "第一遍不暂停、不查词、不记笔记。",
      "只问自己：大概讲什么？我听懂40%、60%还是80%？"
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
    items: [
      "I am tired.",
      "You are good.",
      "He is busy.",
      "She is happy.",
      "Today is good."
    ]
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
    items: ["每天只挑3到5句", "先模仿节奏", "再模仿发音", "不要求背下来"]
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
  if (day === 1 && dayOneSupport[kind]) {
    return dayOneSupport[kind];
  }
  return genericSupport[kind];
}
