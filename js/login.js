

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDCA_QhiDgKIPtAe1yZgAIk9bX9YqcPwOI",
//     authDomain: "loginwithfirebase-23191.firebaseapp.com",
//     projectId: "loginwithfirebase-23191",
//     storageBucket: "loginwithfirebase-23191.appspot.com",
//     messagingSenderId: "824705338311",
//     appId: "1:824705338311:web:4ec7d311d370138b57a7e2",
//     databaseURL: "https://loginwithfirebase-23191-default-rtdb.firebaseio.com" // Add this line for Realtime Database
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
//   // Reference to Firebase Auth
//   const auth = firebase.auth();
//   const database = firebase.database(); // Reference to Firebase Database
  
//   // Get elements
//   const loginForm = document.getElementById('login-form');
//   const registerForm = document.getElementById('register-form');
//   const loginEmail = document.getElementById('login-email');
//   const loginPassword = document.getElementById('login-password');
//   const loginButton = document.getElementById('login-button');
//   const registerEmail = document.getElementById('register-email');
//   const registerPassword = document.getElementById('register-password');
//   const registerButton = document.getElementById('register-button');
//   const showRegister = document.getElementById('show-register');
//   const showLogin = document.getElementById('show-login');
  
//   // Show register form
//   showRegister.addEventListener('click', () => {
//     loginForm.style.display = 'none';
//     registerForm.style.display = 'block';
//   });
  
//   // Show login form
//   showLogin.addEventListener('click', () => {
//     registerForm.style.display = 'none';
//     loginForm.style.display = 'block';
//   });
  
//   // Register
//   registerButton.addEventListener('click', () => {
//     const email = registerEmail.value.trim();
//     const password = registerPassword.value.trim();
//     auth.createUserWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         const user = userCredential.user;
//         // Save user data to Firebase Realtime Database
//         database.ref('users/' + user.uid).set({
//           email: email,
//           password: password // Note: It's not recommended to store passwords in plain text
//         });
//         alert("User Registered");
//         console.log('User registered:', user);
//         // Redirect or show success message
//       })
//       .catch(error => {
//         console.error('Error registering:', error);
//         alert('Error registering: ' + error.message);
//       });
//   });
  
//   // Login
//   loginButton.addEventListener('click', () => {
//     const email = loginEmail.value.trim();
//     const password = loginPassword.value.trim();
//     auth.signInWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         alert("User Logged in");
//         console.log('User logged in:', userCredential.user);
//         // Redirect or show success message
//       })
//       .catch(error => {
//         console.error('Error logging in:', error);
//         alert('Check User Credentials');
//       });
//   });
  

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCA_QhiDgKIPtAe1yZgAIk9bX9YqcPwOI",
    authDomain: "loginwithfirebase-23191.firebaseapp.com",
    projectId: "loginwithfirebase-23191",
    storageBucket: "loginwithfirebase-23191.appspot.com",
    messagingSenderId: "824705338311",
    appId: "1:824705338311:web:4ec7d311d370138b57a7e2",
    databaseURL: "https://loginwithfirebase-23191-default-rtdb.firebaseio.com" // Add this line for Realtime Database
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Auth
const auth = firebase.auth();
const database = firebase.database(); // Reference to Firebase Database

// Get elements
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

// Login
loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("User Logged in");
            console.log('User logged in:', userCredential.user);
            // Redirect or show success message
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Check User Credentials');
        });
});
