// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDczLLPnaREY3SahAMeKJ-DOMyVENmWwLk",
  authDomain: "crex-f9f68.firebaseapp.com",
  databaseURL: "https://crex-f9f68-default-rtdb.firebaseio.com",
  projectId: "crex-f9f68",
  storageBucket: "crex-f9f68.appspot.com",
  messagingSenderId: "209664661907",
  appId: "1:209664661907:web:933435dab65ebb20913066"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

// Function to get images for a specific username
function getImages(username) {
    // Construct the folder path dynamically
    const folderPath = `Users/${username}`;
    const storageRef = ref(storage, folderPath);

    // List all items (images) in the folder
    listAll(storageRef)
        .then((result) => {
            result.items.forEach((imageRef) => {
                // Get the download URL for each image
                getDownloadURL(imageRef).then((url) => {
                    console.log(url);
                    // Create a div as a card container
                    const card = document.createElement('div');
                    card.classList.add('image-card');

                    // Create an <img> element to display the image
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = 'Image';
                    card.appendChild(img);

                    // Append the card to the images container
                    document.getElementById('images').appendChild(card);
                }).catch((error) => {
                    console.error("Error getting image URL:", error);
                });
            });
        })
        .catch((error) => {
            console.error("Error listing images:", error);
        });
}

// Replace 'yourUsername' with the actual username you want to use
 const username = 'Rayan'; // Replace this with dynamic username as needed
getImages(username);
