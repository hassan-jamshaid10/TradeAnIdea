import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">Welcome to Trade an Idea</h1>
        <p className="about-subtitle">
          Bridging ideas, technology, and the Sustainable Development Goals (SDGs).
        </p>
      </div>
      <div className="about-content">
        <section className="mission-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            We aim to create a platform where programmers, tech enthusiasts, and visionaries can 
            collaborate on innovative ideas that align with the **Sustainable Development Goals (SDGs)**. 
            Our goal is to inspire solutions that benefit society, safeguard the environment, and introduce 
            groundbreaking technology to the market.
          </p>
        </section>
        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>Share Your Ideas</h3>
              <p>
                Submit your creative, SDG-aligned ideas that address real-world challenges 
                and spark innovation.
              </p>
            </div>
            <div className="step">
              <h3>Collaborate</h3>
              <p>
                Work with like-minded individuals and connect with software houses to 
                bring your ideas to life.
              </p>
            </div>
            <div className="step">
              <h3>Transform</h3>
              <p>
                Turn your ideas into impactful solutions that improve our society 
                and environment while advancing technology.
              </p>
            </div>
          </div>
        </section>
        <section className="call-to-action">
          <h2>Be Part of the Change</h2>
          <p>
            Join us on our journey to build a brighter future through technology and 
            innovation. Let’s make a difference, one idea at a time.
          </p>
         
        </section>
      </div>
    </div>
  );
};

export default About;
