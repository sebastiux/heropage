// src/sections/Fundaciones/Fundaciones.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import CategoryModal from '../../components/CategoryModal';
import {
  fundacionesRow1,
  fundacionesRow2,
  fundacionesRow3,
  iconArteycultura,
  iconDesastresnaturales,
  iconEducacion,
  iconGruposvulnerables,
  iconMedioambiente,
  iconSalud,
  iconViolenciadegenero,
  iconVulnerabilidadkids,
  imageArteycultura,
  imageDesastresnaturales,
  imageEducacion,
  imageGruposvulnerables,
  imageMedioambiente,
  imageSalud,
  imageViolenciadegenero,
  imageVulnerabilidadkids
} from '../../assets/images/foundations';
import './Fundaciones.scss';

gsap.registerPlugin(ScrollTrigger);

const Fundaciones = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const foundationRows = [
    { id: 1, image: fundacionesRow1 },
    { id: 2, image: fundacionesRow2 },
    { id: 3, image: fundacionesRow3 }
  ];

  const categories = [
    { 
      id: 'salud',
      icon: iconSalud, 
      image: imageSalud,
      label: 'SALUD' 
    },
    { 
      id: 'educacion',
      icon: iconEducacion, 
      image: imageEducacion,
      label: 'EDUCACIÓN' 
    },
    { 
      id: 'vulnerabilidad',
      icon: iconVulnerabilidadkids, 
      image: imageVulnerabilidadkids,
      label: 'NIÑOS EN SITUACIÓN DE VULNERABILIDAD' 
    },
    { 
      id: 'violencia',
      icon: iconViolenciadegenero, 
      image: imageViolenciadegenero,
      label: 'VIOLENCIA DE GÉNERO' 
    },
    { 
      id: 'medioambiente',
      icon: iconMedioambiente, 
      image: imageMedioambiente,
      label: 'MEDIO AMBIENTE' 
    },
    { 
      id: 'desastres',
      icon: iconDesastresnaturales, 
      image: imageDesastresnaturales,
      label: 'DESASTRES NATURALES' 
    },
    { 
      id: 'arte',
      icon: iconArteycultura, 
      image: imageArteycultura,
      label: 'ARTE Y CULTURA' 
    },
    { 
      id: 'grupos',
      icon: iconGruposvulnerables, 
      image: imageGruposvulnerables,
      label: 'GRUPOS VULNERABLES' 
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo('.fundaciones__title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.fundaciones__title',
            start: 'top 80%',
          }
        }
      );

      // Animate blue line
      gsap.fromTo('.fundaciones__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.fundaciones__line',
            start: 'top 80%'
          }
        }
      );

      // Animate foundation rows
      gsap.fromTo('.fundaciones__row',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.fundaciones__grid',
            start: 'top 80%'
          }
        }
      );

      // Animate counter
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 150,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
          const counterElement = document.querySelector('.fundaciones__counter');
          if (counterElement) {
            counterElement.textContent = `+${Math.floor(counter.value)}`;
          }
        },
        scrollTrigger: {
          trigger: '.fundaciones__counter',
          start: 'top 80%',
          once: true
        }
      });

      // Animate categories
      gsap.fromTo('.fundaciones__category',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.fundaciones__categories',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setActiveCategory(null), 300); // Wait for animation
  };

  return (
    <section className="fundaciones" id="fundaciones" ref={sectionRef}>
      <div className="container">
        <div className="fundaciones__header">
          <h2 className="fundaciones__title">FUNDACIONES</h2>
          <div className="fundaciones__line"></div>
        </div>

        <div className="fundaciones__content">
          <div className="fundaciones__grid">
            {foundationRows.map((row) => (
              <div key={row.id} className="fundaciones__row">
                <img src={row.image} alt={`Fundaciones row ${row.id}`} />
              </div>
            ))}
          </div>

          <div className="fundaciones__counter-wrapper">
            <span className="fundaciones__counter">0</span>
            <span className="fundaciones__counter-text">FUNDACIONES</span>
          </div>

          <div className="fundaciones__categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className="fundaciones__category"
                onClick={() => handleCategoryClick(category)}
                aria-label={`Ver fundaciones de ${category.label}`}
              >
                <div className="fundaciones__category-icon">
                  <img src={category.icon} alt={category.label} />
                </div>
                <p className="fundaciones__category-label">{category.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeCategory && (
  <CategoryModal
    category={activeCategory}
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    data-category={activeCategory.id}
  />
)}
    </section>
  );
};

export default Fundaciones;