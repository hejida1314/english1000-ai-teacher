@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
set "LOG=%~dp0english1000-start-log.txt"

echo English1000 AI Teacher launcher > "%LOG%"
echo Folder: %CD% >> "%LOG%"
echo Time: %DATE% %TIME% >> "%LOG%"
echo. >> "%LOG%"

echo ==========================================
echo   English1000 AI Teacher
echo ==========================================
echo.
echo This window should NOT close by itself.
echo If something fails, take a photo and send it to Codex.
echo.

if not exist package.json (
  echo package.json not found in this folder. Searching one level down...
  echo package.json not found in %CD%. Searching child folders... >> "%LOG%"
  for /d %%D in (*) do (
    if exist "%%D\package.json" (
      echo Found project folder: %%D
      echo Found project folder: %%D >> "%LOG%"
      cd /d "%%D"
      set "LOG=%CD%\english1000-start-log.txt"
      echo English1000 AI Teacher launcher > "%LOG%"
      echo Folder: %CD% >> "%LOG%"
      echo Time: %DATE% %TIME% >> "%LOG%"
      goto found_package
    )
  )
  echo ERROR: package.json not found.
  echo ERROR: package.json not found. >> "%LOG%"
  echo.
  echo Please right-click the ZIP, choose "Extract All", then open the extracted English1000AI folder.
  echo You should see package.json and RUN_ME_FIRST.cmd in the same folder.
  echo.
  pause
  exit /b 1
)

:found_package

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not available in this window.
  echo ERROR: Node.js is not available. >> "%LOG%"
  echo.
  echo Install Node.js LTS from:
  echo https://nodejs.org/
  echo.
  echo Then close this window and run RUN_ME_FIRST.cmd again.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm is not available in this window.
  echo ERROR: npm is not available. >> "%LOG%"
  echo.
  echo Reinstall Node.js LTS from:
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo Node version:
node -v
node -v >> "%LOG%" 2>&1
echo npm version:
call npm -v
call npm -v >> "%LOG%" 2>&1
echo.

if not exist node_modules\expo (
  echo Installing dependencies. This can take 5 to 15 minutes.
  echo Installing dependencies... >> "%LOG%"
  call npm install --cache .npm-cache --no-audit --no-fund >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo.
    echo ERROR: npm install failed.
    echo Please send Codex this file:
    echo %LOG%
    echo.
    type "%LOG%"
    echo.
    pause
    exit /b 1
  )
)

if not exist node_modules\expo (
  echo.
  echo ERROR: Expo is still missing after install.
  echo ERROR: Expo is still missing after install. >> "%LOG%"
  echo Please send Codex this file:
  echo %LOG%
  echo.
  pause
  exit /b 1
)

echo.
echo Starting Expo Tunnel. When QR code appears, scan it with Expo Go.
echo The address should contain exp.direct. If it shows 10.0.0.x, stop and tell Codex.
echo Starting Expo... >> "%LOG%"
echo.
call npx expo start --tunnel --clear

echo.
echo Expo stopped.
pause
