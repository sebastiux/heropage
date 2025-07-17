// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    nav: {
      servicios: 'SERVICIOS',
      fundaciones: 'FUNDACIONES',
      proyectos: 'PROYECTOS',
      contacto: 'CONTACTO'
    },
    hero: {
      tagline: 'IMPACTO SOCIAL',
      title: 'Conectamos lo imposible'
    }
  },
  en: {
    nav: {
      servicios: 'SERVICES',
      fundaciones: 'FOUNDATIONS',
      proyectos: 'PROJECTS',
      contacto: 'CONTACT'
    },
    hero: {
      tagline: 'SOCIAL IMPACT',
      title: 'We connect the impossible'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value[k];
    }
    
    return value || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};