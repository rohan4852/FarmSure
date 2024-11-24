const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // For hashing passwords
const bodyParser = require('body-parser'); // To parse request bodies
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
        console.error('MySQL Connection Error: ', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Middleware to set Content-Security-Policy header
app.use((req, res, next) => {
    const nonce = crypto.randomUUID(); // Generate a random nonce
    res.setHeader("Content-Security-Policy", `
        default-src 'self'; // Allow resources from the same origin
        style-src 'self' https://fonts.googleapis.com; // Allow styles from Google Fonts
        font-src 'self' https://fonts.gstatic.com; // Allow fonts from Google Fonts
        script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; // Allow inline scripts and scripts from jsdelivr
    `);
    next();
});

// Middleware
app.use(express.static(__dirname + '/public')); // This serves files from the public directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html'); // Updated to new home page
});

app.get('/marketplace', (req, res) => {
    res.sendFile(__dirname + '/public/marketplace.html'); // New marketplace page
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html'); // New about page
});

app.get('/public/result.html', (req, res) => {
    res.sendFile(__dirname + '/public/result.html');
});

// Signup route
app.post('/api/signup', (req, res) => {
    const { username, fullName, email, password, role } = req.body;

    // Validate input
    if (!username || !fullName || !email || !password || !role) {
        console.log('Signup Alert: All fields are required');
        return res.status(400).json({ message: 'All fields are required' }); // Return error response
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

    const sql = 'INSERT INTO users (username, full_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, fullName, email, hashedPassword, role], (err, result) => {
        if (err) {
            console.log('Signup Alert: Signup unsuccessful');
            console.error('Signup Error: ', err);
            return res.status(500).json({ message: 'Signup unsuccessful' }); // Return error response
        }
        console.log('Signup Alert: Signup successful');
        res.status(201).json({ message: 'Signup successful' }); // Return success response
    });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            console.log('Login Alert: Login unsuccessful');
            console.error('Login Error: ', err);
            return res.redirect('/public/result.html?msg=Login unsuccessful'); // Redirect on failure
        }

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            console.log('Login Alert: Login unsuccessful');
            return res.redirect('/public/result.html?msg=Login unsuccessful'); // Redirect on failure
        }

        console.log('Login Alert: Login successful');
        // Store user information in session or token (for this example, we'll just send a success message)
        res.redirect('/public/result.html?msg=Login successful'); // Redirect on success
    });
});

// Additional API endpoints for contract management
app.post('/api/create-contract', (req, res) => {
    // Logic to create a contract
});

app.post('/api/secure-payment', (req, res) => {
    // Logic to process payment securely
    res.json({ success: true, message: 'Payment processed successfully' });
});

const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});