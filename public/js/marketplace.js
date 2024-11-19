document.addEventListener('DOMContentLoaded', () => {
    fetchContracts();
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

    // Function to fetch and display contracts
    function fetchContracts() {
        const contracts = [
            { id: 1, title: "Organic Vegetable Farming", description: "A contract for growing organic vegetables with guaranteed market access.", duration: "12 months", },
            { id: 2, title: "Fruit Orchard Contract", description: "A contract for establishing and maintaining a fruit orchard.", duration: "24 months" },
            { id: 3, title: "Cereal Crop Farming", description: "A contract for the cultivation of cereal crops like wheat and rice.", duration: "6 months" }
        ];

        const contractsContainer = document.getElementById('contracts-container');
        contracts.forEach(contract => {
            const contractElement = document.createElement('div');
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

    // Function to show contract details in a modal
    function showContractDetails(contractId) {
        const contracts = [
            { id: 1, title: "Organic Vegetable Farming", description: "A contract for growing organic vegetables with guaranteed market access.", duration: "12 months", TypeofVegetables: " Carrots, Lettuce, Tomatoes", FarmingMethod: "Organic", Location: "Farm Region A" },
            { id: 2, title: "Fruit Orchard Contract", description: "A contract for establishing and maintaining a fruit orchard.", duration: "24 months", TypeofVegetables: "Apples, Oranges, Berries", FarmingMethod: "Conventional", Location: "Farm Region B" },
            { id: 3, title: "Cereal Crop Farming", description: "A contract for the cultivation of cereal crops like wheat and rice.", duration: "6 months", TypeofVegetables: "Wheat, Rice", FarmingMethod: "Conventional", Location: "Farm Region C" }
        ];

        const contract = contracts.find(c => c.id == contractId);
        if (contract) {
            const detailsContent = `
                <h3>${contract.title}</h3>
                <p>Description: ${contract.description}</p>
                <p>Duration: ${contract.duration}</p>
                <p>Types Of Vegitables: ${contract.TypeofVegetables}</p>
                <p>Farming Method: ${contract.FarmingMethod}</p>
                <p>Location: ${contract.Location}</p>
            `;
            document.getElementById('contract-details-content').innerHTML = detailsContent;
            openModal(document.getElementById('contract-details'));
        }
    }

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