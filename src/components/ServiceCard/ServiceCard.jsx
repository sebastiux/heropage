// src/components/ServiceCard/ServiceCard.jsx
import React from 'react';
import './ServiceCard.scss';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="service-card">
      <div className="service-card__icon-wrapper">
        <img src={icon} alt={title} className="service-card__icon" />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__description">{description}</p>
    </div>
  );
};

export default ServiceCard;