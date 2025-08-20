// src/sections/Proyectos/Proyectos.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectModal from '../../components/ProjectModal';
import {
  projectAlsea1,
  projectAlsea2,
  projectAlsea3,
  projectAlsea4,
  projectShein1,
  projectShein2,
  projectShein3,
  projectShein4,
  projectVolkswagen1,
  projectVolkswagen2,
  projectVolkswagen3,
  projectVolkswagen4,
  projectVolkswagen5,
  projectXiaomi0,
  projectXiaomi1,
  projectXiaomi2,
  projectXiaomi3,
  projectZurich1,
  projectZurich3,
  projectZurich4,
  projectZurich5
} from '../../assets/images/projects';
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
  const brandsContainerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const scrollTimeoutRef = useRef(null);
  const touchStartRef = useRef({ x: 0, time: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

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
        projectShein1
      ],
      partnerLogo: alseaLogoNegro,
      description: 'Va x mi cuenta es una fundación creada por Alsea que combate la desnutrición infantil en México.',
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
      description: 'SHEIN se compromete con el desarrollo social a través del apoyo a emprendedoras mexicanas.',
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
      description: 'Zurich Seguros promueve la educación financiera y la cultura de prevención en México.',
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
      description: 'Volkswagen lidera iniciativas ambientales en México.',
      brandColor: '#9EC9EF',
      arrowColor: '#000000',
      tags: ['Medio Ambiente', 'Voluntariado', 'Sostenibilidad']
    },
    {
      id: 5,
      name: 'XIAOMI',
      logo: xiaomiLogoBlanco,
      image: projectXiaomi0,
      galleryImages: [
        projectXiaomi2,
        projectXiaomi1,
        projectXiaomi3
      ],
      partnerLogo: xiaomiLogoNegro,
      description: 'Xiaomi democratiza el acceso a la tecnología en comunidades marginadas de México.',
      brandColor: '#FE973B',
      arrowColor: '#000000',
      tags: ['Tecnología', 'Educación', 'Inclusión Digital']
    }
    /*
    {
      id: 6,
      name: 'ESTÉE LAUDER',
      logo: esteeLauderLogoBlanco,
      image: projectShein2,
      galleryImages: [
        projectShein2,
        projectAlsea3,
        projectZurich4,
        projectVolkswagen3
      ],
      partnerLogo: esteeLauderLogoNegro,
      description: 'Estée Lauder Companies empodera a mujeres mexicanas.',
      brandColor: '#E8D9EC',
      arrowColor: '#E94B3F',
      tags: ['Empoderamiento Femenino', 'Belleza', 'Emprendimiento']
    }
      */
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animaciones GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
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

      // Animación de la línea
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

      // Animación del carrusel
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

      // Animación de los brands - diferente para móvil y desktop
      if (!isMobile) {
        // Desktop: animar con stagger
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
      } else {
        // Móvil: mostrar directamente sin animación de escala
        gsap.set('.proyectos__brand', { opacity: 1, scale: 1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Manejo del scroll horizontal en móvil (estilo Instagram Stories)
  useEffect(() => {
    if (!brandsContainerRef.current || !isMobile) return;

    const container = brandsContainerRef.current;

    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const newIndex = Math.round(scrollLeft / containerWidth);
        setCurrentIndex(newIndex);
        
        // Ocultar hint después del primer swipe
        if (newIndex > 0) {
          setShowSwipeHint(false);
        }
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [isMobile]);

  // Función para hacer scroll a un proyecto específico
  const scrollToProject = useCallback((index) => {
    if (!brandsContainerRef.current || !isMobile) return;
    
    const containerWidth = brandsContainerRef.current.offsetWidth;
    const scrollPosition = index * containerWidth;
    
    brandsContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
    setShowSwipeHint(false);
  }, [isMobile]);

  // Manejo de tap en los laterales (estilo Instagram)
  const handleContainerClick = useCallback((e) => {
    if (!isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const tapZone = width * 0.3; // 30% de cada lado para navegación
    
    if (x < tapZone) {
      // Tap en el lado izquierdo
      e.stopPropagation();
      if (currentIndex > 0) {
        scrollToProject(currentIndex - 1);
      }
    } else if (x > width - tapZone) {
      // Tap en el lado derecho
      e.stopPropagation();
      if (currentIndex < projects.length - 1) {
        scrollToProject(currentIndex + 1);
      }
    }
  }, [isMobile, currentIndex, projects.length, scrollToProject]);

  // Manejo de touch para detectar tap vs swipe
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      time: Date.now()
    };
  }, []);

  const handleTouchEnd = useCallback((e, project) => {
    if (!isMobile) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartRef.current.time;
    const touchDistance = Math.abs(touchEndX - touchStartRef.current.x);
    
    // Si es un tap rápido en el centro
    if (touchDuration < 200 && touchDistance < 10) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touchEndX - rect.left;
      const width = rect.width;
      const tapZone = width * 0.3;
      
      // Si el tap es en el centro, abrir el modal
      if (x >= tapZone && x <= width - tapZone) {
        handleProjectClick(project);
      }
    }
  }, [isMobile]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevenir scroll del body cuando el modal está abierto
    if (isMobile) {
      document.body.classList.add('no-scroll');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
    // Restaurar scroll del body
    if (isMobile) {
      document.body.classList.remove('no-scroll');
    }
  };

  // Navegación con teclas de flecha
  useEffect(() => {
    if (!isMobile) return;

    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            scrollToProject(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < projects.length - 1) {
            scrollToProject(currentIndex + 1);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, currentIndex, projects.length, scrollToProject]);

  // Para desktop: navegación con flechas
  const handleNext = () => {
    if (isAnimating) return;
    // Lógica para desktop si necesitas carrusel
  };

  const handlePrev = () => {
    if (isAnimating) return;
    // Lógica para desktop si necesitas carrusel
  };

  return (
    <section className="proyectos" id="proyectos" ref={sectionRef}>
      <div className="container">
        <div className="proyectos__header">
          <h2 className="proyectos__title" ref={titleRef}>PROYECTOS</h2>
          <div className="proyectos__line"></div>
        </div>

        <div className="proyectos__carousel" ref={carouselRef}>
          {/* Progress bars para móvil (estilo Instagram) */}
          {isMobile && (
            <div className="proyectos__progress">
              {projects.map((_, index) => (
                <div 
                  key={index}
                  className={`proyectos__progress-bar ${
                    index === currentIndex ? 'proyectos__progress-bar--active' : ''
                  }`}
                >
                  <div className="proyectos__progress-bar-fill"></div>
                </div>
              ))}
            </div>
          )}

          <div 
            className="proyectos__brands"
            ref={brandsContainerRef}
            onClick={isMobile ? handleContainerClick : undefined}
          >
      
{projects.map((project, index) => (
  <div
    key={project.id}
    className="proyectos__brand"
    onClick={!isMobile ? () => handleProjectClick(project) : undefined}
    onTouchStart={isMobile ? handleTouchStart : undefined}
    onTouchEnd={isMobile ? (e) => handleTouchEnd(e, project) : undefined}
    data-index={index}
  >
    <div className="proyectos__brand-container">
      <div 
        className="proyectos__brand-bg"
        style={{ 
          backgroundImage: `url(${project.image})`,
          backgroundColor: project.brandColor || '#000'
        }}
      />
      <div className="proyectos__brand-overlay" />
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
        {/* Eliminada la descripción */}
      </div>
    </div>
  </div>
))}
          </div>

          {/* Hint de swipe para móvil */}
          {isMobile && showSwipeHint && currentIndex === 0 && (
            <div className="proyectos__swipe-hint">
              <div className="proyectos__swipe-hint-arrow proyectos__swipe-hint-arrow--left">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </div>
              <div className="proyectos__swipe-hint-arrow">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Navegación con dots para móvil */}
          {isMobile && (
            <nav className="proyectos__navigation">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`proyectos__nav-dot ${
                    index === currentIndex ? 'proyectos__nav-dot--active' : ''
                  }`}
                  onClick={() => scrollToProject(index)}
                  aria-label={`Ir al proyecto ${index + 1}`}
                />
              ))}
            </nav>
          )}

          {/* Navegación para desktop */}
          {!isMobile && (
            <>
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
            </>
          )}
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