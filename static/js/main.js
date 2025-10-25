/**
 * Personal Website - Main JavaScript
 * Handles navigation, form validation, and dynamic content
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality (apply theme first)
    initThemeToggle();
    initCdnImages();
    initNavigation();
    initFooter();
    initScrollProgressBar();
    initRevealOnScroll();
    initButtonRipples();
    initAutoResizeAndCounter();
    initContactForm();
});

/**
 * Navigation Management
 * Sets active state for current page and handles skip link
 */
function initNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Set active state for current page
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath.includes('index.html')) ||
            (currentPath.endsWith('/') && linkPath.includes('index.html'))) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        }
    });
    
    // Handle skip link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * CDN Image Swap
 * Replaces images that declare data-cdn-key with a configured CDN URL
 */
function initCdnImages() {
    try {
        const map = (window && window.CDN_IMAGES) ? window.CDN_IMAGES : {};
        if (!map || typeof map !== 'object') return;

        const imgs = document.querySelectorAll('img[data-cdn-key]');
        imgs.forEach(img => {
            const key = img.getAttribute('data-cdn-key');
            const url = map[key];
            if (!url) return;

            // Preload to avoid flashing broken image
            const preloader = new Image();
            preloader.onload = () => {
                img.src = url;
                // Optionally set srcset for responsive behavior
                if (!img.hasAttribute('srcset')) {
                    img.setAttribute('srcset', url);
                }
            };
            preloader.onerror = () => {
                // Keep existing placeholder if CDN fails
            };
            preloader.src = url;
        });
    } catch (_) {
        // Silently ignore; site should continue to function with placeholders
    }
}

/**
 * Footer Management
 * Updates copyright year dynamically
 */
function initFooter() {
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Contact Form Validation - MCP Pattern
 * Initializes the Model-View-Controller-Presenter architecture
 */
function initContactForm() {
    if (document.getElementById('contactForm')) {
        // Initialize MCP components
        const model = new UserModel();
        const view = new FormView();
        const controller = new FormController();
        const presenter = new FormPresenter(model, view, controller);
    }
}

/**
 * Form Validation Logic
 * Returns true if form is valid, false otherwise
 */
function validateForm() {
    let isValid = true;
    
    // Get form elements
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Validate first name
    if (!firstName || !firstName.value.trim() || firstName.value.trim().length < 1) {
        showError('firstNameError', 'First name is required and must be at least 1 character long.');
        isValid = false;
    }
    
    // Validate last name
    if (!lastName || !lastName.value.trim() || lastName.value.trim().length < 1) {
        showError('lastNameError', 'Last name is required and must be at least 1 character long.');
        isValid = false;
    }
    
    // Validate email
    if (!email || !email.value.trim()) {
        showError('emailError', 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }
    
    // Validate subject
    if (!subject || !subject.value.trim() || subject.value.trim().length < 3) {
        showError('subjectError', 'Subject is required and must be at least 3 characters.');
        isValid = false;
    }

    // Validate message
    if (!message || !message.value.trim() || message.value.trim().length < 10) {
        showError('messageError', 'Message is required and must be at least 10 characters.');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate Password Match
 * Checks if password and confirm password match
 */
// Password validation removed as form no longer uses passwords

/**
 * Email Validation
 * Returns true if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show Error Message
 * Displays error message for a specific field
 */
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('aria-live', 'polite');
        
        // Add error class to input or textarea
        let input = errorElement.previousElementSibling;
        if (input && input.tagName !== 'INPUT' && input.tagName !== 'TEXTAREA') {
            // For message field the error is below a helper row
            const group = errorElement.closest('.form-group');
            input = group ? group.querySelector('input, textarea') : null;
        }
        if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
            input.classList.add('error');
        }
    }
}

/**
 * Clear Error Message
 * Removes error message for a specific field
 */
function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        
        // Remove error class from input or textarea
        let input = errorElement.previousElementSibling;
        if (input && input.tagName !== 'INPUT' && input.tagName !== 'TEXTAREA') {
            const group = errorElement.closest('.form-group');
            input = group ? group.querySelector('input, textarea') : null;
        }
        if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
            input.classList.remove('error');
        }
    }
}

/**
 * Clear All Errors
 * Removes all error messages and classes
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(errorEl => {
        if (errorEl.tagName === 'P') {
            errorEl.textContent = '';
        }
    });
    
    const errorInputs = document.querySelectorAll('input.error, textarea.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize smooth scroll if needed
document.addEventListener('DOMContentLoaded', initSmoothScroll);

/**
 * Scroll progress bar at top of page
 */
function initScrollProgressBar() {
    let bar = document.getElementById('scroll-progress');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);
    }
    const update = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    };
    document.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/**
 * Theme toggle with persistence and system preference detection
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Initialize theme from localStorage or system preference
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    applyTheme(currentTheme);
    updateToggleButton(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only update if user hasn't made an explicit choice
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            updateToggleButton(systemTheme);
        }
    });

    // Handle toggle button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        updateToggleButton(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Update toggle button appearance and state
 */
function updateToggleButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeIcon.textContent = '🌙';
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

/**
 * Button ripple effects
 */
function initButtonRipples() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.btn');
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const circle = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';
        circle.style.left = e.clientX - rect.left - size / 2 + 'px';
        circle.style.top = e.clientY - rect.top - size / 2 + 'px';
        circle.className = 'ripple-circle';
        target.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    }, { passive: true });
}

/**
 * Typewriter effect for hero intro (homepage only)
 */
// Typewriter removed; using reveal-on-scroll for subtle hero fade-in

/**
 * Reveal-on-scroll animations using IntersectionObserver
 */
function initRevealOnScroll() {
    const revealEls = document.querySelectorAll('.card, .projects-grid > *, .resume-section, .contact-info, .hero h1, .hero p, .hero .hero-actions');
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
}

/**
 * Auto-resize textarea and update character counter
 */
function initAutoResizeAndCounter() {
    const textarea = document.getElementById('message');
    const counter = document.getElementById('messageCounter');
    if (!textarea) return;

    const update = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        if (counter) {
            const max = textarea.getAttribute('maxlength');
            const len = textarea.value.length;
            counter.textContent = `${len} / ${max}`;
        }
    };

    textarea.addEventListener('input', update);
    // Initialize once
    update();
}
