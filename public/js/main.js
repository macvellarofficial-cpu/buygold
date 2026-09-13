/**
 * AL' ITIHAAD INVESTMENTS - MAIN INTERACTIVE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const mainHeader = document.querySelector('.main-header');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  const progressCircle = document.querySelector('.progress-ring circle');

  const updateScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header sticky shadow
    if (mainHeader) {
      if (scrollY > 30) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Scroll to top button & circular progress
    if (scrollToTopBtn && progressCircle) {
      if (scrollY > 300) {
        scrollToTopBtn.classList.add('active');
        const scrollPercent = Math.min(scrollY / (docHeight || 1), 1);
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
      } else {
        scrollToTopBtn.classList.remove('active');
      }
    }
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Offcanvas Drawer
  const offcanvasTrigger = document.querySelector('.offcanvas-trigger');
  const offcanvasDrawer = document.querySelector('.offcanvas-drawer');
  const offcanvasClose = document.querySelector('.offcanvas-close');
  const offcanvasOverlay = document.querySelector('.offcanvas-overlay');

  const openOffcanvas = () => {
    if (offcanvasDrawer && offcanvasOverlay) {
      offcanvasDrawer.classList.add('active');
      offcanvasOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeOffcanvas = () => {
    if (offcanvasDrawer && offcanvasOverlay) {
      offcanvasDrawer.classList.remove('active');
      offcanvasOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    if (mobileDrawer) mobileDrawer.classList.remove('active');
  };

  if (offcanvasTrigger) offcanvasTrigger.addEventListener('click', openOffcanvas);
  if (offcanvasClose) offcanvasClose.addEventListener('click', closeOffcanvas);
  if (offcanvasOverlay) offcanvasOverlay.addEventListener('click', closeOffcanvas);

  // 3. Mobile Navigation Drawer
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.add('active');
      if (offcanvasOverlay) offcanvasOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeOffcanvas);
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOffcanvas();
  });

  // 4. Toast Notifications System
  const showToast = (message, type = 'success') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg style="width: 18px; height: 18px; fill: currentColor; min-width: 18px;" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // 5. Contact & Consultation Form Handler
  const handleFormSubmit = (form, successMessage) => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
        form.reset();
        showToast(successMessage, 'success');
      }, 750);
    });
  };

  handleFormSubmit(document.getElementById('consultationForm'), 'Thank you! Your consultation request has been submitted successfully.');
  handleFormSubmit(document.getElementById('contactForm'), 'Thank you for getting in touch! We will respond promptly.');
  handleFormSubmit(document.getElementById('newsletterForm'), 'Thank you for subscribing to Al\' itihaad Investments updates!');

  // 6. Animate skill progress bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-width') || '100%';
          entry.target.style.width = targetWidth;
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
  }
});
