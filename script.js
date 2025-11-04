// script.js - Complete JavaScript for Bakumba Spare Parts

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
});

// Initialize all site functionality
function initializeSite() {
    // Initialize components based on page
    initNavigation();
    initSlideshow();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initFAQ();
    initToast();
    
    // Page-specific initializations
    if (document.querySelector('.services-detail')) {
        initServiceCards();
    }
    
    if (document.querySelector('.contact-detail')) {
        initMap();
    }
    
    console.log('Bakumba Spare Parts website initialized');
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        
        if (window.innerWidth <= 768) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slideCount) % slideCount;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Change slide every 5 seconds
    const slideshowInterval = setInterval(nextSlide, 5000);
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
            clearInterval(slideshowInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            clearInterval(slideshowInterval);
            setInterval(nextSlide, 5000);
        });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If element has a delay attribute, use it
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-section, .value-card, .team-member, .service-detail-card'
    );
    
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Observe element
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formElements = this.elements;
        
        // Simple validation
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(field => {
            const input = formElements[field];
            if (input && !input.value.trim()) {
                isValid = false;
                showInputError(input, 'This field is required');
            } else {
                clearInputError(input);
            }
        });
        
        // Email validation
        const emailInput = formElements['email'];
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                showInputError(emailInput, 'Please enter a valid email address');
            }
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showToast('Message sent successfully! We will get back to you soon.', 'success');
            }, 2000);
        } else {
            showToast('Please check the form for errors', 'error');
        }
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearInputError(this);
        });
    });
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showInputError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    clearInputError(field);
    return true;
}

// Show input error
function showInputError(input, message) {
    clearInputError(input);
    
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #f44336;
        font-size: 0.85rem;
        margin-top: 5px;
    `;
    
    input.parentNode.appendChild(errorElement);
}

// Clear input error
function clearInputError(input) {
    input.classList.remove('error');
    
    const existingError = input.parentNode.querySelector('.input-error');
    if (existingError) {
        existingError.remove();
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Service cards interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Map initialization
function initMap() {
    // This would typically initialize a Google Maps or similar
    // For now, we'll just ensure the iframe is responsive
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Additional map interactions could be added here
        console.log('Map container initialized');
    }
}

// Toast notification system
function initToast() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 10000;
        `;
        document.body.appendChild(toastContainer);
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Allow manual dismissal
    toast.addEventListener('click', function() {
        this.classList.remove('show');
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add CSS for input errors
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-control.error {
        border-color: #f44336 !important;
        box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
    }
`;
document.head.appendChild(errorStyles);

// Export functions for potential use in other scripts
window.Bakumba = {
    showToast,
    initNavigation,
    initSlideshow
};
