// src/sections/Proyectos/Proyectos.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectCard from '../../components/ProjectCard';
import './Proyectos.scss';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, name: 'Alsea', image: '/projects/alsea.jpg' },
  { id: 2, name: 'SHEIN', image: '/projects/shein.jpg' },
  { id: 3, name: 'Zurich', image: '/projects/zurich.jpg' },
  { id: 4, name: 'Volkswagen', image: '/projects/volkswagen.jpg' },
  { id: 5, name: 'Xiaomi', image: '/projects/xiaomi.jpg' },
  { id: 6, name: 'Estée Lauder', image: '/projects/estee-lauder.jpg' }
];

const Proyectos = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate projects with stagger
      gsap.fromTo(projectsRef.current,
        { 
          opacity: 0,
          y: 100,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 1,
            from: 'start'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proyectos__grid',
            start: 'top 70%'
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="proyectos" id="proyectos" ref={sectionRef}>
      <div className="container">
        <div className="proyectos__header">
          <h2 className="proyectos__title">PROYECTOS</h2>
          <div className="proyectos__line"></div>
        </div>

        <div className="proyectos__grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectsRef.current[index] = el}
              className="proyectos__item"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;