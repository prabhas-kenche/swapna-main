const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend requests

// SQLite database connection
const dbPath = path.join(__dirname, "car_bookings.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Database connection error:", err);
    else console.log("Connected to SQLite database");
});

// Ensure 'bookings' table exists
db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
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
    )
`);

// API Route to handle booking
app.post("/api/book-car", (req, res) => {
    const data = req.body;
    
    const stmt = db.prepare(`
        INSERT INTO bookings (
            name, profession, age, contact, email, address, pickupDate, pickupTime,
            dropDate, dropTime, visitingPlaces, totalDays, totalHours, carTitle, carImage, userId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        data.name, data.profession, data.age, data.contact, data.email, data.address,
        data.pickupDate, data.pickupTime, data.dropDate, data.dropTime, data.visitingPlaces,
        data.totalDays, data.totalHours, data.carTitle, data.carImage, data.userId,
        function (err) {
            if (err) {
                res.status(500).json({ message: "Error saving booking", error: err });
            } else {
                res.status(201).json({ message: "Booking successful", bookingId: this.lastID });
            }
        }
    );

    stmt.finalize();
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
