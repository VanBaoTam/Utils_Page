@echo off
echo Starting cleanup....

rmdir /s /q "dist" 2>nul
mkdir "dist"

echo Finish...

