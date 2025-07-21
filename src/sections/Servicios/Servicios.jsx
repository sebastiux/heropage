// src/sections/Servicios/Servicios.jsx (versión simplificada sin descripciones)
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import ServiceCard from '../../components/ServiceCard';
import {
  iconTalleres,
  iconVoluntariados,
  iconEstrategiasCSR,
  iconEstrategiasESG,
  iconDonativos,
  iconServicioSocial
} from '../../assets/images';
import './Servicios.scss';

gsap.registerPlugin(ScrollTrigger);

const Servicios = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      id: 'talleres',
      icon: iconTalleres,
      title: 'TALLERES Y CONFERENCIAS'
    },
    {
      id: 'voluntariados',
      icon: iconVoluntariados,
      title: 'VOLUNTARIADOS'
    },
    {
      id: 'estrategias-csr',
      icon: iconEstrategiasCSR,
      title: 'ESTRATEGIAS DE CSR'
    },
    {
      id: 'estrategias-esg',
      icon: iconEstrategiasESG,
      title: 'ESTRATEGIAS ESG'
    },
    {
      id: 'donativos',
      icon: iconDonativos,
      title: 'DONATIVOS'
    },
    {
      id: 'servicio-social',
      icon: iconServicioSocial,
      title: 'SERVICIO SOCIAL'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animaciones GSAP...
      gsap.fromTo('.servicios__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.servicios__subtitle',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.servicios__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.servicios__line',
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="servicios" id="servicios" ref={sectionRef}>
      <div className="container">
        <div className="servicios__header">
          <p className="servicios__subtitle">
            NOS DEDICAMOS A LA CREACIÓN Y EJECUCIÓN DE ESTRATEGIAS DE RESPONSABILIDAD SOCIAL
          </p>
          <h2 className="servicios__title" ref={titleRef}>SERVICIOS</h2>
          <div className="servicios__line"></div>
        </div>

        <div className="servicios__grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => cardsRef.current[index] = el}
              className="servicios__card-wrapper"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;