# English1000 Life

给成年人用的 1000 小时英语和生活管理系统。核心目标不是堆功能，而是让用户每天打开后不用纠结：

> 今天就做 App 给出的第一件事。

## 当前主力入口

推荐先用网页/PWA 版本：

- 线上地址：https://hejida1314.github.io/english1000-ai-teacher/
- Windows 双击启动：`OPEN_ENGLISH1000_WEB.cmd`
- 本地测试：`npm run web-lite`，然后打开 `http://localhost:4173`

iPhone 使用方式：

1. 用 Safari 打开线上地址。
2. 点分享按钮。
3. 选择 **Add to Home Screen / 添加到主屏幕**。
4. 以后从桌面图标打开。

Expo Go 版本主要用于开发调试，不是当前最省事的使用方式。

## 英语主线

课程严格按这个顺序走：

1. Dreaming English Beginner
2. Dreaming English Intermediate
3. Bluey Season 1
4. Peppa Pig
5. TED-Ed
6. Modern Family

原则：不跳级，不乱换教材。提前完成当天任务时，优先复习、精听、跟读和日记，不直接冲下一天。

## 已有核心功能

- 334 天英语路线
- 每天 3 小时学习结构
- 今日任务和完成打卡
- 计时器、暂停、补记分钟
- 首页显示今日分钟、累计小时、连续天数、剩余小时
- Dreaming / Bluey / Peppa / TED-Ed / Modern Family 阶段路线
- 每日学习资源链接保存
- 精听播放器
- 字幕/句子批量导入
- 听写检查
- 单词发音
- 生词本与间隔复习
- 3500 高频候选词，自动分批复习
- 今日 10 词和今日常用句
- AI 老师提示词
- 万能速记：单词、学习分钟、记账、训练、日记自动分流
- 生活管理：训练、记账、日记、状态
- GitHub Gist 云同步
- 本地备份与恢复
- 强制刷新缓存

## 数据原则

这个 App 是 local-first：

- 数据优先保存在本机浏览器。
- GitHub Pages 只负责加载 App，不保存你的私人数据。
- 要跨手机和电脑同步，请在设置里使用 GitHub Gist 云同步。
- 换手机、清缓存、换浏览器前，先用“复制备份”。

## 开发检查

```bash
npm run verify:course
npm run typecheck
node --check web-lite/app.js
node --check docs/app.js
```

## 发布方式

GitHub Pages 使用 `docs/` 目录。修改 `web-lite/` 后，需要同步到 `docs/`，再提交并推送。

## 版权说明

App 不内置 Bluey、Peppa Pig、Disney、Modern Family 等受版权保护的视频内容，只保存学习任务、阶段路线、用户自己填写的链接和笔记。
