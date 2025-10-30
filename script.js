// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Hero Slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    
    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }
    
    // Change slide every 4 seconds if slides exist
    if (slides.length > 0) {
        setInterval(nextSlide, 4000);
    }
    
    // Scroll Animation
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    function checkScroll() {
        fadeUpElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('appear');
            }
        });
    }
    
    // Check on scroll and on load
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    checkScroll(); // Initial check

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For demonstration, we'll just show a success message
            
            const formSuccess = document.getElementById('formSuccess');
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }

    // Animated truck icon on scroll (optional feature)
    function createTruckAnimation() {
        const truckIcon = document.createElement('div');
        truckIcon.innerHTML = '<i class="fas fa-truck"></i>';
        truckIcon.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: -50px;
            font-size: 2rem;
            color: var(--construction-orange);
            z-index: 999;
            transition: left 0.1s linear;
        `;
        document.body.appendChild(truckIcon);
        
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                // Scrolling down
                truckIcon.style.left = Math.min(st / 10, window.innerWidth - 50) + 'px';
            } else {
                // Scrolling up
                truckIcon.style.left = Math.max(-50, st / 10) + 'px';
            }
            lastScrollTop = st <= 0 ? 0 : st;
        });
    }
    
    // Uncomment the line below to enable the animated truck
    // createTruckAnimation();
});
