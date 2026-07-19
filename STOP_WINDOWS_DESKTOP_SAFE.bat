@echo off
chcp 65001 >nul
setlocal
title Stop English1000 Life Desktop
cd /d "%~dp0"

echo ==========================================
echo   Stop English1000 Life Desktop
echo ==========================================
echo.

if exist ".english1000-web-lite.pid" (
  set /p PID=<".english1000-web-lite.pid"
  echo Stopping PID %PID%...
  taskkill /PID %PID% /F >nul 2>nul
  del ".english1000-web-lite.pid" >nul 2>nul
  echo Done.
) else (
  echo PID file not found.
  echo If the app still opens at http://127.0.0.1:4173, restart Windows or send Codex a photo.
)

echo.
pause
