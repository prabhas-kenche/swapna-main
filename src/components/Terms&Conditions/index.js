import React, { useEffect, useState } from 'react';
import { FaShareAlt } from "react-icons/fa";   
import './index.css';

const TermsAndConditions = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to top on page load
    }, []);

    const handleShare = async () => {
        const shareableLink = `${window.location.origin}/terms-conditions`;
        const shareData = {
            title: 'Terms and Conditions - Swapna Self Drive Cars',
            text: 'Check out our Terms and Conditions for important information.',
            url: shareableLink,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(shareableLink);
            alert('Terms and Conditions link copied to clipboard!');
        }

        setModalOpen(false); // Close modal after sharing
    };

    return (
        <div className="terms-conditions-container">
            <h1>Terms and Conditions</h1>
            <h2>1. Definitions</h2>
            <p>
                <strong>Renter</strong> means the person renting the vehicle.
                <br />
                <strong>Vehicle</strong> means the self-drive car rented by the Renter.
                <br />
                <strong>Rental Period</strong> means the duration of the rental.
            </p>

            <h2>2. Eligibility</h2>
            <p>
                The Renter must be at least 21 years old.
                <br />
                The Renter must possess a valid driver's license.
            </p>

            <h2>3. Rental Agreement</h2>
            <p>
                The Renter agrees to rent the Vehicle for the Rental Period.
                <br />
                The Renter must return the Vehicle on the agreed date and time.
            </p>

            <h2>4. Payment</h2>
            <p>
                The Renter must pay the rental fee and security deposit.
            </p>

            <h2>5. Vehicle Condition</h2>
            <p>
                The Vehicle will be delivered in good condition.
                <br />
                The Renter must return the Vehicle in the same condition.
            </p>

            <h2>6. Insurance</h2>
            <p>
                The Vehicle is insured, but the Renter is liable for damages.
            </p>

            <h2>7. Fuel and Maintenance</h2>
            <p>
                The Renter is responsible for fuel and maintenance costs.
            </p>

            <h2>8. Traffic Violations</h2>
            <p>The Renter is liable for traffic violations.</p>

            {/* Share icon */}
            <div className="share-icon-container" onClick={handleShare}>
                <FaShareAlt className="share-icon" />
                <span className="share-text">Share</span>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Share This Terms and Conditions</h2>
                        <button onClick={handleShare}>Share via Web Share API</button>
                        <button onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/terms-conditions`);
                            alert("Terms and Conditions link copied to clipboard!");
                            setModalOpen(false);
                        }}>Copy Link</button>
                        <button onClick={() => setModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TermsAndConditions;