@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
set "LOG=%~dp0sdk54-upgrade-log.txt"

echo English1000 SDK54 upgrade > "%LOG%"
echo Folder: %CD% >> "%LOG%"
echo Time: %DATE% %TIME% >> "%LOG%"
echo. >> "%LOG%"

echo ==========================================
echo   English1000 - Upgrade to Expo SDK 54
echo ==========================================
echo.
echo Your iPhone Expo Go uses SDK 54.
echo This script upgrades the project and starts Expo.
echo.

if not exist package.json (
  echo ERROR: package.json not found.
  echo Open the folder that contains package.json.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js not found.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm not found.
  pause
  exit /b 1
)

echo Node:
node -v
echo npm:
call npm -v
echo.

echo Installing Expo SDK 54 packages. This can take several minutes...
call npm install --cache .npm-cache --no-audit --no-fund >> "%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: npm install failed.
  echo Send Codex this file:
  echo %LOG%
  echo.
  type "%LOG%"
  pause
  exit /b 1
)

echo.
echo Letting Expo align package versions...
call npx expo install --fix >> "%LOG%" 2>&1
if errorlevel 1 (
  echo Expo package alignment reported a problem, but we can still try to start.
  echo Check log if startup fails: %LOG%
)

echo.
echo Starting Expo tunnel mode...
echo Use the new QR code with iPhone Camera.
echo.
call npx expo start --tunnel

pause
