@echo off
chcp 65001 >nul
setlocal
title English1000 Life Desktop - Safe Launcher
cd /d "%~dp0"

set "LOG=%~dp0english1000-desktop-log.txt"
set "SERVICE_LOG=%~dp0english1000-desktop-service-log.txt"
set "APP_URL=http://127.0.0.1:4173"

echo ========================================== > "%LOG%"
echo English1000 Life Desktop Safe Launcher >> "%LOG%"
echo Time: %date% %time% >> "%LOG%"
echo Folder: %cd% >> "%LOG%"
echo ========================================== >> "%LOG%"

echo ==========================================
echo   English1000 Life - Windows Desktop
echo ==========================================
echo.
echo This window should NOT close by itself.
echo If it fails, send Codex a photo of this window
echo or upload/copy english1000-desktop-log.txt.
echo.

if not exist "web-lite\index.html" (
  echo ERROR: web-lite\index.html not found.
  echo You may be running this file outside the project folder.
  echo ERROR: web-lite\index.html not found. >> "%LOG%"
  echo.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js was not found.
  echo Install Node.js LTS, then run this again.
  echo ERROR: Node.js was not found. >> "%LOG%"
  echo.
  pause
  exit /b 1
)

for /f "delims=" %%A in ('where node') do (
  echo Node: %%A
  echo Node: %%A >> "%LOG%"
  goto :node_found
)
:node_found
node -v >> "%LOG%" 2>&1

echo.
echo Checking local service...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r=Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/__health' -TimeoutSec 1; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if errorlevel 1 (
  echo Starting local service...
  echo Starting local service... >> "%LOG%"
  if exist ".english1000-web-lite.pid" del ".english1000-web-lite.pid" >nul 2>nul
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -WindowStyle Hidden -FilePath 'node' -ArgumentList 'scripts\serve-web-lite.js' -WorkingDirectory '%~dp0' -RedirectStandardOutput '%SERVICE_LOG%' -RedirectStandardError '%SERVICE_LOG%.err'"
) else (
  echo Local service is already running.
  echo Local service is already running. >> "%LOG%"
)

echo Waiting for service at %APP_URL% ...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok=$false; for ($i=0; $i -lt 30; $i++) { try { $r=Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/__health' -TimeoutSec 1; if ($r.StatusCode -eq 200) { $ok=$true; break } } catch {}; Start-Sleep -Milliseconds 500 }; if ($ok) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo.
  echo ERROR: Local service did not start.
  echo Check english1000-desktop-service-log.txt and english1000-desktop-service-log.txt.err.
  echo ERROR: Local service did not start. >> "%LOG%"
  echo.
  pause
  exit /b 1
)

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

echo.
echo Opening English1000 Life desktop window...
echo Opening desktop window... >> "%LOG%"
if exist "%EDGE%" (
  start "" "%EDGE%" --app="%APP_URL%" --user-data-dir="%LOCALAPPDATA%\English1000LifeDesktop"
) else (
  echo Edge not found. Opening default browser.
  echo Edge not found. Opening default browser. >> "%LOG%"
  start "" "%APP_URL%"
)

echo.
echo SUCCESS: English1000 Life should be open now.
echo.
echo You can close this black window after the app opens.
echo If the app window did not open, manually open:
echo %APP_URL%
echo.
echo To stop background service later, double-click:
echo STOP_WINDOWS_DESKTOP_SAFE.bat
echo.
echo SUCCESS >> "%LOG%"
pause
