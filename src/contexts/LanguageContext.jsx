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
      tagline: 'IMPACTO SOCIAL'
    },
    servicios: {
      title: 'SERVICIOS',
      subtitle: 'NOS DEDICAMOS A LA CREACIÓN Y EJECUCIÓN DE ESTRATEGIAS DE RESPONSABILIDAD SOCIAL',
      talleres: {
        title: 'TALLERES Y CONFERENCIAS',
        description: 'Diseñamos experiencias educativas transformadoras que inspiran el cambio social y promueven la responsabilidad corporativa.'
      },
      voluntariados: {
        title: 'VOLUNTARIADOS',
        description: 'Conectamos personas comprometidas con causas que transforman comunidades y generan impacto positivo duradero.'
      },
      csr: {
        title: 'ESTRATEGIAS DE CSR',
        description: 'Desarrollamos programas integrales de responsabilidad social corporativa alineados con los objetivos de negocio.'
      },
      esg: {
        title: 'ESTRATEGIAS ESG',
        description: 'Implementamos soluciones sostenibles con impacto ambiental, social y de gobernanza medible y transparente.'
      },
      donativos: {
        title: 'DONATIVOS',
        description: 'Canalizamos recursos de manera estratégica para maximizar el impacto en las comunidades más necesitadas.'
      },
      social: {
        title: 'SERVICIO SOCIAL',
        description: 'Facilitamos experiencias significativas de servicio comunitario que transforman vidas y fortalecen el tejido social.'
      }
    },
    fundaciones: {
      title: 'FUNDACIONES',
      counter: 'FUNDACIONES'
    },
    proyectos: {
      title: 'PROYECTOS',
      modal: {
        challenge: 'DESAFÍO',
        solution: 'SOLUCIÓN',
        impact: 'IMPACTO',
        close: 'Cerrar'
      }
    },
    aliados: {
      title: 'NUESTROS ALIADOS'
    },
    footer: {
      title: 'Deja tu huella',
      subtitle: 'Contáctanos',
      form: {
        name: 'Nombre completo*',
        email: 'Email*',
        phone: 'Teléfono*',
        message: 'Mensaje*',
        submit: 'ENVIAR'
      }
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
      tagline: 'SOCIAL IMPACT'
    },
    servicios: {
      title: 'SERVICES',
      subtitle: 'WE ARE DEDICATED TO CREATING AND EXECUTING SOCIAL RESPONSIBILITY STRATEGIES',
      talleres: {
        title: 'WORKSHOPS & CONFERENCES',
        description: 'We design transformative educational experiences that inspire social change and promote corporate responsibility.'
      },
      voluntariados: {
        title: 'VOLUNTEERING',
        description: 'We connect committed people with causes that transform communities and generate lasting positive impact.'
      },
      csr: {
        title: 'CSR STRATEGIES',
        description: 'We develop comprehensive corporate social responsibility programs aligned with business objectives.'
      },
      esg: {
        title: 'ESG STRATEGIES',
        description: 'We implement sustainable solutions with measurable and transparent environmental, social and governance impact.'
      },
      donativos: {
        title: 'DONATIONS',
        description: 'We strategically channel resources to maximize impact in the most needy communities.'
      },
      social: {
        title: 'SOCIAL SERVICE',
        description: 'We facilitate meaningful community service experiences that transform lives and strengthen the social fabric.'
      }
    },
    fundaciones: {
      title: 'FOUNDATIONS',
      counter: 'FOUNDATIONS'
    },
    proyectos: {
      title: 'PROJECTS',
      modal: {
        challenge: 'CHALLENGE',
        solution: 'SOLUTION',
        impact: 'IMPACT',
        close: 'Close'
      }
    },
    aliados: {
      title: 'OUR PARTNERS'
    },
    footer: {
      title: 'Leave your mark',
      subtitle: 'Contact us',
      form: {
        name: 'Full name*',
        email: 'Email*',
        phone: 'Phone*',
        message: 'Message*',
        submit: 'SEND'
      }
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
      value = value?.[k];
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