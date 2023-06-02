@echo off

REM Ejecuta el build de la aplicación
npm run build

REM Crea la carpeta WEB-INF en la carpeta dist
mkdir dist\WEB-INF

REM Copia el archivo web.xml a la carpeta WEB-INF
copy public\web.xml dist\WEB-INF

REM Cambia a la carpeta dist
cd dist

REM Comprime los archivos en un archivo .war
jar -cvf ..\dashboard.war *

REM Vuelve a la carpeta del proyecto
cd ..

REM Mensaje final
echo Archivo WAR creado con éxito y listo para desplegar en Tomcat

pause
