# English1000 装到手机说明

目标：让 English1000 变成真正装在手机里的 App，而不是每次依赖电脑扫码打开 Expo Go。

## 先说结论

- Android 最简单：用 EAS 打一个 APK，下载安装到手机后可以离线打开。
- iPhone 更麻烦：苹果限制比较多。想不通过 App Store 直接安装，一般需要 Apple Developer 账号，并且要把你的 iPhone 注册进测试设备列表。
- Expo Go 只是开发测试工具。电脑关了、Metro 服务停了，Expo Go 里的项目链接就会失效。

## 当前项目已经准备好了什么

已经加入：

- `eas.json`：EAS 云打包配置。
- `preview` 打包模式：用于自己手机测试。
- Android APK 配置：方便直接安装。
- iOS 内部分发配置：后续可走 Apple Ad Hoc / TestFlight。

## 第一次准备

在项目文件夹里打开终端，运行：

```powershell
npm install -g eas-cli
eas login
```

如果你没有 Expo 账号，先按提示注册/登录。

## Android 安装包

如果你要给 Android 手机安装：

```powershell
npm run build:android:preview
```

打包完成后，EAS 会给一个链接。用 Android 手机打开链接，下载 APK 安装即可。

## iPhone 安装包

iPhone 不像 Android 可以随便装 APK。你有三条路线：

1. 继续用 Expo Go 开发测试：最快，但电脑服务关了就不能打开。
2. Apple Developer + Ad Hoc：适合自己手机测试，需要注册设备。
3. TestFlight / App Store：最正式，适合长期使用和给别人安装。

如果走 Ad Hoc，先注册你的 iPhone：

```powershell
npm run eas:devices
```

然后打 iPhone 测试包：

```powershell
npm run build:ios:preview
```

EAS 会引导你登录 Apple 账号、处理证书和设备。完成后会给安装链接。

## 以后日常怎么用

开发调试：

```powershell
npm start
```

真正装手机：

```powershell
npm run build:ios:preview
```

或者：

```powershell
npm run build:android:preview
```

## 重要提醒

- iPhone 独立安装通常绕不开 Apple Developer 账号。
- 如果只是今晚继续开发，继续用 Expo Go 最快。
- 如果要上班路上不靠电脑打开，就要走 EAS 构建独立包。
- 当前 App 数据主要保存在手机本地。重新安装 App 前，记得先在 App 里做备份。

## 官方依据

- EAS Build 可以生成 Android / iOS 的独立安装包。
- Internal distribution 可以生成可分享安装链接。
- Android internal build 会生成 APK。
- iOS Ad Hoc 需要注册设备 UDID，通常需要 Apple Developer 账号。
