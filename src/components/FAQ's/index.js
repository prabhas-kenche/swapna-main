import React, { useEffect, useState } from 'react';
import { FaShareAlt } from "react-icons/fa"; 
import './index.css';

const FAQ = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShare = async () => {
        const sharableLink = `${window.location.origin}/faq`;
        const shareData = {
            title: 'FAQ - Swapna Self Drive Cars',
            text: 'Check out our FAQ for answers to common questions.',
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
            alert('FAQ link copied to clipboard!');
        }

        setModalOpen(false); // Close modal after sharing
    };

    return (
        <div className="faq-container">
            <h1>FAQ</h1>
            
            <h2>Booking and Rental</h2>
            <div className="faq-item">
                <strong>1. How do I book a self-drive car?</strong>
                <p>- Visit our website, select your location, dates, and car model, and follow the booking process or simply contact us through call or WhatsApp.</p>
            </div>
            <div className="faq-item">
                <strong>2. What are the rental durations?</strong>
                <p>- We rent cars on Daily, weekly, and monthly basis.</p>
            </div>
            <div className="faq-item">
                <strong>3. Can I extend my rental period?</strong>
                <p>- Yes, you can extend the car by contacting us at 8309772580, then our booking agent will check the availability of the car to confirm you.</p>
            </div>

            <h2>Payment and Pricing</h2>
            <div className="faq-item">
                <strong>1. What are the rental charges?</strong>
                <p>- Charges vary by car model and rental duration. Check our website for pricing.</p>
            </div>
            <div className="faq-item">
                <strong>2. What payment methods do you accept?</strong>
                <p>- We accept credit cards, debit cards, and UPI payments.</p>
            </div>
            <div className="faq-item">
                <strong>3. Is there a security deposit?</strong>
                <p>- Yes, it will be refunded upon returning the vehicle.</p>
            </div>

            <h2>Vehicle and Maintenance</h2>
            <div className="faq-item">
                <strong>1. What vehicles are available?</strong>
                <p>- Please check the ‘OUR CARS’ page on our website to know the availability of cars.</p>
            </div>
            <div className="faq-item">
                <strong>2. Are vehicles insured?</strong>
                <p>- Yes, our vehicles are fully insured.</p>
            </div>
            <div className="faq-item">
                <strong>3. Who is responsible for fuel and maintenance?</strong>
                <p>- The customer is responsible for fuel and maintenance costs.</p>
            </div>

            <h2>Eligibility and Requirements</h2>
            <div className="faq-item">
                <strong>1. What are the age requirements?</strong>
                <p>- Minimum age is 21.</p>
            </div>
            <div className="faq-item">
                <strong>2. Do I need a driver's license?</strong>
                <p>- Yes, a valid driver's license is required.</p>
            </div>
            <div className="faq-item">
                <strong>3. Are there any additional requirements?</strong>
                <p>- Original 4 wheeler driving license and Original Aadhar Card.</p>
            </div>

            <h2>Cancellation and Refund</h2>
            <div className="faq-item">
                <strong>1. Can I cancel my booking?</strong>
                <p>- Yes, you can cancel the booking before 12 hours. But the advance for booking will not be refunded.</p>
            </div>

            <h2>Miscellaneous</h2>
            <div className="faq-item">
                <strong>1. Are tolls and parking included?</strong>
                <p>- No, tolls and parking are the customer's responsibility.</p>
            </div>
            <div className="faq-item">
                <strong>2. What happens in case of an accident?</strong>
                <p>- Contact us immediately at 8309772580 or 9550884883. Customer needs to manage the damage costs.</p>
            </div>

            <h2>Contact Us</h2>
            <p>For any further questions or concerns, contact us at:</p>
            <p><strong>Phone:</strong> 8309772580 / 9550884883</p>
            <p><strong>Email:</strong> <a href="mailto:swapnaselfdrivecars@gmail.com">swapnaselfdrivecars@gmail.com</a></p>

            <div className='share-icon-container' onClick={handleShare}>
                <FaShareAlt className="share-icon" />
                <span className="share-text">Share</span>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Share This FAQ</h2>
                        <button onClick={handleShare}>Share via Web Share API</button>
                        <button onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/faq`);
                            alert("FAQ link copied to clipboard!");
                            setModalOpen(false);
                        }}>Copy Link</button>
                        <button onClick={() => setModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQ;