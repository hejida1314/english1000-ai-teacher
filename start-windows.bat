@echo off
echo Starting English1000 AI Teacher...
set "PATH=C:\Program Files\nodejs;%PATH%"
if not exist node_modules\expo (
  echo Expo is not installed. Installing dependencies now...
  call npm install --cache .npm-cache --no-audit --no-fund
)
if not exist node_modules\expo (
  echo.
  echo Install did not complete. Please send this window screenshot to Codex.
  pause
  exit /b 1
)
npx expo start --tunnel --clear
pause
