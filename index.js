require("dotenv").config({ path: __dirname + "/.env" }); // Me traigo la configuración especificada del archivo .env
const { twitterClient } = require("./twitterClient.js"); // Importo el cliente de Twitter
const fs = require('fs'); // Importo el módulo fs para leer archivos
const path = require('path'); // Importo el módulo path para manipular rutas de archivos

// __dirname es una palabra reservada, un string que contiene el valor de la ruta
// en la que está ubicado este archivo donde estoy escribiendo.

// Función que devuelve la ruta completa de un archivo elegido al azar de la carpeta 'fotos_oficiales'
const seleccionarImagenAlAzar = () => {
  try {
    const directorioFotos = path.join(__dirname, 'fotos_oficiales'); // Guardo la ruta de la carpeta contenedora de fotos
    const archivos = fs.readdirSync(directorioFotos); // Creo un array de strings, cada elemento va a ser el nombre de un archivo de la carpeta contenedora
    archivoAleatorio = archivos[Math.floor(Math.random() * archivos.length)]; // Selecciono un archivo al azar, y guardo su nombre
    const rutaImagen = path.join(directorioFotos, archivoAleatorio); // Guardo la ruta completa de la imagen seleccionada al azar
    
    return rutaImagen; // Retorno la ruta completa de la imagen seleccionada al azar
  } catch (error) {
    console.log('Ocurrió un error en la función seleccionarImagenAlAzar' + error);
  }
};

// Función que mueve la imagen seleccionada a la carpeta de fotos ya publicadas
const moverImagenPublicada = (rutaImagen) => {
  try {
    const directorioFotosPublicadas = path.join(__dirname, 'fotos_publicadas'); // Guardo la ruta de la carpeta contenedora de fotos
    const nombreArchivo = path.basename(rutaImagen); // Me guardo el nombre del archivo
    const rutaNueva = path.join(directorioFotosPublicadas, nombreArchivo); // Creo la ruta nueva donde se va a situar la imagen
    fs.renameSync(rutaImagen, rutaNueva); // La muevo
  } catch (error) {
    console.error('Ocurrió un error en la función moverImagenPublicada', error);
  }
};

// Función para publicar una imagen en Twitter
const publicarImagenEnTwitter = async (rutaImagen) => {
  try {
    // Primero necesito subir la imagen al servidor de Twitter, para que me devuelva su ID
    let mediaId = await twitterClient.v1.uploadMedia(rutaImagen); 
    
    // Realizo la publicación
    await twitterClient.v2.tweet({
      text: '', // Aca podría escribir algo en el Tweet
      media: {
        media_ids: [mediaId] // Especifico el ID de la imagen que subí al servidor de Twitter
      }
    });

    console.log(`Se publicó correctamente la imagen ${rutaImagen}`);
    moverImagenPublicada(rutaImagen); // Muevo la foto a la carpeta de fotos publicadas, para que ya no sea elegible
  } catch (error) {
      console.error('Ocurrió un error en la función publicarImagenEnTwitter): ', error);
  }
};

// const imagenEspecifica = path.join(__dirname, 'fotos_oficiales') + "/nombreArchivo.jpg";
// const imagenEspecifica2 = path.join(__dirname, 'otras_fotos') + '/nombreArchivo.jpg';

// Invoco ambas funciones para realizar el proceso
const imagenSeleccionada = seleccionarImagenAlAzar();
publicarImagenEnTwitter(imagenSeleccionada);