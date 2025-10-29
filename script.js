// JavaScript for JunubMart Website

// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
    
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Initialize page-specific functionality
    initPageSpecificFeatures();
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize page-specific functionality
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'products.html':
            initProductsPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        default:
            initScrollAnimations();
            break;
    }
}

// Home Page Initialization
function initHomePage() {
    // Hero Slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }
    }
    
    // Change slide every 4 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 4000);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Load featured products
    loadFeaturedProducts();
}

// Products Page Initialization
function initProductsPage() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Load all products
    loadProducts();
    
    // Set up filter functionality
    setupProductFilters();
}

// Contact Page Initialization
function initContactPage() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Set up contact form submission
    setupContactForm();
}

// Initialize scroll animations for elements
function initScrollAnimations() {
    function checkScroll() {
        const elements = document.querySelectorAll('.about-card, .product-card, .service-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check on page load
    checkScroll();
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Display first 4 products as featured
    const featuredProducts = products.slice(0, 4);
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <a href="#" class="btn" style="padding: 8px 16px; font-size: 0.9rem;">Add to Cart</a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Trigger scroll animation after products are loaded
    setTimeout(initScrollAnimations, 100);
}

// Load all products on products page
function loadProducts(category = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Filter products by category if needed
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Display products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <a href="#" class="btn" style="padding: 8px 16px; font-size: 0.9rem;">Add to Cart</a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Trigger scroll animation after products are loaded
    setTimeout(initScrollAnimations, 100);
}

// Set up product filter functionality
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Load products for selected category
            const category = button.getAttribute('data-category');
            loadProducts(category);
        });
    });
}

// Set up contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show the success message
        
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.classList.remove('hidden');
            
            // Hide the message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
        
        // Reset the form
        contactForm.reset();
    });
}

// Sample product data
const products = [
    {
        id: 1,
        name: "Smartphone X1",
        price: "$299.99",
        description: "Latest smartphone with advanced features and long battery life.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        category: "electronics"
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        price: "$49.99",
        description: "High-quality wireless earbuds with noise cancellation.",
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1010&q=80",
        category: "electronics"
    },
    {
        id: 3,
        name: "Laptop Pro",
        price: "$899.99",
        description: "Powerful laptop for work and entertainment.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        category: "electronics"
    },
    {
        id: 4,
        name: "Fashion Watch",
        price: "$79.99",
        description: "Elegant watch with modern design and durable materials.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        category: "fashion"
    },
    {
        id: 5,
        name: "Tablet Mini",
        price: "$199.99",
        description: "Compact tablet perfect for reading and browsing.",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "electronics"
    },
    {
        id: 6,
        name: "Designer Bag",
        price: "$129.99",
        description: "Stylish and functional bag for everyday use.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
        category: "fashion"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: "$59.99",
        description: "Portable speaker with excellent sound quality.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
        category: "electronics"
    },
    {
        id: 8,
        name: "Running Shoes",
        price: "$89.99",
        description: "Comfortable and durable shoes for active lifestyle.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "fashion"
    }
];
