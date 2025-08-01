import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { trackSectionView, trackSocialClick } from '../utils/analytics';
import './Hero.css';

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      trackSectionView('hero');
    }
  }, [inView]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform);
  };

  const GithubIcon = FaGithub as React.ComponentType;
  const EnvelopeIcon = FaEnvelope as React.ComponentType;
  const InstagramIcon = FaInstagram as React.ComponentType;
  const LinkedinIcon = FaLinkedin as React.ComponentType;
  const WhatsappIcon = FaWhatsapp as React.ComponentType;

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-background">
        <div className="hero-grid"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm <span className="highlight">Claudio Palacios</span>
            </motion.h1>
            
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Senior Software Engineer
            </motion.h2>
            
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Dynamic leader with exceptional communication skills, specializing in 
              cloud solutions, team leadership, and innovative software architecture. 
              Passionate about driving success through collaboration and technical excellence.
            </motion.p>
            
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('#contact')}
              >
                Get In Touch
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('#experience')}
              >
                View Experience
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hero-social"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.a
              href="https://github.com/claupalac"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSocialClick('github')}
              title="GitHub"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/claupalac/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSocialClick('instagram')}
              title="Instagram"
            >
              <InstagramIcon />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/claudio-palacios-764638160"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSocialClick('linkedin')}
              title="LinkedIn"
            >
              <LinkedinIcon />
            </motion.a>
            <motion.a
              href="https://wa.me/59169495742?text=Hi%20Claudio!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="social-link whatsapp-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSocialClick('whatsapp')}
              title="WhatsApp"
            >
              <WhatsappIcon />
            </motion.a>
            <motion.a
              href="mailto:clausspal97@gmail.com"
              className="social-link"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSocialClick('email')}
              title="Email"
            >
              <EnvelopeIcon />
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 