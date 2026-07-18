@echo off
title AMTDA - Lanceur Local
color 0A

echo =======================================================================
echo          AMTDA - Association Marocaine des Troubles d'Apprentissage
echo                     LANCEUR LOCAL DE LA PLATEFORME
echo =======================================================================
echo.
echo Etape 1 : Installation des dependances...
call npm install
if errorlevel 1 (
    color 0C
    echo Erreur lors de l'installation des dependances.
    pause
    exit /b
)
echo.


echo Etape 2 : Lancement du site...
echo Le site va s'ouvrir sur http://localhost:3000
timeout /t 3 >nul
start http://localhost:3000
call npm run dev
pause
