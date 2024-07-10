// Get elements for login
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const forgotPassword = document.getElementById('forgot-password');

// Login
loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();
  
  // Retrieve the email associated with the username
  database.ref('crex/users/' + username).once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const email = userData.email;
        
        // Sign in with the retrieved email and password
        auth.signInWithEmailAndPassword(email, password)
          .then(userCredential => {
            // Store username in localStorage
            localStorage.setItem('username', username);
            Swal.fire({
              icon: 'success',
              title: 'User Logged in',
              confirmButtonText: 'OK'
            }).then(() => {
              window.location.href = 'homepage.html'; // Redirect to home page
            });
          })
          .catch(error => {
            console.error('Error logging in:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error logging in',
              text: 'Check User Credentials',
              confirmButtonText: 'OK'
            });
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Username not found',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(error => {
      console.error('Error retrieving user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error retrieving user data',
        confirmButtonText: 'OK'
      });
    });
});

// Forgot Password
forgotPassword.addEventListener('click', (event) => {
  event.preventDefault();
  Swal.fire({
    title: 'Reset Password',
    input: 'email',
    inputLabel: 'Enter your email address',
    inputPlaceholder: 'Email address',
    showCancelButton: true,
    confirmButtonText: 'Reset Password',
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      return auth.sendPasswordResetEmail(email)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Password Reset Email Sent',
            text: 'Check your email to reset your password',
            confirmButtonText: 'OK'
          });
        })
        .catch(error => {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
  });
});
