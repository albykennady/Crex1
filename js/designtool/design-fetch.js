// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDczLLPnaREY3SahAMeKJ-DOMyVENmWwLk",
    authDomain: "crex-f9f68.firebaseapp.com",
    projectId: "crex-f9f68",
    storageBucket: "crex-f9f68.appspot.com",
    messagingSenderId: "209664661907",
    appId: "1:209664661907:web:933435dab65ebb20913066"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

window.addEventListener('load', function() {
    const logosRef1 = ref(storage, 'images/logos/');

    // Fetch the list of logo files
    listAll(logosRef1).then((result) => {
        result.items.forEach((imageRef) => {
            getDownloadURL(imageRef).then((url) => {
                // Create a card element for each logo
                const logoCard = document.createElement("div");
                logoCard.classList.add("logo-card");
                const logoImg = document.createElement("img");
                logoImg.src = url;
                logoCard.appendChild(logoImg);

                // Add click event to the logo card
                logoCard.addEventListener("click", function() {
                    updateTshirtImage(url);
                });

                // Append the logo card to the logo-selection div
                document.getElementById("logo-selection1").appendChild(logoCard);
            }).catch((error) => {
                console.log("Error getting download URL: ", error);
            });
        });
    }).catch((error) => {
        console.log("Error listing logos: ", error);
    });
});

window.addEventListener('load', function() {
    const logosRef2 = ref(storage, 'images/text/');

    // Fetch the list of logo files
    listAll(logosRef2).then((result) => {
        result.items.forEach((imageRef) => {
            getDownloadURL(imageRef).then((url) => {
                // Create a card element for each logo
                const logoCard = document.createElement("div");
                logoCard.classList.add("logo-card");
                const logoImg = document.createElement("img");
                logoImg.src = url;
                logoCard.appendChild(logoImg);

                // Add click event to the logo card
                logoCard.addEventListener("click", function() {
                    updateTshirtImage(url);
                });

                // Append the logo card to the logo-selection div
                document.getElementById("logo-selection2").appendChild(logoCard);
            }).catch((error) => {
                console.log("Error getting download URL: ", error);
            });
        });
    }).catch((error) => {
        console.log("Error listing logos: ", error);
    });
});