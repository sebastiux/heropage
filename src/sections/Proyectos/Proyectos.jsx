// src/sections/Proyectos/Proyectos.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectModal from '../../components/ProjectModal';
import {
  projectAlsea1,
  projectAlsea2,
  projectAlsea3,
  projectAlsea4,
  projectAlsea5,
  projectShein1,
  projectShein2,
  projectShein3,
  projectShein4,
  projectVolkswagen1,
  projectVolkswagen2,
  projectVolkswagen3,
  projectVolkswagen4,
  projectVolkswagen5,
  projectZurich1,
  projectZurich3,
  projectZurich4,
  projectZurich5
} from '../../assets/images/projects';
// Import white logos from your existing imports
import {
  alseaLogoBlanco,
  sheinLogoBlanco,
  zurichLogoBlanco,
  volkswagenLogoBlanco,
  xiaomiLogoBlanco,
  esteeLauderLogoBlanco,
  alseaLogoNegro,
  sheinLogoNegro,
  zurichLogo,
  volkswagenLogoNegro,
  xiaomiLogoNegro,
  esteeLauderLogoNegro
} from '../../assets/images';
import './Proyectos.scss';

gsap.registerPlugin(ScrollTrigger);

const Proyectos = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Proyectos data with white logos
 const projects = [
  {
    id: 1,
    name: 'ALSEA',
    logo: alseaLogoBlanco,
    image: projectAlsea1,
    galleryImages: [
      projectAlsea1,
      projectAlsea2,
      projectAlsea3,
      projectAlsea4,
      projectAlsea5
    ],
    partnerLogo: alseaLogoNegro,
    description: 'Va x mi cuenta es una fundación creada por Alsea que combate la desnutrición infantil en México. Su misión es ofrecer alimentación balanceada a niños en situación vulnerable, además de promover programas de salud y educación nutricional.',
    brandColor: '#E94B3F',
    arrowColor: '#9EC9EF',
    tags: ['Voluntariado', 'Donativos', 'Impacto Social']
  },
  {
    id: 2,
    name: 'SHEIN',
    logo: sheinLogoBlanco,
    image: projectShein1,
    galleryImages: [
      projectShein1,
      projectShein2,
      projectShein3,
      projectShein4
    ],
    partnerLogo: sheinLogoNegro,
    description: 'SHEIN se compromete con el desarrollo social a través del apoyo a emprendedoras mexicanas, fortaleciendo la industria textil local con programas de capacitación y financiamiento.',
    brandColor: '#FFC2C2',
    arrowColor: '#E94B3F',
    tags: ['Empoderamiento', 'Educación', 'Moda Sostenible']
  },
  {
    id: 3,
    name: 'ZURICH',
    logo: zurichLogoBlanco,
    image: projectZurich1,
    galleryImages: [
      projectZurich1,
      projectZurich3,
      projectZurich4,
      projectZurich5
    ],
    partnerLogo: zurichLogo,
    description: 'Zurich Seguros promueve la educación financiera y la cultura de prevención en México, ayudando a familias vulnerables a construir un futuro más seguro y estable.',
    brandColor: '#66C2BA',
    arrowColor: '#403d39',
    tags: ['Educación Financiera', 'Inclusión', 'Bienestar']
  },
  {
    id: 4,
    name: 'VOLKSWAGEN',
    logo: volkswagenLogoBlanco,
    image: projectVolkswagen1,
    galleryImages: [
      projectVolkswagen1,
      projectVolkswagen2,
      projectVolkswagen3,
      projectVolkswagen4,
      projectVolkswagen5
    ],
    partnerLogo: volkswagenLogoNegro,
    description: 'Volkswagen lidera iniciativas ambientales en México, comprometidos con la movilidad sostenible y la restauración de ecosistemas para las futuras generaciones.',
    brandColor: '#9EC9EF',
    arrowColor: '#000000',
    tags: ['Medio Ambiente', 'Voluntariado', 'Sostenibilidad']
  },
  {
    id: 5,
    name: 'XIAOMI',
    logo: xiaomiLogoBlanco || null,
    image: projectAlsea2,
    galleryImages: [
      projectAlsea2,
      projectShein3,
      projectVolkswagen2,
      projectZurich3
    ],
    partnerLogo: xiaomiLogoNegro,
    description: 'Xiaomi democratiza el acceso a la tecnología en comunidades marginadas de México, creando centros de innovación y capacitación digital para jóvenes.',
    brandColor: '#FE973B',
    arrowColor: '#000000',
    tags: ['Tecnología', 'Educación', 'Inclusión Digital']
  },
  {
    id: 6,
    name: 'ESTÉE LAUDER',
    logo: esteeLauderLogoBlanco || null,
    image: projectShein2,
    galleryImages: [
      projectShein2,
      projectAlsea3,
      projectZurich4,
      projectVolkswagen3
    ],
    partnerLogo: esteeLauderLogoNegro,
    description: 'Estée Lauder Companies empodera a mujeres mexicanas a través de programas de belleza y emprendimiento, transformando vidas con educación y oportunidades de negocio.',
    brandColor: '#E8D9EC',
    arrowColor: '#E94B3F',
    tags: ['Empoderamiento Femenino', 'Belleza', 'Emprendimiento']
  }
];
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Blue line animation
      gsap.fromTo('.proyectos__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.proyectos__line',
            start: 'top 80%'
          }
        }
      );

      // Carousel animation
      gsap.fromTo('.proyectos__carousel',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: '.proyectos__carousel',
            start: 'top 80%'
          }
        }
      );

      // Brand items animation
      gsap.fromTo('.proyectos__brand',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.8,
          scrollTrigger: {
            trigger: '.proyectos__brands',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused || isModalOpen) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isModalOpen]);

  const handleNext = () => {
    if (isAnimating) return;
    animateSlide((currentSlide + 1) % Math.ceil(projects.length / 6));
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const totalSlides = Math.ceil(projects.length / 6);
    animateSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const animateSlide = (newSlide) => {
    setIsAnimating(true);
    
    gsap.to('.proyectos__brand', {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setCurrentSlide(newSlide);
        gsap.fromTo('.proyectos__brand',
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.4, 
            stagger: 0.05,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const getVisibleProjects = () => {
    const start = currentSlide * 6;
    return projects.slice(start, start + 6);
  };

  return (
    <section className="proyectos" id="proyectos" ref={sectionRef}>
      <div className="container">
        <div className="proyectos__header">
          <h2 className="proyectos__title" ref={titleRef}>PROYECTOS</h2>
          <div className="proyectos__line"></div>
        </div>

        <div 
          className="proyectos__carousel" 
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="proyectos__brands">
            {getVisibleProjects().map((project) => (
              <div
                key={project.id}
                className="proyectos__brand"
                onClick={() => handleProjectClick(project)}
              >
                <div className="proyectos__brand-container">
                  {/* Background image */}
                  <div 
                    className="proyectos__brand-bg" 
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  
                  {/* Glass overlay */}
                  <div className="proyectos__brand-overlay" />
                  
                  {/* Brand logo or text */}
                  <div className="proyectos__brand-content">
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        alt={project.name}
                        className="proyectos__brand-logo"
                      />
                    ) : (
                      <h3 className="proyectos__brand-name">{project.name}</h3>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button 
            className={`proyectos__nav proyectos__nav--prev ${isAnimating ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={isAnimating}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className={`proyectos__nav proyectos__nav--next ${isAnimating ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={isAnimating}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Proyectos;