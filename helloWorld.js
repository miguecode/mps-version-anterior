require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")
// const cron = require('node-cron'); // Importa el módulo cron

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("Hello World!");
  } catch (e) {
    console.log(e)
  }
}

tweet();

/*node
cron.schedule('38 19 * * *', tweet, {
  timezone: "America/Argentina/Buenos_Aires"
});*/


// Este fue mi primer script, funciona para publicar un Hello World!