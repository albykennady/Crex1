import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
 
// Your web app's Firebase configuration
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
 
// Get the Proceed button element
const proceedButton = document.getElementById('Addtocart');
 
proceedButton.addEventListener('click', async function(event) {
    event.preventDefault();
 
    // Get the div element
    const div = document.getElementById('tshirt-div');
 
    // Capture the div as an image using html2canvas
    html2canvas(div).then(async function(canvas) {
      // Get the image data URL from the canvas
      const imageDataURL = canvas.toDataURL();
 
      // Create a Blob from the image data URL
      const response = await fetch(imageDataURL);
      const blob = await response.blob();
 
      // Generate a unique filename using a random ID
      const randomId = Math.floor(Math.random() * 1000000000).toString();
      const fileName = `tshirtdesign${randomId}`;
 
      // Create a new Firebase Storage reference for the T-shirt design
      const storageRefTshirt = ref(storage, `CartFolder/Tshirt/${fileName}.png`);
     
      const uploadTaskTshirt = uploadBytesResumable(storageRefTshirt, blob);
      uploadTaskTshirt.on('state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTaskTshirt.snapshot.ref).then((downloadURL) => {
            console.log('Image uploaded successfully! Download URL:', downloadURL);
            // Add the image to the cart or database
            //...
          });
        }
      );
 
      // Create a new Firebase Storage reference for the cart
      const storageRefCart = ref(storage, `CartFolder/cart/${fileName}.png`);
      const uploadTaskCart = uploadBytesResumable(storageRefCart, blob);
     
      uploadTaskCart.on('state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTaskCart.snapshot.ref).then((downloadURL) => {
            console.log('Image uploaded successfully! Download URL:', downloadURL);
            // Add the image to the cart or database
 
            window.location.href = `cart.html`;
            //...
          });
        }
      );
    }).catch(function(error) {
      console.error('Error capturing div:', error);
    });
  });
   