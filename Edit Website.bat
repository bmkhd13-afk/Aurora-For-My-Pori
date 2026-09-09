@echo off
title Aurora Studio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js is not installed.
  echo.
  echo   Download it from https://nodejs.org, install it,
  echo   then double-click this file again.
  echo.
  pause
  exit /b
)

node "studio\server.js"
pause
