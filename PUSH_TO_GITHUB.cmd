@echo off
chcp 65001 >nul
title English1000 - Push to GitHub
cd /d "%~dp0"

echo ==========================================
echo   English1000 AI Teacher - Push to GitHub
echo ==========================================
echo.
echo This will push local commits to:
echo https://github.com/hejida1314/english1000-ai-teacher
echo.

git status -sb
echo.
git push origin main

echo.
if errorlevel 1 (
  echo Push failed. If GitHub asks you to sign in, finish login and run this file again.
) else (
  echo Push finished successfully.
)
echo.
pause
