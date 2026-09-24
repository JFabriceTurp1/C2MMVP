@echo off
chcp 65001 >nul
title RECHERCHE APPROFONDIE DES TP
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0RECUPERER_LES_TP.ps1" -Mode Approfondie
echo.
pause
