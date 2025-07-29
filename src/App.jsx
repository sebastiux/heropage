// src/App.jsx
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Servicios from './sections/Servicios';
import Fundaciones from './sections/Fundaciones';
import Proyectos from './sections/Proyectos';
import Aliados from './sections/Aliados';
import Footer from './sections/Footer'; // Add this import
import './App.scss';

function App() {
  
  return (
    <LanguageProvider>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Servicios />
          <Fundaciones />
          <Proyectos />
          <Aliados />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;;