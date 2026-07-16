@echo off
chcp 65001 >nul
title English1000 Life Web
cd /d "%~dp0web-lite"

echo ==========================================
echo   English1000 Life Web / PWA
echo ==========================================
echo.
echo Open this address on this computer:
echo http://localhost:4173
echo.
echo For iPhone on the same Wi-Fi, use your computer IP address:
echo http://YOUR-COMPUTER-IP:4173
echo.
echo Keep this window open while testing locally.
echo For real phone use without computer, publish web-lite to GitHub Pages.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 4173
) else (
  python -m http.server 4173
)

pause
