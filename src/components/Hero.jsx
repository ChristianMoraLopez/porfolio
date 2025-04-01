import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';
import AnimatedLogo from './AnimatedLogo';

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // GSAP Animation
  useEffect(() => {
    gsap.from('.hero-title', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.5,
    });
  }, []);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // React Spring Animations
  const logoSpring = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
    config: { tension: 200, friction: 12 },
  });

  const subtitleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 1000,
  });

  // Framer Motion Variants
  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 2,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32">
      {/* Background with Text Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 flex items-start justify-center">
          <h1 className="text-[8vw] font-bold text-blue-100 dark:text-blue-900 opacity-50 select-none tracking-wider">
            Christian Mora
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col items-center space-y-4">
          <animated.div style={logoSpring}>
            <AnimatedLogo 
              variant="blue"
              className="w-32 h-32 sm:w-40 sm:h-40"
              animate={true}
            />
          </animated.div>
          
          {/* Scroll Indicator */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="w-6 h-10 border-2 border-primary rounded-full p-1"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 bg-primary rounded-full mx-auto"
                    animate={{
                      y: [0, 12, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <motion.p 
                  className="text-sm text-gray-600 dark:text-gray-400 mt-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Scroll
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <animated.p style={subtitleSpring} className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl px-4">
            Desarrollador de Software / Analista de Datos
          </animated.p>
          
          <motion.div
            variants={socialVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center space-x-8"
          >
            {[
              { icon: FaGithub, href: 'https://github.com/ChristianMoraLopez' },
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/christian-mora-lopez/' },
            ].map((social, index) => (
              <motion.a
                key={index}
                variants={socialVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary"
              >
                <social.icon className="text-4xl sm:text-5xl" />
              </motion.a>
            ))}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
            {[
              { text: 'Ver Proyectos', to: 'projects', primary: true },
              { text: 'Contactar', to: 'contact', primary: false },
            ].map((button, index) => (
              <motion.div
                key={index}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="w-full sm:w-auto"
              >
                <Link
                  to={button.to}
                  smooth={true}
                  duration={500}
                  className={`
                    block w-full sm:w-auto px-8 py-4 rounded-lg transform transition-all text-center
                    ${button.primary
                      ? 'bg-primary text-white hover:bg-secondary'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }
                    shadow-lg hover:shadow-xl
                  `}
                >
                  {button.text}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Buy Me a Coffee Button */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="mt-4"
          >
            <a
              href="https://buymeacoffee.com/christianmora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#FFDD00] text-black rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <img 
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
                alt="Buy me a coffee" 
                className="h-6 mr-2"
              />
              Buy me a coffee
            </a>
          </motion.div>
        </div>
        
        {/* Fixed WhatsApp Button */}
        <motion.a
          href="https://wa.link/rc84s3"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWhatsapp className="text-3xl" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero; 