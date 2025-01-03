import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "Idea Submission",
      description:
        "Share your creative programming ideas that align with the Sustainable Development Goals (SDGs).",
      icon: "💡",
    },
    {
      title: "Collaboration Opportunities",
      description:
        "Connect with like-minded individuals and industry professionals to refine and develop your ideas.",
      icon: "🤝",
    },
    {
      title: "Software House Support",
      description:
        "Get assistance from leading software houses to transform your innovative ideas into reality.",
      icon: "🏢",
    },
    {
      title: "Impactful Solutions",
      description:
        "Contribute to creating technologies that address societal and environmental challenges.",
      icon: "🌍",
    },
  ];

  return (
    <div className="services-container">
      <div className="services-hero">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">
          Empowering innovators to make a difference through technology and collaboration.
        </p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
