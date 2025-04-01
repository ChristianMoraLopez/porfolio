import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/rc84s3', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Estoy aquí para ayudarte a hacer realidad tu proyecto. Contáctame a través de WhatsApp para una conversación directa y personalizada.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className="inline-flex items-center px-8 py-4 bg-[#25D366] text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <FaWhatsapp className="text-2xl mr-3" />
            Contactar por WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 