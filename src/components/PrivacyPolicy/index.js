import React, { useEffect, useState } from 'react';
import { FaShareAlt } from "react-icons/fa"; 
import './index.css';

const PrivacyPolicy = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShare = async () => {
        const sharableLink = `${window.location.origin}/privacy-policy`;
        const shareData = {
            title: 'Privacy Policy - Swapna Self Drive Cars',
            text: 'Check out our Privacy Policy for details on how we handle your personal information.',
            url: sharableLink,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(sharableLink);
            alert("Privacy Policy link copied to clipboard!");
        }

        setModalOpen(false); // Close modal after sharing
    };

    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            <p>
                At Swapna Self Drive Cars, we value your privacy and are committed to protecting your personal information.
            </p>

            <h2>1. Collection of Personal Information</h2>
            <p>We collect personal information from you when you:</p>
            <ul>
                <li>Register on our website</li>
                <li>Book a self-drive car</li>
                <li>Contact us through email or phone</li>
            </ul>
            <p>The information we collect includes:</p>
            <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Driver's basic license details</li>
            </ul>

            <h2>2. Use of Personal Information</h2>
            <p>We use your personal information to:</p>
            <ul>
                <li>Process your booking requests</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our services</li>
            </ul>

            <h2>3. Sharing of Personal Information</h2>
            <p>We share your personal information with law enforcement agencies (if required).</p>

            <h2>4. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access.</p>

            <h2>5. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to provide our services.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access your personal information</li>
                <li>Correct or update your information</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request deletion of your information</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>We use cookies to improve your browsing experience.</p>

            <h2>8. Changes to this Policy</h2>
            <p>We reserve the right to update this policy.</p>

            <h2>9. Location Tracking</h2>
            <p>
                To prevent theft, and to allow us to locate your location in emergency situations (accidents, breakdowns, etc.), we track
                the location of the vehicle. As part of our service, the location of the car may be released to police or similar parties
                for investigation and to provide assistance in emergencies.
            </p>

            <h2>10. No Liability</h2>
            <p>
                By accessing the website, the user agrees that Swapna Self Drive Cars will not be liable for any direct or indirect loss,
                liability, indirect and consequential damages of any nature whatsoever, arising from the use of the website and from the
                content on the website.
            </p>

            <h2>11. Contact Us</h2>
            <p>
                For any privacy-related concerns, contact: <a href="mailto:swapnaselfdrivecars@gmail.com">swapnaselfdrivecars@gmail.com</a> or
                call us at <a href="tel:+918309772580">8309772580</a>.
            </p>

            <h2>Consent</h2>
            <p>By using our website, you consent to this privacy policy.</p>

            <div className='share-icon-container' onClick={handleShare}>
                <FaShareAlt className="share-icon" />
                <span className="share-text">Share</span>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Share This Privacy Policy</h2>
                        <button onClick={handleShare}>Share via Web Share API</button>
                        <button onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/privacy-policy`);
                            alert("Privacy Policy link copied to clipboard!");
                            setModalOpen(false);
                        }}>Copy Link</button>
                        <button onClick={() => setModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivacyPolicy;
