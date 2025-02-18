const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./car_bookings.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            profession TEXT,
            age INTEGER,
            contact TEXT,
            email TEXT,
            address TEXT,
            pickupDate TEXT,
            pickupTime TEXT,
            dropDate TEXT,
            dropTime TEXT,
            visitingPlaces TEXT,
            totalDays TEXT,
            totalHours INTEGER,
            carTitle TEXT,
            carImage TEXT,
            userId TEXT
        )`);
    }
});

app.post('/book-car', (req, res) => {
    const {
        name, profession, age, contact, email, address, 
        pickupDate, pickupTime, dropDate, dropTime, 
        visitingPlaces, totalDays, totalHours, carTitle, carImage, userId
    } = req.body;

    db.run(
        `INSERT INTO bookings 
        (name, profession, age, contact, email, address, pickupDate, pickupTime, dropDate, dropTime, visitingPlaces, totalDays, totalHours, carTitle, carImage, userId) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, profession, age, contact, email, address, pickupDate, pickupTime, dropDate, dropTime, visitingPlaces, totalDays, totalHours, carTitle, carImage, userId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, message: 'Booking successful!' });
            }
        }
    );
});

app.get('/bookings', (req, res) => {
    db.all('SELECT * FROM bookings', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
