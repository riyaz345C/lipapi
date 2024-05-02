const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Sample users (usually stored in a database)
const users = [
    { id: 1, username: 'user1', password: '$2a$10$8hz5AnA2RPdRZ7yC3X0bJOSAYj7GrPHrJWWNR6K8f0a4Lk/OUoFaa' } // hashed password for 'password123'
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Authentication endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Verify password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, 'your_secret_key_here', { expiresIn: '1h' });

        // Send token in response
        res.json({ token });
    });
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }

    jwt.verify(token, 'your_secret_key_here', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Authentication failed. Token invalid.' });
        }
        req.user = decoded;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
