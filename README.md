# ⚠ ATENCIÓN: Proyecto deprecad

**Este proyecto fue la primera versión que hice, pero un año después hice un proyecto mejorado que lo reemplaza a este.**

👉 **Link a la nueva versión: [Messi Perfect Shots 2.0](https://github.com/miguecode/messi-perfect-shots)**

## 🤖 Bot de Twitter

Este repositorio contiene la explicación de cómo crear un bot de X/Twitter que se dedique a publicar imágenes, mostrando mi ejemplo "Messi Perfect Shots". Utilizo Node.js y JavaScript.

## ⚽ ¿Qué es [Messi Perfect Shots](https://x.com/MessiPF)?

Messi Perfect Shots es mi bot de X/Twitter. La idea es muy sencilla: publicar fotos de Lionel Messi en X/Twitter, de forma automática y seleccionadas al azar, todos los días. Empezó a funcionar en abril de 2024 y obtuvo más de 4.000 seguidores en unos meses, contando con más de 450 publicaciones al día de hoy.

👉 Link: [Messi Perfect Shots](https://x.com/MessiPF)

![image](https://github.com/user-attachments/assets/588dc1ff-20c4-4b82-80fe-f7c057d70754)


## 🤔 ¿Cómo funciona?

- En el proyecto hay distintos archivos **JavaScript**, los cuales se encargan de la vinculación con la cuenta de X/Twitter a la que queremos apuntar, y otros que realizan la selección aleatoria de la imagen y su publicación.

- También hay varias carpetas con imágenes. **Estas carpetas no están subidas al repositorio**, pero son necesarias para que el script **index.js** sepa de dónde elegir las fotos. Esto último también se podría hacer consumiendo las imágenes desde una API, pero para este caso me pareció óptimo tener mis propias imágenes y guardarlas de forma local.
    
- Para que el script se ejecute de forma automática todos los días, hago uso del **Programador de Tareas de Windows**. Con esa aplicación yo puedo indicarle exactamente cuándo quiero que se realice una publicación. Esto tiene la desventaja de que mi máquina necesita estar encendida para poder realizar la acción y que funcione. La solución sería subir el script a la nube, pero por ahora no encontré un lugar en el que se pueda hacer de forma gratuita.

- Para que el proyecto funcione, es necesario tener instalado [Node.js](https://nodejs.org/en/). Una vez clonado el repositorio y con Node.js instalado, hay que usar el comando ```npm install```, para tener todos los archivos necesarios de la API de X/Twitter, la cual es **twitter-api-v2** en su versión 1.16.1. También hacemos uso de otros paquetes como **dotenv**. Todo aparecerá en la carpeta **node_modules**.

- El proceso de selección de imágenes y su publicación se trata de elegir de forma aleatoria una de todas las fotos ubicadas en la carpeta 'official-pics'. Una vez elegida y publicada, esta misma imagen se mueve a 'published-pics'. Esto es para que esa imagen ya no sea seleccionable en un futuro.


## 🐦 Paso a paso para crear una cuenta Bot

1. El primer paso es crear la cuenta en X/Twitter de forma normal, en su web [X](https://x.com/home/).

2. Después, hay que entrar al sitio web de X/Twitter creado para desarrolladores, [Developer X](https://developer.x.com/).

3. Una vez iniciada la sesión en Developer X, tenemos que crear un proyecto. Cuando ya lo creamos, la plataforma nos va a brindar unas credenciales que vamos a tener que usar en el código para vincularlo al proyecto local. Es decir, hay que vincular el proyecto creado en este sitio web, con el proyecto local de nuestra máquina.

- **OJO**: Algo importante es que, antes de copiar los valores de las autenticaciones, hay que CONFIGURAR la forma de autenticación. ¿Por qué? Porque el proyecto, de forma predeterminada, está configurado para que sea de sólo Lectura. Hay que cambiar ese ajuste para que sea de Lectura y de Escritura. Una vez hecho eso, ahora sí tiene sentido generar todos los códigos, y copiarlos. 

4. Tenemos que vincular nuestro proyecto hecho en código, con nuestro proyecto en Developer X. Primeramente, hay que instalar [Node.js](https://nodejs.org/en/) en nuestro sistema. Después, clonamos este proyecto y dentro de él, tenemos que ejecutar el comando ```npm install```.

5. Terminada la instalación, vamos a ver que apareció la carpeta 'node_modules'. Ahora vamos a poder usar la API de X/Twitter y el paquete **dotenv**. Este último paquete sirve para escribir archivos de tipo .env, cuya función es guardar información sensible que, en nuestro caso, van a ser los códigos de autenticación que copiamos anteriormente en Developer X.

6. Finalmente, vamos a crear un archivo llamado ```.env``` dentro del proyecto, el cual se tiene que ver así:

    ```env
    NODE_ENV=""
    API_KEY=""
    API_SECRET=""
    ACCESS_TOKEN=""
    ACCESS_SECRET=""
    BEARER_TOKEN=""
    
    APP_ID=""
    ```

    Y ahí es donde hay que completar con nuestras credenciales.

- Bien, ya podemos hacer la prueba del bot usando el script ```helloWord.js```. Al ejecutar este archivo, el programa va a hacer el intento de publicar un tweet que diga "Hello World!" en la cuenta que vinculamos anteriormente. Esta vinculación se realiza de forma automática en el archivo ```twitterClient.js```, el cual usa las variables del archivo .env.

    ```js
    // Archivo helloWorld.js
    
    require("dotenv").config({ path: __dirname + "/.env" });
    const { twitterClient } = require("./twitterClient.js")
    
    const tweet = async () => {
      try {
        await twitterClient.v2.tweet("Hello World!");
      } catch (e) {
        console.log(e)
      }
    }
    
    tweet();
    ```

## ♻️ Paso a paso para automatizar el proceso

- El archivo **helloWorld.js** sirve sólo para hacer la prueba de la vinculación. Una vez que ya comprobamos que funciona, nos tenemos que centrar en el archivo **index.js**. Este último es el que se dedica a seleccionar y publicar imágenes. Hay que crear las carpetas correspondientes ('official-pics' y 'published-pics'), y colocarles las imágenes que queramos (la segunda puede estar vacía).

- Vamos a ver cómo hacer que el script se ejecute las veces que nosotros queramos. Como dije anteriormente, lo hago con el **Programador de Tareas de Windows**. Esto tiene la desventaja de que la máquina debe estar encendida para poder ejecutar el script. Subirlo a la nube sería una solución, pero por el momento no encontré una opción gratuita.

1. Primero, abrimos el Programador de Tareas y creamos una tarea nueva, le podemos poner cualquier nombre.  

    ![image](https://github.com/user-attachments/assets/18446f2b-32ca-4bda-a1a1-e2df7f3ada46)

    Le damos clic derecho y vamos a Propiedades.

2. En 'General', dejamos estos ajustes.

    ![image](https://github.com/user-attachments/assets/914ca297-7eab-4734-a863-30168b471238)

3. En 'Desencadenadores', especificamos cuándo queremos que se ejecute el script. Cada vez que se ejecute, se va a publicar el Tweet.

    ![image](https://github.com/user-attachments/assets/79e65710-c1e6-409b-93f6-86d360a042da)

    Esto es bastante personalizable.

4. Por último, seleccionamos el script que queremos que se ejecute. Para ello, vamos a 'Acciones' y creamos una nueva.

    ![image](https://github.com/user-attachments/assets/b2882f68-0553-407a-98ae-b7425949629a)

    Y dejamos esa configuración. Al seleccionar el script, ponemos la ubicación del archivo **node.exe** en nuestra máquina. Y en los argumentos, tenemos que colocar la ubicación de nuestro archivo **index.js**.


- Eso sería todo. De esa forma, el script se va a ejecutar cada vez que se cumpla un desencadenador del Programador de Tareas (siempre y cuando tu máquina esté encendida y tengas conexión a internet). No es necesario que tengas la sesión iniciada en X/Twitter, el programa se encarga de realizar la vinculación de forma automática.

- Si algo no funciona, mi contacto es **junmigue7@gmail.com**

## ⚠ ATENCIÓN: Proyecto deprecado

Como aclaré al principio y por si no lo leíste, este proyecto fue la primera versión que hice y ahora está en desuso. Andá a ver la versión mejorada.

👉 Link a la nueva versión: [Messi Perfect Shots](https://github.com/miguecode/messi-perfect-shots)
