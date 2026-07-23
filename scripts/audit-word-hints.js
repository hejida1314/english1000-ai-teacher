const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const hintsFile = path.join(root, "web-lite", "basic-word-hints.js");
const code = fs.readFileSync(hintsFile, "utf8");
const sandbox = { window: {} };

vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: hintsFile });

const hints = sandbox.window.BASIC_WORD_HINTS || {};
const entries = Object.entries(hints);
const failures = [];
const warnings = [];

const technicalJunk = [
  "DOS", "批处理", "信息论", "输入终端", "智能终端", "内捕获", "地址转换器", "异常传输",
  "自动订票", "后端", "总线允许", "自治系统", "高级系统", "辅助存储器", "作废字符",
  "异常数据", "乱码"
];

const expectedMeanings = {
  natural: [/自然/, /天然|天生/],
  naturally: [/自然地|天生地/],
  master: [/掌握|精通/],
  program: [/节目|程序|计划/],
  plain: [/简单|朴素|清楚/],
  stand: [/站|忍受/],
  catch: [/抓住|听懂|赶上|碰到/],
  wish: [/希望|愿望/],
  tell: [/告诉|讲/],
  might: [/可能|也许/],
  could: [/可以|能够|礼貌/],
  would: [/会|想要|礼貌/],
  should: [/应该/],
  may: [/可能|可以/],
  must: [/必须|一定/]
};

for (const [word, entry] of entries) {
  const meaning = String(entry?.meaning || "").trim();
  const sentence = String(entry?.sentence || "").trim();
  if (!meaning) failures.push(`${word}: missing meaning`);
  if (!sentence) warnings.push(`${word}: missing sentence`);
  technicalJunk.forEach((marker) => {
    if (meaning.includes(marker)) failures.push(`${word}: technical junk meaning "${meaning}"`);
  });
  if (meaning.includes("白痴") && !["idiot", "fool", "moron"].includes(word)) {
    failures.push(`${word}: suspicious bad meaning "${meaning}"`);
  }
}

Object.entries(expectedMeanings).forEach(([word, patterns]) => {
  const meaning = String(hints[word]?.meaning || "");
  if (!meaning) {
    warnings.push(`${word}: not found in high frequency hints; app verified core may still cover it`);
    return;
  }
  patterns.forEach((pattern) => {
    if (!pattern.test(meaning)) failures.push(`${word}: weak meaning "${meaning}"`);
  });
});

if (entries.length < 3000) failures.push(`Expected at least 3000 hints, found ${entries.length}`);

console.log(`Audited ${entries.length} word hints.`);
if (warnings.length) {
  console.log(`Warnings: ${warnings.length}`);
  warnings.slice(0, 20).forEach((item) => console.log(`- ${item}`));
}
if (failures.length) {
  console.error(`Failures: ${failures.length}`);
  failures.slice(0, 50).forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log("Word hint audit passed.");
