// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';
import { logohgroup } from '../../assets/images/logo';
import './Navbar.scss';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    // GSAP animation for navbar appearance
    gsap.fromTo('.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container container">
        <div className="navbar__logo">
          <img src={logohgroup} alt="H Group" />
        </div>
        
        <ul className={`navbar__menu ${isMobileMenuOpen ? 'navbar__menu--open' : ''}`}>
          <li className="navbar__menu-item">
            <a onClick={() => scrollToSection('servicios')}>{t('nav.servicios')}</a>
          </li>
          <li className="navbar__menu-item">
            <a onClick={() => scrollToSection('fundaciones')}>{t('nav.fundaciones')}</a>
          </li>
          <li className="navbar__menu-item">
            <a onClick={() => scrollToSection('proyectos')}>{t('nav.proyectos')}</a>
          </li>
          <li className="navbar__menu-item">
            <a onClick={() => scrollToSection('contacto')}>{t('nav.contacto')}</a>
          </li>
        </ul>

        <div className="navbar__actions">
          <button 
            className="navbar__lang-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          
          <button 
            className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;