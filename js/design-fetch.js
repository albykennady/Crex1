 // Firebase configuration
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
    import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
    const analytics = getAnalytics(app);
    const storage = getStorage(app);

    document.getElementById("logo").addEventListener("click", function() {
        const logosRef = ref(storage, 'logolist/');

        // Fetch the list of logo files
        listAll(logosRef).then((result) => {
            result.items.forEach((imageRef) => {
                getDownloadURL(imageRef).then((url) => {
                    // Create a card element for each logo
                    const logoCard = document.createElement("div");
                    logoCard.classList.add("logo-card");
                    const logoImg = document.createElement("img");
                    logoImg.src = url;
                    logoImg.width = 100; // Adjust size as needed
                    logoImg.height = 100; // Adjust size as needed
                    logoCard.appendChild(logoImg);

                    // Add click event to the logo card
                    logoCard.addEventListener("click", function() {
                        updateTshirtImage(url);
                    });

                    // Append the logo card to the logo-selection div
                    document.getElementById("logo-selection").appendChild(logoCard);
                }).catch((error) => {
                    console.log("Error getting download URL: ", error);
                });
            });
        }).catch((error) => {
            console.log("Error listing logos: ", error);
        });
    });