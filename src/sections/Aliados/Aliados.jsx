// src/sections/Aliados/Aliados.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import './Aliados.scss';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  // Row 1
  ["Kiehl's", 'Casa Dragones', 'Berger', 'Creed', 'Porsche', 'Nespresso'],
  // Row 2
  ['Jo Malone', 'Macallan', 'Volkswagen', 'Zurich', 'Santander']
];

const Aliados = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const logosRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate partner logos with hover effect
      gsap.fromTo('.aliados__logo',
        { 
          opacity: 0,
          scale: 0,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: {
            amount: 1.5,
            from: 'center',
            grid: 'auto'
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.aliados__grid',
            start: 'top 80%'
          }
        }
      );

      // Add hover animations
      logosRef.current.forEach(logo => {
        if (logo) {
          logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aliados" id="aliados" ref={sectionRef}>
      <div className="container">
        <div className="aliados__header">
          <h2 className="aliados__title">NUESTROS ALIADOS</h2>
        </div>

        <div className="aliados__grid">
          {partners.map((row, rowIndex) => (
            <div key={rowIndex} className="aliados__row">
              {row.map((partner, index) => (
                <div
                  key={partner}
                  className="aliados__logo"
                  ref={el => logosRef.current[rowIndex * row.length + index] = el}
                >
                  <img src={`/placeholder-logo.png`} alt={partner} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aliados;