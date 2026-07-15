@echo off
title English1000 AI Teacher Repair
set "PATH=C:\Program Files\nodejs;%PATH%"

echo.
echo ==========================================
echo   English1000 AI Teacher - Repair Install
echo ==========================================
echo.

echo This will reinstall missing dependencies.
echo It will not delete your source code.
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is missing. Install Node.js LTS:
  echo https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is missing. Reinstall Node.js LTS:
  echo https://nodejs.org/
  pause
  exit /b 1
)

node -v
npm -v
echo.

echo Installing project dependencies...
call npm install --cache .npm-cache --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo Install failed. Send this screenshot to Codex.
  pause
  exit /b 1
)

if not exist node_modules\expo (
  echo.
  echo Expo is still missing after install.
  echo Send this screenshot to Codex.
  pause
  exit /b 1
)

echo.
echo Dependencies repaired. Starting Expo...
call npx expo start
pause
