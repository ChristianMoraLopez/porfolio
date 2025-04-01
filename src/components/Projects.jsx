import React from 'react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Portafolio de Maquillaje",
    description: "Reserva una sesión de maquillaje en esta aplicación fullstack",
    image: "https://i.ibb.co/6bbdX65/Captura.png",
    link: "https://portfolio-make-up.vercel.app/",
    github: "https://github.com/ChristianMoraLopez"
  },
  {
    title: "Rolo App!",
    description: "Una aplicación web para compartir y descubrir las emociones y sensaciones que despiertan los diferentes lugares de Bogotá.",
    image: "https://i.ibb.co/h1yGQgB7/bogotabw.webp",
    link: "https://rolo-app.vercel.app/",
    github: "https://github.com/ChristianMoraLopez"
  },
  {
    title: "Task Manager",
    description: "Aplicación en la que podrás organizar tus tareas, ¡puedes instalarla en tu celular!",
    image: "/images/taskmanager.jpeg",
    link: "https://taskmanager-git-main-christianmoralopez.vercel.app/",
    github: "https://github.com/ChristianMoraLopez"
  },
  {
    title: "DIBUJA LINEAS JAVASCRIPT",
    description: "Una aplicación interactiva que permite al usuario dibujar líneas utilizando JavaScript.",
    image: "https://lh3.googleusercontent.com/d/1cswFasOCe4dEbGyfRLrJctp4Hdz3IokS",
    link: "/dibujo.html",
    github: "https://github.com/ChristianMoraLopez"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Proyectos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex items-center space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary"
                  >
                    <FaGithub className="mr-2" />
                    Ver en GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 