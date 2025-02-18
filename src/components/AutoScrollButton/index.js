import React, { useState, useEffect } from 'react';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';

const AutoScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show the button when the user scrolls down
    const toggleVisibility = () => {
        if (window.pageYOffset > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to the top of the page smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button onClick={scrollToTop} style={styles.button}>
                    <FaRegArrowAltCircleUp style={styles.icon} />
                </button>
            )}
        </div>
    );
};

const styles = {
    button: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '5px',
        marginBottom: '38px',
        backgroundColor: '#17252a', // Background color for the button
        border: 'none',
        borderRadius: '50%', // Circular button
        cursor: 'pointer',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
    },
    icon: {
        color: '#def2f1', // Icon color
        fontSize: '30px', // Adjust icon size
    }
};

export default AutoScrollButton;
