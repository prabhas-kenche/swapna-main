import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { Carousel } from 'react-responsive-3d-carousel';
import './index.css';

// Helper function to render stars based on rating
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

const Reviews = () => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/reviews'); // Navigate to the reviews page
  };

  return (
    <>
      <div className="reviews-container">
      <h1 className='review-heading-1'>CUSTOMER EXPERIENCES</h1>
        <section className="review-section">
          <Carousel showArrows={false}>
            {reviews.map((review, index) => (
              <div key={index} className="review-slide">
                <img 
                  src={review.imgSrc} 
                  alt={`Profile-picture-of-${review.name}`} 
                  className="review-img" 
                />
                <h5 className="reviewer-name">{review.name}</h5>
                <p className="review-text">{review.review}</p>
                <div className="review-rating">{renderStars(review.rating)}</div>
              </div>
            ))}
          </Carousel>
          
        </section>
        <div className="text-center mt-4">
        <button 
          className="button2" 
          onClick={handleViewMoreClick} 
          style={{ 

            width: '150px'
          }}
        >
          View More
        </button>
      </div>
      </div>
    </>
  );
};

export default Reviews;
