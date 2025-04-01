import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';

const About = () => {
  const skills = [
    "PHP / Laravel",
    "Java (JPA, JDBC, Hibernate, Spring)",
    "SQL (MySQL)",
    "HTML / CSS / Tailwind / Bootstrap",
    "JavaScript / jQuery / React",
    "C#",
    "R",
    "Git",
    "Metodologías Ágiles"
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Acerca de mí</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Christian Mora</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Desarrollador de Software / Analista de Datos</p>
              <div className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-300">
                <span className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  christianmoralopez@hotmail.com
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Bogotá, Colombia
                </span>
                <span className="flex items-center">
                  <FaPhone className="mr-2" />
                  3144715980
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCode className="mr-2" />
                  Perfil Profesional
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Técnico Profesional en Programación de Aplicaciones de Software y estudiante de cuarto semestre de Ingeniería de Software. 
                  Especializado en desarrollo web y bases de datos, con experiencia en PHP, Java (JPA, JDBC, Hibernate, Spring), 
                  SQL (MySQL), y frameworks frontend como Tailwind y Bootstrap. Experiencia en integración de APIs de pago como PayU 
                  y conexiones a bases de datos en AWS.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <FaBriefcase className="mr-2" />
                  Experiencia Laboral
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold">Programador Novato - OET</h5>
                    <p className="text-gray-500 dark:text-gray-400">Septiembre 2024 - Actual</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                      <li>Desarrollo de funcionalidades para procesamiento de datos contables y financieros.</li>
                      <li>Implementación de sistemas de pre-rentabilidad, rentabilidad y reversión de pre-rentabilidad.</li>
                      <li>Creación de consultas SQL optimizadas para grandes volúmenes de datos.</li>
                      <li>Desarrollo de interfaces de usuario con jQuery y JavaScript vanilla.</li>
                      <li>Manejo de validaciones y procesamiento asíncrono con AJAX.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <FaGraduationCap className="mr-2" />
                  Educación
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>Ingeniería de Software - Fundación Universitaria Compensar (2022 - 2027)</li>
                  <li>Curso Frontend Developer - Oracle University, Bogotá (2022 - 2023)</li>
                  <li>Curso Análisis de Datos - Google Coursera (2023)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Habilidades Técnicas</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 