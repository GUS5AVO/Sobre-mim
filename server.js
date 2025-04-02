const express = require('express');
const path = require('path');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const morgan = require('morgan');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(helmet());

// Database setup
const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL
            )
        `, (createTableErr) => {
            if (createTableErr) {
                console.error('Error creating table:', createTableErr.message);
            }
        });
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/contact', [
    body('name').trim().isLength({ min: 1 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().isLength({ min: 1 }).escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Insert into database
    db.run(`
        INSERT INTO contacts (name, email, message)
        VALUES (?, ?, ?)
    `, [name, email, message], function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ message: 'Failed to save message.' });
        }
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
