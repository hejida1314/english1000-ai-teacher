const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pairs = ["app.js", "index.html", "styles.css", "sw.js", "basic-word-hints.js", "manifest.webmanifest"];
const requiredMarkers = [
  "一键继续今天",
  "智能保存",
  "今天的视频链接",
  "同步判断",
  "生活管理",
  "精听播放器",
  "今天先复习",
  "3500高频候选词"
];
const forbiddenRuntimeCalls = [
  "todaysSupport(",
  "dueNotebookItems("
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

for (const file of pairs) {
  const web = read(path.join(root, "web-lite", file));
  const docs = read(path.join(root, "docs", file));
  if (web !== docs) fail(`web-lite/${file} and docs/${file} are not identical.`);
}

const app = read(path.join(root, "web-lite", "app.js"));
for (const marker of requiredMarkers) {
  if (!app.includes(marker)) fail(`Missing web marker: ${marker}`);
}
for (const call of forbiddenRuntimeCalls) {
  if (app.includes(call)) fail(`Forbidden stale runtime call found: ${call}`);
}

const index = read(path.join(root, "web-lite", "index.html"));
const sw = read(path.join(root, "web-lite", "sw.js"));
const assetVersions = Array.from(index.matchAll(/\?v=(\d{8}-\d+)/g)).map((match) => match[1]);
const uniqueAssetVersions = new Set(assetVersions);
const cacheVersion = (sw.match(/english1000-life-v(\d{8}-\d+)/) || [])[1];

if (uniqueAssetVersions.size !== 1) fail(`Index asset versions are inconsistent: ${assetVersions.join(", ")}`);
if (!cacheVersion) fail("Service worker cache version not found.");
if (cacheVersion && uniqueAssetVersions.size === 1 && !uniqueAssetVersions.has(cacheVersion)) {
  fail(`Service worker version ${cacheVersion} does not match index version ${[...uniqueAssetVersions][0]}.`);
}

if (!process.exitCode) {
  console.log("Web lite verified.");
}
