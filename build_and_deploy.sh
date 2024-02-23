#!/bin/bash

# Ejecuta el build de la aplicación
npm run build
# Crea la carpeta WEB-INF en la carpeta dist
mkdir -p dist/WEB-INF

# Copia el archivo web.xml a la carpeta WEB-INF
cp public/web.xml dist/WEB-INF

# Cambia a la carpeta dist
cd dist

# Comprime los archivos en un archivo .war
jar -cvf ../dashboard.war *

# Vuelve a la carpeta del proyecto
cd ..

# Mensaje final
echo "Archivo WAR creado con éxito y listo para desplegar en Tomcat"
