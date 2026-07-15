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
};

export type CourseDay = {
  day: number;
  totalHours: number;
  level: string;
  phase: string;
  focus: string;
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
    level: "Level 1 / A1",
    phase: "Dreaming English Beginner",
    primary: "Dreaming English Beginner",
    secondary: "80 episodes in order, with replay",
    grammar: ["be verbs", "simple present", "yes/no questions", "basic pronouns"],
    output: ["self introduction", "today's routine", "family", "work"]
  },
  {
    start: 35,
    end: 84,
    level: "Level 1+ / A1",
    phase: "Dreaming English Intermediate",
    primary: "Dreaming English Intermediate",
    secondary: "intermediate comprehensible input",
    grammar: ["there is / there are", "can / can't", "want to", "basic past tense"],
    output: ["describe yesterday", "ask simple questions", "shopping", "weather"]
  },
  {
    start: 85,
    end: 150,
    level: "Level 2 / A2",
    phase: "Bluey Season 1",
    primary: "Bluey Season 1 in order",
    secondary: "family life English",
    grammar: ["past tense", "present continuous", "future with going to", "because"],
    output: ["restaurant", "grocery store", "doctor appointment", "car maintenance"]
  },
  {
    start: 151,
    end: 205,
    level: "Level 2+ / A2",
    phase: "Peppa Pig",
    primary: "Peppa Pig in order",
    secondary: "daily-life vocabulary and simple plots",
    grammar: ["comparatives", "should / have to", "present perfect basics", "if clauses"],
    output: ["explain a problem", "make an appointment", "small talk", "phone call"]
  },
  {
    start: 206,
    end: 275,
    level: "Level 3 / B1",
    phase: "TED-Ed",
    primary: "TED-Ed easy topics",
    secondary: "topics you actually care about",
    grammar: ["relative clauses", "passive voice", "reported speech", "topic transitions"],
    output: ["summarize a video", "give an opinion", "retell a movie scene", "compare choices"]
  },
  {
    start: 276,
    end: 334,
    level: "Level 4 / B1+",
    phase: "Modern Family",
    primary: "Modern Family selected episodes",
    secondary: "real sitcom speed and natural expressions",
    grammar: ["natural phrasal verbs", "conditionals", "softening phrases", "storytelling"],
    output: ["record a YouTube draft", "discuss news", "work conversation", "long-form opinion"]
  }
];

const lifeWordTopics = [
  "home and family",
  "work",
  "food",
  "shopping",
  "car maintenance",
  "doctor visit",
  "bank",
  "DMV",
  "weather",
  "time and schedule",
  "feelings",
  "phone calls",
  "restaurants",
  "directions",
  "technology",
  "money",
  "sports",
  "travel"
];

function getPhase(day: number): Phase {
  return phases.find((phase) => day >= phase.start && day <= phase.end) ?? phases[phases.length - 1];
}

function rotate<T>(items: T[], index: number): T {
  return items[index % items.length];
}

function resourceLabel(phase: Phase, day: number): string {
  if (phase.phase === "Dreaming English Beginner") {
    return `Dreaming English Beginner #${((day - 1) % 80) + 1}`;
  }
  if (phase.phase === "Dreaming English Intermediate") {
    return `Dreaming English Intermediate #${((day - 35) % 80) + 1}`;
  }
  if (phase.phase === "Bluey Season 1") {
    return `Bluey Season 1 Episode ${((day - 85) % 52) + 1}`;
  }
  if (phase.phase === "Peppa Pig") {
    return `Peppa Pig Episode ${((day - 151) % 52) + 1}`;
  }
  if (phase.phase === "TED-Ed") {
    return `TED-Ed topic #${((day - 206) % 70) + 1}`;
  }
  return `Modern Family selected episode #${((day - 276) % 24) + 1}`;
}

export function buildCourseDay(day: number): CourseDay {
  const phase = getPhase(day);
  const isReview = day % 7 === 0;
  const totalHours = day * 3;
  const checkpoint = totalHours % 99 === 0 ? `${Math.round(totalHours / 100) * 100}-hour self-check` : undefined;
  const grammar = rotate(phase.grammar, day);
  const output = rotate(phase.output, day);
  const wordTopic = rotate(lifeWordTopics, day);
  const resource = resourceLabel(phase, day);

  const tasks: DailyTask[] = isReview
    ? [
        {
          id: `d${day}-review-input`,
          kind: "review",
          title: "Review this week's input",
          minutes: 50,
          detail: "Replay the easiest and hardest clips from this week. No new material."
        },
        {
          id: `d${day}-review-words`,
          kind: "vocabulary",
          title: "Review saved words",
          minutes: 30,
          detail: "Use the word review buttons: forgot, hard, know, easy."
        },
        {
          id: `d${day}-review-speaking`,
          kind: "output",
          title: "Weekly speaking recap",
          minutes: 35,
          detail: "Record a 2-minute recap in simple English. Mistakes are allowed."
        },
        {
          id: `d${day}-review-writing`,
          kind: "review",
          title: "Weekly journal",
          minutes: 25,
          detail: "Write 5-10 sentences about this week."
        },
        {
          id: `d${day}-review-ai`,
          kind: "checkpoint",
          title: "Ask AI Teacher",
          minutes: 40,
          detail: "Use the AI prompt for a light test and next-week adjustment."
        }
      ]
    : [
        {
          id: `d${day}-input-primary`,
          kind: "input",
          title: resource,
          minutes: 45,
          detail: "Watch once without pausing. Focus on meaning, not translation."
        },
        {
          id: `d${day}-intensive`,
          kind: "intensive",
          title: "Intensive listening",
          minutes: 35,
          detail: "Replay a short segment. Use slower speed and sentence loop for hard parts."
        },
        {
          id: `d${day}-shadowing`,
          kind: "shadowing",
          title: "Shadowing",
          minutes: 20,
          detail: "Pick 3-5 useful sentences. Copy rhythm first, pronunciation second."
        },
        {
          id: `d${day}-vocab`,
          kind: "vocabulary",
          title: `Words: ${wordTopic}`,
          minutes: 20,
          detail: "Save 10 useful words from today's input or life topic. Avoid rare words."
        },
        {
          id: `d${day}-grammar`,
          kind: "grammar",
          title: `Grammar: ${grammar}`,
          minutes: 20,
          detail: "Learn one pattern only. Find it in today's input."
        },
        {
          id: `d${day}-output`,
          kind: "output",
          title: `Output: ${output}`,
          minutes: 40,
          detail: "Speak first, then write 5-10 sentences. Clarity beats perfection."
        }
      ];

  return {
    day,
    totalHours,
    level: phase.level,
    phase: phase.phase,
    focus: `${phase.primary} + ${phase.secondary}`,
    isReview,
    checkpoint,
    tasks,
    aiPrompt: [
      `I completed Day ${day} of English1000 AI Teacher.`,
      `Level: ${phase.level}. Phase: ${phase.phase}.`,
      `Today's focus: ${resource}. Grammar: ${grammar}. Output: ${output}.`,
      "Please test me in simple English, correct my Chinese-English mistakes gently, and give me tomorrow's adjustment."
    ].join("\n")
  };
}

export const COURSE_DAYS = Array.from({ length: 334 }, (_, index) => buildCourseDay(index + 1));

export const ROADMAP = phases.map((phase) => ({
  label: phase.level,
  days: `${phase.start}-${phase.end}`,
  title: phase.phase,
  focus: `${phase.primary} + ${phase.secondary}`,
  exit: phase.end < 286 ? "Move forward when you understand about 70-80% without Chinese subtitles." : "Finish with real English input and weekly spoken summaries."
}));
