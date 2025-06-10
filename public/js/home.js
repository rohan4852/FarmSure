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
    const modeToggle = document.getElementById('modeToggle');
    const userNav = document.getElementById('userNav');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');
    const logoutButton = document.getElementById('logout-button');


    // Check for saved user preference in local storage
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.checked = true; // Set toggle to checked
    }

    // Update auth UI based on login status
    updateAuthUI();

    // Setup logout functionality
    setupLogout();

    // Add toggle for user dropdown content visibility
    const userDropdown = document.querySelector('#userNav .user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
            const dropdownContent = this.querySelector('.user-dropdown-content');
            if (dropdownContent) {
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            }
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', function () {
            const dropdownContent = userDropdown.querySelector('.user-dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    }

    // Event Listeners for modals
    loginBtn.addEventListener('click', () => toggleModal(loginModal, true));
    signupBtn.addEventListener('click', () => toggleModal(signupModal, true));
    closeLogin.addEventListener('click', () => toggleModal(loginModal, false));
    closeSignup.addEventListener('click', () => toggleModal(signupModal, false));
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) toggleModal(loginModal, false);
        if (event.target === signupModal) toggleModal(signupModal, false);
    });

    // Dark Mode Toggle
    modeToggle.addEventListener('change', () => {
        const modalContents = document.querySelectorAll('.modal-content');
        if (modeToggle.checked) {
            document.body.classList.add('dark-mode');
            modalContents.forEach(modal => modal.classList.add('dark-mode'));
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            modalContents.forEach(modal => modal.classList.remove('dark-mode'));
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Login Form Submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, role, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    alert('Login successful');
                    // Save user data to localStorage
                    localStorage.setItem('user', JSON.stringify({
                        username: data.username,
                        email: email,
                        role: role
                    }));
                    toggleModal(loginModal, false);
                    authButtons.style.display = 'none';

                    // Update UI to show user is logged in
                    updateUserUI(data.username);
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error('Login Error:', err);
                alert('Login failed');
            });
    });

    // Signup Form Submission
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        console.log('Signup form submitted');

        const username = document.getElementById('username').value.trim();
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const role = document.getElementById('signupRole').value.trim();

        // Client-side validation
        if (!username || !fullname || !email || !password || !role) {
            alert('Signup Alert: All fields are required');
            return;
        }

        console.log('Sending signup request', { username, fullname, email, password, role });

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, fullName: fullname, email, password, role })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Signup response', data);
                if (data.message === 'Signup successful') {
                    alert('Signup successful. Please login now.');
                    toggleModal(signupModal, false);
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error('Signup Error:', err);
                alert('Signup failed');
            });
    });


    // Access Marketplace Button
    accessMarketplaceBtn.addEventListener('click', () => {
        window.location.href = '/marketplace.html';
    });

    // Logout Button
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username');
            localStorage.removeItem('user');
            if (userInfo) userInfo.style.display = 'none';
            if (authButtons) authButtons.style.display = 'block';
            if (userNav) userNav.innerHTML = '';
            alert('Logged out successfully');
        });
    }

    // Auto login if user exists in localStorage
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('username').textContent = savedUsername;
        document.getElementById('authButtons').style.display = 'none';
        userNav.innerHTML = `<span>Welcome, ${savedUsername}</span>`;
    }

    // Toggle Modal Function
    function toggleModal(modal, show) {
        modal.style.display = show ? 'block' : 'none';
    }
});

// Standard user authentication code to be used across all JS files

// Function to check if user is logged in and update UI accordingly
function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userNav = document.getElementById('userNav');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');

    if (user) {
        // User is logged in
        if (usernameDisplay) usernameDisplay.innerText = user.username;
        if (userInfo) userInfo.style.display = 'block';
        if (authButtons) authButtons.style.display = 'none';
        if (userNav) userNav.innerHTML = `<span>Welcome, ${user.username}</span>`;
    } else {
        // User is not logged in
        if (userInfo) userInfo.style.display = 'none';
        if (authButtons) authButtons.style.display = 'block';
        if (userNav) userNav.innerHTML = '';
    }

    // Attach logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('user');
            alert('Logged out successfully');
            location.reload();
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', checkUserLogin);


// Function to update UI when user is logged in
function updateUserUI(username) {
    // Update existing user dropdown elements instead of replacing innerHTML
    const userDropdown = document.querySelector('#userNav .user-dropdown');
    const usernameText = document.getElementById('username-text');

    if (userDropdown && usernameText) {
        usernameText.textContent = username;
        userDropdown.style.display = 'block';
    }

    // Hide login/signup buttons
    if (authButtons) {
        authButtons.style.display = 'none';
    }

    // Attach logout functionality to existing logout link
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            logoutUser();
        });
    }
}

// Logout functionality
function logoutUser() {
    localStorage.removeItem('user');
    alert('Logged out successfully');
    window.location.reload();
}

// Check if user is already logged in
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    updateUserUI(user.username);
}

// Function to handle user authentication state
function updateAuthUI() {
    const userDropdown = document.querySelector('#userNav .user-dropdown');
    const authButtons = document.getElementById('authButtons');
    const usernameText = document.getElementById('username-text');

    // Check if user is logged in
    const user = localStorage.getItem('username');

    if (user) {
        // User is logged in
        userDropdown.style.display = 'block';
        usernameText.textContent = user;
        authButtons.style.display = 'none';
    } else {
        // User is not logged in
        userDropdown.style.display = 'none';
        authButtons.style.display = 'block';
    }
}

// Handle logout functionality
function setupLogout() {
    const logoutLink = document.getElementById('logout-link');

    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();

            // Clear user data from localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('user');

            // Show success message
            alert('Logged out successfully');

            // Reload page to update UI
            location.reload();
        });
    }
}
