import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust the path as needed
import { FidgetSpinner } from 'react-loader-spinner'; // Ensure this is the correct import
import { useLocation } from 'react-router-dom'; // Import React Router hook
import './index.css'; // Import the CSS file

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true); // Default to true to show spinner on every refresh
  const [showContent, setShowContent] = useState(false);

  const location = useLocation(); // Get current route

  useEffect(() => {
    // Check if we're on the home page
    const isHomePage = location.pathname === '/'; // Check if we're on the home page
    setShowSpinner(isHomePage); // Only show spinner on the home page

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Stop loading once the auth state is determined
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [location.pathname]); // Dependency on pathname

  useEffect(() => {
    if (!loading && showSpinner) {
      // Always display spinner for 2 seconds on refresh
      const timer = setTimeout(() => {
        setShowContent(true); // Show content after spinner is hidden
        setShowSpinner(false); // Hide spinner after 2 seconds
      }, 2000); // 2 seconds delay for spinner

      return () => clearTimeout(timer); // Clean up the timer
    } else if (!loading && !showSpinner) {
      setShowContent(true); // Show content if loading is done and no spinner
    }
  }, [loading, showSpinner]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading || !showContent ? (
        showSpinner ? (
          <div className="spinner-container">
            <FidgetSpinner
              visible={true}
              backgroundColor='#3aafa9'
              height="80"
              width="80"
              ariaLabel="fidget-spinner-loading"
              wrapperStyle={{}}
              wrapperClass="fidget-spinner-wrapper"
            />
          </div>
        ) : (
          <div className="loading-message"></div>
        )
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
