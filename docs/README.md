# English1000 Life Web

This is a lightweight local-first PWA version of English1000.

It is designed for early daily use before the native mobile app is ready.

## What works

- 334-day English route
- Daily task checklist
- Study minute logging
- Quick capture for words, expenses, and journal notes
- Wordbook with simple spaced review
- Health checklist
- One-tap expenses
- Journal
- Backup and restore
- PWA manifest and service worker

## Local testing

From the project root, double-click:

```text
START_WEB_LITE.cmd
```

Then open:

```text
http://localhost:4173
```

For iPhone testing on the same Wi-Fi, open:

```text
http://YOUR-COMPUTER-IP:4173
```

## Real phone use without computer

Publish the `web-lite` folder to GitHub Pages or another static host.

Then open the HTTPS URL in Safari and choose:

```text
Share -> Add to Home Screen
```

After the first successful load, the service worker can cache the app shell for offline use.

Data is stored in the browser local storage. Use Settings -> Copy backup before changing phones, clearing browser data, or switching domains.
