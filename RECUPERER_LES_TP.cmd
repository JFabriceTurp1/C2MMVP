@echo off
chcp 65001 >nul
title RECUPERER LES TP
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0RECUPERER_LES_TP.ps1" -Mode Rapide
echo.
pause
