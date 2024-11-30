// about.js

// Modal script
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Event listeners for opening modals
    loginBtn.addEventListener('click', () => openModal(modals[0]));
    signupBtn.addEventListener('click', () => openModal(modals[1]));

    // Event listeners for closing modals
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Function to open a specific modal
    function openModal(modal) {
        modal.style.display = "block";
    }

    // Function to close all modals
    function closeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            closeModal(modal);
        });
    }

    // Function to close a specific modal
    function closeModal(modal) {
        modal.style.display = "none";
    }
})
document.addEventListener('DOMContentLoaded', function () {
    const userNav = document.getElementById('userNav');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    // Simulate checking user session
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage

    if (user) {
        // Hide login and signup buttons
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';

        // Show username
        userNav.innerHTML = `<span>Welcome, ${user.username}</span>`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const userNav = document.getElementById('userNav');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');
    const logoutButton = document.getElementById('logout-button');

    // Check user session
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage

    if (user) {
        // User is logged in
        usernameDisplay.innerText = user.username; // Display username
        userInfo.style.display = 'flex'; // Show user info
        authButtons.style.display = 'none'; // Hide login/signup buttons
        userNav.innerHTML = `<span>Welcome, ${user.username}</span>`; // Display username in navbar
    } else {
        // User is not logged in
        userInfo.style.display = 'none'; // Hide user info
        authButtons.style.display = 'block'; // Show login/signup buttons
        userNav.innerHTML = ''; // Clear userNav
    }

    // Logout functionality
    logoutButton.addEventListener('click', function () {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        // Reload the page to reset the UI
        location.reload();
    });
});