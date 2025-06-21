import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaAws, FaPhp, FaJs, FaDatabase, FaDocker, FaLinux, 
  FaGit, FaHtml5, FaCss3Alt, FaReact, FaPython 
} from 'react-icons/fa';
import { SiTypescript, SiTerraform, SiKubernetes, SiMysql } from 'react-icons/si';
import './Skills.css';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'PHP', icon: FaPhp, level: 90 },
        { name: 'JavaScript', icon: FaJs, level: 85 },
        { name: 'TypeScript', icon: SiTypescript, level: 80 },
        { name: 'Python', icon: FaPython, level: 75 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', icon: FaAws, level: 90 },
        { name: 'Terraform', icon: SiTerraform, level: 85 },
        { name: 'Kubernetes', icon: SiKubernetes, level: 80 },
        { name: 'Docker', icon: FaDocker, level: 75 }
      ]
    },
    {
      title: 'Databases & Tools',
      skills: [
        { name: 'MySQL', icon: SiMysql, level: 85 },
        { name: 'Linux', icon: FaLinux, level: 90 },
        { name: 'Git', icon: FaGit, level: 85 },
        { name: 'Database Design', icon: FaDatabase, level: 80 }
      ]
    },
    {
      title: 'Frontend & Web',
      skills: [
        { name: 'HTML5', icon: FaHtml5, level: 90 },
        { name: 'CSS3', icon: FaCss3Alt, level: 85 },
        { name: 'React', icon: FaReact, level: 80 },
        { name: 'Web APIs', icon: FaJs, level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="skills-content" ref={ref}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon as React.ComponentType;
                  return (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="skill-header">
                        <div className="skill-icon">
                          <Icon />
                        </div>
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="skill-progress">
                        <motion.div
                          className="skill-progress-bar"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="additional-skills"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Additional Skills</h3>
          <div className="additional-skills-grid">
            <div className="skill-tag">Team Leadership</div>
            <div className="skill-tag">Project Management</div>
            <div className="skill-tag">Agile Methodologies</div>
            <div className="skill-tag">API Development</div>
            <div className="skill-tag">System Architecture</div>
            <div className="skill-tag">Performance Optimization</div>
            <div className="skill-tag">HL7 Integration</div>
            <div className="skill-tag">Payment Systems</div>
            <div className="skill-tag">English Communication</div>
            <div className="skill-tag">Problem Solving</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 