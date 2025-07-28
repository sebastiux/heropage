// src/components/ProjectCard/ProjectCard.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ProjectCard.scss';

const ProjectCard = ({ project, onClick, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Set initial state for content
    gsap.set(contentRef.current, { y: '100%' });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3
    });
    
    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3
    });
    
    gsap.to(contentRef.current, {
      y: '100%',
      duration: 0.4,
      ease: 'power3.in'
    });
  };

  const handleClick = () => {
    // Animate click
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => onClick(project)
    });
  };

  return (
    <div 
      className="project-card" 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-index={index}
    >
      <img 
        ref={imageRef}
        src={project.image} 
        alt={project.name} 
        className="project-card__image" 
      />
      <div ref={overlayRef} className="project-card__overlay"></div>
      <div ref={contentRef} className="project-card__content">
        <h3 className="project-card__name">{project.name}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;