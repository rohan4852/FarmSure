const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'contract_farming'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html'); // Updated to new home page
});

app.get('/marketplace', (req, res) => {
    res.sendFile(__dirname + '/public/marketplace.html'); // New marketplace page
});
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html'); // New marketplace page
});


// Additional API endpoints for contract management
app.post('/api/create-contract', (req, res) => {
    // Logic to create a contract
});

app.post('/api/secure-payment', (req, res) => {
    // Logic to process payment securely
    // This could involve integrating with a payment gateway API
    res.json({ success: true, message: 'Payment processed successfully' });
});

const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});