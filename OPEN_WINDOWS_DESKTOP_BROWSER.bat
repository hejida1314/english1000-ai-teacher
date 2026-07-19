@echo off
chcp 65001 >nul
setlocal
title Open English1000 Life
cd /d "%~dp0"

echo Opening English1000 Life in your browser...
echo If nothing opens, copy this address:
echo http://127.0.0.1:4173/
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process 'http://127.0.0.1:4173/'"

pause
