// Central Tennis - Main JavaScript

// Contact info obfuscation (prevents bot scraping)
(function() {
  const p = ['314', '884', '8522'];
  const e = ['cannon', 'central-tennis', 'com'];
  const phoneText = '(' + p[0] + ') ' + p[1] + '-' + p[2];
  const phoneLink = 'tel:+1' + p.join('');
  const email = e[0] + '@' + e[1] + '.' + e[2];
  const emailLink = 'mailto:' + email;

  document.querySelectorAll('[data-contact="phone"]').forEach(el => {
    el.href = phoneLink;
    const span = el.querySelector('span');
    if (span) {
      span.textContent = phoneText;
    } else {
      el.textContent = phoneText;
    }
  });

  document.querySelectorAll('[data-contact="email"]').forEach(el => {
    el.href = emailLink;
    el.textContent = email;
  });
})();

// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu toggle
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form validation and AJAX submission (no redirect)
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const submitBtn = this.querySelector('.form-submit');

    // Basic validation
    if (!name || !email || !phone) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(phone)) {
      showFormMessage('Please enter a valid phone number.', 'error');
      return;
    }

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showFormMessage('Thanks! We\'ll be in touch soon.', 'success');
        this.reset();
      } else {
        showFormMessage('Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      showFormMessage('Something went wrong. Please try again.', 'error');
    }

    submitBtn.textContent = 'Request a Quote';
    submitBtn.disabled = false;
  });
}

// Show form message helper
function showFormMessage(message, type) {
  let msgEl = document.getElementById('form-message');
  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.id = 'form-message';
    contactForm.appendChild(msgEl);
  }
  msgEl.textContent = message;
  msgEl.className = 'form-message form-message--' + type;
  msgEl.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .stat-box, .state-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !hamburger.contains(e.target)) {
    toggleMobileMenu();
  }
});

// Console welcome message
console.log('%c🎾 Central Tennis', 'font-size: 24px; font-weight: bold; color: #1E3A8A;');
console.log('%cLaykold Authorized Masters Dealer', 'font-size: 14px; color: #2D5016;');
