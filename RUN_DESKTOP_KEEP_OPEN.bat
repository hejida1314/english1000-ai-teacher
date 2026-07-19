@echo off
chcp 65001 >nul
setlocal
title English1000 Life - KEEP THIS WINDOW OPEN
cd /d "%~dp0"

set "APP_URL=http://127.0.0.1:4173/"
set "LOG=%~dp0english1000-keep-open-log.txt"

echo ========================================== > "%LOG%"
echo English1000 Life Keep-Open Launcher >> "%LOG%"
echo Time: %date% %time% >> "%LOG%"
echo Folder: %cd% >> "%LOG%"
echo ========================================== >> "%LOG%"

echo ==========================================
echo   English1000 Life
echo ==========================================
echo.
echo IMPORTANT:
echo Keep this black window open while using the app.
echo Do NOT press any key.
echo Do NOT close this window.
echo.
echo The app will open automatically in your browser.
echo If it does not open, manually open:
echo %APP_URL%
echo.

if not exist "web-lite\index.html" (
  echo ERROR: web-lite\index.html not found.
  echo You are not in the correct project folder.
  echo ERROR: web-lite\index.html not found. >> "%LOG%"
  echo.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js was not found.
  echo Please install Node.js LTS first.
  echo ERROR: Node.js was not found. >> "%LOG%"
  echo.
  pause
  exit /b 1
)

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

echo Starting browser in 2 seconds...
if exist "%CHROME%" (
  start "" powershell -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 2; Start-Process '%CHROME%' '--app=%APP_URL% --user-data-dir=%LOCALAPPDATA%\English1000LifeDesktopChrome'"
) else (
  start "" powershell -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 2; Start-Process '%APP_URL%'"
)

echo.
echo Starting local server now...
echo Server address: %APP_URL%
echo.
echo When you are completely done using English1000, close this black window.
echo.

node scripts\serve-web-lite.js

echo.
echo ==========================================
echo The server stopped.
echo If this was not intentional, send Codex a photo of this window.
echo ==========================================
echo.
pause
