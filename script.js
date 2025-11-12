// Main JavaScript for ATAJ Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initPreloader();
    initScrollProgress();
    initBackToTop();
    initThemeToggle();
    initParallaxEffect();
    initFallingMoneyAnimation();
    initScrollRevealAnimations();
    initStatCounters();
    initSmoothScrolling();
    initMobileNavigation();
    initFormHandling();
    initCalculator();
    initFAQ();
    initNewsletter();
    initTaxCountdown();
    
    // Add scroll listener for navbar background
    window.addEventListener('scroll', updateNavbarBackground);
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('scroll', updateBackToTop);
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    if (progressBar) {
        updateScrollProgress();
    }
}

function updateScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        updateBackToTop();
    }
}

function updateBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Dark Mode - Auto Mode based on Time Only
function initThemeToggle() {
    // Auto mode: set based on time of day
    setThemeByTime();
    
    // Check time every hour to auto-update
    setInterval(() => {
        setThemeByTime();
    }, 3600000); // Check every hour
}

function setThemeByTime() {
    const hour = new Date().getHours();
    
    // Dark mode between 6 PM (18:00) and 6 AM (06:00)
    // Light mode between 6 AM (06:00) and 6 PM (18:00)
    if (hour >= 18 || hour < 6) {
        // Night time - use dark mode
        document.body.classList.add('dark-mode');
    } else {
        // Day time - use light mode
        document.body.classList.remove('dark-mode');
    }
}

// Parallax Effect for 3D Background Layers
function initParallaxEffect() {
    const layers = document.querySelectorAll('.bg-layer');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1; // Different speeds for each layer
            const yPos = -(scrollTop * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, ${-300 + index * 100}px) scale(${1.3 - index * 0.1})`;
        });
    });
}

// Falling Money Animation
function initFallingMoneyAnimation() {
    const moneyContainer = document.getElementById('money-container');
    const moneyTypes = ['bill', 'coin'];
    
    function createMoneyElement() {
        const money = document.createElement('div');
        const type = moneyTypes[Math.floor(Math.random() * moneyTypes.length)];
        
        money.classList.add(`money-${type}`);
        
        // Random positioning
        money.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (3-8 seconds)
        const duration = 3 + Math.random() * 5;
        money.style.animationDuration = duration + 's';
        
        // Random delay for staggered effect
        money.style.animationDelay = Math.random() * 2 + 's';
        
        // Add 3D rotation during fall
        const rotateX = Math.random() * 360;
        const rotateY = Math.random() * 360;
        money.style.setProperty('--rotate-x', rotateX + 'deg');
        money.style.setProperty('--rotate-y', rotateY + 'deg');
        
        moneyContainer.appendChild(money);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (money.parentNode) {
                money.parentNode.removeChild(money);
            }
        }, (duration + 2) * 1000);
    }
    
    // Create initial money elements
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createMoneyElement(), i * 300);
    }
    
    // Continue creating money elements
    setInterval(createMoneyElement, 800);
}

// Scroll Reveal Animations
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe elements for reveal animation
    const revealElements = document.querySelectorAll('.about-card, .service-card, .contact-form, .contact-info');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Animated Counters for Stats Section
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        if (hasAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100; // Animation duration roughly 2 seconds
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        hasAnimated = true;
    };
    
    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        });
        
        observer.observe(statsSection);
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Dynamic Navbar Background
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Get form data
                const formData = new FormData(contactForm);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                inputs.forEach(input => {
                    input.classList.remove('error', 'success');
                });
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }
}

// Input Validation
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Remove previous validation classes
    input.classList.remove('error', 'success');
    
    // Check if required
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Add validation class
    if (value) {
        input.classList.add(isValid ? 'success' : 'error');
    }
    
    return isValid;
}

// Calculator Function
function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateInvestment);
        
        // Auto-calculate on input change
        const inputs = document.querySelectorAll('#initialInvestment, #monthlyContribution, #interestRate, #years');
        inputs.forEach(input => {
            input.addEventListener('change', calculateInvestment);
        });
        
        // Initial calculation
        calculateInvestment();
    }
}

function calculateInvestment() {
    const principal = parseFloat(document.getElementById('initialInvestment').value) || 0;
    const monthly = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const rate = parseFloat(document.getElementById('interestRate').value) / 100 || 0;
    const years = parseFloat(document.getElementById('years').value) || 0;
    
    const months = years * 12;
    const monthlyRate = rate / 12;
    
    // Calculate future value with compound interest
    let futureValue = principal * Math.pow(1 + monthlyRate, months);
    
    // Add monthly contributions with compound interest
    if (monthly > 0 && monthlyRate > 0) {
        futureValue += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (monthly > 0) {
        futureValue += monthly * months;
    }
    
    const totalContributions = principal + (monthly * months);
    const totalInterest = futureValue - totalContributions;
    
    // Display results with animation
    animateValue('finalBalance', futureValue);
    animateValue('totalContributions', totalContributions);
    animateValue('totalInterest', totalInterest);
}

function animateValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1000;
    const start = 0;
    const end = value;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = start + (end - start) * easeOutQuart(progress);
        element.textContent = '$' + currentValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Newsletter Form
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
                newsletterForm.reset();
            }
        });
    }
}

// Tax Season Countdown Timer
function initTaxCountdown() {
    const countdownElement = document.getElementById('taxCountdown');
    if (!countdownElement) return;
    
    // Set target date to January 29, 2026 (when IRS typically starts accepting returns)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    // If we're past January 29 of current year, target next year
    let targetYear = currentYear;
    if (currentMonth > 0 || (currentMonth === 0 && new Date().getDate() > 29)) {
        targetYear = currentYear + 1;
    }
    
    const taxSeasonStart = new Date(`January 29, ${targetYear} 00:00:00`).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = taxSeasonStart - now;
        
        if (distance < 0) {
            // Tax season has started
            document.querySelector('.countdown-label').textContent = 'Tax Season is Here!';
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set color based on type
    let bgColor;
    switch(type) {
        case 'success':
            bgColor = 'linear-gradient(135deg, #90EE90, #6B8E23)';
            break;
        case 'error':
            bgColor = 'linear-gradient(135deg, #ff6b6b, #c92a2a)';
            break;
        default:
            bgColor = 'linear-gradient(135deg, var(--gold-primary), var(--green-primary))';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-weight: 500;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Handle close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for form validation states
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff6b6b !important;
    }
    
    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: #90EE90 !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
    }
    
    .notification-close:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(validationStyles);

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(initParallaxEffect, 16); // ~60fps

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Home key goes to top
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End key goes to bottom
    if (e.key === 'End' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Preload critical resources
function preloadResources() {
    // Preload fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap';
    link.as = 'style';
    link.crossorigin = 'anonymous';
    document.head.appendChild(link);
}

// Initialize on load
window.addEventListener('load', () => {
    preloadResources();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Add lazy loading to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});
