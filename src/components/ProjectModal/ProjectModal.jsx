// src/components/ProjectModal/ProjectModal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';
import './ProjectModal.scss';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen && project) {
      // Set initial states
      gsap.set(modalRef.current, { display: 'flex' });
      
      // Animate modal entrance
      const tl = gsap.timeline();
      
      tl.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      .fromTo(contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
      .fromTo(imageRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo('.project-modal__info > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, [isOpen, project]);

  const handleClose = () => {
    // Animate modal exit
    const tl = gsap.timeline({
      onComplete: onClose
    });
    
    tl.to(contentRef.current, { scale: 0.8, opacity: 0, duration: 0.3 })
      .to(modalRef.current, { opacity: 0, duration: 0.3 }, '-=0.2')
      .set(modalRef.current, { display: 'none' });
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  if (!project) return null;

  return (
    <div 
      className="project-modal" 
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="project-modal__content" ref={contentRef}>
        <button 
          className="project-modal__close" 
          onClick={handleClose}
          aria-label={t('proyectos.modal.close')}
        >
          <span></span>
          <span></span>
        </button>

        <div className="project-modal__grid">
          <div className="project-modal__image" ref={imageRef}>
            <img src={project.image} alt={project.name} />
            <div className="project-modal__image-overlay"></div>
          </div>

          <div className="project-modal__info">
            <h3 className="project-modal__title">{project.name}</h3>
            <div className="project-modal__divider"></div>
            
            <div className="project-modal__details">
              <div className="project-modal__detail">
                <h4>{t('proyectos.modal.challenge')}</h4>
                <p>{project.challenge}</p>
              </div>
              
              <div className="project-modal__detail">
                <h4>{t('proyectos.modal.solution')}</h4>
                <p>{project.solution}</p>
              </div>
              
              <div className="project-modal__detail">
                <h4>{t('proyectos.modal.impact')}</h4>
                <ul className="project-modal__impact-list">
                  {project.impact.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="project-modal__tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="project-modal__tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;