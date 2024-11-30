const translations = {
    en: {
        welcome: "Welcome to FarmSure",
        aboutTitle: "Assured Contract Farming System",
        aboutTitle1: "About the Assured Contract Farming System",
        marketplaceDescription: "Welcome to the Contract Farming System, a revolutionary platform designed to connect farmers with buyers, ensuring a seamless and efficient agricultural supply chain. Our mission is to empower farmers by providing them with the tools and resources they need to thrive in today's competitive market.",
        marketplaceTitle: "Available Contracts",
        // Add more translations for all text content
    },
    hi: {
        welcome: "फार्मसुर में आपका स्वागत है",
        aboutTitle: "सुनिश्चित अनुबंध खेती प्रणाली ",
        aboutTitle1: "सुनिश्चित अनुबंध खेती प्रणाली के बारे में",
        marketplaceDescription: "संविदा कृषि प्रणाली में आपका स्वागत है, एक क्रांतिकारी मंच जो किसानों को खरीदारों से जोड़ने के लिए डिज़ाइन किया गया है, यह सुनिश्चित करता है कि कृषि आपूर्ति श्रृंखला सुचारू और कुशल हो। हमारा मिशन किसानों को उन उपकरणों और संसाधनों के साथ सशक्त बनाना है जिनकी उन्हें आज के प्रतिस्पर्धी बाजार में सफल होने की आवश्यकता है।",
        marketplaceTitle: "उपलब्ध अनुबंध",
        // Add more translations for all text content
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(element => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[lang][key] || element.textContent;
    });
}

// Language selection event listener
document.getElementById("languageSelect").addEventListener("change", function () {
    changeLanguage(this.value);
});