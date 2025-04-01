import React, { useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';
import AnimatedLogo from './AnimatedLogo';

const Hero = () => {
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col items-center space-y-8">
          <animated.div style={logoSpring}>
            <AnimatedLogo 
              variant="blue"
              className="w-40 h-40"
              animate={true}
            />
          </animated.div>
          
          <h1 className="hero-title text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Christian Mora
          </h1>
          
          <animated.p style={subtitleSpring} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
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
                <social.icon className="text-5xl" />
              </motion.a>
            ))}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
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
                className="inline-block"
              >
                <Link
                  to={button.to}
                  smooth={true}
                  duration={500}
                  className={`
                    px-8 py-4 rounded-lg transform transition-all
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
        </div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Link to="about" smooth={true} duration={500} className="cursor-pointer">
            <FaArrowDown className="text-3xl text-primary" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 