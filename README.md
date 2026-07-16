# English1000 AI Teacher

## Web / PWA quick start

This repo now includes a lightweight web version in `web-lite/`.

Use it when the Expo Go test app is inconvenient or when you need a phone-friendly version that can later run from GitHub Pages.

Local test:

```bash
npm run web-lite
```

Then open:

```text
http://localhost:4173
```

Windows shortcut:

```text
START_WEB_LITE.cmd
```

The web version stores data in browser local storage. Use Settings -> Copy backup before clearing browser data or changing phones.

The native Expo app and the web-lite PWA share the same product direction, but they do not automatically sync data yet. Use backup text to move data between versions.

给成年人用的 1000 小时英语学习 App。

核心目标不是“多做几个功能”，而是让用户每天打开手机后不用再纠结：

> 今天就做 App 给出的第一个未完成任务。

## 课程主线

当前版本严格按照这条顺序生成 334 天课程：

1. Dreaming English Beginner
2. Dreaming English Intermediate
3. Bluey Season 1
4. Peppa Pig
5. TED-Ed
6. Modern Family

## 已完成训练营

第一周：

- Day 1：建立习惯、自我介绍
- Day 2：介绍自己和日常
- Day 3：车辆保养预约英语
- Day 4：餐馆点餐
- Day 5：超市问路
- Day 6：描述一天
- Day 7：第一周复习和 AI 老师测试

第二周：

- Day 8：医生预约
- Day 9：银行英语
- Day 10：DMV
- Day 11：电话英语
- Day 12：工作沟通
- Day 13：描述问题
- Day 14：第二周复习和 AI 老师测试

## 设计依据

这个 App 借鉴成熟学习 App 和成年人语言学习经验，但不照抄游戏化套路：

- 可理解输入：先让材料大体听得懂，再逐步提高难度。
- 间隔复习：生词不是一次背完，而是到期再复习。
- 主动回忆：单词复习用“忘了 / 困难 / 会了 / 很熟”来判断。
- 连续性：记录连续完成天数和本周完成率，但不做排行榜。
- 保底模式：状态差时先做 10 分钟，避免因为一天失败而彻底断掉。
- 理解度评分：每个任务估算 40% / 60% / 80%，以后可以判断材料是否太难。
- 真实场景：美国生活、工作、汽车、餐馆、超市、医生、银行、DMV 优先。

## 运行方式

第一次运行：

```bash
npm install
npx expo start
```

然后在 iPhone 安装 Expo Go，用 iPhone 相机扫描终端里的二维码。

如果 Expo Go 提示 SDK 不兼容，说明项目依赖或 Expo Go 版本不一致。当前项目已经升级到 Expo SDK 54。

## 常用操作

启动开发服务器：

```bash
npx expo start
```

检查 TypeScript：

```bash
npm run typecheck
```

检查课程顺序：

```bash
npm run verify:course
```

保存到 GitHub：

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

## 当前功能

- 334 天、每天 3 小时课程
- 一键继续今天学习
- 今日任务步骤卡
- 当前任务倒计时
- 10 分钟保底模式
- 理解度评分
- 第一周和第二周具体训练模板
- 精听播放器
- 生词本和间隔复习
- 今日10词一键加入生词本
- 单词和例句朗读
- AI 老师提示词
- 每日通知提醒
- 本地进度保存
- 本地备份复制和恢复
- 设置页可跳转到指定 Day，方便测试
- 首页显示连续完成天数和本周完成率

## 版权说明

App 不内置 Bluey、Peppa Pig、Disney、Modern Family 等受版权保护的视频内容，只记录学习任务、阶段路线和用户自己合法观看的平台信息。

## 长期原则

- 离线优先：核心课程和进度保存在用户本地。
- 懒人优先：减少选择，打开就学。
- 不乱换路线：只升级计划，不推翻主线。
- 真实生活优先：美国生活、工作、汽车、餐馆、超市、未来 YouTube 表达都要逐步进入课程。
- 温和坚持：允许低状态日，允许保底，不因为一天做得少就放弃。
