document.addEventListener('DOMContentLoaded', function () {
    // Selectors
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginform');
    const signupModal = document.getElementById('signup');
    const closeLogin = loginModal.querySelector('.close');
    const closeSignup = signupModal.querySelector('.close');
    const accessMarketplaceBtn = document.getElementById('accessMarketplaceBtn');
    const loginForm = loginModal.querySelector('form');
    const signupForm = signupModal.querySelector('form');

    // Event Listeners
    loginBtn.addEventListener('click', () => toggleModal(loginModal, true));
    signupBtn.addEventListener('click', () => toggleModal(signupModal, true));
    closeLogin.addEventListener('click', () => toggleModal(loginModal, false));
    closeSignup.addEventListener('click', () => toggleModal(signupModal, false));
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) toggleModal(loginModal, false);
        if (event.target === signupModal) toggleModal(signupModal, false);
    });

    // Login Form Submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;

        authenticateUser('/api/login', { email, role, password });
    });

    // Signup Form Submission
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const fullName = document.getElementById('full_name').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const role = document.getElementById('signupRole').value;

        authenticateUser('/api/signup', { username, fullName, email, password, role });
    });

    // Access Marketplace Button Functionality
    accessMarketplaceBtn.addEventListener('click', function () {
        window.location.href = '/marketplace.html';
    });

    // Functions
    function toggleModal(modal, isOpen) {
        modal.style.display = isOpen ? 'block' : 'none';
    }

    function authenticateUser(apiUrl, userData) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Authentication failed , try with valid credentials');
                }
                return response.json();
            })
            .then(data => {
                if (apiUrl === '/api/login') {
                    alert('Login successful');
                    localStorage.setItem('user', JSON.stringify({ username: data.username }));
                    window.location.href = '/public/result.html?msg=Login successful';
                } else {
                    alert('Signup successful');
                    toggleModal(signupModal, false); // Close the signup modal on success
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
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