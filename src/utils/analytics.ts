declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}
export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || '';

const validateGAConfig = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics not configured: Missing REACT_APP_GA_MEASUREMENT_ID');
    return false;
  }
  return true;
};

export const initGA = () => {
  if (!validateGAConfig()) {
    console.warn('Google Analytics initialization skipped: Missing configuration');
    return;
  }

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
      anonymize_ip: true,
    });
  `;
  document.head.appendChild(script2);
};

export const trackPageView = (url: string, title: string) => {
  if (!validateGAConfig() || typeof window.gtag === 'undefined') {
    return;
  }
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
    custom_map: {
      'dimension1': 'visitor_type'
    }
  });
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!validateGAConfig() || typeof window.gtag === 'undefined') {
    return;
  }
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    timestamp: new Date().toISOString(),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
  });
};

export const trackContactForm = (formData?: { name?: string, email?: string }) => {
  trackEvent('submit', 'contact_form', 'portfolio_contact');
  
  trackEvent('form_completion', 'engagement', 'contact_form_completed');
};

export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social_media', platform);
  trackEvent('external_link', 'navigation', `social_${platform}`);
};

export const trackResumeDownload = () => {
  trackEvent('download', 'resume', 'portfolio_resume');
  trackEvent('file_download', 'engagement', 'resume_pdf');
};

export const trackSectionView = (section: string) => {
  trackEvent('view', 'section', section);
  trackEvent('scroll_depth', 'engagement', section);
}; 