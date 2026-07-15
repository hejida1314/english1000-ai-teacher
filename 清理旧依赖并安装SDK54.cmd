@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
set "LOG=%~dp0clean-sdk54-install-log.txt"

echo English1000 clean SDK54 install > "%LOG%"
echo Folder: %CD% >> "%LOG%"
echo Time: %DATE% %TIME% >> "%LOG%"
echo. >> "%LOG%"

echo ==========================================
echo   English1000 - Clean SDK54 Install
echo ==========================================
echo.
echo This fixes old SDK51 dependency conflicts.
echo It removes node_modules and package-lock, then reinstalls.
echo.

if not exist package.json (
  echo ERROR: package.json not found.
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

echo Cleaning old dependencies...
echo Cleaning old dependencies... >> "%LOG%"
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json

echo.
echo Installing with legacy peer deps mode...
echo Installing with legacy peer deps mode... >> "%LOG%"
call npm install --legacy-peer-deps --cache .npm-cache --no-audit --no-fund >> "%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: install failed.
  echo Send Codex this file:
  echo %LOG%
  echo.
  type "%LOG%"
  pause
  exit /b 1
)

echo.
echo Starting Expo tunnel mode...
echo Starting Expo tunnel mode... >> "%LOG%"
call npx expo start --tunnel

pause
