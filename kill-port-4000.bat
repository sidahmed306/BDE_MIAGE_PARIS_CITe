@echo off
echo 🔍 Recherche du processus utilisant le port 4000...
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4000') do (
    set PID=%%a
    echo 📌 Processus trouve avec PID: %%a
    echo.
    echo ⚠️  Arret du processus...
    taskkill /PID %%a /F
    echo ✅ Processus arrete!
    goto :done
)

echo ✅ Aucun processus n'utilise le port 4000
:done
pause

