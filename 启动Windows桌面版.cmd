@echo off
chcp 65001 >nul
title English1000 Life Desktop
cd /d "%~dp0"

echo ==========================================
echo   English1000 Life - Windows Desktop
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js was not found.
  echo Please install Node.js LTS first, then run this file again.
  echo.
  pause
  exit /b 1
)

echo Starting local English1000 service...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -WindowStyle Hidden -FilePath 'node' -ArgumentList 'scripts\serve-web-lite.js' -WorkingDirectory '%~dp0'"

echo Waiting for local service...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; 1..20 | ForEach-Object { try { $r=Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/__health' -TimeoutSec 1; if ($r.StatusCode -eq 200) { $ok=$true; break } } catch {}; Start-Sleep -Milliseconds 300 }; if (-not $ok) { exit 1 }"
if errorlevel 1 (
  echo.
  echo Could not start the local service.
  echo Try running START_WEB_LITE.cmd and send Codex a photo if it fails.
  echo.
  pause
  exit /b 1
)

set "APP_URL=http://127.0.0.1:4173"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

echo Opening desktop app window...
if exist "%EDGE%" (
  start "" "%EDGE%" --app="%APP_URL%" --user-data-dir="%LOCALAPPDATA%\English1000LifeDesktop"
) else (
  start "" "%APP_URL%"
)

echo.
echo English1000 Life is open.
echo You can close this window now.
echo To stop the background service, double-click:
echo   关闭Windows桌面版后台服务.cmd
echo.
pause
