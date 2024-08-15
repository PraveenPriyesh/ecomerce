const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, './users.json');

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
}));

// Function to read users from the JSON file
function readUsersFile(callback) {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return callback(err);
        try {
            const users = JSON.parse(data);
            callback(null, users);
        } catch (parseError) {
            callback(parseError);
        }
    });
}

// Get all users
app.get('/api/users', (req, res) => {
    readUsersFile((err, users) => {
        if (err) return res.status(500).json({ error: 'Error reading users file' });
        res.json(users);
    });
});

// Add or update user
app.post('/api/update-user', (req, res) => {
    const { userId, password } = req.body;
    console.log('Received POST request:', { userId, password }); // Log received data

    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            console.error('Error reading file:', err); // Log the error
            return res.status(500).json({ error: 'Unable to read file' });
        }
        let users;
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError); // Log the error
            return res.status(500).json({ error: 'Error parsing data' });
        }

        const existingUserIndex = users.findIndex(user => user.userId === userId);
        if (existingUserIndex > -1) {
            users[existingUserIndex] = { userId, password };
        } else {
            users.push({ userId, password });
        }

        fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err); // Log the error
                return res.status(500).json({ error: 'Unable to save file' });
            }
            console.log('User data updated:', { userId, password }); // Log successful update
            res.json({ userId, password });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
