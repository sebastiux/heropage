// src/components/CategoryModal/CategoryModal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CategoryModal.scss';

const CategoryModal = ({ category, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Datos de fundaciones por categoría (mantener igual)
  const foundationsByCategory = {
    salud: [
      'Be the Match México',
      'Va por ti',
      'Vibe by Cordón de luz',
      'Proactible',
      'Nariz Roja',
      'Cruz Rosa Guadalajara',
      'Fundación MAC',
      'AMLCC',
      'APAC',
      'Aquí Nadie se rinde',
      'Fundación SAK',
      'Fundación Pola',
      'Teletón',
      'Cancer Warriors',
      'Unidos somos iguales',
      'Dr. Sonrisas',
      'Por un Hogar AC',
      'Make - a - Wish México',
      'Fundación Cima',
      'Story Box',
      'Fundación Vuela',
      'Iluminemos de azul',
      'KARDIAS',
      'Dibujando un mañana',
      'Latidos por México',
      'Casa Ronald McDonald',
      'Fundación Lilo',
      'Fucam',
      'Alimento para todos'
    ],
    educacion: [
      'Bécalos',
      'Casa Paz',
      'Construyendo y Creciendo',
      'Educa',
      'Educación para compartir',
      'Fundación Andrade',
      'Fundación CRIANTIA',
      'IPODERAC',
      'PRO educación',
      'Somos el cambio',
      'World visión',
      'INROADS'
    ],
    vulnerabilidad: [
      'Albergue Ines María Gasca',
      'Ayuda y solidaridad de niños de la calle',
      'CERO A TRES',
      'CURA',
      'Fundación Andrés Guardado',
      'Fundación DB',
      'FUNFAI',
      'Grupo Toronjil A.C.',
      'Niños en Alegría',
      'PERAJ',
      'Childfund mexico',
      'Fundación renacimiento'
    ],
    violencia: [
      'Fundación origen'
    ],
    medioambiente: [
      'Hombre Naturaleza AC',
      'ProCuenca',
      'AESPAC',
      'ECOLANA',
      'Ecogil',
      'Ectagono - Ectarea',
      'ESCUELA IAX xocimilco',
      'Hagamos Composta',
      'Operación Bendición México',
      'PRONATURA'
    ],
    desastres: [
      'Asociación Gilberto'
    ],
    arte: [
      'Anda México',
      'Central de muros',
      'Fundación One Heart',
      'Vale la pena'
    ],
    grupos: [
      'Asilo Vivir de Amor',
      'ASOMAS',
      'CADENA',
      'Centro de Equinoterapia Pasos de Esperanza A.C.',
      'CMR',
      'Comedor Santa María',
      'Confe',
      'Construyendo',
      'COPARMEX',
      'Échale',
      'ENTRALE',
      'Fundación Baja del Sol, Julio Cesar Chávez',
      'Fundación Devlyn',
      'Fundación E',
      'Hogar Marillac',
      'Hogar Paz y Alegría',
      'Isla Urbana',
      'John Langdon Down',
      'La cana',
      'Mas guardianes',
      'Pro México Indígena',
      'Reinserta',
      'Trueqmx',
      'VIFAC',
      'Vive del deporte',
      'Asilo Mi Nuevo Amanecer',
      'Circula Diverso',
      'El Mundo de Andy',
      'Estancia Sagrado Corazón de Jesus',
      'Share A.C.',
      'CAFEMIN'
    ]
  };

  useEffect(() => {
    if (isOpen) {
      // Open animation
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      // Close animation
      gsap.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.3 });
      gsap.to(modalRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        delay: 0.1,
        onComplete: () => gsap.set(modalRef.current, { display: 'none' })
      });
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const foundations = foundationsByCategory[category.id] || [];

  return (
    <div 
      className="category-modal" 
      ref={modalRef}
      onClick={handleBackdropClick}
      data-category={category.id}
    >
      <div className="category-modal__content" ref={contentRef}>
        <button 
          className="category-modal__close" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>
        
        <div className="category-modal__header">
          <div className="category-modal__title-wrapper">
            <img src={category.icon} alt="" className="category-modal__icon" />
            <span className="category-modal__title">{category.label}</span>
          </div>
          <div className="category-modal__line"></div>
        </div>

        <div className="category-modal__body">
          <div className="category-modal__foundations-wrapper">
            <div className="category-modal__foundations">
              {foundations.map((foundation, index) => (
                <p key={index} className="category-modal__foundation">
                  {foundation}
                </p>
              ))}
            </div>
          </div>
          <div className="category-modal__image-wrapper">
            <div className="category-modal__image">
              <img src={category.image} alt={category.label} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;