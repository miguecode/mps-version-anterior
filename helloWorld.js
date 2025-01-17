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

// This is the test script, it works to publish "Hello World!"