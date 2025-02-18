import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
// eslint-disable-next-line no-unused-vars
import { Button, TextField } from '@mui/material';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../../firebaseConfig';
import './index.css';

function OTPLogin() {
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState("");

    const sendOtp = async () => {
        try {
            if (!phone) {
                console.log("Phone number is required");
                return;
            }

            const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
            if (formattedPhone.length > 16) {
                console.log("Phone number is too long");
                return;
            }

            console.log("Sending OTP to:", formattedPhone);

            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptcha);
            setUser(confirmation);
        } catch (err) {
            console.log("Error sending OTP:", err);
        }
    };

    const verifyOtp = async () => {
        try {
            await user.confirm(otp);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='phone-signin'>
            <div className='phone-content'>
                <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={(value) => setPhone(value)} 
                />
                <Button className='otp-button' onClick={sendOtp} sx={{ marginTop: "10px" }} variant='contained'>Send OTP</Button>
                <div style={{ marginTop: "10px" }} id='recaptcha'></div>
                <br />
                <input 
                    onChange={(e) => setOtp(e.target.value)} 
                    sx={{ marginTop: "10px", width: "300px" }} 
                    //variant='outlined' 
                    //size='small' 
                    placeholder='Enter Otp' 
                    className='otp-input'
                />
                <br />
                <Button className='otp-button' onClick={verifyOtp} sx={{ marginTop: "10px" }} variant='contained' color='success'>Verify OTP</Button>
            </div>
        </div>
    );
}

export default OTPLogin;
