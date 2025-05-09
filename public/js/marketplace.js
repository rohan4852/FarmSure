document.addEventListener('DOMContentLoaded', () => {
    fetchContracts();
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('login');
    const signupModal = document.getElementById('signup');
    const closeLogin = loginModal.querySelector('.close');
    const closeSignup = signupModal.querySelector('.close');
    const accessMarketplaceBtn = document.getElementById('accessMarketplaceBtn');
    const contractDetailsModal = document.getElementById('contractDetailsModal');
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
        if (event.target === contractDetailsModal) { // Close contract details modal
            contractDetailsModal.style.display = "none";
        }
    }

    // Access Marketplace Button Functionality
    accessMarketplaceBtn.onclick = function () {
        window.location.href = 'marketplace.html'; // Redirect to marketplace
    }
});

// Function to fetch and display contracts
function fetchContracts() {
    const contracts = [
        { id: 1, title: "Organic Wheat Farming", description: "A contract for cultivating certified organic wheat, ensuring a guaranteed market and stable income for farmers.", duration: "2 Years (4 growing seasons)." },
        { id: 2, title: "Hybrid Tomato Production", description: "A contract to supply premium hybrid tomatoes with assured pricing and bi-weekly delivery schedules.", duration: "1 Year." },
        { id: 3, title: "Turmeric Cultivation for Ayurvedic Products", description: "A long-term contract for growing high-curcumin turmeric tailored to the needs of the Ayurvedic industry.", duration: "3 Years." },
        { id: 4, title: "Mango Pulp Supply Contract", description: "A seasonal contract for producing and delivering high-quality mango pulp to juice manufacturers.", duration: "2 Years." },
        { id: 5, title: "Dairy Feed Maize Production", description: "A contract to supply high-quality maize as feed for dairy cooperatives, ensuring consistent quality and timely delivery.", duration: "1.5 Years." },
        { id: 6, title: "Basmati Rice Export Contract", description: "A long-term contract for cultivating premium-quality Basmati rice for export purposes.", duration: "5 Years." },
        { id: 7, title: "Strawberry Farming Agreement", description: "A seasonal contract for cultivating premium-quality strawberries with quick delivery timelines to retail chains.", duration: "6 months (renewable annually)." },
        { id: 8, title: "Medicinal Herb Cultivation (Ashwagandha)", description: "A contract for growing Ashwagandha with guaranteed purchase and support for cultivation and processing.", duration: "3 years." },
    ];

    const contractsContainer = document.getElementById('contracts-container');
    contracts.forEach(contract => {
        const contractElement = document.createElement('div');
        contractElement.classList.add('contract');
        contractElement.innerHTML = `
                <h3>${contract.title}</h3>
                <p>${contract.description}</p>
                <p>Duration: ${contract.duration}</p>
                <button class="view-details" data-id="${contract.id}">View Details</button>
            `;
        contractsContainer.appendChild(contractElement);
    });

    // Set up event listeners for the "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const contractId = event.target.getAttribute('data-id');
            showContractDetails(contractId);
        });
    });
}

