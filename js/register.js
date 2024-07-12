// Get elements for register
const registerForm = document.getElementById('register-form');
const registerUsername = document.getElementById('register-username');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerButton = document.getElementById('register-button');
const showLogin = document.getElementById('show-login');

// Register
registerButton.addEventListener('click', (event) => {
  event.preventDefault();
  const username = registerUsername.value.trim();
  const email = registerEmail.value.trim();
  const password = registerPassword.value.trim();
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      // Save user data to Firebase Realtime Database with username as the key
      database.ref('crex/users/' + username).set({
        email: email,
        password: password
      }).then(() => {
        // Create a folder with the username in the CartFolder in Firebase Storage
        const storageRef = storage.ref(`Users/${username}/`);
        storageRef.child('.keep').putString('This is a placeholder file').then(() => {
          Swal.fire({
            icon: 'success',
            title: 'User Registered',
            text: 'User Registered and folder created in Firebase Storage',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = 'login.html'; // Redirect to login page
          });
        });
      });
    })
    .catch(error => {
      console.error('Error registering:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error registering',
        text: error.message,
        confirmButtonText: 'OK'
      });
    });
});
