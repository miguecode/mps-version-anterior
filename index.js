require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const fs = require('fs');
const path = require('path');

// Función que devuelve la ruta completa de un archivo elegido al azar dentro de la carpeta 'fotos_oficiales'
const seleccionarImagenAlAzar = () => {
  try {
    const directorioFotos = path.join(__dirname, 'fotos_oficiales');
    const archivos = fs.readdirSync(directorioFotos);
    archivoAleatorio = archivos[Math.floor(Math.random() * archivos.length)];
    const rutaImagen = path.join(directorioFotos, archivoAleatorio);
    
    return rutaImagen;
  } catch (error) {
    console.log('Ocurrió un error en la función seleccionarImagenAlAzar: ' + error);
  }
};

// Función que mueve la imagen seleccionada a la carpeta 'fotos_publicadas'
const moverImagenPublicada = (rutaImagen) => {
  try {
    const directorioFotosPublicadas = path.join(__dirname, 'fotos_publicadas');
    const nombreArchivo = path.basename(rutaImagen);
    const rutaNueva = path.join(directorioFotosPublicadas, nombreArchivo);
    fs.renameSync(rutaImagen, rutaNueva);
  } catch (error) {
    console.error('Ocurrió un error en la función moverImagenPublicada: ', error);
  }
};

// Función para publicar una imagen en Twitter
const publicarImagenEnTwitter = async (rutaImagen) => {
  try {
    // Primero necesito subir la imagen al servidor de Twitter, para que me devuelva su ID
    let mediaId = await twitterClient.v1.uploadMedia(rutaImagen); 
    
    // Ahora, realizo la publicación
    await twitterClient.v2.tweet({
      text: '', // Aca podría escribir algo en el Tweet
      media: {
        media_ids: [mediaId]
      }
    });

    console.log(`Se publicó correctamente la imagen ${rutaImagen}`);

    // Muevo la foto a la carpeta de fotos publicadas, para que ya no sea elegible
    moverImagenPublicada(rutaImagen);
  } catch (error) {
    console.error('Ocurrió un error en la función publicarImagenEnTwitter): ', error);
  }
};

// Esto sirve para publicar fotos específicas que queramos, y que no se seleccionen al azar.
// const imagenEspecifica = path.join(__dirname, 'fotos_oficiales') + "/nombreArchivo.jpg";
// const imagenEspecifica2 = path.join(__dirname, 'otras_fotos') + '/nombreArchivo.jpg';

// Invoco ambas funciones para realizar la publicación
const imagenSeleccionada = seleccionarImagenAlAzar();
publicarImagenEnTwitter(imagenSeleccionada);