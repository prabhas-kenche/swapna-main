import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../../firebaseConfig";
import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader'; 
import GoogleLogin from '../GoogleLogin';
import OTPLogin from '../OTPLogin';
import { TbDeviceMobileCheck } from "react-icons/tb";
import './index.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGoogleLogin, setShowGoogleLogin] = useState(true); // Toggle between login methods
  const [showOTPLogin, setShowOTPLogin] = useState(false); // Control OTPLogin visibility
  const [hideOr, setHideOr] = useState(false); // Toggle OR separator visibility
  const [timeDuration, setTimeDuration] = useState('');

  useEffect(() => {
    fetch('/api/permanent-location') // Fetch from backend
      .then(response => response.json())
      .then(data => setTimeDuration(data.timeDuration))
      .catch(error => console.error('Error fetching time duration:', error));
  }, []);


  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError("You need to be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, "my-bookings"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const userBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(userBookings);
      } catch (err) {
        setError("Error fetching bookings: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleGoogleClick = () => {
    setShowGoogleLogin(true);
    setShowOTPLogin(false);
    setHideOr(true);
  };

  const handleOTPClick = () => {
    setShowGoogleLogin(false);
    setShowOTPLogin(true);
    setHideOr(true);
  };

  return (
    <div>
      <Header />
      <div className="contact-container">
        <div className="our-cars text-center">
          <h1>PREVIOUS BOOKINGS</h1>
          <p>HOME/<span>MY HISTORY</span></p>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-container">
            <img 
              src='https://res.cloudinary.com/dagkvnqd9/image/upload/workplace-semi-flat-color-character-editable-figure-full-body-person-on-white-business-time-simple-completing-job-tasks-cartoon-style-illustration-for-web-graphic-design-and-animation-vector-Photoroom_enlp36.png' 
              alt='please-login' 
              className='login-image'
            />
            <p>{error}</p>
            <div className="login-options">
              <h3>Login to view your bookings</h3>

              {/* Google and OTP login toggle buttons */}
              <div className="login-buttons d-flex flex-column justify-content-center mb-5">
                {showGoogleLogin ? (
                  <>
                    <GoogleLogin />
                    {!hideOr && (
                      <div className="login-separator">
                        <hr /><span className="or-text">OR</span><hr />
                      </div>
                    )}
                    <button className='mobile-button' onClick={handleOTPClick}><TbDeviceMobileCheck className='mobile-logo'/> Sign in with Mobile</button>
                  </>
                ) : (
                  <>
                    {!hideOr && (
                      <div className="login-separator">
                        <hr /><span className="or-text">OR</span><hr />
                      </div>
                    )}
                    {showOTPLogin && (
                      <div className="otp-login-slide">
                        <OTPLogin />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="error-container">
            <img src='https://res.cloudinary.com/dagkvnqd9/image/upload/v1727888604/R.b300d5768bd2b866b25656929d647200_pvfdnn.webp' alt='no-bookings' className='login-image' />
            <p className='pt-5'>No bookings yet.</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <img src={booking.carImage} alt={booking.carTitle} className="booking-car-image" />
                <h3>{booking.carTitle}</h3>
                <p>Name: {booking.name}</p>
                <p>Profession: {booking.profession}</p>
                <p>Contact: {booking.contact}</p>
                <p>Email: {booking.email}</p>
                <p>Pickup Date: {booking.pickupDate} at {booking.pickupTime}</p>
                <p>Drop Date: {booking.dropDate} at {booking.dropTime}</p>
                <p>Visiting Places: {booking.visitingPlaces}</p>
                <p>Total Duration: {booking.totalDays}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <div className="footer-note">
        Copyright © 2024 Swapna Self Drive Cars. All Rights Reserved.
        Powered by <a href="https://www.instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Vspaze Technologies</a>
      </div>
    </div>
  );
};

export default MyBookings;
