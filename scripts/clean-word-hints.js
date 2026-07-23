const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.join(__dirname, "..", "web-lite", "basic-word-hints.js");
const code = fs.readFileSync(file, "utf8");
const sandbox = { window: {} };

vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: file });

const hints = sandbox.window.BASIC_WORD_HINTS || {};

const badMarkers = [
  "DOS",
  "批处理",
  "信息论",
  "输入终端",
  "智能终端",
  "内捕获",
  "地址转换器",
  "异常传输",
  "自动订票",
  "后端",
  "总线允许",
  "自治系统",
  "高级系统",
  "辅助存储器",
  "作废字符",
  "异常数据",
  "乱码"
];

const overrides = {
  be: ["是；成为；存在", "I want to be better."],
  it: ["它；这件事", "It is important."],
  for: ["为了；给；持续", "This lesson is for me."],
  at: ["在；向；以某时间", "I start at eight."],
  as: ["作为；像；当...时", "I work as usual."],
  can: ["能；可以", "I can understand this."],
  if: ["如果；是否", "If possible, I want tomorrow."],
  more: ["更多；更", "I need more practice."],
  find: ["找到；发现", "Where can I find olive oil?"],
  call: ["打电话；称呼；叫", "I need to call the clinic."],
  country: ["国家；乡村", "Which country are you from?"],
  help: ["帮助；帮忙", "Could you help me?"],
  power: ["力量；电力；权力", "The phone has no power."],
  include: ["包括；包含", "Does it include tax?"],
  type: ["类型；打字", "What type of video is this?"],
  sort: ["种类；排序；整理", "I need to sort my notes."],
  data: ["数据；资料", "The app saves my data."],
  tree: ["树", "There is a tree outside."],
  share: ["分享；份额", "Can you share the link?"],
  choice: ["选择", "This is a good choice."],
  replace: ["替换；代替", "I need to replace this part."],
  copy: ["复制；副本", "Please copy this sentence."],
  path: ["路径；小路；路线", "This path is simple."],
  device: ["设备；装置", "This device is old."],
  expand: ["扩大；展开；扩展", "I want to expand my vocabulary."],
  shift: ["轮班；转移；改变", "I work the night shift."],
  command: ["命令；指令；掌握", "This command opens the app."],
  print: ["打印；印刷", "Can you print this document?"],
  restore: ["恢复；修复", "I need to restore my backup."],
  install: ["安装", "I need to install the app."],
  shell: ["壳；外壳", "The shell is hard."],
  pause: ["暂停", "Pause the video and repeat."],
  prompt: ["提示；提醒", "Copy the AI prompt."],
  exit: ["出口；退出", "Where is the exit?"],
  cd: ["光盘；唱片", "I found an old CD."],
  natural: ["自然的；天然的；天生的", "I want to learn English in a natural way."],
  naturally: ["自然地；天生地", "She speaks naturally."],
  master: ["掌握；精通；大师", "I want to master English."],
  program: ["节目；程序；计划", "This program helps me study."],
  plain: ["简单清楚的；朴素的", "Please explain it in plain English."],
  stand: ["站；忍受", "I can't stand it."],
  catch: ["抓住；听懂；赶上；碰到", "I am glad I caught you."],
  wish: ["希望；愿望", "I wish I could understand it faster."],
  tell: ["告诉；讲述", "Please tell me a story."]
};

function cleanMeaning(meaning) {
  const raw = String(meaning || "").trim();
  const parts = raw.split(/[；;]/).map((part) => part.trim()).filter(Boolean);
  const kept = parts.filter((part) => !badMarkers.some((marker) => part.includes(marker)));
  return (kept.length ? kept : parts).join("；").replace(/\s+/g, " ").trim() || "待补中文";
}

for (const [word, entry] of Object.entries(hints)) {
  if (overrides[word]) {
    entry.meaning = overrides[word][0];
    entry.sentence = overrides[word][1];
  } else {
    entry.meaning = cleanMeaning(entry.meaning);
  }
}

fs.writeFileSync(file, `window.BASIC_WORD_HINTS = ${JSON.stringify(hints, null, 2)};\n`, "utf8");
console.log(`Cleaned ${Object.keys(hints).length} word hints.`);
