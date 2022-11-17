@ECHO OFF
: Package Installer

cd ../
powershell write-host -fore green Installing Packages...
npm i @discordjs/rest
npm i @napi-rs/canvas
npm i @types/node
npm i discord.js
npm i express
npm i node-fetch
powershell write-host -fore green Job completed!

echo Press any key to Exit...
time 9999 > NUL
EXIT /B 0
