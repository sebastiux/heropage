// src/App.jsx
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Servicios from './sections/Servicios';
import Fundaciones from './sections/Fundaciones';
import Proyectos from './sections/Proyectos';
import Aliados from './sections/Aliados'; // Uncomment this
//import Footer from './sections/Footer';
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
          <Aliados /> {/* Add this */}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;