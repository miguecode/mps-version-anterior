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

// Este es el script más sencillo, funciona para publicar un Hello World!