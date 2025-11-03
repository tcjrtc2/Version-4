// Main JavaScript for Back on the Bricks Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initParallaxEffect();
    initFallingMoneyAnimation();
    initScrollRevealAnimations();
    initStatCounters();
    initSmoothScrolling();
    initMobileNavigation();
    initFormHandling();
    
    // Add scroll listener for navbar background
    window.addEventListener('scroll', updateNavbarBackground);
});

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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message (in a real app, you'd send this to a server)
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--gold-primary), var(--green-primary));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
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
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Floating Action Buttons (Optional Enhancement)
function createFloatingActionButtons() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-buttons';
    fab.innerHTML = `
        <button class="fab fab-main" title="Quick Actions">
            💬
        </button>
        <div class="fab-menu">
            <button class="fab fab-item" title="Call Us" data-action="call">📞</button>
            <button class="fab fab-item" title="Email Us" data-action="email">📧</button>
            <button class="fab fab-item" title="Chat" data-action="chat">💭</button>
        </div>
    `;
    
    // Add styles
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
    `;
    
    document.body.appendChild(fab);
    
    // Handle FAB interactions
    const fabMain = fab.querySelector('.fab-main');
    const fabMenu = fab.querySelector('.fab-menu');
    
    fabMain.addEventListener('click', () => {
        fabMenu.classList.toggle('active');
    });
    
    // Handle FAB actions
    const fabItems = fab.querySelectorAll('.fab-item');
    fabItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            handleFabAction(action);
        });
    });
}

function handleFabAction(action) {
    switch (action) {
        case 'call':
            window.open('tel:+15551234567');
            break;
        case 'email':
            window.open('mailto:hello@atajfinancial.com');
            break;
        case 'chat':
            showNotification('Chat feature coming soon!', 'info');
            break;
    }
}

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
window.addEventListener('scroll', throttledParallax);

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
    createFloatingActionButtons();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Add some CSS for additional animations and mobile responsiveness
const additionalStyles = `
    <style>
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
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .floating-action-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    
    .fab {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, var(--gold-primary), var(--green-primary));
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    .fab-menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        pointer-events: none;
    }
    
    .fab-menu.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
    }
    
    .fab-item {
        width: 48px;
        height: 48px;
        font-size: 1rem;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 100%;
            max-width: 300px;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 2rem 0;
            transition: right 0.3s ease;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .floating-action-buttons {
            bottom: 20px;
            right: 20px;
        }
        
        .fab {
            width: 50px;
            height: 50px;
            font-size: 1.1rem;
        }
        
        .fab-item {
            width: 44px;
            height: 44px;
            font-size: 0.9rem;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);