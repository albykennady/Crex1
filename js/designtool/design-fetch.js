import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDYlCSgksz5aGrRd57He-yfuo8zzcog_I",
    authDomain: "product-40143.firebaseapp.com",
    databaseURL: "https://product-40143-default-rtdb.firebaseio.com",
    projectId: "product-40143",
    storageBucket: "product-40143.appspot.com",
    messagingSenderId: "397255272673",
    appId: "1:397255272673:web:829df4d68ea98cc7eb2fa0",
    measurementId: "G-566VGYNG2K"
};

 
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

 // Function to display images from Firestore
 async function displayImagesFromFirestore() {
    imageContainer.innerHTML = '';
    try {
      const querySnapshot = await getDocs(collection(db, 'images'));
      querySnapshot.forEach((doc) => {
        const logoCard = document.createElement('div');
        logoCard.classList.add('logo-card');
        const imgElement = document.createElement('img');
        imgElement.src = doc.data().dataUrl;
        imgElement.className = 'img-thumbnail';
        logoCard.appendChild(imgElement);
  
        // Define the url variable
        const url = doc.data().dataUrl;
  
        // Add click event to the logo card
        logoCard.addEventListener('click', function () {
          updateTshirtImage(url);
        });
        
  
        // Append the logo card to the logo-selection div
        document.getElementById('logo-selection').appendChild(logoCard);
      });
    } catch (error) {
      console.error('Error getting images:', error);
    }
  }

  displayImagesFromFirestore();

