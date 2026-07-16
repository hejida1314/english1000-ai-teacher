# English1000 phone web version

## Short-term use on the same Wi-Fi

1. Double-click `START_WEB_LITE.cmd`.
2. Keep the black window open.
3. On iPhone Safari, open one of the addresses shown in the black window, for example:

```text
http://10.0.0.223:4173
```

This still needs the computer while testing locally.

## Real phone use without keeping the computer on

1. Push the latest commit to GitHub.
2. Open the GitHub repository.
3. Go to `Settings -> Pages`.
4. Set Source to `GitHub Actions`.
5. Wait for the workflow named `Deploy web-lite to GitHub Pages`.
6. Open the published Pages URL on iPhone Safari.

The expected URL will usually look like:

```text
https://hejida1314.github.io/english1000-ai-teacher/
```

## Add to iPhone home screen

1. Open the Pages URL in Safari.
2. Tap Share.
3. Tap `Add to Home Screen`.
4. Name it `English1000`.

After this, it behaves more like an app.

## Offline note

The web version caches the app shell after the first successful load.

Your data is stored in the browser on that phone. Before clearing Safari data, changing phones, or changing the website address:

1. Open `Settings` in the web app.
2. Tap `Copy backup`.
3. Paste the backup into Notes, WeChat, or another safe place.

## Current limits

- It does not sync automatically with the Expo Go native app.
- It stores data locally in the browser.
- iPhone notifications are limited for PWA compared with native apps.
- It is meant for daily use and feedback while the full mobile app is still being developed.
