// src/sections/Footer/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.scss';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useLanguage();
  const footerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form elements
      gsap.fromTo('.footer__form-group',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer__form',
            start: 'top 80%'
          }
        }
      );

      // Animate map with circular reveal
      gsap.fromTo('.footer__map',
        { 
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0
        },
        {
          clipPath: 'circle(100% at 50% 50%)',
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.footer__map',
            start: 'top 80%'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <footer className="footer" id="contacto" ref={footerRef}>
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <h2 className="footer__title">Deja tu huella</h2>
            <h3 className="footer__subtitle">Contáctanos</h3>

            <form className="footer__form" onSubmit={handleSubmit}>
              <div className="footer__form-group">
                <input
                  type="text"
                  placeholder={t('footer.form.name')}
                  className="footer__input"
                  required
                />
              </div>
              <div className="footer__form-group">
                <input
                  type="email"
                  placeholder={t('footer.form.email')}
                  className="footer__input"
                  required
                />
              </div>
              <div className="footer__form-group">
                <input
                  type="tel"
                  placeholder={t('footer.form.phone')}
                  className="footer__input"
                  required
                />
              </div>
              <div className="footer__form-group">
                <textarea
                  placeholder={t('footer.form.message')}
                  className="footer__textarea"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="footer__submit">
                {t('footer.form.submit')}
              </button>
            </form>
          </div>

          <div className="footer__right">
            <div className="footer__map-container">
              <div className="footer__map" ref={mapRef}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.8851852271!2d-99.20656068509237!3d19.417805286888652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201f7a5bda7c5%3A0x6136fd75e72bca4b!2sBlvd.%20Palmas%20Hills%201%2C%20Valle%20de%20las%20Palmas%2C%2052787%20Naucalpan%20de%20Ju%C3%A1rez%2C%20M%C3%A9x.!5e0!3m2!1ses!2smx!4v1647891234567!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="footer__info">
              <div className="footer__logo">
                <img src="/logo-hgroup.png" alt="H Group" />
              </div>
              <p className="footer__address">
                Blvd. Palmas Hills 1, Piso 21<br />
                Villa de las Palmas, 52787 Naucalpan<br />
                de Juárez, Méx.
              </p>
              <div className="footer__social">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;