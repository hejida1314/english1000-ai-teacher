export type StudySentence = {
  id: string;
  english: string;
  chinese: string;
};

export const SAMPLE_SENTENCES: StudySentence[] = [
  {
    id: "s1",
    english: "I'd like to schedule a maintenance appointment.",
    chinese: "我想预约一次车辆保养。"
  },
  {
    id: "s2",
    english: "Could you say that again a little more slowly?",
    chinese: "你可以再慢一点说一遍吗？"
  },
  {
    id: "s3",
    english: "I watched today's lesson and understood the main idea.",
    chinese: "我看了今天的课程，并听懂了大概意思。"
  },
  {
    id: "s4",
    english: "I don't need perfect English. I need useful English.",
    chinese: "我不需要完美英语，我需要有用的英语。"
  },
  {
    id: "s5",
    english: "Where can I find olive oil?",
    chinese: "橄榄油在哪里可以找到？"
  },
  {
    id: "s6",
    english: "Can I have water, please?",
    chinese: "可以给我一杯水吗？"
  }
];
