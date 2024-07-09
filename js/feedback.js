import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref as dbRef, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const database = getDatabase(app);

document.getElementById('submitFeedbackButton').addEventListener('click', submitFeedback);

function submitFeedback() {
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comment = document.getElementById('comment').value;
    const username = "athira01";

    const feedbackRef = dbRef(database, 'crex/feedback/' + username);

    // Use push to generate a unique key for each feedback entry
    const newFeedbackRef = push(feedbackRef);

    set(newFeedbackRef, {
        rating: rating,
        comment: comment,
        timestamp: new Date().toISOString() // Optional: Add a timestamp for each feedback entry
    }).then(() => {
        // alert('Feedback submitted successfully!');
        document.querySelector('.feedback').innerHTML = '<div class="thank-you-message"><video autoplay muted width="100% "  controls><source src="assets/cf1.2assets/testy.mp4" type="video/mp4"></video></div>';
    }).catch((error) => {
        console.error('Error submitting feedback:', error);
    });
}
