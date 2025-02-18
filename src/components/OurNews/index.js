import React from 'react';
import Header from '../Header';
import { useEffect } from 'react';
import './index.css'; // Import your CSS file

const OurNews = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top instantly
    }, []);

    const newsArticles = [
        {
            title: "Swift (Petrol)",
            imgSrc: "https://cars.qeemat.com/suzuki/images/swift-new-2024-full.jpg",
            date: { day: "19", month: "OCT" },
            description: "Were. Every forth one male man which. Brought won’t divide in. Hath gathering. Have. Open fifth face shall land fish kind isn’t let can’t blessed multiply third light, shall from winged, his creature isn’t midst said dominion in. Male firmament beginning dominion fourth he place shall",
        },
        {
            title: "i20 (Petrol)",
            imgSrc: "https://imgd.aeplcdn.com/642x361/n/cw/ec/51428/hyundai-i20-left-front-three-quarter1.jpeg",
            date: { day: "19", month: "OCT" },
            description: "Were. Every forth one male man which. Brought won’t divide in. Hath gathering. Have. Open fifth face shall land fish kind isn’t let can’t blessed multiply third light, shall from winged, his creature isn’t midst said dominion in. Male firmament beginning dominion fourth he place shall",
        },
        {
            title: "Kia Sonet Diesel",
            imgSrc: "https://i.cdn.newsbytesapp.com/images/l41120230408124304.jpeg",
            date: { day: "19", month: "OCT" },
            description: "Were. Every forth one male man which. Brought won’t divide in. Hath gathering. Have. Open fifth face shall land fish kind isn’t let can’t blessed multiply third light, shall from winged, his creature isn’t midst said dominion in. Male firmament beginning dominion fourth he place shall",
        },
        {
            title: "Ecosport Diesel",
            imgSrc: "https://t.ly/fOenb",
            date: { day: "19", month: "OCT" },
            description: "Were. Every forth one male man which. Brought won’t divide in. Hath gathering. Have. Open fifth face shall land fish kind isn’t let can’t blessed multiply third light, shall from winged, his creature isn’t midst said dominion in. Male firmament beginning dominion fourth he place shall",
        },
        {
            title: "Ford Figo",
            imgSrc: "https://t.ly/CsXnI",
            date: { day: "19", month: "OCT" },
            description: "Were. Every forth one male man which. Brought won’t divide in. Hath gathering. Have. Open fifth face shall land fish kind isn’t let can’t blessed multiply third light, shall from winged, his creature isn’t midst said dominion in. Male firmament beginning dominion fourth he place shall",
        },
    ];

    return (
        <>
            <Header />
            <div className="header-section text-center">
                <h1>OUR NEWS</h1>
                <p>HOME/<span>OUR NEWS</span></p>
            </div>
            <div className="article-list-container">
    {newsArticles.map((article, index) => (
        <div className="article-item" key={index}>
            <div className="article-image-wrapper">
                <img src={article.imgSrc} alt={`${article.title}-car`} className="article-image" />
                <div className="article-date-badge">
                    <span className="article-day">{article.date.day}</span>
                    <span className="article-month">{article.date.month}</span>
                </div>
            </div>
            <div className="article-details">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="article-actions">
                    <button className="read-more-btn">READ MORE</button>
                    <div className="article-share-section">
                        <span>SHARE THIS</span>
                        <div className="article-share-buttons">
                            <a href="https://x.com/"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.pinterest.com/"><i className="fab fa-pinterest"></i></a>
                            <a href="https://www.behance.net/"><i className="fab fa-behance"></i></a>
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

            <div className="pt-5">
                <div className="background-image">
                    <div className="content">
                        <img src="https://res.cloudinary.com/dzptijryk/image/upload/v1726250227/WhatsApp_Image_2024-09-13_at_9.33.52_PM-removebg_welufj.png" className="self-driving-cars-logo" alt="Self Driving Cars Logo" />
                        <p className="showroom-location">: SHOWROOM LOCATION :</p>
                        <p>Road No.6 Housing Board Colony, Jedcherla, Mahboobnagar (Dist)</p>
                        <div className="contact-info">
                            <p><span>PHONE:</span> 8309772580, 9550884883</p>
                            <p><span>EMAIL:</span> info@autozone.com</p>
                            <p><span>HOURS:</span> Mon – Fri :: 9am – 6pm</p>
                        </div>
                        <div className="social-icons">
                            <a href="https://x.com/"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.pinterest.com/"><i className="fab fa-pinterest"></i></a>
                            <a href="https://www.behance.net/"><i className="fab fa-behance"></i></a>
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/swapnaselfdrivecars?igsh=MTIzM2s3OTd3dzJvNw=="><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-note">
                    Copyright © 2024 Swapna Self Drive Cars. All Rights Reserved.
                </div>
            </div>
        </>
    );
};

export default OurNews;
