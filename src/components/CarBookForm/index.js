import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import './index.css';

const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const CarBookForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profession: '',
        age: '',
        contact: '',
        email: '',
        address: '',
        pickupDate: '',
        pickupTime: '',
        dropDate: '',
        dropTime: '',
        visitingPlaces: '',
        totalDays: '',
        totalHours: 0,
    });

    const [minDropDate, setMinDropDate] = useState('');
    const [isDropDisabled, setIsDropDisabled] = useState(true);

    const getFutureDate = () => {
        const current = new Date();
        current.setMinutes(current.getMinutes() + 30);
        return current.toISOString().slice(0, 10);
    };

    const getFutureTime = () => {
        const current = new Date();
        current.setMinutes(current.getMinutes() + 30);
        return current.toTimeString().slice(0, 5);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'pickupDate' || name === 'pickupTime') {
            const updatedPickupDate = name === 'pickupDate' ? value : formData.pickupDate;
            const updatedPickupTime = name === 'pickupTime' ? value : formData.pickupTime;

            if (updatedPickupDate && updatedPickupTime) {
                setMinDropDate(`${updatedPickupDate}T${updatedPickupTime}`);
                setIsDropDisabled(false);
            } else {
                setIsDropDisabled(true);
            }

            calculateTotalTime(updatedPickupDate, updatedPickupTime, formData.dropDate, formData.dropTime);
        }

        if (name === 'dropDate' || name === 'dropTime') {
            const updatedDropDate = name === 'dropDate' ? value : formData.dropDate;
            const updatedDropTime = name === 'dropTime' ? value : formData.dropTime;
            calculateTotalTime(formData.pickupDate, formData.pickupTime, updatedDropDate, updatedDropTime);
        }
    };

    const calculateTotalTime = (pickupDate, pickupTime, dropDate, dropTime) => {
        if (pickupDate && pickupTime && dropDate && dropTime) {
            const startDate = new Date(`${pickupDate}T${pickupTime}`);
            const endDate = new Date(`${dropDate}T${dropTime}`);
            const differenceInTime = endDate.getTime() - startDate.getTime();

            const totalHours = Math.ceil(differenceInTime / (1000 * 3600));
            const differenceInDays = Math.floor(totalHours / 24);
            const remainingHours = totalHours % 24;

            setFormData((prevData) => ({
                ...prevData,
                totalDays: `${differenceInDays} days, ${remainingHours} hours`,
                totalHours,
            }));
        }
    };

    const triggerAlert = () => {
        setTimeout(() => {
            alert('30 minutes have passed since your booking submission!');
        }, 30 * 60 * 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.age < 21) {
            alert('You must be over 21 years old to book a car.');
            return;
        }

        if (formData.totalHours < 12) {
            alert('You must book the car for at least 12 hours.');
            return;
        }

        const emailData = {
            to_name: "Swapna Self Drive Cars",
            from_name: formData.name,
            ...formData,
            carName: location.state.car.title,
        };

        emailjs.send('service_fztnjic', 'template_mn2smp8', emailData, 'y5F9fIgHF5dMzYL9S')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSubmitted(true);
                triggerAlert();
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });

        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to book a car.");
            return;
        }

        try {
            const bookingData = {
                ...formData,
                carTitle: location.state.car.title,
                carImage: location.state.car.imgSrc,
                userId: user.uid,
            };

            await addDoc(collection(db, "my-bookings"), bookingData);

            //Database
            const dbPath = path.join(__dirname, '../../car_bookings.db')
            const db = new sqlite3.Database(dbPath)

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

            const stmt = db.prepare(`
                INSERT INTO bookings (
                    name, profession, age, contact, email, address, pickupDate, pickupTime, dropDate, dropTime, visitingPlaces, totalDays, totalHours, carTitle, CarImage, userId
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)

            stmt.run(
                formData.name, formData.profession, formData.age, formData.contact, formData.email, formData.address,
                formData.pickupDate, formData.pickupTime, formData.dropDate, formData.pickupTime, formData.visitingPlaces,
                formData.totalDays, formData.totalHours, location.state.car.title, location.state.car.imgSrc, user.uid
            )

            stmt.finalize();
            db.close();

            setSubmitted(true);
            navigate('/my-bookings');
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("Failed to submit booking. Please try again.");
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="car-book-form-container animate__animated animate__fadeIn">
            {submitted ? (
                <div className="success-message animate__animated animate__bounceIn">
                    <h2>Request Successful!</h2>
                    <p>Thanks for showing your interest in {location.state.car.title}.</p>
                    <p>Our team will contact you soon to confirm your booking.</p>
                    <button onClick={handleGoHome} className='btn btn-primary'>Go to Home Page</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="animate-slide-up">
                    <h2 className="heading-frame">Book {location.state.car.title}</h2>

                    <div className="form-group">
                        <label htmlFor="name"><span className="required-one">*</span> Name</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profession"><span className="required-one">*</span> Profession</label>
                        <input type="text" id="profession" name="profession" required value={formData.profession} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact"><span className="required-one">*</span> Contact Number</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            required
                            value={formData.contact}
                            onChange={handleChange}
                            onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                            maxLength="10"
                            title="Please enter a 10-digit contact number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email"><span className="required-one">*</span> Email ID</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address"><span className="required-one">*</span> Address</label>
                        <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age"><span className="required-one">*</span> Age</label>
                        <input type="number" id="age" name="age" required value={formData.age} onChange={handleChange} min="18" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pickupDate"><span className="required-one">*</span> Pickup Date</label>
                        <input type="date" id="pickupDate" name="pickupDate" required value={formData.pickupDate} min={getFutureDate()} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pickupTime"><span className="required-one">*</span> Pickup Time</label>
                        <input type="time" id="pickupTime" name="pickupTime" required value={formData.pickupTime} min={getFutureTime()} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dropDate"><span className="required-one">*</span> Drop Date</label>
                        <input type="date" id="dropDate" name="dropDate" required value={formData.dropDate} min={minDropDate} onChange={handleChange} disabled={isDropDisabled} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dropTime"><span className="required-one">*</span> Drop Time</label>
                        <input type="time" id="dropTime" name="dropTime" required value={formData.dropTime} onChange={handleChange} disabled={isDropDisabled} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="visitingPlaces"><span className="required-one">*</span> Visiting Places</label>
                        <input type='text' id="visitingPlaces" name="visitingPlaces" required value={formData.visitingPlaces} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="totalDays">Total Duration</label>
                        <input type="text" id="totalDays" name="totalDays" value={formData.totalDays} onChange={handleChange} disabled />
                    </div>

                    <div className='d-flex flex-row justify-content-center'>
                        <button type="submit" className='button'>Submit Booking</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CarBookForm;
