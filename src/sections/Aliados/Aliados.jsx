// src/sections/Aliados/Aliados.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  kiehls,
  casaDragones,
  berger,
  creed,
  porsche,
  nespresso,
  joMalone,
  macallan,
  volkswagenLogoNegro,
  zurichSantander
} from '../../assets/images';
import './Aliados.scss';

gsap.registerPlugin(ScrollTrigger);

const Aliados = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const partners = [
    // Row 1 - 6 logos
    [
      { name: "Kiehl's", logo: kiehls },
      { name: 'Casa Dragones', logo: casaDragones },
      { name: 'Berger', logo: berger },
      { name: 'Creed', logo: creed },
      { name: 'Porsche', logo: porsche },
      { name: 'Nespresso', logo: nespresso }
    ],
    // Row 2 - 4 logos (Zurich & Santander combined)
    [
      { name: 'Jo Malone', logo: joMalone },
      { name: 'Macallan', logo: macallan },
      { name: 'Volkswagen', logo: volkswagenLogoNegro },
      { name: 'Zurich Santander', logo: zurichSantander, isDouble: true }
    ]
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - subtle fade in
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Row 1 animation
      gsap.fromTo('.aliados__row--1 .aliados__logo',
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row1Ref.current,
            start: 'top 80%',
          }
        }
      );

      // Row 2 animation - slight delay after row 1
      gsap.fromTo('.aliados__row--2 .aliados__logo',
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row2Ref.current,
            start: 'top 80%',
          }
        }
      );

      // Subtle hover effects
      const logos = gsap.utils.toArray('.aliados__logo');
      logos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
          gsap.to(logo, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(logo.querySelector('img'), {
            filter: 'grayscale(0%)',
            opacity: 1,
            duration: 0.3
          });
        });

        logo.addEventListener('mouseleave', () => {
          gsap.to(logo, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(logo.querySelector('img'), {
            filter: 'grayscale(100%)',
            opacity: 0.6,
            duration: 0.3
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aliados" id="aliados" ref={sectionRef}>
      <div className="container">
        <div className="aliados__header">
          <h2 className="aliados__title" ref={titleRef}>
            {t('aliados.title') || 'NUESTROS ALIADOS'}
          </h2>
        </div>

        <div className="aliados__grid">
          {partners.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`aliados__row aliados__row--${rowIndex + 1}`}
              ref={rowIndex === 0 ? row1Ref : row2Ref}
            >
              {row.map((partner, index) => (
                <div
                  key={partner.name}
                  className={`aliados__logo ${partner.isDouble ? 'aliados__logo--double' : ''}`}
                  data-partner={partner.name}
                >
                  <img src={partner.logo} alt={partner.name} />
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