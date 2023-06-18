## FrontEnd Local Repository
### Building war file

- You need to clone this repository in your device. Then go to the root path and build the project with `npm run build` . This command will compiles and bundles the project's source code, optimizes assets, and performs any necessary transformations to generate the final production-ready files.
- Then go to the ***dist*** folder and run it   `jar -cvf dashboard.war .` , it will create a WAR file called "dashboard.war" which contains all the files and directories present in the current directory.

### Deploying in Tomcat

- Open your favorite web browser and open the tomcat GUI (https:xgrid103:8080), by default tomcat use the 8080’s  port, but if you change it just replace it, go into the Manger App and search the Deploy component and upload your file.
- In the case of a single page application (SPA), when deployed on a server such as Tomcat, it is common to configure the web.xml file to redirect any 404 (page not found) requests to the index.html file, thus allowing the SPA to handle navigation and internal routes. To do this follow the steps below:
    1. Go to the folder where you have tomcat installed, enter the webapps folder and then the ***dashboard*** folder that was generated when the war was uploaded.
    2. Inside the ***dashboard*** folder, create a folder called "WEB-INF".
    3. Create a file named "web.xml" in the newly created "WEB-INF" folder. 
    4. Open the "web.xml" file in a text editor and copy the following content:

```xml
<web-app>
    <error-page>
        <error-code>404</error-code>
        <location>/index.html</location>
    </error-page>
</web-app>
```

- Now you will be able to use the application normally.