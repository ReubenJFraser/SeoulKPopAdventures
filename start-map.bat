@echo off

REM Step A) Kill any existing process on port 3000
REM netstat -ano shows lines referencing "LISTENING" on port 3000
for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo Terminating leftover process on port 3000 with PID: %%A
    taskkill /F /PID %%A
)

REM Step B) Navigate to your project folder (including the /d flag)
cd /d "C:\laragon\www\bulma-test"

REM Step C) Start Node server in a new cmd window
echo Starting Node server on port 3000...
start cmd /k "node server.js"

REM Step C.1) Optional: Wait 3 seconds for server to spin up
echo Waiting 3 seconds for server to initialize...
ping 127.0.0.1 -n 3 > NUL

REM Step D) Open your map page in the default browser
echo Opening http://localhost:3000/seoul-kpop-adventures/map
start "" "http://localhost:3000/seoul-kpop-adventures/map"

REM Keep the .bat window from closing immediately (optional)
pause

