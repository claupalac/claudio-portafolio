import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaCode, FaRocket } from 'react-icons/fa';
import './Experience.css';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const experiences = [
    {
      period: '2024 – Present',
      title: 'Senior Software Engineer Team Lead',
      company: 'Assuresoft',
      icon: FaUsers,
      description: 'Leading a dynamic team in the successful delivery of high-quality software solutions. Built a reputation as a trusted reference within the project, earning the confidence of clients and stakeholders.',
      achievements: [
        'First point of contact in critical situations, adept at handling emergencies',
        'Coordinate project releases, ensuring seamless integration and deployment',
        'Design robust software architectures that meet business needs',
        'Foster collaboration, mentor team members, and drive innovation'
      ],
      technologies: ['AWS', 'PHP', 'JS', 'MySQL', 'Linux', 'Kubernetes']
    },
    {
      period: '2022 – 2024',
      title: 'Software Engineer Team Lead',
      company: 'Assuresoft',
      icon: FaRocket,
      description: 'Led a 5-member team, organizing, planning and designing architecture solutions. Worked with troubleshooting handling sensitive data and AWS cloud implementations.',
      achievements: [
        'Led infrastructure migration from data center to AWS cloud',
        'Implemented cloud solutions and optimizations projects',
        'Enhanced team and team members professional skills',
        'Worked with HL7 integrations and API development'
      ],
      technologies: ['AWS', 'PHP', 'JS', 'MySQL', 'Linux', 'Kubernetes', 'Terraform', 'HL7']
    },
    {
      period: '2021 – 2022',
      title: 'Junior Software Engineer',
      company: 'Assuresoft',
      icon: FaCode,
      description: 'Worked with several defects in PHP, JavaScript and TypeScript. Gained experience with MySQL database projects and payment systems.',
      achievements: [
        'Worked on projects related to payments and APIs',
        'Good performance working with English native team members',
        'Developed strong foundation in web technologies',
        'Collaborated effectively with international clients'
      ],
      technologies: ['PHP', 'JS', 'TypeScript', 'MySQL', 'Linux']
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Experience
        </motion.h2>

        <div className="timeline" ref={ref}>
          {experiences.map((exp, index) => {
            const Icon = exp.icon as React.ComponentType;
            return (
              <motion.div
                key={exp.period}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div className="timeline-icon">
                      <Icon />
                    </div>
                    <div className="timeline-info">
                      <h3>{exp.title}</h3>
                      <h4>{exp.company}</h4>
                      <span className="timeline-period">{exp.period}</span>
                    </div>
                  </div>
                  
                  <p className="timeline-description">{exp.description}</p>
                  
                  <div className="timeline-achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="timeline-technologies">
                    <h5>Technologies:</h5>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience; 