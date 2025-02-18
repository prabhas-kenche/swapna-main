import React from 'react';
import { auth, googleProvider } from '../../firebaseConfig'; // Adjust the path as needed
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './index.css'

const GoogleLogin = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log('User signed in successfully');
            navigate('/'); // Redirect to home or dashboard after successful login
        } catch (error) {
            console.error('Error signing in with Google: ', error);
        }
    };

    return (
        <div className="google-login-container">
            <button onClick={handleGoogleLogin}><FcGoogle className='google-icon' />  Sign in with Google</button>
        </div>
    );
};

export default GoogleLogin;
