@echo off
chcp 65001 >nul
title English1000 - Push to GitHub VISIBLE
cd /d "%~dp0"

set LOG=%~dp0push-github-log.txt

echo ==========================================
echo   English1000 AI Teacher - Push to GitHub
echo ==========================================
echo.
echo Current folder:
echo %CD%
echo.
echo Writing log to:
echo %LOG%
echo.

(
  echo ==========================================
  echo English1000 GitHub push log
  echo Time: %DATE% %TIME%
  echo Folder: %CD%
  echo ==========================================
  echo.
  echo Git version:
  git --version
  echo.
  echo Remote:
  git remote -v
  echo.
  echo Status:
  git status -sb
  echo.
  echo Push:
  git push origin main
  echo.
  echo Exit code: %ERRORLEVEL%
) > "%LOG%" 2>&1

type "%LOG%"

echo.
echo ==========================================
echo If push failed, send Codex a photo of this window
echo or upload/copy push-github-log.txt.
echo ==========================================
echo.
pause
