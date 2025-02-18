import React from 'react';
import './index.css'; // Ensure you create this CSS file for styling

const AutoplayCarousel = () => {
    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide mt-5" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="https://autozone-theme.com/lux/wp-content/uploads/2024/04/car-134344-1024x439.png"
                        className="d-block w-100"
                        alt="yellow-car"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="https://autozone-theme.com/lux/wp-content/uploads/2024/04/234-1024x439.png"
                        className="d-block w-100"
                        alt="brown-car"
                    />
                </div>
            </div>
        </div>
    );
};

export default AutoplayCarousel;