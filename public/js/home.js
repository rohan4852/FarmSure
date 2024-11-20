document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('login');
    const signupModal = document.getElementById('signup');
    const closeLogin = loginModal.querySelector('.close');
    const closeSignup = signupModal.querySelector('.close');
    const accessMarketplaceBtn = document.getElementById('accessMarketplaceBtn');

    // Open Login Modal
    loginBtn.onclick = function () {
        loginModal.style.display = "block";
    }

    // Open Signup Modal
    signupBtn.onclick = function () {
        signupModal.style.display = "block";
    }

    // Close Login Modal
    closeLogin.onclick = function () {
        loginModal.style.display = "none";
    }

    // Close Signup Modal
    closeSignup.onclick = function () {
        signupModal.style.display = "none";
    }

    // Close modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == signupModal) {
            signupModal.style.display = "none";
        }
    }

    // Access Marketplace Button Functionality
    accessMarketplaceBtn.onclick = function () {
        window.location.href = 'marketplace.html'; // Redirect to marketplace
    }
});

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