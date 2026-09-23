// main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Education from './components/Education';
import EngineeringJourney from './components/EngineeringJourney';
import Experience from './components/Experience';
import FeaturedProjects from './components/FeaturedProjects';
import Skills from './components/Skills';
import EngineeringCaseStudies from './components/EngineeringCaseStudies';
import ModernEngineering from './components/ModernEngineering';
import J1Section from './components/J1Section';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Skills />
      <EngineeringCaseStudies />
      <Education />
      <EngineeringJourney />
      <ModernEngineering />
      <J1Section />
      <Footer />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
