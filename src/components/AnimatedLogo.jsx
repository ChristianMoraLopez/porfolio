import React from 'react';
import { motion } from 'framer-motion';
import logo from '../images/logo.svg';
import logo2 from '../images/Logo2.svg';
import logo3White from '../images/Logo3White.svg';

const AnimatedLogo = ({ variant = 'default', className = '', animate = true }) => {
  const logos = {
    default: logo,
    blue: logo2,
    white: logo3White
  };

  const selectedLogo = logos[variant];

  const logoVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      rotate: -180
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial={animate ? "hidden" : "visible"}
      animate="visible"
      whileHover="hover"
      variants={logoVariants}
    >
      <motion.img
        src={selectedLogo}
        alt="Logo"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.2))' }}
      />
    </motion.div>
  );
};

export default AnimatedLogo; 