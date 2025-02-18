import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';

import { auth, googleProvider } from '../../firebaseConfig'; 
import { signInWithPopup, signOut } from 'firebase/auth'; 
import { useAuth } from '../AuthContext'; // Import useAuth
import './index.css';
// eslint-disable-next-line no-unused-vars
import Loader from '../Loader'; // Assuming you have a Loader component

const Header = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false); // Loader state
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link based on current route
  }, [location]);

  const handleLoginClick = async () => {
    setLoading(true); // Show loader
    try {
      if (user) {
        await signOut(auth);
        navigate('/'); // Redirect to home after logout
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error('Error signing in/out: ', error);
    } finally {
      setLoading(false); // Hide loader after process
    }
  };

  // Effect for handling login location
  useEffect(() => {
    const handleLogin = async () => {

      // If logged in and on MY HISTORY page, do nothing (stay on the page)
      if (location.pathname === '/my-bookings') {
        return;
      }
      if (!user) return;
    };

    handleLogin();
  }, [user, location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="navbar-content">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://res.cloudinary.com/dagkvnqd9/image/upload/WhatsApp_Image_2024-09-13_at_9.33.52_PM-removebg_oalbnc.png"
            className="self-driving-cars-logo-1"
            alt="Self Driving Cars Logo"
          />
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNavAltMarkup"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink
            exact
            className={`nav-link ${activeLink === '/' ? 'active-nav' : ''}`} 
            to="/" 
            onClick={() => setActiveLink('/')}>
            HOME
          </NavLink>
          <NavLink
            className={`nav-link ${activeLink === '/ourcars' ? 'active-nav' : ''}`} 
            to="/ourcars"
            onClick={() => setActiveLink('/ourcars')}>
            OUR CARS
          </NavLink>
          <NavLink
            className={`nav-link ${activeLink === '/reviews' ? 'active-nav' : ''}`} 
            to="/reviews"
            onClick={() => setActiveLink('/reviews')}>
            REVIEWS
          </NavLink>
          <NavLink
            className={`nav-link ${activeLink === '/contact' ? 'active-nav' : ''}`} 
            to="/contact"
            onClick={() => setActiveLink('/contact')}>
            CONTACT
          </NavLink>
          <NavLink
            className={`nav-link ${activeLink === '/aboutus' ? 'active-nav' : ''}`} 
            to="/aboutus"
            onClick={() => setActiveLink('/aboutus')}>
            ABOUT US
          </NavLink>
          <NavLink
            className={`nav-link ${activeLink === '/my-bookings' ? 'active-nav' : ''}`} 
            to="/my-bookings"
            onClick={() => setActiveLink('/my-bookings')}>
            MY HISTORY
          </NavLink>

          {/* Conditionally render LOGOUT link */}
          {user && (
            <NavLink
              className="nav-link"
              onClick={handleLoginClick} // Use handleLoginClick to log out
              to="#" // Prevent navigation on click
            >
              LOGOUT
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
