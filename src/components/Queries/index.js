import React from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

const Queries = () => {
  const navigate = useNavigate(); // React Router Hook for navigation

  return (
    <div>
      <section className="how-we-work-2">
        <h1 className='about2'>ESSENTIALS</h1>
        <div className="steps-container-2">
          <div className="step-2">
            <div className="icon-container-2" onClick={() => navigate('/privacy-policy')}>
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <h3>PRIVACY POLICY</h3>
            <p>Protecting your personal information and privacy.</p>
          </div>
          <div className="step-2">
            <div className="icon-container-2" onClick={() => navigate('/faq')}>
              <i className="fa-solid fa-question-circle"></i>
            </div>
            <h3>FAQ</h3>
            <p>Answers to common questions about rentals.</p>
          </div>
          <div className="step-2">
            <div className="icon-container-2" onClick={() => navigate('/terms-conditions')}>
              <i className="fa-solid fa-file-contract"></i>
            </div>
            <h3>TERMS & CONDITIONS</h3>
            <p>Review your rights and responsibilities here.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Queries;
