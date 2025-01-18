"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Opportunities: React.FC = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path); // Navigate to specific pages
  };

  return (
    <section id="opportunities" className="opportunities-section">
      <div className="opportunities-container">
        <h2 className="opportunities-heading">Career in Inofinity</h2>
        <div className="opportunities-grid">
          {/* Apply for Job */}
          <div className="opportunity-card">
            <div className="icon-container">
              <img src="/images/job.png" alt="Job Icon" className="icon" />
            </div>
            <h3>Apply for Job</h3>
            <p>Find your next full-time role and grow with Inofinity.</p>
            <button
              className="opportunity-button"
              onClick={() => handleClick("/opportunities")}
            >
              Apply
            </button>
          </div>

          {/* Apply for Internship */}
          <div className="opportunity-card">
            <div className="icon-container">
              <img
                src="/images/profiles.png"
                alt="Internship Icon"
                className="icon"
              />
            </div>
            <h3>Apply for Internship</h3>
            <p>Kickstart your career with hands-on experience.</p>
            <button
              className="opportunity-button"
              onClick={() => handleClick("/opportunities")}
            >
              Apply
            </button>
          </div>

          {/* Pitch Your Idea */}
          <div className="opportunity-card">
            <div className="icon-container">
              <img src="/images/project.png" alt="Idea Icon" className="icon" />
            </div>
            <h3>Pitch Your Idea</h3>
            <p>Share your innovative ideas and collaborate with us.</p>
            <button
              className="opportunity-button"
              onClick={() => handleClick("/opportunities")}
            >
              Pitch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
