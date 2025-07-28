// src/sections/Proyectos/Proyectos.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectModal from '../../components/ProjectModal';
import {
  projectAlsea1,
  projectShein1,
  projectZurich1,
  projectVolkswagen1,
  projectAlsea2,
  projectShein2
} from '../../assets/images/projects';
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

  // Proyectos como en Canva - 6 proyectos
  const projects = [
    {
      id: 1,
      name: 'Alsea',
      image: projectAlsea1,
      challenge: 'Crear una estrategia de responsabilidad social que conectara con los colaboradores de múltiples marcas.',
      solution: 'Desarrollamos un programa integral de voluntariado y apoyo comunitario que unificó a todas las marcas bajo un propósito común.',
      impact: [
        '+5,000 colaboradores involucrados',
        '150 comunidades beneficiadas',
        '300,000 comidas donadas'
      ],
      tags: ['Voluntariado', 'Donativos', 'Impacto Social']
    },
    {
      id: 2,
      name: 'SHEIN',
      image: projectShein1,
      challenge: 'Transformar la percepción de marca a través de acciones sociales significativas.',
      solution: 'Implementamos una campaña de apoyo a emprendedoras mexicanas en la industria textil.',
      impact: [
        '200 emprendedoras capacitadas',
        '50 negocios fortalecidos',
        '$2M MXN en apoyo directo'
      ],
      tags: ['Empoderamiento', 'Educación', 'Moda Sostenible']
    },
    {
      id: 3,
      name: 'ZURICH',
      image: projectZurich1,
      challenge: 'Conectar los valores corporativos con acciones tangibles de impacto social.',
      solution: 'Creamos un programa de educación financiera para comunidades vulnerables.',
      impact: [
        '10,000 personas capacitadas',
        '25 comunidades alcanzadas',
        '85% mejora en hábitos financieros'
      ],
      tags: ['Educación Financiera', 'Inclusión', 'Bienestar']
    },
    {
      id: 4,
      name: 'VOLKSWAGEN',
      image: projectVolkswagen1,
      challenge: 'Fortalecer el compromiso ambiental de la marca con acciones locales.',
      solution: 'Desarrollamos un programa de reforestación y movilidad sostenible.',
      impact: [
        '50,000 árboles plantados',
        '100 colaboradores voluntarios',
        '500 hectáreas reforestadas'
      ],
      tags: ['Medio Ambiente', 'Voluntariado', 'Sostenibilidad']
    },
    {
      id: 5,
      name: 'xiaomi',
      image: projectAlsea2, // Placeholder hasta tener imagen de Xiaomi
      challenge: 'Democratizar el acceso a la tecnología en comunidades marginadas.',
      solution: 'Implementamos centros de tecnología comunitarios con capacitación digital.',
      impact: [
        '15 centros tecnológicos',
        '5,000 jóvenes capacitados',
        '80% empleabilidad mejorada'
      ],
      tags: ['Tecnología', 'Educación', 'Inclusión Digital']
    },
    {
      id: 6,
      name: 'ESTÉE LAUDER',
      image: projectShein2, // Placeholder hasta tener imagen de Estée Lauder
      challenge: 'Apoyar a mujeres en situación vulnerable a través del empoderamiento.',
      solution: 'Creamos un programa de capacitación en belleza y emprendimiento.',
      impact: [
        '1,000 mujeres capacitadas',
        '300 emprendimientos creados',
        '70% aumento en ingresos'
      ],
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
    animateSlide((currentSlide + 1) % Math.ceil(projects.length / 6));
  };

  const handlePrev = () => {
    const totalSlides = Math.ceil(projects.length / 6);
    animateSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const animateSlide = (newSlide) => {
    gsap.to('.proyectos__grid', {
      opacity: 0,
      x: -50,
      duration: 0.3,
      onComplete: () => {
        setCurrentSlide(newSlide);
        gsap.fromTo('.proyectos__grid',
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
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
          <h2 className="proyectos__title" ref={titleRef}>{t('proyectos.title')}</h2>
          <div className="proyectos__line"></div>
        </div>

        <div 
          className="proyectos__carousel" 
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="proyectos__grid">
            {getVisibleProjects().map((project) => (
              <div
                key={project.id}
                className="proyectos__item"
                onClick={() => handleProjectClick(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="proyectos__image"
                />
                <div className="proyectos__overlay">
                  <h3 className="proyectos__name">{project.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button 
            className="proyectos__nav proyectos__nav--prev"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="proyectos__nav proyectos__nav--next"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Proyectos;