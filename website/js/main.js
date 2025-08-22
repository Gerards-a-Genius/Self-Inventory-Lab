// Self-Inventory Lab Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initSocialMediaDelight();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Card hover effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Button click animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize card hover effects and button animations
document.addEventListener('DOMContentLoaded', function() {
    initCardHoverEffects();
    initButtonAnimations();
});

// Social Media Delightful Interactions
function initSocialMediaDelight() {
    const socialMediaSections = document.querySelectorAll('.social-media');
    const socialLinks = document.querySelectorAll('.social-link');
    let customCursor = null;
    let heartbeatTimeout = null;
    const encouragingMessages = {
        linkedin: ['Let\'s connect!', 'Connect for insights!', 'Join my network!', 'Professional connection!'],
        instagram: ['Follow the journey!', 'Join the inspiration!', 'Behind the scenes!', 'Daily motivation!']
    };
    
    // Create custom cursor
    function createCustomCursor() {
        if (customCursor) return;
        
        customCursor = document.createElement('div');
        customCursor.className = 'social-media-cursor';
        document.body.appendChild(customCursor);
    }
    
    // Add tooltips to social links and set animation delays
    function addTooltips() {
        socialLinks.forEach((link, index) => {
            // Set staggered animation delay
            link.style.setProperty('--link-index', index);
            
            const tooltip = document.createElement('div');
            tooltip.className = 'social-tooltip';
            
            // Determine platform and get random message
            const isLinkedIn = link.href.includes('linkedin');
            const platform = isLinkedIn ? 'linkedin' : 'instagram';
            const messages = encouragingMessages[platform];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            tooltip.textContent = randomMessage;
            tooltip.classList.add(`${platform}-tip`);
            
            // Add alternative class randomly for variety
            if (Math.random() > 0.5) {
                tooltip.classList.add('alt');
            }
            
            link.appendChild(tooltip);
        });
    }
    
    // Magnetic cursor attraction effect
    function initMagneticEffect() {
        socialLinks.forEach(link => {
            const rect = link.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            link.addEventListener('mouseenter', function(e) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                
                const mouseMoveHandler = (e) => {
                    const rect = this.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const deltaX = e.clientX - centerX;
                    const deltaY = e.clientY - centerY;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    
                    // Apply magnetic effect within 100px radius
                    if (distance < 100) {
                        const strength = Math.max(0, 1 - distance / 100);
                        const maxPull = 8; // Maximum pixels to pull
                        const pullX = (deltaX / distance) * strength * maxPull;
                        const pullY = (deltaY / distance) * strength * maxPull;
                        
                        this.style.setProperty('--magnetic-x', `${pullX * 0.3}px`);
                        this.style.setProperty('--magnetic-y', `${pullY * 0.3}px`);
                        this.classList.add('magnetic');
                        
                        // Update cursor position
                        if (customCursor) {
                            customCursor.style.left = (e.clientX - 10) + 'px';
                            customCursor.style.top = (e.clientY - 10) + 'px';
                            customCursor.classList.add('attracted');
                        }
                    }
                };
                
                document.addEventListener('mousemove', mouseMoveHandler);
                
                this.addEventListener('mouseleave', function() {
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    this.style.setProperty('--magnetic-x', '0px');
                    this.style.setProperty('--magnetic-y', '0px');
                    this.classList.remove('magnetic');
                    
                    if (customCursor) {
                        customCursor.classList.remove('attracted');
                    }
                }, { once: true });
            });
        });
    }
    
    // Heartbeat effect on proximity
    function initHeartbeatEffect() {
        socialMediaSections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                
                clearTimeout(heartbeatTimeout);
                
                const links = this.querySelectorAll('.social-link');
                links.forEach(link => {
                    link.classList.add('heartbeat');
                });
                
                // Stop heartbeat after a few cycles
                heartbeatTimeout = setTimeout(() => {
                    links.forEach(link => {
                        link.classList.remove('heartbeat');
                    });
                }, 4500); // 3 heartbeat cycles
            });
            
            section.addEventListener('mouseleave', function() {
                clearTimeout(heartbeatTimeout);
                const links = this.querySelectorAll('.social-link');
                links.forEach(link => {
                    link.classList.remove('heartbeat');
                });
            });
        });
    }
    
    // Sparkle effect on click
    function initSparkleEffect() {
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                
                const rect = this.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                this.style.setProperty('--sparkle-x', `${x}%`);
                this.style.setProperty('--sparkle-y', `${y}%`);
                
                this.classList.add('sparkle');
                
                // Remove sparkle class after animation
                setTimeout(() => {
                    this.classList.remove('sparkle');
                }, 600);
                
                // Add a subtle haptic feedback simulation
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
        });
    }
    
    // Custom cursor tracking
    function initCustomCursor() {
        createCustomCursor();
        
        socialMediaSections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                if (customCursor) {
                    customCursor.classList.add('active');
                    document.body.style.cursor = 'none';
                }
            });
            
            section.addEventListener('mouseleave', function() {
                if (customCursor) {
                    customCursor.classList.remove('active', 'attracted');
                    document.body.style.cursor = '';
                }
            });
            
            section.addEventListener('mousemove', function(e) {
                if (customCursor && customCursor.classList.contains('active')) {
                    customCursor.style.left = (e.clientX - 10) + 'px';
                    customCursor.style.top = (e.clientY - 10) + 'px';
                }
            });
        });
    }
    
    // Add success feedback for clicks
    function addSuccessFeedback() {
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Create a subtle success message
                const feedback = document.createElement('div');
                feedback.textContent = 'Opening...';
                feedback.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--soft-coral);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    z-index: 10000;
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                    font-family: var(--font-body);
                `;
                
                document.body.appendChild(feedback);
                
                // Animate in
                requestAnimationFrame(() => {
                    feedback.style.opacity = '1';
                    feedback.style.transform = 'translateY(0)';
                });
                
                // Remove after delay
                setTimeout(() => {
                    feedback.style.opacity = '0';
                    feedback.style.transform = 'translateY(-10px)';
                    setTimeout(() => feedback.remove(), 300);
                }, 1500);
            });
        });
    }
    
    // Accessibility: Respect user preferences
    function respectMotionPreferences() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable all motion-based effects
            socialLinks.forEach(link => {
                link.style.animation = 'none';
                link.classList.remove('heartbeat', 'magnetic', 'sparkle');
            });
            
            if (customCursor) {
                customCursor.style.display = 'none';
            }
            
            return true; // Motion is reduced
        }
        return false; // Motion is allowed
    }
    
    // Initialize all effects if motion is allowed
    if (!respectMotionPreferences()) {
        addTooltips();
        initMagneticEffect();
        initHeartbeatEffect();
        initSparkleEffect();
        initCustomCursor();
        addSuccessFeedback();
    } else {
        // Still add tooltips and success feedback for accessibility
        addTooltips();
        addSuccessFeedback();
    }
    
    // Listen for changes to motion preferences
    window.matchMedia('(prefers-reduced-motion: reduce)').addListener(respectMotionPreferences);
    
    // Performance optimization: Use RAF for smooth animations
    let rafId;
    function optimizedMouseMove(e) {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            // Update cursor position and magnetic effects
            if (customCursor && customCursor.classList.contains('active')) {
                customCursor.style.left = (e.clientX - 10) + 'px';
                customCursor.style.top = (e.clientY - 10) + 'px';
            }
            rafId = null;
        });
    }
    
    // Apply optimized mouse tracking
    socialMediaSections.forEach(section => {
        section.addEventListener('mousemove', optimizedMouseMove);
    });
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--cream);
        padding: 2rem;
        box-shadow: var(--shadow-medium);
        border-radius: 0 0 12px 12px;
    }
    
    .mobile-menu.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Form handling (if forms are added later)
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation and submission logic here
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'var(--soft-coral)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions can be added here
}, 16)); // ~60fps

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    // Clean up custom cursor and event listeners
    const customCursor = document.querySelector('.social-media-cursor');
    if (customCursor) {
        customCursor.remove();
    }
});