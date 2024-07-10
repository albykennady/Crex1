const firebaseConfig = {
    apiKey: "AIzaSyDczLLPnaREY3SahAMeKJ-DOMyVENmWwLk",
    authDomain: "crex-f9f68.firebaseapp.com",
    projectId: "crex-f9f68",
    storageBucket: "crex-f9f68.appspot.com",
    messagingSenderId: "209664661907",
    appId: "1:209664661907:web:933435dab65ebb20913066",
    databaseURL: "https://crex-f9f68-default-rtdb.firebaseio.com"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to Firebase Auth
  const auth = firebase.auth();
  const database = firebase.database(); // Reference to Firebase Database
  const storage = firebase.storage(); // Reference to Firebase Storage
  