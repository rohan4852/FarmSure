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
    const logoutButton = document.getElementById('logout-button');
    const userNav = document.getElementById('userNav');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');

    // Check for saved user preference in local storage
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        modeToggle.checked = true; // Set toggle to checked
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
        if (modeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
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
                    document.getElementById('user-info').style.display = 'block';
                    document.getElementById('username').textContent = data.username;
                    toggleModal(loginModal, false);
                    document.getElementById('authButtons').style.display = 'none';
                    localStorage.setItem('username', data.username);
                    // Update userNav
                    userNav.innerHTML = `<span>Welcome, ${data.username}</span>`;
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
            body: JSON.stringify({ username, fullname, email, password, role })
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
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        localStorage.removeItem('user');
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('authButtons').style.display = 'block';
        userNav.innerHTML = '';
        alert('Logged out successfully');
    });

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
