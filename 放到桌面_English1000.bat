@echo off
setlocal
chcp 65001 >nul
set "PROJECT_DIR=%~dp0"
set "TARGET=%PROJECT_DIR%RUN_DESKTOP_KEEP_OPEN.bat"
set "SHORTCUT=%USERPROFILE%\Desktop\English1000 Life.lnk"

if not exist "%TARGET%" (
  echo Cannot find RUN_DESKTOP_KEEP_OPEN.bat
  echo Please make sure this file is inside the English1000 project folder.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$shell = New-Object -ComObject WScript.Shell; " ^
  "$shortcut = $shell.CreateShortcut('%SHORTCUT%'); " ^
  "$shortcut.TargetPath = '%TARGET%'; " ^
  "$shortcut.WorkingDirectory = '%PROJECT_DIR%'; " ^
  "$shortcut.IconLocation = '%SystemRoot%\System32\shell32.dll,220'; " ^
  "$shortcut.Description = 'Open English1000 Life desktop app'; " ^
  "$shortcut.Save()"

if exist "%SHORTCUT%" (
  echo Desktop shortcut created:
  echo %SHORTCUT%
  echo.
  echo From now on, double-click "English1000 Life" on your desktop.
) else (
  echo Failed to create desktop shortcut.
)
pause
