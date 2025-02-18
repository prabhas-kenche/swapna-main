import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useAuth } from '../AuthContext';
import { auth, googleProvider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { FaShareAlt } from "react-icons/fa"; 
import AutoScrollButton from '../AutoScrollButton';
import './index.css';

const OurCars = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleDetails = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const cars = [
        {
            id: "swift_001",
            imgSrc: "https://cars.qeemat.com/suzuki/images/swift-new-2024-full.jpg",
            title: "Swift (Petrol)",
            features: ["4 Passengers", "Model 2018", "2 Bags"],
            description: "A sporty, fuel-efficient hatchback known for its reliability and agile city performance. Offers good cabin space and a sleek design.",
            prices: ["24HRS (300 KM) - 1500 Rs", "12HRS (300 KM) - 1300 Rs", "12HRS (150 KM) - 1000 Rs"]
        },
        {
            id: "i20_002",
            imgSrc: "https://imgd.aeplcdn.com/642x361/n/cw/ec/51428/hyundai-i20-left-front-three-quarter1.jpeg",
            title: "i20 (Petrol)",
            features: ["4 Passengers", "Model 2018", "2 Bags"],
            description: "A premium hatchback with modern features, excellent build quality, and a refined petrol engine for a smooth ride.",
            prices: ["24HRS (300 KM) - 1500 Rs", "12HRS (300 KM) - 1300 Rs", "12HRS (150 KM) - 1000 Rs"]
        },
        {
            id: "ritz_003",
            imgSrc: "https://t.ly/7olNT",
            title: "Ritz",
            features: ["4 Passengers", "Model 2012", "2 Bags"],
            description: "A compact, practical hatchback with tall-boy design and great headroom, offering fuel efficiency and easy handling.",
            prices: ["24HRS (300 KM) - 1500 Rs", "12HRS (300 KM) - 1300 Rs", "12HRS (150 KM) - 1000 Rs"]
        },
        {
            id: "figo_004", 
            imgSrc: "https://t.ly/CsXnI",
            title: "Ford Figo",
            features: ["4 Passengers", "Model 2015", "2 Bags"],
            description: "A small, sporty hatchback known for its responsive engine, solid build, and enjoyable driving dynamics.",
            prices: ["24HRS (300 KM) - 1500 Rs", "12HRS (300 KM) - 1300 Rs", "12HRS (150 KM) - 1000 Rs"]
        },
        {
            id: "aspire_005",
            imgSrc: "https://t.ly/S33d9",
            title: "Ford Aspire",
            features: ["5 Passengers", "Model 2018", "3 Bags"],
            description: " A compact sedan with a comfortable interior, strong diesel engine, and a focus on safety features like airbags and ABS.",
            prices: ["24HRS (300 KM) - 1800 Rs", "12HRS (300 KM) - 1600 Rs", "12HRS (150 KM) - 1300 Rs"]
        },
        {
            id: "dzire_006",
            imgSrc: "https://t.ly/wr1EN",
            title: "Swift Dzire",
            features: ["5 Passengers", "Model 2018", "3 Bags"],
            description: "A fuel-efficient, stylish compact sedan ideal for families, offering a spacious interior and smooth ride quality.",
            prices: ["24HRS (300 KM) - 1800 Rs", "12HRS (300 KM) - 1600 Rs", "12HRS (150 KM) - 1300 Rs"]
        },
        {
            id: "ecosport_007",
            imgSrc: "https://t.ly/fOenb",
            title: "Ecosport Diesel",
            features: ["5 Passengers", "Model 2017", "3 Bags"],
            description: "A rugged compact SUV with a fuel-efficient diesel engine, offering good torque and features suited for both city and off-road driving.",
            prices: ["24HRS (300 KM) - 2100 Rs", "12HRS (300 KM) - 1800 Rs", "12HRS (150 KM) - 1450 Rs"]
        },
        {
            id: "sonet_008",
            imgSrc: "https://i.cdn.newsbytesapp.com/images/l41120230408124304.jpeg",
            title: "Kia Sonet Diesel",
            features: ["5 Passengers", "Model 2024", "3 Bags"],
            description: "A tech-loaded subcompact SUV featuring a clutchless manual transmission, sunroof, and infotainment for a comfortable, high-tech ride.",
            prices: ["24HRS (300 KM) - 2500 Rs", "12HRS (300 KM) - 1950 Rs", "12HRS (150 KM) - 1550 Rs"]
        },
        {
            id: "ertiga_xl6_009",
            imgSrc: "https://res.cloudinary.com/dagkvnqd9/image/upload/20190823065014_maruti-xl6-3_em88gn.jpg",
            title: "Ertiga & XL6",
            features: ["5 Passengers", "Model 2024", "3 Bags"],
            description: "Spacious MPVs ideal for families, with the Ertiga offering practicality and the XL6 featuring captain seats and a more premium feel.",
            prices: ["24HRS (300 KM) - 2500 Rs", "12HRS (300 KM) - 2150 Rs", "12HRS (150 KM) - 1650 Rs"]
        }
    ];

    const handleBookCar = async (car) => {
        try {
          if (user) {
            navigate('/car-book-form', { state: { car } });
          } else {
            const result = await signInWithPopup(auth, googleProvider);
            if (result.user) {
              navigate('/car-book-form', { state: { car } });
            }
          }
        } catch (error) {
          console.error('Error during booking or login:', error);
        }
      };

      const handleShare = async () => {
        const sharableLink = `${window.location.origin}/ourcars`;
        const shareData = {
            title: 'Our Cars - Swapna Self Drive Cars',
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
            alert("Our Cars link copied to clipboard!");
        }

        setModalOpen(false); // Close modal after sharing
    };

    return (
        <>
            <Header />
            <div className='our-cars-container'>
                <div className="our-cars text-center" id="our-cars-section">
                    <h1>OUR CARS</h1>
                    <p>HOME/<span>OUR CARS</span></p>
                </div>
                <div>
                    <div className=" pt-5 pb-5 car-card-container-2 text-center">
                        {cars.map((car, index) => (
                            <div className="car-card text-center" key={car.id}>
                                <img src={car.imgSrc} alt={`${car.title}-car`} />
                                <h2>{car.title}</h2>
                                <div className="car-features">
                                    <div>
                                        <i className="fa-solid fa-person"></i> {car.features[0]}
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-car"></i> {car.features[1]}
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-suitcase-rolling"></i> {car.features[2]}
                                    </div>
                                </div>
                                <p>{car.description}</p>

                                {visibleIndex === index && (
                                    <div className="car-hidden-details car-visible">
                                        {car.prices.map((price, priceIndex) => (
                                            <p key={priceIndex}>{price}</p>
                                        ))}
                                    </div>
                                )}

                                <button className="button" onClick={() => toggleDetails(index)}>
                                    {visibleIndex === index ? "Hide Details" : "View Details"}
                                </button>

                                {visibleIndex === index && (
                                    <button className="ml-2 button" onClick={() => handleBookCar(car)}>
                                        Book My Car
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                <div className='share-icon-container-2 d-flex flex-row justify-content-center mb-5' onClick={handleShare}>
                <FaShareAlt className="share-icon-2" />
                <span className="share-text-2 pl-2">Share</span>
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
                

                <div className="note-container">
  <div className="notes">
    <h4>Ensure clarity before renting because clarity is key for 
        a smooth rental experience.</h4>
    <ul>
      <li>You must be 21 years old or above.</li>
      <li>You should have an authorized driving license.</li>
      <li>You should provide any one of the following ID proofs: Voter ID or Aadhar Card.</li>
      <li>You are not allowed to rent a car if you are involved in any traffic-related cases.</li>
      <li>We provide easy payment methods including Cash, Debit Card, Credit Card, and UPI Payments.</li>
      <li>You must provide all necessary documents when booking your rental car.</li>
      <li>
        AFTER 300 KM:
        <ul>
          <li>Hatchback and Sedan cars will be charged ₹5 per km.</li>
          <li>Compact SUVs will be charged ₹6 per km.</li>
          <li>Ertiga and XL6 will be charged ₹7 per km.</li>
        </ul>
      </li>
      <li>All prices exclude Fastag, fuel, and fines.</li>
      <li>Smoking and drinking alcohol in cars is strictly prohibited. If found, a ₹1000 fine will be imposed.</li>
      <li>The maximum speed limit is 100 kmph.</li>
    </ul>
  </div>
</div>

                <div>
                    <Footer />
                    <div className="footer-note">
                        Copyright © 2024 Swapna Self Drive Cars. All Rights Reserved.
                        Powered by{' '}
                        <a 
                            href="https://www.instagram.com/vspaze_technologies?igsh=bnh5YTB6MnI5NnVx" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'underline' }}
                        >
                            Vspaze Technologies
                        </a>
                    </div>

                </div>
            </div>
            <AutoScrollButton />
        </>
    );
};

export default OurCars;