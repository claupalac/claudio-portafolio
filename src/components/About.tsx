import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';
import profileImage from '../assets/profile.png';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={profileImage} alt="Claudio Palacios" />
          </motion.div>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Senior Software Engineer & Team Lead</h3>
            <p>
              I am a passionate Senior Software Engineer with over 3 years of experience 
              leading dynamic teams and delivering high-quality software solutions. Based in 
              Cochabamba, Bolivia, I specialize in cloud solutions, team leadership, and 
              innovative software architecture.
            </p>
            <p>
              My journey in software development has been marked by continuous growth, 
              from working with PHP and JavaScript as a Junior Engineer to leading 
              infrastructure migrations to AWS cloud as a Senior Engineer. I take pride 
              in being a trusted reference within projects, earning the confidence of 
              clients and stakeholders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 