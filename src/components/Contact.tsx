import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const GithubIcon = FaGithub as React.ComponentType;
  const EnvelopeIcon = FaEnvelope as React.ComponentType;
  const InstagramIcon = FaInstagram as React.ComponentType;
  const LinkedinIcon = FaLinkedin as React.ComponentType;

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Contact
        </motion.h2>
        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Let's Connect</h3>
            <p>
              Interested in working together or have any questions? Feel free to reach out!
            </p>
            <div className="contact-social">
              <a href="https://github.com/claupalac" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <GithubIcon />
              </a>
              <a href="https://www.instagram.com/claupalac/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/in/claudio-palacios-764638160" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <LinkedinIcon />
              </a>
              <a href="mailto:clausspal97@gmail.com" className="contact-social-link">
                <EnvelopeIcon />
              </a>
            </div>
          </motion.div>
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {submitted ? (
              <div className="form-success">Thank you for your message! I'll get back to you soon.</div>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
                <button type="submit" className="btn btn-primary">Send Message</button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 