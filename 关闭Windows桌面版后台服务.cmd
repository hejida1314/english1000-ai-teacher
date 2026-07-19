@echo off
chcp 65001 >nul
title Stop English1000 Life Desktop
cd /d "%~dp0"

if not exist ".english1000-web-lite.pid" (
  echo English1000 background service is not running, or the PID file is missing.
  echo.
  pause
  exit /b 0
)

set /p PID=<".english1000-web-lite.pid"
echo Stopping English1000 background service PID %PID%...
taskkill /PID %PID% /F >nul 2>nul

if errorlevel 1 (
  echo Could not stop PID %PID%. It may already be closed.
) else (
  echo Stopped.
)

del ".english1000-web-lite.pid" >nul 2>nul
echo.
pause
