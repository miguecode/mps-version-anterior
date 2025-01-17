require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const fs = require("fs");
const path = require("path");

// Function that returns the selected file full path, randomly selected from the folder "official-pics"
const selectRandomImage = () => {
  try {
    const picsFolder = path.join(__dirname, "official-pics");

    // Create an array of strings, each element will be the file name of the container folder
    const files = fs.readdirSync(picsFolder);

    // Select a random file and save its name
    randomFile = files[Math.floor(Math.random() * files.length)];

    // Save the full path of the randomly selected image
    const imagePath = path.join(picsFolder, randomFile);

    // Return the full path of the randomly selected image
    return imagePath;
  } catch (error) {
    console.log(
      "An error occurred in the selectRandomImage function: " + error
    );
  }
};

// Function that moves the selected image to the 'published-pics' folder
const movePublishedImage = (imagePath) => {
  try {
    const publishedPicsFolder = path.join(__dirname, "published-pics");

    // Get the file name
    const fileName = path.basename(imagePath);

    // Create the new path where the image will be placed
    const newPath = path.join(publishedPicsFolder, fileName);

    // Move the image
    fs.renameSync(imagePath, newPath);
  } catch (error) {
    console.error(
      "An error occurred in the movePublishedImage function: " + error
    );
  }
};

// Function to post an image on Twitter/X
const postImageOnTwitter = async (imagePath) => {
  try {
    // Upload the image to the Twitter/X server and get the media ID
    let mediaId = await twitterClient.v1.uploadMedia(imagePath);

    // Post the tweet with the uploaded image
    await twitterClient.v2.tweet({
      text: "", // You can write something here...
      media: {
        media_ids: [mediaId], // Use the media ID of the uploaded image
      },
    });

    console.log(`${imagePath} was successfully published!`);

    // Move the published image to the 'published-pics' folder so it won't be selected again
    movePublishedImage(imagePath);
  } catch (error) {
    console.error(
      "An error occurred in the postImageOnTwitter function: " + error
    );
  }
};

// This is used to publish specific pics that we want, which aren't selected randomly
// const specificImage = path.join(__dirname, 'official-pics') + "/fileName.jpg";
// const specificImage2 = path.join(__dirname, 'other-pics') + '/fileName.jpg';

// Call both functions to publish
const selectedImage = selectRandomImage();
postImageOnTwitter(selectedImage);
