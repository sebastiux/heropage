// src/components/CategoryModal/CategoryModal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CategoryModal.scss';

const CategoryModal = ({ category, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Fundaciones organizadas por categorías según su propósito real
  const foundationsByCategory = {
    salud: [
      'AMLCC',
      'APAC',
      'Asociación Mexicana de Fibrosis Quística Ac',
      'Be the Match México',
      'CURA',
      'Cancer Warriors',
      'Casa Ronald McDonald',
      'Cruz rosa Guadalajara',
      'Cruz rosa Monterrey',
      'Duerme Tranquilo (INPER)',
      'Encauza',
      'Fucam',
      'Fundacion SAK',
      'Fundación Alma IAP',
      'Fundación Cima',
      'Fundación Devlyn',
      'Fundación Lilo',
      'Fundación MAC',
      'Gila',
      'KARDIAS',
      'Latidos por México',
      'Por un Hogar AC',
      'Salvati',
      'Story Box',
      'Unidos Pro Trasplante de Médula Ósea',
      'Unidos somos iguales',
      'Va por ti',
      'Vibe by Cordón de luz'
    ],
    educacion: [
      'BECAR',
      'Bécalos',
      'Casa Paz',
      'Construyendo y Creciendo',
      'Educa',
      'Educación para compartir',
      'Fundación Andrade',
      'Fundación CRIANTIA',
      'INROADS',
      'IPODERAC',
      'PERAJ',
      'PRO educación',
      'Somos el cambio',
      'World visión'
    ],
    vulnerabilidad: [
      '12 Piedritas',
      'Albergue Ines María Gasca',
      'Aquí Nadie se rinde',
      'Ayuda y solidaridad de niñas de la calle',
      'CERO A TRES',
      'Cambiando modelos',
      'Centro Flaymar A.C.',
      'Childfund mexico',
      'Dibujando un mañana',
      'Dile al Cancer',
      'Dr. Sonrisas',
      'FUNFAI',
      'Festival Churumbela',
      'Fundación Ana y Juanpa',
      'Fundación Andrés Guardado',
      'Fundación Buba',
      'Fundación DB',
      'Fundación MGAS',
      'Fundación Mark IAP',
      'Fundación Rebeca de Alba',
      'Fundación Vuela',
      'Fundación renacimiento',
      'Grupo Toronjil A.C.',
      'Iluminemos de azul',
      'Infancia Alegre INFAL',
      'MUI Movimiento Unidos por la Infancia',
      'Make - a - Wish México',
      'Nariz Roja',
      'Niños en Alegría',
      'Proactible',
      'SEDAC',
      'Smith magenis',
      'Teletón',
      'UMBRAL',
      'Vamos para delante'
    ],
    violencia: [
      'Empecemos hoy el futuro del mañana',
      'Fortaleza IAP',
      'Fundacion Rebeca Lan',
      'Fundación origen',
      'La cana',
      'Pro Mujeres Cautivas',
      'Sin trata'
    ],
    medioambiente: [
      'AESPAC',
      'Animal Karma',
      'ECOLANA',
      'ESCUELA IAX xocimilco',
      'Ecogil',
      'Ectagono - Ectarea',
      'Hagamos Composta',
      'Hombre Naturaleza AC',
      'Isla Urbana',
      'PRONATURA',
      'Panthera',
      'Pienza Sostenible',
      'ProCuenca',
      'Rescatando vidas regalando amor AC',
      'Santuario el Camino'
    ],
    desastres: [
      'Asociación Gilberto',
      'COPARMEX',
      'Construyendo',
      'El día después',
      'Fideicomiso Fuerza México',
      'Fundación E',
      'Fundación México Vivo',
      'Intrare',
      'Movimiento Activo de Jóvenes Comprometidos por la Calidad MAJOCCA',
      'New Comienzos',
      'Nido Social',
      'Operación Bendición México',
      'YMCA',
      'Échale',
      'Únete'
    ],
    arte: [
      'Amigos de la esquina',
      'Anda México',
      'Central de muros',
      'Centro de Documentación e Investigación Judío de México',
      'Fundación One Heart',
      'México Orgullo y Tradición',
      'Seresarte',
      'Vale la pena'
    ],
    grupos: [
      'ASOMAS',
      'Alimento para todos',
      'Asilo Mi Nuevo Amanecer',
      'Asilo Vivir de Amor',
      'CADENA',
      'CAFEMIN',
      'CMR',
      'Centro de Equinoterapia Pasos de Esperanza A.C.',
      'Circula Diverso',
      'Comedor Santa María',
      'Confe',
      'ENTRALE',
      'El Mundo de Andy',
      'Estancia Sagrado Corazón de Jesus',
      'Fundación Baja del Sol, Julio Cesar Chávez',
      'Fundación Pola',
      'Hermanos en el camino',
      'Hogar Marillac',
      'Hogar Paz y Alegría',
      'John Langdon Down',
      'Mas guardianes',
      'Pak Pak',
      'Pro México Indígena',
      'Reinserta',
      'Share A.C.',
      'Trueqmx',
      'VIFAC',
      'Vive del deporte',
      'Yad Rajamim'
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