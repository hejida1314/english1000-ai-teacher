# English1000 AI Teacher

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

第一周已经做成更具体的训练营内容，包括：

- Day 1：建立习惯、自我介绍
- Day 2：介绍自己和日常
- Day 3：车辆保养预约英语
- Day 4：餐馆点餐
- Day 5：超市问路
- Day 6：描述一天
- Day 7：第一周复习和 AI 老师测试

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
- 第一周具体训练模板
- 精听播放器
- 生词本和间隔复习
- AI 老师提示词
- 每日通知提醒
- 本地进度保存
- 本地备份复制
- 设置页可跳转到指定 Day，方便测试

## 版权说明

App 不内置 Bluey、Peppa Pig、Disney、Modern Family 等受版权保护的视频内容，只记录学习任务、阶段路线和用户自己合法观看的平台信息。

## 长期原则

- 离线优先：核心课程和进度保存在用户本地。
- 懒人优先：减少选择，打开就学。
- 不乱换路线：只升级计划，不推翻主线。
- 真实生活优先：美国生活、工作、汽车、餐馆、超市、未来 YouTube 表达都要逐步进入课程。
