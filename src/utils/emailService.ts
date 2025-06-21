import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
};

const validateConfig = () => {
  const missing = [];
  if (!EMAIL_CONFIG.SERVICE_ID) missing.push('REACT_APP_EMAILJS_SERVICE_ID');
  if (!EMAIL_CONFIG.TEMPLATE_ID) missing.push('REACT_APP_EMAILJS_TEMPLATE_ID');
  if (!EMAIL_CONFIG.PUBLIC_KEY) missing.push('REACT_APP_EMAILJS_PUBLIC_KEY');
  
  if (missing.length > 0) {
    console.error('Missing EmailJS environment variables:', missing.join(', '));
    return false;
  }
  return true;
};

export const initEmailJS = () => {
  if (!validateConfig()) {
    console.error('EmailJS initialization failed: Missing configuration');
    return;
  }
  emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
};

export const sendEmail = async (formData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    if (!validateConfig()) {
      return {
        success: false,
        message: 'Email service is not properly configured. Please contact me directly at clausspal97@gmail.com.',
      };
    }

    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      };
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: process.env.REACT_APP_PORTFOLIO_EMAIL || 'clausspal97@gmail.com',
      reply_to: formData.email,
      timestamp: new Date().toLocaleString(),
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.',
      };
    } else {
      throw new Error('Email service returned an error');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact me directly at clausspal97@gmail.com.',
    };
  }
};

export const sendAutoReply = async (userEmail: string, userName: string) => {
  try {
    if (!validateConfig()) {
      console.error('Auto-reply failed: EmailJS not configured');
      return;
    }

    const autoReplyParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Claudio Palacios',
      message: `Hi ${userName},

Thank you for reaching out through my portfolio! I've received your message and will get back to you within 24-48 hours.

In the meantime, feel free to:
- Check out my GitHub: https://github.com/claupalac
- Connect on LinkedIn: https://www.linkedin.com/in/claudio-palacios-764638160
- Follow me on Instagram: https://www.instagram.com/claupalac/

Best regards,
Claudio Palacios
Senior Software Engineer

This is an automated response. Please do not reply to this email.`,
    };

    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      'auto_reply_template',
      autoReplyParams
    );
  } catch (error) {
    console.error('Auto-reply error:', error);
  }
}; 