// Function to show contract details in the modal
function showContractDetails(contractId) {
    const contracts = [
        { id: 1, title: "Organic Wheat Farming", description: "A contract for cultivating certified organic wheat, ensuring a guaranteed market and stable income for farmers.", duration: "2 Years (4 growing seasons).", crops: "Organic Wheat", FarmingMethod: "Organic", Buyer: "[Company / Individual Name]", Price: "₹35 per kg", Quantity: "5,000 kg per season", QualityStandards: "Certified organic; no chemical pesticides or fertilizers used.", DeliveryTimeline: "Within 7 days of harvest.", AdditionalTerms: "Buyer will provide seeds and organic fertilizers as part of the contract.", postedDate: "2024-11-10", expiryDate: "2024-11-30" },
        { id: 2, title: "Hybrid Tomato Production", description: "A contract to supply premium hybrid tomatoes with assured pricing and bi-weekly delivery schedules.", duration: "1 Year.", crops: "Hybrid Tomatoes", FarmingMethod: "Conventional", Buyer: "[Company / Individual Name]", Price: "₹25 per kg", Quantity: "10,000 kg per month", QualityStandards: "Grade A tomatoes, no blemishes.", DeliveryTimeline: "Every 15 days.", AdditionalTerms: "Quality checks will be conducted by the buyer.", postedDate: "2024-11-12", expiryDate: "2024-12-12" },
        { id: 3, title: "Turmeric Cultivation for Ayurvedic Products", description: "A long-term contract for growing high-curcumin turmeric tailored to the needs of the Ayurvedic industry.", duration: "3 Years.", crops: "Turmeric", FarmingMethod: "Organic", Buyer: "[Company / Individual Name]", Price: "₹100 per kg", Quantity: "2,000 kg per year", QualityStandards: "High curcumin content, certified organic.", DeliveryTimeline: "Annually after harvest.", AdditionalTerms: "Support for cultivation techniques will be provided.", postedDate: "2024-11-15", expiryDate: "2024-12-15" },
        { id: 4, title: "Mango Pulp Supply Contract", description: "A seasonal contract for producing and delivering high-quality mango pulp to juice manufacturers.", duration: "2 Years.", crops: "Mango", FarmingMethod: "Conventional", Buyer: "[Company / Individual Name]", Price: "₹50 per kg", Quantity: "15,000 kg per season", QualityStandards: "No preservatives, 100% pure mango pulp.", DeliveryTimeline: "Within 10 days of processing.", AdditionalTerms: "Payment will be made within 30 days of delivery.", postedDate: "2024-11-18", expiryDate: "2024-12-18" },
        { id: 5, title: "Dairy Feed Maize Production", description: "A contract to supply high-quality maize as feed for dairy cooperatives, ensuring consistent quality and timely delivery.", duration: "1.5 Years.", crops: "Maize", FarmingMethod: "Conventional", Buyer: "[Company / Individual Name]", Price: "₹20 per kg", Quantity: "20,000 kg per month", QualityStandards: "Non-GMO, high energy content.", DeliveryTimeline: "Monthly deliveries.", AdditionalTerms: "Buyer will provide specifications for feed quality.", postedDate: "2024-11-20", expiryDate: "2025-05-20" },
        { id: 6, title: "Basmati Rice Export Contract", description: "A long-term contract for cultivating premium-quality Basmati rice for export purposes.", duration: "5 Years.", crops: "Basmati Rice", FarmingMethod: "Organic", Buyer: "[Company / Individual Name]", Price: "₹80 per kg", Quantity: "50,000 kg per year", QualityStandards: "Aged Basmati, long grain, aromatic.", DeliveryTimeline: "Annually after harvest.", AdditionalTerms: "Export documentation will be handled by the buyer.", postedDate: "2024-11-22", expiryDate: "2025-11-22" },
        { id: 7, title: "Strawberry Farming Agreement", description: "A seasonal contract for cultivating premium-quality strawberries with quick delivery timelines to retail chains.", duration: "6 months (renewable annually).", crops: "Strawberries", FarmingMethod: "Conventional", Buyer: "[Company / Individual Name]", Price: "₹150 per kg", Quantity: "5,000 kg per season", QualityStandards: "Fresh, no bruises, packed in ventilated boxes.", DeliveryTimeline: "Weekly deliveries during the season.", AdditionalTerms: "Quality checks will be conducted by the buyer.", postedDate: "2024-11-25", expiryDate: "2025-05-25" },
        { id: 8, title: "Medicinal Herb Cultivation (Ashwagandha)", description: "A contract for growing Ashwagandha with guaranteed purchase and support for cultivation and processing.", duration: "3 years.", crops: "Ashwagandha", FarmingMethod: "Organic", Buyer: "[Company / Individual Name]", Price: "₹300 per kg", Quantity: "1,000 kg per year", QualityStandards: "High root content, certified organic.", DeliveryTimeline: "Annually after harvest.", AdditionalTerms: "Technical support will be provided for cultivation.", postedDate: "2024-11-28", expiryDate: "2025-11-28" },
    ];

    const contract = contracts.find(c => c.id === parseInt(contractId));
    if (!contract) return;

    // Populate modal with contract details
    document.querySelector('.modal-title').textContent = contract.title;
    document.querySelector('.modal-description').textContent = contract.description;
    document.querySelector('.modal-duration').textContent = `Duration: ${contract.duration}`;
    document.querySelector('.modal-crops').textContent = `Crops: ${contract.crops}`;
    document.querySelector('.modal-farming-method').textContent = `Farming Method: ${contract.FarmingMethod}`;
    document.querySelector('.modal-buyer').textContent = `Buyer: ${contract.Buyer}`;
    document.querySelector('.modal-price').textContent = `Price: ${contract.Price}`;
    document.querySelector('.modal-quantity').textContent = `Quantity: ${contract.Quantity}`;
    document.querySelector('.modal-quality-standards').textContent = `Quality Standards: ${contract.QualityStandards}`;
    document.querySelector('.modal-delivery-timeline').textContent = `Delivery Timeline: ${contract.DeliveryTimeline}`;
    document.querySelector('.modal-additional-terms').textContent = `Additional Terms: ${contract.AdditionalTerms}`;
    document.querySelector('.modal-posted-date').textContent = `Posted Date: ${contract.postedDate}`;
    document.querySelector('.modal-expiry-date').textContent = `Expiry Date: ${contract.expiryDate}`;

    // Show the modal
    const modal = document.getElementById('contractDetailsModal');
    modal.style.display = 'block';
}

// Function to close modals
function closeModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

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

