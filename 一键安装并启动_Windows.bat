@echo off
title English1000 AI Teacher
set "PATH=C:\Program Files\nodejs;%PATH%"

echo.
echo ==========================================
echo   English1000 AI Teacher - One Click Start
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [Node.js missing]
  echo Please install Node.js LTS first:
  echo https://nodejs.org/
  echo.
  echo After installing Node.js, close this window and double click this file again.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [npm missing]
  echo Your Node.js install is incomplete. Please reinstall Node.js LTS:
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo [1/3] Checking Node.js...
node -v
npm -v
echo.

if not exist node_modules\expo (
  echo [2/3] Installing dependencies. This may take 5 to 15 minutes...
  call npm install --cache .npm-cache --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo [Install failed]
    echo Please send this window screenshot to Codex.
    pause
    exit /b 1
  )
) else (
  echo [2/3] Expo is already installed. Skipping install.
)

if not exist node_modules\expo (
  echo.
  echo [Install incomplete]
  echo node_modules exists, but Expo is missing.
  echo Please send this window screenshot to Codex.
  pause
  exit /b 1
)

echo.
echo [3/3] Starting Expo Tunnel...
echo.
echo Phone steps:
echo 1. Install Expo Go
echo 2. Scan the QR code
echo 3. The address should contain exp.direct
echo.
call npx expo start --tunnel --clear

pause
