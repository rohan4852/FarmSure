// Modal script
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    const modeToggle = document.getElementById('modeToggle');
    const userDropdown = document.querySelector('#userNav .user-dropdown');
    const authButtons = document.getElementById('authButtons');
    const usernameText = document.getElementById('username-text');
    const logoutLink = document.getElementById('logout-link');

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

    // Event listeners for opening modals
    loginBtn.addEventListener('click', () => openModal(modals[0]));
    signupBtn.addEventListener('click', () => openModal(modals[1]));

    // Event listeners for closing modals
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });

    // Dark Mode Toggle
    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
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

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', checkUserLogin);
