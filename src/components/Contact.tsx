import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { trackContactForm, trackSocialClick } from '../utils/analytics';
import { sendEmail } from '../utils/emailService';
import './Contact.css';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendEmail(form);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message,
        });
        setForm({ name: '', email: '', message: '' });
        trackContactForm();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again or contact me directly at clausspal97@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform);
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
              <a 
                href="https://github.com/claupalac" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-link"
                onClick={() => handleSocialClick('github')}
              >
                <GithubIcon />
              </a>
              <a 
                href="https://www.instagram.com/claupalac/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-link"
                onClick={() => handleSocialClick('instagram')}
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://www.linkedin.com/in/claudio-palacios-764638160" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-link"
                onClick={() => handleSocialClick('linkedin')}
              >
                <LinkedinIcon />
              </a>
              <a 
                href="mailto:clausspal97@gmail.com" 
                className="contact-social-link"
                onClick={() => handleSocialClick('email')}
              >
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
            {submitStatus.type === 'success' ? (
              <div className="form-success">
                <h3>Message Sent Successfully! ✅</h3>
                <p>{submitStatus.message}</p>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setSubmitStatus({ type: null, message: '' })}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                {submitStatus.type === 'error' && (
                  <div className="form-error">
                    <p>❌ {submitStatus.message}</p>
                  </div>
                )}
                
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 