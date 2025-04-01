import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import logo from '../assets/logo.svg';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-24 h-24 mb-8 animate-float" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Christian Mora
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Desarrollador de Software / Analista de Datos
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/ChristianMoraLopez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-transform hover:scale-110"
            >
              <FaGithub className="text-4xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-mora-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-transform hover:scale-110"
            >
              <FaLinkedin className="text-4xl" />
            </a>
          </div>
          
          <div className="space-x-4">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-all hover:scale-105 transform cursor-pointer shadow-lg hover:shadow-xl"
            >
              Ver Proyectos
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all hover:scale-105 transform cursor-pointer shadow-lg hover:shadow-xl"
            >
              Contactar
            </Link>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link to="about" smooth={true} duration={500} className="cursor-pointer">
            <FaArrowDown className="text-2xl text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 