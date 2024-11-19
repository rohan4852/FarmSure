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