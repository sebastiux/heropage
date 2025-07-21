// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// Update src/contexts/LanguageContext.jsx
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
    },
    servicios: {
      subtitle: 'NOS DEDICAMOS A LA CREACIÓN Y EJECUCIÓN DE ESTRATEGIAS DE RESPONSABILIDAD SOCIAL',
      talleres: {
        title: 'TALLERES Y CONFERENCIAS',
        description: 'Diseñamos experiencias educativas transformadoras que inspiran el cambio social.'
      },
      voluntariados: {
        title: 'VOLUNTARIADOS',
        description: 'Conectamos personas comprometidas con causas que transforman comunidades.'
      },
      csr: {
        title: 'ESTRATEGIAS DE CSR',
        description: 'Desarrollamos programas integrales de responsabilidad social corporativa.'
      },
      esg: {
        title: 'ESTRATEGIAS ESG',
        description: 'Implementamos soluciones sostenibles con impacto ambiental, social y de gobernanza.'
      },
      donativos: {
        title: 'DONATIVOS',
        description: 'Canalizamos recursos para maximizar el impacto en las comunidades más necesitadas.'
      },
      social: {
        title: 'SERVICIO SOCIAL',
        description: 'Facilitamos experiencias significativas de servicio comunitario.'
      }
    },
    footer: {
      form: {
        name: 'Nombre completo*',
        email: 'Email*',
        phone: 'Teléfono*',
        message: 'Mensaje*',
        submit: 'Enviar'
      }
   
  },
     servicios: {
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
    },
    servicios: {
      subtitle: 'WE ARE DEDICATED TO CREATING AND EXECUTING SOCIAL RESPONSIBILITY STRATEGIES',
      talleres: {
        title: 'WORKSHOPS & CONFERENCES',
        description: 'We design transformative educational experiences that inspire social change.'
      },
      voluntariados: {
        title: 'VOLUNTEERING',
        description: 'We connect committed people with causes that transform communities.'
      },
      csr: {
        title: 'CSR STRATEGIES',
        description: 'We develop comprehensive corporate social responsibility programs.'
      },
      esg: {
        title: 'ESG STRATEGIES',
        description: 'We implement sustainable solutions with environmental, social and governance impact.'
      },
      donativos: {
        title: 'DONATIONS',
        description: 'We channel resources to maximize impact in the most needy communities.'
      },
      social: {
        title: 'SOCIAL SERVICE',
        description: 'We facilitate meaningful community service experiences.'
      }
    },
    footer: {
      form: {
        name: 'Full name*',
        email: 'Email*',
        phone: 'Phone*',
        message: 'Message*',
        submit: 'Send'
      }
    },
    servicios: {
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