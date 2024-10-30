# 🤖 Bot de Twitter

Este repositorio contiene lo necesario para poder vincularte a una cuenta de X/Twitter mediante su API, y poder realizar publicaciones (en este caso de imágenes).

## ⚽ ¿Qué es [Messi Perfect Shots](https://x.com/MessiPF)?

Messi Perfect Shots es mi bot de X/Twitter. La idea del bot es muy sencilla: publicar fotos de Lionel Messi en X/Twitter, de forma automática y seleccionadas al azar, todos los días. Empezó a funcionar en mayo de 2024 y consiguió sumar 3700 seguidores en unos 6 meses, con 346 publicaciones hasta el día de hoy, 29 de octubre de 2024. 

👉 Link: [Messi Perfect Shots](https://x.com/MessiPF)

![image](https://github.com/user-attachments/assets/52f19213-f705-4936-9c03-7926fca1d14f)

## 🤔 ¿Cómo funciona el proyecto?

- En el proyecto hay distintos archivos **JavaScript**, los cuales se encargan de la vinculación con la cuenta de X/Twitter a la que queremos apuntar, y otros que realizan la selección aleatoria de la imágen y su publicación.

- También hay varias carpetas con imágenes. **Estas carpetas no están subidas al repositorio**, pero son necesarias para que el script sepa de dónde elegir las fotos. Esto último también se podría hacer consumiendo las imágenes desde una API, pero para este caso me pareció óptimo tener mis propias imágenes y guardarlas de forma local.
    
- Para que el script se ejecute de forma automática todos los días, hago uso del **Programador de Tareas de Windows**. Con esa aplicación yo puedo indicarle exactamente cuándo quiero que se realice una publicación. Esto tiene la desventaja de que mi máquina necesita estar encendida para poder realizar la acción y que funcione. La solución sería subir el script a la nube, pero por ahora no encontré un lugar en el que se pueda hacer de forma gratuita.

- Para que el proyecto funcione, es necesario también tener instalado [Node.js](https://nodejs.org/en/) en tu máquina. Una vez clonado el repositorio y con Node.js instalado, hay que usar el comando ```npm install```, para tener todos los archivos necesarios de la API de X/Twitter, la cual es **twitter-api-v2** en su versión 1.16.1. Estos archivos aparecerán en la carpeta **node_modules**.

- El proceso de selección de imágenes y su publicación se trata de elegir de forma aleatoria una de todas las fotos ubicadas en la carpeta 'fotos_oficiales'. Una vez elegida y publicada, esta misma imágen se mueve a 'fotos_publicadas'. Esto es para esa imágen ya no sea seleccionable en un futuro.

## 🐦 ¿Cómo crear la cuenta y vincularse a ella mediante el código?

- El primer paso es crear la cuenta en X/Twitter de forma normal, en su web [X](https://x.com/home/).

- Después, hay que entrar al sitio web de X/Twitter creado para desarrolladores, [Developer X](https://developer.x.com/).

- Una vez iniciada la sesión en Developer X, tenemos que crear un proyecto. Cuando ya lo creamos, la plataforma nos va a brindar unas credenciales que vamos a tener que usar en el código para vincularlo al proyecto local. Es decir, hay que vincular el proyecto creado en este sitio web, con el proyecto local de nuestra máquina.

- OJO: Algo importante es que, antes de copiar los valores de las autenticaciones, hay que CONFIGURAR la forma de autenticación. ¿Por qué? Porque el proyecto, de forma predeterminada, está configurado para que sea de sólo Lectura. Hay que cambiar ese ajuste para que sea de Lectura y de Escritura. Una vez hecho eso, ahora sí tiene sentido generar todos los códigos, y copiarlos. 

- Algo que también tenemos que instalar es el paquete **dotenv**, el cual sirve para escribir archivos de tipo .env, que funcionan para guardar información sensible como variables de enterno. En este caso, vamos a guardar nuestros códigos de autenticación, los cuales nos brindó la plataforma de desarrolladores de X/Twitter. Entonces, ingresamos el comando:

    ```npm install dotenv```

- Ahora, vamos a crear un archivo llamado ```.env``` dentro del proyecto, el cual se tiene que ver así:

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

- Finalmente, hacemos la prueba del bot usando el script ```helloWord.js```. Al ejecutar este archivo, el programa va a hacer el intento de publicar un tweet que diga "Hello World!" en la cuenta que vinculamos anteriormente. Esta vinculación se realiza de forma automática en el archivo ```twitterClient.js```, el cual usa las variables del archivo .env.

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
