document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('login');
    const signupModal = document.getElementById('signup');
    const closeLogin = loginModal.querySelector('.close');
    const closeSignup = signupModal.querySelector('.close');
    const accessMarketplaceBtn = document.getElementById('accessMarketplaceBtn');
    const signupForm = document.getElementById('signupForm'); // Reference the signup form

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

    // Handle Signup Form Submission
    signupForm.onsubmit = function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const fullName = document.getElementById('full_name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Send data to the API
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                fullName,
                email,
                password,
                role
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                return response.json(); // Assuming the response is JSON
            })
            .then(data => {
                // Handle success (e.g., redirect to a result page)
                window.location.href = '/public/result.html?msg=Signup successful';
            })
            .catch(error => {
                console.error('Error:', error);
                // Display error message to the user
                alert('Error: ' + error.message); // Show error message
                // Optionally, you could redirect to an error page or show a modal with the error
            });
    };

    // Access Marketplace Button Functionality
    accessMarketplaceBtn.onclick = function () {
        window.location.href = '/public/marketplace.html';
    }
});