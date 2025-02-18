import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const CarHire = () => {
    const navigate = useNavigate();

    // Function to handle redirection to the ourcars section
    const handleCardClick = () => {
        // Redirect to the ourcars section
        navigate('/ourcars');
    };

    return (
        <div className="car-hire-section pt-5 pb-5">
            <div className="car-hire-header text-center">
                <h1 className='car-hire-title'>ENTERPRISE CAR HIRE</h1>
            </div>
            <div className="car-card-container-2 d-flex flex-row">
                <div 
                    className="car-card-2 text-center col-12 col-md-2" 
                    onClick={handleCardClick}
                >
                    <img src="https://cars.qeemat.com/suzuki/images/swift-new-2024-full.jpg" alt="swift-car" />
                    <h2>Swift (Petrol)</h2>
                    <p>24HRS (300 KM) - 1500 Rs</p>
                    <p>14HRS (300 KM) - 1300 Rs</p>
                    <p>12HRS (150 KM) - 1000 Rs</p>
                    <p>Standard Class</p>
                    <div className="car-features">
                        <div><i className="fa-solid fa-person"></i> 4 Passengers</div>
                        <div><i className="fa-solid fa-car"></i> Model 2018</div>
                        <div><i className="fa-solid fa-suitcase-rolling"></i> 2 Bags</div>
                    </div>
                    <p>
                        The Swift car is a compact, fuel-efficient vehicle known for its sleek design and responsive performance.
                    </p>
                </div>
                <div 
                    className="car-card-2 text-center col-12 col-md-2" 
                    onClick={handleCardClick}
                >
                    <img src="https://imgd.aeplcdn.com/642x361/n/cw/ec/51428/hyundai-i20-left-front-three-quarter1.jpeg" alt="i20-car" />
                    <h2>i20 (Petrol)</h2>
                    <p>24HRS (300 KM) - 1500 Rs</p>
                    <p>14HRS (300 KM) - 1300 Rs</p>
                    <p>12HRS (150 KM) - 1000 Rs</p>
                    <p>Standard Class</p>
                    <div className="car-features">
                        <div><i className="fa-solid fa-person"></i> 4 Passengers</div>
                        <div><i className="fa-solid fa-car"></i> Model 2018</div>
                        <div><i className="fa-solid fa-suitcase-rolling"></i> 2 Bags</div>
                    </div>
                    <p>
                        The Hyundai i20 is a stylish and feature-packed hatchback designed for modern drivers.
                    </p>
                </div>
                <div 
                    className="car-card-2 text-center col-12 col-md-2" 
                    onClick={handleCardClick}
                >
                    <img src="https://t.ly/7olNT" alt="ritz-car" />
                    <h2>Ritz</h2>
                    <p>24HRS (300 KM) - 1500 Rs</p>
                    <p>14HRS (300 KM) - 1300 Rs</p>
                    <p>12HRS (150 KM) - 1000 Rs</p>
                    <p>Standard Class</p>
                    <div className="car-features">
                        <div><i className="fa-solid fa-person"></i> 4 Passengers</div>
                        <div><i className="fa-solid fa-car"></i> Model 2012</div>
                        <div><i className="fa-solid fa-suitcase-rolling"></i> 2 Bags</div>
                    </div>
                    <p>The Maruti Suzuki Ritz is a compact, fuel-efficient hatchback with a tallboy design, spacious interior and agile handling.</p>
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="button2" onClick={() => navigate('/ourcars')}>View More</button> 
            </div>
        </div>
    );
};

export default CarHire;