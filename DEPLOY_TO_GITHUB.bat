@echo off
cd /d "%~dp0"
echo ============================================================
echo   Deploying Dasari Bala Srinivas Portfolio to GitHub Pages
echo   Repository: https://github.com/DBS314/portfolio.git
echo ============================================================
git push -u origin main
echo.
echo Done! Now enable GitHub Pages under Repo -> Settings -> Pages -> Branch: main
pause
