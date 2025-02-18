import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';

// Helper function to render stars
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="star full">★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half" className="star half">★</span>);
  }

  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
  }

  return stars;
};

const reviews = [
  {
    name: "Abhinav Kaushik",
    imgSrc: "https://res.cloudinary.com/dagkvnqd9/image/upload/image1_j8dd01.png",
    review: "Very good car service. All the cars I have rented were in good condition. The best part is that the owner is very cooperative.",
    rating: 5
  },
  {
    name: "Naveen Godavarthy",
    imgSrc: "https://res.cloudinary.com/dagkvnqd9/image/upload/ALV-UjVg_6KlQY4qzg_jOn1tmrrJkRfeohqv4DBB33RCW-6tQl2qrsTJAQ_w75-h75-p-rp-mo-br100_woaklp.png",
    review: "Totally impressed with the service. The car was well maintained Surprisingly, the package is very much affordable compared to others. Must recommended...Completely satisfied 😍",
    rating: 5
  },
  {
    name: "Kunal Gupta",
    imgSrc: "https://res.cloudinary.com/dagkvnqd9/image/upload/ALV-UjUx6JWzdwOlB_kRtq2QQEbbuL6Ak1ab-69UdrpbTNbbTDTPTQ8s_w75-h75-p-rp-mo-br100_edtsgp.png",
    review: "Had a really good experience, cars are well maintained and the owner is also very friendly.",
    rating: 5
  },
  {
    name: "Yogi Vlogs",
    imgSrc: "https://res.cloudinary.com/dagkvnqd9/image/upload/ALV-UjUQoXpju4C-vMoOklywEjNYxAPTrdcSnN8gUFAvXENCvxKv5ceJ_w75-h75-p-rp-mo-br100_h4puy9.png",
    review: "I am impressed with the service. Well maintained cars. People were so polite. Highly recommended.",
    rating: 5
  },
  {
    name: "Vijay Kumar",
    imgSrc: "https://res.cloudinary.com/dagkvnqd9/image/upload/ALV-UjWhyQNoBZIenAZvCXWQ_4h8kx2BfDN16nVFAS2_AicNOKwSoDzf0w_w75-h75-p-rp-mo-br100_fe8ox9.png",
    review: "Good condition nd we’ll maintained cars with reasonable price nd offers…Tqu see u soon again",
    rating: 5
  }
];

const OurReviews = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top instantly
  }, []);

  const handleViewMore = () => {
    window.open('https://www.google.com/search?client=ms-android-xiaomi&sca_esv=2bd1bbaced4e221a&sca_upv=1&biw=393&bih=776&cs=0&sxsrf=ADLYWII_7uy-BI-tGvl8imK4ET61kvRLjg:1726967711127&q=swapna+self+drive+cars+jadcherla+reviews&uds=ADvngMh1i1Q3Gnc0hElgp5aYtI_OHwhRr0_wBEOp_08BRo5n-zmmRdn8X8yOyZwgspIa7WP_UD494eS7RJZQG8LvDiDdq76pmNLjS9TT5QoOieqEEhF0Fyov3KDYpvGVUoCadWNRhyG1Bj57OwViQrvik79UFdDdnWo_PTxM6vGzJF767KQH_9kHGk72SBhZmgJdGQfINEKc31Or_lDlOQ11wlQ-i7z18Y_oKJWZR5t5c0Tko-SOBdcPO-7TYUiqWQrMGC8B8ZHV6wQdDaHl2cRoi24ocWOKy03K2cSjrEO35o3fsQ0O4EHrWKX3rqNegOIzNhkX7pJnl5mjns7uq67uqRC0Ttsu0XcewEl9KxZvX-8FCoSqgBVY3JKz_5qRmW_mcOovoL9PnJzPRqa-Eu20UctG06hFhLDnPWXDMJPCcHPSMvOFLDlFkYbNmceqPW6itXwnegOZPl94tHjn-ZL9DQzAEYj-RvBxrwahmh6v48GATCC-y7JFh7qxBZ-Bj8eex592RNgDYXYcgrj2e4fJyng3cyf8xkJjqH696jlVxD-4AXTa3yA&si=ACC90nwjPmqJHrCEt6ewASzksVFQDX8zco_7MgBaIawvaF4-7upoXEd1xRZXDhwqQkUNjqgf_SFrJU_WLm7IeLSsgCtXYIXI4uV3fuS9MTzLkk2kDRjxMWFk7Kv8kDH-tkDYjjHk6Td3pAWarF7aPj0cGsKfTyDk3cDlJvH6MwjNdbvcMnUKwqM%3D&sa=X&ictx=1&stq=1&lei=n2_vZuWOB92p4-EP9ILLyQY', '_blank');
  };

  return (
    <>
      <Header />
      <div className='reviews-page-container'>
      <div className="header-section text-center">
        <h1>GOOGLE REVIEWS</h1>
        <p>HOME/<span>GOOGLE REVIEWS</span></p>
      </div>
      <div className="reviews-vertical-container">
        <h1 className="review-heading">All Reviews</h1>
        <div className="reviews-vertical">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <img 
                src={review.imgSrc} 
                alt={`Review ${index + 1}`} 
                className="review-img-vertical" 
              />
              <h5 className="reviewer-name">{review.name}</h5>
              <p className="review-text-vertical">{review.review}</p>
              <div className="review-rating-vertical">{renderStars(review.rating)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button 
          className="button2" 
          onClick={handleViewMore} 
          style={{ 
            display: 'block', 
            margin: '0 auto', 
            width: '150px', /* Adjust the width as needed */
            padding: '8px 16px', /* Adjust padding for button size */
            fontSize: '14px' /* Adjust the font size */
          }}
        >
          View All Reviews
        </button>
      </div>
      <div className="pt-5">
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
    </>
  );
};

export default OurReviews;